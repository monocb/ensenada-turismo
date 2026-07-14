## Purpose

TBD - created by syncing change simplify-footer-brand-and-center-nav. Update Purpose after archive.

## Requirements

### Requirement: El footer del sitio solo muestra el crédito de administración
`.site-footer`, en las 3 páginas del sitio (`index.html`, `en-fotos/index.html`, `404.html`), SHALL contener únicamente `<div class="footer-brand"><p class="footer-credit">Administrado por NexaContenidos.</p></div>` — SHALL NOT incluir el nombre de marca ("ENSENADA"), ninguna bajada/tagline, ni ninguna columna de navegación adicional (heading "Guía de la página" o nav de links).

#### Scenario: Inspeccionar el footer de cualquier página
- **WHEN** se inspecciona `<footer class="site-footer">` en `index.html`, `en-fotos/index.html` o `404.html`
- **THEN** el único texto presente es "Administrado por NexaContenidos."

#### Scenario: Sin nav de navegación en el footer
- **WHEN** se inspecciona el footer de cualquiera de las 3 páginas
- **THEN** no existe ningún elemento `<nav>` ni links a otras secciones del sitio dentro del footer
