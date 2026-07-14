## Why

El cliente pidió tres ajustes más sobre la sección Fragata: acortar la bajada y achicar un poco el título; y — revirtiendo parcialmente una decisión tomada antes en esta misma sesión ("fondo puro, sin lightbox") — quiere que las 8 fotos de fondo sigan rotando solas pero también se puedan clickear para verlas ampliadas, con la posibilidad de descargarlas. La descarga es una funcionalidad nueva que hoy no existe en ningún lugar del sitio.

Durante la verificación de este mismo cambio se detectaron y corrigieron dos bugs (overlay decorativo absorbiendo los clicks, y lookups del lightbox sin scope que rompían el caption en todo el sitio). Al ver el caption ya funcionando, el cliente decidió que no lo quiere: al abrir cualquier foto del lightbox, solo debe verse la foto, sin ninguna información superpuesta. Como el caption nunca llegó a confirmarse como funcional antes de esta decisión y el cambio todavía no está archivado, se saca por completo dentro de este mismo cambio en vez de abrir uno nuevo.

## What Changes

- El párrafo de `.fragata-hero-copy` se acorta a "Patria, río e industria, uno de los grandes símbolos de la Argentina. Soberanía, trabajo y orgullo nacional." El `<h2>` mantiene el texto, pero baja de tamaño (`clamp(40px, 6.8vw, 86px)` → `clamp(34px, 5.8vw, 70px)`).
- Las 8 fotos de fondo (`.fragata-hero-slide`) recuperan interactividad sin perder la rotación automática: `alt` descriptivo, `tabindex="0"`, `role="button"` — los mismos valores que tenían antes de que el cambio `redesign-fragata-background-gallery` las volviera puramente decorativas.
- Se agrega `pointer-events` sincronizado con la ventana de visibilidad de cada foto (vía una segunda animación CSS en paralelo a `heroPhotoFade`, que no se toca) para que el click siempre abra la foto que el usuario efectivamente está viendo, no una oculta detrás por el apilamiento `position:absolute`.
- `.fragata-gallery` pierde `aria-hidden="true"` (ya no es puramente decorativo) y pasa a `role="group"` con `aria-label` — mismo patrón que ya usaba el carrete eliminado.
- **Nueva funcionalidad**: botón de descarga en el lightbox compartido del sitio (`.image-lightbox`), oculto por defecto y visible solo cuando la foto activa tenga un atributo `data-download` apuntando al archivo de resolución completa — por ahora, solo las 8 fotos de Fragata lo tienen, así que el botón no aparece en ninguna otra galería del sitio (place-cards, en-fotos, etc.).
- Se restaura una capability de accesibilidad por teclado equivalente a la que se había eliminado (`keyboard-accessible-galleries`), ahora describiendo `.fragata-hero-slide` en vez del carrete viejo.
- **Se elimina por completo el caption del lightbox** (`.lightbox-caption`, con título/ubicación/descripción): markup, CSS y JS que lo poblaban. Al abrir cualquier foto en el lightbox (de cualquier galería del sitio) solo se ve la foto ampliada, sin ninguna información superpuesta. Los atributos `data-lightbox-title`, `data-lightbox-location`, `data-lightbox-description` de las 8 fotos de Fragata se eliminan por quedar sin uso.

## Capabilities

### New Capabilities
- `lightbox-image-download`: el lightbox compartido del sitio puede mostrar un botón de descarga cuando la foto activa lo soporta, sin afectar a las galerías que no lo usan.

### Modified Capabilities
- `fragata-background-gallery`: las 8 fotos de fondo pasan a ser clickeables/operables por teclado (abren el lightbox), sin dejar de rotar solas — el requirement que decía "ninguna de las 8 imágenes SHALL ser clickeable" se actualiza.
- `keyboard-accessible-galleries`: se restaura un requirement (vacío desde `redesign-fragata-background-gallery`) equivalente al anterior, ahora sobre `.fragata-hero-slide`.

## Impact

- `index.html`: atributos restaurados/agregados en los 8 `<img class="fragata-hero-slide">` (sin los de caption, ver arriba), `.fragata-gallery` sin `aria-hidden`, nuevo botón de descarga en `.image-lightbox`, copy del párrafo actualizado, `.lightbox-caption` eliminado del markup del lightbox.
- `en-fotos/index.html`: mismo botón de descarga agregado a su copia del lightbox, por consistencia de markup (no se activa ahí todavía, ninguna imagen de esa página tiene `data-download`); `.lightbox-caption` eliminado también de este lightbox.
- `styles.css`: `font-size` del `<h2>` de Fragata, nueva animación `pointer-events`, estilos del botón de descarga, reglas de `.lightbox-caption` eliminadas.
- `script.js`: wiring de click/teclado para las 8 fotos de Fragata (mismo patrón que otras galerías), lectura de `data-download` en `renderLightboxImage()`, referencias y lógica de `lightboxTitle`/`lightboxLocation`/`lightboxDescription`/caption eliminadas.
- `openspec/specs/fragata-background-gallery/spec.md`, `openspec/specs/keyboard-accessible-galleries/spec.md`, `openspec/specs/lightbox-image-download/spec.md`: requirements actualizados (el último sin ninguna mención a caption/título/ubicación/descripción).
