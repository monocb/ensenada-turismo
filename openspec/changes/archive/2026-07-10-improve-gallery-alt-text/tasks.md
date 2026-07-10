## 1. Implementar el nuevo template de alt

- [x] 1.1 En `script.js` (`setupPhotoReelSection`), agregar una función auxiliar que derive un texto legible a partir de `folder`/`prefix` (reemplazar guiones por espacios, capitalizar cada palabra)
- [x] 1.2 Cambiar la línea `image.alt = title ? \`${title}, foto ${number}\` : "Foto de Ensenada"` para: si hay `title`, incluir `location` cuando exista (`"${title} en ${location}, foto ${number}"`, o `"${title}, foto ${number}"` si no hay `location`); si no hay `title`, usar el texto derivado del folder/prefix en vez de "Foto de Ensenada"

## 2. Verificación

- [x] 2.1 Levantar el sitio localmente y abrir `en-fotos/index.html`
- [x] 2.2 Inspeccionar el DOM (o usar el inspector de accesibilidad del navegador) y confirmar que las fotos de las 3 secciones existentes (Parroquia del Dique, Stella Maris, Domingo en Punta Lara) tienen `alt` con título + ubicación
- [x] 2.3 Confirmar que el lightbox sigue mostrando el `alt` heredado correctamente al abrir una foto

## 3. Deploy

- [x] 3.1 Commit + push a `main`
- [x] 3.2 Verificar en producción (`ensenadaturismo.com/en-fotos/`) que el `alt` de las fotos se actualizó (inspeccionar DOM)
