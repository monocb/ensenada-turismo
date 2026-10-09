## Purpose

TBD - created by syncing change add-minimal-ci. Update Purpose after archive.
## Requirements
### Requirement: El repositorio ejecuta chequeos automáticos de calidad en cada push
Un workflow de GitHub Actions SHALL correr en cada `push` y `pull_request`, ejecutando validación de HTML, validación de sintaxis de CSS, y chequeo de links/imágenes rotos. La validación de CSS SHALL cubrir todas las hojas que las páginas del sitio cargan, no un archivo en particular.

El paso de CSS nombraba `styles.css` cuando esa era la única hoja del sitio. Al repartirse el CSS en varias hojas, nombrar un archivo fijo dejó el paso validando una hoja que ya no carga nadie e ignorando las que el sitio sirve.

#### Scenario: Se pushea un commit a main
- **WHEN** se hace push de un commit a `main`
- **THEN** el workflow de CI se dispara y ejecuta los 3 chequeos (HTML, CSS, links)

#### Scenario: Se agrega una hoja de estilos nueva
- **WHEN** se suma una hoja de estilos y una página la carga
- **THEN** el paso de validación de CSS la cubre sin que haya que agregarla a una lista

### Requirement: El CI arranca en verde sobre el estado actual del repositorio
La configuración de los linters SHALL estar ajustada para que, contra el HTML/CSS actual del repositorio, no se reporten falsos positivos ni hallazgos de deuda técnica ya conocida y aceptada (documentada en `docs/tecnico/convenciones-css.md`).

#### Scenario: Primera corrida del CI
- **WHEN** el workflow corre por primera vez contra el estado actual de `main` (después de aplicar este cambio)
- **THEN** los 3 chequeos pasan sin errores

### Requirement: Los hallazgos de accesibilidad descubiertos pero no corregidos quedan documentados
Cualquier regla de linting desactivada por señalar un problema real (no una preferencia de estilo) SHALL quedar registrada en `docs/pendientes/` con archivo y línea exactos.

#### Scenario: Se desactiva una regla por un hallazgo real
- **WHEN** una regla de `html-validate` se desactiva porque señala un problema de accesibilidad genuino, no una preferencia de estilo
- **THEN** ese hallazgo queda documentado en `docs/pendientes/accesibilidad.md` con el archivo y la línea exactos

