## Purpose

TBD - created by syncing change add-social-footer-secondary-pages. Update Purpose after archive.

## Requirements

### Requirement: Todas las páginas del sitio incluyen el footer con enlaces a redes sociales
`en-fotos/index.html` y `404.html` SHALL incluir el mismo `<footer class="site-footer">` que `index.html`, con enlaces a Instagram, Facebook y TikTok de Turismo Ensenada.

#### Scenario: Visitante llega a En Fotos
- **WHEN** se carga `en-fotos/index.html`
- **THEN** al final de la página hay un footer con enlaces funcionales a Instagram, Facebook y TikTok

#### Scenario: Visitante llega a una URL inexistente
- **WHEN** se carga `404.html`
- **THEN** al final de la página hay un footer con enlaces funcionales a Instagram, Facebook y TikTok

#### Scenario: Consistencia visual del footer entre páginas
- **WHEN** se compara el footer de `en-fotos/index.html` o `404.html` con el de `index.html`
- **THEN** usan el mismo componente (`.site-footer`) con el mismo fondo oscuro autocontenido, sin necesidad de estilos adicionales por página
