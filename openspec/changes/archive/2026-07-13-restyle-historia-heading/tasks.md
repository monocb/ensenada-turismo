## 1. HTML

- [x] 1.1 En `index.html`, sección `#historia`, eliminar `<p class="eyebrow">ENSENADA HISTORIA</p>`.
- [x] 1.2 Cambiar el texto del `<h2>` de "Fuerte Barragán" a "HISTORIA".
- [x] 1.3 Insertar `<p class="heritage-subtitle">Fuerte Barragán</p>` entre el `<h2>` y el `<p>` de descripción existente.

## 2. CSS

- [x] 2.1 Agregar al final de `styles.css` (comentario fechado) un override para `.heritage h2`: `color: #173f78 !important` (`var(--brand-doc)`), `font-size: clamp(44px, 7.5vw, 88px) !important`, `font-weight: 900 !important`, `line-height: 0.92 !important`, `letter-spacing: -0.01em !important`, `text-transform: uppercase !important`.
- [x] 2.2 Agregar `.heritage h2::before`: `display: block`, `width: clamp(64px, 8vw, 120px)`, `height: 3px`, `margin: 0 0 16px` (alineado a la izquierda, sin `auto`), `content: ""`, `background: currentColor`.
- [x] 2.3 Agregar `.heritage-subtitle`: color `var(--brand-night)`, `font-size: clamp(28px, 3.2vw, 42px)`, `font-weight: 900`, `line-height: 1`, sin `text-transform` (mayúscula inicial normal, como se mostraba antes "Fuerte Barragán"), con margen inferior antes del párrafo de descripción.
- [x] 2.4 Eliminar la regla `.heritage .eyebrow { color: var(--gold); }` (huérfana).

## 3. Verificación

- [x] 3.1 Servir el sitio en local (`npx serve .`) y verificar visualmente la sección `#historia`: sin "ENSENADA", "HISTORIA" grande en azul con barra corta alineada a la izquierda arriba, "Fuerte Barragán" como subtítulo, descripción debajo, sin desbordes en mobile/tablet/desktop. Confirmado por el usuario.
- [x] 3.2 Confirmar con `grep` que no queda `ENSENADA HISTORIA` ni `<p class="eyebrow">` dentro de la sección `#historia` en `index.html`.

## 4. OpenSpec

- [x] 4.1 Ejecutar `/opsx:sync` para aplicar la spec `historia-heading-treatment` y el delta REMOVED de `eyebrow-color-consistency` a `openspec/specs/`.
- [ ] 4.2 Archivar el cambio con `/opsx:archive` una vez verificada la implementación.
