## 1. HTML — eliminar la cápsula del hero

- [x] 1.1 En `index.html`, eliminar por completo `<section class="social-strip" aria-label="Redes sociales de Turismo Ensenada">...</section>` (con su `nav.social-strip-links` y los 3 `<a>`).

## 2. HTML — footer con badges (3 páginas)

- [x] 2.1 En `index.html`, reemplazar el contenido de `<nav class="footer-links footer-social-links">` (3 `<a>` de texto plano) por los 3 badges completos que tenía `.social-strip` (mismo `class="social-link {instagram|facebook|tiktok}-link"`, mismo `span.social-icon` con SVG inline, mismo `<strong>` con el handle, mismos `href`/`target`/`rel`).
- [x] 2.2 Aplicar el mismo reemplazo en `en-fotos/index.html`.
- [x] 2.3 Aplicar el mismo reemplazo en `404.html`.

## 3. CSS — nuevos badges del footer

- [x] 3.1 Agregar al final de `styles.css` (comentario fechado) `.footer-social-links a` con: `display:inline-flex; align-items:center; gap:10px; padding:8px 16px 8px 8px; border-radius:999px; color:#ffffff !important` (pisa el dorado heredado de `.footer-links a`), `background: rgba(255,255,255,0.1)` (translúcido), `box-shadow` leve (ej. `0 6px 18px rgba(0,0,0,0.18)`), `transition: background 220ms ease, transform 220ms ease, box-shadow 220ms ease`.
- [x] 3.2 Agregar `.footer-social-links .social-icon` (círculo contenedor del ícono, ~32px, `background: rgba(255,255,255,0.14)`) y `.footer-social-links .social-icon svg` (tamaño del ícono).
- [x] 3.3 Agregar `.footer-social-links a strong` (tamaño/peso de fuente del handle).
- [x] 3.4 Agregar `.footer-social-links a:hover, .footer-social-links a:focus-visible` con `transform: translateY(-3px)` y fondo más opaco, reusando el mismo patrón de elevación que tenía `.social-strip-links a:hover`.

## 4. CSS — limpieza de `.social-strip`

- [x] 4.1 Confirmar con `grep -n "\.social-strip"` en `styles.css` todos los bloques (base + responsive, ~18 en total) antes de empezar a borrar.
- [x] 4.2 Eliminar todas las reglas de `.social-strip`, `.social-strip.is-leaving`, `.social-strip-links`, `.social-strip-links a`, `.social-strip-links a strong`, `.social-strip-links .social-icon`, `.social-strip-links .social-icon svg`, `.social-strip-links a:hover`/`:focus-visible`, `.social-strip-links::-webkit-scrollbar`, y sus variantes responsive.
- [x] 4.3 Confirmar con `grep` que `.social-strip div`, `.social-strip div span`, `.social-strip div strong`, `.social-strip-links a span` (selectores ya muertos de una estructura HTML anterior) siguen sin matchear nada del DOM actual, y eliminarlos también.
- [x] 4.4 No tocar `.instagram-link .social-icon`, `.facebook-link .social-icon`, `.tiktok-link .social-icon` (colores de marca, no scopeados a `.social-strip`) — confirmar que siguen aplicando a los badges del footer sin cambios.

## 5. JavaScript

- [x] 5.1 En `script.js`, eliminar `const socialStrip = document.querySelector(".social-strip");`.
- [x] 5.2 Eliminar la línea `socialStrip?.classList.toggle("is-leaving", ...)` dentro de `refreshHeader()`.

## 6. Verificación

- [x] 6.1 Servir el sitio en local (`npx serve .`) y verificar visualmente las 3 páginas: sin cápsula bajo el hero en `index.html`, footer con badges (ícono + handle, colores de marca correctos, translúcidos con sombra leve) en las 3 páginas, hover con elevación funcionando, en mobile/tablet/desktop.
- [x] 6.2 Confirmar con `grep` que no queda `social-strip` en `index.html`/`styles.css`/`script.js`.
- [x] 6.3 Correr `node --check script.js` y verificar balance de llaves en `styles.css`.
- [x] 6.4 Confirmar que los 3 links (Instagram/Facebook/TikTok) siguen apuntando a las URLs correctas en las 3 páginas.

## 7. OpenSpec

- [x] 7.1 Ejecutar `/opsx:sync` para aplicar la spec `footer-social-badges` a `openspec/specs/`.
- [x] 7.2 Archivar el cambio con `/opsx:archive` una vez verificada la implementación.
