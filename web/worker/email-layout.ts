/**
 * Marco común de los correos de la web (acuse a la pareja y aviso a Bea y Vane): cabecera con el nombre de la marca,
 * tarjeta blanca sobre fondo crema y pie con teléfonos y web, en los colores negro y champán.
 *
 * Pensado para los programas de correo: maquetado con tablas y estilos en línea, sin imágenes (el nombre de la marca
 * va en letra, así se ve aunque el programa bloquee las imágenes) y con fuentes del sistema (Georgia para los
 * titulares, como la Bodoni de la web). En móvil, los programas que admiten <style> reducen los márgenes.
 */
import { SITE } from '../site.config.mjs';

export const INK = '#222222';
export const ACCENT = '#806b55';
export const SOFT = '#575757';
export const LINE = '#ded8cf';
export const PAPER = '#faf8f5';

export const SANS = 'Arial,Helvetica,sans-serif';
export const SERIF = "Georgia,'Times New Roman',serif";

export const PHONES = ['+34 659 251 373', '+34 651 867 319'];
export const INSTAGRAM = 'https://www.instagram.com/the_dreamsfactory/';
export const site = SITE.replace(/\/$/, '');
export const web = site.replace(/^https:\/\//, '');

export const esc = (s: string) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

/** Párrafo de cuerpo. */
export const p = (html: string, extra = '') =>
  `<p style="margin:0 0 18px;font:16px/1.65 ${SANS};color:${INK};${extra}">${html}</p>`;

/**
 * Botón oscuro (o claro, con `outline`) para enlaces. Se ponen seguidos dentro de una celda: si no caben en una línea
 * (móvil), bajan a la siguiente.
 */
export const button = (href: string, label: string, outline = false) =>
  `<a href="${esc(href)}" style="display:inline-block;margin:0 8px 10px 0;padding:13px 22px;white-space:nowrap;font:600 12px/1 ${SANS};letter-spacing:.14em;text-transform:uppercase;text-decoration:none;${
    outline ? `color:${INK};border:1px solid ${INK};` : `color:#ffffff;background:${INK};border:1px solid ${INK};`
  }">${esc(label)}</a>`;

/**
 * El correo completo: `rows` son las filas de la tarjeta, ya maquetadas (cada una un <tr> con su <td class="px">).
 * `tagline` va en el pie, tras el nombre de la marca.
 */
export function frame(o: { lang: 'es' | 'en'; title: string; preheader: string; tagline: string; rows: string }) {
  return `<!doctype html>
<html lang="${o.lang}">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<meta name="color-scheme" content="light">
<meta name="supported-color-schemes" content="light">
<title>${esc(o.title)}</title>
<style>
  @media (max-width: 480px) {
    .px { padding-left: 24px !important; padding-right: 24px !important; }
    .brand { font-size: 17px !important; letter-spacing: .18em !important; }
  }
</style>
</head>
<body style="margin:0;padding:0;background:${PAPER};">
<div style="display:none;max-height:0;overflow:hidden;opacity:0;color:${PAPER};">${esc(o.preheader)}</div>
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background:${PAPER};">
<tr><td align="center" style="padding:32px 16px;">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="max-width:560px;background:#ffffff;border:1px solid ${LINE};">
    <tr><td class="px" align="center" style="padding:40px 40px 0;">
      <p class="brand" style="margin:0;font:400 20px/1.2 ${SERIF};letter-spacing:.28em;white-space:nowrap;color:${INK};">THE DREAMS FACTORY</p>
      <p style="margin:6px 0 0;font:italic 15px/1.2 ${SERIF};color:${ACCENT};">Wedding Planner</p>
      <table role="presentation" cellpadding="0" cellspacing="0" border="0" style="margin:28px auto 0;"><tr><td style="width:48px;border-top:1px solid ${ACCENT};font-size:0;line-height:0;">&nbsp;</td></tr></table>
    </td></tr>
${o.rows}
    <tr><td class="px" style="padding:22px 40px;border-top:1px solid ${LINE};background:${PAPER};">
      <p style="margin:0;font:12px/1.7 ${SANS};color:${SOFT};">The Dreams Factory · ${esc(o.tagline)}<br>
      ${PHONES.map((t) => `<a href="tel:${t.replace(/\s/g, '')}" style="color:${SOFT};text-decoration:none;">${t}</a>`).join(' · ')} · <a href="${site}/" style="color:${SOFT};text-decoration:none;">${web}</a></p>
    </td></tr>
  </table>
</td></tr>
</table>
</body>
</html>`;
}
