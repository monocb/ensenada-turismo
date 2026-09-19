## Context

El juego llega como un archivo suelto y autosuficiente (`florece_el_taruma.html`, 161 líneas) pensado para abrirse solo: define su propia paleta en `:root`, estiliza `html`, `body`, `h1`, `h2`, `p`, `header` y `footer`, usa clases genéricas (`.card`, `.btn`, `.opt`, `.row`, `.tag`, `.muted`) e IDs genéricos (`title`, `game`, `end`, `score`, `share`), y trae su propio logo en base64 y su propia tipografía.

Nada de eso sobrevive tal cual dentro de `index.html`. La decisión de embeberlo en la home en lugar de darle página propia convierte el trabajo en un problema de **aislamiento**: el juego tiene que comportarse como un componente contenido dentro de una página que ya tiene 7.9k líneas de CSS, 513 de JS y su propio sistema de diseño.

Hay dos precedentes en el repo que marcan el camino, y conviene seguirlos en vez de inventar:

1. **La paleta del bloque ya existe, con el mismo valor exacto.** `styles.css:6592` declara `--lt-*` sobre `.luna-strip, .luna-taruma`, explícitamente fuera de los 4 bloques `:root`, con un comentario que documenta los contrastes WCAG medidos. Los ocho colores principales del juego son idénticos a los del bloque, hasta el dígito hexadecimal.
2. **El JS del bloque ya se protege contra su propia baja.** `script.js:405` deja escrito que si el markup no está, el `querySelectorAll` devuelve vacío y no pasa nada. El juego necesita la misma garantía.

Restricciones del proyecto: sin build, sin dependencias, sin `package.json`; `styles.css` es grande y creció por parches puntuales, así que se agrega al final y no se reorganiza nada; no hay tests de regresión visual, así que la verificación es manual.

## Goals / Non-Goals

**Goals:**

- Que el juego funcione dentro de la home sin cambiar en nada el aspecto ni el comportamiento del resto de la página.
- Que se retire con el mismo `grep` y el mismo commit que el resto del bloque Luna Tarumá.
- Que no cueste una tipografía nueva ni archivos nuevos en `assets/`.
- Que sea jugable con teclado y comprensible con lector de pantalla, y que respete `prefers-reduced-motion`.

**Non-Goals:**

- Guardar puntajes, ranking, persistencia entre visitas o backend de cualquier tipo.
- Rediseñar el juego: se conservan las diez preguntas, la escena, los cuatro niveles de resultado y el tono de los textos tal como vienen.
- Página propia, ruta propia o metadatos de compartir específicos del juego — se descartó al elegir embeberlo.
- Tocar los 4 bloques `:root` ni reorganizar `styles.css`.

## Decisions

### D1 — El juego hereda la paleta del bloque en vez de declarar la suya

El juego se monta dentro de `.luna-taruma`, que ya declara `--lt-noche`, `--lt-indigo`, `--lt-crema`, `--lt-dorado`, `--lt-verde-rio`, `--lt-verde-bosque`, `--lt-violeta` y `--lt-terracota` con exactamente los mismos valores que usa el juego. Se reutilizan por herencia y se borra el `:root` del juego.

Solo tres tokens del juego no existen en el bloque; se declaran en scope local sobre el contenedor del juego, con el prefijo del componente:

| Token del juego | Valor | Pasa a ser |
|---|---|---|
| `--indigo2` | `#25306a` | `--ltg-indigo-claro` |
| `--crema60` | `rgba(245,243,236,.62)` | `--ltg-crema-tenue` |
| `--line` | `rgba(245,243,236,.14)` | `--ltg-linea` |

**Por qué importa el renombre:** `--line` **ya existe** en el `:root` del sitio (`styles.css:5`, `rgba(255, 253, 240, 0.22)`) y se usa en toda la página. Declarar `--line` sin renombrar, aunque fuera en scope local, invita a que un futuro parche la confunda con la del sitio.

*Alternativa descartada:* declarar la paleta completa del juego con prefijo propio. Duplicaría ocho colores ya definidos tres líneas más arriba en el mismo archivo y abriría la puerta a que se desincronicen.

### D2 — Prefijo `ltg-` para clases e IDs, y un único contenedor raíz

Todo el markup del juego cuelga de un contenedor `.ltg` dentro de la sección. Cada selector CSS del juego desciende de `.ltg`, y desaparecen los selectores de elemento globales (`html`, `body`, `h1`, `h2`, `p`, `header`, `footer`): lo que hacían pasa a reglas sobre las clases del componente.

Clases e IDs llevan prefijo `ltg-` (`lt-` ya está tomado por el bloque; `ltg-` no aparece hoy en `index.html`, `styles.css` ni `script.js`). Incluye los `id` de los gradientes del SVG (`glow` → `ltg-glow`, `river` → `ltg-river`), que viven en el mismo espacio de nombres que el resto del documento.

*Alternativa descartada:* Shadow DOM, que daría aislamiento real sin prefijos. Es una pieza de arquitectura nueva para un bloque que se da de baja en una semana, y rompería la herencia de variables del punto D1.

### D3 — El JS va en un IIFE dentro de `script.js`, no en un `<script>` inline

`script.js` es todo alcance global de nivel superior. El juego define `$`, `Q`, `i`, `score`, `end`, `show`, `pick`, `moon`, `flower`, `POS`, `seed`, `rnd` y `answered`: hoy ninguno colisiona, pero `end`, `show`, `i` y `$` son una mina para el próximo parche. Se envuelve todo en un IIFE, que no exporta nada.

