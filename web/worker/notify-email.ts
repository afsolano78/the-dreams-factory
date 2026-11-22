/**
 * Aviso a Bea y Vane de cada mensaje del formulario: el mismo marco que el acuse (email-layout.ts), con lo que cuentan
 * destacado, botones para contestar (email, WhatsApp, llamar) y la ficha con el resto de datos. Siempre con su
 * versión en texto plano. Los valores de las opciones se muestran como en el formulario (src/content/contact.ts).
 */
import { ACCENT, INK, LINE, SANS, SERIF, SOFT, button, esc, frame, p } from './email-layout';

type Data = Record<string, string>;

/** Campos del formulario y su etiqueta en el correo, en el orden en que se muestran. */
export const LABELS: [string, string][] = [
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

/** Textos de las opciones (los mismos que en el formulario en español). */
const OPTIONS: Record<string, Data> = {
  motivo: { boda: 'Boda', celebracion: 'Otra celebración', curso: 'Curso' },
  servicio: { integral: 'Organización integral', diseno: 'Diseño y coordinación del día B', coordinacion: 'Coordinación del día B', nose: 'Aún no lo saben' },
  invitados: { 'menos-50': 'Menos de 50', '50-100': 'De 50 a 100', '100-150': 'De 100 a 150', '150-200': 'De 150 a 200', 'mas-200': 'Más de 200' },
  presupuesto: { 'menos-20000': 'Menos de 20.000 €', '20000-35000': 'De 20.000 a 35.000 €', '35000-50000': 'De 35.000 a 50.000 €', 'mas-50000': 'Más de 50.000 €' },
  experiencia: { ninguna: 'Ninguna, empieza de cero', algo: 'Algo: ha colaborado en eventos', profesional: 'Trabaja en el sector' },
  como_nos_conocisteis: { instagram: 'Instagram', google: 'Google', recomendacion: 'Alguien les habló de vosotras', boda: 'Estuvieron en una boda vuestra', prensa: 'En una revista', otro: 'Otro' },
  idioma: { es: 'Español', en: 'Inglés' },
  sin_fecha: { si: 'Sí' },
};

const pretty = (key: string, value: string) => OPTIONS[key]?.[value] ?? (key === 'sin_fecha' ? 'Sí' : value);

/** Número para WhatsApp: solo cifras, con el 34 delante si es un móvil español sin prefijo. */
const whatsappNumber = (phone: string) => {
  const digits = phone.replace(/\D/g, '').replace(/^00/, '');
  return /^[67]\d{8}$/.test(digits) ? '34' + digits : digits;
};

export function notifyEmail(d: Data) {
  const motivo = d.motivo ? pretty('motivo', d.motivo) : '';
  const subject = `Nueva consulta${motivo ? ` · ${motivo}` : ''} · ${d.nombres}${d.fecha ? ` · ${d.fecha}` : ''}`;
  const rows = LABELS.filter(([k]) => d[k]).map(([k, label]) => [label, pretty(k, d[k])] as const);
  const text = `${subject}\n\n${rows.map(([l, v]) => `${l}: ${v}`).join('\n')}\n`;

  // Cabecera de la consulta: qué celebran · nombres · fecha (o «sin fecha aún»).
  const when = d.fecha || (d.sin_fecha ? 'sin fecha aún' : '');
  const lead = [motivo, d.nombres, when].filter(Boolean).join(' · ');

  // Ficha: todo menos lo que ya va arriba o al pie; email y teléfono, pulsables.
  const skip = new Set(['motivo', 'nombres', 'idea', 'pagina', 'idioma', 'fecha', 'sin_fecha']);
  const link = (k: string, v: string) =>
    k === 'email'
      ? `<a href="mailto:${esc(v)}" style="color:${INK};">${esc(v)}</a>`
      : k === 'telefono'
        ? `<a href="tel:${esc(v.replace(/\s/g, ''))}" style="color:${INK};">${esc(v)}</a>`
        : esc(pretty(k, v));
  const facts = LABELS.filter(([k]) => d[k] && !skip.has(k))
    .map(
      ([k, label]) =>
        `<tr><td style="padding:9px 16px 9px 0;border-top:1px solid ${LINE};color:${ACCENT};font:11px/1.5 ${SANS};text-transform:uppercase;letter-spacing:.1em;vertical-align:top;width:38%;">${esc(label)}</td><td style="padding:9px 0;border-top:1px solid ${LINE};color:${INK};font:15px/1.5 ${SANS};word-break:break-word;">${link(k, d[k])}</td></tr>`,
    )
    .join('');

  // Botones para contestar: los que se puedan con los datos que han dejado.
  const replySubject = encodeURIComponent(`Re: ${subject.replace(/^Nueva consulta · /, '')} · The Dreams Factory`);
  const buttons = [
    d.email ? button(`mailto:${d.email}?subject=${replySubject}`, 'Responder por email') : '',
    d.telefono ? button(`https://wa.me/${whatsappNumber(d.telefono)}`, 'WhatsApp', true) : '',
    d.telefono ? button(`tel:${d.telefono.replace(/\s/g, '')}`, 'Llamar', true) : '',
  ].join('');

  const sentAt = new Date().toLocaleString('es-ES', { timeZone: 'Europe/Madrid', dateStyle: 'long', timeStyle: 'short' });
  const footnote = [d.pagina ? `Enviado desde ${d.pagina}` : 'Enviado desde la web', d.idioma ? `en ${pretty('idioma', d.idioma).toLowerCase()}` : '', sentAt]
    .filter(Boolean)
    .join(' · ');

  const html = frame({
    lang: 'es',
    title: 'Nueva consulta',
    preheader: lead,
    tagline: 'Formulario de la web',
    rows: `
    <tr><td class="px" style="padding:32px 40px 8px;">
      <h1 style="margin:0 0 6px;font:400 28px/1.25 ${SERIF};color:${INK};">Nueva consulta</h1>
      <p style="margin:0 0 24px;font:15px/1.5 ${SANS};color:${ACCENT};">${esc(lead)}</p>
      ${
        d.idea
          ? `<p style="margin:0 0 8px;font:11px/1.5 ${SANS};text-transform:uppercase;letter-spacing:.1em;color:${ACCENT};">Lo que nos cuentan</p>
      <div style="margin:0 0 24px;padding:4px 0 4px 18px;border-left:2px solid ${ACCENT};font:italic 18px/1.6 ${SERIF};color:${INK};white-space:pre-wrap;">${esc(d.idea)}</div>`
          : ''
      }
    </td></tr>
    ${buttons ? `<tr><td class="px" style="padding:0 40px 18px;">${buttons}</td></tr>` : ''}
    <tr><td class="px" style="padding:8px 40px 28px;">
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="border-bottom:1px solid ${LINE};">${facts}</table>
    </td></tr>
    <tr><td class="px" style="padding:0 40px 32px;">
      ${p(`${esc(footnote)}.<br>Pulsa «Responder» para contestar directamente${d.email ? ` a ${esc(d.email)}` : ''}.`, `margin:0;font-size:12px;line-height:1.6;color:${SOFT};`)}
    </td></tr>`,
  });

  return { subject, text, html };
}
