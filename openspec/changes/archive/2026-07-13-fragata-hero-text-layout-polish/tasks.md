## 1. CSS — centrado vertical

- [x] 1.1 En `styles.css`, agregar `display: flex; align-items: center;` a la regla `.fragata-hero` (línea ~565), manteniendo `position:relative`, `height`, `width`, `margin`, `overflow`, `border-radius`, `background`, `box-shadow` existentes.
- [x] 1.2 En `.fragata-hero-copy` (línea ~585), cambiar `position:absolute` a `position:relative`, eliminar `top` y `bottom`, y cambiar `left: clamp(22px, 5vw, 64px)` por `margin-left: clamp(22px, 5vw, 64px)`. Mantener `max-width:650px`, `color`, `z-index:1`.

## 2. CSS — CTA sin caja

- [x] 2.1 En `.fragata-cta` (línea ~658), eliminar `border`, `border-left`, `background`, `padding`, y cambiar `font-size` de 20px a 14px y `font-weight` de 900 a 700. Agregar `letter-spacing: 0.02em`, `text-decoration: underline`, `text-underline-offset: 3px`, `text-decoration-color: rgba(255, 255, 255, 0.35)`, `color: rgba(255, 255, 255, 0.78)`. Cambiar `margin-top` de 18px a 24px.
- [x] 2.2 Agregar `.fragata-cta:hover, .fragata-cta:focus-visible { color: #ffffff; text-decoration-color: currentColor; }`.

## 3. Verificación

- [x] 3.1 Servir el sitio en local (`npx serve .`) y verificar visualmente la sección `#fragata`: bloque de texto centrado verticalmente en la imagen de fondo, CTA sin caja con subrayado visible, hover/focus del CTA cambia a blanco sólido, en mobile/tablet/desktop.
- [x] 3.2 Verificar que el layout no se rompe en viewports angostos (el `.fragata-hero` con altura mínima `420px` sigue conteniendo el bloque de texto sin desbordar).
- [x] 3.3 Confirmar con `grep` que `.fragata-cta` ya no tiene `border-left` en `styles.css`.

## 4. OpenSpec

- [x] 4.1 Ejecutar `/opsx:sync` para aplicar el ADDED requirement a `openspec/specs/fragata-background-gallery/`.
- [x] 4.2 Archivar el cambio con `/opsx:archive` una vez verificada la implementación.
