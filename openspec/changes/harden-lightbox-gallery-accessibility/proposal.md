## Why

`/impeccable critique`+`audit` sobre `index.html` y `en-fotos/index.html` (2026-07-12) encontraron que el lightbox de fotos (`.image-lightbox`, compartido por ambas páginas vía `/script.js`) no es un diálogo accesible real: sin `role="dialog"`/`aria-modal`, sin trampa de foco, y sin devolución de foco al cerrar — a pesar de que el `.place-modal` del home (mismo archivo) ya resuelve exactamente este patrón (`trapPlaceModalFocus`, `lastPlaceTrigger`). Un usuario de teclado que abre una foto puede tabular hacia contenido de fondo mientras el lightbox está visualmente encima, y al cerrar pierde su lugar. Además, en `en-fotos/index.html`, todas las fotos de una misma galería comparten el mismo `aria-label` (`script.js:208`, constante por sección), así que un usuario de lector de pantalla no puede distinguir una foto de otra antes de abrirla — pese a que el `alt` de cada imagen sí es descriptivo y único.

## What Changes

- Agregar `role="dialog"`, `aria-modal="true"` y `aria-label="Foto ampliada"` a `.image-lightbox` en `index.html` y `en-fotos/index.html`.
- En `script.js`: agregar una función `getLightboxFocusable()` (mismo patrón que `getPlaceModalFocusable()`), y extender `openLightbox()`/`closeLightbox()` para guardar el elemento disparador (`lastLightboxTrigger`), mover el foco al abrir, y restaurarlo al cerrar — replicando exactamente `openPlaceModal()`/`closePlaceModal()`.
- Agregar `trapLightboxFocus()` (mismo patrón que `trapPlaceModalFocus()`) y registrar el listener `keydown` en `.image-lightbox`.
- Corregir el `aria-label` duplicado en `script.js:208`: incluir el número de foto, ej. `` `Ampliar foto ${number} de ${title}` `` en vez de `` `Ampliar ${title}` `` constante.

Fuera de alcance:
- No se toca el contraste del tagline del hero — ya resuelto conscientemente en el change archivado `2026-07-11-fix-hero-tagline-contrast` (trade-off documentado, no es un bug).
- No se agrega indicador de posición "foto X de Y" en el lightbox — es una mejora de UX de contenido, no de accesibilidad estricta, candidata a una propuesta aparte si se decide abordarla.

## Capabilities

### New Capabilities
- `lightbox-accessible-dialog`: el lightbox de fotos (compartido por `index.html` y `en-fotos/index.html`) se comporta como un diálogo modal accesible — rol/semántica ARIA correctos, foco atrapado mientras está abierto, y foco devuelto al disparador al cerrar.

### Modified Capabilities
- `gallery-accessibility`: cada foto dentro de una galería de `en-fotos/index.html` tiene un `aria-label` único que permite distinguirla de las demás antes de abrirla.

## Impact

- Archivos afectados: `script.js` (funciones de lightbox), `index.html` y `en-fotos/index.html` (atributos ARIA en el markup del lightbox, ya existente en ambas).
- No afecta `styles.css`.
- Riesgo: bajo-medio. Se replica un patrón ya probado en producción (`.place-modal`) en vez de inventar uno nuevo; el riesgo principal es de regresión funcional en la apertura/cierre del lightbox si el trap de foco queda mal cableado — mitigado verificando manualmente la navegación por teclado completa (Tab, Shift+Tab, Escape, flechas) en la Deploy Preview.
