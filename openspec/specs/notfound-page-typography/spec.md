## Purpose

TBD - created by syncing change fix-visual-consistency-404. Update Purpose after archive.
## Requirements
### Requirement: 404.html carga la tipografía de marca
`404.html` SHALL incluir los mismos `<link>` de Google Fonts que `index.html` y `en-fotos/index.html` para la tipografía institucional que fija el Manual de Identidad — Archivo en los pesos 400, 700 y 900 — con `preconnect` a `fonts.googleapis.com` y a `fonts.gstatic.com`, en vez de depender del fallback del navegador.

El requisito nombraba Inter, que era la tipografía del sitio antes de aplicar el Manual de Identidad v3.0. Lo que importa es que la página de error cargue la misma familia de marca que el resto del sitio, no una familia concreta que después se reemplaza.

#### Scenario: Carga de la página 404
- **WHEN** se carga `404.html` directamente (sin haber visitado antes otra página del sitio)
- **THEN** el texto renderiza en la tipografía institucional del manual, no en Helvetica/Arial de fallback

#### Scenario: Consistencia con las demás páginas
- **WHEN** se compara el `<head>` de `404.html` con el de `index.html`
- **THEN** ambos incluyen los mismos 3 tags de carga de la fuente de marca

