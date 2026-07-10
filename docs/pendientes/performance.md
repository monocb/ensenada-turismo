# Performance

**Resuelto (2026-07-10):**
- ~~Imágenes sin optimizar (varias por encima de 500KB)~~ — recomprimidas las 3 que superaban el umbral (`portada-home/portada-06-flavio.webp`, `fuerte-barragan.jpg`, `historia/1990-vieja-estacion.jpg`), sin pérdida visual perceptible. Verificar con `find assets -size +500k` (debería devolver 0 resultados) antes de subir cualquier imagen nueva.
- ~~Falta `loading="lazy"` en imágenes fuera del viewport inicial~~ — ya está bien aplicado en casi todas las imágenes (confirmado en auditoría).

**Pendiente de revisar:**
- Falta `srcset` para variantes mobile — no resuelto todavía, requiere generar variantes por ancho y tocar el HTML de varias páginas.

**No usar Git LFS para esto** — la solución es optimizar/comprimir las imágenes antes de subirlas, no cambiar cómo se versionan.
