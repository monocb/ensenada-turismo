## Context

`setupPhotoReelSection()` (`script.js:189-224`) genera cada `<img>` de las galerías dinámicas en un bucle, asignando solo `image.src = \`/assets/en-fotos/${folder}/${prefix}-${number}.webp\``. No hay manifest ni datos por foto — la única fuente de verdad es el número secuencial (`01` a `count`) y el patrón de nombre de archivo (ver `docs/tecnico/patron-galerias-data-attributes.md`).

Medido el ancho de cada archivo original con `ffprobe`: `stella-maris-punta-lara` y `domingo-punta-lara` son uniformemente 1800×1200. `parroquia-el-dique` varía dentro de la misma carpeta: 833, 960, 1280 y 1800px de ancho según la foto (subidas de distintas fuentes/cámaras).

`.photos-reel-card img` renderiza 230-260px CSS en cualquier viewport (medido con Puppeteer en 375/768/1280/1920px) — no depende del ancho de pantalla.

## Goals / Non-Goals

**Goals:**
- Mismo ahorro de transferencia que el resto del sitio, para las 49 fotos de en-fotos.
- Nunca generar una variante más grande que el archivo original (no agrandar/upscale).

**Non-Goals:**
- No se agrega un manifest ni metadata por foto solo para esto — se mantiene el patrón actual (numeración secuencial), coherente con `docs/tecnico/patron-galerias-data-attributes.md`.
- No se persigue una precisión perfecta del descriptor de ancho en `srcset` para las fotos más angostas de `parroquia-el-dique` (ver Decisions) — es una figura orientativa para el navegador, no un contrato exacto.

## Decisions

**2 anchos (480w/900w) en vez de los 3 del resto del sitio (480w/900w/1400w).**
El rango renderizado medido (230-260px, estable) hace que el peor caso teórico (DPR 3 ≈ 780px) quede cubierto sobradamente por 900w — un tercer escalón de 1400w no aportaría ahorro real, solo más archivos que mantener (49 fotos × 3 = 147 vs. × 2 = 98).

**El escalón "900w" usa `scale='min(900,iw)':-1` en `ffmpeg`, con tope automático al ancho real del archivo.**
`parroquia-el-dique` tiene fotos de hasta 833px de ancho — generar un "900w" que las agrande produciría una imagen borrosa/con artefactos de escalado. El tope condicional hace que esas fotos generen un archivo a su ancho real (ej. 833px) en el escalón "900w", sin agrandar nunca.

**El `srcset` generado en JS sigue etiquetando ese escalón como `900w` aunque el archivo real tenga menos píxeles (ej. 833px) para las fotos angostas de `parroquia-el-dique`.**
Ser estrictamente preciso requeriría conocer el ancho real de cada una de las 49 fotos en tiempo de ejecución (sin manifest, sin datos por foto) — agregar esa infraestructura solo para corregir un descriptor que como máximo se desvía ~8% (833 vs. 900) no se justifica: el navegador de todas formas elige la variante más grande disponible en ese escalón, el efecto práctico es una imagen levemente más nítida de lo que el descriptor promete, nunca al revés.

**`sizes="260px"` fijo**, igual que el patrón ya usado para `.culture-slide`/`.place-media` — el rango medido (230-260px) es angosto y no varía con el viewport.

## Risks / Trade-offs

- **[Riesgo] El descriptor `900w` no es exacto para las fotos angostas de `parroquia-el-dique`.** → Aceptado, ver Decisions — desviación máxima ~8%, sin impacto visual negativo.
- Ninguno operacional — cambio acotado a una función, sin tocar el resto de `script.js` ni el mecanismo de `loading="lazy"`.

## Migration Plan

1. Generar las 98 variantes (ya generadas y revisadas visualmente antes de esta propuesta).
2. Copiar las variantes a `assets/en-fotos/<categoria>/`.
3. Modificar `setupPhotoReelSection()` en `script.js` para generar `srcset`/`sizes` en cada `<img>`.
4. Verificar en el navegador que cada foto carga la variante esperada, en las 3 galerías.
5. Actualizar `docs/pendientes/performance.md` (sin pendientes de `srcset` restantes en el sitio).
6. Commit + push a `main`.

## Open Questions

Ninguna.
