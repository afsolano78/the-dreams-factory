/**
 * Parallax suave: la foto se mueve un poco más despacio que el contenido al hacer scroll.
 *
 * Uso: data-parallax="8" en una capa posicionada con `absolute inset-0` dentro de un marco posicionado
 * (relative/absolute) con overflow oculto.
 * El número es el recorrido máximo en % de la altura del marco. El CSS (global.css) agranda la capa ese
 * mismo % por arriba y por abajo, para que al desplazarse nunca asome un hueco.
 *
 * Se usa la propiedad `translate` (no `transform`) para no interferir con los zooms de hover o de los carruseles.
 * Solo se calcula para las capas visibles y una vez por fotograma. Con movimiento reducido no hace nada.
 */
export function initParallax() {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  const layers = [...document.querySelectorAll<HTMLElement>('[data-parallax]')];
  if (!layers.length) return;

  const visible = new Set<HTMLElement>();
  let queued = false;
  // El marco es el contenedor posicionado más cercano (no el padre directo: una <img> va dentro de <picture>).
  const frameOf = (layer: HTMLElement) => (layer.offsetParent as HTMLElement | null) ?? layer.parentElement!;

  const update = () => {
    queued = false;
    const vh = window.innerHeight;
    for (const layer of visible) {
      const frame = frameOf(layer).getBoundingClientRect();
      const range = (parseFloat(layer.dataset.parallax || '8') / 100) * frame.height;
      // -1 cuando el marco está por debajo de la pantalla, 0 centrado, 1 cuando ya ha pasado por arriba.
      const progress = Math.max(-1, Math.min(1, (vh / 2 - (frame.top + frame.height / 2)) / (vh / 2 + frame.height / 2)));
      layer.style.translate = `0 ${(progress * range).toFixed(1)}px`;
    }
  };

  const requestUpdate = () => {
    if (queued) return;
    queued = true;
    requestAnimationFrame(update);
  };

  const io = new IntersectionObserver((entries) => {
    for (const e of entries) {
      const layer = (e.target as HTMLElement & { _parallaxLayer?: HTMLElement })._parallaxLayer!;
      if (e.isIntersecting) visible.add(layer);
      else visible.delete(layer);
    }
    requestUpdate();
  });

  for (const layer of layers) {
    const frame = frameOf(layer) as HTMLElement & { _parallaxLayer?: HTMLElement };
    frame._parallaxLayer = layer;
    io.observe(frame);
  }

  window.addEventListener('scroll', requestUpdate, { passive: true });
  window.addEventListener('resize', requestUpdate);
}
