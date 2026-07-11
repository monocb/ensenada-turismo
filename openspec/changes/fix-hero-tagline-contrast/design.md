## Context

`styles.css:7330` (última declaración activa de `.hero-content p.hero-tagline span`, la que efectivamente aplica por orden de cascada):

```css
.hero-content p.hero-tagline span {
  display: inline !important;
  padding: 0 0.12em 0.04em !important;
  color: #ffffff !important;
  background-image: linear-gradient(transparent 58%, rgba(255, 207, 47, 0.96) 58%) !important;
  box-decoration-break: clone;
  -webkit-box-decoration-break: clone;
}
```

El resaltador dorado (`rgba(255, 207, 47, 0.96)`) cubre el 42% inferior de cada línea. Medido con Puppeteer: texto blanco sobre esa franja da ~1.5:1 de contraste (mínimo WCAG para texto grande: 3:1). El 58% superior de cada línea queda transparente, mostrando el scrim oscuro del hero detrás — ahí el contraste ya es excelente (14-20:1 medido).

Las únicas redeclaraciones de este selector en media queries (`styles.css:7413`, `~7405`) tocan `padding` y `background-image` (el mismo gradiente con un stop ligeramente distinto, 57% en vez de 58%), no `color` ni `text-shadow` — por lo que un `text-shadow` agregado en la regla base cascadea a todos los breakpoints sin necesidad de repetirlo.

## Goals / Non-Goals

**Goals:**
- Que el texto del tagline sea legible (contraste suficiente) tanto en la zona transparente (sobre el scrim oscuro) como en la franja dorada del resaltador, sin cambiar el color del texto ni el tono del dorado.

**Non-Goals:**
- No se toca el resto de la paleta de marca ni el efecto "resaltador" en sí (es una decisión de diseño ya validada, ver `DESIGN.md`).
- No se persigue un contraste numérico WCAG formalmente certificable en la franja dorada — el algoritmo de contraste de WCAG 1.4.3 está definido para colores planos, no para el efecto compuesto de un `text-shadow`. El criterio de aceptación acá es legibilidad verificada visualmente (captura ampliada), consistente con cómo los navegadores y herramientas de auditoría (Lighthouse, axe) tratan este caso: no lo detectan como fallo automatizado porque no hay una fórmula estándar para "contraste con sombra", pero la legibilidad real sigue siendo el objetivo.

## Decisions

**`text-shadow` con 4 offsets cortos sin difuminado (simula un contorno/stroke) en vez de una sombra difusa única.**
Una sombra difusa (`blur` grande) se mezcla con el dorado brillante y pierde definición justo en el centro de cada trazo. Cuatro sombras cortas (arriba/abajo/izquierda/derecha, ~1-2px, blur mínimo) dibujan un borde oscuro alrededor de cada letra que funciona igual sobre fondo oscuro (donde ya sobra contraste, sin efecto negativo) y sobre el dorado (donde define el borde de cada trazo independientemente del color de fondo).

```css
text-shadow:
  0 1px 2px rgba(4, 8, 14, 0.9),
  0 -1px 2px rgba(4, 8, 14, 0.9),
  1px 0 2px rgba(4, 8, 14, 0.9),
  -1px 0 2px rgba(4, 8, 14, 0.9);
```

Color del shadow (`rgba(4, 8, 14, ...)`) elegido para matchear el navy del `.hero-shade` existente, consistencia visual con el resto del hero.

**Verificación por captura ampliada (2-3x), no por fórmula de contraste numérico**, ver Non-Goals. Se compara antes/después visualmente en la franja dorada específicamente, en desktop y mobile.

## Risks / Trade-offs

- **[Riesgo] Un `text-shadow` mal calibrado puede verse como un "halo" sucio en vez de un contorno limpio.** → Mitigación: iterar el valor viendo la captura real antes de confirmar, no aplicar a ciegas.
- Ninguno operacional — cambio puramente visual en un solo selector.

## Migration Plan

1. Agregar `text-shadow` a `.hero-content p.hero-tagline span` (`styles.css:7330`).
2. Capturar y comparar visualmente (zoom 2-3x) la franja dorada en desktop y mobile, antes/después.
3. Ajustar el valor si la primera iteración no se ve suficientemente legible.
4. Actualizar `docs/pendientes/accesibilidad.md` con los 4 resultados de la medición.
5. Commit + push a `main`.

## Open Questions

Ninguna.
