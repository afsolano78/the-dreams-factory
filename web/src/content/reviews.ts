/**
 * Página «Opiniones» (/opiniones, /en/reviews). ES y EN.
 *
 * Aquí están los textos de la página. Las opiniones están en src/reviews/<pareja>/ (index.es.md con el original,
 * index.en.md traducido y su foto al lado) y Bea y Vane las editan desde el panel (/admin).
 *
 * Origen: las opiniones publicadas en la web antigua (2017-2020), sin las de Sonia y Alberto, Patricia y Gerardo,
 * Nuria y Manel y Katherine y Albano (quitadas a petición de Bea y Vane, para no alargar la página), y las más
 * recientes de su ficha de Google (sin foto). Literales: solo se corrigen erratas. Las parejas, solo por su nombre de
 * pila (en las de Google, el de quien la escribió). Para el resto, los enlaces de «Encuéntranos también en».
 *
 * Orden del mosaico (campo `order`): casi siempre de la más reciente a la más antigua, pero las que no tienen foto
 * van intercaladas entre las que sí, y la primera siempre lleva foto.
 */
import type { ImageMetadata } from 'astro';
import { getCollection, type CollectionEntry } from 'astro:content';
import type { Lang } from '../i18n/routes';

type T = Record<Lang, string>;

export type Review = {
  /** Nombres de pila de la pareja en cada idioma («Nadia y Tomás» / «Nadia & Tomás»). */
  couple: T;
  place?: string;
  /** Iniciales de su boda en el listado de Bodas. */
  wedding?: string;
  /** La frase que se destaca en la tarjeta. */
  highlight: T;
  text: Record<Lang, string[]>;
  photo?: { src: ImageMetadata; focus?: string };
  /** Fotógrafo de la foto de su boda. */
  credit?: string;
};

export const reviewsPage: Record<Lang, {
  meta: { title: string; description: string };
  eyebrow: string; title: string; lead: string;
  hero: { quote: string; author: string };
  themes: { eyebrow: string; title: string; items: { title: string; quote: string; author: string }[] };
  featured: { eyebrow: string };
  all: { eyebrow: string; title: string };
  readMore: string; readLess: string; seeWedding: string; photoBy: string;
  /** Aviso de traducción (solo en inglés). */
  note?: string;
  profiles: { eyebrow: string; title: string; items: { name: string; href: string; rating?: string }[] };
}> = {
  es: {
    meta: {
      title: 'Opiniones de parejas · The Dreams Factory, wedding planners en Asturias',
      description: 'Lo que dicen las parejas que han confiado en Bea y Vane para organizar, diseñar y coordinar su boda en Asturias.',
    },
    eyebrow: 'Opiniones',
    title: 'Lo que dicen\n*las parejas*',
    lead: 'Sus palabras, tal cual nos las escribieron. Son, de todo lo que hacemos, lo que más nos emociona.',
    hero: { quote: '«Con ellas, es imposible que una boda no salga bien.»', author: 'Marta y Omar' },
    themes: {
      eyebrow: 'Lo que más repiten',
      title: 'Tres cosas que *nunca faltan*',
      items: [
        { title: 'Tranquilidad', quote: '«Consiguieron transmitirnos una calma y una seguridad que hicieron que pudiéramos despreocuparnos y disfrutar al máximo de cada momento.»', author: 'Alba y Dani' },
        { title: 'Detalles', quote: '«Una brillante capacidad para materializar nuestros gustos y nuestras ideas en un sinfín de detalles acertados y minuciosos.»', author: 'David y Germán' },
        { title: 'Cercanía', quote: '«Capaces de emocionarse y vivir una boda tanto como lo hemos vivido nosotros.»', author: 'Marta y Omar' },
      ],
    },
    featured: { eyebrow: 'Una carta que guardamos' },
    all: { eyebrow: 'Todas las opiniones', title: 'En sus *palabras*' },
    readMore: 'Leer su opinión completa',
    readLess: 'Cerrar',
    seeWedding: 'Ver su boda',
    photoBy: 'Foto',
    profiles: { eyebrow: 'Más opiniones', title: 'Encuéntranos *también en*', items: [{ name: 'Google', href: 'https://maps.google.com/?cid=7217640799929621108', rating: '5,0 · 26 opiniones' }, { name: 'Bodas.net', href: 'https://www.bodas.net/organizacion-bodas/the-dreams-factory--e73577', rating: '4,9 · 33 opiniones' }] },
  },
  en: {
    meta: {
      title: 'Reviews from couples · The Dreams Factory, wedding planners in Asturias',
      description: 'What couples say about Bea and Vane, who planned, designed and coordinated their weddings in Asturias, Spain.',
    },
    eyebrow: 'Reviews',
    title: 'What couples\n*say about us*',
    lead: 'Their words, just as they wrote them to us. Of everything we do, this is what moves us most.',
    hero: { quote: '“With them, it’s impossible for a wedding not to go well.”', author: 'Marta & Omar' },
    themes: {
      eyebrow: 'What they mention most',
      title: 'Three things that are *always there*',
      items: [
        { title: 'Peace of mind', quote: '“They gave us such calm and confidence that we could stop worrying and enjoy every moment to the full.”', author: 'Alba & Dani' },
        { title: 'Details', quote: '“A brilliant ability to turn our tastes and ideas into countless well-chosen, meticulous details.”', author: 'David & Germán' },
        { title: 'Closeness', quote: '“They get as moved and live a wedding as intensely as we did.”', author: 'Marta & Omar' },
      ],
    },
    featured: { eyebrow: 'A letter we treasure' },
    all: { eyebrow: 'All reviews', title: 'In their *own words*' },
    readMore: 'Read the full review',
    readLess: 'Close',
    seeWedding: 'See their wedding',
    photoBy: 'Photo',
    note: 'Reviews translated from the original Spanish.',
    profiles: { eyebrow: 'More reviews', title: 'You’ll also *find us on*', items: [{ name: 'Google', href: 'https://maps.google.com/?cid=7217640799929621108', rating: '5.0 · 26 reviews' }, { name: 'Bodas.net', href: 'https://www.bodas.net/organizacion-bodas/the-dreams-factory--e73577', rating: '4.9 · 33 reviews' }] },
  },
};

