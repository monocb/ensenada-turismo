## 1. HTML

- [x] 1.1 En `index.html`, sección `#recorrido`, eliminar por completo la línea `<p class="eyebrow">ENSENADA</p>`, dejando solo `<h2>IDENTIDAD</h2>` dentro de `.route-copy`.

## 2. CSS

- [x] 2.1 En `styles.css`, junto al bloque `.route-copy h2` ya agregado (comentario "Ajuste 2026-07-13: #recorrido usa 'IDENTIDAD'..."), agregar `.route-copy h2::before` con: `content: ""`, `display: block`, `width: clamp(64px, 8vw, 120px)`, `height: 3px`, `margin: 0 auto 16px`, `background: currentColor` (hereda el naranja `#b8440b` del `<h2>`). Ancho ajustado de `clamp(48px, 6vw, 84px)` a `clamp(64px, 8vw, 120px)` tras feedback visual del usuario ("la línea un poco más larga").

## 3. Verificación

- [x] 3.1 Servir el sitio en local (`npx serve .`) y verificar visualmente la sección `#recorrido`: sin la palabra "ENSENADA", con una barra naranja corta y centrada arriba de "IDENTIDAD" (no un subrayado de ancho completo), en mobile/tablet/desktop. Confirmado por el usuario.
- [x] 3.2 Confirmar con `grep` que no queda `<p class="eyebrow">` dentro de la sección `#recorrido` en `index.html`.

## 4. OpenSpec

- [x] 4.1 Ejecutar `/opsx:sync` para aplicar la spec delta a `openspec/specs/recorrido-heading-treatment/`.
- [ ] 4.2 Archivar el cambio con `/opsx:archive` una vez verificada la implementación.
