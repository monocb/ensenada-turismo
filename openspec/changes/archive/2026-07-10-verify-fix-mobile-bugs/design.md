## Context

`styles.css` tiene ~15 bloques distintos que redeclaran `.hero h1` (todos con `!important`, agregados como parches fechados a lo largo del historial del archivo — el patrón exacto que `CLAUDE.md` advierte evitar reorganizar). El último bloque en orden de aparición, dentro de `@media (max-width: 760px)` (línea 7868-7893, el final del archivo), es el que gana la cascada para cualquier viewport ≤760px, ya que todas las reglas usan `!important` con la misma especificidad — a igualdad de especificidad, gana el que aparece último en el archivo.

Ese bloque fija:
```css
.hero h1 {
  max-width: 100% !important;
  white-space: nowrap !important;
  font-size: clamp(58px, 22vw, 96px) !important;
}
```

Con `white-space: nowrap`, "ENSENADA" (una sola palabra, sin espacios) nunca puede partirse en dos líneas — así que si el `font-size` calculado es demasiado grande para el ancho disponible, el texto se recorta visualmente (el `.hero` tiene `overflow: hidden`, y además hay una regla global `body, html { overflow-x: clip }` en el mismo bloque).

Medido empíricamente con un canvas 2D (mismo `font-family`/`font-weight` que el `h1` real) contra el ancho de caja real (`getBoundingClientRect().width`) en 6 anchos de viewport comunes (320, 360, 375, 390, 414, 430px), el texto excede el contenedor en los 6 casos, por entre 111px y 139px.

## Goals / Non-Goals

**Goals:**
- Que "ENSENADA" quepa completo, sin recortarse, en una sola línea, en todo el rango 320–760px (el rango que cubre este bloque `@media`).
- Verificar y documentar el estado real de los 4 bugs mobile históricos en `docs/pendientes/`.

**Non-Goals:**
- No se reescriben ni consolidan los ~14 bloques restantes de `.hero h1` — quedan fuera de alcance (matan el mandato de CLAUDE.md de evitar reorganizaciones amplias sin tests de regresión visual).
- No se resuelve el hallazgo secundario observado (el panel del menú mobile tiene fondo semi-transparente y dejaba ver el `<h1>` de fondo) — no es uno de los 4 bugs documentados, se deja anotado como posible tarea futura, no se toca en este cambio.
- No se agregan tests automatizados de regresión visual — fuera de alcance de este cambio puntual.

## Decisions

**Ajustar solo el `font-size` del bloque de línea 7877, manteniendo `white-space: nowrap`.**
Alternativa considerada: quitar `white-space: nowrap` para permitir que el texto se parta — descartada porque "ENSENADA" es una sola palabra sin espacios, así que sin `overflow-wrap: break-word` el navegador igual no lo partiría (seguiría desbordando); agregar `overflow-wrap: break-word` partiría la palabra a mitad de letra, un resultado visualmente peor que reducir el tamaño de fuente. Reducir el `font-size` es el fix mínimo que preserva el diseño de una sola línea.

**Fórmula elegida: `clamp(46px, 14vw, 68px)`.**
Se derivó empíricamente: se midió con canvas que el ancho renderizado de "ENSENADA" (font-weight 950, Inter) escala ~5.7px de ancho por cada 1px de `font-size`. Se buscó una combinación `clamp(min, Nvw, max)` que mantenga el texto dentro del ancho disponible (`viewport - 40px` de padding horizontal del `.hero-content`) en todo el rango 320-760px. Verificado programáticamente (Chrome headless + canvas measureText) en 320/360/375/390/414/430/599/700/760px: cabe en los 9 casos, con margen cómodo en los anchos más chicos y ajuste justo (sin overflow) en el límite superior de 760px.

Alternativa descartada: `calc(17.5vw - 7px)` (fórmula afín más precisa, ajustada al pixel) — funciona igual de bien pero introduce `calc()` anidado dentro de `clamp()`, un patrón sin precedente en el resto del archivo; se prefirió una fórmula `clamp()` simple, consistente con el estilo de las otras ~14 reglas `.hero h1` ya existentes.

**Actualizar `docs/pendientes/bug-portada-mobile.md` en vez de crear un archivo nuevo.**
El síntoma visible ("la portada se ve mal en mobile") es el mismo que reportó el usuario original; lo que cambia es el diagnóstico técnico preciso (texto recortado, no imagen mal posicionada). Se mantiene el mismo archivo para no fragmentar el historial de este bug.

## Risks / Trade-offs

- **[Riesgo] La fórmula `clamp(46px, 14vw, 68px)` es una aproximación lineal simple, no exacta como una fórmula `calc()` afín.** → Mitigación: verificado que cabe con margen en los 9 anchos probados (320-760px); en el peor caso (760px) el ajuste es exacto (0px de margen) pero no hay overflow. Si en el futuro se agrega texto más largo al `hero h1` (ej. cambio de copy), habría que re-verificar.
- **[Riesgo] El resto de los ~14 bloques `.hero h1` en el archivo podrían tener el mismo problema en otros rangos de viewport (tablet, desktop chico) no cubiertos por este cambio.** → Mitigación: fuera de alcance explícito de este cambio (que se limita a los 4 bugs mobile documentados); si aparece un bug similar en otro rango, amerita su propio change.
- **[Riesgo] Ninguno operacional** — cambio de una línea CSS, sin build, sin dependencias.

## Migration Plan

1. Editar `styles.css:7877` con la nueva fórmula.
2. Verificar en Chrome headless (320/375/414/430px) que el texto ya no se recorta.
3. Verificar visualmente con screenshots que el hero se ve bien (tamaño de texto no luce desproporcionadamente chico).
4. Actualizar los 4 archivos de `docs/pendientes/`.
5. Commit + push a `main` → deploy automático de Netlify (sin build).
6. Rollback: revertir el commit si el tamaño de fuente no gusta visualmente — cambio aislado a una línea.

## Open Questions

Ninguna.
