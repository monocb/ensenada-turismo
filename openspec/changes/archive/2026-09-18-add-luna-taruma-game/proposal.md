## Why

El bloque Luna Tarumá cuenta el evento, pero solo se lee: quien entra recibe las fechas y el relato del río y la selva, y se va. Existe un juego ya diseñado para el evento — "Florecé el Tarumá", un quiz de 10 preguntas con un tarumá que florece en SVG — que convierte ese mismo contenido en algo que se juega y se comparte, con un texto de resultado que invita explícitamente a las dos noches. Publicarlo antes del 19/09/2026 le da al bloque una razón para volver y un formato que circula por redes, que es donde está la audiencia del evento.

## What Changes

- Se incorpora el juego "Florecé el Tarumá" **embebido dentro de la sección `#luna-taruma` de la home**, no como página aparte: mismo scroll, misma URL, sin sumar rutas al sitio.
- El juego se integra **desde su fuente** (`florece_el_taruma.html`, archivo autocontenido externo al repo) y no se copia tal cual: hay que adaptarlo para convivir con una página que ya tiene su propio CSS, sus IDs y sus globales de JS.
- Se corrige el horario del juego: dice "18 hs" en las dos noches, el dato correcto es **19:00 hs**, igual que el resto del sitio.
- Se saca la leyenda de borrador del footer del juego ("Boceto de juego para la web") y el header propio del juego (logo en base64 + tag), redundante dentro de la sección.
- El juego queda delimitado con las mismas marcas `LUNA-TARUMA:INICIO/FIN` en `index.html`, `styles.css` y `script.js`, y se suma al inventario de baja del bloque.

No se agrega build, ni dependencias, ni `package.json`. No se agrega una familia tipográfica nueva.

## Capabilities

### New Capabilities

- `luna-taruma-quiz-game`: el juego embebido — flujo de las tres pantallas (intro, pregunta, resultado), corrección y puntaje, la escena SVG que florece y hace subir la Luna, los cuatro niveles de resultado, compartir y volver a jugar, accesibilidad por teclado y lector de pantalla, respeto por `prefers-reduced-motion`, y el aislamiento de sus estilos, IDs y variables de JS respecto del resto de la página.

### Modified Capabilities

- `luna-taruma-event-block`: la sección del evento pasa a contener una parte interactiva además de las existentes (agenda, relato, convocatoria, galería, créditos). Cambia qué compone la sección y dónde se ubica el juego dentro de su orden de lectura.

## Impact

**Código afectado**

- `index.html` — markup del juego dentro de `#luna-taruma`, entre las marcas del bloque temporal.
- `styles.css` — estilos del juego, namespaceados y con la paleta declarada en scope local, siguiendo el precedente ya documentado en el archivo (`.luna-strip, .luna-taruma` declaran `--lt-*` fuera de los 4 bloques `:root`).
- `script.js` — lógica del juego, aislada para no filtrar globales al scope compartido del archivo.
- `docs/pendientes/baja-bloque-luna-taruma.md` — inventario y pasos de baja actualizados.

**Riesgos de integración identificados** (el detalle de resolución va en `design.md`)

- El juego declara su paleta en `:root` y **`--line` ya existe** en el `:root` del sitio (`styles.css:5`): declararla sin scope pisaría una variable en uso en toda la página.
- El juego estiliza selectores globales (`html`, `body`, `h1`, `h2`, `p`, `header`, `footer`) y clases genéricas (`.card`, `.btn`, `.opt`, `.row`, `.muted`, `.tag`…) que se derramarían sobre el resto de la home.
- El juego usa IDs genéricos (`title`, `game`, `end`, `score`, `share`, `next`, `q`…) y gradientes SVG con `id` `glow` y `river`, en una página que ya tiene 15 IDs propios.
- `script.js` no envuelve nada: son 513 líneas de globales de nivel superior. El juego define `$`, `Q`, `i`, `score`, `end`, `show`, `pick`, `moon`, `flower`, `POS`, `seed`, `rnd`, `answered` — varios peligrosamente genéricos.
- El juego pide la fuente **Archivo** de Google Fonts; la home ya carga **Inter**. Sumar una segunda familia es costo de red nuevo para un bloque que se da de baja en una semana.

**Sin impacto en**: rutas del sitio, navegación, `en-fotos/`, `404.html`, headers de Netlify, presupuesto de imágenes (el juego es SVG inline, no suma archivos a `assets/`).
