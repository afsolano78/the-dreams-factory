/**
 * Blog: textos de la interfaz y utilidades sobre la colección `blog` (src/blog/{es,en}/*.md).
 */
import { getCollection, type CollectionEntry } from 'astro:content';
import type { Lang } from '../i18n/routes';

export type Post = CollectionEntry<'blog'>;
export type Category = Post['data']['category'];

export const blogUi: Record<Lang, {
  meta: { title: string; description: string };
  eyebrow: string; title: string; lead: string;
  categories: Record<Category, string>;
  all: string; filterLabel: string;
  readingTime: string; back: string; photos: string; photoBy: string; keepReading: string; featured: string;
  /** Aviso de traducción (solo en inglés). */
  note?: string;
  gallery: { title: string; enlarge: string; close: string; prev: string; next: string; of: string };
}> = {
  es: {
    meta: {
      title: 'Blog de bodas · Consejos e inspiración · The Dreams Factory',
      description: 'Consejos para organizar vuestra boda, inspiración y nuestras novedades, escritos por Bea y Vane, wedding planners en Asturias.',
    },
    eyebrow: 'Blog',
    title: 'Ideas, consejos y *pequeñas historias*',
    lead: 'Lo que hemos aprendido organizando bodas desde 2015, lo que nos inspira y lo que nos pasa por el camino.',
    categories: { consejos: 'Consejos', inspiracion: 'Inspiración', 'nuestras-cosas': 'Nuestras cosas' },
    all: 'Todas',
    filterLabel: 'Filtrar por tema',
    readingTime: '{n} min de lectura',
    back: 'Todas las entradas',
    photos: 'Las fotos',
    photoBy: 'Fotografía',
    keepReading: 'Sigue leyendo',
    featured: 'Lo último',
    gallery: { title: 'Fotos de la entrada', enlarge: 'Ampliar la foto', close: 'Cerrar', prev: 'Foto anterior', next: 'Foto siguiente', of: 'de' },
  },
  en: {
    meta: {
      title: 'Wedding blog · Advice and inspiration · The Dreams Factory',
      description: 'Advice for planning your wedding, inspiration and our news, written by Bea and Vane, wedding planners in Asturias, Spain.',
    },
    eyebrow: 'Blog',
    title: 'Ideas, advice and *little stories*',
    lead: 'What we’ve learned planning weddings since 2015, what inspires us and what happens along the way.',
    categories: { consejos: 'Advice', inspiracion: 'Inspiration', 'nuestras-cosas': 'Our news' },
    all: 'All',
    filterLabel: 'Filter by topic',
    readingTime: '{n} min read',
    back: 'All posts',
    photos: 'The photos',
    photoBy: 'Photography',
    keepReading: 'Keep reading',
    featured: 'Latest',
    note: 'Posts translated from the original Spanish.',
    gallery: { title: 'Post photos', enlarge: 'Enlarge photo', close: 'Close', prev: 'Previous photo', next: 'Next photo', of: 'of' },
  },
};

/** Entradas de un idioma, de la más reciente a la más antigua. */
export async function getPosts(lang: Lang): Promise<Post[]> {
  const all = await getCollection('blog', (p) => p.data.lang === lang);
  return all.sort((a, b) => b.data.date.getTime() - a.data.date.getTime());
}

/** Dirección de la entrada (el nombre del archivo). */
export const slugOf = (p: Post) => p.id.split('/').pop()!;
export const postHref = (p: Post) => `${p.data.lang === 'es' ? '/blog' : '/en/blog'}/${slugOf(p)}/`;

/** Minutos de lectura (200 palabras por minuto). */
export const readingMinutes = (p: Post) => Math.max(1, Math.ceil((p.body ?? '').split(/\s+/).filter(Boolean).length / 200));

export const formatDate = (d: Date, lang: Lang) =>
  d.toLocaleDateString(lang === 'es' ? 'es-ES' : 'en-GB', { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC' });

/** La misma entrada en el otro idioma (por `translationKey`). */
export async function translationOf(p: Post, lang: Lang): Promise<Post | undefined> {
  const others = await getPosts(lang);
  return others.find((o) => o.data.translationKey === p.data.translationKey);
}

/** Entrada por su clave común, para enlazarla desde otras páginas (p. ej. la portada). */
export async function postByKey(key: string, lang: Lang): Promise<Post | undefined> {
  return (await getPosts(lang)).find((p) => p.data.translationKey === key);
}
