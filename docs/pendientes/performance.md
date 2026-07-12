# Performance

**Resuelto (2026-07-10):**
- ~~Imágenes sin optimizar (varias por encima de 500KB)~~ — recomprimidas las 3 que superaban el umbral (`portada-home/portada-06-flavio.webp`, `fuerte-barragan.jpg`, `historia/1990-vieja-estacion.jpg`), sin pérdida visual perceptible. Verificar con `find assets -size +500k` (debería devolver 0 resultados) antes de subir cualquier imagen nueva.
- ~~Falta `loading="lazy"` en imágenes fuera del viewport inicial~~ — ya está bien aplicado en casi todas las imágenes (confirmado en auditoría).

**Resuelto (2026-07-11):**
- ~~Falta `srcset` para variantes mobile~~ — resuelto para las 8 imágenes del hero (`.hero-gallery` en `index.html`): cada `<img>` tiene `srcset` con variantes 480w/900w/1400w + el original, y `sizes="100vw"`. Comando de regeneración de variantes documentado en [`docs/tecnico/generar-variantes-responsive.md`](../tecnico/generar-variantes-responsive.md).

**Resuelto (2026-07-12):**
- ~~`srcset` en Fragata y Cultura~~ — resuelto para las 8 imágenes de Fragata (`.fragata-hero` + `.fragata-reel`) y las 6 de Cultura (`.culture-slide`): mismas variantes 480w/900w/1400w, con `sizes` calculado a partir del ancho renderizado real de cada carrusel (no `100vw`, ninguno es full-bleed). Ver `openspec/changes/archive/2026-07-12-add-srcset-fragata-cultura/`.
- ~~`srcset` en place-cards, brand-line-grid y video-panel~~ — resuelto para los 8 `<img>` restantes de estos 3 grupos. Anchos de variantes ajustados a cada archivo original (sin generar escalones inútiles para archivos ya chicos como `ensenada-centro.jpg`, 887px). Ver `openspec/changes/archive/2026-07-12-add-srcset-minor-images/`.
- ~~`srcset` en galerías dinámicas de en-fotos~~ — resuelto para las 49 fotos (`setupPhotoReelSection()` en `script.js` ahora genera `srcset` 480w/900w + `sizes="260px"` en cada `<img>`, con tope automático para no agrandar las fotos más angostas de `parroquia-el-dique`). Ver `openspec/changes/archive/2026-07-12-add-srcset-en-fotos/`.

**Sin pendientes de `srcset` en el sitio** — las 8 imágenes del hero, Fragata, Cultura, place-cards, brand-line-grid, video-panel y las 49 fotos de en-fotos tienen todas variantes responsive.

**No usar Git LFS para esto** — la solución es optimizar/comprimir las imágenes antes de subirlas, no cambiar cómo se versionan.
