## Context

`renderLightboxImage()` (script.js) setea `lightboxImage.src = image.currentSrc || image.src`. Para las 3 secciones de `en-fotos/index.html`, las `<img>` del carrete se generan dinámicamente en `setupPhotoReelSection()` con `sizes="260px"` (el ancho del thumbnail en la grilla) y un `srcset` de dos variantes (`-480w`, `-900w`). El navegador resuelve `currentSrc` contra ese `sizes`, así que en la enorme mayoría de los casos elige la variante `-480w`: un archivo de 480px de ancho real, no una imagen grande "mostrada chica" por CSS. El CSS del lightbox (`.image-lightbox img { width:auto; max-width:96vw; max-height:92vh; object-fit:contain; }`) no fuerza un tamaño mínimo, así que el `<img>` renderiza a su tamaño intrínseco (480px), muy por debajo del máximo permitido — de ahí que se vea "chica" comparada con Fragata, cuyo `sizes` (hasta 1180px) resuelve a una variante de 1400w/1600w.

## Goals / Non-Goals

**Goals:**
- Toda foto de cualquier galería del sitio abre en el lightbox a su resolución completa disponible, no a la variante de `srcset` que el navegador eligió para el thumbnail.

**Non-Goals:**
- No se toca el fondo del lightbox (`.image-lightbox { background: rgba(3, 14, 27, 0.92); }`) — el cliente pidió específicamente dejarlo como está, se descarta esa parte de la propuesta original.
- No se agrega botón de descarga a en-fotos — sigue siendo exclusivo de Fragata (`data-download`), sin relación con este fix.
- No se reintroduce ningún tipo de caption/información sobre la foto (ya se eliminó por completo en el cambio anterior).
- No se toca `placeGalleryImages`/`photoExhibitImages` en `script.js` — son selectores sin markup activo en el sitio hoy (código muerto preexistente), fuera del alcance de este fix.

## Decisions

- **Atributo nuevo `data-lightbox-src`, no reutilizar `data-download`.** `data-download` ya existe y controla la visibilidad del botón de descarga (exclusivo de Fragata); si en-fotos sumara ese mismo atributo para arreglar el tamaño, el botón de descarga aparecería ahí también — algo que nadie pidió. Un atributo separado, dedicado solo a qué imagen mostrar (no a si se puede descargar), evita ese acoplamiento accidental.
- **Orden de resolución en `renderLightboxImage()`: `data-lightbox-src` → `data-download` → `currentSrc` → `src`.** Cubre los tres casos reales del sitio con una sola línea: en-fotos usa `data-lightbox-src` (nuevo), Fragata ya tiene `data-download` apuntando al archivo completo así que lo reutiliza gratis para mostrarse a full-res también (antes usaba `currentSrc`, que ya solía ser grande pero no garantizado al 100% — esto lo hace determinístico), y cualquier imagen futura sin ninguno de los dos atributos sigue funcionando exactamente igual que hoy.

## Risks / Trade-offs

- [Riesgo: `data-lightbox-src` apunta al archivo sin sufijo de resolución, que en algunos casos puede ser bastante pesado para conexiones lentas] → Aceptado: es el mismo trade-off que ya existe para Fragata vía `data-download`, y el usuario está abriendo la foto deliberadamente para verla en grande, no navegando una grilla.

## Migration Plan

Cambio de comportamiento visual/de recursos sin estado ni datos — se aplica en una sola pasada de edición y se despliega vía el flujo normal de Netlify.
