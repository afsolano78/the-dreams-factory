/**
 * robots.txt. Mientras la web no sea indexable (site.config.mjs), no deja rastrear nada; después, todo salvo el
 * panel y el servidor, e indica el mapa del sitio.
 */
import type { APIRoute } from 'astro';
import { SITE, INDEXABLE } from '../../site.config.mjs';

export const GET: APIRoute = () => {
  const body = INDEXABLE
    ? `User-agent: *\nDisallow: /admin/\nDisallow: /api/\n\nSitemap: ${new URL('/sitemap.xml', SITE)}\n`
    : '# Prototipo: no rastrear nada (ver site.config.mjs).\nUser-agent: *\nDisallow: /\n';
  return new Response(body, { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
};
