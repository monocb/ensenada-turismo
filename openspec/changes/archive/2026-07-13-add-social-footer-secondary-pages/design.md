## Context

`index.html` tiene un `<footer class="site-footer" id="contacto">` (líneas 432-458) con 3 columnas: marca, navegación del sitio, y enlaces a redes sociales. `en-fotos/index.html` y `404.html` no tienen ningún `<footer>`. El componente CSS (`.site-footer` y clases relacionadas) ya está definido globalmente en `styles.css` con su propio fondo oscuro (`background: var(--brand-night)`), así que no depende de la página en la que se use.

## Goals / Non-Goals

**Goals:**
- Que `en-fotos/index.html` y `404.html` tengan el mismo footer con enlaces a redes sociales que ya tiene `index.html`.

**Non-Goals:**
- No se personaliza el footer por página (mismo contenido en las 3 páginas, incluyendo los mismos links de navegación del sitio).
- No se toca ningún otro componente de ninguna de las dos páginas.

## Decisions

- **Copiar el markup del footer tal cual, sin adaptarlo** — alternativa considerada: extraer el footer a un include/template compartido (descartada: el stack es HTML estático plano sin build ni includes, per `CLAUDE.md`; duplicar el bloque de markup es el patrón ya usado en el resto del sitio para elementos compartidos entre páginas, ej. el header).
- **Mismos links de navegación del sitio en las 3 páginas** (Inicio, En Fotos, Descubrí, Identidad, Cultura, Historia, Fragata — todos apuntando a `index.html` con anchors) — alternativa considerada: omitir la navegación y dejar solo los links de redes sociales en las páginas secundarias (descartada: la navegación completa ya funciona correctamente como links cross-page desde cualquier página, y mantiene consistencia visual/funcional total con el footer de la home).

## Risks / Trade-offs

- [En `en-fotos/index.html`, el link "En Fotos" del footer apuntaría a la propia página] → Mitigación: no es un problema funcional (el link sigue siendo válido, solo redundante); no se trata como caso especial para mantener el footer idéntico en las 3 páginas y no introducir lógica condicional en HTML estático.

## Migration Plan

- Cambio de solo-agregar (nunca se borra nada existente); revertir es un `git revert` si algo se ve mal en la Deploy Preview.
- Verificación: abrir la Deploy Preview de Netlify y confirmar que el footer aparece al final de `/en-fotos/` y `/404` (probando una URL inexistente), con los 3 enlaces de redes sociales funcionando.
