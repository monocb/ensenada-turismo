## Context

`index.html:14-28` tiene OG completo + Twitter Card. `en-fotos/index.html:14-21` tiene OG (título, descripción, tipo, url, imagen) pero **cero** meta tags `twitter:*`. Ninguna de las dos páginas define `og:image:width`, `og:image:height`, `og:image:alt`, `og:locale` u `og:site_name`.

Dimensiones reales de las imágenes OG en uso (verificadas con `ffprobe`):
- `index.html` → `assets/portada-home/portada-01-aerea.webp`: 1673×835.
- `en-fotos/index.html` → `assets/aerea-costa-punta-lara.jpg`: 1280×720.

Ambas superan el mínimo recomendado por Facebook para preview grande (1200×630).

## Goals / Non-Goals

**Goals:**
- Que ambas páginas tengan Twitter Card completo.
- Que ambas páginas declaren `og:image:width`/`height`/`alt`, `og:locale`, `og:site_name`.

**Non-Goals:**
- No se agregan imágenes OG nuevas ni se cambian las existentes — ya cumplen el tamaño mínimo recomendado.
- No se agrega JSON-LD a `en-fotos/index.html` (índice tiene `TouristInformationCenter`, en-fotos no tiene structured data propia) — no estaba en el alcance que confirmaste, y agregar un schema.org type apropiado (`ImageGallery`/`CollectionPage`) amerita su propia decisión de diseño, no un agregado apurado.

## Decisions

**Valores elegidos:**
- `og:locale`: `es_AR` (español, Argentina — coincide con `<html lang="es-AR">` ya presente en ambas páginas).
- `og:site_name`: `Turismo Ensenada` (nombre de marca consistente con el resto del sitio).
- `og:image:alt` en `index.html`: `"Vista aérea de Ensenada"` (describe la imagen real en uso, `portada-01-aerea.webp`).
- `og:image:alt` en `en-fotos/index.html`: `"Costa de Ensenada vista desde el aire"` (coincide exactamente con el `alt` que la misma imagen ya tiene en `index.html:146`, donde se reutiliza como imagen del brand-line "En Fotos").
- Twitter Card de `en-fotos/index.html`: mismo patrón que `index.html` (`summary_large_image`, título/descripción calcados de los `og:title`/`og:description` ya existentes de esa página, imagen = la misma `og:image` ya en uso).

## Risks / Trade-offs

Ninguno — cambio de metadata pura, sin lógica ni renderizado visible afectado.

## Migration Plan

1. Agregar las meta tags faltantes a `en-fotos/index.html` (Twitter Card completo + las 5 propiedades OG recomendadas).
2. Agregar las 5 propiedades OG recomendadas a `index.html` (ya tiene Twitter Card completo).
3. Verificar el HTML resultante manualmente (o con un validador de Open Graph) antes de subir.
4. Commit + push a `main` → deploy automático.
5. Rollback: revertir el commit si algo no valida bien — cambio aislado a metadata.

## Open Questions

Ninguna.
