/**
 * Colecciones de contenido de Astro.
 *
 * blog: una entrada por archivo Markdown en src/blog/{es,en}/{slug}.md. La dirección de la entrada es el nombre del
 * archivo. Las dos versiones de una misma entrada comparten `translationKey` (así el selector de idioma las enlaza).
 * Pensado para que en el futuro se edite desde el panel (Keystatic) sin tocar código.
 */
import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const blog = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/blog' }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      /** Resumen corto para el listado y para Google. */
      description: z.string(),
      /** Fecha de publicación original. */
      date: z.coerce.date(),
      category: z.enum(['consejos', 'inspiracion', 'nuestras-cosas']),
      lang: z.enum(['es', 'en']),
      translationKey: z.string(),
      cover: image(),
      coverAlt: z.string(),
      coverFocus: z.string().optional(),
      /** Fotos de la entrada (se muestran en una galería al final del texto). */
      gallery: z.array(z.object({ src: image(), alt: z.string() })).default([]),
      /** Autor de las fotos de la galería. */
      photoCredit: z.string().optional(),
      /** Dirección en la web antigua (para las redirecciones). */
      legacyPath: z.string().optional(),
    }),
});

export const collections = { blog };
