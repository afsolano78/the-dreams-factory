export const langs = ['es', 'en'] as const;
export type Lang = (typeof langs)[number];

/** Cada página del sitio con su dirección en cada idioma. El selector ES · EN usa este mapa. */
export const routes = {
  home: { es: '/', en: '/en' },
  services: { es: '/servicios', en: '/en/services' },
  weddings: { es: '/bodas', en: '/en/weddings' },
  about: { es: '/nosotras', en: '/en/about-us' },
  reviews: { es: '/opiniones', en: '/en/reviews' },
  course: { es: '/curso-wedding-planner', en: '/en/wedding-planner-course' },
  consultations: { es: '/tutorias-online', en: '/en/online-consultations' },
  blog: { es: '/blog', en: '/en/blog' },
  contact: { es: '/contacto', en: '/en/contact' },
  legal: { es: '/aviso-legal', en: '/en/legal-notice' },
  privacy: { es: '/privacidad', en: '/en/privacy' },
  cookies: { es: '/cookies', en: '/en/cookies' },
} as const satisfies Record<string, Record<Lang, string>>;

export type RouteKey = keyof typeof routes;

export const path = (key: RouteKey, lang: Lang) => routes[key][lang];

/** Páginas que aún no están construidas en el prototipo (se sirven con una página provisional). */
export const pendingPages: RouteKey[] = [
  'weddings', 'about', 'reviews', 'course', 'consultations', 'blog', 'contact', 'legal', 'privacy', 'cookies',
];

/** Convierte "texto con *énfasis*" en HTML seguro con <em>. */
export function emphasize(text: string): string {
  const escaped = text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
  return escaped.replace(/\*(.+?)\*/g, '<em>$1</em>').replace(/\n/g, '<br>');
}
