/**
 * Mapa del sitio (/sitemap.xml): todas las páginas en los dos idiomas, cada una con su pareja en el otro idioma
 * (xhtml:link), las bodas con página propia y las entradas del blog (con su fecha). Lo indica robots.txt cuando la
 * web es indexable.
 */
import type { APIRoute } from 'astro';
import { SITE } from '../../site.config.mjs';
import { routes, langs, type Lang } from '../i18n/routes';
import { getWeddings, weddingHref } from '../content/weddings';
import { getPosts, postHref, translationOf } from '../lib/blog';

type Entry = { paths: Record<Lang, string>; lastmod?: Date };

const url = (path: string) => new URL(path, SITE).href;
const esc = (s: string) => s.replace(/&/g, '&amp;');

export const GET: APIRoute = async () => {
  const entries: Entry[] = Object.values(routes).map((paths) => ({ paths }));

  for (const w of await getWeddings()) {
    if (w.page) entries.push({ paths: { es: weddingHref(w, 'es'), en: weddingHref(w, 'en') } });
  }

  for (const post of await getPosts('es')) {
    const en = await translationOf(post, 'en');
    entries.push({ paths: { es: postHref(post), en: en ? postHref(en) : postHref(post) }, lastmod: post.data.date });
  }

  // Una <url> por idioma; cada una enumera las dos versiones (también a sí misma), como pide Google.
  const urls = entries.flatMap(({ paths, lastmod }) =>
    langs.map((lang) => {
      const alternates = langs
        .map((l) => `    <xhtml:link rel="alternate" hreflang="${l}" href="${esc(url(paths[l]))}"/>`)
        .concat(`    <xhtml:link rel="alternate" hreflang="x-default" href="${esc(url(paths.es))}"/>`)
        .join('\n');
      const mod = lastmod ? `\n    <lastmod>${lastmod.toISOString().slice(0, 10)}</lastmod>` : '';
      return `  <url>\n    <loc>${esc(url(paths[lang]))}</loc>${mod}\n${alternates}\n  </url>`;
    }),
  );

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
${urls.join('\n')}
</urlset>
`;
  return new Response(xml, { headers: { 'Content-Type': 'application/xml; charset=utf-8' } });
};
