## Context

`script.js` es compartido por `index.html` y `en-fotos/index.html`. Ya contiene un patrón de modal accesible completo y funcionando en producción para `.place-modal` (home): `getPlaceModalFocusable()`, `openPlaceModal()`/`closePlaceModal()` (guardan/restauran foco vía `lastPlaceTrigger`), y `trapPlaceModalFocus()` (registrado en `keydown`). El lightbox (`openLightbox()`/`closeLightbox()`, líneas ~290-310) nunca recibió el mismo tratamiento — solo alterna `aria-hidden`/`inert`, sin manejo de foco.

## Goals / Non-Goals

**Goals:**
- Que el lightbox tenga semántica de diálogo (`role`, `aria-modal`, `aria-label`) y manejo de foco (trap + restore) equivalente al `.place-modal`.
- Que cada foto de galería en `en-fotos` tenga un `aria-label` que la distinga de las demás.

**Non-Goals:**
- No se generaliza `.place-modal` y `.image-lightbox` en un único helper compartido — replicar el patrón (con nombres propios `*Lightbox*`) es suficiente y de menor riesgo que refactorizar ambos a la vez.
- No se agrega un indicador visual "foto X de Y" — es una mejora de UX, no de accesibilidad, fuera de esta propuesta puntual.

## Decisions

- **Replicar el patrón de `.place-modal` con nombres propios (`lastLightboxTrigger`, `getLightboxFocusable`, `trapLightboxFocus`) en vez de generalizar un helper compartido para ambos modales** — alternativa considerada: extraer una función genérica `createFocusTrap(modalElement)` reutilizable por ambos (descartada por ahora: cambiaría también el código ya probado de `.place-modal` en la misma pasada, aumentando el riesgo de esta propuesta puntual; queda como mejora futura si se decide refactorizar).
- **`aria-label` del lightbox: texto estático "Foto ampliada"** — alternativa considerada: incluir el título de la foto actual en el `aria-label` del contenedor (descartada: el contenedor es el mismo elemento del DOM para todas las fotos, actualizar su `aria-label` dinámicamente en cada `renderLightboxImage()` agrega complejidad; el título/ubicación ya se anuncian vía `lightboxTitle`/`lightboxLocation` dentro del diálogo).
- **`aria-label` de cada foto de galería: incluir el número de foto** — ej. `` `Ampliar foto ${number} de ${title}` `` — replica el mismo dato (`number`) que ya se usa para el `alt` de la imagen (línea 217-219), así que no hace falta calcular nada nuevo.

## Risks / Trade-offs

- [El trap de foco mal cableado podría dejar al usuario sin poder salir del lightbox con teclado] → Mitigación: replicar el patrón de `.place-modal` literalmente (mismo shape de función), que ya está probado en producción; verificar manualmente Tab/Shift+Tab/Escape en la Deploy Preview antes de mergear.
- [Cambiar el `aria-label` de las fotos no afecta visualmente nada, pero sí el comportamiento de lectores de pantalla] → Mitigación: cambio aditivo y acotado a un `setAttribute`, sin tocar el `alt` (que ya era correcto) ni el layout.

## Migration Plan

- Cambios en `script.js` (funciones) + 2 atributos HTML por página (`role`, `aria-modal`) en 2 archivos. Sin migración de datos. Revertir es un `git revert`.
- Verificación: en la Deploy Preview, abrir una foto con teclado (Enter/Space sobre una card), confirmar que el foco entra al diálogo, que Tab/Shift+Tab quedan atrapados dentro del lightbox, que Escape cierra y devuelve el foco a la card que lo abrió. Repetir en `index.html` (reel Fragata) y `en-fotos/index.html` (galerías).
