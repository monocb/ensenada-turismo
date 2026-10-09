## MODIFIED Requirements

### Requirement: El repositorio ejecuta chequeos automáticos de calidad en cada push
Un workflow de GitHub Actions SHALL correr en cada `push` y `pull_request`, ejecutando validación de HTML, validación de sintaxis de CSS, y chequeo de links/imágenes rotos. La validación de CSS SHALL cubrir todas las hojas que las páginas del sitio cargan, no un archivo en particular.

El paso de CSS nombraba `styles.css` cuando esa era la única hoja del sitio. Al repartirse el CSS en varias hojas, nombrar un archivo fijo dejó el paso validando una hoja que ya no carga nadie e ignorando las que el sitio sirve.

#### Scenario: Se pushea un commit a main
- **WHEN** se hace push de un commit a `main`
- **THEN** el workflow de CI se dispara y ejecuta los 3 chequeos (HTML, CSS, links)

#### Scenario: Se agrega una hoja de estilos nueva
- **WHEN** se suma una hoja de estilos y una página la carga
- **THEN** el paso de validación de CSS la cubre sin que haya que agregarla a una lista
