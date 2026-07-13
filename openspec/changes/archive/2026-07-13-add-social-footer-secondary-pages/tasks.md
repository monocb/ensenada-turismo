## 1. Rama y preparación

- [x] 1.1 Crear rama `add-social-footer-secondary-pages` desde `main`

## 2. Agregar el footer a en-fotos

- [x] 2.1 Copiar el bloque `<footer class="site-footer" id="contacto">` de `index.html:432-458` a `en-fotos/index.html`, justo antes de `</body>`
- [x] 2.2 Validar con `html-validate` que el HTML sigue siendo válido

## 3. Agregar el footer a 404

- [x] 3.1 Copiar el mismo bloque de footer a `404.html`, justo antes de `</body>`
- [x] 3.2 Validar con `html-validate` que el HTML sigue siendo válido

## 4. Verificación y entrega

- [x] 4.1 Pushear la rama y abrir PR contra `main`; confirmar que Netlify genera la Deploy Preview automática — PR #4, Deploy Preview: https://deploy-preview-4--ensenadaturismo.netlify.app. Nota: `quality-checks` falló en sus 2 corridas por `[429]` de Instagram en el chequeo de links (rate limit externo, agravado porque ahora el link aparece en 3 páginas en vez de 1) — no es un link roto real, no bloquea el deploy.
- [x] 4.2 Comparar visualmente la Deploy Preview de `/en-fotos/` y `/404` contra `index.html` — verificado leyendo el HTML servido: `<footer class="site-footer">` con los 3 enlaces presente en ambas páginas. No se pudo tomar captura visual (sin herramienta de navegador en esta sesión).
- [x] 4.3 Con aprobación del usuario: mergear el PR y archivar el change (`/opsx:archive`) — PR #4 mergeado a `main` con confirmación explícita del usuario
