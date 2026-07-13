## Purpose

TBD - created by syncing change harden-lightbox-gallery-accessibility. Update Purpose after archive.

## Requirements

### Requirement: El lightbox de fotos es un diálogo modal accesible
`.image-lightbox` (compartido por `index.html` y `en-fotos/index.html`) SHALL tener `role="dialog"` y `aria-modal="true"` en su markup, y SHALL atrapar el foco de teclado mientras está abierto.

#### Scenario: Apertura del lightbox con teclado
- **WHEN** un usuario de teclado activa una foto (Enter/Space) en cualquiera de las dos páginas
- **THEN** el foco se mueve dentro del lightbox (al botón de cerrar o al primer elemento enfocable)

#### Scenario: Navegación por Tab dentro del lightbox abierto
- **WHEN** el lightbox está abierto y el usuario presiona Tab repetidamente
- **THEN** el foco circula solo entre los elementos enfocables del lightbox, sin salir hacia contenido de la página de fondo

### Requirement: El foco vuelve al disparador al cerrar el lightbox
Al cerrar el lightbox (botón cerrar, Escape, o click fuera), el foco SHALL volver al elemento que lo abrió.

#### Scenario: Cierre con Escape
- **WHEN** el lightbox está abierto y el usuario presiona Escape
- **THEN** el lightbox se cierra y el foco vuelve a la foto/card que lo había abierto
