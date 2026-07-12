## Context

Medido con Puppeteer (`getBoundingClientRect`, Chrome real) el ancho renderizado de cada grupo en 4 anchos de viewport (375/768/1280/1920px):

| Selector | 375px | 768px | 1280px | 1920px |
|---|---|---|---|---|
| `.fragata-hero img` | 354px | 765px | 1204px | 1233px |
| `.fragata-reel img` | 340px | 576px | 792px | 792px |
| `.culture-slide img` | 285px | 249px | 291px | 291px |

`.fragata-hero` está contenido por `width: min(1180px, 100%)` — crece con el viewport hasta ese tope. `.fragata-reel` y `.culture-slide` son ítems de un carrusel horizontal: su ancho depende del layout de columnas del carrusel, no escala linealmente con el viewport (de hecho `.culture-slide` es *más angosto* en desktop que en mobile, porque a partir de cierto ancho se ven más columnas simultáneas).

Los 8 archivos de Fragata son 1600×1200. Los 6 de Cultura son 1400-1600px de ancho.

## Goals / Non-Goals

**Goals:**
- Mismo ahorro de transferencia que logró el hero, para Fragata y Cultura.
- `sizes` preciso para el patrón real de cada grupo (no asumir `100vw` como en el hero, que sí es full-bleed).

**Non-Goals:**
- En-fotos (galerías dinámicas por JS) y place-cards/brand-line-grid/video-panel quedan fuera — alcance de cambios futuros aparte (ver `proposal.md`).

## Decisions

**Mismos 3 anchos que el hero (480w/900w/1400w + original)**, en vez de un set de anchos a medida por grupo.
Aunque `.culture-slide` renderiza mucho más angosto que `.fragata-hero` (249-357px vs 354-1233px), usar la misma escala en todo el sitio mantiene un único comando de regeneración documentado (`docs/tecnico/generar-variantes-responsive.md`) sin tener que decidir anchos distintos por sección cada vez. El costo es marginal: para `.culture-slide`, `900w` ya cubre con margen el peor caso medido (357px × DPR 3 ≈ 1071px, por debajo de 1400w) — no hace falta un escalón intermedio más fino.

**`sizes` por grupo, basado en el ancho medido, no en una fórmula `vw` genérica:**

- `.fragata-hero img`: `(min-width: 1200px) 1180px, 92vw` — refleja el tope de `min(1180px, 100%)` del contenedor; `92vw` aproxima el ancho real bajo ese tope (medido 354-765px en viewports de 375-768px, ~94-99% del viewport menos el padding de página).
- `.fragata-reel img`: `(max-width: 480px) 340px, (max-width: 900px) 576px, 792px` — valores discretos tomados directo de la medición, porque el ancho de este carrusel no sigue una proporción de viewport simple (está gobernado por el layout de columnas, no por `vw`).
- `.culture-slide img`: `360px` (valor fijo) — el rango medido (249-357px) es angosto y no depende de forma predecible del viewport; un valor fijo con margen es más simple y seguro que inventar una fórmula que no refleja el comportamiento real del carrusel.

**`fragata-01-portada.webp` se usa en 2 lugares (`.fragata-hero` y la primera figura de `.fragata-reel`) con el mismo `srcset` pero `sizes` distinto en cada `<img>`** — es el comportamiento correcto de `srcset`/`sizes`: la lista de candidatos es la misma, pero cada etiqueta `<img>` elige la variante apropiada para su propio contexto de layout.

## Risks / Trade-offs

- **[Riesgo] Un `sizes` con margen de más (`92vw`, `360px` fijo) puede servir una variante levemente más grande de la estrictamente necesaria en algunos anchos intermedios no medidos.** → Aceptado: preferible un margen de seguridad a una imagen borrosa; la diferencia de peso entre escalones (480w/900w/1400w) es moderada.
- Ninguno operacional — mismo patrón ya en producción con el hero.

## Migration Plan

1. Generar las 42 variantes (ya generadas y revisadas visualmente antes de esta propuesta).
2. Copiar las variantes a `assets/fragata/` y `assets/` (junto a los originales `cultura-*.jpg`).
3. Agregar `srcset`/`sizes` a los `<img>` de `.fragata-hero`, `.fragata-reel` (8 imágenes) y `.culture-slide` (6 imágenes) en `index.html`.
4. Verificar en el navegador (viewports simulados) que cada uno carga la variante esperada.
5. Actualizar `docs/pendientes/performance.md`.
6. Commit + push a `main` → deploy automático.

## Open Questions

Ninguna.
