# Baja del bloque temporal "Luna Tarumá"

**Contenido temporal publicado el 2026-09-18. Baja prevista después del 26/09/2026** (o cuando se confirme que no hay más noches).

El bloque del evento Luna Tarumá es contenido con fecha de vencimiento: entró para acompañar la campaña y se retira cuando el ciclo de observaciones termine. Este documento es el inventario completo y el procedimiento de retiro, para que la baja se pueda hacer en un solo commit sin leer el historial de git.

## Identificador

Todo lo que pertenece al bloque está encerrado entre comentarios marcadores con el identificador `LUNA-TARUMA`:

```
<!-- LUNA-TARUMA:INICIO ... -->   ...   <!-- LUNA-TARUMA:FIN -->     (HTML)
/* LUNA-TARUMA:INICIO ... */      ...   /* LUNA-TARUMA:FIN */        (CSS y JS)
```

El mapa completo se obtiene con:

```bash
grep -rn "LUNA-TARUMA" index.html styles.css script.js
```

Deben aparecer **5 pares** de marcadores (10 líneas): 3 pares en `index.html`, 1 en `styles.css` y 1 en `script.js`.

## Qué se retira

| Archivo | Qué hay entre los marcadores |
|---|---|
| `index.html` | Tres bloques: (1) el enlace `Luna Tarumá` en `.main-nav`; (2) la franja `.luna-strip`, último hijo de `.hero-content`; (3) la sección completa `<section class="luna-taruma" id="luna-taruma">`, entre el hero y `.brand-system`. **El juego (`.ltg`) vive dentro de esa sección**, entre `.lt-story` y `.lt-call`: se va con ella |
| `styles.css` | Un bloque al final del archivo: variables de la paleta del evento en scope local, estilos de la franja, de la sección y del juego (`.ltg*`). No se editó ninguna regla preexistente |
| `script.js` | Un bloque con dos partes: el enganche de `.luna-taruma [data-lt-image]` al lightbox existente (reúne las seis imágenes de toda la sección) y el IIFE del juego |
| `assets/luna-taruma/` | La carpeta completa: 6 imágenes base más sus variantes responsive (17 archivos) |

## Reorganización visual del 18/09/2026

La sección conserva las seis imágenes originales, repartidas entre la apertura (una ilustración protagonista), el relato (las fotos de la selva y la flor junto a sus textos) y una galería secundaria (las otras tres ilustraciones). Todas llevan `data-lt-image` y se recorren como una sola colección en el lightbox, aunque estén en distintos contenedores.

La agenda aparece antes del relato, con el día y el mes destacados y el horario separado. En móvil, el orden es título, agenda, ilustración y relato. Los textos del relato ya no se presentan como una serie de tarjetas. La convocatoria aparece antes de la galería secundaria, con el botón "Quiero participar" hacia Instagram. Las ilustraciones conservan su proporción completa, sin recortes. Esta reorganización queda dentro de los mismos marcadores de baja y no agrega archivos ni dependencias.

## El juego "Florecé el Tarumá" (18/09/2026)

Dentro de la sección, entre el relato y la convocatoria, hay un quiz de 10 preguntas: cada acierto abre una flor en el tarumá dibujado en SVG y hace subir la Luna, que queda llena con 10 de 10. Termina en un resultado de cuatro niveles con botón de compartir.

Viene de un archivo suelto y autosuficiente del kit (`08_Web_juego/florece_el_taruma.html`), adaptado para convivir con la home. Lo que hay que saber si se toca:

- **No agrega archivos, rutas ni assets.** La escena es SVG en línea y no hay página aparte: todo vive en los tres archivos de siempre.
- **Prefijo `ltg-`** en clases e IDs, incluidos los gradientes del SVG. El bloque del evento usa `lt-`; el juego usa `ltg-` para no pisarlo.
- **Hereda la paleta del bloque.** El juego original declaraba sus colores en `:root`; se borró, porque los ocho colores coincidían exactamente con los `--lt-*` que la sección ya declara. Solo se agregaron los tres tokens que faltaban (`--ltg-indigo-claro`, `--ltg-crema-tenue`, `--ltg-linea`), en scope local sobre `.ltg`.
  - Ojo con el tercero: el juego lo llamaba `--line`, nombre que **ya existe** en el `:root` del sitio (`styles.css:5`) y se usa en toda la página. Por eso se renombró.
