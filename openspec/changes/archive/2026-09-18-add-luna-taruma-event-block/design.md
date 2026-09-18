## Context

El sitio es HTML/CSS/JS estático plano, sin build ni dependencias, con `index.html` (377 líneas), `script.js` (496) y `styles.css` (6582, con 4 bloques `:root` separados y sin tests de regresión visual). La convención vigente es agregar al final del CSS y no reorganizar.

Hechos del código que condicionan el diseño:

- `.site-header` es `position: fixed; top: 0` con fondo transparente hasta que se scrollea (`.is-scrolled`). Flota **sobre** el hero.
- `.hero` es `min-height: 100svh` y `.hero-content` es un grid con `align-content: end; min-height: 92svh; padding-top: 110px` — el contenido se apoya abajo del hero y el `padding-top` existe justamente para esquivar el header fijo.
- Existe `.hero-experiences` (hoy `display: none`), una franja de 4 columnas dentro del hero con `z-index: 3`: hay precedente de poner una tira adentro del hero.
- El lightbox ya es genérico: `openLightbox(image, galleryImages, trigger)`. Las galerías estáticas se enganchan con 5 líneas, y el patrón accesible del repo es `<img tabindex="0" role="button" data-download="<original>.webp">` más un listener de `click` y otro de `keydown` (`script.js:397`).
- `ffmpeg` con `libwebp` es la herramienta documentada para convertir y generar variantes (`docs/tecnico/generar-variantes-responsive.md`).

El kit del evento (fuera del repo, 1,2 GB) aporta: textos finales de las 7 placas, paleta "crepúsculo", 4 ilustraciones en plastilina y 3 fotos (todas opacas, sin canal alfa: 1400px de ancho salvo la Luna naranja en 1800px y la Selva Marginal en 640px), placas JPG, videos MP4 de 3,5–14 MB y la tipografía Archivo.

## Goals / Non-Goals

**Goals:**

- Que quien llegue desde la campaña encuentre, sin scrollear, cuándo y dónde es la próxima noche y que es gratis.
- Contar el relato del evento con el material y los textos ya aprobados del kit, sin reescribir la campaña.
- Que sumar una noche futura sea editar HTML y nada más.
- Que el evento tenga su identidad visual propia sin alterar un solo color del resto del sitio.
- Que la baja sea un commit, ejecutable por otra persona con la documentación a la vista.

**Non-Goals:**

- No se embeben videos ni se sube MP4 al repo (pesan 3,5–14 MB contra un techo de 500 KB por asset).
- No se crea una página nueva ni se cambia la metadata Open Graph del inicio.
- No se embebe la tipografía Archivo del kit.
- No se toca la paleta, el CSS ni el HTML existente del resto del sitio más allá de un enlace en la navegación.
- No se implementa el ocultamiento automático por fecha.

## Decisions

### La franja va como último hijo de `.hero-content`

Corregido durante la implementación: el hero no es como lo suponía esta sección. La definición efectiva de `.hero-content` (línea 5518, producto de una pila de parches) es `display: flex; flex-direction: column; justify-content: flex-end; min-height: 100svh !important`, y en ≤430px se la desplaza hacia arriba con `bottom: max(126px, env(safe-area-inset-bottom) + 112px) !important`. De ahí:

- Una tira insertada **antes del hero** queda tapada por `.site-header`, que es `position: fixed` y transparente.
- Una tira insertada **después de `.hero-content`** cae debajo del fold, porque `.hero-content` sola ya mide `100svh`. Bajarle esa altura con `:has()` implicaría pelear contra `!important`.

Así que la franja va **adentro de `.hero-content`, como último hijo**. Hereda el `justify-content: flex-end`, queda apoyada abajo del hero junto al tagline, arriba del fold, y en mobile acompaña el desplazamiento que el bloque ya tiene. Sin `:has()` y sin tocar una sola regla existente.

**La franja no usa elementos `<p>`**: hay cuatro reglas `.hero-content p:not(.eyebrow)` con `!important` (font-size hasta 29px, font-weight, color, text-shadow, max-width) que le impondrían su tipografía a cualquier párrafo del bloque. Con `<span>`, `<div>` y `<a>` ninguna aplica — verificado que no existe ningún selector `.hero-content >`, `.hero-content a`, `.hero-content span` ni `.hero-content div` en todo el archivo. El `text-shadow` que `.hero-content` hereda a sus hijos se resetea dentro del bloque.

- *Alternativa considerada*: barra sticky debajo del header. Rechazada: obliga a meter mano en el z-index y el offset del header, y a manejar el estado `.is-open` del menú mobile, que le cambia el fondo.
- *Alternativa considerada*: franja después del hero. Rechazada por el `min-height: 100svh !important` de `.hero-content`: quedaría abajo del fold, que es justo lo que la franja tiene que evitar.

### La sección va inmediatamente después del hero

El bloque se inserta entre `.hero` y `.brand-system`, como primera sección de contenido, porque la campaña ya está prometiendo esta información y la primera noche es inminente. El costo de retirarla es idéntico esté donde esté.

