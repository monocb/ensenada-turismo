## Why

`docs/pendientes/seo.md` lista SEO básico como ya implementado (title, description, canonical, OG, Twitter card, JSON-LD, sitemap, robots.txt). Verificado comparando el `<head>` de `index.html` contra `en-fotos/index.html`: `en-fotos/index.html` no tiene **ninguna** meta tag de Twitter Card (a diferencia de `index.html`, que sí las tiene) — compartir el link de "En Fotos" en Twitter/X hoy no genera preview con imagen. Además, ninguna de las dos páginas define `og:image:width`/`og:image:height`/`og:image:alt`, `og:locale` ni `og:site_name` — propiedades recomendadas por el protocolo Open Graph que evitan que Facebook/LinkedIn/WhatsApp tengan que descargar la imagen para inferir su tamaño antes de mostrar la preview.

## What Changes

- Agregar a `en-fotos/index.html` las meta tags de Twitter Card que ya tiene `index.html` (`twitter:card`, `twitter:title`, `twitter:description`, `twitter:image`).
- Agregar a ambas páginas: `og:image:width`, `og:image:height`, `og:image:alt`, `og:locale` (`es_AR`), `og:site_name` (`Turismo Ensenada`).
- No se toca el resto del SEO ya implementado (title, description, canonical, JSON-LD, sitemap, robots.txt) — ya está bien.
- No se encara "páginas por lugar" ni "OG por sección" — son la misma feature grande futura, ya evaluada y con trigger definido en `openspec/specs/stack-decision-record/`.

## Capabilities

### New Capabilities
- `social-sharing-metadata`: ambas páginas del sitio tienen metadata completa de Open Graph y Twitter Card para compartir en redes sociales.

### Modified Capabilities
(ninguna)

## Impact

- Archivos afectados: `index.html`, `en-fotos/index.html` (solo el `<head>`).
- No afecta el contenido visible del sitio, CSS ni JS.
- Riesgo: ninguno. Cambio de metadata pura, verificable con herramientas de debug de OG (Facebook Sharing Debugger, Twitter Card Validator) o inspección directa del HTML.
