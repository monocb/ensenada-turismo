# Patrón de galería: `assets/en-fotos/manifest.json`

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

## Caso de uso: agregar una foto nueva a una galería

Copiar el archivo (convertido a `.webp`) a la subcarpeta correspondiente de `assets/en-fotos/<categoria>/`, y agregar una entrada nueva a `manifest.json` con el mismo esquema. No hace falta tocar `script.js` ni `index.html`.
