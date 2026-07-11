## Context

Verificado con grep: `script.js` no contiene ninguna coincidencia de "manifest" ni de "fetch(". Las galerías se arman en `setupPhotoReelSection()` (`script.js:189-224`) leyendo `section.dataset.photoFolder/photoPrefix/photoCount/photoTitle/photoLocation/photoDescription` y generando `image.src = \`/assets/en-fotos/${folder}/${prefix}-${number}.webp\`` para `number` de `01` a `count`, con `count` = `data-photo-count`.

`en-fotos/index.html` tiene 3 secciones con este patrón (`parroquia-el-dique` count=19, `stella-maris-punta-lara` count=10, `domingo-punta-lara` count=20 → total 49), coincidiendo exactamente con las 49 entradas de `assets/en-fotos/manifest.json`. Esto sugiere que el manifest fue la fuente de datos original antes de migrar al patrón `data-photo-*`, y quedó como resto sin limpiar tanto en código como en documentación.

Los campos `source`/`label` del manifest son nombres de archivo originales (de Instagram/exportación de fotos), sin uso ni valor documentado en ningún otro lugar del repo.

## Goals / Non-Goals

**Goals:**
- Que la documentación (`CLAUDE.md`, `docs/tecnico/`) describa el mecanismo real de galerías, verificable leyendo `script.js`.
- Eliminar el archivo muerto `manifest.json` para que no quede como fuente de confusión futura.

**Non-Goals:**
- No se cambia el mecanismo de galerías en sí (`script.js`, `en-fotos/index.html`) — funciona correctamente hoy, solo la documentación estaba desalineada.
- No se preserva el manifest.json "por las dudas" en otro lado — no aporta información que no esté ya en el HTML (`data-photo-title`/`data-photo-location`) o sea recuperable (los nombres de archivo originales no tienen valor de producto).

## Decisions

**Eliminar `manifest.json` en vez de conservarlo o intentar wireearlo a `script.js`.**
Wirearlo agregaría un `fetch()` + parseo JSON a un sitio que hoy no hace ninguna petición de red adicional, solo para reproducir datos (`title`, `location`) que ya están hardcodeados en los atributos `data-photo-*` del HTML — sería una abstracción sin beneficio funcional, en contra del principio del proyecto de no agregar complejidad sin necesidad real.

**Renombrar el doc de `patron-galerias-manifest.md` a `patron-galerias-data-attributes.md`** en vez de solo corregir el contenido manteniendo el nombre viejo — el nombre del archivo también comunicaba el mecanismo equivocado.

## Risks / Trade-offs

Ninguno — cambio de documentación + borrado de un archivo de datos no referenciado por código. Sin impacto visible en el sitio.

## Migration Plan

1. Eliminar `assets/en-fotos/manifest.json`.
2. Renombrar y reescribir `docs/tecnico/patron-galerias-manifest.md` → `docs/tecnico/patron-galerias-data-attributes.md`, documentando el patrón real con ejemplo de los atributos `data-photo-*`.
3. Corregir `CLAUDE.md`, `docs/tecnico/README.md` y `docs/marca/fotografia-y-composicion.md` con el nombre/mecanismo correcto.
4. Commit + push a `main`.

## Open Questions

Ninguna.
