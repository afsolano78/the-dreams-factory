/**
 * Ajustes del sitio que se usan al construir la web (astro.config.mjs) y dentro de ella (src/).
 *
 * SITE: dominio definitivo, sin «www» (el que Google ya conoce de la web antigua). La versión con «www» se redirige a
 * esta en Cloudflare. Es la base de las canónicas, las alternativas de idioma, el mapa del sitio y las imágenes para
 * redes.
 *
 * INDEXABLE: el interruptor del lanzamiento. Mientras sea `false` (prototipo), la web pide no ser indexada por tres
 * vías: <meta name="robots" content="noindex"> en cada página, robots.txt con «Disallow: /» y la cabecera
 * X-Robots-Tag en todos los archivos (la añade astro.config.mjs a _headers). Con `true`, se quitan las tres y
 * robots.txt indica el mapa del sitio. Resto de pasos del lanzamiento: LANZAMIENTO.md.
 */
export const SITE = 'https://thedreamsfactory.es';
export const INDEXABLE = false;
