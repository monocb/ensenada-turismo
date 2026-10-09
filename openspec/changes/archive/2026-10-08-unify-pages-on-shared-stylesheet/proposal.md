## Why

El rediseño del Manual de Identidad v3.0 se aplicó sólo a la portada, sobre una hoja nueva (`assets/css/home.css`). `en-fotos/index.html` y `404.html` quedaron en la hoja histórica `styles.css`, con el encabezado anterior: dos de las tres páginas del sitio tenían otro header, otra tipografía de marca y otra paleta. No es una deuda cosmética, es el sitio partido en dos sistemas.

Al medir el encabezado nuevo en Chromium antes de copiarlo a las otras dos páginas aparecieron **cuatro defectos que estaban en producción de la portada rediseñada**, ninguno visible leyendo el código:

- El logo del encabezado no existía: un `<span>` con máscara dentro de un `<a>` en bloque, sin `display: block`, renderiza `inline` y colapsa a **0×0**. El enlace al inicio tampoco era clickeable.
- El menú móvil no abría: el JS marca la clase `is-open` y la hoja esperaba `is-abierto`. Quedaban **0 de 6 enlaces visibles** mientras el `body` igual se congelaba con `overflow: hidden`: en teléfono el sitio quedaba sin navegación y sin scroll.
- El encabezado nunca se condensaba al scrollear, por el mismo tipo de desfasaje (`is-scrolled` contra `is-compacto`).
- El lettering quedaba al ras del borde izquierdo abajo de 860px: 97px fuera del centro a 390px de ancho, en un encabezado cuyo principio es tener el lettering centrado.

Los dos primeros son fallas duras. Los cuatro tienen la misma causa de fondo: **nada obliga a que los nombres de clase del CSS coincidan con los que escribe `script.js`, y un `<span>` con máscara falla en silencio**, sin error de consola ni hallazgo de linter.

## What Changes

**Arquitectura de hojas**

- El CSS pasa a `assets/css/`, repartido en una capa compartida (`base.css`: tokens, base tipográfica, encabezado, pie, visor de fotos, ficha de territorio, reveal) y una hoja por página (`home.css`, `en-fotos.css`, `error.css`). Cada página carga la capa compartida y después la suya.
- Los tokens del manual se declaran **una sola vez**, en el `:root` de `base.css`.
- `styles.css` deja de ser cargada por ninguna página. **No se borra en este cambio**: queda en el repo mientras el rediseño está en revisión, para que volver atrás sea barato.

**Encabezado y pie en las tres páginas**

- `en-fotos/index.html` y `404.html` adoptan el encabezado partido con el lettering centrado y el pie del sistema nuevo.
- Se corrigen los cuatro defectos del encabezado descritos arriba.
- El menú móvil se engancha al estado del header y no al de una de las dos navegaciones, de modo que expone los seis enlaces y no la mitad.
- Los enlaces que cierran el menú al navegar pasan a ser todos los del encabezado, no sólo los de la primera navegación.

**Página de fotos**

- La portada de la página abre con el título y después la foto.
- El título de cada uno de los tres carretes se centra, y el carrete pasa a ir de borde a borde: la composición anterior dejaba una franja muerta del lado izquierdo en pantallas anchas.
- El carrete deja de mostrar la barra de scroll horizontal y pasa a avanzar solo, como una calesita, frenando cuando el mouse se apoya encima, cuando el dedo lo toca, cuando algo adentro tiene el foco o cuando hay una foto abierta en el visor.
- La vuelta se da moviendo la primera tarjeta al final, sin duplicar fotos: el visor y el orden de tabulación siguen viendo una sola copia de cada una.
- El acento de color de cada carrete pasa a ser el del territorio que retrata, tomado de la paleta del manual, en lugar de los tokens `--brand-cyan` / `--brand-lime`, que el manual v3.0 ya no define.

**Movimiento reducido**

- `scrollTo` y `scrollBy` con `behavior: "smooth"` no respetan `prefers-reduced-motion` por sí solos. Pasan a consultar la preferencia.

**CI y documentación**

