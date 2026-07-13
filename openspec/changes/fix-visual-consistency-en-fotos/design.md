## Context

`en-fotos/index.html` es la página dedicada a la línea de contenido "Fotos", que `DESIGN.md` documenta con su propio par de acento (celeste `--brand-cyan` #00c8ff + lima `--brand-lime` #c7ff31) — pero el CSS de esta página nunca usa esos tokens: inventó dos azules hardcodeados propios (`#14bce5` para el side-stripe, `#009fd1` para el eyebrow), y el side-stripe en sí es un patrón que `reference/brand.md` del skill impeccable prohíbe explícitamente (side-stripe borders). El sitio ya tiene un patrón equivalente y permitido para dar acento de color a una tarjeta: la barra superior `::before` de `.place-card` (`styles.css:6385-6396`, ya usada en el home) — no hace falta inventar nada nuevo, solo reutilizar ese patrón con los tokens correctos.

## Goals / Non-Goals

**Goals:**
- Sacar el side-stripe (patrón prohibido) y reemplazarlo por el patrón de barra superior ya validado en el sitio.
- Que la línea "Fotos" use sus propios tokens de color documentados, no hexadecimales inventados.
- Que el texto del eyebrow cumpla WCAG AA (4.5:1) — no alcanza con solo "usar el token de marca", el token decorativo no pasa contraste como texto.

**Non-Goals:**
- No se rediseña la estructura de las 3 galerías ni se agrega diferenciación visual entre ellas (mood distinto por sección) — eso es una mejora de "delight", no de consistencia, y queda fuera de esta propuesta.
- No se toca el lightbox, el `aria-label` duplicado, ni el footer/CTA de redes — accesibilidad y conversión, propuestas separadas.

## Decisions

- **Reusar `.place-card::before` (barra superior) en vez de inventar un tratamiento nuevo para `.photos-reel-section`** — alternativa considerada: mantener una franja lateral pero con los colores correctos (descartada: el side-stripe en sí, no solo su color, es lo que está en la lista de patrones prohibidos de marca; cambiarle el color no lo saca de la lista de bans).
- **Introducir un tono más oscuro de la familia cyan para el texto del eyebrow, distinto del token decorativo `--brand-cyan`** — medido: `--brand-cyan` (#00c8ff) da 1.96:1 sobre blanco (peor que el actual #009fd1 a 3.05:1); un tono en el rango de `#007ba3` da ~4.81:1, cumple AA con margen y se mantiene reconociblemente "celeste". Alternativa considerada: usar `--text-muted` u otro gris neutro para el eyebrow y reservar el celeste solo para el side-stripe/barra (descartada: pierde la identidad de línea de color en el único lugar de texto visible de la página; mejor resolver el tono que renunciar al color).
- **Normalizar `#ffcf2f` → `var(--brand-yellow, #ffcf2f)`** — consistente con el patrón ya usado en otras reglas del mismo archivo (`styles.css:6084`), sin cambio de valor, solo de mecanismo (token vs. literal) para que un futuro ajuste de marca no deje huérfanas estas reglas.

## Risks / Trade-offs

- [El tono más oscuro de cyan para el eyebrow podría no sentirse "igual de celeste" que el `--brand-cyan` original al lado de la barra superior en tono claro] → Mitigación: verificar visualmente ambos elementos juntos (barra + eyebrow) en la Deploy Preview antes de mergear, no solo medir contraste en aislado.
- [Cambiar el `::before` de side-stripe a top-bar cambia la composición visual de la tarjeta, no es un cambio de un solo valor] → Mitigación: es exactamente el patrón que ya existe y funciona en `.place-card` — copiar sus valores de `border-radius`/posicionamiento en vez de re-derivarlos reduce el riesgo de un layout roto.

## Migration Plan

- Cambios acotados a `styles.css`, sin HTML/JS. Revertir es un `git revert` si algo se ve mal en la Deploy Preview.
- Verificación: abrir la rama en su Deploy Preview de Netlify, comparar visualmente las 3 galerías contra `ensenadaturismo.com/en-fotos` (producción), y correr una herramienta de contraste (o pixel-sample) sobre el eyebrow final antes de aprobar el merge.
