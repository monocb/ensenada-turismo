# CLAUDE.md

Contexto operativo para trabajar en este repo. Documentación completa e indexada en [`docs/README.md`](docs/README.md) — este archivo es un resumen corto, no la duplica.

## Qué es el proyecto

Sitio de turismo para **Ensenada, provincia de Buenos Aires, Argentina** — no confundir con Ensenada, Baja California. Tono de marca: río, cultura, historia, memoria, orgullo local. *"No mostramos Ensenada porque sea perfecta. La mostramos porque es nuestra."* Detalle en [`docs/proyecto/mision-y-objetivos.md`](docs/proyecto/mision-y-objetivos.md) y [`docs/marca/identidad.md`](docs/marca/identidad.md).

## Stack

HTML/CSS/JS estático plano. **Sin build, sin dependencias, sin `package.json` — no agregar ninguno de estos sin consultar primero.** Deploy en Netlify, dominio `ensenadaturismo.com`.

## Cómo previsualizar en local

No hay dev server. Servir la carpeta con cualquier servidor estático, por ejemplo:

```bash
npx serve .
```

## Mapa de carpetas

`index.html` / `en-fotos/index.html` / `404.html` son las páginas. `script.js` y `styles.css` concentran todo el JS y CSS del sitio. `assets/` tiene una subcarpeta por sección (`fragata/`, `historia/`, `identidad/`, `lugares/`, `portada-home/`, `en-fotos/`). Detalle completo en [`docs/tecnico/arquitectura-del-sitio.md`](docs/tecnico/arquitectura-del-sitio.md).

## Cómo agregar una foto a una galería

Copiar el archivo (`.webp`) a `assets/en-fotos/<categoria>/` y agregar la entrada correspondiente en `assets/en-fotos/manifest.json` (mismo esquema: `category`/`title`/`location`/`source`/`label`/`file`). No hace falta tocar `script.js` ni `index.html`.

## Aviso sobre `styles.css`

Es grande (~7.9k líneas) y creció por comentarios fechados de parches puntuales, con **dos bloques `:root` separados** (uno al inicio, otro ~línea 2062). No hay tests de regresión visual — evitar reorganizaciones amplias del archivo; seguir el mismo patrón de agregar/corregir puntualmente. Detalle en [`docs/tecnico/convenciones-de-codigo.md`](docs/tecnico/convenciones-de-codigo.md).

## Antes de tocar colores o textos de marca

Revisar [`docs/marca/`](docs/marca/) — hay una paleta y un tono de marca definidos en el Manual Interno de Marca que no necesariamente coinciden todavía con el CSS actual.

## Pendientes conocidos

Bugs de mobile, estado de SEO/accesibilidad y funcionalidades futuras (concursos, páginas por lugar) están documentados en [`docs/pendientes/`](docs/pendientes/) y [`docs/proyecto/funcionalidades-futuras.md`](docs/proyecto/funcionalidades-futuras.md) — no asumir su estado sin verificar.
