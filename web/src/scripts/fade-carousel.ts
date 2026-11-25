/**
 * Carrusel con fundido (portada y opiniones).
 *
 * Marcado esperado dentro de [data-carousel]:
 * - Cada capa de una diapositiva lleva data-slide="i" (puede haber varias capas por diapositiva: foto, texto…).
 *   La primera arranca con las clases "is-active is-initial".
 * - Botones de progreso [data-carousel-dot="i"] con una barra .carousel-bar dentro.
 * - Botón de pausa opcional [data-carousel-pause] con data-pause-label y data-play-label.
 * - Región opcional [data-carousel-live]: pasa a aria-live="polite" cuando el visitante cambia de diapositiva.
 *
 * El avance lo marca el final de la animación de la barra de progreso, así la pausa detiene todo a la vez.
 * En pantallas táctiles también se pasa de una a otra deslizando el dedo a los lados.
 */
export function initFadeCarousel(root: HTMLElement) {
  if (root.dataset.carouselReady) return;
  root.dataset.carouselReady = 'true';

  const dots = [...root.querySelectorAll<HTMLButtonElement>('[data-carousel-dot]')];
  const count = dots.length;
  if (count < 2) return;

  const toggle = root.querySelector<HTMLButtonElement>('[data-carousel-pause]');
  const live = root.querySelector<HTMLElement>('[data-carousel-live]');
  const layers = (i: number) => root.querySelectorAll<HTMLElement>(`[data-slide="${i}"]`);
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  let current = 0;

  const setPaused = (paused: boolean) => {
    root.dataset.paused = String(paused);
    if (toggle) toggle.setAttribute('aria-label', (paused ? toggle.dataset.playLabel : toggle.dataset.pauseLabel) ?? '');
  };

  const go = (n: number) => {
    const next = (n + count) % count;
    if (next === current) return;

    root.querySelectorAll('[data-slide]').forEach((el) => el.classList.remove('is-prev', 'is-initial'));
    layers(current).forEach((el) => {
      el.classList.remove('is-active');
      el.classList.add('is-prev');
      el.setAttribute('aria-hidden', 'true');
    });
    layers(next).forEach((el) => {
      el.classList.add('is-active');
      el.setAttribute('aria-hidden', 'false');
      // Si su foto aún no ha llegado (se elige antes de que termine de bajar), sigue viéndose la anterior y el
      // fundido empieza cuando la foto está lista, en vez de mostrar la de debajo o aparecer de golpe.
      const img = el.querySelector('img');
      if (img && !img.complete) {
        img.loading = 'eager';
        el.classList.add('is-loading');
        const done = () => el.classList.remove('is-loading');
        img.addEventListener('load', done, { once: true });
        img.addEventListener('error', done, { once: true });
      }
    });

    dots.forEach((d, i) => {
      d.removeAttribute('aria-current');
      d.classList.toggle('is-done', i < next);
    });
    // Reinicia la animación de la barra aunque se vuelva a la misma diapositiva.
    void dots[next].offsetWidth;
    dots[next].setAttribute('aria-current', 'true');
    current = next;
  };

  dots.forEach((dot, i) => {
    dot.querySelector('.carousel-bar')?.addEventListener('animationend', () => {
      if (i === current && root.dataset.paused !== 'true') go(current + 1);
    });
    dot.addEventListener('click', () => {
      live?.setAttribute('aria-live', 'polite');
      go(i);
    });
  });

  toggle?.addEventListener('click', () => setPaused(root.dataset.paused !== 'true'));

  // Deslizar el dedo a los lados (pantallas táctiles): siguiente o anterior. Solo cuenta un gesto claramente
  // horizontal, para no estorbar al desplazamiento vertical de la página.
  let startX = 0;
  let startY = 0;
  root.addEventListener('touchstart', (e) => {
    startX = e.touches[0].clientX;
    startY = e.touches[0].clientY;
  }, { passive: true });
  root.addEventListener('touchend', (e) => {
    const dx = e.changedTouches[0].clientX - startX;
    const dy = e.changedTouches[0].clientY - startY;
    if (Math.abs(dx) < 50 || Math.abs(dx) < Math.abs(dy) * 1.5) return;
    live?.setAttribute('aria-live', 'polite');
    go(current + (dx < 0 ? 1 : -1));
  }, { passive: true });

  // Solo avanza mientras se ve: pestaña visible y carrusel dentro de la pantalla.
  document.addEventListener('visibilitychange', () => {
    root.dataset.hidden = String(document.hidden);
  });
  if ('IntersectionObserver' in window) {
    new IntersectionObserver(([entry]) => {
      root.dataset.offscreen = String(!entry.isIntersecting);
    }, { threshold: 0.35 }).observe(root);
  }

  // Las fotos de las demás diapositivas (con carga diferida) se piden cuando la página ya ha cargado, para que estén
  // listas antes de que les toque, también si se salta directamente a una.
  const eager = () => root.querySelectorAll<HTMLImageElement>('[data-slide] img[loading="lazy"]').forEach((img) => (img.loading = 'eager'));
  if (document.readyState === 'complete') eager();
  else window.addEventListener('load', eager, { once: true });

  // Con movimiento reducido no avanza solo; el visitante puede cambiar de diapositiva con los botones.
  if (reduceMotion) setPaused(true);
}
