## Why

La campaña **Luna Tarumá** —producida para Turismo Ensenada junto a la Facultad de Ciencias Astronómicas y Geofísicas de la UNLP y Nexa Contenidos— ya está en circulación: las 7 placas del carrusel de Instagram, las historias, las placas de convocatoria y la locución del video de lanzamiento remiten todas a `ensenadaturismo.com`. Hoy el sitio no menciona el evento en ninguna parte, así que ese tráfico llega a una página que no le contesta nada.

La primera noche es el **sábado 19/9 a las 19:00 hs** y la segunda el **sábado 26/9**, con más noches en carpeta sin confirmar. Es contenido con fecha de vencimiento: entra ahora y se da de baja cuando el ciclo termine, sin dejar deuda en el sitio.

## What Changes

- **Franja de anuncio dentro del hero**, como último hijo de `.hero-content`: nombre del evento, fechas y horario, Punta Lara, "libre y gratuito" y enlace a la sección.
- **Apertura visual del evento** con título e introducción junto a una ilustración protagonista, sin texto superpuesto a la obra. En móvil el orden es título, agenda, ilustración y relato.
- **Agenda antes del relato**, con las fechas **19 SEP / 26 SEP** como dato principal, horario y ubicación separados, sin contadores ornamentales.
- **Relato editorial sin tres tarjetas repetidas**: se conservan los textos de campaña y las fotos de la selva y del tarumá acompañan sus respectivos textos.
- **Galería secundaria de tres ilustraciones**, conservando sus proporciones completas también en móvil. Las seis imágenes repartidas entre apertura, relato y galería integran un único lightbox del evento.
- **Convocatoria anterior a la galería**, con botón visible "Quiero participar" hacia `@turismoensenada_`, cuenta confirmada por el usuario, y créditos de organización al cierre.
- **Diseño adaptable desde 320px**, sin mínimos de columna que invadan los márgenes laterales.
- **Agenda como lista repetible**: cada noche es un item con la misma estructura (fecha, hora, lugar, fase lunar, actividades). Sumar una noche futura es copiar un item y cambiar el texto — sin rediseño, sin tocar CSS ni JS.
- **Paleta "crepúsculo" del evento contenida en el bloque**: las variables de color del evento se declaran en el scope del bloque, no en ninguno de los 4 `:root` de `styles.css`, para que el evento tenga su identidad propia sin alterar un solo color del resto del sitio.
- **Assets nuevos en `assets/luna-taruma/`**: las 4 ilustraciones en plastilina de Mariana Ardanaz y las fotos de la Selva Marginal y la flor de tarumá, convertidas a `.webp`, con variantes responsive y respetando el techo de 500KB por archivo vigente en el repo.
- **Galería con lightbox reusando el existente**: el `openLightbox(image, galleryImages)` de `script.js` ya es genérico; la galería del evento se engancha con el mismo patrón que `.place-photo-grid` y `.photo-story-card`, sin lógica nueva.
- **Enlace temporal en la navegación principal** hacia la sección del evento.
- **Procedimiento de baja documentado**: el bloque queda delimitado por comentarios marcadores en `index.html`, `styles.css` y `script.js`, y `docs/` gana una página que explica qué borrar y en qué orden para devolver el sitio a su estado anterior en un solo commit.
- **Sin video en este cambio**: los MP4 del kit pesan entre 3,5 y 14 MB y no entran bajo el presupuesto de assets. Queda para un cambio posterior si el video se sube a YouTube.

No hay cambios **BREAKING**: todo lo que se agrega es aditivo y removible.

## Capabilities

### New Capabilities
- `luna-taruma-event-block`: el bloque temporal del evento en el inicio — franja de anuncio, sección con relato, agenda extensible de noches, galería, convocatoria y créditos, con la paleta del evento contenida en el bloque. Es una capacidad de vida corta: se retira junto con el bloque cuando el evento pase.
- `temporary-content-blocks`: la convención durable para contenido con fecha de vencimiento en un sitio estático — delimitación por comentarios marcadores, procedimiento de baja documentado y baja en un solo commit. Sobrevive a este evento y aplica a los próximos (concurso fotográfico, concurso de microrelatos).

### Modified Capabilities
Ninguna. `image-asset-budget` y `responsive-hero-images` siguen vigentes tal como están; este cambio se limita a cumplirlas para los assets nuevos.

## Impact

- **`index.html`**: franja dentro del hero, sección nueva del evento, un enlace en `.main-nav`. Todo entre marcadores.
- **Corrección semántica de validación**: se retira el `role="list"` redundante de `.social-badges`, fuera del bloque temporal, para que el validador HTML vigente pase. No modifica su aspecto ni su semántica nativa de lista y se conserva al retirar el evento.
- **`styles.css`**: un bloque nuevo al final del archivo con los estilos del evento y sus variables de color en scope local. No se toca ningún `:root` ni ninguna regla existente (el archivo no tiene tests de regresión visual, así que se sigue el patrón de agregar al final).
- **`script.js`**: enganche de la galería al lightbox existente, siguiendo el patrón ya usado por las otras dos galerías estáticas.
- **`assets/luna-taruma/`** (nueva carpeta): ilustraciones y fotos en `.webp` con variantes responsive.
- **`docs/`**: página nueva con el procedimiento de baja y el inventario de qué se tomó del kit, más su línea en el índice.
- **Fuera del repo**: el kit original (1,2 GB en `E:\claude code\Lucas\EVENTO LUNA LUCAS`) no se versiona; solo entran los assets elegidos y convertidos.
- **Sin dependencias nuevas**: no se agrega build, ni `package.json`, ni librerías. La tipografía Archivo del kit no se embebe como fuente propia en este cambio; el bloque usa la tipografía que ya sirve el sitio.
