/**
 * Acuse de recibo a la pareja (texto aprobado por Bea y Vane, noviembre de 2026), en español o inglés.
 * Va en HTML con la imagen de la marca y, siempre, con su versión en texto plano.
 *
 * Correo pensado para los programas de correo: maquetado con tablas y estilos en línea, sin imágenes (el nombre de la
 * marca va en letra, así se ve aunque el programa bloquee las imágenes) y con fuentes del sistema (Georgia para los
 * titulares, como la Bodoni de la web).
 * Hasta el lanzamiento (INDEXABLE en site.config.mjs) el botón lleva a la portada de thedreamsfactory.es, que aún es la
 * web antigua; después, a las bodas de la web nueva.
 */
import { SITE, INDEXABLE } from '../site.config.mjs';

type Lang = 'es' | 'en';

const COPY = {
  es: {
    subject: 'Hemos recibido vuestro mensaje ✨ · The Dreams Factory',
    preheader: 'Os contestaremos personalmente en uno o dos días.',
    title: 'Hemos recibido vuestro mensaje',
    hello: (n: string) => `Hola, ${n}:`,
    body: [
      '¡Gracias por escribirnos! Ya tenemos vuestro mensaje y lo vamos a leer con calma. Os contestaremos personalmente en uno o dos días.',
      'Mientras tanto, si os apetece, podéis ver algunas de nuestras bodas o seguirnos en Instagram.',
    ],
    bodyText: (url: string) =>
      `Mientras tanto, si os apetece, podéis ver algunas de nuestras bodas en ${url} o seguirnos en Instagram (@the_dreamsfactory).`,
    button: 'Ver nuestras bodas',
    bodas: '/bodas/',
    more: 'Si os acordáis de algo más, respondéis a este correo y nos llega directamente.',
    bye: 'Un abrazo,',
    names: 'Bea y Vane',
    tagline: 'Wedding planners en Asturias',
  },
  en: {
    subject: 'We’ve got your message ✨ · The Dreams Factory',
    preheader: 'We’ll get back to you personally within a day or two.',
    title: 'We’ve got your message',
    hello: (n: string) => `Hi ${n},`,
    body: [
      'Thank you for writing to us! We’ve got your message and we’ll read it carefully. We’ll get back to you personally within a day or two.',
      'In the meantime, if you like, you can see some of our weddings or follow us on Instagram.',
    ],
    bodyText: (url: string) =>
      `In the meantime, if you like, you can see some of our weddings at ${url} or follow us on Instagram (@the_dreamsfactory).`,
    button: 'See our weddings',
    bodas: '/en/weddings/',
    more: 'If you think of anything else, just reply to this email and it will come straight to us.',
    bye: 'Warm wishes,',
    names: 'Bea & Vane',
    tagline: 'Wedding planners in Asturias',
  },
} as const;

const INSTAGRAM = 'https://www.instagram.com/the_dreamsfactory/';
const PHONES = ['+34 659 251 373', '+34 651 867 319'];

// Colores de la web (negro y champán).
const INK = '#222222';
const ACCENT = '#806b55';
const SOFT = '#575757';
const LINE = '#ded8cf';
const PAPER = '#faf8f5';

const esc = (s: string) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

