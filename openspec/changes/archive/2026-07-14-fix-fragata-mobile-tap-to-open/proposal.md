## Why

El cliente reportó que en su celular las 8 fotos rotativas de fondo de la sección Fragata no abren el lightbox al tocarlas, aunque en desktop sí funciona. La causa es un bug conocido de compatibilidad: el sitio determina qué foto es clickeable en cada momento animando `pointer-events` vía `@keyframes` CSS — funciona en Chrome/Firefox de escritorio, pero Safari/WebKit (el motor de todos los navegadores en iOS) no aplica de forma confiable animaciones de `pointer-events`, dejando el elemento efectivamente sin poder recibir clicks/taps en ningún momento.

## What Changes

- Se reemplaza el mecanismo de `pointer-events` animado por CSS (`@keyframes fragataSlideInteractive`) por uno manejado desde `script.js` con `setInterval`, que replica la misma ventana de tiempo (4%-14% de cada ciclo de 48s, mismo `animation-delay` de 6s por foto) pero seteando `pointer-events` directamente vía JS — confiable en cualquier navegador/dispositivo, sin depender de que el motor de renderizado interpole correctamente una propiedad discreta como parte de una animación CSS.
- `.fragata-hero-slide` conserva `heroPhotoFade` (el fade visual de opacidad, que no tiene ningún requisito de confiabilidad de interacción y sigue funcionando bien como CSS puro) — solo se saca `fragataSlideInteractive` de su `animation` shorthand, y se elimina el `@keyframes` ya no usado.
- El nuevo mecanismo JS respeta `prefers-reduced-motion: reduce`: no toca `pointer-events` cuando está activo, dejando la regla CSS existente para reduced-motion (estática, no animada, ya funciona bien en cualquier navegador) sin interferencia.
- Se verifica (sin cambios de CSS esperados, pero como ítem explícito) que el lightbox se vea bien ajustado en pantallas de cualquier tamaño una vez que las fotos puedan abrirse en mobile.

## Capabilities

### Modified Capabilities
- `fragata-background-gallery`: el requirement de que las 8 fotos sean clickeables/operables por teclado se actualiza para especificar que el mecanismo de disponibilidad de click SHALL funcionar de forma confiable en cualquier navegador, no solo en los que animan `pointer-events` correctamente.

## Impact

- `styles.css`: se saca `fragataSlideInteractive` del `animation` shorthand de `.fragata-hero-slide` y se elimina el `@keyframes` correspondiente (ya no usado).
- `script.js`: nuevo `setInterval` que gestiona `pointer-events` de las 8 fotos de Fragata, respetando `prefers-reduced-motion`.
- `openspec/specs/fragata-background-gallery/spec.md` (modificada).
