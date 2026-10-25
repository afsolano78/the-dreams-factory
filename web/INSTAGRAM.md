# Instagram en la portada

La franja «Síguenos en Instagram» de la portada muestra las 6 últimas publicaciones de **@the_dreamsfactory**.
Las lee el Worker de Cloudflare (`worker/instagram.ts`) una vez al día con la API oficial de Instagram, guarda las
fotos en Cloudflare y las sirve desde nuestro dominio: el visitante no se conecta a Instagram, no hay scripts ni
cookies de Meta y la política de cookies sigue siendo válida.

Mientras no esté configurado (o si Instagram falla), la franja muestra las fotos de bodas de siempre.

- Vídeos y reels: se muestra su portada. Carruseles: la primera foto.
- Cada foto enlaza a su publicación. El texto alternativo sale del pie de foto (sin las etiquetas #).
- El código de acceso de Instagram dura 60 días: el Worker lo renueva solo cada semana.

## Puesta en marcha (una sola vez)

### 1. Cuenta profesional

En la app de Instagram, con la cuenta @the_dreamsfactory: **Ajustes → Tipo de cuenta y herramientas → Cambiar a
cuenta profesional** (Empresa o Creador). Es gratis y no cambia nada para los seguidores. Si ya lo es, saltar este paso.

### 2. App en Meta for Developers

1. Entrar en <https://developers.facebook.com> con una cuenta de Facebook (la de Bea, Vane o la tuya) y aceptar las
   condiciones de desarrollador si lo pide.
2. **Mis apps → Crear app**. Nombre: «The Dreams Factory web». Caso de uso: **Administrar mensajes y contenido en
   Instagram** (o «Instagram API»). Tipo: Empresa.
3. En la app: **Casos de uso → Instagram API → Configuración de la API con inicio de sesión de Instagram**.
4. En **Roles de la app → Roles → Evaluadores de Instagram**, añadir `the_dreamsfactory`. Aceptar la invitación en
   Instagram: **Ajustes → Apps y sitios web → Invitaciones de evaluador** (en la web de Instagram si no aparece en el móvil).
5. Volver a **Configuración de la API con inicio de sesión de Instagram → Generar identificadores de acceso →
   Añadir cuenta**, entrar con @the_dreamsfactory y aceptar el permiso `instagram_business_basic` (solo lectura).
6. Pulsar **Generar identificador** y copiar el código (empieza por `IG…`). **No lo envíes por chat ni correo**: se
   pega directamente en Cloudflare (paso 3.2).

La app puede quedarse en «modo de desarrollo»: solo lee nuestra propia cuenta, así que no hace falta la revisión de Meta.

### 3. Cloudflare

1. **Almacenamiento (KV):** panel de Cloudflare → **Storage & databases → Workers KV → Create instance**. Nombre:
   `dreams-instagram`. Copiar su **ID** (no es secreto) y pasárselo a Claude para añadirlo a `wrangler.jsonc`.
2. **Código de Instagram:** **Workers & Pages → dreams-factory-prototipo → Settings → Variables and secrets → Add**.
   Tipo **Secret**, nombre `IG_TOKEN`, valor: el código del paso 2.6. Guardar.

Con el ID del KV, Claude añade en `wrangler.jsonc`:

```jsonc
"kv_namespaces": [{ "binding": "INSTAGRAM", "id": "<ID del KV>" }],
// Reduce las fotos a 720 px en WebP (Cloudflare Images; el plan gratuito incluye 5000 transformaciones al mes y
// aquí se usan unas pocas al día). Sin esta línea las fotos se guardan tal cual las da Instagram.
"images": { "binding": "IMAGES" },
```

Al publicarse, la primera visita a la portada prepara las publicaciones (tarda unos segundos) y desde ahí se
actualizan cada día a las 5:17 (hora UTC).

## Si deja de actualizarse

- En **Workers & Pages → dreams-factory-prototipo → Observability**, buscar líneas `[instagram]`.
- Si el código ha dejado de valer (cambio de contraseña de Instagram, permisos retirados o más de 60 días sin
  renovarse): generar uno nuevo (paso 2.5–2.6) y sustituir el secreto `IG_TOKEN`. El Worker detecta el cambio solo.

## Probar en local

`worker/instagram.ts` acepta la variable `IG_API` para usar una API falsa en lugar de la de Instagram. Con una
configuración de prueba que tenga KV, Images, `IG_TOKEN` e `IG_API`:
`npx wrangler@4 dev -c <config de prueba> --local`, y `GET /api/instagram`.