export function ackEmail(lang: Lang, names: string) {
  const c = COPY[lang];
  const site = SITE.replace(/\/$/, '');
  const weddingsUrl = INDEXABLE ? site + c.bodas : site + '/';
  const web = site.replace(/^https:\/\//, '');

  const text = [
    c.hello(names),
    '',
    c.body[0],
    '',
    c.bodyText(weddingsUrl),
    '',
    c.more,
    '',
    c.bye,
    c.names,
    `The Dreams Factory · ${c.tagline}`,
    `${PHONES.join(' · ')} · ${web}`,
  ].join('\n');

  const p = (s: string, extra = '') =>
    `<p style="margin:0 0 18px;font:16px/1.65 Arial,Helvetica,sans-serif;color:${INK};${extra}">${s}</p>`;

  const html = `<!doctype html>
<html lang="${lang}">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<meta name="color-scheme" content="light">
<meta name="supported-color-schemes" content="light">
<title>${esc(c.title)}</title>
<style>
  /* Móvil (en los programas que lo admiten): menos margen a los lados y el nombre de la marca más junto. */
  @media (max-width: 480px) {
    .px { padding-left: 24px !important; padding-right: 24px !important; }
    .brand { font-size: 17px !important; letter-spacing: .18em !important; }
  }
</style>
</head>
<body style="margin:0;padding:0;background:${PAPER};">
<div style="display:none;max-height:0;overflow:hidden;opacity:0;color:${PAPER};">${esc(c.preheader)}</div>
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background:${PAPER};">
<tr><td align="center" style="padding:32px 16px;">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="max-width:560px;background:#ffffff;border:1px solid ${LINE};">
    <tr><td class="px" align="center" style="padding:40px 40px 0;">
      <p class="brand" style="margin:0;font:400 20px/1.2 Georgia,'Times New Roman',serif;letter-spacing:.28em;white-space:nowrap;color:${INK};">THE DREAMS FACTORY</p>
      <p style="margin:6px 0 0;font:italic 15px/1.2 Georgia,'Times New Roman',serif;color:${ACCENT};">Wedding Planner</p>
      <table role="presentation" cellpadding="0" cellspacing="0" border="0" style="margin:28px auto 0;"><tr><td style="width:48px;border-top:1px solid ${ACCENT};font-size:0;line-height:0;">&nbsp;</td></tr></table>
    </td></tr>
    <tr><td class="px" style="padding:32px 40px 8px;">
      <h1 style="margin:0 0 24px;font:400 28px/1.25 Georgia,'Times New Roman',serif;color:${INK};">${esc(c.title)}</h1>
      ${p(esc(c.hello(names)))}
      ${p(esc(c.body[0]))}
      ${p(esc(c.body[1]))}
    </td></tr>
    <tr><td class="px" style="padding:8px 40px 28px;">
      <table role="presentation" cellpadding="0" cellspacing="0" border="0"><tr>
        <td style="background:${INK};"><a href="${weddingsUrl}" style="display:inline-block;padding:14px 24px;white-space:nowrap;font:600 13px/1 Arial,Helvetica,sans-serif;letter-spacing:.14em;text-transform:uppercase;color:#ffffff;text-decoration:none;">${esc(c.button)}</a></td>
        <td style="padding-left:20px;"><a href="${INSTAGRAM}" style="font:14px/1 Arial,Helvetica,sans-serif;color:${ACCENT};text-decoration:underline;">Instagram</a></td>
      </tr></table>
    </td></tr>
    <tr><td class="px" style="padding:0 40px 36px;">
      ${p(esc(c.more), `color:${SOFT};`)}
      <p style="margin:8px 0 0;font:16px/1.5 Arial,Helvetica,sans-serif;color:${INK};">${esc(c.bye)}</p>
      <p style="margin:4px 0 0;font:italic 24px/1.3 Georgia,'Times New Roman',serif;color:${ACCENT};">${esc(c.names)}</p>
    </td></tr>
    <tr><td class="px" style="padding:22px 40px;border-top:1px solid ${LINE};background:${PAPER};">
      <p style="margin:0;font:12px/1.7 Arial,Helvetica,sans-serif;color:${SOFT};">The Dreams Factory · ${esc(c.tagline)}<br>
      ${PHONES.map((t) => `<a href="tel:${t.replace(/\s/g, '')}" style="color:${SOFT};text-decoration:none;">${t}</a>`).join(' · ')} · <a href="${site}/" style="color:${SOFT};text-decoration:none;">${web}</a></p>
    </td></tr>
  </table>
</td></tr>
</table>
</body>
</html>`;

  return { subject: c.subject, text, html };
}
