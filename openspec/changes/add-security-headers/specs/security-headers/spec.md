## ADDED Requirements

### Requirement: Cabeceras de seguridad HTTP en todas las rutas
El sitio SHALL enviar cabeceras de seguridad HTTP (`Content-Security-Policy`, `X-Frame-Options`, `X-Content-Type-Options`, `Referrer-Policy`, `Permissions-Policy`, `Strict-Transport-Security`) en la respuesta de todas las rutas servidas por Netlify, mediante un archivo `_headers` en la raíz del repo.

#### Scenario: Cualquier página del sitio incluye cabeceras de seguridad
- **WHEN** un navegador solicita cualquier ruta del sitio (`/`, `/en-fotos`, `/404.html`, assets, etc.)
- **THEN** la respuesta HTTP incluye `Content-Security-Policy`, `X-Frame-Options: DENY`, `X-Content-Type-Options: nosniff`, `Referrer-Policy: strict-origin-when-cross-origin`, `Permissions-Policy` y `Strict-Transport-Security`

### Requirement: La Content-Security-Policy permite Google Fonts
La CSP SHALL permitir cargar hojas de estilo de fuentes desde `fonts.googleapis.com` y archivos de fuente desde `fonts.gstatic.com`, ya que el sitio los usa en `index.html` y `en-fotos/index.html`.

#### Scenario: Google Fonts carga sin violar la CSP
- **WHEN** el navegador procesa el `<link>` de Google Fonts en `index.html` o `en-fotos/index.html`
- **THEN** la hoja de estilos y los archivos de fuente se cargan sin que la consola muestre una violación de Content-Security-Policy

### Requirement: La Content-Security-Policy permite el embed de YouTube
La CSP SHALL permitir que el sitio embeba un iframe de `www.youtube.com` (o `www.youtube-nocookie.com`), ya que `script.js` inyecta dinámicamente este iframe al interactuar con la sección de Punta Lara.

#### Scenario: El embed de YouTube se reproduce sin violar la CSP
- **WHEN** un usuario hace clic en el elemento que dispara la inyección del iframe de YouTube en `script.js`
- **THEN** el iframe se carga y el video es reproducible, sin que la consola muestre una violación de Content-Security-Policy relacionada a `frame-src`

### Requirement: El sitio no puede ser embebido en un iframe ajeno
El sitio SHALL prevenir ser cargado dentro de un `<iframe>` de un origen distinto (protección anti-clickjacking), vía `X-Frame-Options: DENY` y/o `frame-ancestors 'none'` en la CSP.

#### Scenario: Un tercero intenta embeber el sitio en un iframe
- **WHEN** una página de un origen distinto intenta cargar `ensenadaturismo.com` dentro de un `<iframe>`
- **THEN** el navegador bloquea la carga del iframe
