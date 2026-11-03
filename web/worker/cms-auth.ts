/**
 * Inicio de sesión del panel (Sveltia CMS, /admin) con GitHub, sin servicios externos.
 *
 * - GET /api/auth: abre la autorización de GitHub (en la ventana emergente que abre el panel).
 * - GET /api/callback: GitHub vuelve aquí con un código; se cambia por un token y se le pasa al panel con
 *   postMessage, solo a una página de este mismo dominio.
 *
 * Es el mismo protocolo que el autenticador oficial (sveltia-cms-auth). Necesita una «OAuth App» de GitHub con la
 * dirección de vuelta https://<dominio>/api/callback y sus datos en los secretos GITHUB_CLIENT_ID y
 * GITHUB_CLIENT_SECRET. Sin ellos, el panel no puede iniciar sesión (el resto de la web funciona igual).
 * Configuración: web/PANEL.md.
 */

export interface CmsAuthEnv {
  GITHUB_CLIENT_ID?: string;
  GITHUB_CLIENT_SECRET?: string;
}

const COOKIE = 'cms-oauth-state';
/** Permisos: «repo» para leer y guardar en el repositorio (que es privado); «user» para mostrar quién ha entrado. */
const SCOPE = 'repo,user';

export function cmsAuth(request: Request, env: CmsAuthEnv): Response {
  const url = new URL(request.url);
  if (url.searchParams.get('provider') !== 'github') return page(url, 'error', 'Proveedor no admitido.');
  if (!env.GITHUB_CLIENT_ID || !env.GITHUB_CLIENT_SECRET) return page(url, 'error', 'El panel aún no está conectado con GitHub (ver PANEL.md).');

  const state = crypto.randomUUID().replaceAll('-', '');
  const authorize = new URL('https://github.com/login/oauth/authorize');
  authorize.searchParams.set('client_id', env.GITHUB_CLIENT_ID);
  authorize.searchParams.set('scope', SCOPE);
  authorize.searchParams.set('state', state);
  authorize.searchParams.set('redirect_uri', `${url.origin}/api/callback`);
  return new Response(null, {
    status: 302,
    headers: {
      Location: authorize.toString(),
      'Set-Cookie': `${COOKIE}=${state}; Path=/api; HttpOnly; Secure; SameSite=Lax; Max-Age=600`,
      'Cache-Control': 'no-store',
    },
  });
}

export async function cmsCallback(request: Request, env: CmsAuthEnv): Promise<Response> {
  const url = new URL(request.url);
  const code = url.searchParams.get('code');
  const state = url.searchParams.get('state');
  const saved = (request.headers.get('cookie') ?? '').match(new RegExp(`(?:^|;\\s*)${COOKIE}=([0-9a-f]{32})`))?.[1];
  if (!code || !state || !saved || state !== saved) return page(url, 'error', 'La autorización no es válida o ha caducado. Vuelve a intentarlo.');
  if (!env.GITHUB_CLIENT_ID || !env.GITHUB_CLIENT_SECRET) return page(url, 'error', 'El panel aún no está conectado con GitHub.');

  try {
    const res = await fetch('https://github.com/login/oauth/access_token', {
      method: 'POST',
      headers: { Accept: 'application/json', 'Content-Type': 'application/json', 'User-Agent': 'the-dreams-factory-cms' },
      body: JSON.stringify({
        client_id: env.GITHUB_CLIENT_ID,
        client_secret: env.GITHUB_CLIENT_SECRET,
        code,
        redirect_uri: `${url.origin}/api/callback`,
      }),
    });
    const out = (await res.json()) as { access_token?: string; error_description?: string; error?: string };
    if (!out.access_token) return page(url, 'error', out.error_description ?? out.error ?? 'GitHub no ha devuelto el permiso.');
    return page(url, 'success', out.access_token);
  } catch (e) {
    console.log('[panel] Error al pedir el token a GitHub:', e);
    return page(url, 'error', 'No se ha podido conectar con GitHub.');
  }
}

/**
 * Página de la ventana emergente: avisa al panel («authorizing:github») y, cuando el panel contesta desde este mismo
 * dominio, le envía el resultado («authorization:github:success|error:{…}») y se cierra.
 */
function page(url: URL, result: 'success' | 'error', value: string): Response {
  const payload = result === 'success' ? { token: value, provider: 'github' } : { error: value, provider: 'github' };
  const message = `authorization:github:${result}:${JSON.stringify(payload)}`;
  const html = `<!doctype html><html lang="es"><meta charset="utf-8"><title>Panel · The Dreams Factory</title>
<p style="font:16px system-ui;margin:2rem">${result === 'success' ? 'Conectando…' : escapeHtml(value)}</p>
<script>
  (() => {
    const origin = ${JSON.stringify(url.origin)};
    const message = ${JSON.stringify(message)};
    if (!window.opener) return;
    window.addEventListener('message', (e) => {
      if (e.origin !== origin || e.data !== 'authorizing:github') return;
      window.opener.postMessage(message, origin);
      setTimeout(() => window.close(), 300);
    });
    window.opener.postMessage('authorizing:github', origin);
  })();
</script></html>`;
  return new Response(html, {
    headers: {
      'Content-Type': 'text/html; charset=utf-8',
      'Cache-Control': 'no-store',
      // Borra la cookie del paso anterior.
      'Set-Cookie': `${COOKIE}=; Path=/api; HttpOnly; Secure; SameSite=Lax; Max-Age=0`,
    },
  });
}

const escapeHtml = (s: string) => s.replace(/[&<>"']/g, (ch) => `&#${ch.charCodeAt(0)};`);
