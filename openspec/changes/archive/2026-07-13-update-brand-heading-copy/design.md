## Context

Cambio de copy puntual en la sección `#marca` de `index.html`. El único punto no trivial es cómo repartir el nuevo título "TU LUGAR PARA DISFRUTAR" entre los 4 `<span>` que arma el `<h2 id="brand-system-title">`, porque el CSS existente (`.brand-system-copy h2 span:last-child`, definido en varios breakpoints de `styles.css`) le da a la última línea un tamaño mucho mayor como remate visual — eso ya fue confirmado con el cliente.

## Goals / Non-Goals

**Goals:**
- Actualizar el título y la bajada de la sección `#marca` sin alterar la estructura visual/CSS existente.

**Non-Goals:**
- No se toca `styles.css` ni `script.js` — el patrón de 4 `<span>` con remate grande en el último ya existe y sigue aplicando igual.
- No se ajusta el resto del copy de la home.

## Decisions

- **Repartir "TU LUGAR PARA DISFRUTAR" en 4 `<span>`, uno por palabra** (`TU` / `LUGAR` / `PARA` / `DISFRUTAR`), igual que el original (`Mirar,` / `registrar` / `y contar` / `Ensenada`) — confirmado con el cliente sobre 3 alternativas (4 líneas, 2 líneas, 1 línea sin remate). Mantiene el mismo ritmo visual y reusa el CSS tal cual sin necesidad de tocarlo.

## Risks / Trade-offs

- [Riesgo: el nuevo texto no calza igual de bien con el `font-size`/`line-height` clamp ya afinado para el texto original] → Mitigación: verificación visual en local antes de dar por cerrado el cambio (mismo patrón de 4 spans, palabras de longitud similar a las originales).
