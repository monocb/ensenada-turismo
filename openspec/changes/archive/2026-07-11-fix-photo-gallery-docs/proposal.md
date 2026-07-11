## Why

`assets/en-fotos/manifest.json` (49 entradas) no lo lee ningún código del sitio: `script.js` arma cada galería (`setupPhotoReelSection`) a partir de atributos `data-photo-folder`/`data-photo-prefix`/`data-photo-count`/`data-photo-title`/`data-photo-location` en el HTML, generando las URLs de forma secuencial (`prefix-01.webp`, `prefix-02.webp`, ...). No hay ningún `fetch()` en `script.js` — confirmado por grep, cero coincidencias de "manifest" o "fetch(" en el archivo.

Peor aún, la documentación describe el mecanismo equivocado: `CLAUDE.md` y `docs/tecnico/patron-galerias-manifest.md` instruyen a "agregar la entrada correspondiente en `manifest.json`" y afirman explícitamente que **"no hace falta tocar `script.js` ni `index.html`"** — eso es falso para el mecanismo real, donde agregar una foto requiere subir el archivo con el número secuencial correcto y actualizar `data-photo-count` en el HTML. Seguir la documentación actual al pie de la letra agrega una entrada a un archivo muerto y no logra que la foto aparezca en la galería.

## What Changes

- Eliminar `assets/en-fotos/manifest.json` (dato muerto, no referenciado por ningún código).
- Reescribir `docs/tecnico/patron-galerias-manifest.md` para documentar el mecanismo real (atributos `data-photo-*` + numeración secuencial de archivos), renombrarlo a `docs/tecnico/patron-galerias-data-attributes.md`.
- Corregir `CLAUDE.md` (sección "Cómo agregar una foto a una galería") y `docs/marca/fotografia-y-composicion.md` (referencia cruzada) para reflejar el nombre de archivo y el mecanismo correctos.
- Corregir `docs/tecnico/README.md` (índice) con el nuevo nombre de archivo.

## Capabilities

### Modified Capabilities
- `technical-docs-accuracy`: se agrega un requirement sobre la precisión de la documentación del patrón de galerías de fotos.

## Impact

- Archivo eliminado: `assets/en-fotos/manifest.json`.
- Archivos modificados: `CLAUDE.md`, `docs/tecnico/README.md`, `docs/marca/fotografia-y-composicion.md`.
- Archivo renombrado: `docs/tecnico/patron-galerias-manifest.md` → `docs/tecnico/patron-galerias-data-attributes.md` (contenido reescrito).
- No afecta `script.js`, CSS ni el comportamiento visible del sitio — el mecanismo real de galerías no cambia, solo se documenta correctamente y se borra el archivo muerto.
- Riesgo: bajo. Verificado por grep que nada referencia `manifest.json` fuera de documentación.
