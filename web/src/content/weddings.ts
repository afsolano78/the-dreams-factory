/**
 * Bodas: listado (/bodas, /en/weddings) y una página por boda (/bodas/{slug}, /en/weddings/{slug}).
 *
 * Las bodas están en src/weddings/<dirección-en-español>/ (index.es.md e index.en.md, con sus fotos al lado) y Bea y
 * Vane las editan desde el panel (/admin). Aquí se leen y se juntan los dos idiomas de cada boda. Las que tienen fotos
 * en la galería tienen su propia página; el resto aparece en el listado con «Galería próximamente».
 *
 * Origen de las primeras: las bodas publicadas en la web antigua, con sus textos y la lista de proveedores. Las parejas
 * van solo con iniciales.
 */
import type { ImageMetadata } from 'astro';
import { getCollection, type CollectionEntry } from 'astro:content';
import type { Lang } from '../i18n/routes';

type T = Record<Lang, string>;
export type WeddingPhoto = { src: ImageMetadata; alt: T; focus?: string };

/** Servicio contratado (mismos nombres que la página de Servicios). */
export type Service = 'integral' | 'diseno' | 'coordinacion';

export type Wedding = {
  /** Dirección de su página en cada idioma (sin /bodas/ ni /en/weddings/). */
  slug: T;
  couple: string;
  /** «Lugar · Zona». */
  place: string;
  service?: Service;
  photographer: string;
  cover: WeddingPhoto;
  /** Solo las bodas con fotos en la galería. */
  page?: {
    hero: WeddingPhoto;
    season?: T;
    video?: string;
    /** Su historia, en párrafos. */
    story: Record<Lang, string[]>;
    gallery: WeddingPhoto[];
    /** Proveedores (sin The Dreams Factory). */
    credits: { role: T; name: string }[];
  };
};

export const weddingsPage: Record<Lang, {
  meta: { title: string; description: string };
  eyebrow: string; title: string; lead: string;
  services: Record<Service, string>;
  viewLabel: string; soon: string; photoBy: string;
  press: { eyebrow: string };
  detail: {
    back: string; facts: { place: string; season: string; service: string; photo: string; video: string };
    gallery: string; credits: string; more: string; all: string; enlarge: string; close: string; prev: string; next: string; of: string;
  };
}> = {
  es: {
    meta: {
      title: 'Bodas en Asturias · The Dreams Factory',
      description: 'Bodas reales que hemos organizado, diseñado y coordinado en palacios, castillos, casas de campo y montaña de Asturias.',
    },
    eyebrow: 'Bodas',
    title: 'Días que *seguimos recordando*',
    lead: 'Cada boda es la historia de una pareja. Estas son algunas de las que hemos tenido la suerte de acompañar en Asturias, cada una a su manera.',
    services: { integral: 'Organización integral', diseno: 'Diseño y coordinación del día B', coordinacion: 'Coordinación del día B' },
    viewLabel: 'Ver la boda',
    soon: 'Galería próximamente',
    photoBy: 'Fotografía',
    press: { eyebrow: 'Nuestras bodas, publicadas en' },
    detail: {
      back: 'Todas las bodas',
      facts: { place: 'Lugar', season: 'Época', service: 'Servicio', photo: 'Fotografía', video: 'Vídeo' },
      gallery: 'El día',
      credits: 'Proveedores',
      more: 'Más bodas',
      all: 'Ver todas las bodas',
      enlarge: 'Ampliar la foto',
      close: 'Cerrar',
      prev: 'Foto anterior',
      next: 'Foto siguiente',
      of: 'de',
    },
  },
  en: {
    meta: {
      title: 'Weddings in Asturias, Spain · The Dreams Factory',
      description: 'Real weddings we have planned, designed and coordinated in palaces, castles, country houses and mountain venues in Asturias.',
    },
    eyebrow: 'Weddings',
    title: 'Days we *still remember*',
    lead: 'Every wedding tells a couple’s story. These are some of the ones we have been lucky enough to be part of in Asturias, each in its own way.',
    services: { integral: 'Full planning', diseno: 'Design & wedding-day coordination', coordinacion: 'Wedding-day coordination' },
    viewLabel: 'See the wedding',
    soon: 'Gallery coming soon',
    photoBy: 'Photography',
    press: { eyebrow: 'Our weddings, featured in' },
    detail: {
      back: 'All weddings',
      facts: { place: 'Venue', season: 'Season', service: 'Service', photo: 'Photography', video: 'Video' },
      gallery: 'The day',
      credits: 'Suppliers',
      more: 'More weddings',
      all: 'See all weddings',
      enlarge: 'Enlarge photo',
      close: 'Close',
      prev: 'Previous photo',
      next: 'Next photo',
      of: 'of',
    },
  },
};

