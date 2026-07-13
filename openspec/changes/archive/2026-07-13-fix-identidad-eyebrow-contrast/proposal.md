## Why

`/impeccable audit` sobre `index.html` (2026-07-12) midió que el eyebrow "ENSENADA IDENTIDAD" (`.route-copy .eyebrow`, color `var(--brand-orange)` `#ff6a22`) tiene un contraste de ~2.68:1 contra el fondo real de la sección "Descubrí" (`.route-section`, un overlay casi opaco `rgba(244, 247, 242, 0.92-0.96)` sobre una foto fija) — muy por debajo del mínimo WCAG AA para texto chico (4.5:1). A diferencia del tagline del hero (ver change archivado `2026-07-11-fix-hero-tagline-contrast`), acá no hay ningún trade-off de marca documentado que justifique el color actual — es simplemente el color de línea "Descubrí" sin verificar contra su fondo real.

## What Changes

- Oscurecer el color del eyebrow `.route-copy .eyebrow` dentro de la misma familia de naranja de marca, a un tono que limpie 4.5:1 contra el fondo real de `.route-section` (medido: `#b8440b` da ~5.02:1 contra el fondo compuesto, con margen).
- No se toca `--brand-orange` (`#ff6a22`) en sí, que se usa como color decorativo en otros lugares (ej. `--place-color` de una place-card) donde no hay el mismo problema de contraste de texto — se agrega un color específico para este uso de texto.

## Capabilities

### Modified Capabilities
- `text-contrast-over-images`: se agrega el caso del eyebrow "Identidad" a la capability de contraste de texto sobre imágenes ya existente.

## Impact

- Archivo afectado: `styles.css` (una regla, `.route-copy .eyebrow`).
- No afecta HTML ni JS. No afecta otras páginas.
- Riesgo: bajo. Cambio de un solo valor de color, verificable con medición de contraste antes de mergear.
