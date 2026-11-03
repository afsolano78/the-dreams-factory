/**
 * Colecciones de contenido de Astro. Bea y Vane las editan desde el panel (/admin, Sveltia CMS: public/admin/).
 *
 * Cada entrada es una carpeta con una versión por idioma (index.es.md e index.en.md) y sus fotos al lado:
 * - blog: src/blog/<dirección-en-español>/
 * - bodas: src/weddings/<dirección-en-español>/
 * La dirección en español es el nombre de la carpeta; la inglesa, el campo `url` de index.en.md (si falta, la misma).
 *
 * Las fotos se escriben con su nombre («portada.jpg», como las guarda el panel) o con ruta relativa («./portada.jpg»).
 */
import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

/** «foto.jpg» → «./foto.jpg» (Astro necesita la ruta relativa para optimizar la imagen). */
const rel = (v: unknown) => (typeof v === 'string' && v && !/^(\.{1,2}\/|\/|https?:)/.test(v) ? `./${v}` : v);

/** El id de cada archivo es «<carpeta>/index.<idioma>» (sin la extensión). */
const loader = (base: string) =>
  glob({ pattern: '*/index.{es,en}.md', base, generateId: ({ entry }) => entry.replace(/\.md$/, '') });

const blog = defineCollection({
  loader: loader('./src/blog'),
  schema: ({ image }) =>
    z.object({
      /** Dirección de esta versión (solo hace falta en inglés; en español es el nombre de la carpeta). */
      url: z.string().optional(),
      title: z.string(),
      /** Resumen corto para el listado y para Google. */
      description: z.string(),
      /** Fecha de publicación original. */
      date: z.coerce.date(),
      category: z.enum(['consejos', 'inspiracion', 'nuestras-cosas']),
      cover: z.preprocess(rel, image()),
      coverAlt: z.string().default(''),
      coverFocus: z.string().optional(),
      /** Fotos de la entrada (se muestran en una galería al final del texto). */
      gallery: z.array(z.object({ src: z.preprocess(rel, image()), alt: z.string().default('') })).default([]),
      /** Autor de las fotos de la galería. */
      photoCredit: z.string().optional(),
      /** Dirección en la web antigua (para las redirecciones). */
      legacyPath: z.string().optional(),
    }),
});

const weddings = defineCollection({
  loader: loader('./src/weddings'),
  schema: ({ image }) =>
    z.object({
      /** Dirección de esta versión (solo hace falta en inglés; en español es el nombre de la carpeta). */
      url: z.string().optional(),
      /** Iniciales de la pareja («I & A»). */
      couple: z.string(),
      /** «Lugar · Zona». */
      place: z.string(),
      /** Posición en el listado: las de número más bajo, primero. */
      order: z.coerce.number().default(0),
      /** Servicio contratado (vacío si no se indica). */
      service: z.preprocess((v) => v || undefined, z.enum(['integral', 'diseno', 'coordinacion']).optional()),
      photographer: z.string().default(''),
      video: z.string().optional(),
      /** Época («Otoño»). */
      season: z.string().optional(),
      /** Foto del listado. */
      cover: z.preprocess(rel, image()),
      coverAlt: z.string().default(''),
      coverFocus: z.string().optional(),
      /** Foto grande de la cabecera de su página (si no hay, la del listado). */
      hero: z.preprocess((v) => rel(v) || undefined, image().optional()),
      heroAlt: z.string().optional(),
      heroFocus: z.string().optional(),
      /** Con fotos en la galería, la boda tiene su propia página. */
      gallery: z.array(z.object({ src: z.preprocess(rel, image()), alt: z.string().default('') })).default([]),
      /** Proveedores (sin The Dreams Factory). */
      credits: z.array(z.object({ role: z.string(), name: z.string() })).default([]),
    }),
});

export const collections = { blog, weddings };
