## Context

`.route-copy .eyebrow` (styles.css:3601-3603) colorea el eyebrow "ENSENADA IDENTIDAD" con `var(--brand-orange)` (`#ff6a22`), el mismo naranja usado decorativamente en otros lugares (ej. `--place-color` de una place-card). Como texto sobre el fondo casi-blanco de `.route-section`, ese naranja mide ~2.65-2.68:1 de contraste — bien por debajo de 4.5:1.

## Goals / Non-Goals

**Goals:**
- Que el eyebrow cumpla contraste WCAG AA (≥4.5:1) contra su fondo real.

**Non-Goals:**
- No se cambia `--brand-orange` globalmente — sigue siendo el naranja decorativo correcto para otros usos (no-texto) de la línea "Descubrí".

## Decisions

- **Un color de texto específico para este eyebrow, no un ajuste global de `--brand-orange`** — alternativa considerada: oscurecer `--brand-orange` en el `:root` (descartada: rompería el tono decorativo ya usado y probado en otros elementos, ej. el acento de las place-cards, que no tienen problema de contraste porque no son texto).
- **`#b8440b`** (~5.02:1 medido contra el fondo compuesto de `.route-section`) — mismo criterio que se usó para el eyebrow de "Fotos" en `fix-visual-consistency-en-fotos`: elegir un tono de la misma familia de hue con margen sobre el mínimo, no el valor límite exacto.

## Risks / Trade-offs

- [El naranja más oscuro podría leerse ligeramente distinto al resto de los acentos "Descubrí" de la página] → Mitigación: es la misma familia de hue (naranja), solo más oscuro; verificar visualmente en la Deploy Preview junto a los demás elementos naranjas de la sección antes de mergear.

## Migration Plan

- Cambio de un solo valor de color en una regla. Revertir es un `git revert`.
- Verificación: Deploy Preview de Netlify, medir contraste del eyebrow renderizado (o pixel-sample) y confirmar ≥4.5:1.
