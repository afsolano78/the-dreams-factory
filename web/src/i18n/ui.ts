import type { Lang, RouteKey } from './routes';

/** Textos de interfaz compartidos por todas las páginas. */
export const ui = {
  es: {
    descriptor: 'Wedding planners en Asturias',
    skipLink: 'Saltar al contenido',
    quickContact: { label: 'Contacto rápido', call: 'Llamar', whatsapp: 'WhatsApp', whatsappText: 'Hola, os escribo desde la web de The Dreams Factory.' },
    nav: [
      ['services', 'Servicios'],
      ['weddings', 'Bodas'],
      ['about', 'Nosotras'],
      ['reviews', 'Opiniones'],
      ['course', 'Formación'],
      ['blog', 'Blog'],
    ] as [RouteKey, string][],
    contactButton: 'Contacto',
    menuOpen: 'Abrir menú',
    menuClose: 'Cerrar menú',
    langSwitch: { label: 'English', short: 'EN', aria: 'Idioma: español. Cambiar de idioma' },
    instagram: { title: 'Síguenos en Instagram', post: 'Ver en Instagram, publicación' },
    footer: {
      explore: 'Explora',
      education: 'Formación',
      contact: 'Contacto',
      findUs: 'Nos encontrarás en',
      exploreLinks: [
        ['services', 'Servicios'],
        ['weddings', 'Bodas'],
        ['about', 'Nosotras'],
        ['reviews', 'Opiniones'],
        ['blog', 'Blog'],
      ] as [RouteKey, string][],
      educationLinks: [
        ['course', 'The Wedding Planner Experience'],
        ['consultations', 'Tutorías online'],
      ] as [RouteKey, string][],
      legalLinks: [
        ['legal', 'Aviso legal'],
        ['privacy', 'Privacidad'],
        ['cookies', 'Cookies'],
      ] as [RouteKey, string][],
    },
    pending: {
      eyebrow: 'Prototipo',
      title: 'Esta página llega en la próxima ronda',
      text: 'El prototipo avanza página a página. Los textos ya están aprobados en la propuesta; aquí se construirá el diseño.',
      back: 'Volver al inicio',
    },
  },
  en: {
    descriptor: 'Wedding planners in Asturias, Spain',
    skipLink: 'Skip to content',
    quickContact: { label: 'Quick contact', call: 'Call', whatsapp: 'WhatsApp', whatsappText: 'Hi, I’m writing from The Dreams Factory website.' },
    nav: [
      ['services', 'Services'],
      ['weddings', 'Weddings'],
      ['about', 'About us'],
      ['reviews', 'Reviews'],
      ['course', 'Education'],
      ['blog', 'Blog'],
    ] as [RouteKey, string][],
    contactButton: 'Contact',
    menuOpen: 'Open menu',
    menuClose: 'Close menu',
    langSwitch: { label: 'Español', short: 'ES', aria: 'Language: English. Change language' },
    instagram: { title: 'Follow us on Instagram', post: 'View on Instagram, post' },
    footer: {
      explore: 'Explore',
      education: 'Education',
      contact: 'Contact',
      findUs: 'Where you’ll find us',
      exploreLinks: [
        ['services', 'Services'],
        ['weddings', 'Weddings'],
        ['about', 'About us'],
        ['reviews', 'Reviews'],
        ['blog', 'Blog'],
      ] as [RouteKey, string][],
      educationLinks: [
        ['course', 'The Wedding Planner Experience'],
        ['consultations', 'Online consultations'],
      ] as [RouteKey, string][],
      legalLinks: [
        ['legal', 'Legal notice'],
        ['privacy', 'Privacy'],
        ['cookies', 'Cookies'],
      ] as [RouteKey, string][],
    },
    pending: {
      eyebrow: 'Prototype',
      title: 'This page is coming in the next round',
      text: 'The prototype is being built page by page. The copy is already approved in the proposal; the design will be built here.',
      back: 'Back to the home page',
    },
  },
} satisfies Record<Lang, unknown>;

export type SocialName = 'Instagram' | 'Facebook' | 'TikTok';

/**
 * Publicaciones y asociaciones («Nos encontrarás en», en el pie). Logos en /public/logos: siluetas blancas que se
 * tiñen por CSS. `detail` no se ve: lo leen los lectores de pantalla y los buscadores. `ratio` = ancho / alto.
 */
export type PressLogo = { name: string; detail: Record<Lang, string>; logo: string; ratio: number; kind: 'seal' | 'wordmark'; href?: string };
export const press: PressLogo[] = [
  { name: 'Telva Novias', detail: { es: 'Nuestro trabajo publicado en Telva Novias', en: 'Our work featured in Telva Novias' }, logo: '/logos/telva-novias.png', ratio: 340 / 161, kind: 'wordmark' },
  { name: 'Zankyou', detail: { es: 'Wedding planners recomendadas por Zankyou', en: 'Wedding planners recommended by Zankyou' }, logo: '/logos/zankyou.png', ratio: 1, kind: 'seal' },
  { name: 'APBE', detail: { es: 'Socias de la Asociación Profesional de Bodas de España', en: 'Members of the Spanish Wedding Professionals Association (APBE)' }, logo: '/logos/apbe.png', ratio: 1, kind: 'seal' },
  { name: 'All Lovely Party', detail: { es: 'All Lovely Party', en: 'All Lovely Party' }, logo: '/logos/all-lovely-party.png', ratio: 248 / 240, kind: 'seal' },
];

export const contact: {
  phones: string[];
  /** Número de WhatsApp en formato internacional sin espacios ni «+» (para wa.me). PENDIENTE DE CONFIRMAR. */
  whatsapp: string;
  email: string;
  social: { name: SocialName; handle: string; url: string }[];
} = {
  phones: ['+34 659 251 373', '+34 651 867 319'],
  whatsapp: '34659251373',
  email: 'thedreamsfactoryweddingplanner@gmail.com',
  social: [
    { name: 'Instagram', handle: '@the_dreamsfactory', url: 'https://www.instagram.com/the_dreamsfactory/' },
    { name: 'Facebook', handle: 'thedreamsfactoryasturias', url: 'https://www.facebook.com/thedreamsfactoryasturias' },
    { name: 'TikTok', handle: '@thedreamsfactorywp', url: 'https://www.tiktok.com/@thedreamsfactorywp' },
  ],
};
