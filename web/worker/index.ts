/**
 * Worker de Cloudflare de la web: sirve las páginas (dist/), atiende el formulario de contacto en /api/contacto, da
 * las últimas publicaciones de Instagram para la portada en /api/instagram y conecta el panel (/admin) con GitHub.
 *
 * Formulario (POST /api/contacto, JSON o formulario normal):
 * 1. Antispam: campo trampa «web» vacío, al menos 3 s entre que se abre el formulario («t») y se envía, y
 *    Cloudflare Turnstile si está configurado (secreto TURNSTILE_SECRET). Los robots reciben un «ok» y no se envía nada.
 * 2. Validación: nombres, aceptación de la privacidad y una forma de contestar (email en el completo; email o
 *    teléfono en el corto). Todo se recorta a una longitud máxima.
 * 3. Envío con Resend (secreto RESEND_API_KEY): un correo a CONTACT_TO con «Responder» a la pareja y, si
 *    AUTOREPLY = "si" y hay email, un acuse de recibo a la pareja. Sin RESEND_API_KEY el envío se simula (prototipo).
 *
 * Configuración en wrangler.jsonc (vars) y en el panel de Cloudflare (secretos). Ver web/CONTACTO.md.
 *
 * Instagram (GET /api/instagram y su cron diario): ver worker/instagram.ts y web/INSTAGRAM.md.
 *
 * Inicio de sesión del panel (/api/auth y /api/callback): ver worker/cms-auth.ts y web/PANEL.md.
 */

import { instagramFeed, instagramImage, updateInstagram, type IgEnv } from './instagram';
import { cmsAuth, cmsCallback, type CmsAuthEnv } from './cms-auth';
import { ackEmail } from './ack-email';
import { LABELS, notifyEmail } from './notify-email';

interface Env extends IgEnv, CmsAuthEnv {
  ASSETS: { fetch: (request: Request) => Promise<Response> };
  CONTACT_TO?: string;
  CONTACT_FROM?: string;
  AUTOREPLY?: string;
  RESEND_API_KEY?: string;
  TURNSTILE_SECRET?: string;
}

type Data = Record<string, string>;

const MIN_MS = 3000;
const MAX_BODY = 60_000;
const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const PHONE = /^[+()\d\s.-]{6,}$/;

type Ctx = { waitUntil(p: Promise<unknown>): void };

export default {
  async fetch(request: Request, env: Env, ctx: Ctx): Promise<Response> {
    const route = new URL(request.url).pathname.replace(/\/$/, '');
    if (route === '/api/contacto') return contact(request, env);
    if (route === '/api/instagram') return instagramFeed(env, ctx);
    if (route.startsWith('/api/instagram/img/')) return instagramImage(route.slice('/api/instagram/img/'.length), env);
    if (route === '/api/auth') return cmsAuth(request, env);
    if (route === '/api/callback') return cmsCallback(request, env);
    return env.ASSETS.fetch(request);
  },
  // Cron diario (wrangler.jsonc): últimas publicaciones de Instagram.
  async scheduled(_event: unknown, env: Env, ctx: Ctx): Promise<void> {
    ctx.waitUntil(updateInstagram(env));
  },
};

