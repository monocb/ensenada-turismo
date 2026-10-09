## Why

El evento Luna Tarumá fueron dos noches: el 19 y el 26 de septiembre de 2026. Hoy es el 8 de octubre. El bloque sigue publicado, doce días después de la última noche, y sigue hablando en futuro: "Te esperamos las dos noches", "Vení a vivir Luna Tarumá", y una convocatoria a pintar en vivo el 26 de septiembre que ya no se puede aceptar.

No es un detalle de rincón. Medido con Chromium a 1440px, el bloque ocupa **3557 de los 8920 píxeles** de la home (40%) y es lo segundo que ve quien entra, inmediatamente después del hero. El sitio de turismo de Ensenada está dedicando casi la mitad de su página principal a invitar a algo que ya pasó.

El bloque se publicó con fecha de vencimiento y con su procedimiento de retiro escrito de antemano, en [`docs/pendientes/baja-bloque-luna-taruma.md`](../../../docs/pendientes/baja-bloque-luna-taruma.md). Esta es la ejecución de ese procedimiento: no hay que decidir nada nuevo, hay que hacer lo que ya está documentado.

## What Changes

- Se retiran los **tres bloques marcados de `index.html`**: el enlace del menú, la franja de anuncio dentro del hero y la sección completa del evento, que contiene adentro el juego "Florecé el Tarumá".
- Se retira el **bloque marcado de `styles.css`** (paleta del evento en scope local, estilos de la franja, de la sección y del juego) y el de **`script.js`** (enganche al lightbox más el IIFE del juego).
- Se borra **`assets/luna-taruma/`** completa: 17 archivos `.webp`.
- Se borra el documento de baja y su línea en el índice de pendientes.
- **BREAKING**: desaparece la URL `/#luna-taruma`. Era un ancla dentro de la home, no una ruta propia, así que quien la visite cae en el inicio en vez de recibir un 404. No hay entradas en `sitemap.xml` que corregir.
- Se registra, en la convención de contenido temporal, cómo salió la primera ejecución real del procedimiento.

La home vuelve a su estructura anterior: hero, marca, identidad, historia, fragata, redes.

## Capabilities

### New Capabilities

Ninguna.

### Modified Capabilities

- `temporary-content-blocks`: la convención no cambia, pero esta es la primera vez que su procedimiento de baja se ejecuta de punta a punta. Se agrega el requisito de que la baja quede verificada y de que lo aprendido vuelva a la convención, para que el próximo evento temporal no repita lo que haya fallado acá.

### Removed Capabilities

- `luna-taruma-event-block`: describía la franja, la agenda de noches, el relato, la galería, la convocatoria y los créditos del evento. Sin evento, no hay bloque.
- `luna-taruma-quiz-game`: describía el juego embebido en esa sección. Se va con ella.

## Impact

**Se borra**

- `index.html` — 3 regiones marcadas (menú, franja del hero, sección del evento con el juego adentro).
- `styles.css` — 1 región marcada al final del archivo. No se tocó ninguna regla preexistente al crearla, así que borrarla no deja huecos.
- `script.js` — 1 región marcada.
- `assets/luna-taruma/` — 17 archivos.
- `docs/pendientes/baja-bloque-luna-taruma.md` y su línea en `docs/pendientes/README.md`.
- `openspec/specs/luna-taruma-event-block/` y `openspec/specs/luna-taruma-quiz-game/`.

**Inventario verificado antes de empezar**

El documento de baja decía que hay 5 pares de marcadores: 3 en `index.html`, 1 en `styles.css`, 1 en `script.js`. Confirmado (6 + 2 + 2 líneas). También se confirmó que `en-fotos/index.html` y `404.html` **no** enlazan al ancla pese a compartir el header, y que fuera del archivo de OpenSpec sólo quedan 5 archivos con referencias al evento. El inventario estaba bien.

**No se toca**

`temporary-content-blocks` sigue vigente como convención para el próximo evento. El lightbox y el resto de las galerías del sitio siguen funcionando: el bloque sólo enganchaba sus propias imágenes a un lightbox que ya existía.

**Beneficio lateral**

Este es el primero de tres changes acordados. El segundo corrige los hallazgos de la revisión contra las Web Interface Guidelines, y **6 de las 14 imágenes con `role="button"`** que ese change tiene que arreglar viven dentro del bloque que se retira acá. Esta baja reduce ese trabajo antes de empezarlo.
