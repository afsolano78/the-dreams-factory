# Panel de edición (bodas y blog)

En `/admin` (por ejemplo, `https://www.thedreamsfactory.es/admin/`) Bea y Vane pueden crear y cambiar **bodas** y
**entradas del blog**, en español e inglés, con sus fotos. Es [Sveltia CMS](https://sveltiacms.app): no hay servidor
ni base de datos aparte. Al guardar, el panel guarda el cambio en el repositorio de GitHub y Cloudflare publica la
web en uno o dos minutos.

- Configuración del panel: `public/admin/config.yml` (versión fija de Sveltia en `public/admin/index.html`).
- Contenido: `src/weddings/<boda>/` y `src/blog/<entrada>/`, cada uno con `index.es.md`, `index.en.md` y sus fotos.
- Inicio de sesión: `worker/cms-auth.ts` (en nuestro propio Worker, sin servicios de terceros).
- Si un cambio tuviera algún error, la publicación falla y **la web se queda como estaba**; el aviso sale en Cloudflare
  (Workers & Pages → dreams-factory-prototipo → Deployments).

## Puesta en marcha (una sola vez, lo hace el administrador)

### 1. Cuentas de Bea y Vane en GitHub

1. Cada una se crea una cuenta gratuita en <https://github.com/signup>.
2. En el repositorio **afsolano78/the-dreams-factory** → **Settings → Collaborators → Add people**, invitar a las dos
   (permiso **Write**). Cada una acepta la invitación desde el correo.

### 2. «OAuth App» en GitHub (para el botón «Iniciar sesión con GitHub»)

1. En GitHub, con la cuenta del administrador: **Settings → Developer settings → OAuth Apps → New OAuth App**.
   - Application name: `Panel The Dreams Factory`
   - Homepage URL: la dirección de la web (la del prototipo ahora; la definitiva al publicar).
   - Authorization callback URL: **la misma dirección + `/api/callback`**, por ejemplo
     `https://www.thedreamsfactory.es/api/callback`.
2. **Register application**. Copiar el **Client ID** y pulsar **Generate a new client secret** (copiarlo: solo se ve una vez).
3. En Cloudflare: **Workers & Pages → dreams-factory-prototipo → Settings → Variables and secrets → Add**:
   - `GITHUB_CLIENT_ID` = el Client ID (tipo Text o Secret).
   - `GITHUB_CLIENT_SECRET` = el secreto (tipo **Secret**).

**Al cambiar de dominio** (del prototipo al definitivo), hay que poner la nueva dirección en la «Authorization
callback URL» de la OAuth App. Mientras el prototipo esté protegido con Cloudflare Access, Bea y Vane necesitan estar
en la lista de correos permitidos para llegar al panel.

### 3. Traducción automática (opcional)

El panel tiene un botón para traducir al inglés lo escrito en español. **DeepL no está disponible** en Sveltia por
ahora; sirven, entre otros:

- **Google Cloud Translation**: gratis hasta 500.000 caracteres al mes (pide una cuenta de Google Cloud con tarjeta).
- **Anthropic (Claude)** u **OpenAI**: de pago por uso, con un mínimo de unos 5 € de saldo; para unas pocas bodas y
  entradas al año, céntimos.
- **Google Gemini**: tiene un nivel gratuito, pero Google puede usar los textos para mejorar sus productos.

La clave del servicio se pega una vez en el panel (⚙ Ajustes → Traducción) y se guarda en ese navegador.

## Uso (para Bea y Vane)

1. Entrar en `/admin` → **Iniciar sesión con GitHub**.
2. **Bodas → Nueva**:
   - Pareja (iniciales), lugar, servicio, fotógrafo…
   - **Foto del listado** y una frase de qué se ve en ella.
   - **Galería**: subir las fotos (se pueden arrastrar varias). Con fotos en la galería, la boda tiene su propia página.
   - **Proveedores** y **Su historia**.
   - **Orden en el listado**: con 0 sale la primera; las de número más bajo, antes.
3. Arriba, cambiar a **English** y pulsar **Traducir** (o escribir el inglés). En las bodas, lo que quede vacío en
   inglés se muestra en español.
4. **Guardar**. En uno o dos minutos está en la web.

Las fotos pueden subirse tal cual salen de la cámara: el panel las convierte a WebP y las reduce a 2400 px, y la web
las vuelve a optimizar para cada pantalla.

El **blog** funciona igual: título, resumen, fecha, tema, foto de portada, texto y (opcional) galería al final.
