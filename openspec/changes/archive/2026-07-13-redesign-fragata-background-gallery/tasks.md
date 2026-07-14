## 1. HTML — sección Fragata

- [x] 1.1 En `index.html`, cambiar `.feature-kicker` de "ENSENADA IDENTIDAD / Patrimonio naval argentino" a "PATRIMONIO ARGENTINO".
- [x] 1.2 Dentro de `.fragata-hero`, reemplazar el `<img>` único por `<div class="fragata-gallery" aria-hidden="true">` con 8 `<img class="fragata-hero-image fragata-hero-slide">`, reusando los 8 archivos/srcset que hoy están en las `<figure>` del carrete (fragata-01-portada, fragata-03-rio-industria, fragata-05-cubierta, fragata-06-perfil-rio, fragata-07-bandera, fragata-08-contraluz, fragata-09-ingreso, fragata-10-popas, en ese orden — la 01 primero para que la primera impresión visual sea igual a la actual), con `alt=""` (decorativas, igual que `.hero-slide`), sin `data-lightbox-*`, `tabindex` ni `role`. La primera imagen mantiene `loading="lazy"` como estaba (no es above-the-fold como el hero principal).
- [x] 1.3 Dentro de `.fragata-hero-copy`, después del `<h2>`, agregar el nuevo `<p>` con el texto: "Un encuentro entre patria, río e industria naval. Más que una embarcación: es uno de los grandes símbolos de la Argentina en el mundo. En Ensenada, su presencia une soberanía, formación, trabajo portuario y orgullo nacional."
- [x] 1.4 Mover `<a class="fragata-cta" href="https://www.puertolaplata.com/" target="_blank" rel="noopener noreferrer">Gracias al Puerto La Plata por compartir el material.</a>` al final de `.fragata-hero-copy` (después del nuevo párrafo).
- [x] 1.5 Eliminar `<div class="fragata-reel-block">` completo (header con los 2 párrafos viejos y los botones prev/next, el `<div class="fragata-reel">` con las 8 `<figure>`, y la posición vieja del `.fragata-cta`).

## 2. CSS — agregar galería de fondo

- [x] 2.1 Agregar al final de `styles.css` (comentario fechado) `.fragata-gallery` (`position:absolute; inset:0; overflow:hidden`, igual que `.hero-gallery`) y `.fragata-hero-image` (mismo `position:absolute; inset:0; height:100%; object-fit:cover` que `.hero-image`, ajustado a lo que ya tenía `.fragata-hero img`).
- [x] 2.2 Agregar `.fragata-gallery .fragata-hero-slide { opacity: 0; animation: heroPhotoFade 48s infinite; }` y los 8 `:nth-child(N)` con `animation-delay` en incrementos de 6s (0s, 6s, 12s, 18s, 24s, 30s, 36s, 42s), reutilizando la `@keyframes heroPhotoFade` ya existente (no crear una nueva).
- [x] 2.3 Agregar el fallback `@media (prefers-reduced-motion: reduce)` para `.fragata-gallery .fragata-hero-slide` (sin animación, primera imagen a `opacity:1`), mismo patrón que `.hero-gallery .hero-slide`.
- [x] 2.4 Verificar visualmente que `.fragata-hero-copy` (ahora con h2+p+cta) no desborda `.fragata-hero` en mobile/tablet/desktop; ajustar `top`/`max-width` del contenedor o tamaños de fuente si hace falta. **Bug encontrado y corregido en verificación**: al sacar el `<img>` único de flujo normal (las nuevas imágenes son `position:absolute` dentro de `.fragata-gallery`), `.fragata-hero` se quedó sin alto propio y `overflow:hidden` recortaba toda la sección. Se agregó `height: clamp(420px, 58vw, 680px)` explícito a `.fragata-hero` (movido desde la vieja regla `.fragata-hero img`, ahora eliminada) y se migraron los 2 overrides responsive de altura (`560px`, `500px`) del mismo selector viejo.

## 3. CSS — limpieza de lo eliminado

