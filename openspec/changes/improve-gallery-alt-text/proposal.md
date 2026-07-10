## Why

Las imágenes generadas dinámicamente por los "photo reels" (`setupPhotoReelSection` en `script.js:181-234`, usado hoy solo en `en-fotos/index.html`) reciben un `alt` genérico: `"${title}, foto ${número}"` cuando la sección tiene título, o `"Foto de Ensenada"` como fallback. Este texto no describe el contenido real de cada foto y no aprovecha datos que la propia sección ya tiene disponibles (`data-photo-location`, `data-photo-description`), dejando peor accesibilidad de la que el marcado ya permite sin agregar ningún dato nuevo.

## What Changes

- Enriquecer el `alt` generado en `setupPhotoReelSection` para incluir la ubicación (`location`) además del título, en vez de solo `título + número`.
- Eliminar el fallback genérico `"Foto de Ensenada"` cuando no hay `title`: usar en su lugar un texto derivado del nombre de la carpeta/prefix de la galería, para que ninguna imagen quede con un alt no descriptivo.
- No se agregan atributos nuevos al HTML: `location` y `description` ya existen como `data-photo-location`/`data-photo-description` en las tres secciones de `en-fotos/index.html` y ya se leen en el código (`section.dataset.photoLocation`), solo no se usaban para el `alt`.
- El lightbox (`script.js:256`) hereda el `alt` de la imagen fuente automáticamente, así que no requiere cambios propios.

## Capabilities

### New Capabilities
- `gallery-accessibility`: texto alternativo (`alt`) descriptivo y sin fallback genérico para las imágenes generadas dinámicamente en los photo reels de galería.

### Modified Capabilities
(ninguna — no hay spec previa que cubra accesibilidad de galería)

## Impact

- Archivo afectado: `script.js` (función `setupPhotoReelSection`), únicamente la línea que arma `image.alt`.
- No afecta HTML, CSS, ni `manifest.json` (que ya se confirmó no utilizado por este flujo).
- Sin impacto visual — el cambio es puro texto alternativo, no se ve en pantalla salvo con lectores de pantalla o cuando la imagen falla en cargar.
- Bajo riesgo: cambio acotado a una función chica, sin tocar build ni dependencias.