### La paleta se declara en el scope del bloque

Las variables del evento se declaran sobre el selector raíz del bloque (`.luna-taruma, .luna-strip { --lt-...: ... }`), nunca en `:root`. Así el evento tiene su identidad y `git diff` sobre los 4 `:root` queda vacío, que es la garantía de que el resto del sitio no cambió.

Medí el contraste de la paleta antes de asignar roles (WCAG, texto normal 4.5:1):

| Fondo | Crema `#F5F3EC` | Dorado `#F2C14E` |
|---|---|---|
| Río de noche `#101733` | **15.86:1** | **10.49:1** |
| Índigo `#1C2452` | **13.29:1** | **8.79:1** |
| Verde bosque `#1F5C3F` | 7.11:1 | 4.70:1 |
| Violeta `#5B54C4` | 5.39:1 | 3.57:1 |
| Verde río `#128A74` | 3.85:1 ✗ | 2.55:1 ✗ |
| Terracota `#D65A3C` | 3.51:1 ✗ | 2.32:1 ✗ |

De ahí sale el reparto de roles:

- **Fondo del bloque**: río de noche `#101733`. **Tarjetas y agenda**: índigo `#1C2452`. **Texto**: crema `#F5F3EC` (15.86:1 y 13.29:1, de sobra).
- **Acento**: dorado `#F2C14E` para títulos chicos, datos y bordes. Sobre fondo oscuro rinde 10.49:1.
- **Botón/CTA**: fondo dorado con texto río de noche (10.49:1). **Nunca texto crema sobre dorado: da 1.51:1.**
- **Verde río, verde bosque, violeta y terracota**: solo en elementos decorativos y de texto grande (chips de fase lunar, la barra de 7 segmentos del kit, bordes por noche). Nunca abajo de texto normal.

### La agenda es HTML plano, sin JS ni datos aparte

Cada noche es un `<li class="lt-night">` dentro de un `<ol>`, con la misma estructura interna (fecha, hora, lugar, fase lunar, actividades). Sumar una noche es copiar un `<li>`. Es la misma decisión que ya tomó el repo con `data-photo-*`: el HTML es la única fuente de verdad, sin `manifest.json` ni archivo de datos intermedio.

- *Alternativa considerada*: array de noches en `script.js` renderizado en el cliente. Rechazada: mete el contenido en JS, lo saca del HTML servido (peor para buscadores y para quien edite) y agrega un mecanismo que el sitio no tiene en ninguna otra parte.

### Composición editorial y jerarquía del evento

La revisión visual solicitada el 18/09 mantiene este cambio abierto y amplía sus artefactos antes de implementar. La apertura usa CSS Grid: título y texto a la izquierda, ilustración de Luna y tarumá a la derecha y agenda de ancho completo debajo. En una columna, el orden es título, agenda, ilustración y relato; coincide con el DOM, sin duplicar contenido. La obra no lleva texto superpuesto.

La agenda conserva una lista extensible: cada encabezado contiene una fecha semántica `<time>`, con día grande y mes, y el horario se muestra separado. Se eliminan los contadores 01/02. Las dos ubicaciones y actividades conservan sus textos publicados.

El relato se presenta sin fondos de tarjeta repetidos. Las fotos de la selva y la flor acompañan sus textos. La convocatoria queda antes de la galería secundaria, con un enlace de aspecto de botón "Quiero participar" y el canal Instagram explícito. La galería secundaria muestra las otras tres ilustraciones, con altura automática y sin recortar la obra ni el lettering. Se mantiene el crédito de Mariana Ardanaz junto a la obra protagonista y al cierre.

Los grids usan columnas que pueden reducirse (`minmax(0, 1fr)` o mínimos limitados al 100%) y sus hijos tienen `min-width: 0`. El cambio se limita a los estilos del evento dentro de los marcadores existentes. Las imágenes conservan `srcset`, con `sizes` ajustado al nuevo ancho real. En celular el mes queda debajo del día para que las dos fases lunares y sus horarios mantengan la misma alineación, incluso a 320px.

La validación final detectó un `role="list"` redundante preexistente en `.social-badges`. Se retira únicamente ese atributo fuera del bloque temporal; `<ul>` conserva su semántica nativa y presentación. Esta corrección de validación no se retira con el evento.

Alternativas descartadas: ilustración como fondo con texto encima (pierde textura y legibilidad); duplicar la agenda para móvil (duplica contenido accesible); carrusel (oculta obras y añade controles innecesarios).

### Las seis imágenes reusan el lightbox existente

Las imágenes se reparten una vez cada una entre apertura (1), relato (2) y galería secundaria (3). Mantienen `tabindex="0" role="button"`, `data-download` al original y un atributo `data-lt-image` para identificarlas sin depender de su posición. El listener se acota con `closest(".luna-taruma")` y `querySelectorAll("[data-lt-image]")`, reutilizando `openLightbox` y los controles existentes. Todas abren por clic, Enter y Espacio, tienen foco visible y se recorren como una colección de seis, sin fotos de otras secciones.

