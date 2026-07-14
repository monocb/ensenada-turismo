## Context

Las 8 fotos de `.fragata-gallery` están apiladas con `position:absolute; inset:0` (mismo patrón que `.hero-gallery` del hero principal), cada una con `opacity:0` y `animation: heroPhotoFade 48s infinite` con un `animation-delay` distinto por `nth-child` — en cualquier momento dado, como mucho una tiene `opacity:1`. Para hacerlas clickeables sin romper esa rotación, hay que resolver un problema de hit-testing: en CSS, `opacity:0` no excluye a un elemento del hit-test del mouse por sí solo — si las 8 tuvieran `pointer-events:auto` a la vez, un click caería sobre la que esté más arriba en el DOM (la última), no necesariamente la que se ve.

El lightbox (`.image-lightbox`, `data-lightbox`) es un componente único y compartido por todas las galerías del sitio (place-cards, photo-story-cards, en-fotos) — cualquier cambio a su markup (como agregar un botón de descarga) afecta a todas ellas por igual, así que hay que decidir cómo evitar que la descarga aparezca donde no corresponde.

## Goals / Non-Goals

**Goals:**
- Las 8 fotos siguen rotando exactamente igual que hoy (sin tocar `@keyframes heroPhotoFade`).
- El click siempre abre la foto que el usuario ve en ese momento, nunca una oculta.
- El botón de descarga es una capacidad general del lightbox (cualquier imagen futura puede sumarse con un atributo), pero hoy solo la usan las fotos de Fragata.

**Non-Goals:**
- No se agrega descarga a ninguna otra galería existente ahora mismo (place-cards, en-fotos) — el cliente la pidió para Fragata, no sitewide.
- No se toca el mecanismo de rotación en sí, ni el hero principal (`#inicio`).

## Decisions

- **Segunda animación CSS (`fragataSlideInteractive`) para `pointer-events`, en paralelo a `heroPhotoFade`, en vez de tocar la animación de opacidad.** `heroPhotoFade` es compartida conceptualmente con el hero principal (aunque cada sección tiene su propia copia del keyframe con el mismo nombre reusado) — mezclarle `pointer-events` la ataría a un caso de uso (interactividad) que el hero principal no tiene. Una animación separada con los mismos puntos porcentuales (`0% / 4%,14% / 20%,100%`) logra el efecto sin tocar la que ya está probada y funcionando. Como `animation-delay` tiene un solo valor por `nth-child` hoy, ese valor se repite automáticamente para ambas animaciones de la lista (comportamiento estándar de CSS cuando una lista de `animation-*` es más corta que `animation-name`) — no hace falta duplicar los 8 delays.
- **`data-lightbox-download` como opt-in por imagen, no un botón siempre visible.** El lightbox es compartido por todo el sitio; en vez de bifurcar el componente o crear un lightbox paralelo solo para Fragata, el botón de descarga se oculta/muestra según si la imagen activa declara ese atributo. Esto lo deja disponible como capacidad general (cualquier galería futura puede sumarse agregando el atributo) sin efectos secundarios en las galerías actuales.
- **`data-lightbox-download` apunta al archivo base sin sufijo (`fragata-01-portada.webp`), no a `currentSrc`.** `currentSrc` refleja la variante de `srcset` que el navegador eligió para pantalla (puede ser la de 480w en mobile) — para "descargar la foto" se quiere siempre la resolución completa, así que hace falta un atributo separado que no dependa de qué variante se está mostrando.
- **Todas las 8 fotos quedan con `tabindex="0"` permanente (no se sincroniza con cuál está visible).** Alternativa considerada: togglear `tabindex` por JS para que solo la foto visible sea alcanzable por Tab. Se descarta por complejidad (requeriría un timer o `animationiteration` en JS espejando la animación CSS) frente a un beneficio menor — un usuario de teclado que llega a una foto momentáneamente no visible igual abre una foto válida y con su propio título/descripción del mismo grupo, y puede navegar con las flechas del lightbox al resto. Es el mismo patrón que ya usa el resto del sitio para fotos en grupo (`tabindex="0"` fijo en cada `<img>`, sin sincronización con visibilidad).
- **Restaurar `keyboard-accessible-galleries` en vez de dejarla vacía.** Ya existía como capability con ese propósito exacto (fotos de Fragata operables por teclado); tiene más sentido reactivar/actualizar su requirement que crear una nueva capability paralela para lo mismo.
- **Agregar el botón de descarga también al lightbox de `en-fotos/index.html`, aunque no se use ahí todavía.** Es el mismo componente compartido (`.image-lightbox`) copiado en ambas páginas — mantenerlas con el mismo markup evita que diverjan silenciosamente, aunque el botón nunca se muestre ahí hasta que alguna imagen de esa página sume `data-download`.
- **Eliminar el caption por completo (markup + CSS + JS) en vez de ocultarlo.** El cliente pidió explícitamente que no aparezca ninguna información al abrir una foto — no es un caso de "ocultar por ahora"; el `<div class="lightbox-caption">` y sus hijos (`data-lightbox-title`/`data-lightbox-location`/`data-lightbox-description`) nunca tuvieron otro consumidor en el sitio (confirmado por grep: solo las 8 fotos de Fragata poblaban esos atributos), así que no queda ningún dato huérfano al sacarlos. Mantener el código muerto detrás de un `hidden` permanente violaría la convención del proyecto de no dejar código sin uso.

## Risks / Trade-offs

- [Riesgo: el cambio de `pointer-events` vía keyframes no es perfectamente instantáneo en el punto exacto donde `heroPhotoFade` termina de bajar la opacidad a 0 (20%) — los navegadores interpolan el "salto" de una propiedad no animable a mitad de camino entre los dos keyframes que la rodean, así que el click podría dejar de funcionar unos ~1-2s antes de que la foto termine de desvanecerse del todo] → Mitigación: es una ventana muy corta dentro de un ciclo de 48s por foto, imperceptible en el uso normal; no justifica una solución más compleja (ej. JS con `requestAnimationFrame` leyendo opacity en vivo).
- [Riesgo: `.fragata-hero-slide` ahora participa de `revealTargets`/`motionPhotos` por error, sumando una animación de scroll-reveal o parallax que compita con las dos animaciones de rotación/interactividad ya en curso] → Mitigación: se mantienen explícitamente afuera de ambas listas en `script.js`, igual que se decidió en el cambio anterior — el click nuevo no cambia esa razón.
- [Riesgo: agregar `tabindex="0"` a 8 imágenes en un fondo rotativo agrega 8 paradas de Tab para lo que visualmente es un solo elemento] → Aceptado (ver Decisions) — mismo patrón que el resto del sitio usa para grupos de fotos.

## Migration Plan

Cambio de contenido/interacción sin estado ni datos — se aplica en una sola pasada de edición y se despliega vía el flujo normal de Netlify.
