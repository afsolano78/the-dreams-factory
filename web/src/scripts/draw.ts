/*
  Dibujos que se trazan solos: cada <svg data-draw> (motivos generados) se dibuja trazo a trazo la primera vez
  que entra en pantalla. Aquí solo se mide cada trazo y se marca el dibujo como visible (.is-drawn); la animación
  está en CSS (stroke-dashoffset); con «reducir movimiento» activado, los dibujos se muestran ya completos.
*/
import { whenIntroOpen } from './intro';

export function initDraw() {
  const svgs = [...document.querySelectorAll<SVGSVGElement>('svg[data-draw]')];
  if (!svgs.length) return;

  for (const svg of svgs) {
    const paths = [...svg.querySelectorAll<SVGPathElement>('path')];
    const spread = Math.min(2.2, 0.05 * paths.length + 0.6); // segundos entre el primer y el último trazo
    paths.forEach((p, i) => {
      p.style.setProperty('--len', String(Math.ceil(p.getTotalLength()) + 2));
      p.style.setProperty('--d', `${((i / Math.max(1, paths.length - 1)) * spread).toFixed(2)}s`);
    });
    svg.setAttribute('data-ready', '');
  }

  // Dos fotogramas de espera: así el estado «sin trazar» llega a pintarse y la transición arranca también
  // en los dibujos que ya están en pantalla al cargar.
  const draw = (el: Element) => requestAnimationFrame(() => requestAnimationFrame(() => el.classList.add('is-drawn')));

  if (!('IntersectionObserver' in window)) {
    svgs.forEach((s) => s.classList.add('is-drawn'));
    return;
  }
  const io = new IntersectionObserver(
    (entries) => {
      for (const e of entries) {
        if (!e.isIntersecting) continue;
        draw(e.target);
        io.unobserve(e.target);
      }
    },
    // Empieza en cuanto el dibujo asoma en pantalla.
    { threshold: 0.1 },
  );
  // Se empiezan a vigilar cuando se abre el telón de la presentación, para no trazarse tapados.
  whenIntroOpen(() => svgs.forEach((s) => io.observe(s)));
}
