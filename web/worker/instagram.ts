/**
 * Instagram: las últimas publicaciones de la cuenta para la franja de la portada, servidas desde nuestro dominio
 * (sin scripts ni cookies de Meta, y sin que el visitante se conecte a Instagram).
 *
 * - Una vez al día (cron en wrangler.jsonc) se leen las últimas publicaciones con la API de Instagram, se guardan
 *   sus fotos en KV (reducidas con Cloudflare Images si está disponible) y la lista en KV («feed»).
 * - GET /api/instagram devuelve la lista; GET /api/instagram/img/<id> devuelve cada foto.
 * - Si aún no hay lista (recién configurado), la primera petición la prepara en segundo plano.
 * - El código de acceso (secreto IG_TOKEN) puede ser de dos tipos, según cómo se genere en Meta:
 *   · «IG…» (inicio de sesión de Instagram): se lee de graph.instagram.com; caduca a los 60 días y se renueva solo
 *     cada semana (se guarda en KV).
 *   · «EAA…» (inicio de sesión de Facebook o «Unified login»): se lee de graph.facebook.com a través de la cuenta de
 *     Instagram vinculada (su identificador se averigua solo, o se fija con la variable IG_USER_ID). Estos no se
 *     pueden renovar sin el secreto de la app: hay que generarlos sin caducidad o sustituirlos antes de que caduquen.
 *
 * Sin KV o sin IG_TOKEN no hace nada y la portada muestra sus fotos de siempre. Configuración: web/INSTAGRAM.md.
 */

interface Kv {
  get(key: string, type: 'json'): Promise<unknown>;
  get(key: string, type: 'text'): Promise<string | null>;
  getWithMetadata<M>(key: string, type: 'arrayBuffer'): Promise<{ value: ArrayBuffer | null; metadata: M | null }>;
  put(key: string, value: string | ArrayBuffer, options?: { expirationTtl?: number; metadata?: unknown }): Promise<void>;
  delete(key: string): Promise<void>;
  list(options?: { prefix?: string }): Promise<{ keys: { name: string }[] }>;
}

interface Images {
  input(stream: ReadableStream): {
    transform(t: { width?: number; height?: number; fit?: string }): {
      output(o: { format: string; quality?: number }): Promise<{ response(): Response }>;
    };
  };
}

export interface IgEnv {
  INSTAGRAM?: Kv;
  IMAGES?: Images;
  IG_TOKEN?: string;
  /** Identificador de la cuenta de Instagram (solo códigos «EAA…»; si falta, se averigua con el código). */
  IG_USER_ID?: string;
  /** Solo para pruebas en local: otra dirección en lugar de la API de Instagram. */
  IG_API?: string;
}

interface Ctx { waitUntil(p: Promise<unknown>): void }

/** Una publicación tal como la recibe la portada. */
interface Post { id: string; url: string; img: string; alt: string; date: string }
interface Feed { updated: number; posts: Post[] }
interface Token { value: string; refreshed: number; seed: string }
interface Media {
  id: string;
  caption?: string;
  media_type: 'IMAGE' | 'VIDEO' | 'CAROUSEL_ALBUM';
  media_url?: string;
  thumbnail_url?: string;
  permalink: string;
  timestamp: string;
}

const COUNT = 6;
const DAY = 86_400_000;
const REFRESH_EVERY = 7 * DAY;
const FIELDS = 'id,caption,media_type,media_url,thumbnail_url,permalink,timestamp';
/** Versión de la API de Facebook para los códigos «EAA…» (cada versión dura unos dos años). */
const FB_GRAPH = 'https://graph.facebook.com/v23.0';

export async function instagramFeed(env: IgEnv, ctx: Ctx): Promise<Response> {
  const kv = env.INSTAGRAM;
  if (!kv) return feedResponse([], 300);
  const feed = (await kv.get('feed', 'json')) as Feed | null;
  // Sin lista o con más de un día y pico (si el cron fallara): se prepara en segundo plano, una sola vez.
  if ((!feed || Date.now() - feed.updated > DAY * 1.5) && env.IG_TOKEN && !(await kv.get('lock', 'text'))) {
    await kv.put('lock', '1', { expirationTtl: 300 });
    ctx.waitUntil(updateInstagram(env));
  }
  return feedResponse(feed?.posts ?? [], feed ? 3600 : 60);
}

