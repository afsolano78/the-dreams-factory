/*
  Coordinación con la presentación del logo (IntroLogo.astro): los efectos de la página (aparición de bloques,
  dibujos que se trazan…) esperan a que el telón empiece a abrirse, para que no ocurran tapados por la cortina.
  Si no hay presentación (reducir movimiento, o ya terminó), se ejecutan al momento.
*/
export const INTRO_OPEN_EVENT = 'tdf:intro-open';

export function whenIntroOpen(run: () => void) {
  const html = document.documentElement;
  if (!html.classList.contains('intro') || html.classList.contains('intro-open')) {
    run();
    return;
  }
  let done = false;
  const go = () => {
    if (done) return;
    done = true;
    run();
  };
  window.addEventListener(INTRO_OPEN_EVENT, go, { once: true });
  // Red de seguridad por si el evento no llega nunca.
  setTimeout(go, 6000);
}
