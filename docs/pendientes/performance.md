# Performance

**Resuelto (2026-07-10):**
- ~~Imágenes sin optimizar (varias por encima de 500KB)~~ — recomprimidas las 3 que superaban el umbral (`portada-home/portada-06-flavio.webp`, `fuerte-barragan.jpg`, `historia/1990-vieja-estacion.jpg`), sin pérdida visual perceptible. Verificar con `find assets -size +500k` (debería devolver 0 resultados) antes de subir cualquier imagen nueva.
- ~~Falta `loading="lazy"` en imágenes fuera del viewport inicial~~ — ya está bien aplicado en casi todas las imágenes (confirmado en auditoría).

**Resuelto (2026-07-11):**
- ~~Falta `srcset` para variantes mobile~~ — resuelto para las 8 imágenes del hero (`.hero-gallery` en `index.html`): cada `<img>` tiene `srcset` con variantes 480w/900w/1400w + el original, y `sizes="100vw"`. Comando de regeneración de variantes documentado en [`docs/tecnico/generar-variantes-responsive.md`](../tecnico/generar-variantes-responsive.md).

**Resuelto (2026-07-12):**
- ~~`srcset` en Fragata y Cultura~~ — resuelto para las 8 imágenes de Fragata (`.fragata-hero` + `.fragata-reel`) y las 6 de Cultura (`.culture-slide`): mismas variantes 480w/900w/1400w, con `sizes` calculado a partir del ancho renderizado real de cada carrusel (no `100vw`, ninguno es full-bleed). Ver `openspec/changes/archive/2026-07-12-add-srcset-fragata-cultura/`.
- **Queda pendiente**: galerías dinámicas de en-fotos (49 fotos generadas por `script.js`, requiere generar `srcset` en JS, no solo HTML) y las imágenes menores (place-cards, brand-line-grid, video-panel — archivos ya chicos, menor margen de ahorro). Alcance de cambios futuros aparte.

**No usar Git LFS para esto** — la solución es optimizar/comprimir las imágenes antes de subirlas, no cambiar cómo se versionan.
