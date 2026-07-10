## Why

`docs/pendientes/accesibilidad.md` lista "que los carruseles/lightbox sean navegables por teclado" como pendiente de revisar. Verificado uno por uno los 6 ítems del documento: 4 ya están resueltos (`aria-expanded`, orden de headings, `alt` descriptivo, foco visible), pero se confirmó un bug real: las 9 fotos del carrete de la Fragata ARA Libertad (`.fragata-reel`, sección "Fragata") son `<img>` sueltas dentro de `<figure>`, con un `click` handler en `script.js` pero sin `tabindex` ni manejo de teclado — un usuario que navega solo con teclado no puede abrir el lightbox para ninguna de esas fotos. El resto de las galerías del sitio (en-fotos) ya usan `<button>` para el mismo propósito y sí son accesibles.

## What Changes

- Agregar `tabindex="0"` y `role="button"` a las 9 imágenes de `.fragata-reel` en `index.html`.
- Agregar manejo de `Enter`/`Espacio` en el listener ya existente de `script.js` (`reel?.querySelectorAll("img").forEach(...)`, que hoy solo escucha `click`) para que el teclado dispare la misma acción de abrir el lightbox.
- No se toca CSS: ya existe una regla genérica `[tabindex]:focus-visible { outline: 3px solid #ffcf2f; outline-offset: 4px; }` (`styles.css:7448`) que va a aplicar automáticamente el anillo de foco correcto en cuanto las imágenes tengan `tabindex`.
- No se toca ninguna otra galería (las de en-fotos ya son accesibles vía `<button>`).

## Capabilities

### New Capabilities
- `keyboard-accessible-galleries`: las galerías de imágenes del sitio (incluida la de la Fragata) son operables completamente por teclado.

### Modified Capabilities
(ninguna)

## Impact

- Archivos afectados: `index.html` (9 atributos agregados a `<img>`), `script.js` (un listener existente extendido).
- No afecta CSS ni otras galerías.
- Riesgo: bajo. Verificar con navegación real por Tab + Enter/Espacio que el lightbox abre correctamente y que el foco visible se ve bien.
