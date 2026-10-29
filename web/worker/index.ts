/**
 * Worker de Cloudflare de la web: sirve las páginas (dist/), atiende el formulario de contacto en /api/contacto y
 * da las últimas publicaciones de Instagram para la portada en /api/instagram.
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
 */

import { instagramFeed, instagramImage, updateInstagram, type IgEnv } from './instagram';

interface Env extends IgEnv {
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

/** Etiquetas del correo, en el orden en que se muestran. */
const LABELS: [string, string][] = [
  ['motivo', 'Qué celebran'],
  ['nombres', 'Nombres'],
  ['email', 'Email'],
  ['telefono', 'Teléfono'],
  ['contacto', 'Email o teléfono'],
  ['fecha', 'Fecha'],
  ['sin_fecha', 'Sin fecha aún'],
  ['lugar', 'Lugar o zona'],
  ['invitados', 'Invitados'],
  ['servicio', 'Servicio'],
  ['presupuesto', 'Presupuesto orientativo'],
  ['celebracion', 'Celebración'],
  ['experiencia', 'Experiencia en eventos'],
  ['como_nos_conocisteis', 'Cómo nos conocieron'],
  ['idea', 'Su idea'],
  ['pagina', 'Enviado desde'],
  ['idioma', 'Idioma'],
];
const MOTIVES: Data = { boda: 'Boda', celebracion: 'Otra celebración', curso: 'Curso' };
const SERVICES: Data = {
  integral: 'Organización integral',
  diseno: 'Diseño y coordinación del día B',
  coordinacion: 'Coordinación del día B',
  nose: 'Aún no lo saben',
};

type Ctx = { waitUntil(p: Promise<unknown>): void };

export default {
  async fetch(request: Request, env: Env, ctx: Ctx): Promise<Response> {
    const route = new URL(request.url).pathname.replace(/\/$/, '');
    if (route === '/api/contacto') return contact(request, env);
    if (route === '/api/instagram') return instagramFeed(env, ctx);
    if (route.startsWith('/api/instagram/img/')) return instagramImage(route.slice('/api/instagram/img/'.length), env);
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
  const subject = `Nueva consulta${d.motivo ? ` · ${MOTIVES[d.motivo] ?? d.motivo}` : ''} · ${d.nombres}${d.fecha ? ` · ${d.fecha}` : ''}`;
  const rows = LABELS.filter(([k]) => d[k]).map(([k, label]) => [label, pretty(k, d[k])] as const);
  const text = `${subject}\n\n${rows.map(([l, v]) => `${l}: ${v}`).join('\n')}\n`;
  const html = mailHtml(subject, rows);

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
    const en = d.idioma === 'en';
    await sendMail(env.RESEND_API_KEY, {
      from,
      to: [d.email],
      reply_to: to,
      subject: en ? 'We’ve got your message · The Dreams Factory' : 'Hemos recibido vuestro mensaje · The Dreams Factory',
      text: en
        ? `Hi ${d.nombres},\n\nThank you for writing to us. We’ve received your message and we’ll read it carefully: we’ll get back to you very soon.\n\nBea & Vane\nThe Dreams Factory · Wedding planners`
        : `Hola, ${d.nombres}:\n\nGracias por escribirnos. Hemos recibido vuestro mensaje y lo leeremos con calma: os contestamos muy pronto.\n\nBea y Vane\nThe Dreams Factory · Wedding planners`,
    });
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

function pretty(key: string, value: string): string {
  if (key === 'motivo') return MOTIVES[value] ?? value;
  if (key === 'servicio') return SERVICES[value] ?? value;
  if (key === 'idioma') return value === 'en' ? 'Inglés' : 'Español';
  if (key === 'sin_fecha') return 'Sí';
  return value;
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

const esc = (s: string) => s.replace(/[&<>"']/g, (ch) => `&#${ch.charCodeAt(0)};`);

function mailHtml(subject: string, rows: readonly (readonly [string, string])[]): string {
  const trs = rows
    .map(([l, v]) => `<tr><td style="padding:8px 16px 8px 0;color:#806b55;font:12px/1.4 Arial,sans-serif;text-transform:uppercase;letter-spacing:.08em;vertical-align:top;white-space:nowrap">${esc(l)}</td><td style="padding:8px 0;color:#222;font:15px/1.5 Arial,sans-serif;white-space:pre-wrap">${esc(v)}</td></tr>`)
    .join('');
  return `<div style="max-width:640px"><p style="font:18px/1.4 Georgia,serif;color:#222;margin:0 0 16px">${esc(subject)}</p><table style="border-collapse:collapse">${trs}</table><p style="font:12px/1.4 Arial,sans-serif;color:#888;margin-top:24px">Pulsa «Responder» para contestar directamente a la pareja.</p></div>`;
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
