/**
 * Formularios de contacto (completo en tres pasos y corto del cierre).
 *
 * - Pasos (solo el completo): el paso 2 muestra el bloque del motivo elegido y desactiva los demás.
 * - Validación en el navegador, campo a campo, con mensajes claros; el servidor vuelve a validarlo todo.
 * - Datos previos desde la dirección: ?motivo=…, ?servicio=…, ?boda=… (ver ContactForm.astro).
 * - Envío a /api/contacto (web/worker/index.ts) en JSON. Si falla, el formulario se queda tal cual (no se pierde
 *   nada) y se ofrece WhatsApp o email. En desarrollo (astro dev no tiene el Worker) el envío se simula.
 * - Antispam: campo trampa «web», hora de inicio «t» (el servidor rechaza envíos demasiado rápidos) y Turnstile si
 *   está configurado (PUBLIC_TURNSTILE_SITE_KEY).
 */
type Errors = { required: string; email: string; contact: string; privacy: string; send: string; spam: string };
type Field = HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement;

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const PHONE = /^[+()\d\s.-]{6,}$/;

export function initContactForms() {
  document.querySelectorAll<HTMLFormElement>('form[data-contact-form]').forEach(setup);
}

function setup(form: HTMLFormElement) {
  if (form.dataset.ready) return;
  form.dataset.ready = 'true';

  const box = form.closest<HTMLElement>('[data-contact]')!;
  const done = box.querySelector<HTMLElement>('[data-form-done]');
  const message = form.querySelector<HTMLElement>('[data-form-message]')!;
  const errors = JSON.parse(form.dataset.errors ?? '{}') as Errors;
  const full = form.dataset.contactForm === 'full';
  const startField = form.elements.namedItem('t') as HTMLInputElement | null;
  const markStart = () => { if (startField) startField.value = String(Date.now()); };
  markStart();

  // ---------- Pasos (formulario completo) ----------
  const steps = [...form.querySelectorAll<HTMLFieldSetElement>('fieldset[data-step]')];
  const dots = [...form.querySelectorAll<HTMLElement>('[data-step-dot]')];
  const stepLabel = form.querySelector<HTMLElement>('[data-step-label]');
  const back = form.querySelector<HTMLButtonElement>('[data-back]');
  const next = form.querySelector<HTMLButtonElement>('[data-next]');
  const submit = form.querySelector<HTMLButtonElement>('[data-submit]');
  let current = 1;

  const motive = () => (form.querySelector<HTMLInputElement>('input[name="motivo"]:checked')?.value ?? '');

  /** Muestra solo el bloque del paso 2 que corresponde al motivo y desactiva los campos de los demás. */
  const syncMotive = () => {
    const m = motive();
    form.querySelectorAll<HTMLElement>('[data-for]').forEach((group) => {
      const on = group.dataset.for === m;
      group.hidden = !on;
      group.querySelectorAll<Field>('input, select, textarea').forEach((el) => { el.disabled = !on; });
    });
  };

  const showStep = (n: number, focus = true) => {
    current = n;
    steps.forEach((s) => { s.hidden = Number(s.dataset.step) !== n; });
    dots.forEach((d) => {
      const i = Number(d.dataset.stepDot);
      d.dataset.current = i === n ? 'true' : '';
      d.dataset.done = i < n ? 'true' : '';
    });
    if (stepLabel) stepLabel.textContent = (stepLabel.dataset.template ?? '').replace('{n}', String(n));
    if (back) back.hidden = n === 1;
    if (next) next.hidden = n === steps.length;
    if (submit) submit.hidden = full && n !== steps.length;
    if (focus) {
      const target = steps[n - 1]?.querySelector<HTMLElement>('legend, h2, input:not([type="hidden"])');
      form.scrollIntoView({ behavior: 'smooth', block: 'start' });
      target?.focus?.({ preventScroll: true });
    }
  };

  if (full) {
    form.querySelectorAll<HTMLInputElement>('input[name="motivo"]').forEach((r) =>
      r.addEventListener('change', () => { syncMotive(); clearError('motivo'); }),
    );
    next?.addEventListener('click', () => {
      if (validate(steps[current - 1])) showStep(current + 1);
    });
    back?.addEventListener('click', () => showStep(current - 1));
    prefill();
    syncMotive();
    showStep(1, false);
  }

  /** Datos que llegan por la dirección (botones de Servicios, páginas de bodas, curso). */
  function prefill() {
    const q = new URLSearchParams(location.search);
    const m = q.get('motivo') ?? (q.get('servicio') || q.get('boda') ? 'boda' : null);
    if (m) {
      const r = form.querySelector<HTMLInputElement>(`input[name="motivo"][value="${CSS.escape(m)}"]`);
      if (r) r.checked = true;
    }
    const s = q.get('servicio');
    if (s) {
      const r = form.querySelector<HTMLInputElement>(`input[name="servicio"][value="${CSS.escape(s)}"]`);
      if (r) r.checked = true;
    }
    const b = q.get('boda');
    const idea = form.elements.namedItem('idea') as HTMLTextAreaElement | null;
    if (b && idea && !idea.value) idea.value = (form.dataset.fromWedding ?? '').replace('{couple}', b);
  }

  // ---------- Validación ----------
  function errorFor(name: string) {
    return form.querySelector<HTMLElement>(`[data-error-for="${name}"]`);
  }
  function setError(el: Field | null, name: string, text: string) {
    const p = errorFor(name);
    if (p) { p.textContent = text; p.hidden = false; p.id ||= `${form.dataset.contactForm}-${name}-error`; }
    if (el) {
      el.setAttribute('aria-invalid', 'true');
      if (p) el.setAttribute('aria-describedby', p.id);
    }
  }
  function clearError(name: string) {
    const p = errorFor(name);
    if (p) p.hidden = true;
    form.querySelectorAll<Field>(`[name="${name}"]`).forEach((el) => el.removeAttribute('aria-invalid'));
  }

  /** Valida los campos activos de un bloque (un paso o todo el formulario). Devuelve si está todo bien. */
  function validate(scope: HTMLElement): boolean {
    let firstBad: HTMLElement | null = null;
    const seen = new Set<string>();
    scope.querySelectorAll<Field>('input, select, textarea').forEach((el) => {
      if (el.disabled || !el.name || seen.has(el.name) || el.closest('[hidden]')) return;
      seen.add(el.name);
      clearError(el.name);
      const value = el.value.trim();
      let bad = '';
      if (el instanceof HTMLInputElement && el.type === 'radio') {
        if (el.required && !scope.querySelector(`input[name="${el.name}"]:checked`)) bad = errors.required;
      } else if (el instanceof HTMLInputElement && el.type === 'checkbox') {
        if (el.required && !el.checked) bad = el.name === 'privacidad' ? errors.privacy : errors.required;
      } else if (el.required && !value) {
        bad = el.name === 'contacto' ? errors.contact : errors.required;
      } else if (value && el.name === 'email' && !EMAIL.test(value)) {
        bad = errors.email;
      } else if (value && el.name === 'contacto' && !EMAIL.test(value) && !PHONE.test(value)) {
        bad = errors.contact;
      }
      if (bad) {
        setError(el, el.name, bad);
        firstBad ??= el;
      }
    });
    (firstBad as HTMLElement | null)?.focus();
    return !firstBad;
  }
  form.addEventListener('input', (e) => {
    const el = e.target as Field;
    if (el.name && el.getAttribute('aria-invalid')) clearError(el.name);
  });

  // ---------- Envío ----------
  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    message.hidden = true;
    if (!validate(form)) return;

    const data: Record<string, string> = {};
    new FormData(form).forEach((v, k) => { if (typeof v === 'string') data[k] = v; });
    data.pagina = location.pathname;

    const label = submit?.innerHTML;
    if (submit) { submit.disabled = true; submit.textContent = form.dataset.sending ?? '…'; }
    try {
      const res = await fetch(form.action, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify(data),
      });
      if (res.status === 404 && import.meta.env.DEV) {
        console.info('[contacto] Desarrollo: envío simulado', data);
        return showDone();
      }
      const out = (await res.json().catch(() => ({}))) as { ok?: boolean; error?: string };
      if (res.ok && out.ok) return showDone();
      showMessage(out.error === 'spam' ? errors.spam : errors.send);
    } catch {
      if (import.meta.env.DEV) {
        console.info('[contacto] Desarrollo: envío simulado', data);
        return showDone();
      }
      showMessage(errors.send);
    } finally {
      if (submit && label) { submit.disabled = false; submit.innerHTML = label; }
    }
  });

  function showMessage(text: string) {
    message.textContent = text;
    message.hidden = false;
    // Turnstile da un token de un solo uso: hay que pedir otro para el siguiente intento.
    (window as Window & { turnstile?: { reset: () => void } }).turnstile?.reset();
  }

  function showDone() {
    form.hidden = true;
    if (done) { done.hidden = false; done.focus(); }
  }

  done?.querySelector('[data-form-again]')?.addEventListener('click', () => {
    form.reset();
    markStart();
    if (full) { syncMotive(); showStep(1); }
    done.hidden = true;
    form.hidden = false;
  });

  // Sin JavaScript el servidor redirige con ?enviado=1: aquí solo se muestra el agradecimiento.
  if (new URLSearchParams(location.search).get('enviado') === '1' && full) showDone();
}
