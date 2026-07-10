# Convenciones de CSS

## `styles.css` creció por parches, no por diseño de arquitectura

El archivo tiene ~7.9k líneas y creció a fuerza de comentarios fechados marcando correcciones puntuales, por ejemplo:

```css
/* Correccion urgente modal localidades... 2026-07-05 */
/* Puesta a punto responsive final 2026-07-05 */
```

Como consecuencia, hay **4 bloques `:root` separados** (verificable con `grep -n "^:root" styles.css`):
- Línea 1: bloque base.
- ~Línea 2062: `/* Tourism refresh inspired by the Canva travel landing reference. */`
- ~Línea 2899: `/* Aplicacion de manual interno de marca Turismo Ensenada v1.0 */`
- ~Línea 5284: `/* Correccion cronologia lateral: Ensenada Historica */`

Antes de agregar una variable CSS nueva, revisar los 4 bloques para no duplicarla (las líneas son aproximadas — el archivo sigue recibiendo parches que las corren).

**No hay tests de regresión visual.** Cualquier refactor "prolijo" del CSS (unificar los `:root`, reordenar secciones) puede romper silenciosamente una corrección mobile puntual de un commit anterior. Si se necesita tocar `styles.css` de forma amplia, hacerlo en un commit aislado y verificar visualmente antes/después en mobile y desktop.

**Convención a seguir para cambios nuevos**: agregar el bloque de estilos al final de la sección relevante con un comentario corto que describa qué corrige o qué agrega (no necesariamente con fecha, pero sí con intención clara), en vez de reescribir reglas existentes salvo que el cambio lo requiera explícitamente.
