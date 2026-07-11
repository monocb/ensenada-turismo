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

## Pendiente de revisar

Ninguno conocido actualmente.
