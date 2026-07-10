# Convenciones de CSS

## `styles.css` creció por parches, no por diseño de arquitectura

El archivo tiene ~7.9k líneas y creció a fuerza de comentarios fechados marcando correcciones puntuales, por ejemplo:

```css
/* Correccion urgente modal localidades... 2026-07-05 */
/* Puesta a punto responsive final 2026-07-05 */
```

Como consecuencia, hay **dos bloques `:root` separados**: uno al inicio del archivo, y otro más adelante (~línea 2062) para una paleta "travel" agregada después. Antes de agregar una variable CSS nueva, revisar ambos bloques para no duplicarla.

**No hay tests de regresión visual.** Cualquier refactor "prolijo" del CSS (unificar los `:root`, reordenar secciones) puede romper silenciosamente una corrección mobile puntual de un commit anterior. Si se necesita tocar `styles.css` de forma amplia, hacerlo en un commit aislado y verificar visualmente antes/después en mobile y desktop.

**Convención a seguir para cambios nuevos**: agregar el bloque de estilos al final de la sección relevante con un comentario corto que describa qué corrige o qué agrega (no necesariamente con fecha, pero sí con intención clara), en vez de reescribir reglas existentes salvo que el cambio lo requiera explícitamente.
