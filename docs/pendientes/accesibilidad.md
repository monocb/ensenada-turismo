# Accesibilidad

## Resuelto (2026-07-10)

- ~~`aria-expanded` en el menú mobile~~ — ya funciona (verificado, `docs/pendientes/bug-menu-hamburguesa.md`).
- ~~Orden correcto de headings~~ — verificado correcto en ambas páginas (h1→h2→h2→h2, sin saltos).
- ~~`alt` descriptivo real en todas las imágenes~~ — resuelto (galería dinámica en `openspec/changes/archive/2026-07-10-improve-gallery-alt-text/`; estáticos ya eran descriptivos).
- ~~Foco visible en elementos interactivos~~ — cubierto por una regla genérica en `styles.css` (`a:focus-visible, button:focus-visible, [tabindex]:focus-visible`).
- ~~Que los carruseles/lightbox sean navegables por teclado~~ — el carrete de la Fragata no lo era, corregido en `openspec/changes/archive/2026-07-10-make-fragata-reel-keyboard-accessible/`.

## Pendiente de revisar

- **Contraste de texto sobre imágenes** — no verificado todavía con una herramienta de medición real (el detector estático de `impeccable` no cubre contraste).
- **`aria-label` en elementos sin rol** (encontrado con `html-validate`, `aria-label-misuse`, 2026-07-10): `<div aria-label="...">` en `.brand-line-grid`, `.fragata-reel`, `.place-accordion`, `.video-panel` (`index.html:149,211,280,419`) — un `<div>` sin `role` no expone `aria-label` de forma confiable a todos los lectores de pantalla; necesitaría `role="region"` o similar.
- **Botones alcanzables por teclado dentro de un contenedor `aria-hidden`** (encontrado con `html-validate`, `hidden-focusable`, 2026-07-10): `.image-lightbox[aria-hidden="true"]` (`index.html:260`, `en-fotos/index.html:170`) contiene los botones `lightbox-close`/`lightbox-prev`/`lightbox-next`, que siguen siendo alcanzables por Tab aunque el contenedor esté marcado `aria-hidden="true"` cuando está cerrado — a confirmar si el CSS ya evita el foco en ese estado antes de decidir el fix.
- **Landmark sin nombre accesible único** (encontrado con `html-validate`, `unique-landmark`, 2026-07-10): `<nav class="main-nav">` (`index.html:78`) — impacto bajo (es el único `<nav>` de la página), pero señalado igual.
