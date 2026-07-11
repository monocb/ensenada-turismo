## Context

Verificado con `html-validate -p a11y,recommended` (preset `a11y` no está activo en el `.htmlvalidate.json` de CI, que solo extiende `recommended` — por eso estos hallazgos nunca se detectaron automáticamente) sobre las 3 páginas del sitio, y con una prueba de teclado real en Chrome vía Puppeteer (220 pulsaciones de Tab, registrando cada elemento que recibe foco y si tiene un ancestro `[aria-hidden="true"]`).

Hallazgos completos (línea exacta):
- `aria-label-misuse`: `index.html:149` (`.brand-line-grid`), `211` (`.fragata-reel`), `280` (`.place-accordion`), `419` (`.video-panel`); `en-fotos/index.html:96,126,156` (`.photos-reel-controls`, uno por cada carrete de fotos).
- `hidden-focusable`: `index.html:261,263,271` y `en-fotos/index.html:171,172,179` (`.image-lightbox` — botones close/prev/next); `index.html:355` (`.place-modal` — botón "Cerrar").
- `unique-landmark`: `index.html:78` (`.main-nav`).

Prueba de teclado real confirmó:
- `.image-lightbox` en reposo: `display: none` (computado) → 0 de 220 Tabs aterrizaron dentro, en ningún estado cerrado. Falso positivo del análisis estático.
- `.place-modal` en reposo: `opacity: 0; pointer-events: none;` (`display: grid`, sigue en el flujo/orden de foco) → el botón `.place-modal__close` recibió foco reiteradamente durante el recorrido completo de la página. Problema real.

## Goals / Non-Goals

**Goals:**
- Que los 3 hallazgos de `html-validate:a11y` queden resueltos de verdad (no solo silenciados en la config).
- Que la CI detecte una regresión futura de cualquiera de los 3.
- Corregir el tab-stop fantasma real de `.place-modal`, encontrado durante la verificación.

**Non-Goals:**
- No se cambia el diseño visual de ningún componente — todos los cambios son de semántica ARIA/atributos, sin tocar `styles.css`.
- No se agrega un polyfill de `inert` — el soporte nativo en navegadores evergreen (Chrome/Edge/Firefox/Safari, todos desde 2023) es suficiente para el perfil de usuarios de este sitio.

## Decisions

**`role="group"` para los 5 `<div aria-label>`, no `role="region"`.**
`region` crea un landmark nuevo navegable (aparecería en la lista de "regiones" de un lector de pantalla) — apropiado para secciones de contenido principal, no para agrupaciones visuales como un carrete de fotos o una grilla de links. `group` es el rol genérico correcto para "un conjunto de elementos con un nombre accesible que no amerita ser un landmark", evita inflar la lista de landmarks de la página.

**`inert` + `aria-hidden` alternados juntos, en vez de solo agregar `tabindex="-1"` a cada botón interno.**
`inert` es una sola línea por contenedor (en el HTML inicial y en las 2 funciones JS de apertura/cierre) y cubre automáticamente cualquier elemento focuseable interno presente o futuro, sin tener que enumerar y mantener una lista de selectores. Es el mismo mecanismo que ya usa gran parte de la plataforma web moderna para diálogos/modales (por ejemplo, es lo que hace `<dialog>` nativamente).

**Habilitar el preset `html-validate:a11y` en `.htmlvalidate.json` en vez de dejarlo fuera.**
Ya no hay razón para mantenerlo apagado una vez resueltos los 3 hallazgos — dejarlo apagado sería debilitar la cobertura de accesibilidad de la CI sin ningún beneficio. Verificado (ver Impact en `proposal.md`) que no introduce hallazgos nuevos no cubiertos ya por las reglas de estilo desactivadas.

## Risks / Trade-offs

- **[Riesgo] `inert` oculta también el contenido a lectores de pantalla (como `aria-hidden`), duplicando semántica.** → Aceptado: es exactamente el comportamiento deseado (dos mecanismos redundantes reforzando la misma garantía: ni foco de teclado ni exposición a AT mientras está cerrado). No hay conflicto entre ambos.
- Ninguno operacional — cambios de atributos HTML/JS, sin tocar layout ni JS de negocio.

## Migration Plan

1. Agregar `role="group"` a los 5 `<div aria-label>`.
2. Agregar `aria-label="Navegación principal"` a `.main-nav` en ambas páginas.
3. Agregar `inert` al HTML inicial de `.place-modal` y `.image-lightbox` (ambas páginas), y alternarlo en `script.js` junto con `aria-hidden`.
4. Verificar con `html-validate -p a11y,recommended` que los 3 hallazgos desaparecen.
5. Verificar con Puppeteer (teclado real) que el comportamiento de apertura/cierre de lightbox y modal sigue funcionando igual.
6. Actualizar `.htmlvalidate.json` (extender `a11y`, sacar las 3 reglas de la lista "off").
7. Actualizar `docs/pendientes/accesibilidad.md`.
8. Commit + push a `main`.

## Open Questions

Ninguna.
