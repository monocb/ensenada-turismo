## Why

El cliente vio el watermark decorativo de fondo (un ícono de velero muy tenue) en la sección `#recorrido` y pidió sacarlo por completo — lo percibió como "líneas raras" detrás de las place-cards, no como un elemento de marca reconocible.

## What Changes

- Se elimina `.route-section::after` de `styles.css` (dos declaraciones: la regla base en la línea ~987, que define el ícono `assets/identidad/icono-velero.png` como `background` con `opacity: 0.08`, y su override en la línea ~3070, que baja la opacidad final a `0.045`).
- Se elimina el archivo `assets/identidad/icono-velero.png`, confirmado sin otro uso en el sitio (único `url()` que lo referencia era `.route-section::after`) ni mención en `docs/marca/`.
- No se toca `index.html`, JS, ni ninguna otra sección — el watermark es puramente decorativo (pseudo-elemento `::after`, sin contenido semántico).

## Capabilities

### New Capabilities
- `recorrido-section-background`: la sección `#recorrido` no muestra ningún watermark/ícono decorativo de fondo.

### Modified Capabilities
(ninguna)

## Impact

- `styles.css`: eliminación de las 2 declaraciones `.route-section::after`.
- `assets/identidad/icono-velero.png`: archivo eliminado (sin otro uso en el repo).
