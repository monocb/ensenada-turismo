## Purpose

TBD - created by syncing change add-minimal-ci. Update Purpose after archive.

## Requirements

### Requirement: El repositorio ejecuta chequeos automáticos de calidad en cada push
Un workflow de GitHub Actions SHALL correr en cada `push` y `pull_request`, ejecutando validación de HTML, validación de sintaxis de CSS, y chequeo de links/imágenes rotos.

#### Scenario: Se pushea un commit a main
- **WHEN** se hace push de un commit a `main`
- **THEN** el workflow de CI se dispara y ejecuta los 3 chequeos (HTML, CSS, links)

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
