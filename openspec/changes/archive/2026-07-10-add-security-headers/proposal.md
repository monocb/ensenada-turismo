## Why

El sitio se despliega en Netlify sin ninguna cabecera de seguridad HTTP configurada (`netlify.toml` solo define `[build] publish = "."`). Esto deja el sitio sin protección de bajo costo contra clickjacking, MIME-sniffing y fuga de referrer, y sin una Content-Security-Policy que limite qué orígenes pueden ejecutar scripts o cargar frames — algo que se vuelve más relevante a medida que el sitio suma integraciones de terceros (Google Fonts, embed de YouTube, y a futuro posibles formularios de concursos).

## What Changes

- Agregar un archivo `_headers` en la raíz del repo (convención de Netlify) que aplique cabeceras de seguridad a todas las rutas (`/*`).
- Definir una Content-Security-Policy que permita explícitamente los orígenes ya usados por el sitio: `fonts.googleapis.com`/`fonts.gstatic.com` (Google Fonts) y `www.youtube.com`/`www.youtube-nocookie.com` (embed dinámico inyectado por `script.js`), y que no rompa ninguna funcionalidad existente.
- Agregar `X-Frame-Options: DENY` (o `frame-ancestors 'none'` vía CSP), `X-Content-Type-Options: nosniff`, `Referrer-Policy: strict-origin-when-cross-origin`, `Permissions-Policy` restrictiva, y `Strict-Transport-Security` (HSTS) dado que el sitio ya sirve todo por HTTPS.
- No se modifica `netlify.toml` salvo que resulte necesario; Netlify aplica `_headers` automáticamente sin configuración adicional.

## Capabilities

### New Capabilities
- `security-headers`: cabeceras de seguridad HTTP aplicadas a todas las respuestas del sitio servidas por Netlify (CSP, X-Frame-Options, X-Content-Type-Options, Referrer-Policy, Permissions-Policy, HSTS).

### Modified Capabilities
(ninguna — no hay specs existentes en el repo todavía)

## Impact

- Archivos afectados: nuevo `_headers` en la raíz del repo (posiblemente `netlify.toml` si se prefiere `[[headers]]` en vez de `_headers`, pero `_headers` es más simple y no requiere build).
- No afecta `index.html`, `en-fotos/index.html`, `script.js` ni `styles.css` — es un cambio de configuración de deploy, no de código de la app.
- Riesgo principal: una CSP demasiado estricta podría bloquear silenciosamente Google Fonts o el iframe de YouTube. Se debe verificar manualmente en el sitio desplegado (o con `netlify dev`) que ambas integraciones sigan funcionando después del cambio.
- No requiere `package.json` ni build — compatible con la convención "sin build, sin dependencias" del proyecto.
