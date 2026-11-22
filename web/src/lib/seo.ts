/**
 * Ayudas para buscadores: títulos que caben en Google, datos estructurados (schema.org) de la empresa, de la web,
 * de las migas de pan y de las entradas del blog. BaseLayout los pinta en <head> (prop `jsonLd`).
 */
import { SITE } from '../../site.config.mjs';
import { contact } from '../i18n/ui';
import { reviewsPage } from '../content/reviews';
import { foundedYear } from '../content/brand';
import { routes, type Lang } from '../i18n/routes';

const BRAND = 'The Dreams Factory';
/** Google corta los títulos a partir de unos 60 caracteres. */
const MAX_TITLE = 60;

/** «Título · The Dreams Factory» si cabe en Google; si no, el título solo (la marca ya sale junto a la dirección). */
export const withBrand = (title: string) => {
  const full = `${title} · ${BRAND}`;
  return full.length <= MAX_TITLE ? full : title;
};

export const absolute = (path: string) => new URL(path, SITE).href;

/** Identificador común de la empresa, para que las demás fichas la citen sin repetirla. */
export const BUSINESS_ID = absolute('/#empresa');

/** La empresa como editora (con nombre y logo, para las páginas donde no está su ficha completa). */
const publisher = { '@type': 'Organization', '@id': BUSINESS_ID, name: BRAND, logo: absolute('/brand/logo-960.webp') };

/**
 * Ficha de empresa (servicio profesional con zona de trabajo): nombre, contacto, zona, perfiles y desde cuándo.
 * Sin la calle: el domicilio del aviso legal es particular y aquí basta la localidad.
 */
export function businessJsonLd(lang: Lang) {
  return {
    '@context': 'https://schema.org',
    '@type': 'ProfessionalService',
    '@id': BUSINESS_ID,
    name: BRAND,
    description:
      lang === 'es'
        ? 'Wedding planners en Asturias: organización integral, diseño y coordinación de bodas y celebraciones desde 2015.'
        : 'Wedding planners in Asturias, Spain: full planning, design and coordination of weddings and celebrations since 2015.',
    url: absolute(routes.home[lang]),
    logo: absolute('/brand/logo-960.webp'),
    image: absolute('/og-image.jpg'),
    telephone: contact.phones[0].replace(/\s/g, ''),
    email: contact.email,
    foundingDate: String(foundedYear),
    address: { '@type': 'PostalAddress', addressLocality: 'Piedras Blancas', postalCode: '33450', addressRegion: 'Asturias', addressCountry: 'ES' },
    areaServed: { '@type': 'State', name: 'Asturias' },
    knowsLanguage: ['es', 'en'],
    sameAs: [...contact.social.map((s) => s.url), ...reviewsPage.es.profiles.items.map((p) => p.href)],
  };
}

/** La web y su idioma; la empresa como editora. */
export function websiteJsonLd(lang: Lang) {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: BRAND,
    url: absolute(routes.home[lang]),
    inLanguage: lang,
    publisher,
  };
}

/** Migas de pan («Inicio › Bodas › I & A»): [nombre, dirección] desde la portada. */
export function breadcrumbJsonLd(items: [string, string][]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map(([name, path], i) => ({ '@type': 'ListItem', position: i + 1, name, item: absolute(path) })),
  };
}

/** Entrada del blog: firmada por Bea y Vane (con enlace a Nosotras) y publicada por la empresa. */
export function blogPostingJsonLd(p: { lang: Lang; title: string; description: string; path: string; image: string; date: Date }) {
  const about = absolute(routes.about[p.lang]);
  return {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: p.title,
    description: p.description,
    image: p.image,
    datePublished: p.date.toISOString().slice(0, 10),
    inLanguage: p.lang,
    mainEntityOfPage: absolute(p.path),
    author: [
      { '@type': 'Person', name: 'Bea', url: about },
      { '@type': 'Person', name: 'Vane', url: about },
    ],
    publisher,
  };
}

/** Texto seguro para <script type="application/ld+json"> (sin «</» que pudiera cerrar la etiqueta). */
export const jsonLdText = (data: unknown) => JSON.stringify(data).replace(/</g, '\\u003c');
