## Why

`/impeccable critique` sobre `en-fotos/index.html` (P0) y sobre `404.html` (P2), ambos del 2026-07-12, encontraron que ninguna de las dos páginas tiene `<footer>` ni enlaces a redes sociales. `PRODUCT.md` define el objetivo de conversión primario del sitio como "seguir las redes sociales de Turismo Ensenada (Instagram, Facebook, TikTok — ya enlazadas en el footer del sitio)", y nombra explícitamente a `en-fotos` como la página de contención para visitantes "todavía no están listos para seguir en redes". Hoy, un visitante que llega a cualquiera de las dos páginas (directo, por link compartido, o navegando desde el sitio) no tiene ningún camino hacia ese objetivo sin volver primero a la home.

## What Changes

- Agregar el mismo `<footer class="site-footer" id="contacto">` que ya tiene `index.html` (líneas 432-458: marca + navegación del sitio + enlaces a Instagram/Facebook/TikTok) a `en-fotos/index.html` y a `404.html`, insertado justo antes de `</body>` en cada una.
- No se adapta ni recolorea nada: `.site-footer` ya tiene fondo oscuro autocontenido (`background: var(--brand-night)`) en `styles.css`, independiente de la página en la que se inserte.

Fuera de alcance:
- No se toca contenido, copy, ni navegación del header de ninguna de las dos páginas.
- No se agrega ningún componente nuevo — es el mismo footer ya existente, copiado tal cual.

## Capabilities

### New Capabilities
- `site-footer-coverage`: todas las páginas del sitio (`index.html`, `en-fotos/index.html`, `404.html`) incluyen el footer con enlaces a redes sociales, no solo la home.

## Impact

- Archivos afectados: `en-fotos/index.html`, `404.html` (agregar el mismo bloque de markup en cada una).
- No afecta `styles.css` ni `script.js` — el componente y sus estilos ya existen.
- Riesgo: bajo. Es un componente ya probado en producción (home), solo se replica su HTML.