- [x] 3.1 Confirmar con `grep -n "carousel-control" index.html en-fotos/index.html 404.html` que no queda ningún uso en HTML (además de los que se sacan en la tarea 1.5).
- [x] 3.2 Eliminar todas las reglas exclusivas de `.carousel-control` en `styles.css` (base, pseudo-clases, variantes responsive — grep `"\.carousel-control"` para ubicarlas todas) y los selectores de atributo `[data-reel-prev]::before`/`[data-reel-next]::before`, sin tocar `.lightbox-nav`/`.lightbox-close`/`.video-modal-close` en los selectores combinados donde aparecen juntos.
- [x] 3.3 Eliminar las reglas exclusivas de `.fragata-reel-header`, `.reel-actions`, `.fragata-reel`, `.fragata-reel figure` y sus variantes/pseudo-clases/responsive (grep `"\.fragata-reel\|\.reel-actions"` para ubicarlas todas).
- [x] 3.4 Para selectores combinados que mezclan lo eliminado con cosas que se mantienen (ej. `.fragata-hero, .fragata-reel-block` o `.fragata-hero img, .fragata-reel img`), quitar solo la parte de `.fragata-reel`/`.fragata-reel-block`, dejando `.fragata-hero`/`.fragata-hero img` intactos.
- [x] 3.5 Revisar `.fragata-story`/`.fragata-story-copy`/`.story-label`/`.fragata-reel-header h3` (styles.css ~614-658) — `.fragata-reel-header h3` es un selector combinado con `.fragata-story h3` que ya no aplica a ningún elemento del markup actual (no hay `<h3>` en el header del carrete); confirmar con grep que `.fragata-story`/`.story-label` tampoco se usan en el HTML actual antes de decidir si son código muerto preexistente (fuera del alcance de este cambio si no están relacionados) o si hace falta tocarlos.

## 4. JavaScript

- [x] 4.1 En `script.js`, eliminar las declaraciones `reel`, `reelPrev`, `reelNext` (`[data-reel]`, `[data-reel-prev]`, `[data-reel-next]`).
- [x] 4.2 Eliminar la función `moveReel()` y sus listeners (`reelPrev?.addEventListener`, `reelNext?.addEventListener`).
- [x] 4.3 Eliminar el binding de lightbox que agrupaba las fotos de `.fragata-reel` (busca dónde se itera `reel.querySelectorAll("img")` para `openLightbox`).
- [x] 4.4 Quitar `.fragata-reel figure` del selector de `revealTargets` y `.fragata-hero img`/`.fragata-reel img` del selector de `motionPhotos`, dejando el resto de cada lista intacto. No agregar `.fragata-hero-slide` a ninguna de las dos (ya tiene su propia animación de opacidad; sumarle parallax/reveal generaría dos animaciones compitiendo).

## 5. Verificación

- [x] 5.1 Servir el sitio en local (`npx serve .`) y verificar visualmente la sección `#fragata`: kicker "PATRIMONIO ARGENTINO", h2 sin cambios, párrafo nuevo, CTA del Puerto La Plata visible y legible, fondo rotando entre las 8 fotos (esperar al menos 12-15s para ver más de un cambio), sin controles ni carrete visible debajo, en mobile/tablet/desktop. Confirmado por el usuario (screenshot) tras corregir un bug de altura colapsada en `.fragata-hero`.
- [x] 5.2 Confirmar con `grep` que no queda `fragata-reel-block`, `data-reel`, `carousel-control` ni el texto "Este carrete reúne" en `index.html`/`styles.css`/`script.js`.
- [x] 5.3 Correr `node --check script.js` y verificar balance de llaves en `styles.css`.
- [x] 5.4 Confirmar que los 8 assets `assets/fragata/*.webp` (y variantes) siguen en uso — no se borra ningún archivo en este cambio.

## 6. OpenSpec

- [x] 6.1 Ejecutar `/opsx:sync` para aplicar: la nueva spec `fragata-background-gallery`, el MODIFIED de `responsive-hero-images` y `aria-semantics-and-focus`, y el REMOVED de `keyboard-accessible-galleries`, a `openspec/specs/`.
- [x] 6.2 Archivar el cambio con `/opsx:archive` una vez verificada la implementación.
