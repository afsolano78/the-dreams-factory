# Formulario de contacto: cómo activar el envío real

El formulario (página `/contacto` y versión corta en el cierre) envía a `/api/contacto`, que atiende el Worker
`worker/index.ts`. **Mientras no haya clave de Resend, el envío se simula**: la web da las gracias, pero no llega
ningún correo (el mensaje queda en los registros del Worker en Cloudflare).

## 1. Envío de correos (Resend)

1. Crear una cuenta en <https://resend.com> (el plan gratuito da de sobra).
2. *Domains → Add domain* → `thedreamsfactory.es`, y añadir en el DNS los registros que indica (SPF, DKIM y,
   recomendado, DMARC). Con el DNS en Cloudflare se añaden en *DNS → Records*. Esperar a que salga «Verified».
3. *API Keys → Create API key* (permiso «Sending access»).
4. En Cloudflare: *Workers & Pages → dreams-factory-prototipo → Settings → Variables and Secrets → Add* →
   tipo **Secret**, nombre `RESEND_API_KEY`, valor la clave del paso 3.

A partir de ahí los mensajes llegan a `CONTACT_TO` (el Gmail de Bea y Vane, en `wrangler.jsonc`) desde
`CONTACT_FROM` (`web@thedreamsfactory.es`), con «Responder» dirigido a la pareja.

Para probar **antes** de verificar el dominio: Resend solo permite enviar desde `onboarding@resend.dev` y solo al
email de la propia cuenta. Se puede poner temporalmente `CONTACT_FROM = "onboarding@resend.dev"` y
`CONTACT_TO` = el email de la cuenta de Resend.

## 2. Acuse de recibo a la pareja (opcional)

Con el dominio verificado, poner `"AUTOREPLY": "si"` en `wrangler.jsonc`. El texto está en `worker/index.ts`.

## 3. Antispam invisible (Cloudflare Turnstile, opcional pero recomendado)

1. Cloudflare → *Turnstile → Add widget*, modo **Managed**, con los dominios de la web.
2. La **clave del sitio** (pública) → *Workers & Pages → dreams-factory-prototipo → Settings → Build → Variables*:
   `PUBLIC_TURNSTILE_SITE_KEY` (se usa al construir la web).
3. La **clave secreta** → *Settings → Variables and Secrets*: secreto `TURNSTILE_SECRET`.

Sin Turnstile siguen activos el campo trampa y el control de tiempo.

## Qué se comprueba en el servidor

- Campo trampa `web` vacío y al menos 3 s entre abrir el formulario y enviarlo (los robots reciben «ok» y no se
  envía nada).
- Nombres, aceptación de la privacidad y un email válido (o email/teléfono en el corto).
- Longitudes máximas y solo los campos conocidos.
