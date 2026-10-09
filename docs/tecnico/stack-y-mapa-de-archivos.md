# Stack y mapa de archivos

## Stack

HTML/CSS/JS estático plano. **Sin framework, sin build, sin dependencias, sin `package.json`.** No agregar ninguno de estos sin consultar primero — es una decisión deliberada, no un descuido.

## Mapa de archivos

```
index.html          página principal
en-fotos/index.html galería de fotos ("En Fotos")
404.html             página de error
script.js            todo el JS del sitio (menú, carrusel, lightbox, modales de lugares)
assets/css/base.css      tokens del manual, base, encabezado, pie, visor (las 3 páginas)
assets/css/home.css      secciones de la portada
assets/css/en-fotos.css  portada de la página de fotos y carretes
assets/css/error.css     404
styles.css           hoja histórica, ya no la carga nadie (ver convenciones-css.md)
_redirects           reglas de redirect de Netlify
netlify.toml         publish = "."
robots.txt / sitemap.xml
assets/              imágenes, organizadas por sección (ver abajo)
```

## Convención de `assets/`

Una subcarpeta por sección/lugar: `en-fotos/`, `fragata/`, `historia/`, `identidad/`, `intro/`, `lugares/`, `portada-home/`. Las imágenes sueltas en la raíz de `assets/` (hero, cultura-*, etc.) son usadas directamente por `index.html`.

## Ver también

El patrón de galería (atributos `data-photo-*`) está documentado aparte en [`patron-galerias-data-attributes.md`](patron-galerias-data-attributes.md).
