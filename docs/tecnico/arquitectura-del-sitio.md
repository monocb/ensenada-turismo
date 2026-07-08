# Arquitectura del sitio

## Stack

HTML/CSS/JS estático plano. **Sin framework, sin build, sin dependencias, sin `package.json`.** No agregar ninguno de estos sin consultar primero — es una decisión deliberada, no un descuido.

## Mapa de archivos

```
index.html          página principal
en-fotos/index.html galería de fotos ("En Fotos")
404.html            página de error
script.js           todo el JS del sitio (menú, carrusel, lightbox, modales de lugares)
styles.css          todo el CSS del sitio (~7.9k líneas, ver convenciones-de-codigo.md)
_redirects          reglas de redirect de Netlify
netlify.toml        publish = "."
robots.txt / sitemap.xml
assets/             imágenes, organizadas por sección (ver abajo)
```

## Convención de `assets/`

Una subcarpeta por sección/lugar: `en-fotos/`, `fragata/`, `historia/`, `identidad/`, `intro/`, `lugares/`, `portada-home/`. Las imágenes sueltas en la raíz de `assets/` (hero, cultura-*, etc.) son usadas directamente por `index.html`.

## Patrón de galería: `assets/en-fotos/manifest.json`

La galería "En Fotos" no está hardcodeada en HTML: se genera a partir de un array plano de objetos en `assets/en-fotos/manifest.json`, con este esquema:

```json
{
  "category": "parroquia-el-dique",
  "title": "Parroquia del Dique",
  "location": "Barrio El Dique",
  "source": "469258864_594089133011455_8921775405858934384_n.jpg",
  "label": "469258864 594089133011455 8921775405858934384 n",
  "file": "assets/en-fotos/parroquia-el-dique/parroquia-el-dique-01.webp"
}
```

**Para agregar una foto nueva a una galería**: copiar el archivo (convertido a `.webp`) a la subcarpeta correspondiente de `assets/en-fotos/<categoria>/`, y agregar una entrada nueva a `manifest.json` con el mismo esquema. No hace falta tocar `script.js` ni `index.html`.
