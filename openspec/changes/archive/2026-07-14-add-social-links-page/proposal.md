## Why

El cliente mandó una captura del footer actual mostrando las 3 redes sociales y señaló que el box de cada badge "se ve gris, no translúcido". Pidió inicialmente una página nueva y dedicada solo a las redes sociales con vidrio esmerilado real y un hover con barrido de color de marca. Tras la primera implementación, corrigió el alcance: la sección tiene que vivir directamente en el inicio (última sección, después de Fragata) en vez de ser una página separada, y el hover tiene que cambiar el color de fondo de toda la sección — no el fondo de cada badge — dejando que los badges (vidrio esmerilado real) revelen ese cambio de color a través suyo. Como parte de esa decisión, confirmó que ya no quiere las 3 redes en el footer del sitio — la sección nueva las reemplaza.

## What Changes

- Se agrega una sección nueva `#redes` al final de `index.html`, después de la sección Fragata (última sección de contenido antes del footer), con los 3 links de redes sociales (Instagram, Facebook, TikTok) centrados, cada uno como un badge de vidrio esmerilado real (`backdrop-filter: blur`, sin color de fondo propio).
- Al pasar el mouse o llevar el foco de teclado sobre un badge, el color de fondo de **toda la sección** cambia al color de marca asignado a esa red, entrando desde un costado vía `transform` (no un crossfade ni un cambio instantáneo). Los badges, al ser vidrio esmerilado, dejan ver ese cambio de color a través suyo.
- Los 3 colores se toman de la paleta oficial de marca, no de los colores propios de cada plataforma: Instagram → `--brand-cyan` (#00C8FF), Facebook → `--brand-blue` (#0B55FF), TikTok → `--brand-violet` (#6D5CFF).
- El link "Redes" del menú principal y del footer de las 3 páginas del sitio apunta a `/#redes` (ancla en el inicio), no a una URL propia.
- **BREAKING (contenido, no código de terceros)**: se elimina por completo la columna "Redes sociales" del footer en `index.html`, `en-fotos/index.html` y `404.html` — los 3 badges de Instagram/Facebook/TikTok que hoy están ahí desaparecen del footer, junto con su CSS. El footer pasa de 3 a 2 columnas.
- No se instala ninguna herramienta ni librería — todo el efecto se logra con CSS nativo (`backdrop-filter`, `color-mix()`, `transform`+`transition`, y el selector relacional `:has()` para que el hover de un badge dispare el cambio de fondo de su sección contenedora sin JavaScript).

## Capabilities

### New Capabilities
- `home-social-links-section`: la sección `#redes` del inicio — layout de 3 badges centrados como última sección después de Fragata, vidrio esmerilado real, cambio de color de fondo de toda la sección en hover/focus (no del badge individual), accesibilidad (paridad hover/focus-visible, reduced-motion, contraste, orden de tabulación).

### Modified Capabilities
- `site-footer-coverage`: el footer de las 3 páginas ya no incluye enlaces directos a Instagram/Facebook/TikTok — en su lugar incluye un link a `/#redes`.

### Removed Capabilities
- `footer-social-badges`: capability completa eliminada — describía el diseño de los badges de redes en el footer, que dejan de existir en cualquier página.

## Impact

- `index.html`: nueva sección `#redes` (después de `#fragata`, antes del footer); se elimina la columna "Redes sociales" del footer; el nav principal y el footer nav apuntan a `/#redes`.
- `en-fotos/index.html`, `404.html`: se elimina la columna "Redes sociales" del footer; el link "Redes" (footer nav, y main-nav en en-fotos) apunta a `/#redes`.
- `styles.css`: se elimina el CSS huérfano de `.footer-social-links`/`.social-link`/`.social-icon`/`.instagram-link`/`.facebook-link`/`.tiktok-link`; `.site-footer` pasa de 3 a 2 columnas; nuevo bloque `.redes-section`/`.redes-section-wash`/`.social-badge` (vidrio esmerilado, barrido de color de fondo de sección vía `:has()`).
- `openspec/specs/footer-social-badges/spec.md` (eliminada), `openspec/specs/site-footer-coverage/spec.md` (modificada), `openspec/specs/home-social-links-section/spec.md` (nueva).
