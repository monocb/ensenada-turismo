# Patrón de galería: atributos `data-photo-*`

Las galerías de fotos (la sección "En Fotos" y los carruseles tipo "carrete" del home) no se generan desde un archivo de datos: `script.js` (`setupPhotoReelSection()`) las arma en tiempo de carga leyendo atributos `data-photo-*` de la sección contenedora en el HTML, y generando las URLs de imagen de forma secuencial.

## Esquema

En el HTML, la sección de la galería declara:

```html
<section data-photo-reel-section
          data-photo-folder="parroquia-el-dique"
          data-photo-prefix="parroquia-el-dique"
          data-photo-count="19"
          data-photo-title="Parroquia del Dique"
          data-photo-location="Barrio El Dique">
  <div data-photo-reel></div>
  <button data-photo-reel-prev>...</button>
  <button data-photo-reel-next>...</button>
</section>
```

`script.js` genera automáticamente `data-photo-count` imágenes, con `src` = `/assets/en-fotos/<folder>/<prefix>-<NN>.webp` (numeración secuencial de `01` a `count`, con cero a la izquierda). El `alt` de cada imagen se arma a partir de `data-photo-title`/`data-photo-location`.

## Caso de uso: agregar una foto nueva a una galería existente

1. Convertir la foto a `.webp` y nombrarla con el siguiente número secuencial: si la galería tiene `data-photo-count="19"`, la foto nueva es `<prefix>-20.webp`.
2. Copiarla a `assets/en-fotos/<carpeta>/`.
3. Actualizar `data-photo-count` de esa sección en el HTML (`en-fotos/index.html` u otro archivo, según dónde esté la galería), sumando 1.

**Importante:** a diferencia de lo que sugería una versión anterior de este documento, sí hace falta tocar el HTML (el atributo `data-photo-count`) — no alcanza con copiar el archivo. No existe ningún `manifest.json` ni archivo de datos intermedio; el HTML es la única fuente de verdad.

## Caso de uso: agregar una galería nueva

Duplicar el patrón de una sección `data-photo-reel-section` existente, con `data-photo-folder`/`data-photo-prefix`/`data-photo-count`/`data-photo-title`/`data-photo-location` propios, y crear la carpeta `assets/en-fotos/<carpeta-nueva>/` con los archivos numerados secuencialmente desde `01`.
