## Why

`docs/pendientes/performance.md` lista 3 problemas de performance: imágenes sin optimizar (>500KB), falta de `loading="lazy"`, y falta de `srcset`. El segundo ya está resuelto (confirmado en la auditoría original: `loading="lazy"` está bien aplicado en casi todas las imágenes). De los 3 archivos que efectivamente superan 500KB en el repo, se puede resolver el más acotado y de mayor impacto (peso de imágenes) sin tocar HTML ni requerir generar variantes responsive todavía.

## What Changes

- Recomprimir los 3 archivos de imagen que superan 500KB, manteniendo mismo formato, nombre y dimensiones (sin cambios de HTML/markup):
  - `assets/portada-home/portada-06-flavio.webp`: 764KB → ~418KB (calidad WebP 60)
  - `assets/fuerte-barragan.jpg`: 552KB → ~255KB (calidad JPEG equivalente a `-q:v 4` de ffmpeg)
  - `assets/historia/1990-vieja-estacion.jpg`: 566KB → ~373KB (calidad JPEG equivalente a `-q:v 6` de ffmpeg)
- Actualizar `docs/pendientes/performance.md`: tachar los 2 ítems resueltos (imágenes >500KB, `loading="lazy"`), dejar solo `srcset` como pendiente real.
- **No se usa Git LFS** (explícitamente rechazado en la documentación existente) — se sube el archivo optimizado directamente, igual que cualquier otro asset del repo.
- **No se genera `srcset`** en este cambio — es un trabajo más grande (generar variantes por ancho + tocar el HTML de varias páginas) que amerita su propio `/opsx:propose` posterior.

## Capabilities

### New Capabilities
- `image-asset-budget`: las imágenes del repo no superan un límite de peso razonable (500KB), verificable con un comando simple.

### Modified Capabilities
(ninguna)

## Impact

- Archivos afectados: 3 archivos binarios de imagen (mismo path, mismo nombre, reemplazo in-place) + `docs/pendientes/performance.md`.
- No afecta HTML ni JS — mismas dimensiones (`width`/`height` en `<img>` sin cambios), mismo `alt`, misma ruta.
- `assets/historia/1990-vieja-estacion.jpg` no está referenciada en ningún HTML hoy (verificado con grep) — probablemente pre-cargada para la futura página de "Vieja Estación" (`docs/proyecto/funcionalidades-futuras.md`). Se comprime igual, sin costo adicional, para que quede optimizada cuando se use.
- Riesgo: bajo. Verificado visualmente (no hay artefactos de compresión perceptibles a las calidades elegidas) antes de escribir esta propuesta.