export async function instagramImage(id: string, env: IgEnv): Promise<Response> {
  const kv = env.INSTAGRAM;
  if (!kv || !/^[\w-]+$/.test(id)) return new Response('Not found', { status: 404 });
  const { value, metadata } = await kv.getWithMetadata<{ type: string }>(`img:${id}`, 'arrayBuffer');
  if (!value) return new Response('Not found', { status: 404 });
  return new Response(value, {
    headers: {
      'Content-Type': metadata?.type ?? 'image/jpeg',
      // La foto de una publicación no cambia.
      'Cache-Control': 'public, max-age=31536000, immutable',
    },
  });
}

/** Lee las últimas publicaciones y guarda lista y fotos. La llama el cron diario. */
export async function updateInstagram(env: IgEnv): Promise<void> {
  const kv = env.INSTAGRAM;
  if (!kv || !env.IG_TOKEN) return;
  const facebook = env.IG_TOKEN.startsWith('EAA');
  const api = env.IG_API ?? (facebook ? FB_GRAPH : 'https://graph.instagram.com');
  try {
    let token: string;
    let user = 'me';
    if (facebook) {
      token = env.IG_TOKEN;
      const id = env.IG_USER_ID || (await instagramUserId(kv, api, token));
      if (!id) {
        console.log('[instagram] El código no da acceso a ninguna cuenta de Instagram');
        return;
      }
      user = id;
    } else {
      token = await currentToken(kv, env.IG_TOKEN, api);
    }
    const res = await fetch(`${api}/${user}/media?fields=${FIELDS}&limit=${COUNT * 2}&access_token=${encodeURIComponent(token)}`);
    if (!res.ok) {
      console.log('[instagram] La API respondió', res.status, await res.text());
      return;
    }
    const media = ((await res.json()) as { data?: Media[] }).data ?? [];

    const posts: Post[] = [];
    for (const m of media) {
      if (posts.length === COUNT) break;
      // Vídeos y reels: su portada. Carruseles: la primera foto.
      const src = m.media_type === 'VIDEO' ? m.thumbnail_url : m.media_url ?? m.thumbnail_url;
      if (!src || !(await storeImage(kv, env.IMAGES, m.id, src))) continue;
      posts.push({ id: m.id, url: m.permalink, img: `/api/instagram/img/${m.id}`, alt: altText(m.caption), date: m.timestamp });
    }
    if (!posts.length) return;
    await kv.put('feed', JSON.stringify({ updated: Date.now(), posts } satisfies Feed));

    // Fuera las fotos de publicaciones que ya no se muestran.
    const keep = new Set(posts.map((p) => `img:${p.id}`));
    const { keys } = await kv.list({ prefix: 'img:' });
    await Promise.all(keys.filter((k) => !keep.has(k.name)).map((k) => kv.delete(k.name)));
  } catch (e) {
    console.log('[instagram] Error al actualizar:', e);
  }
}

/**
 * Identificador de la cuenta de Instagram para un código «EAA…». Se prueba, por este orden:
 * la página del propio código (código de página), las páginas de Facebook a las que da acceso (código de usuario)
 * y el propio código como cuenta de Instagram («Unified login»). Se guarda en KV para no repetirlo.
 */
