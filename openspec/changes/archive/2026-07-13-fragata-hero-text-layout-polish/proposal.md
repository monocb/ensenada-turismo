## Why

Tras el rediseño de la sección Fragata (change archivado `redesign-fragata-background-gallery`), una revisión de diseño (skill impeccable) sobre el resultado encontró dos problemas concretos: el bloque de texto queda anclado con un offset fijo desde arriba en vez de centrado, apretado contra el borde superior con 3 niveles de contenido (antes solo tenía el título); y el link de crédito usa una caja con borde lateral de color (`border-left`), un patrón que el propio cliente pidió sacar y que además es un anti-patrón de diseño reconocido (acento lateral decorativo).

## What Changes

- `.fragata-hero` pasa de posicionar su contenido con un offset fijo a centrarlo verticalmente de verdad (`display:flex; align-items:center`).
- `.fragata-hero-copy` pasa de `position:absolute` con `top` fijo a `position:relative` sin `top`, dejando que el flex del contenedor lo centre.
- `.fragata-cta` pierde la caja (fondo, borde, borde lateral de color, padding) y el peso tipográfico grande — pasa a texto plano subrayado, con más separación (`margin-top`) respecto al párrafo de arriba.
- El `<h2>` y el párrafo no cambian — ya estaban dentro de los límites recomendados y su jerarquía visual funciona.

## Capabilities

### New Capabilities
(ninguna)

### Modified Capabilities
(ninguna — es un ajuste visual sobre estructura ya cubierta por la capability `fragata-background-gallery` existente; no cambia ningún requirement, solo la implementación CSS)

## Impact

- `styles.css`: `.fragata-hero`, `.fragata-hero-copy`, `.fragata-cta` (reglas existentes, editadas in situ — no hay duplicación dispersa en estos selectores, confirmado por grep).
