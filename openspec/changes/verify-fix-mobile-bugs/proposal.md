## Why

Cuatro bugs mobile documentados en `docs/pendientes/` (`bug-menu-hamburguesa.md`, `bug-portada-mobile.md`, `bug-renglon-amarillo.md`, `bug-seccion-cultura.md`) están marcados explícitamente como "no confirmados como resueltos ni pendientes hoy" desde una auditoría previa. Nadie verificó su estado actual en un viewport mobile real. Se verificó cada uno con Chrome headless emulando mobile (320–430px) sobre `netlify dev`:

- **Menú hamburguesa** (reporte: mostraba 6 líneas): NO reproducible. El ícono muestra 3 líneas correctamente, `aria-expanded` alterna bien, el menú abre y cierra.
- **Sección Cultura sin fotos**: NO reproducible. Las 6 fotos del carrusel cargan y se muestran correctamente al navegar con las flechas.
- **"Renglón amarillo" rompiendo el layout**: NO reproducible. No se detectó overflow horizontal en ningún punto de la página (`document.documentElement.scrollWidth === window.innerWidth` en todos los anchos probados).
- **Portada mobile con problemas de responsive**: la imagen de fondo del hero está bien posicionada, pero se encontró un **bug real y vigente distinto**: el `<h1>ENSENADA</h1>` del hero queda **cortado/ilegible** en todo el rango de anchos mobile comunes (320–430px) por una regla `white-space: nowrap` combinada con un `font-size` demasiado grande en el último bloque `@media (max-width: 760px)` de `styles.css` (línea ~7874). Medido con canvas: el texto renderizado mide entre 401px (320px de viewport) y 539px (430px de viewport), mientras el contenedor disponible mide entre 290px y 400px — el texto siempre excede el espacio disponible y queda recortado por `overflow: hidden`/`overflow-x: clip`.

## What Changes

- Corregir el `font-size` del `.hero h1` en el bloque `@media (max-width: 760px)` (`styles.css` línea 7877) para que el texto "ENSENADA" quepa sin recortarse en todo el rango 320–760px, manteniendo `white-space: nowrap` (título de una sola línea, como está diseñado).
- Actualizar los 4 archivos de `docs/pendientes/` para reflejar el estado verificado: 3 se marcan como resueltos/no reproducibles (con fecha y método de verificación), y `bug-portada-mobile.md` se actualiza para describir el problema real encontrado (recorte del `<h1>`, no la imagen de fondo).
- No se toca ningún otro bloque `.hero h1` de los ~15 que existen en el archivo (fuera de alcance; el bloque de línea 7874 es el que gana la cascada en este rango de anchos, confirmado empíricamente con `getComputedStyle`).

## Capabilities

### New Capabilities
(ninguna)

### Modified Capabilities
(ninguna — no hay spec previa de layout/hero; este cambio es una corrección de bug de presentación, no un cambio de comportamiento/requirement funcional. Se documenta igual con specs para dejar registro verificable de "qué se espera que no rompa".)

- `mobile-hero-layout`: nueva capability — el título del hero debe permanecer legible (sin recortarse) en viewports mobile.

## Impact

- Archivo afectado: `styles.css` (una sola regla `font-size` dentro de un `@media (max-width: 760px)` existente).
- Archivos de documentación afectados: los 4 `docs/pendientes/bug-*.md`.
- Sin impacto en HTML ni JS.
- Riesgo bajo/acotado: cambio de una línea CSS ya cubierta por `!important` existente, sin tocar la cascada de los demás bloques `.hero h1`.
