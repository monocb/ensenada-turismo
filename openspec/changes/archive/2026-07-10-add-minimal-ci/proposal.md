## Why

`docs/pendientes/` y la auditoría original de este proyecto señalan la falta de CI como el mayor riesgo operativo: no hay ningún chequeo automático antes de que Netlify despliegue a producción. Elegiste explícitamente el alcance mínimo (lint HTML/CSS + link checker, sin regresión visual con baselines) para no sumar mantenimiento de screenshots de referencia.

## What Changes

- Agregar un workflow de GitHub Actions (`.github/workflows/ci.yml`) que corre en cada push y pull request: valida HTML (`html-validate`), valida sintaxis de CSS (`stylelint`, sin reglas de estilo) y chequea links/imágenes rotos (`linkinator`) contra el sitio servido localmente.
- Agregar `.htmlvalidate.json` con una configuración pragmática: desactiva 4 reglas por ser falsos positivos contra patrones intencionales del sitio (`void-style`, `prefer-native-element`, `attribute-allowed-values`, `empty-heading` — este último grupo por los placeholders `src=""`/`<h3></h3>` que JS llena en runtime), y desactiva 3 reglas que señalan hallazgos de accesibilidad reales pero nuevos, no descubiertos hasta ahora — quedan documentados en `docs/pendientes/accesibilidad.md` para un cambio futuro, no se arreglan acá para no salirse del alcance "mínimo".
- Corregir `<!doctype html>` → `<!DOCTYPE html>` en las 3 páginas (`index.html`, `en-fotos/index.html`, `404.html`) — único fix de contenido de este cambio, trivial y sin riesgo, necesario para que el chequeo de HTML arranque limpio.
- **No se agrega `package.json` al repo** — todas las herramientas se invocan vía `npx` directamente en el workflow de CI, que corre en el runner de GitHub Actions, no en el sitio desplegado. La convención "sin build/dependencias" de `CLAUDE.md` aplica al sitio servido por Netlify, no a herramientas de CI que nunca se despliegan.
- **Este CI es informativo, no bloquea el deploy**: Netlify ya hace deploy automático en cada push a `main`, independientemente del resultado de GitHub Actions. Convertirlo en un gate real requeriría configurar Netlify para esperar un check de GitHub — fuera de alcance de este cambio mínimo.

## Capabilities

### New Capabilities
- `ci-quality-gate`: el repositorio tiene chequeos automáticos de HTML/CSS/links en cada push, ejecutados en GitHub Actions.

### Modified Capabilities
(ninguna)

## Impact

- Archivos nuevos: `.github/workflows/ci.yml`, `.htmlvalidate.json`, `.stylelintrc.json`.
- Archivos modificados: `index.html`, `en-fotos/index.html`, `404.html` (solo el doctype), `docs/pendientes/accesibilidad.md` (nuevos hallazgos documentados).
- No afecta el sitio desplegado ni su comportamiento — el workflow corre en GitHub, no en Netlify.
- Riesgo: bajo. Probé cada herramienta contra los archivos reales del repo antes de escribir esta propuesta: `html-validate` con la config propuesta da 0 problemas (tras el fix de doctype), `stylelint` sin reglas de estilo (solo sintaxis) da 0 problemas, `linkinator` escaneó 38 links sin encontrar ninguno roto.
