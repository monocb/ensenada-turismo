# Performance

**Resuelto (2026-07-10):**
- ~~Imágenes sin optimizar (varias por encima de 500KB)~~ — recomprimidas las 3 que superaban el umbral (`portada-home/portada-06-flavio.webp`, `fuerte-barragan.jpg`, `historia/1990-vieja-estacion.jpg`), sin pérdida visual perceptible. Verificar con `find assets -size +500k` (debería devolver 0 resultados) antes de subir cualquier imagen nueva.
- ~~Falta `loading="lazy"` en imágenes fuera del viewport inicial~~ — ya está bien aplicado en casi todas las imágenes (confirmado en auditoría).

**Resuelto (2026-07-11):**
- ~~Falta `srcset` para variantes mobile~~ — resuelto para las 8 imágenes del hero (`.hero-gallery` en `index.html`): cada `<img>` tiene `srcset` con variantes 480w/900w/1400w + el original, y `sizes="100vw"`. Comando de regeneración de variantes documentado en [`docs/tecnico/generar-variantes-responsive.md`](../tecnico/generar-variantes-responsive.md).
- El resto de las imágenes del sitio (Fragata, Historia, Cultura, galerías dinámicas de en-fotos) **queda pendiente** — mismo patrón aplicable, alcance de un cambio futuro aparte.

**No usar Git LFS para esto** — la solución es optimizar/comprimir las imágenes antes de subirlas, no cambiar cómo se versionan.
