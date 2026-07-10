## Context

`.place-card` (`styles.css` línea ~6347, sección "Tres formas de vivir Ensenada": El Dique, Ensenada Centro, Punta Lara) tiene `border-radius: 0 !important` — la última de 4 declaraciones distintas de `border-radius` para este selector a lo largo del archivo (10px, 16px, 0, 0), donde esta última con `!important` es la que gana. Confirmado visualmente (captura desktop 1400px): la card es un rectángulo de esquinas filosas, mientras el badge numerado (círculo, `border-radius: 999px`) y el botón "Ver historia" (pill, `border-radius: 999px`) dentro de la misma card sí son redondeados. Las tarjetas hermanas en otras secciones del sitio (`.fragata-hero`, `.video-panel`, `.culture-slide`) usan 18px.

## Goals / Non-Goals

**Goals:**
- Que `.place-card` use un radio de esquina consistente con sus tarjetas hermanas (18px).
- Que la imagen de portada dentro de la card respete la esquina redondeada del contenedor (no sobresalga).

**Non-Goals:**
- No se cambia el radio de `.place-modal__media` (el modal que se abre al hacer clic en una card) — ya está en 22px, valor cercano y coherente, fuera de alcance de este fix puntual.
- No se auditan ni corrigen otros `border-radius: 0` del archivo (ej. `.social-strip-links` en mobile, `.brand-mark` en algunos breakpoints) — esos pueden ser intencionales (formas cuadradas para íconos/badges específicos) y no fueron señalados en `DESIGN.md` como inconsistencia.

## Decisions

**Valor elegido: `18px`.**
Coincide con el radio ya usado por `.fragata-hero`, `.video-panel` y `.culture-slide` — las otras tarjetas "hero-like" del sitio. Usar el mismo valor en vez de inventar uno nuevo mantiene la card dentro del vocabulario de formas ya establecido (documentado ahora en `DESIGN.md` § Elevation/Components), en vez de agregar una quinta variante de radio al archivo.

**Se mantiene `overflow: hidden !important`** (ya presente en la regla) para que la imagen de portada respete la esquina redondeada sin necesitar tocar el `<img>` por separado.

## Risks / Trade-offs

- **[Riesgo] Ninguno operacional** — cambio de un valor numérico en una regla CSS existente.
- **[Riesgo] El contraste entre card (ahora redondeada) y modal (22px) podría notarse si se comparan uno al lado del otro** → Mitigación: 18px vs 22px es una diferencia sutil, intencionalmente cercana; no se busca un match exacto, solo evitar el contraste "0 vs todo lo demás redondeado".

## Migration Plan

1. Cambiar `border-radius: 0 !important` a `border-radius: 18px !important` en `styles.css` línea ~6356.
2. Verificar con captura (desktop y mobile) que las 3 place-cards se ven con esquinas redondeadas y que las imágenes de portada no sobresalen.
3. Commit + push a `main` → deploy automático.
4. Rollback: revertir el commit si se ve mal — cambio aislado a un valor.

## Open Questions

Ninguna.
