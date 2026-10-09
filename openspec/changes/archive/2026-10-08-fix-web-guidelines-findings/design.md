## Context

Los ocho defectos salieron de contrastar el sitio con las Web Interface Guidelines. Dos cosas los distinguen de una lista de linter: se verificaron midiendo en un navegador real, y uno de ellos es invisible para cualquier validador.

Ese es el orden de foco. `main` es `display: flex; flex-direction: column` (`styles.css:38`) y dos secciones llevan `order: 20` y `order: 21` (`styles.css:471` y `styles.css:6418`). Medido tabulando con Chromium:

```
Visual: inicio > marca > recorrido > historia > fragata > redes
Tab:    inicio > marca > fragata  > redes    > recorrido > historia
```

Ningún validador de HTML detecta esto, porque el HTML es válido. Hace falta ejecutar la página y tabular.

El contexto importa para el alcance: este es el segundo de tres cambios. La baja de Luna Tarumá ya se llevó 6 de las 14 imágenes con rol de botón, y el rediseño visual viene después. Acá no se toca ni la paleta, ni la tipografía, ni la composición.

## Goals / Non-Goals

**Goals:**

- Que el sitio se pueda recorrer con teclado en el orden en que se lee.
- Que un lector de pantalla anuncie acciones donde hay acciones.
- Que el cromo nativo del navegador acompañe al tema oscuro.
- Que nada de esto cambie cómo se ve el sitio.

**Non-Goals:**

- Cambiar paleta, tipografía, espaciado o composición. Es el tercer cambio.
- Convertir en botón cualquier imagen del sitio: sólo las que abren el visor.
- Reorganizar `styles.css`.

## Decisions

### D1 — El orden de foco se arregla moviendo el HTML, no parcheando `tabindex`

Se reordenan las secciones en `index.html` para que el documento quede en el orden visual, y se borran las dos declaraciones `order`.

La alternativa sería dejar el HTML como está y forzar el recorrido con `tabindex` positivos. Es peor: los `tabindex` positivos crean un orden paralelo frágil que hay que mantener a mano cada vez que se agrega un control, y arrastran el mismo problema para el orden de lectura de un lector de pantalla, que sigue el DOM y no el `tabindex`.

Mover markup es más invasivo en el diff pero deja el problema resuelto en la raíz. El criterio de aceptación es que **la página se vea exactamente igual**: se compara con capturas, no a ojo.

*Por qué existía el `order`:* las secciones se escribieron en un orden y después se decidió mostrarlas en otro, y `order` fue el atajo. Es un atajo que funciona para la vista y rompe todo lo demás.

### D2 — Las imágenes activables pasan a `<button>`, copiando el patrón que ya existe

`script.js` ya construye las miniaturas del carrusel como `<button type="button" aria-label="Ampliar foto N de X">` con la `<img>` adentro. Las ocho imágenes sueltas adoptan esa misma forma.

La imagen conserva su `alt` descriptivo y el botón aporta el nombre de la acción. Así un lector de pantalla anuncia la acción y, si la persona quiere, puede leer la descripción de la foto; hoy sólo tiene la descripción y ningún indicio de que se pueda hacer algo con ella.

Esto arrastra un cambio en `script.js`: los handlers que hoy cuelgan de la `<img>` pasan a colgar del botón, y el `keydown` manual de Enter y Espacio desaparece, porque un `<button>` ya lo hace solo. Es menos código, no más.

### D3 — El control de pausa del carrusel aparece sólo cuando hay algo que pausar

La galería de la Fragata se cicla cada 48 segundos, y ya está condicionada a `prefers-reduced-motion`. El control de pausa se agrega con la misma condición: si no hay movimiento, no se inyecta.

Un botón de pausa permanentemente visible sobre una galería quieta sería ruido. Y como la galería es decorativa y de fondo, el control va discreto, sin competir con el contenido de la sección.

*Alternativa descartada:* pausar al hacer hover. No sirve para teclado ni para táctil, que es justamente donde el control hace falta.

### D4 — El cromo nativo se declara una vez, en el lugar donde ya vive el tema

`color-scheme: dark` va en el primer bloque `:root`, junto al resto de los tokens base. `touch-action` y el color de resaltado táctil se aplican con un selector que cubra los controles reales en lugar de repetirse componente por componente, que es como está hoy (`.nav-toggle` y nada más).

Esto es posible justamente porque D2 convierte las imágenes en botones: una vez que todo lo activable es un control nativo, una sola regla los alcanza a todos.

### D5 — El anuncio del lightbox usa una región viva, no un `alert`

Al navegar entre fotos se actualiza un texto en una región `aria-live="polite"` con qué foto es y cuántas hay. `polite` y no `assertive`: la persona pidió el cambio, no hace falta interrumpirla.

### D6 — Las dos reglas con `outline: none` reciben foco propio

En `styles.css:286` y `styles.css:6541` el contorno se suprime dentro de `:focus-visible` y el reemplazo es idéntico al de `:hover`. Se les da un indicador propio. No se retira el tratamiento de hover: se agrega uno distinto para el foco.

## Risks / Trade-offs

- **Reordenar secciones cambia algo visualmente sin que lo notemos** → Se comparan capturas de página completa antes y después, en escritorio y teléfono, y se verifica que el alto total y el orden visual no cambiaron.
- **El CSS depende del orden del DOM en algún selector** → Hay que buscar selectores de hermano adyacente o `:nth-child` sobre las secciones movidas antes de mover nada. Si existen, se ajustan en el mismo paso.
- **Convertir imágenes en botones rompe el layout** → Un `<button>` trae estilos propios del navegador. Se neutralizan con un reset local, y se verifica que la foto conserva tamaño, proporción y recorte.
- **El botón de pausa no entra en el diseño de la sección** → Se ubica discreto sobre la galería; si estorba visualmente, el requisito admite ubicarlo donde funcione mejor mientras siga siendo alcanzable por teclado.
- **`color-scheme: dark` cambia el aspecto de algo inesperado** → El sitio no tiene formularios ni `<select>`, así que el alcance real es barras de scroll. Se revisa en las tres páginas.

## Migration Plan

1. Buscar dependencias del orden del DOM en CSS y JS antes de mover nada.
2. Reordenar secciones y retirar las reglas `order`. Verificar con capturas que no cambió nada visual.
3. Convertir las ocho imágenes a botones y simplificar los handlers.
4. El resto de los arreglos, que son puntuales e independientes entre sí.
5. Verificar: tabular las tres páginas de punta a punta, linters del CI, consola limpia, capturas comparadas.
6. Actualizar `docs/pendientes/accesibilidad.md`, que hoy dice que no hay nada pendiente.

Rollback: `git revert`. Ningún cambio toca datos ni rutas.

## Open Questions

Ninguna bloqueante. Una decisión de diseño que se resuelve mirándolo: dónde ubicar exactamente el control de pausa de la galería para que sea visible sin competir con el título de la sección.
