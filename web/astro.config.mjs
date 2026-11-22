// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import { readFile, writeFile } from 'node:fs/promises';
import { SITE, INDEXABLE } from './site.config.mjs';

/** Mientras la web no sea indexable (site.config.mjs), _headers añade X-Robots-Tag a todos los archivos. */
const robotsHeader = {
  name: 'robots-header',
  hooks: {
    'astro:build:done': async ({ dir }) => {
      if (INDEXABLE) return;
      const file = new URL('_headers', dir);
      const headers = await readFile(file, 'utf8');
      await writeFile(file, headers.replace('/*\n', '/*\n  X-Robots-Tag: noindex, nofollow, noarchive, noimageindex\n'));
    },
  },
};

export default defineConfig({
  site: SITE,
  i18n: {
    defaultLocale: 'es',
    locales: ['es', 'en'],
    routing: { prefixDefaultLocale: false },
  },
  integrations: [robotsHeader],
  // La barra de desarrollo tapa contenido en las revisiones del prototipo.
  devToolbar: { enabled: false },
  vite: {
    plugins: [tailwindcss()],
  },
});
