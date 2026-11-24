# Lanzamiento de la web en thedreamsfactory.es

Pasos del día en que la web nueva sustituye a la antigua (hoy en el servidor Plesk de IONOS). El dominio definitivo es
**sin «www»** (`https://thedreamsfactory.es`, el que Google ya conoce); la versión con «www» redirige a él. Está en
`site.config.mjs` (`SITE`).

## Antes

- Correo de @thedreamsfactory.es: decidido que el dominio no tendrá correo; `contacto@` se elimina con el servidor
  antiguo (qué revisar y qué borrar del DNS, en CORREO.md). No depende del lanzamiento de la web.
- Bea y Vane con acceso al panel (PANEL.md) e Instagram configurado (INSTAGRAM.md), si se quiere tener todo el mismo
  día.

## El día

1. **Dominio en Cloudflare.** Añadir `thedreamsfactory.es` a la cuenta de Cloudflare (o apuntar sus registros desde
   Route 53, donde está hoy la zona) y, en el Worker *dreams-factory-prototipo → Settings → Domains & Routes*,
   añadir como dominio propio `thedreamsfactory.es` y `www.thedreamsfactory.es`.
2. **Redirigir «www».** Regla de redirección en Cloudflare: `www.thedreamsfactory.es/*` → `https://thedreamsfactory.es/$1`
   con 301, conservando la ruta y los parámetros.
3. **Interruptor de indexación.** En `site.config.mjs`, `INDEXABLE = true`, y publicar. Quita el `noindex` de las
   páginas, la cabecera `X-Robots-Tag` y el bloqueo de `robots.txt`, que pasa a indicar el mapa del sitio.
4. **Quitar Cloudflare Access** de la aplicación que protege el prototipo.
5. **Dirección de pruebas.** Desactivar la de `*.workers.dev` (en `wrangler.jsonc`, `"workers_dev": false`) para que
   no quede una copia de la web en otra dirección.
6. **Panel.** En la OAuth App de GitHub, cambiar la dirección de vuelta a `https://thedreamsfactory.es/api/callback`
   (y la de inicio).
7. **Turnstile.** Ya admite `thedreamsfactory.es` y `www.thedreamsfactory.es`: nada que hacer.
8. **Comprobar** en el dominio real:
   - la portada, una boda, una entrada del blog y la página en inglés;
   - `https://thedreamsfactory.es/robots.txt` y `https://thedreamsfactory.es/sitemap.xml`;
   - tres o cuatro direcciones antiguas (por ejemplo `/i-y`, `/tu-idea-nuestro-plan`) redirigen a su página nueva;
   - `https://www.thedreamsfactory.es/bodas/` redirige a `https://thedreamsfactory.es/bodas/`;
   - el formulario de contacto envía.

## Después

- **Google Search Console:** propiedad de dominio `thedreamsfactory.es`, enviar `sitemap.xml` y, durante 2–3
  semanas, revisar el informe de páginas no encontradas (404) para añadir a `public/_redirects` lo que falte.
- **PageSpeed Insights** sobre la portada y una boda, ya en el dominio real.
- Apagar el servidor Plesk cuando el correo esté resuelto y Search Console no muestre problemas.
  **Antes de cancelar:** en IONOS el dominio figura como «Dominio adicional» del contrato del Servidor Cloud. Al
  cancelar ese contrato podría darse de baja con él: primero pasarlo a un contrato propio de solo dominio o
  transferirlo (por ejemplo, a Cloudflare Registrar), y confirmarlo con IONOS.
- Borrar la zona de Route 53 unos días después del cambio, cuando todo funcione (ya no se usa).
