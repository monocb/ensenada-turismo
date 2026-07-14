## Why

El cliente pidió mover el componente de redes sociales que hoy aparece como una cápsula flotante debajo del hero (`.social-strip`) al footer, reemplazando ahí los links de texto plano actuales, porque las del footer se veían "muy simples". De paso, pidió sacar el contenedor general (la cápsula de fondo) y que los badges individuales sean translúcidos con sombra leve, conservando la animación de hover que ya tenían.

## What Changes

- Se elimina por completo `<section class="social-strip">` de `index.html` (la cápsula flotante bajo el hero, con los 3 badges Instagram/Facebook/TikTok).
- El `<nav class="footer-links footer-social-links">` del footer (idéntico hoy en `index.html`, `en-fotos/index.html` y `404.html`) pasa de 3 links de texto plano ("Instagram"/"Facebook"/"TikTok") a la misma estructura rica que tenía la cápsula eliminada: ícono SVG + handle (`turismoensenada_`, `turismoeda`, `@turismoensenada`), mismos hrefs.
- Los badges del footer **no** quedan envueltos en ningún contenedor tipo cápsula/pill — a diferencia de `.social-strip`, que sí tenía ese fondo general.
- Los badges individuales pasan a fondo translúcido con sombra leve (antes: `.social-strip-links a` tenía un fondo casi blanco sólido).
- Se conserva la animación de hover/focus que ya tenían los badges (elevación + fondo que se aclara), aplicada ahora a los badges del footer.
- Limpieza: se elimina todo el CSS de `.social-strip`/`.social-strip-links` (disperso en ~8 bloques base + ~10 responsive en `styles.css`, incluidos 2 bloques de selectores ya muertos de una estructura HTML anterior). En `script.js` se elimina la variable `socialStrip` y el toggle de scroll (`is-leaving`) que ocultaba la cápsula — ya no existe nada que ocultar.
- No se tocan los colores de marca por red social (`.instagram-link .social-icon`, etc.) — no están scopeados a `.social-strip`, siguen aplicando igual en el footer.

## Capabilities

### New Capabilities
- `footer-social-badges`: el footer de las 3 páginas muestra los links a redes sociales como badges con ícono + handle, sin contenedor general, con fondo translúcido y animación de hover.

### Modified Capabilities
(ninguna — `site-footer-coverage` sigue cumpliéndose: las 3 páginas siguen teniendo footer con links funcionales a Instagram/Facebook/TikTok, consistentes entre sí; solo cambia el tratamiento visual interno, no lo que ese requirement específicamente testea)

## Impact

- `index.html`, `en-fotos/index.html`, `404.html`: `.footer-social-links` con la nueva estructura de badges.
- `index.html`: eliminación de `<section class="social-strip">`.
- `styles.css`: eliminación de ~18 declaraciones dispersas de `.social-strip`/`.social-strip-links`; nuevas reglas para `.footer-social-links a`.
- `script.js`: eliminación de `socialStrip` y su toggle de scroll.