- *Alternativa considerada*: un carrusel como el de Cultura. Rechazado: más CSS y JS para retirar después, sin ganancia para 6 imágenes.

### Sin tipografía Archivo

El sitio sirve Inter desde Google Fonts. Embeber los 4 pesos de Archivo suma 4 archivos y requests por un bloque que vive dos semanas; las placas del kit ya llevan la tipografía quemada en la imagen. El bloque usa Inter con los pesos más pesados para los títulos.

### Assets: 6 imágenes, `.webp`, variantes 480w/900w

Entran las 4 ilustraciones de Mariana Ardanaz y 2 fotos (Selva Marginal y flor de tarumá) a `assets/luna-taruma/`, con `ffmpeg`/`libwebp` calidad 78 según el comando ya documentado. La foto del río queda afuera: el sitio ya tiene fotos del río de sobra.

Se reutilizan las variantes 480w/900w y el original de 1400px en `srcset`, con `sizes` específico para la ilustración protagonista y las imágenes secundarias. La Selva Marginal mide 640px de ancho nativo y conserva su variante 480w y original. No se generan assets ni dependencias adicionales para la revisión visual.

### Marcadores y baja

Identificador único del bloque: `luna-taruma`. En cada archivo, el contenido queda encerrado entre marcadores con el mismo id:

```
<!-- LUNA-TARUMA:INICIO — bloque temporal del evento, publicado 2026-09-18, baja prevista tras el 26/09/2026. Procedimiento: docs/pendientes/baja-bloque-luna-taruma.md -->
...
<!-- LUNA-TARUMA:FIN -->
```

y su equivalente `/* LUNA-TARUMA:INICIO ... */` en `styles.css` y `script.js`. Así `grep -rn "LUNA-TARUMA" index.html styles.css script.js` devuelve el mapa completo de lo que hay que borrar. El documento de baja lista además los assets a eliminar y el enlace de navegación a quitar.

El JS del bloque consulta sus elementos con el mismo estilo tolerante del resto de `script.js` (`querySelectorAll` + `forEach`, que no falla si no hay nodos), así que si se borra el HTML antes del JS no se rompe nada en consola.

## Risks / Trade-offs

- **La primera noche es mañana (19/9) y la ventana es corta** → El orden de tareas pone primero franja + agenda (el dato accionable) y después relato, galería y convocatoria, para que lo urgente pueda publicarse aunque el resto quede para un segundo commit.
- **El kit tenía el canal de inscripción por confirmar** → El usuario confirmó `@turismoensenada_` el 18/09/2026. El texto y el botón de la convocatoria apuntan a esa misma cuenta.
- **Hay noches sin confirmar** → La agenda se publica con las dos confirmadas y su estructura admite items nuevos sin rediseño. No se anuncian fechas sin confirmar.
- **CSS de 6,5k líneas sin tests visuales** → Todo el CSS del bloque va al final del archivo, con prefijo `lt-`/`luna-` en cada clase y variables en scope local; no se edita ninguna regla existente.
- **La franja adentro del hero compite con el `h1`** → El hero en mobile ya tuvo un bug de `h1` cortado (corregido en `styles.css:7877`). Hay que reverificar los 6 anchos mobile de 320 a 430px con la franja puesta, no solo mirar desktop.
- **Riesgo de que el bloque temporal se quede para siempre** → Es el riesgo real de este tipo de contenido. Se mitiga con el documento de baja y su línea en `docs/pendientes/`, que es donde el repo ya lleva la cuenta de lo que queda pendiente.
- **La paleta del evento no es la del sitio** → Es deliberado y acotado al bloque: el evento tiene identidad propia en la campaña. El costo es una discontinuidad visual en el inicio, que se acepta porque es temporal y porque el bloque se lee como una pieza de campaña.

## Migration Plan

1. Convertir assets y verificarlos (peso, anchos, calidad) antes de tocar HTML.
2. Publicar franja + agenda (lo urgente), verificar mobile 320–430px y validación HTML.
3. Completar relato, galería, convocatoria y créditos.
4. Documentar la baja y enlazarla desde el índice de `docs/`.
5. **Rollback**: `git revert` del commit del bloque, o el procedimiento manual documentado si ya hubo commits encima.

## Open Questions

- ¿Se confirman noches adicionales? Si aparecen, se suman como items nuevos de la agenda.
- ¿Se sube el video de lanzamiento a YouTube? Sería un cambio aparte, chico, sobre el bloque ya publicado.
- ¿Conviene cambiar la imagen Open Graph del inicio por una placa del evento mientras dure la campaña? Hoy fuera de alcance: mejoraría cómo se ve el sitio compartido en WhatsApp, pero toca `social-sharing-metadata`, que es una capacidad existente.
- ¿Queda registro del evento después del 26/9 (fotos de las noches) o se borra sin dejar rastro? Se decide al darlo de baja.
