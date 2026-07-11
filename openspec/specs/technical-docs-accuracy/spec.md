## Purpose

TBD - created by syncing change fix-css-conventions-doc-drift. Update Purpose after archive.

## Requirements

### Requirement: La documentación describe con precisión la cantidad real de bloques `:root` en `styles.css`
`docs/tecnico/convenciones-css.md` y `CLAUDE.md` SHALL indicar el número real de bloques `:root` en `styles.css` (verificable con `grep -n "^:root" styles.css`), no un número desactualizado.

#### Scenario: Un colaborador agrega una variable CSS nueva
- **WHEN** un colaborador lee `docs/tecnico/convenciones-css.md` o `CLAUDE.md` antes de agregar una variable CSS nueva
- **THEN** encuentra la cantidad correcta de bloques `:root` a revisar (4, no 2), con su ubicación aproximada

### Requirement: La documentación describe con precisión el mecanismo real de las galerías de fotos
`CLAUDE.md` y la documentación técnica del patrón de galerías SHALL describir el mecanismo verificable en `script.js` (atributos `data-photo-*` + numeración secuencial de archivos), no un mecanismo basado en `manifest.json` que ningún código lee.

#### Scenario: Un colaborador agrega una foto nueva a una galería existente
- **WHEN** un colaborador lee `CLAUDE.md` o la documentación técnica de galerías antes de agregar una foto nueva
- **THEN** encuentra instrucciones que reflejan el mecanismo real: subir el archivo con el número secuencial siguiente y actualizar `data-photo-count` en el HTML de la sección correspondiente

#### Scenario: No queda ningún archivo de datos sin uso documentado como si estuviera activo
- **WHEN** se busca `manifest.json` en el repositorio
- **THEN** no existe el archivo `assets/en-fotos/manifest.json`, ni referencias a él como mecanismo activo en la documentación
