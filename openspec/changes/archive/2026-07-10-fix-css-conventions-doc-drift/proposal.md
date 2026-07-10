## Why

`docs/tecnico/convenciones-css.md` y `CLAUDE.md` (raíz del repo) dicen que `styles.css` tiene "dos bloques `:root` separados". Verificado con `grep -n "^:root" styles.css`: en realidad son **4** (líneas 1, 2062, 2899 y 5284), confirmado en la auditoría original de este proyecto y otra vez ahora. Un colaborador (humano o agente) que confíe en el conteo documentado y solo revise "los dos" bloques al agregar una variable CSS nueva puede terminar duplicándola sin saberlo en el 3° o 4° bloque.

## What Changes

- Actualizar `docs/tecnico/convenciones-css.md`: "dos bloques `:root`" → los 4 bloques reales, con su línea aproximada y el comentario que los identifica (`Tourism refresh...`, `Aplicacion de manual interno de marca...`, `Correccion cronologia lateral...`).
- Actualizar la misma mención en `CLAUDE.md` (raíz), que repite el mismo dato desactualizado ("dos bloques `:root` separados (uno al inicio, otro ~línea 2062)").
- No se toca `styles.css` — este cambio es puramente de documentación.

## Capabilities

### New Capabilities
- `technical-docs-accuracy`: la documentación técnica del repo (`docs/tecnico/`, `CLAUDE.md`) describe con precisión verificable la estructura real de `styles.css` (cantidad y ubicación de bloques `:root`).

### Modified Capabilities
(ninguna)

## Impact

- Archivos afectados: `docs/tecnico/convenciones-css.md`, `CLAUDE.md`.
- No afecta el sitio en producción ni ningún código.
- Riesgo: ninguno.
