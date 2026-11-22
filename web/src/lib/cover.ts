/**
 * Fotos recortadas con `object-cover` en una caja de otra proporción (por ejemplo, una foto horizontal en una tarjeta
 * vertical 4:5). El navegador pinta la foto más ancha que la caja y solo se ve el centro, así que hay que pedirle una
 * versión proporcionalmente mayor; si no, en pantallas de alta densidad se ve blanda. El recorte sigue haciéndolo CSS
 * (`object-position`), para respetar el punto de interés de cada foto.
 *
 * Uso: <Picture widths={coverWidths(src, 4 / 5, [560, 800, 1120])} sizes={coverSizes(src, 4 / 5, '45vw')} … />
 */
import type { ImageMetadata } from 'astro';

/** Cuánto más ancha se pinta la foto que la caja (1 si la foto es igual o más estrecha). */
const factor = (src: ImageMetadata, box: number) => Math.max(1, Math.round((src.width / src.height / box) * 100) / 100);

/** Los anchos que se generan, multiplicados por ese factor (Astro no pasa del ancho del original). */
export const coverWidths = (src: ImageMetadata, box: number, widths: number[]) =>
  widths.map((w) => Math.round(w * factor(src, box)));

/** El atributo `sizes` con cada medida multiplicada por ese factor. */
export function coverSizes(src: ImageMetadata, box: number, sizes: string): string {
  const k = factor(src, box);
  if (k === 1) return sizes;
  return sizes
    .split(',')
    .map((part) => {
      const p = part.trim();
      const i = p.lastIndexOf(' ');
      return i < 0 ? `calc(${p} * ${k})` : `${p.slice(0, i)} calc(${p.slice(i + 1)} * ${k})`;
    })
    .join(', ');
}
