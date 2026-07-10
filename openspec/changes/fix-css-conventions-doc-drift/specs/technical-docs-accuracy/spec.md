## ADDED Requirements

### Requirement: La documentación describe con precisión la cantidad real de bloques `:root` en `styles.css`
`docs/tecnico/convenciones-css.md` y `CLAUDE.md` SHALL indicar el número real de bloques `:root` en `styles.css` (verificable con `grep -n "^:root" styles.css`), no un número desactualizado.

#### Scenario: Un colaborador agrega una variable CSS nueva
- **WHEN** un colaborador lee `docs/tecnico/convenciones-css.md` o `CLAUDE.md` antes de agregar una variable CSS nueva
- **THEN** encuentra la cantidad correcta de bloques `:root` a revisar (4, no 2), con su ubicación aproximada
