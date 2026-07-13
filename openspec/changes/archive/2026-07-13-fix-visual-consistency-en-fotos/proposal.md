## Why

`/impeccable critique` + `/impeccable audit` sobre `en-fotos/index.html` (2026-07-12, snapshot en `.impeccable/critique/2026-07-12T23-32-39Z__en-fotos-index-html.md`) encontraron un patrón explícitamente prohibido por la marca (side-stripe border, nuevo en esta página, no heredado del resto del sitio) y que el color de línea "Fotos" (celeste + lima) que `DESIGN.md` documenta para esta sección específica **no aparece en ningún lugar de la página que se supone debe identificar** — usa en su lugar colores hardcodeados inventados ad hoc. Además, el audit midió que el color actual del eyebrow falla contraste WCAG AA (3.05:1), así que la corrección de color tiene que resolver ambas cosas a la vez, no solo la de marca.

## What Changes

- Reemplazar `.photos-reel-section::before` (el side-stripe gradiente de 8px en el borde izquierdo de cada tarjeta de galería, `styles.css:5612-5618`) por el mismo patrón de barra superior (`::before` tipo top-bar) que ya usa `.place-card` en el home — reutilizar un patrón existente y permitido en vez de inventar uno nuevo prohibido.
- Reemplazar los colores hardcodeados de este patrón y del eyebrow (`#14bce5`, `#009fd1`) por los tokens de marca de la línea "Fotos" (`--brand-cyan`/`--brand-lime`) donde el uso sea decorativo (la barra), y por una variante **más oscura** de esa misma familia de color para el texto del eyebrow — el token decorativo `--brand-cyan` (#00c8ff) mide 1.96:1 de contraste sobre fondo blanco (peor que el actual 3.05:1), así que no alcanza con sustituir 1 a 1; se necesita un tono de la misma familia que limpie 4.5:1 (ej. rango `#007ba3`, que mide ~4.81:1).
- Normalizar los literales `#ffcf2f` hardcodeados en las reglas `.photos-*` a `var(--brand-yellow, #ffcf2f)`, igual que ya se hace en otras reglas del mismo archivo.

Fuera de alcance (candidatos a propuestas separadas, no de consistencia visual):
- Footer/enlaces a redes sociales ausentes en esta página (P0, problema de conversión).
- `aria-label` idéntico en todas las fotos de una galería (accesibilidad).
- Lightbox sin `role="dialog"`/trampa de foco (accesibilidad — mismo hallazgo que en `index.html`, candidato a una propuesta compartida aparte ya que es el mismo componente/`script.js` en las dos páginas).
- Indicador de posición "foto X de Y" ausente (mejora de UX de contenido, no de consistencia visual).
- Las 3 galerías siendo visualmente idénticas entre sí pese a tener moods distintos (es una oportunidad de diferenciación/delight, no una inconsistencia contra el sistema de diseño existente).

## Capabilities

### New Capabilities
- `photos-line-visual-identity`: `en-fotos/index.html` usa los tokens de color de la línea "Fotos" (celeste/lima) documentados en `DESIGN.md`, en vez de colores hardcodeados ad hoc, y sin el patrón de side-stripe prohibido por la marca — con el texto del eyebrow cumpliendo contraste WCAG AA.

## Impact

- Archivo de código afectado: `styles.css` (reglas `.photos-reel-section::before`, `.photos-reel-eyebrow`, y los literales `#ffcf2f` dentro de `.photos-*`).
- No afecta HTML ni JS. No afecta otras páginas.
- Riesgo: bajo-medio. El cambio de color del eyebrow toca simultáneamente marca y accesibilidad — hay que verificar el tono final tanto visualmente (que siga leyéndose como "celeste de la línea Fotos") como con una herramienta de contraste antes de mergear.
