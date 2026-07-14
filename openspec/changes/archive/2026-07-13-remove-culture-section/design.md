## Context

`index.html` es HTML/CSS/JS estático plano, sin build. La sección `#cultura` (carrusel de 6 fotos) y su tarjeta gemela en el grid de marca (`brand-line-cultura`) comparten imágenes (`assets/cultura-publico.jpg`) y una parte del CSS/JS con otras secciones que SÍ se mantienen (`.carousel-control` lo usa también el carrete de Fragata; `.culture-slide` aparece en selectores compartidos de reveal-on-scroll y lazy-loading en `script.js`). `styles.css` tiene ~7.9k líneas con 4 bloques `:root` y reglas de la sección `.culture*` repetidas en al menos 5 puntos distintos del archivo (breakpoints responsive agregados en distintas fechas), así que el trabajo de CSS es de eliminación quirúrgica, no de reescritura.

## Goals / Non-Goals

**Goals:**
- Sacar la sección `#cultura` del home sin dejar CSS/JS/imágenes huérfanas.
- Reemplazar la tarjeta de marca "CULTURA" por una tarjeta "FRAGATA" que enlace a la sección Fragata ya existente (`#fragata`), reutilizando un asset ya presente en el repo (`assets/fragata/fragata-01-portada.webp`).
- Dejar los 3 archivos de nav (`index.html`, `en-fotos/index.html`, `404.html`) sin links rotos a `#cultura`.
- Actualizar las specs vigentes (`mobile-hero-layout`, `responsive-hero-images`) para que dejen de describir un carrusel que ya no existe.

**Non-Goals:**
- No se reorganiza `styles.css` más allá de borrar las reglas huérfanas puntuales — no se consolidan los 4 bloques `:root` ni se tocan reglas no relacionadas.
- No se toca la sección Fragata existente (`#fragata`) más allá de ser el nuevo destino del link de la tarjeta de marca.
- No se define contenido nuevo de "Cultura" en otro lugar del sitio — es una remoción, no un reemplazo funcional.

## Decisions

- **Borrar en vez de comentar u ocultar con `display:none`.** El pedido explícito del cliente es sacar la sección; dejar HTML/CSS muerto comentado violaría la convención del repo de no dejar código muerto y complicaría futuras búsquedas en `styles.css`.
- **Tarjeta de marca reemplazo, no eliminación del grid.** El grid de 4 tarjetas (`brand-line-grid`) está diseñado para 4 columnas; sacar una tarjeta sin reemplazo dejaría un grid asimétrico y perdería la oportunidad de visibilizar la sección Fragata desde el bloque de marca. Se reusa la clase modificadora `.brand-line-fragata` con el mismo patrón que `.brand-line-cultura`/`.brand-line-historia`/`.brand-line-vivo` (`--line-color`/`--line-accent`), asignando `--brand-blue` (identidad naval/río, no usado aún como `--line-color` en ninguna tarjeta) y `--brand-yellow` de acento.
- **Reusar `assets/fragata/fragata-01-portada.webp` en vez de generar una imagen nueva.** Ya tiene las variantes responsive (480w/900w/1400w) que pide el patrón `srcset` del resto de las tarjetas de `brand-line-grid` — no hace falta procesar ni convertir ninguna imagen nueva.
- **No repuntar los links de nav "Cultura" a `#fragata`.** El nav principal y el footer de las 3 páginas ya tienen un link "Fragata" separado (`#fragata`); agregar un segundo link al mismo destino sería redundante. Se elimina directamente el ítem "Cultura" de esos menús.
- **Preservar `.carousel-control` y variantes responsive genéricas.** Es una clase compartida con el carrete de Fragata (`data-reel-prev`/`data-reel-next`); solo se eliminan las reglas específicas del selector `.culture .carousel-control` (override puntual), no la clase base.
- **JS: eliminar el bloque de carrusel genérico (`[data-carousel]`) completo.** Al confirmarse por grep que `data-carousel`/`data-carousel-prev`/`data-carousel-next` solo existen en la sección `#cultura` (el carrete de Fragata usa atributos `data-reel*` separados con su propia lógica), el bloque completo en `script.js` (declaración de `carousel`/`carouselPrev`/`carouselNext`, función `moveCarousel()`, listeners) queda huérfano y se borra entero. Se quita `.culture-slide` de los dos selectores compartidos de reveal-on-scroll/lazy-loading, dejando el resto de la lista intacta.

## Risks / Trade-offs

- [Riesgo: reglas CSS de `.culture*` dispersas en múltiples bloques del archivo de 7.9k líneas, fácil dejar alguna suelta] → Mitigación: `grep -n` de todas las variantes (`.culture`, `.culture-carousel`, `.culture-slide`, `.carousel-shell`, `.section-heading`) antes y después del cambio, cero coincidencias esperadas al final salvo comentarios de changelog si los hubiera.
- [Riesgo: `.section-heading` y `.carousel-shell` resultan no ser exclusivos de `#cultura` y su borrado rompe otra sección] → Mitigación: confirmado por grep en todos los `.html` del repo que ambas clases solo aparecen una vez, dentro de la sección `#cultura` que se elimina.
- [Riesgo: alguna imagen `cultura-*` referenciada fuera de HTML/CSS/JS (ej. sitemap, meta og:image)] → Mitigación: grep de `cultura-` sobre todo el repo (no solo `.html`) antes de borrar los archivos.

## Migration Plan

Cambio de contenido estático sin estado ni datos — se aplica en una sola pasada de edición y se despliega vía el flujo normal de Netlify (push a `main`). No requiere rollback especial más allá de revertir el commit si algo se ve mal en producción.

## Open Questions

Ninguna — alcance confirmado con el usuario (tarjeta de marca se reemplaza por "Fragata", assets huérfanos se borran).
