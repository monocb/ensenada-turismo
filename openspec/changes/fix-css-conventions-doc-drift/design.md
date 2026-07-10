## Context

`docs/tecnico/convenciones-css.md:12` y `CLAUDE.md` (sección "Aviso sobre `styles.css`") dicen que hay "dos bloques `:root` separados". Verificado con `grep -n "^:root" styles.css`: hay 4, en las líneas 1, 2062, 2899 y 5284, cada uno con un comentario que lo identifica:
- Línea 1: bloque base (sin comentario propio, es el inicio del archivo).
- Línea 2062: `/* Tourism refresh inspired by the Canva travel landing reference. */`
- Línea 2899: `/* Aplicacion de manual interno de marca Turismo Ensenada v1.0 */`
- Línea 5284: `/* Correccion cronologia lateral: Ensenada Historica */`

## Goals / Non-Goals

**Goals:**
- Que ambos documentos reflejen el número real de bloques `:root` y su ubicación aproximada, para que quien vaya a agregar una variable CSS nueva sepa cuántos bloques revisar.

**Non-Goals:**
- No se consolidan ni se tocan los bloques `:root` en `styles.css` — ya está documentado (y confirmado en auditorías previas) que un refactor "prolijo" sin tests de regresión visual es riesgoso; este cambio no lo encara.

## Decisions

**Listar los 4 bloques con su línea aproximada y su comentario identificador, en vez de solo corregir "dos" por "cuatro".**
Dar la ubicación aproximada de cada uno hace que la convención sea directamente accionable (se puede ir a buscarlos) en vez de solo actualizar un número. Se documenta como "línea aproximada" (no exacta) porque el archivo va a seguir recibiendo parches que corren los números de línea con el tiempo — atarse a un número exacto haría que la documentación se desactualizara de nuevo pronto.

## Risks / Trade-offs

Ninguno — cambio de documentación, sin código afectado.

## Migration Plan

1. Actualizar `docs/tecnico/convenciones-css.md`.
2. Actualizar `CLAUDE.md`.
3. Commit + push a `main`.

## Open Questions

Ninguna.
