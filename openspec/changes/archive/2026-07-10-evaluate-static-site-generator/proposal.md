## Why

`docs/proyecto/funcionalidades-futuras.md` documenta features que el patrón actual (HTML/CSS/JS plano, sin build, `manifest.json` a mano) ya reconoce que no va a soportar bien: "páginas por lugar" (8 páginas nuevas, hoy solo anclas en el home) y un "sistema de datos para eventos, concursos, notas y galerías más allá del manifest.json". No existe hoy ninguna evaluación formal de si conviene adoptar un generador estático liviano antes de encarar esas features, y `CLAUDE.md` exige consultar antes de agregar build/dependencias — este cambio es esa consulta, documentada.

## What Changes

- Investigar y documentar formalmente una comparación Astro vs. Eleventy vs. mantener el stack actual, específicamente para las necesidades ya conocidas del proyecto (páginas por lugar, futuro sistema de datos de concursos).
- Producir una recomendación explícita y accionable en `docs/tecnico/evaluacion-generador-estatico.md`: qué adoptar, cuándo (condiciones disparadoras), y qué NO hacer todavía.
- Enlazar el nuevo documento desde `docs/tecnico/README.md` y `docs/proyecto/funcionalidades-futuras.md`.
- **No se migra código ni se agrega ningún build/dependencia en este cambio** — es puramente una decisión documentada para consulta, tal como pide `CLAUDE.md`. La migración en sí (si se decide encarar) sería un cambio OpenSpec separado y mucho más grande.

## Capabilities

### New Capabilities
- `stack-decision-record`: el proyecto cuenta con una recomendación técnica formal y vigente sobre generadores estáticos, con condiciones claras de cuándo revisitarla.

### Modified Capabilities
(ninguna — no hay spec previa sobre esto, y este cambio no modifica comportamiento del sitio en producción)

## Impact

- Archivos nuevos: `docs/tecnico/evaluacion-generador-estatico.md`.
- Archivos modificados: `docs/tecnico/README.md` (agregar entrada al índice), `docs/proyecto/funcionalidades-futuras.md` (referenciar la evaluación donde corresponda).
- Cero impacto en el sitio en producción: no se toca `index.html`, `script.js`, `styles.css`, `netlify.toml` ni se agrega `package.json`.
- Riesgo: ninguno operacional. Riesgo de "quedar desactualizado" si el ecosistema Astro/Eleventy cambia mucho — mitigado documentando la fecha de la investigación y las fuentes consultadas.
