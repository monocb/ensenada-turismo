# Turismo Ensenada

Código fuente del sitio [ensenadaturismo.com](https://ensenadaturismo.com).

## Qué es esto

Este repositorio contiene todo el código y las imágenes del sitio web. Antes, los archivos se compartían por Google Drive y se subían "a mano" a Netlify; ahora todo queda guardado con historial de cambios (Git), así nunca se pierde una versión anterior y cualquier cambio queda registrado con fecha y motivo.

## Cómo ver el sitio localmente (antes de publicar un cambio)

No hace falta instalar nada complejo. Con [Node.js](https://nodejs.org) instalado, desde esta carpeta:

```bash
npx serve .
```

Y abrir la dirección que muestre en la terminal (normalmente `http://localhost:3000`).

## Cómo se publica

El sitio se publica automáticamente en Netlify cada vez que se sube (`push`) un cambio a la rama `main` de este repositorio. Ya no hace falta arrastrar archivos manualmente al dashboard de Netlify.

## Documentación

Para quien vaya a trabajar en el código (por ejemplo con Claude Code), toda la documentación del proyecto está indexada en [`docs/README.md`](docs/README.md).
