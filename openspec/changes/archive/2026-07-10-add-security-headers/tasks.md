## 1. Crear el archivo `_headers`

- [x] 1.1 Crear `_headers` en la raíz del repo con `/*` como path y las cabeceras: `X-Frame-Options: DENY`, `X-Content-Type-Options: nosniff`, `Referrer-Policy: strict-origin-when-cross-origin`, `Permissions-Policy` restrictiva, `Strict-Transport-Security: max-age=15552000` (6 meses, sin `preload`)
- [x] 1.2 Agregar `Content-Security-Policy` con `default-src 'self'`, `script-src 'self'`, `style-src 'self' fonts.googleapis.com`, `font-src fonts.gstatic.com`, `frame-src www.youtube.com www.youtube-nocookie.com`, `frame-ancestors 'none'`, `img-src 'self' data:`, `object-src 'none'`

## 2. Verificación local/preview

- [x] 2.1 Levantar el sitio localmente (`npx serve .` o `netlify dev` si está disponible) y confirmar que las cabeceras se envían en la respuesta de `/`
- [x] 2.2 Verificar en la consola del navegador que Google Fonts carga sin violaciones de CSP en `index.html` y `en-fotos/index.html`
- [x] 2.3 Verificar que al hacer clic en el botón de video (youtube-lite, ej. sección "El Dique"/Fuerte Barragán) el iframe de YouTube se inyecta y reproduce sin violaciones de CSP en la consola
- [x] 2.4 Confirmar que no aparece ninguna otra violación de CSP navegando el resto del sitio (menú, lightbox, modales de lugares, galería en-fotos)

## 3. Deploy y validación en producción

- [x] 3.1 Mergear el cambio a `main` y esperar el deploy automático de Netlify
- [x] 3.2 Verificar las cabeceras en el sitio en producción (por ejemplo con `curl -I https://ensenadaturismo.com/` o securityheaders.com) confirmando que CSP, X-Frame-Options, X-Content-Type-Options, Referrer-Policy, Permissions-Policy y HSTS están presentes
- [x] 3.3 Repetir la verificación manual de Google Fonts y el embed de YouTube en el sitio ya desplegado
