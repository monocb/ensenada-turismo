## Why

El cliente pidió simplificar el footer. Primero sacar el nombre de marca y la bajada de la columna izquierda (queda redundante con el header, que ya muestra "ENSENADA" y el mismo texto). Después pidió centrar el nav de links de la columna "Guía de la página" — tras un intento que no se veía como esperaba, decidió directamente eliminar toda esa columna (heading + nav) y dejar el footer con un único contenido: el crédito de administración.

## What Changes

- `.footer-brand` pierde `<strong>ENSENADA</strong>` y el `<p>` de bajada ("Turismo Ensenada · Río, cultura e historia.") en las 3 páginas del sitio (`index.html`, `en-fotos/index.html`, `404.html`) — `<p class="footer-credit">Administrado por NexaContenidos.</p>` se mantiene, es el único contenido que queda en el footer.
- **Se elimina por completo la columna `.footer-column`** (heading "GUÍA DE LA PÁGINA" + nav `.footer-links` con los links a Inicio/En Fotos/Descubrí/Identidad/Historia/Fragata/Redes) en las 3 páginas. El footer queda reducido a un solo bloque de texto, el crédito.
- `.site-footer` pasa de un grid de 2 columnas a un bloque simple (`display:block`), ya que solo queda un elemento.
- Se elimina de `styles.css` el CSS ahora huérfano: `.footer-brand strong`, `.footer-heading`, `.footer-links` (todas sus variantes/media queries), y el `grid-template-columns` del footer.

## Capabilities

### New Capabilities
- `footer-brand-content`: qué contenido muestra el footer compartido del sitio (solo el crédito de administración, sin nav de navegación redundante).

### Modified Capabilities
- `site-footer-coverage`: ya no requiere que el footer incluya un link a `/#redes` ni ningún nav — el footer se reduce al crédito de administración.
- `home-social-links-section`: el requirement sobre el link "Redes" ya no menciona el nav del footer (eliminado) — solo el nav principal.

## Impact

- `index.html`, `en-fotos/index.html`, `404.html`: `.footer-brand` reducido al crédito; se elimina por completo `.footer-column` (heading + nav).
- `styles.css`: `.site-footer` pasa a `display:block`; se elimina todo el CSS de `.footer-heading`/`.footer-links`/`.footer-brand strong` (huérfano).
- `openspec/specs/footer-brand-content/spec.md` (nueva).
