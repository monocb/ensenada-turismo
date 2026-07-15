## 1. CSS — sacar el mecanismo de pointer-events animado

- [x] 1.1 En `styles.css`, en `.fragata-gallery .fragata-hero-slide`, sacar `fragataSlideInteractive 48s infinite` del `animation` shorthand, dejando solo `heroPhotoFade 48s infinite`.
- [x] 1.2 Eliminar el bloque `@keyframes fragataSlideInteractive` completo (ya no usado).

## 2. JavaScript — reemplazo confiable del mecanismo de click

- [x] 2.1 En `script.js`, agregar un `setInterval` (cada 250ms) scopeado a `.fragata-gallery .fragata-hero-slide` que calcule, para cada una de las 8 fotos (usando el mismo `animation-delay` de 6s por foto: 0,6,12,18,24,30,36,42s sobre un ciclo de 48s), si el tiempo transcurrido cae dentro de la ventana 4%-14% de su propio ciclo — y en ese caso setee `pointerEvents = "auto"` vía `element.style`, `"none"` en caso contrario.
- [x] 2.2 El intervalo SHALL respetar `prefers-reduced-motion: reduce` (`window.matchMedia("(prefers-reduced-motion: reduce)").matches`) — si está activo, no arrancar el intervalo ni tocar `pointer-events`, dejando la regla CSS estática existente para reduced-motion sin interferencia.
- [x] 2.3 Confirmar que el wiring de click/keydown existente (`document.querySelectorAll(".fragata-hero-slide").forEach(...)`) sigue intacto — no hace falta tocarlo, solo el mecanismo que habilita/deshabilita el `pointer-events` que determina si ese click puede llegar a disparar.

## 3. Verificación

- [x] 3.1 `node --check script.js`.
- [x] 3.2 Balance de llaves en `styles.css`.
- [x] 3.3 Servir el sitio en local y confirmar que el JS/CSS nuevo se sirve correctamente (sin herramienta de navegador disponible esta sesión para probar el click interactivamente).
- [ ] 3.4 Confirmación del cliente en su celular (Safari/iOS) una vez deployado: las fotos de Fragata abren el lightbox al tocarlas, y el lightbox se ve bien ajustado a la pantalla.

## 4. OpenSpec

- [x] 4.1 Ejecutar `/opsx:sync` para aplicar el MODIFIED de `fragata-background-gallery` a `openspec/specs/`.
- [x] 4.2 Archivar el cambio con `/opsx:archive` una vez verificada la implementación.
