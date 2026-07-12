## Context

Medido con Puppeteer (`getBoundingClientRect`, Chrome real) el ancho renderizado en 4 anchos de viewport (375/768/1280/1920px):

| Selector | 375px | 768px | 1280px | 1920px |
|---|---|---|---|---|
| `.place-media img` | 346px | 224px | 370px | 379px |
| `.brand-line img` | 354px | 353px | 397px | 617px |
| `.youtube-lite-button img` | 340px | 737px | 628px | 713px |

Los tres grupos tienen comportamiento no lineal respecto al viewport (son ítems de grid/layout con columnas que cambian de conteo en ciertos breakpoints, no contenedores que escalan proporcionalmente con `vw`) — mismo patrón ya visto con `.culture-slide` en el ciclo anterior.

Archivos originales: `el-dique.jpg` (960w), `ensenada-centro.jpg` (887w), `punta-lara.jpg` (1100w), `aerea-costa-punta-lara.jpg` (1280w), `1911-fuerte-barragan.jpg` (1600w), `fuerte-barragan.jpg` (1224w).

## Goals / Non-Goals

**Goals:**
- Mismo ahorro de transferencia que los ciclos anteriores, para el resto de las imágenes estáticas del sitio.

**Non-Goals:**
- No se generan variantes con un ancho mayor o igual al del archivo original (no tiene sentido "reducir" una imagen a un tamaño más grande que el que ya tiene).
- Galerías dinámicas de en-fotos quedan fuera — alcance de un cambio aparte (`add-srcset-en-fotos`), por requerir cambios en `script.js`, no solo HTML.

## Decisions

**Anchos de variantes ajustados por archivo, no una escala fija de 3 pasos para todos.**
A diferencia de Fragata/Cultura (todos 1400-1600px de ancho), acá los originales van de 887px a 1600px — generar siempre 480w/900w/1400w produciría variantes iguales o más grandes que el original en varios casos (ej. `ensenada-centro.jpg` es 887px, un "900w" ahí no tendría sentido). Se genera solo hasta el escalón inmediatamente por debajo del ancho original de cada archivo.

**`sizes` con valores fijos o de 2 escalones, no fórmulas `vw`:**
- `.place-media img`: `380px` (fijo) — rango medido 224-379px, sin relación predecible con el viewport (grid de 3 columnas).
- `.brand-line img`: `(min-width: 1600px) 620px, 400px` — el rango medido es plano (353-397px) hasta cerca de 1600px de viewport, donde salta a 617px.
- `.youtube-lite-button img`: `(max-width: 480px) 340px, 740px` — mobile pide la variante chica, el resto (donde el layout cambia a 2 columnas y el panel se ensancha, de forma no lineal con el viewport) pide con margen de seguridad la variante más grande disponible.

**`cultura-publico.jpg` no se regenera** — ya tiene variantes 480w/900w/1400w del ciclo `add-srcset-fragata-cultura`; el `<img>` de `.brand-line` que usa este archivo solo necesita `srcset`/`sizes` nuevos, apuntando a los archivos ya existentes.

## Risks / Trade-offs

Ninguno operacional — mismo patrón validado en los 2 ciclos anteriores, sin tocar CSS ni JS.

## Migration Plan

1. Generar las 11 variantes (ya generadas y revisadas visualmente antes de esta propuesta).
2. Copiar las variantes a `assets/` y `assets/historia/`.
3. Agregar `srcset`/`sizes` a los 8 `<img>` (3 place-card + 4 brand-line + 1 video-panel) en `index.html`.
4. Verificar en el navegador que cada uno carga la variante esperada.
5. Actualizar `docs/pendientes/performance.md`.
6. Commit + push a `main`.

## Open Questions

Ninguna.
