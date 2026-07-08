# SEO y accesibilidad

## Ya implementado

`index.html` ya tiene: `title`, meta description, canonical, Open Graph (título/descripción/imagen), Twitter card, JSON-LD de tipo `TouristInformationCenter`, `sitemap.xml` y `robots.txt`. No dar por sentado que falta esto — verificar el `<head>` de `index.html` antes de "agregar" SEO básico de nuevo.

## Pendiente de revisar

- **SEO**: páginas individuales para puntos turísticos (ver [`docs/proyecto/funcionalidades-futuras.md`](../proyecto/funcionalidades-futuras.md)); Open Graph image por sección en vez de una sola imagen genérica.
- **Accesibilidad**: contraste de texto sobre imágenes, `alt` descriptivo real en todas las imágenes (no solo nombre de archivo), foco visible en elementos interactivos, `aria-expanded` en el menú mobile, orden correcto de headings, que los carruseles/lightbox sean navegables por teclado.
- **Performance**: imágenes sin optimizar (varias por encima de 500KB, ver `assets/portada-home/` e `historia/`), falta `loading="lazy"` y `srcset` para variantes mobile. No usar Git LFS para esto — la solución es optimizar/comprimir antes de subir, no cambiar cómo se versiona.

## Seguridad

No hay backend, formularios ni funciones serverless hoy, así que la superficie de riesgo es baja. Si se agregan formularios (por ejemplo para el concurso fotográfico), sumar validación, protección antispam y usar variables de entorno de Netlify para cualquier clave — nunca hardcodear tokens en el frontend.