async function contact(request: Request, env: Env): Promise<Response> {
  if (request.method !== 'POST') return json({ ok: false, error: 'method' }, 405, { Allow: 'POST' });
  if (Number(request.headers.get('content-length') ?? 0) > MAX_BODY) return json({ ok: false, error: 'size' }, 413);

  const wantsJson = (request.headers.get('accept') ?? '').includes('application/json');
  let data: Data;
  try {
    data = await readBody(request);
  } catch {
    return json({ ok: false, error: 'body' }, 400);
  }

  // 1. Antispam silencioso: a los robots se les dice que ha ido bien. La hora de inicio solo existe con JavaScript;
  //    sin él (envío directo del formulario) quedan la trampa y Turnstile.
  const started = Number(data.t);
  const tooFast = wantsJson && (!started || Date.now() - started < MIN_MS);
  if (data.web || tooFast) return reply(true, request, data, wantsJson);

  if (env.TURNSTILE_SECRET) {
    const passed = await verifyTurnstile(env.TURNSTILE_SECRET, data['cf-turnstile-response'] ?? '', request);
    if (!passed) return json({ ok: false, error: 'spam' }, 400);
  }

  // 2. Validación (la misma que en el navegador, por si se salta).
  const d = clean(data);
  const isShort = d.formulario === 'corto';
  const valid =
    !!d.nombres &&
    d.privacidad === 'si' &&
    (isShort ? EMAIL.test(d.contacto ?? '') || PHONE.test(d.contacto ?? '') : EMAIL.test(d.email ?? ''));
  if (!valid) return json({ ok: false, error: 'invalid' }, 422);
  // En el corto, «email o teléfono» pasa a su campo (así «Responder» va al email si lo dejaron).
  if (isShort && d.contacto) {
    if (EMAIL.test(d.contacto)) d.email = d.contacto;
    else d.telefono = d.contacto;
    delete d.contacto;
  }

  // 3. Envío.
  const { subject, text, html } = notifyEmail(d);

  if (!env.RESEND_API_KEY) {
    console.log('[contacto] Envío simulado (falta RESEND_API_KEY):', text);
    return reply(true, request, d, wantsJson, true);
  }

  const to = env.CONTACT_TO ?? 'thedreamsfactoryweddingplanner@gmail.com';
  const from = env.CONTACT_FROM ?? 'The Dreams Factory <web@thedreamsfactory.es>';
  const sent = await sendMail(env.RESEND_API_KEY, {
    from,
    to: [to],
    subject,
    text,
    html,
    ...(d.email ? { reply_to: d.email } : {}),
  });
  if (!sent) return json({ ok: false, error: 'send' }, 502);

  if (env.AUTOREPLY === 'si' && d.email) {
    const ack = ackEmail(d.idioma === 'en' ? 'en' : 'es', d.nombres);
    await sendMail(env.RESEND_API_KEY, { from, to: [d.email], reply_to: to, ...ack });
  }

  return reply(true, request, d, wantsJson);
}

async function readBody(request: Request): Promise<Data> {
  const type = request.headers.get('content-type') ?? '';
  if (type.includes('application/json')) {
    const raw = (await request.json()) as Record<string, unknown>;
    return Object.fromEntries(Object.entries(raw).map(([k, v]) => [k, typeof v === 'string' ? v : String(v ?? '')]));
  }
  const form = await request.formData();
  const out: Data = {};
  form.forEach((v, k) => { if (typeof v === 'string') out[k] = v; });
  return out;
}

/** Recorta espacios y longitudes, y descarta campos desconocidos. */
function clean(data: Data): Data {
  const allowed = new Set([...LABELS.map(([k]) => k), 'formulario', 'privacidad']);
  const out: Data = {};
  for (const [k, v] of Object.entries(data)) {
    if (!allowed.has(k)) continue;
    const value = v.trim().slice(0, k === 'idea' ? 5000 : 300);
    if (value) out[k] = value;
  }
  return out;
}

async function verifyTurnstile(secret: string, token: string, request: Request): Promise<boolean> {
  if (!token) return false;
  const body = new FormData();
  body.append('secret', secret);
  body.append('response', token);
  const ip = request.headers.get('cf-connecting-ip');
  if (ip) body.append('remoteip', ip);
  try {
    const res = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', { method: 'POST', body });
    const out = (await res.json()) as { success?: boolean };
    return !!out.success;
  } catch {
    return false;
  }
}

async function sendMail(key: string, mail: Record<string, unknown>): Promise<boolean> {
  try {
    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: { Authorization: `Bearer ${key}`, 'Content-Type': 'application/json' },
      body: JSON.stringify(mail),
    });
    if (!res.ok) console.log('[contacto] Resend respondió', res.status, await res.text());
    return res.ok;
  } catch (e) {
    console.log('[contacto] Error al enviar:', e);
    return false;
  }
}

function json(body: unknown, status = 200, headers: Record<string, string> = {}): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: { 'Content-Type': 'application/json; charset=utf-8', 'Cache-Control': 'no-store', ...headers },
  });
}

/** JSON para el formulario con JavaScript; redirección con ?enviado=1 para el envío sin JavaScript. */
function reply(ok: boolean, request: Request, data: Data, wantsJson: boolean, simulated = false): Response {
  if (wantsJson) return json(simulated ? { ok, simulated } : { ok });
  const fallback = data.idioma === 'en' ? '/en/contact/' : '/contacto/';
  let target: URL;
  try {
    target = new URL(request.headers.get('referer') ?? fallback, request.url);
    if (target.origin !== new URL(request.url).origin) target = new URL(fallback, request.url);
  } catch {
    target = new URL(fallback, request.url);
  }
  target.searchParams.set('enviado', '1');
  return Response.redirect(target.toString(), 303);
}