type Entry = CollectionEntry<'weddings'>;

/** Párrafos de la historia (el texto del archivo), sin las marcas de Markdown más comunes. */
const paragraphs = (body = '') =>
  body
    .split(/\n\s*\n/)
    .map((p) => p.replace(/\s*\n\s*/g, ' ').replace(/(\*\*|__|\*|_)(.+?)\1/g, '$2').trim())
    .filter(Boolean);

function toWedding(folder: string, es: Entry, en: Entry = es): Wedding {
  const e = es.data;
  const n = en.data;
  const photo = (src: ImageMetadata, altEs: string, altEn: string, focus?: string): WeddingPhoto => ({ src, alt: { es: altEs, en: altEn || altEs }, focus });
  const wedding: Wedding = {
    slug: { es: e.url || folder, en: n.url || folder },
    couple: e.couple,
    place: e.place,
    service: e.service,
    photographer: e.photographer,
    cover: photo(e.cover, e.coverAlt, n.coverAlt, e.coverFocus),
  };
  if (e.gallery.length) {
    wedding.page = {
      hero: e.hero ? photo(e.hero, e.heroAlt ?? '', n.heroAlt ?? '', e.heroFocus) : wedding.cover,
      season: e.season ? { es: e.season, en: n.season || e.season } : undefined,
      video: e.video,
      story: { es: paragraphs(es.body), en: paragraphs(en.body).length ? paragraphs(en.body) : paragraphs(es.body) },
      // En inglés, el texto de cada foto es el de la misma posición en index.en.md.
      gallery: e.gallery.map((g, i) => photo(g.src, g.alt, n.gallery[i]?.alt ?? '')),
      credits: e.credits.map((c, i) => ({ role: { es: c.role, en: n.credits[i]?.role || c.role }, name: c.name })),
    };
  }
  return wedding;
}

let cache: Promise<Wedding[]> | undefined;

/** Todas las bodas, en el orden del listado (campo `order`: las de número más bajo, primero). */
export function getWeddings(): Promise<Wedding[]> {
  cache ??= (async () => {
    const entries = await getCollection('weddings');
    const byFolder = new Map<string, Partial<Record<Lang, Entry>>>();
    for (const entry of entries) {
      const [folder, file] = entry.id.split('/');
      const lang = file.split('.').pop() as Lang;
      byFolder.set(folder, { ...byFolder.get(folder), [lang]: entry });
    }
    return [...byFolder]
      .filter(([, v]) => v.es)
      .sort(([fa, a], [fb, b]) => a.es!.data.order - b.es!.data.order || fa.localeCompare(fb))
      .map(([folder, v]) => toWedding(folder, v.es!, v.en));
  })();
  return cache;
}

/** Dirección de la página de una boda (o del listado, si aún no tiene página). */
export function weddingHref(w: Wedding, lang: Lang): string {
  const base = lang === 'es' ? '/bodas' : '/en/weddings';
  return w.page ? `${base}/${w.slug[lang]}` : base;
}

/** La boda de una pareja (por sus iniciales, como aparecen en la portada). */
export const weddingByCouple = async (couple: string) => (await getWeddings()).find((w) => w.couple === couple);
