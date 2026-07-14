## Purpose

TBD - created by syncing change add-social-footer-secondary-pages. Update Purpose after archive.

## Requirements

### Requirement: Todas las páginas del sitio incluyen el mismo footer
`en-fotos/index.html` y `404.html` SHALL incluir el mismo `<footer class="site-footer">` que `index.html` — mismo contenido, mismo componente visual, sin estilos adicionales por página. El footer NO SHALL contener enlaces directos a Instagram, Facebook o TikTok, ni ningún nav de navegación a otras secciones del sitio (ese wayfinding vive en el menú principal del header).

#### Scenario: Visitante llega a En Fotos
- **WHEN** se carga `en-fotos/index.html`
- **THEN** al final de la página hay un footer idéntico al de `index.html`

#### Scenario: Visitante llega a una URL inexistente
- **WHEN** se carga `404.html`
- **THEN** al final de la página hay un footer idéntico al de `index.html`

#### Scenario: Consistencia visual del footer entre páginas
- **WHEN** se compara el footer de `en-fotos/index.html` o `404.html` con el de `index.html`
- **THEN** usan el mismo componente (`.site-footer`) con el mismo fondo oscuro autocontenido, sin necesidad de estilos adicionales por página

#### Scenario: El footer no tiene enlaces directos a redes sociales ni nav de navegación
- **WHEN** se inspecciona el footer de cualquiera de las 3 páginas
- **THEN** no existe ningún link con `href` a instagram.com, facebook.com ni tiktok.com, ni ningún `<nav>` con links a otras secciones del sitio