type Entry = CollectionEntry<'reviews'>;

/** Párrafos del texto, sin las marcas de Markdown más comunes. */
const paragraphs = (body = '') =>
  body
    .split(/\n\s*\n/)
    .map((p) => p.replace(/\s*\n\s*/g, ' ').replace(/(\*\*|__|\*|_)(.+?)\1/g, '$2').trim())
    .filter(Boolean);

/** La frase destacada se escribe sin comillas; aquí se ponen las de cada idioma. */
const quote = { es: (t: string) => `«${t}»`, en: (t: string) => `“${t}”` };

let cache: Promise<{ reviews: Review[]; featured?: Review }> | undefined;

/**
 * Todas las opiniones en el orden del mosaico y la destacada (`featured`), que se muestra entera en su propio bloque.
 * En inglés, lo que falte se toma del español.
 */
export function getReviews() {
  cache ??= (async () => {
    const byFolder = new Map<string, Partial<Record<Lang, Entry>>>();
    for (const entry of await getCollection('reviews')) {
      const [folder, file] = entry.id.split('/');
      const lang = file.split('.').pop() as Lang;
      byFolder.set(folder, { ...byFolder.get(folder), [lang]: entry });
    }
    const list = [...byFolder]
      .filter(([, v]) => v.es)
      .sort(([fa, a], [fb, b]) => a.es!.data.order - b.es!.data.order || fa.localeCompare(fb))
      .map(([, v]) => {
        const es = v.es!;
        const en = v.en ?? es;
        const e = es.data;
        const n = en.data;
        const textEs = paragraphs(es.body);
        const textEn = paragraphs(en.body);
        const review: Review = {
          couple: { es: e.couple, en: n.couple || e.couple },
          place: e.place,
          wedding: e.wedding,
          highlight: { es: quote.es(e.highlight), en: quote.en(n.highlight || e.highlight) },
          text: { es: textEs, en: textEn.length ? textEn : textEs },
          photo: e.photo ? { src: e.photo, focus: e.photoFocus } : undefined,
          credit: e.credit,
        };
        return { review, featured: e.featured };
      });
    return { reviews: list.map((r) => r.review), featured: list.find((r) => r.featured)?.review };
  })();
  return cache;
}