- **El JS va dentro de un IIFE** que arranca con un guard sobre `.ltg` y retorna si el markup no está. `script.js` es alcance global de punta a punta y el juego define nombres muy genéricos (`$`, `Q`, `i`, `score`, `end`, `show`, `pick`): sin el IIFE, cualquiera de esos podría chocar con un parche futuro.
- **Lo que se descartó del original**: su `<header>` (logo en base64, que se comía la mayor parte de los 33 KB del archivo), su `<footer>` (duplicaba los créditos que la sección ya tiene), la tipografía Archivo (la home carga Inter en los pesos que el juego necesita) y sus estilos sobre `html`, `body`, `h1`, `h2`, `p`, `header` y `footer`, que se habrían derramado sobre el resto de la home.
- **Se corrigió un dato**: el original decía "18 hs" en las dos noches. Se publicó 19:00 hs, que es el horario del resto del sitio.
- **El juego no scrollea la página.** El original hacía `scrollIntoView` al empezar y en cada "Siguiente", algo que en una página propia se notaba poco pero embebido tiraba la vista hacia abajo y sacaba la escena de pantalla en cada clic. Se quitó: las tres tarjetas ocupan el mismo lugar, así que la siguiente aparece donde estaba la anterior. Por lo mismo, el foco al botón de avanzar se pasa con `preventScroll: true`.
- **Contraste de las respuestas**: con el verde y el terracota del bloque, el texto crema de la opción daba 3.85:1 y 3.51:1, debajo del 4.5:1 de WCAG AA. El juego usa dos tonos propios un punto más oscuros (`--ltg-acierto`, `--ltg-error`), que dan 4.55:1 y 4.56:1. La franja de siete colores del resultado sigue usando los originales del bloque.

## Procedimiento

1. Borrar los tres bloques marcados de `index.html`, **incluidos los comentarios marcadores**. El juego está adentro del tercero, no hay que buscarlo aparte.
2. Borrar el bloque marcado de `styles.css` (va al final del archivo).
3. Borrar el bloque marcado de `script.js`.
4. Borrar la carpeta `assets/luna-taruma/` completa: `rm -rf assets/luna-taruma`.
5. Borrar este documento y su línea en [`docs/pendientes/README.md`](README.md).
6. Verificar que no quedaron restos:
   ```bash
   grep -rn "LUNA-TARUMA\|luna-taruma\|luna-strip\|lt-night\|lt-gallery\|ltg" index.html styles.css script.js docs/
   ```
   No debe devolver nada.
7. Verificar que el sitio sigue sano, igual que lo hace el CI:
   ```bash
   npx --yes html-validate --config .htmlvalidate.json index.html en-fotos/index.html 404.html
   npx --yes stylelint styles.css
   npx --yes linkinator . --recurse --skip "ensenadaturismo\.com|fonts\.googleapis\.com"
   ```
8. Commit único, por ejemplo: `Dar de baja el bloque temporal de Luna Tarumá`.

La baja ya se probó en el momento de implementar el bloque, simulando el borrado de las tres regiones marcadas del HTML: no quedan enlaces de navegación apuntando a un ancla inexistente, no hay errores en consola y el JS del bloque no hace nada si su HTML no está (usa `querySelectorAll(...).forEach(...)`, que sobre una lista vacía no ejecuta nada). Es decir: **si se borra el HTML y se olvida el JS, el sitio no se rompe** — pero conviene borrar los tres de todos modos.

## Alternativa: `git revert`

Si no hubo commits encima que toquen los mismos archivos, alcanza con revertir el commit de implementación del bloque. Este procedimiento manual existe para el caso en que sí los haya.

## Datos del evento publicados

Por si hay que corregirlos antes de la baja:

- **Noche 1**: sábado 19/9, 19:00 hs, Parque Costero de Punta Lara, Luna en cuarto creciente.
- **Noche 2**: sábado 26/9, 19:00 hs, Paseo Costero de Punta Lara, Parador 5C (Alte. Brown y 52), Luna llena, con pintura en vivo, tango, folclore, danza, música en vivo, telescopios y sabores de la costa.
- Las dos, de entrada libre y gratuita.
- **Convocatoria a artistas** para pintar en vivo el 26/9: inscripción por mensaje directo a `@turismoensenada_`, cuenta confirmada por el usuario el 18/09/2026. El botón apunta a `https://www.instagram.com/turismoensenada_/`.
- **Organizan**: Turismo Ensenada · Facultad de Ciencias Astronómicas y Geofísicas de la UNLP · Nexa Contenidos. **Ilustraciones**: Mariana Ardanaz. **Aportes**: Ing. Forestal Esteban Perea.

La hora de la noche 2 no figuraba en el kit: se publicó 19:00 hs por decisión propia, asumiendo el mismo horario que la primera.

## Agregar una noche nueva sin rediseñar

La agenda es un `<ol class="lt-nights">` de items `<li class="lt-night">` con estructura idéntica. Para sumar una noche, copiar un `<li>` completo y actualizar su `<time>`: el atributo `datetime`, el día y el mes visibles. Actualizar también el horario, que se muestra separado, la ubicación, la fase lunar y las actividades. Las fechas reemplazan la antigua numeración automática (`01`, `02`, …); el color de la pastilla de fase lunar alterna solo. No hay que tocar `styles.css` ni `script.js`.

## Material del kit que quedó sin usar

El kit original está **fuera del repo**, en `E:\claude code\Lucas\EVENTO LUNA LUCAS` (1,2 GB, 282 archivos), con su propio `LEEME.md` y un `Luna_Taruma_Resumen_Final.md` que documentan todo. Lo que no se usó:

- **Videos**: 8 MP4 de 3,5 a 14 MB (lanzamiento con música original, reel narrativo de 8 escenas sin audio, variantes). No entraron porque superan el techo de 500KB por asset del repo ([`docs/pendientes/performance.md`](performance.md)). Si se suben a YouTube, embeberlos es un cambio chico.
- **Placas**: las 7 del carrusel de Instagram (1080×1350, JPG y PNG), las 7 historias (1080×1920) y las 3 de convocatoria. No se usaron porque la sección rearma el contenido en HTML, que escala mejor y es accesible.
- **Tipografía Archivo** (4 pesos, licencia OFL): el sitio sirve Inter y no se embebió una segunda familia por un bloque temporal.
- **Música**: 5 pistas MP3, incluida una original a 100 BPM compuesta para la campaña.
- **Foto del río con barco**: se dejó afuera porque el sitio ya tiene fotos del río de sobra.
- **Fuentes editables**: HTML de cada placa, scripts y el video animado en HTML, con un `COMO_EDITAR.md` para que otro diseñador continúe.

## Observaciones anotadas al implementar

- **La flor del tarumá**: el texto del kit (y las ilustraciones en plastilina) la describen como **amarilla**, pero la foto real del kit (`Foto_Flor_de_Taruma.png`, publicada acá como `foto-flor-de-taruma.webp`) muestra racimos **blanco cremosos**. Se publicó el texto del kit tal cual, porque es el que ya circula en las placas, y el `alt` de la foto describe lo que se ve sin afirmar un color. Vale confirmarlo con el Ing. Forestal Esteban Perea antes de reusar el texto en otra pieza.
- **Landscape en celular**: en viewports de ~740×360 el `<h1>ENSENADA</h1>` del hero queda detrás del header fijo. Se verificó que **es previo a este bloque** (apagando la franja, el `h1` no se mueve), así que no se tocó acá. Queda anotado como bug aparte.
- **Validación HTML corregida durante la revisión visual**: se retiró el `role="list"` redundante de `.social-badges`, un error previo al evento. La lista conserva su semántica nativa y aspecto. Esta corrección queda fuera de los marcadores y se conserva al retirar el evento. La validación de las tres páginas queda en verde.

Volver al [índice de pendientes](README.md).