El IIFE abre con un guard sobre el contenedor raíz y retorna si no está — la misma protección que ya documenta el bloque para su lightbox, y lo que hace que la baja sea borrar markup sin romper la consola.

Beneficio lateral: adentro del IIFE se puede leer `reduceMotion` (`script.js:36`), que el archivo ya calcula una sola vez, en lugar de volver a consultar `matchMedia`.

*Alternativa descartada:* dejar el `<script>` inline en `index.html`. Separaría el JS del juego del resto del JS del sitio y obligaría a revisar dos lugares en la baja.

### D4 — Se cae la tipografía Archivo; el juego hereda Inter

La home carga **Inter** en los pesos 400 a 900 (`index.html:60`); el juego pide **Archivo** en 400/700/900. Los pesos que el juego necesita ya están cubiertos. Se elimina el `<link>` de Archivo y las declaraciones `font-family` del juego, que pasa a heredar la del sitio.

Es una decisión de costo: una familia más son dos conexiones y un archivo de fuente extra en la carga inicial de la home, para un bloque temporal. El juego no depende de Archivo para funcionar — su identidad la dan la paleta y la escena.

### D5 — Encabezados: `h1`/`h2` del juego bajan a `h3`/`h4`

Dentro de la sección, el `<h1>Florecé el Tarumá</h1>` del juego sería un segundo `h1` en la página y rompería el requisito de jerarquía del bloque. La estructura pasa a:

- `h3.lt-subtitle` — "Florecé el Tarumá", persistente, encabeza la parte igual que "Las noches", "¿Querés pintar en vivo?" o "Quiénes lo hacen".
- `h4` — la pregunta actual, y el título del resultado.

El `h3` va **fuera** de las tres tarjetas (intro / pregunta / resultado), porque esas se ocultan entre sí: si el encabezado viviera en la tarjeta de intro, al empezar a jugar los `h4` quedarían huérfanos.

### D6 — Ubicación: después del relato, antes de la convocatoria

Orden de la sección: apertura (agenda + obra) → relato (río, selva, tarumá) → **juego** → convocatoria → galería → créditos.

El relato contiene literalmente las respuestas de varias preguntas: ponerlo antes convierte la lectura en preparación y el juego en recompensa. Y deja la convocatoria y los créditos —lo que pide una acción concreta— como cierre.

### D7 — Accesibilidad: la escena es decorativa, el estado es texto

La escena SVG pasa a `aria-hidden="true"`: es una representación redundante del puntaje, y leerla elemento por elemento (70 estrellas, ramas, flores) sería ruido. El estado se lee del marcador, que ya es texto visible y recibe una etiqueta accesible.

El contenedor de la pregunta y el del dato de contexto se anuncian con `aria-live="polite"`, para que al responder y al cambiar de pregunta el lector informe sin que la persona vaya a buscarlo. Las opciones ya son `<button>` reales con foco visible, y el foco pasa al botón de avanzar al responder: eso se conserva.

### D8 — Movimiento reducido: se apagan las dos animaciones que faltan

El CSS del juego ya contempla `prefers-reduced-motion` para el latido del botón de empezar y la barra de progreso. Faltan dos, y las dos se resuelven en JS porque están aplicadas en línea:

- la flor entra con una transición `scale(0) → scale(1)`: con movimiento reducido se inserta directamente en su escala final;
- la Luna se reposiciona por atributo (sin transición CSS), así que ya salta — se deja como está.

## Risks / Trade-offs

- **Un estilo del juego se derrama sobre el resto de la home** → Todo selector desciende de `.ltg` y no queda ningún selector de elemento global. Verificación manual recorriendo la home completa contra el estado actual, porque el repo no tiene regresión visual.
- **El juego se ve mal dentro del ancho de la sección** → El juego fue diseñado para una columna de 520px; la sección es más ancha. Se le fija un ancho máximo y se centra, en lugar de estirarlo.
- **La sección ya es larga y el juego la alarga más** → Es el precio de embeberlo, aceptado al elegir esta ubicación. Se mitiga con el orden de D6: quien no quiere jugar pasa de largo una tarjeta compacta, no un bloque desplegado.
- **La baja se complica porque ahora el bloque toca más cosas** → El juego usa las mismas marcas `LUNA-TARUMA:INICIO/FIN` y no agrega archivos ni rutas. `docs/pendientes/baja-bloque-luna-taruma.md` se actualiza en el mismo commit que publica el juego, no después.
- **`grep` de baja falla si el prefijo se mezcla con el del bloque** → `ltg-` es distinguible de `lt-` a simple vista pero `grep "lt-"` matchea ambos, lo cual acá juega a favor: la baja busca el marcador, no el prefijo.
- **Se pierde la identidad tipográfica original del juego** → Asumido en D4. Inter en 900 sostiene la misma jerarquía de pesos que pedía Archivo.

## Migration Plan

Publicación y baja son el mismo mecanismo que el resto del bloque:

1. El juego entra en el mismo par de marcas `LUNA-TARUMA:INICIO/FIN` ya presentes en los tres archivos.
2. `docs/pendientes/baja-bloque-luna-taruma.md` suma el juego a su inventario en el mismo commit.
3. Rollback: revertir el commit. La baja definitiva posterior al 26/09/2026 no necesita pasos nuevos — el juego no agrega archivos, rutas, assets ni cargas externas que retirar por separado.

## Open Questions

Ninguna bloqueante. Dos cosas a confirmar visualmente al implementar, no antes:

- El ancho máximo del juego dentro de la sección (arranca en los 520px del diseño original y se ajusta mirándolo).
- Si el marcador de flores, pensado sobre una escena de 520px, necesita reubicarse en pantallas anchas.
