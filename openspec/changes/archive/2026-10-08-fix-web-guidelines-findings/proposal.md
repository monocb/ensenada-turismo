## Why

Una revisión del sitio contra las Web Interface Guidelines encontró ocho defectos reales. Dos son de accesibilidad y afectan a cualquiera que navegue sin mouse; el resto son de pulido que el sitio ya debería tener.

El más serio no estaba documentado en ningún lado y se encontró midiendo, no leyendo: **el orden de tabulación no coincide con el orden visual de la página**. `main` es un contenedor flex y dos secciones llevan `order`, así que quien navega con teclado salta de Marca al pie de la página y después vuelve arriba. Es WCAG 2.4.3 y 1.3.2, y [`docs/pendientes/accesibilidad.md`](../../../docs/pendientes/accesibilidad.md) dice hoy "Pendiente de revisar: ninguno conocido".

El segundo es que ocho fotos son `<img tabindex="0" role="button">` en vez de botones reales. Un lector de pantalla anuncia la descripción de la foto donde debería anunciar la acción: dice *"Fragata ARA Libertad navegando frente a Ensenada, botón"* en lugar de *"Ampliar foto"*. El patrón correcto ya existe en el repo, en el carrusel de fotos.

## What Changes

**Accesibilidad**

- Se corrige el orden de foco: las secciones se reordenan en el HTML y se retiran las dos reglas `order` de CSS, de modo que el orden del documento sea el orden visual.
- Las ocho imágenes con `role="button"` pasan a ser botones reales con nombre accesible de acción, siguiendo el patrón que ya usa el carrusel.
- Se agrega un enlace de salto al contenido principal en las tres páginas.
- El overlay del modal de lugares deja de ser un `div` con handler de click.
- El lightbox anuncia la foto al navegar con las flechas.
- Las dos reglas que hacen `outline: none` dentro de `:focus-visible` pasan a tener un indicador de foco propio, distinto del de hover.

**Tema y toque**

- Se declara `color-scheme` para que las barras de scroll y la UI nativa acompañen al tema oscuro.
- `touch-action: manipulation` y el color de resaltado táctil se extienden a todos los elementos interactivos, no sólo al botón del menú.
- Los diálogos contienen el scroll para que no se encadene con el de la página detrás.
- Se reserva el tamaño de la imagen del lightbox para que no salte al abrirse.

**Red y movimiento**

- El carrusel de la Fragata, que se cicla solo cada 48 segundos, gana un control para pausarlo.
- Se agrega `preconnect` a los dominios de YouTube antes de que el iframe se pida.

No se toca la paleta, la tipografía ni la composición: eso es el rediseño que viene después.

## Capabilities

### New Capabilities

- `focus-order-matches-visual-order`: el orden de tabulación de cada página sigue el orden en que se lee, y ninguna técnica de maquetado los separa.
- `interactive-controls-semantics`: todo lo que se puede activar es un control real con nombre accesible que describe la acción, no el contenido.
- `native-ui-theming`: la interfaz nativa del navegador (barras de scroll, resaltado táctil, contención de scroll en diálogos) acompaña al tema del sitio.

### Modified Capabilities

- `aria-semantics-and-focus`: suma el enlace de salto al contenido y el requisito de que el foco visible no se confunda con el hover.
- `keyboard-accessible-galleries`: las fotos de la Fragata ya eran operables por teclado, pero como imágenes con rol; pasa a exigir control real. Suma el control de pausa del ciclado automático.

## Impact

**Código afectado**

- `index.html` — reordenar secciones, ocho imágenes a botones, overlay del modal, región `aria-live` del lightbox, enlace de salto.
- `en-fotos/index.html` y `404.html` — enlace de salto.
- `styles.css` — `color-scheme`, foco visible en dos reglas, `touch-action`, resaltado táctil, contención de scroll, retirar las dos reglas `order`, estilos del enlace de salto y del botón de pausa.
- `script.js` — anuncio del lightbox, control de pausa del carrusel, `preconnect` de YouTube.
- `docs/pendientes/accesibilidad.md` — hoy dice que no hay nada pendiente; pasa a registrar estos hallazgos y su resolución.

**Riesgo principal**

Reordenar secciones en el HTML mueve bloques grandes de markup. El resultado visual tiene que ser idéntico: ése es el criterio de aceptación, y se verifica comparando capturas antes y después, no a ojo.

**Fuera de alcance, a propósito**

La regla de las guidelines que pide *Title Case* en encabezados y botones es una convención del inglés. El sitio es en español, donde corresponde *sentence case*: los encabezados actuales están bien y no se tocan. Tampoco aplican las categorías de formularios, i18n ni hidratación: el sitio no tiene formularios, ni inputs, ni framework, ni formateo de fechas o números en JS.
