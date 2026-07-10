## Context

`index.html:206-260` (`.fragata-reel`, `data-reel`) tiene 9 `<figure><img>...</figure>` con `alt` descriptivo, pero sin `tabindex`. `script.js:385-390`:
```js
reel?.querySelectorAll("img").forEach((image) => {
  image.addEventListener("click", () => {
    const gallery = reel.querySelectorAll("img");
    openLightbox(image, gallery);
  });
});
```
Solo escucha `click` — un `<img>` sin `tabindex` nunca recibe foco de teclado, así que este handler es inalcanzable sin mouse/touch.

Comparar con el patrón ya accesible de `setupPhotoReelSection` (usado en en-fotos), que crea explícitamente un `<button class="photos-reel-card">` envolviendo cada imagen — los `<button>` son focusables y activables por teclado de forma nativa, sin necesitar `tabindex` ni manejo manual de `Enter`/`Espacio`.

## Goals / Non-Goals

**Goals:**
- Que las 9 fotos del carrete de la Fragata sean alcanzables por Tab y abribles con Enter o Espacio, igual que el resto de las galerías del sitio.

**Non-Goals:**
- No se envuelve el `<img>` en un `<button>` (como hace `photos-reel-card`) — cambiar la estructura HTML afectaría selectores CSS existentes (`.fragata-reel figure img`, `.fragata-reel figure span`, etc.) con riesgo de romper el layout visual del carrete. Se prefiere el fix mínimo (`tabindex` + manejo de teclado en JS) sobre replicar el patrón de `<button>`.
- No se tocan las otras galerías (ya accesibles).

## Decisions

**`tabindex="0"` + `role="button"` en el HTML, más un listener de `keydown` en JS — no reestructurar a `<button>`.**
Es el cambio de menor superficie que logra el mismo resultado de accesibilidad (foco + activación por teclado) sin tocar CSS ni arriesgar el layout visual ya afeitado del carrete. `role="button"` comunica a lectores de pantalla que el `<img>` es interactivo (más allá de ser una imagen), complementando el `alt` ya descriptivo.

**El `keydown` maneja `Enter` y `" "` (Espacio), replicando el comportamiento nativo de `<button>`.**
Es el estándar de facto para elementos con `role="button"` (WAI-ARIA Authoring Practices) — cualquier usuario de teclado espera que ambas teclas activen el control.

**Se reutiliza la regla CSS existente `[tabindex]:focus-visible` (`styles.css:7448`) — no se agrega CSS nuevo.**
Ya da `outline: 3px solid #ffcf2f; outline-offset: 4px;` a cualquier elemento con `tabindex` en foco — cubre las imágenes del carrete automáticamente en cuanto tengan el atributo.

## Risks / Trade-offs

- **[Riesgo] Agregar `role="button"` a un `<img>` cambia su semántica para lectores de pantalla — el `alt` ahora se anuncia como "nombre" del botón, no como descripción de imagen pura.** → Aceptado: el `alt` ya es descriptivo ("Fragata ARA Libertad navegando frente a Ensenada", etc.), funciona bien también como nombre accesible de un control que "abre esta foto en grande".
- **[Riesgo] Ninguno operacional** — cambio de atributos HTML + una función JS existente extendida, sin build.

## Migration Plan

1. Agregar `tabindex="0"` y `role="button"` a las 9 `<img>` de `.fragata-reel` en `index.html`.
2. Extender el listener en `script.js` para manejar `keydown` (`Enter`/`Espacio`) además de `click`.
3. Verificar con navegación real por teclado (Tab hasta cada foto, Enter/Espacio para abrir, Escape para cerrar, flechas para navegar dentro del lightbox — ya funcionan).
4. Commit + push a `main` → deploy automático.
5. Rollback: revertir el commit si algo se rompe — cambio aislado y reversible.

## Open Questions

Ninguna.
