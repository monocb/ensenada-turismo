# Accesibilidad

## Resuelto (2026-07-10)

- ~~`aria-expanded` en el menú mobile~~ — ya funciona (verificado, `docs/pendientes/bug-menu-hamburguesa.md`).
- ~~Orden correcto de headings~~ — verificado correcto en ambas páginas (h1→h2→h2→h2, sin saltos).
- ~~`alt` descriptivo real en todas las imágenes~~ — resuelto (galería dinámica en `openspec/changes/archive/2026-07-10-improve-gallery-alt-text/`; estáticos ya eran descriptivos).
- ~~Foco visible en elementos interactivos~~ — cubierto por una regla genérica en `styles.css` (`a:focus-visible, button:focus-visible, [tabindex]:focus-visible`).
- ~~Que los carruseles/lightbox sean navegables por teclado~~ — el carrete de la Fragata no lo era, corregido en `openspec/changes/archive/2026-07-10-make-fragata-reel-keyboard-accessible/`.

## Resuelto (2026-07-11)

- ~~Contraste de texto sobre imágenes~~ — medido con Puppeteer (sampleo real de píxeles, no estimación) en los 4 lugares donde hay texto sobre imagen, en desktop y mobile: hero h1 (14-20:1), fragata hero h2 (~19:1) y culture-slide figcaptions (12-20:1) ya cumplían sobradamente. El tagline del hero tenía texto blanco sobre una franja dorada de resaltador con ~1.5:1 (por debajo del mínimo WCAG 3:1) — corregido agregando un `text-shadow` tipo contorno que define el borde de cada letra independientemente del color de fondo, sin cambiar la paleta. Ver `openspec/changes/archive/2026-07-11-fix-hero-tagline-contrast/`.
- ~~`aria-label` en elementos sin rol~~ (`aria-label-misuse`): 5 `<div aria-label="...">` sin `role` (4 en `index.html` + 3 `.photos-reel-controls` en `en-fotos/index.html`, no solo los 4 originalmente listados) — corregido agregando `role="group"` a los 5.
- ~~Botones alcanzables por teclado dentro de un contenedor `aria-hidden`~~ (`hidden-focusable`): verificado con Puppeteer (220 Tabs reales) que `.image-lightbox` era un falso positivo (`display: none` ya lo excluye del orden de tabulación), pero se encontró un caso real no documentado antes: `.place-modal` (modal "Ver historia") usa `opacity: 0` en vez de `display: none`, así que su botón "Cerrar" sí quedaba alcanzable por Tab estando invisible. Corregido agregando el atributo `inert` (alternado junto con `aria-hidden` en `script.js`) a ambos contenedores.
- ~~Landmark sin nombre accesible único~~ (`unique-landmark`): la nota original decía "impacto bajo, único `<nav>`", pero `index.html` en realidad tiene 4 `<nav>` (los otros 3 ya tenían `aria-label`) — corregido agregando `aria-label="Navegación principal"` a `.main-nav`.

El preset `html-validate:a11y` (que detecta estas 3 reglas) ahora está activo en `.htmlvalidate.json`/CI, para que una regresión futura se detecte automáticamente. Ver `openspec/changes/archive/2026-07-11-fix-a11y-validate-findings/`.

## Resuelto (2026-10-08)

Hallazgos de una revisión contra las Web Interface Guidelines. El primero no lo detecta ningún validador: hubo que ejecutar la página y tabular.

- ~~**El orden de tabulación no coincidía con el orden visual**~~ — `main` es un contenedor flex y `.fragata-section` / `.redes-section` llevaban `order: 20` y `order: 21`, así que el DOM decía `marca → fragata → redes → recorrido → historia` mientras la pantalla mostraba `marca → recorrido → historia → fragata → redes`. Quien navegaba con teclado saltaba de Marca al pie de la página y después volvía arriba (WCAG 2.4.3 y 1.3.2). Corregido reordenando las secciones en el HTML y retirando las dos reglas `order`; se verificó con una comparación de píxeles que el resultado visual es idéntico (0 píxeles de diferencia en escritorio y móvil).
- ~~**Fotos activables que no eran controles**~~ — ocho `<img tabindex="0" role="button">` en la galería de la Fragata. Un lector de pantalla anunciaba la descripción de la foto donde debía anunciar la acción. Convertidas en `<button>` reales con nombre accesible "Ampliar foto N de 8: …", siguiendo el patrón que ya usaba el carrusel de fotos. Desapareció también el `keydown` manual de Enter y Espacio, que el botón resuelve solo.
- ~~**Sin enlace de salto al contenido**~~ — agregado en las tres páginas como primer elemento enfocable, oculto hasta recibir foco.
- ~~**El visor no anunciaba el cambio de foto**~~ — al navegar con las flechas cambiaba la imagen sin avisar. Agregada una región `aria-live="polite"` que dice "Foto N de M" y la descripción.
- ~~**Foco indistinguible del hover**~~ — dos reglas hacían `outline: none` dentro de `:focus-visible` y dejaban como única señal el mismo tratamiento del hover. Ahora tienen indicador propio.
- ~~**Overlay de cierre que era un `div` con handler**~~ — el fondo del modal de lugares pasó a ser un `<button>` con nombre accesible.
- ~~**Cromo nativo en claro sobre un sitio oscuro**~~ — declarado `color-scheme: dark`.
- ~~**Toque sin `touch-action` ni resaltado propio**~~ — estaban sólo en el botón del menú; ahora alcanzan a todos los controles.
- ~~**Scroll encadenado detrás de los diálogos**~~ — `overscroll-behavior: contain` en el visor y el modal.
- ~~**Carrusel que se cicla solo sin poder frenarlo**~~ — la galería de la Fragata cambia cada 48 segundos. Agregado un control de pausa, que sólo se inyecta cuando el ciclado está activo: con movimiento reducido no aparece, porque no habría nada que pausar.

Ver `openspec/changes/archive/2026-10-08-fix-web-guidelines-findings/`.

## Migración de `en-fotos/` y `404.html` (2026-10-08)

Al pasar las dos páginas restantes al sistema nuevo aparecieron cuatro defectos del encabezado rediseñado, medidos en Chromium:

- El menú móvil no abría: el JS marca `is-open` y la hoja esperaba `is-abierto`, así que quedaban 0 de 6 enlaces visibles mientras el `body` igual se congelaba con `overflow: hidden`. Enganchado ahora a `.enc.is-open`, que cubre las dos navegaciones del encabezado partido.
- El logo del encabezado no existía: `<span>` con máscara dentro de un `<a>` en bloque, sin `display: block`, colapsado a 0×0. El enlace al inicio tampoco era clickeable.
- El encabezado nunca se condensaba al scrollear (`is-scrolled` contra `is-compacto`).
- El lettering quedaba al ras del borde izquierdo abajo de 860px, 97px fuera del centro a 390px de ancho.

Además, `scrollTo`/`scrollBy` con `behavior: "smooth"` no respetaban `prefers-reduced-motion`: ahora consultan la constante `reduceMotion` de `script.js`.

Las referencias de las notas de arriba a reglas de `styles.css` valen para la fecha en que se escribieron; esas reglas viven hoy en `assets/css/base.css`.

## Pendiente de revisar

Ninguno conocido actualmente.
