## Context

`setupPhotoReelSection` en `script.js:181-234` genera dinámicamente las tarjetas de foto de cada "reel" de `en-fotos/index.html` a partir de atributos `data-photo-*` puestos en el `<section>` contenedor (no de `manifest.json`, que no se usa en este flujo). Ya lee `title`, `location` y `description` desde el dataset (líneas 186-188), pero solo `title` se usa hoy para armar el `alt` de cada `<img>` (línea 204): `image.alt = title ? \`${title}, foto ${number}\` : "Foto de Ensenada"`.

Actualmente hay 3 secciones en `en-fotos/index.html`, todas con `title` definido (Parroquia del Dique, Stella Maris, Domingo en Punta Lara), así que el fallback `"Foto de Ensenada"` no se dispara hoy — pero queda como trampa para la próxima sección que se agregue sin `data-photo-title`.

## Goals / Non-Goals

**Goals:**
- Que el `alt` de cada foto incluya ubicación además de título, usando datos que el HTML ya provee.
- Que el fallback (sin `title`) deje de ser un texto genérico idéntico para todo el sitio.
- Mantener el cambio contenido a la función existente, sin tocar HTML, CSS ni `manifest.json`.

**Non-Goals:**
- No se agrega texto alternativo único por foto individual (cada foto de una misma sección seguirá compartiendo título/ubicación, solo cambia el número) — eso requeriría metadata por foto, que no existe hoy y está fuera de alcance de este cambio puntual.
- No se resuelve el resto del checklist de `docs/pendientes/accesibilidad.md` (contraste, foco visible, navegación por teclado del lightbox) — cada uno amerita su propio cambio.

## Decisions

**Template de `alt`: `"${title} en ${location}, foto ${number}"` cuando hay `title`.**
Usa los dos datos ya disponibles en el dataset de la sección. Alternativa considerada: incluir también `description` en el `alt` — descartada porque `description` es una oración larga pensada para el lightbox/contexto, no para un `alt` (que debe ser conciso); `description` se sigue usando donde ya se usaba (`data-lightbox-description`), sin cambios ahí.

**Evitar duplicar `location` si ya aparece dentro de `title`.**
Detectado en verificación manual: la sección "Domingo en Punta Lara" (título) + "Punta Lara" (ubicación) generaba `"Domingo en Punta Lara en Punta Lara, foto 01"`. Se agrega un chequeo (`title` incluye `location`, case-insensitive) que omite el agregado de `location` cuando ya está contenida en el título.

**Fallback sin `title`: derivar un texto legible del `folder`/`prefix` de la sección en vez de `"Foto de Ensenada"`.**
Por ejemplo, transformar `domingo-punta-lara` → `"Domingo Punta Lara"` (reemplazar guiones por espacios, capitalizar). Es un fallback defensivo — hoy no se dispara porque las 3 secciones existentes ya tienen `title` — pero evita que una futura sección sin `data-photo-title` vuelva a caer en un alt genérico y no descriptivo.

## Risks / Trade-offs

- **[Riesgo] El alt sigue siendo idéntico para todas las fotos de una misma sección (solo cambia el número), no describe el contenido específico de cada imagen.** → Mitigación: aceptado como trade-off — no hay metadata por foto individual en el modelo de datos actual; resolverlo a fondo requeriría un cambio de arquitectura de datos (fuera de alcance, se relaciona con la evaluación de Astro/Eleventy que es un punto aparte del informe).
- **[Riesgo] Ninguno operacional** — es un cambio de texto puro sin lógica nueva, sin red, sin build.

## Migration Plan

1. Editar `image.alt = ...` en `script.js:204` con el nuevo template.
2. Verificar visualmente en `en-fotos/index.html` (local) que las 3 secciones muestren el `alt` esperado (inspeccionar el DOM o pasar un lector de pantalla/axe).
3. Commit + push a `main` → Netlify redeploya automáticamente (sin build, cambio de un archivo estático).
4. Rollback: revertir el commit si algo se ve mal — no hay estado ni datos involucrados.

## Open Questions

Ninguna.
