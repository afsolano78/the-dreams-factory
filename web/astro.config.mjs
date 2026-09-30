// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  site: 'https://www.thedreamsfactory.es',
  i18n: {
    defaultLocale: 'es',
    locales: ['es', 'en'],
    routing: { prefixDefaultLocale: false },
  },
  // La barra de desarrollo tapa contenido en las revisiones del prototipo.
  devToolbar: { enabled: false },
  vite: {
    plugins: [tailwindcss()],
  },
});
