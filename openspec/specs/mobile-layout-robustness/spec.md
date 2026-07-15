## Purpose

TBD - created by syncing change fix-mobile-responsive-bugs. Update Purpose after archive.

## Requirements

### Requirement: El texto de la sección Fragata no se recorta en viewports mobile
`.fragata-hero-copy` (título y párrafo de la sección Fragata) SHALL renderizarse completo, sin recortarse por el `overflow:hidden` de `.fragata-hero`, en cualquier viewport entre 320px y 560px de ancho.

#### Scenario: Viewport de teléfono típico (375-430px)
- **WHEN** se carga la sección Fragata en un viewport entre 375px y 430px de ancho
- **THEN** el título "Fragata ARA Libertad en Ensenada" y el párrafo se ven completos, sin que ninguna palabra quede cortada por el borde de la sección

### Requirement: La caja de foto de la ruleta de Historia es proporcional al viewport en mobile
`.timeline-stage` SHALL tener una altura proporcional al ancho del viewport en mobile (≤560px), no un valor fijo mayor al que usa en desktop.

#### Scenario: iPhone SE (viewport angosto y bajo)
- **WHEN** se carga la sección Historia en un viewport de 375px de ancho
- **THEN** la altura de `.timeline-stage` es sensiblemente menor a la mitad del alto de pantalla típico de un iPhone SE (667px), dejando espacio visible para el texto sin necesidad de scrollear mucho
