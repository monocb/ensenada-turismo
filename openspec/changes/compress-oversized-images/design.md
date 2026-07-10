## Context

`docs/pendientes/performance.md` señala imágenes sin optimizar como pendiente. Verificado con `find assets -size +500k`, hay exactamente 3 archivos que superan ese umbral (de 128 imágenes totales en `assets/`): `portada-home/portada-06-flavio.webp` (764KB), `fuerte-barragan.jpg` (552KB) y `historia/1990-vieja-estacion.jpg` (566KB, sin referencias en el HTML actual).

Herramienta disponible en este entorno: `ffmpeg` (con soporte `libwebp` y `mjpeg`), sin necesidad de instalar nada nuevo — no cuenta como agregar una dependencia al proyecto (es una herramienta de compresión de assets usada una vez, no un paso de build).

## Goals / Non-Goals

**Goals:**
- Que ninguna imagen del repo supere 500KB.
- Que el cambio sea puramente de reemplazo de archivo binario, sin tocar HTML/CSS/JS.
- Verificar visualmente que no haya artefactos de compresión perceptibles antes de subir.

**Non-Goals:**
- No se genera `srcset`/variantes responsive — alcance de un cambio futuro aparte.
- No se convierte ningún `.jpg` a `.webp` (aunque daría mejor compresión) — cambiar el formato de archivo implicaría actualizar las referencias en `index.html`, aumentando el alcance de un cambio que hoy es intencionalmente quirúrgico.
- No se re-optimizan las imágenes por debajo de 500KB, aunque algunas podrían comprimirse más — el umbral ya documentado (500KB) es el criterio de corte.

## Decisions

**Comandos usados (mismo formato de salida, sin cambiar extensión):**
```bash
ffmpeg -y -i assets/portada-home/portada-06-flavio.webp -c:v libwebp -quality 60 assets/portada-home/portada-06-flavio.webp
ffmpeg -y -i assets/fuerte-barragan.jpg -q:v 4 assets/fuerte-barragan.jpg
ffmpeg -y -i assets/historia/1990-vieja-estacion.jpg -q:v 6 assets/historia/1990-vieja-estacion.jpg
```

**Calidad elegida por archivo, no un valor único para los 3.** Cada imagen tiene contenido distinto (foto aérea nítida, textura de ladrillo, foto de archivo en blanco y negro con grano) — se probó cada una por separado hasta encontrar el punto donde el peso baja considerablemente sin artefactos visibles, en vez de aplicar una calidad fija arbitraria a los 3.

**Se mantiene el mismo nombre de archivo y formato.** Reemplazo in-place — cero cambios en `index.html` (los 4 `<img src="...">` que referencian estos archivos siguen apuntando al mismo path).

## Risks / Trade-offs

- **[Riesgo] Compresión con pérdida siempre implica algún trade-off de calidad, aunque no sea perceptible a simple vista.** → Mitigación: se verificó visualmente cada imagen comprimida contra el umbral elegido antes de escribir esta propuesta; si en la revisión de la tarea de verificación se nota degradación, subir la calidad y volver a comprimir antes de aplicar.
- **[Riesgo] `1990-vieja-estacion.jpg` no está en uso hoy — comprimirla es esfuerzo en algo no visible todavía.** → Aceptado como trade-off menor: el costo es el mismo comando ya ejecutado, no hay motivo para dejarla sin optimizar solo porque todavía no se usa.

## Migration Plan

1. Reemplazar los 3 archivos con las versiones comprimidas ya generadas y verificadas.
2. Confirmar tamaños finales con `ls -la` / `find -size +500k` (debería devolver 0 resultados).
3. Verificar visualmente en el sitio local que las 4 apariciones de estas imágenes (hero slide, 2x en sección Historia, preview de video) se ven bien.
4. Actualizar `docs/pendientes/performance.md`.
5. Commit + push a `main` → deploy automático.
6. Rollback: revertir el commit si se nota degradación visual en producción — los archivos originales quedan en el historial de git.

## Open Questions

Ninguna.
