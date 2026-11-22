/**
 * Acuse de recibo a la pareja (texto aprobado por Bea y Vane, noviembre de 2026), en español o inglés.
 * Va en HTML con la imagen de la marca (marco común en email-layout.ts) y, siempre, con su versión en texto plano.
 * Hasta el lanzamiento (INDEXABLE en site.config.mjs) el botón lleva a la portada de thedreamsfactory.es, que aún es la
 * web antigua; después, a las bodas de la web nueva.
 */
import { INDEXABLE } from '../site.config.mjs';
import { ACCENT, INK, INSTAGRAM, PHONES, SANS, SERIF, SOFT, button, esc, frame, p, site, web } from './email-layout';

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

export function ackEmail(lang: Lang, names: string) {
  const c = COPY[lang];
  const weddingsUrl = INDEXABLE ? site + c.bodas : site + '/';

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

  const rows = `
    <tr><td class="px" style="padding:32px 40px 8px;">
      <h1 style="margin:0 0 24px;font:400 28px/1.25 ${SERIF};color:${INK};">${esc(c.title)}</h1>
      ${p(esc(c.hello(names)))}
      ${p(esc(c.body[0]))}
      ${p(esc(c.body[1]))}
    </td></tr>
    <tr><td class="px" style="padding:8px 40px 18px;">
      ${button(weddingsUrl, c.button)}
      <a href="${INSTAGRAM}" style="display:inline-block;margin:0 0 10px 12px;font:14px/1 ${SANS};color:${ACCENT};text-decoration:underline;">Instagram</a>
    </td></tr>
    <tr><td class="px" style="padding:0 40px 36px;">
      ${p(esc(c.more), `color:${SOFT};`)}
      <p style="margin:8px 0 0;font:16px/1.5 ${SANS};color:${INK};">${esc(c.bye)}</p>
      <p style="margin:4px 0 0;font:italic 24px/1.3 ${SERIF};color:${ACCENT};">${esc(c.names)}</p>
    </td></tr>`;

  return { subject: c.subject, text, html: frame({ lang, title: c.title, preheader: c.preheader, tagline: c.tagline, rows }) };
}
