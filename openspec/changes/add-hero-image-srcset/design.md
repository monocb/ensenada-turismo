## Context

`index.html:92-99`, sección `.hero-gallery` (`position: absolute; inset: 0`, dentro de `.hero` que ocupa todo el ancho del viewport): 8 `<img class="hero-image hero-slide">` rotando vía animación CSS (`heroPhotoFade`). Cada una hoy sirve un único archivo a resolución completa (1434-2200px de ancho), sin importar el tamaño real de pantalla.

Herramienta disponible: `ffmpeg` con `libwebp` (ya usado en el ciclo `compress-oversized-images`), con el filtro `scale` para generar variantes redimensionadas.

## Goals / Non-Goals

**Goals:**
- Que el navegador elija automáticamente la variante de imagen apropiada según el ancho real del viewport y la densidad de píxeles del dispositivo (`devicePixelRatio`).
- Reducir el peso descargado en mobile sin degradar la calidad visual perceptible.

**Non-Goals:**
- No se tocan las imágenes de Fragata, Historia, Cultura, ni las galerías dinámicas de en-fotos — alcance de un cambio futuro aparte.
- No se cambia el mecanismo de rotación del hero (`script.js`/animación CSS) — solo el atributo de origen de cada `<img>`.

## Decisions

**3 anchos generados por imagen: 480w, 900w, 1400w — más el archivo original como la variante más grande.**
Elegidos para cubrir bien la combinación ancho-de-viewport × densidad-de-píxeles de dispositivos reales, no solo el ancho CSS:
- Celular gama baja/DPR 1 (375px): pide ≥375px → matchea 480w.
- Celular moderno DPR 2 (375-430px): pide ≥750-860px → matchea 900w.
- Celular moderno DPR 3 (375-430px, ej. iPhone): pide ≥1125-1290px → matchea 1400w.
- Tablet/notebook chica: 900w-1400w según ancho real.
- Desktop grande: el archivo original (1434-2200w).

Se descartó usar solo 2 anchos (480w/900w): un celular DPR 3 (`devicePixelRatio: 3`, común en gama media-alta) necesita hasta 1290px reales para verse nítido a 430px CSS — con solo 480w/900w ese caso terminaría usando el archivo original de todos modos, perdiendo buena parte del ahorro.

**`sizes="100vw"`** — correcto dado que las imágenes ocupan siempre el 100% del ancho del viewport (`position: absolute; inset: 0` dentro de una sección full-bleed), sin excepciones por breakpoint.

**Convención de nombre: `<nombre-original>-<ancho>w.webp`** (ej. `portada-01-aerea-480w.webp`), en la misma carpeta que el original. Sigue el patrón de nombrado descriptivo ya usado en el resto del repo (`portada-01-aerea`, `portada-02-barquito`, etc.), sin necesitar subcarpetas nuevas.

## Risks / Trade-offs

- **[Riesgo] 24 archivos nuevos (~1.7MB) suman peso al repositorio Git, aunque reducen el peso servido a cada visitante.** → Aceptado: el repo ya es mayormente binario (imágenes), y el ahorro de transferencia en cada visita mobile supera ampliamente el costo único de almacenamiento en git.
- **[Riesgo] Mantenimiento futuro: si se reemplaza o agrega una imagen de portada, hay que regenerar sus 3 variantes.** → Mitigación: documentar el comando de `ffmpeg` usado en `docs/tecnico/` para que sea repetible sin tener que redescubrirlo.
- **[Riesgo] Ninguno operacional** — cambio de atributos HTML + archivos de imagen adicionales, sin tocar JS/CSS.

## Migration Plan

1. Generar las 24 variantes (ya generadas y revisadas visualmente antes de esta propuesta).
2. Copiar las variantes a `assets/portada-home/`.
3. Agregar `srcset`/`sizes` a los 8 `<img>` en `index.html`.
4. Verificar en el navegador (DevTools, distintos anchos de viewport simulados) que cada breakpoint carga la variante esperada.
5. Actualizar `docs/pendientes/performance.md` (tachar `srcset` como resuelto para el hero, aclarar que el resto del sitio queda pendiente) y `docs/tecnico/` con el comando de `ffmpeg` para regenerar variantes.
6. Commit + push a `main` → deploy automático.
7. Rollback: revertir el commit — cambio aislado a `index.html` + archivos de imagen nuevos, no borra los originales.

## Open Questions

Ninguna.
