## 1. HTML

- [x] 1.1 En `index.html`, sección `#recorrido`, cambiar el texto del `<h2>` de "Tres formas de vivir Ensenada" a "IDENTIDAD".
- [x] 1.2 En `index.html`, misma sección, cambiar el texto de `<p class="eyebrow">` de "ENSENADA IDENTIDAD" a "ENSENADA" (sin tocar la clase ni ningún otro atributo).

## 2. CSS

- [x] 2.1 Agregar un bloque de override al final de `styles.css` (con comentario fechado, siguiendo la convención de parches puntuales del archivo) que fije para `.route-copy h2`: `color: #b8440b`, `font-weight: 900`, `text-transform: uppercase`, `font-size: clamp(44px, 7.5vw, 88px)`, `letter-spacing: -0.01em`, `line-height: 0.92`, todos con `!important` para ganar sobre las declaraciones existentes en distintos breakpoints. No modificar ni eliminar las reglas `.route-copy h2` existentes.

## 3. Verificación

- [x] 3.1 Servir el sitio en local (`npx serve .`) y verificar visualmente la sección `#recorrido`: "ENSENADA" chico con la línea naranja, "IDENTIDAD" grande en naranja debajo, sin desbordes horizontales en mobile/tablet/desktop. Confirmado por el usuario.
- [x] 3.2 Confirmar con `grep` que no queda "Tres formas de vivir Ensenada" en `index.html`.
- [x] 3.3 Actualizar la mención de "Tres formas de vivir Ensenada" en `openspec/specs/place-card-visual-consistency/spec.md` (prosa del `WHEN`, sin cambiar el requirement/scenario) para que no quede una referencia desactualizada.

## 4. OpenSpec

- [x] 4.1 Ejecutar `/opsx:sync` para aplicar la spec `recorrido-heading-treatment` a `openspec/specs/`.
- [ ] 4.2 Archivar el cambio con `/opsx:archive` una vez verificada la implementación.
