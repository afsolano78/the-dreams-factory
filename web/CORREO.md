# Correo @thedreamsfactory.es

Decisión: **sin buzón propio**. Lo que llega a `contacto@thedreamsfactory.es` se reenvía al Gmail
(`thedreamsfactoryweddingplanner@gmail.com`) con **Cloudflare Email Routing**, y desde ese Gmail se puede **responder
como** `contacto@` enviando a través de **Resend** (el mismo servicio que usa el formulario de la web). Coste: cero.

Hasta que se haga el paso 2, el correo sigue en el servidor antiguo de IONOS (Plesk), como siempre.

## 1. Traer los correos antiguos al Gmail (opcional, mientras el servidor siga encendido)

En Gmail → ⚙️ **Ver todos los ajustes → Cuentas e importación → Consultar el correo de otras cuentas → Añadir una
cuenta de correo**:

- Dirección: `contacto@thedreamsfactory.es` → «Importar correos de mi otra cuenta (POP3)».
- Usuario: `contacto@thedreamsfactory.es`; contraseña: la del buzón actual.
- Servidor POP: `mail.thedreamsfactory.es`, puerto **995**, marcar «Utilizar siempre una conexión segura (SSL)».
- Marcar «Etiquetar los mensajes entrantes», para que queden agrupados con una etiqueta. Lo de «Dejar una copia en el
  servidor» da igual: el servidor se apagará.

Cuando haya terminado de traerlos (puede tardar horas si hay muchos), borrar esa cuenta de la lista.

## 2. Reenvío: Cloudflare Email Routing

Requisito: el dominio ya **«Active»** en Cloudflare.

Cloudflare → `thedreamsfactory.es` → **Email → Email Routing**:

1. **Get started / Enable Email Routing.**
2. **Destination addresses → Add**: `thedreamsfactoryweddingplanner@gmail.com`. Llega un correo de Cloudflare a ese
   Gmail: abrirlo y pulsar el enlace de verificación.
3. **Routing rules → Create address**: `contacto` → acción *Send to an email* → el Gmail. (Se pueden crear más igual,
   p. ej. `bea@`, `vane@`, `hola@`.)
4. Cloudflare pedirá **cambiar los registros DNS** («Add records and enable»): aceptar. Quita el MX antiguo
   (`mail.thedreamsfactory.es`) y pone los suyos (`route1/2/3.mx.cloudflare.net`) y el SPF. Desde ese momento el correo
   ya no llega al servidor antiguo.
5. **SPF**: tiene que quedar **un solo** registro TXT en la raíz que empiece por `v=spf1`:
   `v=spf1 include:_spf.mx.cloudflare.net ~all`. Si queda también el antiguo (`v=spf1 +a +mx +a:s20833955…`), borrar
   el antiguo.
6. «Catch-all» (cualquier dirección inventada): dejarlo **desactivado**, para no recibir spam a direcciones al azar.
7. **Probar**: desde otro correo (no el Gmail), escribir a `contacto@thedreamsfactory.es` y comprobar que llega.

## 3. Responder como contacto@ desde Gmail

**a) Clave de Resend** (la crea quien tenga acceso a Resend; no se manda por chat ni por correo):
Resend → **API Keys → Create API Key** → nombre «Gmail contacto», permiso **Sending access**, dominio
`thedreamsfactory.es` → copiar la clave (solo se ve una vez) y pegarla directamente en el paso b.

**b) Gmail** → ⚙️ **Ver todos los ajustes → Cuentas e importación → Enviar como → Añadir otra dirección de correo**:

- Nombre: `The Dreams Factory`; dirección: `contacto@thedreamsfactory.es`; dejar marcado «Tratar como un alias».
- Servidor SMTP: `smtp.resend.com` · puerto **465** · usuario: `resend` · contraseña: la clave del paso a ·
  «Conexión segura mediante SSL».
- Gmail manda un código a `contacto@`, que ya llega al propio Gmail (paso 2): copiarlo para confirmar.
- En esa misma sección, marcar **«Responder desde la misma dirección a la que se envió el mensaje»**.

Al escribir un correo nuevo, en «De» se puede elegir el Gmail o `contacto@thedreamsfactory.es`.

Límite del plan gratuito de Resend: 100 correos al día y 3.000 al mes, compartidos con el formulario de la web. De sobra
para el uso normal.

## 4. Al apagar el servidor antiguo

En Cloudflare → DNS, borrar los registros que solo servían al servidor: `mail` y `webmail` (A `82.223.39.71`) y el TXT
`default._domainkey`. Dejar siempre `resend._domainkey`, `send`, `rsend` y `_dmarc`.