async function instagramUserId(kv: Kv, api: string, token: string): Promise<string | undefined> {
  const saved = (await kv.get('ig-user', 'json')) as { id: string; token: string } | null;
  if (saved && saved.token === token.slice(-12)) return saved.id;
  const get = async (path: string) => {
    const res = await fetch(`${api}/${path}${path.includes('?') ? '&' : '?'}access_token=${encodeURIComponent(token)}`);
    return res.ok ? ((await res.json()) as Record<string, unknown>) : undefined;
  };
  // Código de página: su cuenta de Instagram vinculada.
  const page = await get('me?fields=instagram_business_account');
  let id = (page?.instagram_business_account as { id?: string } | undefined)?.id;
  // Código de usuario de Facebook: la primera de sus páginas con Instagram vinculado.
  if (!id) {
    const pages = (await get('me/accounts?fields=instagram_business_account'))?.data as
      | { instagram_business_account?: { id: string } }[]
      | undefined;
    id = pages?.find((p) => p.instagram_business_account)?.instagram_business_account?.id;
  }
  // Código de la propia cuenta de Instagram.
  let me: Record<string, unknown> | undefined;
  if (!id) {
    me = await get('me?fields=id,username');
    if (typeof me?.id === 'string' && typeof me.username === 'string') id = me.id;
  }
  if (id) await kv.put('ig-user', JSON.stringify({ id, token: token.slice(-12) }));
  else console.log('[instagram] Respuesta de /me:', JSON.stringify(me));
  return id;
}

/** El código de acceso vigente: el de KV (renovado) o el del secreto si es nuevo. Se renueva cada semana. */
async function currentToken(kv: Kv, seed: string, api: string): Promise<string> {
  let token = (await kv.get('token', 'json')) as Token | null;
  // Si se cambia el secreto (por ejemplo, al volver a autorizar), manda el nuevo.
  if (!token || token.seed !== seed) token = { value: seed, refreshed: 0, seed };
  if (Date.now() - token.refreshed > REFRESH_EVERY) {
    const res = await fetch(`${api}/refresh_access_token?grant_type=ig_refresh_token&access_token=${encodeURIComponent(token.value)}`);
    if (res.ok) {
      const out = (await res.json()) as { access_token?: string };
      if (out.access_token) {
        token = { value: out.access_token, refreshed: Date.now(), seed };
        await kv.put('token', JSON.stringify(token));
      }
    } else {
      // Un código recién creado no se puede renovar hasta pasadas 24 h: se usa tal cual y se reintenta mañana.
      console.log('[instagram] No se pudo renovar el código', res.status);
    }
  }
  return token.value;
}

/** Descarga la foto (si no está ya) y la guarda reducida. Devuelve si está disponible. */
async function storeImage(kv: Kv, images: Images | undefined, id: string, src: string): Promise<boolean> {
  const key = `img:${id}`;
  if ((await kv.list({ prefix: key })).keys.some((k) => k.name === key)) return true;
  const res = await fetch(src);
  if (!res.ok || !res.body) return false;
  let body: ArrayBuffer;
  let type = res.headers.get('content-type') ?? 'image/jpeg';
  if (!type.startsWith('image/')) return false;
  if (images) {
    try {
      const out = await images.input(res.body).transform({ width: 720 }).output({ format: 'image/webp', quality: 80 });
      body = await out.response().arrayBuffer();
      type = 'image/webp';
    } catch (e) {
      console.log('[instagram] Sin reducir la foto', id, e);
      const again = await fetch(src);
      if (!again.ok) return false;
      body = await again.arrayBuffer();
    }
  } else {
    body = await res.arrayBuffer();
  }
  await kv.put(key, body, { metadata: { type } });
  return true;
}

/** Texto alternativo a partir del pie de foto: sin etiquetas (#) y recortado. */
function altText(caption = ''): string {
  const text = caption.replace(/#[\p{L}\p{N}_]+/gu, '').replace(/\s+/g, ' ').trim();
  if (text.length <= 140) return text;
  return text.slice(0, text.lastIndexOf(' ', 140)).replace(/[,.;:!?¡¿\s]+$/, '') + '…';
}

function feedResponse(posts: Post[], maxAge: number): Response {
  return new Response(JSON.stringify({ posts }), {
    headers: { 'Content-Type': 'application/json; charset=utf-8', 'Cache-Control': `public, max-age=${maxAge}` },
  });
}