- El paso de `stylelint` lintea sólo `styles.css`, que ya no carga nadie, e ignora las cuatro hojas vivas. Pasa a cubrir las hojas que el sitio realmente usa.
- `CLAUDE.md`, el mapa de archivos y las convenciones de CSS describen la hoja histórica como si fuera el CSS del sitio. Se actualizan.

## Capabilities

### New Capabilities

- `shared-stylesheet-architecture`: el CSS del sitio es una capa compartida más una hoja por página, con los tokens declarados una sola vez y sin pelearse por especificidad; los nombres de clase de estado los fija el JS y el CSS se adapta a ellos.
- `consistent-site-chrome`: las tres páginas comparten el mismo encabezado y el mismo pie, y el encabezado funciona en todo el rango de anchos — el lettering se ve y está centrado, el menú de teléfono expone todos los enlaces, y el encabezado se condensa al scrollear.
- `photo-reel-carousel`: los carretes de la página de fotos avanzan solos y se detienen cuando la persona muestra intención de mirar o de abrir una foto, sin duplicar fotos ni depender de una barra de scroll visible.

### Modified Capabilities

- `notfound-page-typography`: la página de error cargaba la tipografía Inter; el sitio compone en la tipografía institucional del manual desde la v3.0. El requisito pasa a nombrar la tipografía de marca en vez de una familia concreta ya reemplazada.
- `temporary-content-blocks`: los marcadores de contenido temporal nombraban `index.html`, `styles.css` y `script.js`. Con el CSS repartido por página, el inventario y la búsqueda de residuos pasan a cubrir las tres páginas y `assets/css/`.
- `photos-line-visual-identity`: exigía los tokens `--brand-cyan` / `--brand-lime` y un acento de barra superior sobre `.photos-reel-section`. Esos tokens no existen en el manual v3.0 y el acento pasa a la tarjeta. El requisito se reformula sobre la paleta vigente y el sistema de territorios.
- `site-footer-coverage`: nombraba la clase `.site-footer`. El componente de pie del sistema nuevo es `.pie`; el requisito de fondo (mismo pie en las tres páginas, sin redes ni nav) no cambia.
- `ci-quality-gate`: la validación de CSS corre sobre un archivo que ya no carga ninguna página. Pasa a exigir que cubra las hojas que el sitio sirve.
- `technical-docs-accuracy`: la documentación describe `styles.css` como el CSS del sitio. Suma el requisito de que nombre correctamente qué hojas están vivas y cuál quedó fuera de uso.

## Impact

**Código afectado**

- `assets/css/base.css`, `home.css`, `en-fotos.css`, `error.css` — nuevos; `home.css` sale de partir la hoja de la portada.
- `index.html` — carga las dos hojas.
- `en-fotos/index.html` — encabezado, pie, hojas, enlace de salto, `theme-color`.
- `404.html` — reescrita sobre el sistema nuevo.
- `script.js` — cierre del menú desde todos los enlaces del encabezado, `prefers-reduced-motion` en los dos scrolls programáticos, y el avance automático de los carretes con sus pausas.
- `.github/workflows/ci.yml` — alcance del paso de `stylelint`.
- `CLAUDE.md`, `DESIGN.md`, `docs/tecnico/convenciones-css.md`, `docs/tecnico/stack-y-mapa-de-archivos.md`, `docs/tecnico/README.md`, `docs/marca/colores-y-tipografia.md`, `docs/pendientes/accesibilidad.md`.

**Riesgo principal**

Partir una hoja de 1332 líneas en dos puede perder reglas sin que nada avise. El criterio de aceptación es que el conjunto de selectores antes y después sea el mismo salvo los que se reemplazan a propósito, verificado comparando ambos conjuntos y no a ojo.

**Fuera de alcance, a propósito**

- Borrar `styles.css`: se decide después de la revisión del rediseño.
- Un control explícito de pausa para los carretes, al estilo del que ya tiene el carrusel de la Fragata. El avance automático se detiene con el mouse, con el dedo, con el foco y con movimiento reducido, pero WCAG 2.2.2 pide un mecanismo explícito y deliberado: queda señalado como pendiente, no resuelto.
- Rediseñar el contenido editorial de la página de fotos. Se agrega una sola línea de bajada en la portada de esa página, tomada de su propia meta description, porque el bloque tenía únicamente título y botón.
