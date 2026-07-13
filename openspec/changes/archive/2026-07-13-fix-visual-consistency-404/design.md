## Context

`404.html` comparte `styles.css` con el resto del sitio pero es la única de las 3 páginas que no incluye los `<link>` de Google Fonts para Inter — no hay ningún `@font-face` en `styles.css` (el CSS espera que la hoja de Google Fonts ya se haya cargado por separado en cada página). Además, `404.html` es una página chica y de bajo tráfico; este cambio se mantiene proporcional a eso.

## Goals / Non-Goals

**Goals:**
- Que `404.html` renderice en Inter, igual que el resto del sitio.
- Que el eyebrow "ENSENADA" tenga el color dorado correcto, con scope propio para no depender de qué regla sitewide gane la cascada.

**Non-Goals:**
- No se agrega footer, enlaces a redes, ni se reescribe el copy — son mejoras de conversión/voz de marca, no de consistencia visual, y quedan para una propuesta aparte si se decide abordarlas.
- No se toca la duplicación de tokens de dorado (`--brand-yellow` vs. el dorado "resaltador") porque es un patrón sitewide, no algo introducido o corregible solo en esta página.

## Decisions

- **Copiar los 3 `<link>` tags tal cual existen en `index.html`/`en-fotos/index.html`**, sin variarlos — mantiene consistencia exacta con las otras dos páginas en vez de una implementación distinta (ej. `@font-face` local, que cambiaría el mecanismo de carga de fuente para una sola página y complicaría un futuro mantenimiento).
- **Regla con scope (`.not-found .eyebrow`) en vez de agregar `!important` a la regla base `.eyebrow`** — mismo criterio que en `fix-visual-consistency-home`: replicar el patrón de scope explícito es más auditable a futuro que apilar `!important`.

## Risks / Trade-offs

- [Cargar Google Fonts agrega una petición de red externa a una página que hoy no la tiene, con el consecuente costo de performance/layout shift] → Mitigación: es el mismo costo que ya pagan `index.html` y `en-fotos/index.html`; no es un costo nuevo para el sitio, solo consistente entre páginas. Si se quisiera evitar, la alternativa sería un `@font-face` con `font-display: swap` self-hosted para las 3 páginas — cambio mayor, fuera de alcance de esta propuesta puntual.

## Migration Plan

- Cambios de agregar 3 líneas de `<head>` + 1 regla CSS con scope; sin migración de datos. Revertir es un `git revert`.
- Verificación: abrir la rama en su Deploy Preview de Netlify, confirmar visualmente que "Página no encontrada" renderiza en Inter (peso extremo, no Arial) y que "ENSENADA" se ve dorado, comparando contra `ensenadaturismo.com/404` (si es alcanzable) o sirviendo la página localmente.
