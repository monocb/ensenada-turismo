## Context

Con el menú mobile abierto (`.main-nav.is-open`, dentro de `.site-header`), el `<h1>ENSENADA</h1>` del hero se ve "fantasma" por encima del panel del menú, en la zona donde ambos se superponen (últimos ítems del menú y el borde inferior del panel). Confirmado con capturas reproducibles en Chrome headless, viewport 375×812, sobre `https://ensenadaturismo.com/` (producción).

**Causa raíz confirmada: no es un bug de stacking/z-index — es opacidad insuficiente frente a texto de altísimo contraste.**

`.main-nav` tiene `background: rgba(8, 11, 24, 0.96) !important` (`styles.css` línea ~6973) — 96% opaco, **4% transparente**. Ese 4% de transparencia alcanza para revelar visiblemente el `<h1>` del hero porque el texto detrás es blanco puro (`#ffffff`), peso 950, y ocupa un tamaño enorme (hasta `clamp(46px, 14vw, 168px)`) — el contraste extremo blanco-sobre-navy hace que incluso una filtración de 4% sea perceptible a simple vista y en capturas.

**Cómo se confirmó (Chrome headless + overrides de estilo vía `page.evaluate`, con captura antes/después en cada paso):**

1. Cuatro hipótesis de stacking/z-index probadas y **descartadas por no cambiar nada**: forzar `z-index: 999` en `.main-nav`, forzar `z-index: 0` en `.hero-content`, forzar `isolation: auto` en `.hero`, y neutralizar `will-change`/`transform` en `.site-header`. Ninguna tuvo efecto visual — señal de que el problema no era de stacking.
2. **Chequeo de cordura**: se confirmó que los overrides sí se aplicaban de verdad (computed style cambiaba, y forzar `background-color: red` en `.main-nav` sí pintaba la captura de rojo) — descartando que el método de prueba estuviera roto.
3. **La prueba decisiva**: forzar `background-color: rgb(8, 11, 24)` en `.main-nav` — el mismo color exacto, pero alpha 1.0 en vez de 0.96 — hizo desaparecer completamente el "ENSENADA" fantasma. Aislar esa única variable (mismo color, solo cambiar opacidad) confirmó la causa.

Queda un residuo muy menor (un filo de 1-2px de texto apenas visible en el borde superior del panel, cerca de "Inicio") que no se investigó a fondo — es un efecto de segundo orden, mucho menos perceptible que el bug principal, y no bloquea el fix.

**Por qué las hipótesis de stacking parecían plausibles al principio:** `.site-header` tiene `z-index: 30` y `.hero-content` tiene `z-index: 2` — a primera vista, una diferencia de z-index tan grande sugiere que "algo" en el stacking debía estar mal si había bleed-through. En realidad el stacking siempre fue correcto (`.site-header` sí pinta por encima); lo que pasaba por encima era una fracción mínima de luz a través de una capa casi-pero-no-completamente opaca, no una inversión del orden de pintado.

## Goals / Non-Goals

**Goals:**
- Que el panel del menú mobile sea completamente opaco al contenido detrás mientras está abierto, en cualquier viewport mobile.

**Non-Goals:**
- No se rediseña el menú mobile ni se cambia su contenido/estructura.
- No se toca la lógica JS de apertura/cierre (ya confirmada funcionando).
- No se investiga el residuo menor del borde superior (1-2px) — desproporcionado en esfuerzo frente a su impacto visual una vez resuelto el bug principal; si sigue siendo perceptible después del fix, amerita su propio hallazgo puntual, no bloquea este cambio.
- No se resuelve — en este cambio — la causa raíz de por qué hay más de una docena de bloques `.site-header`/`.main-nav` redundantes en `styles.css`; problema de mantenibilidad más amplio, fuera de alcance acá.

## Decisions

**Fix: subir la opacidad del fondo de `.main-nav` de 0.96 a 1 (opaco completo).**

`styles.css` línea ~6973, dentro de `@media (max-width: 900px)`:
```css
background: rgba(8, 11, 24, 0.96) !important;
```
→
```css
background: rgba(8, 11, 24, 1) !important;
```

Alternativa considerada: bajar el `font-size`/peso del h1 del hero para reducir el contraste que hace perceptible la filtración — descartada, ya que tocar el hero para resolver un problema del menú sería un acoplamiento innecesario entre dos componentes no relacionados, y el hero ya fue objeto de su propio fix (`verify-fix-mobile-bugs`) por una razón distinta.

Alternativa considerada: agregar `backdrop-filter: blur(...)` en vez de subir la opacidad — descartada como innecesaria; el problema es puramente de opacidad, no de nitidez del fondo, así que el fix más simple (opacidad 1) alcanza sin agregar una propiedad nueva.

## Risks / Trade-offs

- **[Riesgo] Subir a opacidad 1 podría verse "demasiado sólido" comparado con el resto del sistema visual, que usa translucidez deliberadamente en varios lugares (controles de carrusel, header al hacer scroll).** → Mitigación: verificar visualmente que el panel a opacidad 1 sigue viéndose coherente con el resto del sistema (`DESIGN.md`) antes de dar por cerrado — si se ve mal, considerar 0.99-1.0 en vez de exactamente 1, pero siempre por encima del punto donde el texto blanco extremo deja de filtrarse.
- **[Riesgo] Ninguno operacional** — cambio de un solo valor numérico en una regla CSS ya existente, sin tocar estructura, JS, ni ningún otro componente.

## Migration Plan

1. Cambiar el valor de opacidad en `styles.css:6973` (0.96 → 1).
2. Verificar con capturas en 320/375/414/430px que el panel es completamente opaco al contenido del hero, sin el "ENSENADA" fantasma.
3. Confirmar que el ícono de tres líneas, `aria-expanded`, y el comportamiento de scroll del header siguen funcionando sin cambios (no se tocó nada relacionado).
4. Commit + push a `main` → deploy automático.
5. Rollback: revertir el commit si el panel se ve visualmente peor a opacidad 1 — cambio aislado a un valor.

## Open Questions

Ninguna — causa raíz confirmada empíricamente, fix acotado a una línea.
