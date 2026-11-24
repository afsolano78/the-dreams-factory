# Correo @thedreamsfactory.es

Decisión de Bea y Vane (24-11-2026): **el dominio no tendrá correo**. El buzón `contacto@thedreamsfactory.es` del
servidor antiguo de IONOS (Plesk) se elimina: ni se redirige ni se migran los correos. El correo de trabajo es el Gmail
(`thedreamsfactoryweddingplanner@gmail.com`), que es el que aparece en la web y al que llega el formulario.

La web sí sigue **enviando** desde el dominio: el formulario manda sus avisos y la respuesta automática como
`web@thedreamsfactory.es` a través de Resend (con «Responder» dirigido al Gmail o a la pareja). Eso no necesita buzón.

## Antes de apagar el servidor antiguo

- Comprobar que **ninguna cuenta** usa `contacto@thedreamsfactory.es` para entrar o recuperar la contraseña (IONOS,
  Bodas.net, Instagram/Facebook, Google, Resend, bancos, proveedores…). Si alguna lo usa, cambiarla antes al Gmail:
  cuando el buzón desaparezca no llegarán los códigos ni los avisos.
- Avisar a quien todavía escriba a esa dirección de que pasen a usar el Gmail.

## Al apagarlo: limpiar el DNS en Cloudflare

En Cloudflare → `thedreamsfactory.es` → **DNS → Records**:

- **Borrar**: el `MX` (`mail.thedreamsfactory.es`), los `A` de `mail` y `webmail` (`82.223.39.71`) y el TXT
  `default._domainkey`.
- **SPF**: cambiar el TXT de la raíz (`v=spf1 +a +mx +a:s20833955…`) por `v=spf1 -all`, que dice que nadie envía
  correo desde la raíz del dominio (los envíos de Resend salen por el subdominio `send`, que tiene lo suyo). Así nadie
  puede hacerse pasar por @thedreamsfactory.es.
- **No tocar nunca**: `resend._domainkey`, `send`, `rsend` y `_dmarc`, que son los del formulario.

Si algún día se quiere volver a tener correo con el dominio, se puede montar en cualquier momento (Cloudflare Email
Routing gratis hacia el Gmail, o Google Workspace / Zoho).
