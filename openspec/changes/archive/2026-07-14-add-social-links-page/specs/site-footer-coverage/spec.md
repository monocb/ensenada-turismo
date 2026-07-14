## MODIFIED Requirements

### Requirement: Todas las páginas del sitio incluyen el footer con un link a la sección de redes sociales
`en-fotos/index.html` y `404.html` SHALL incluir el mismo `<footer class="site-footer">` que `index.html`. El footer de las 3 páginas SHALL incluir un link a `/#redes` dentro de su nav "Guía de la página" — el footer ya NO SHALL contener enlaces directos a Instagram, Facebook o TikTok.

#### Scenario: Visitante llega a En Fotos
- **WHEN** se carga `en-fotos/index.html`
- **THEN** al final de la página hay un footer con un link "Redes" que lleva a `/#redes`

#### Scenario: Visitante llega a una URL inexistente
- **WHEN** se carga `404.html`
- **THEN** al final de la página hay un footer con un link "Redes" que lleva a `/#redes`

#### Scenario: Consistencia visual del footer entre páginas
- **WHEN** se compara el footer de `en-fotos/index.html` o `404.html` con el de `index.html`
- **THEN** usan el mismo componente (`.site-footer`) con el mismo fondo oscuro autocontenido, sin necesidad de estilos adicionales por página

#### Scenario: El footer ya no tiene enlaces directos a redes sociales
- **WHEN** se inspecciona el footer de cualquiera de las 3 páginas
- **THEN** no existe ningún link con `href` a instagram.com, facebook.com ni tiktok.com dentro del footer
