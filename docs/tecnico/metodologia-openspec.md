# Metodología: OpenSpec

Toda tarea nueva pasa primero por una propuesta.

[OpenSpec](https://github.com/Fission-AI/openspec) es el framework de *spec-driven development* del proyecto. **Antes de implementar cualquier cambio no trivial, se crea una propuesta** en vez de escribir código directamente a partir de una idea suelta en el chat.

## Flujo

1. `/opsx:propose "<descripción del cambio>"` — crea `openspec/changes/<nombre>/` con `proposal.md` (qué y por qué), `design.md` (cómo) y `tasks.md` (pasos de implementación).
2. Revisar los artefactos generados antes de implementar.
3. `/opsx:apply` — implementa siguiendo `tasks.md`.
4. `/opsx:archive` — al terminar, archiva el change en `openspec/changes/archive/` y actualiza las specs.

Esto evita que los requerimientos vivan solo en el historial de chat: quedan versionados y son la fuente de verdad compartida entre el desarrollador y cualquier sesión de Claude Code futura. El contexto del proyecto que ven los artefactos generados está en `openspec/config.yaml`.

`openspec/changes/` empieza vacío — no hay ninguna propuesta de ejemplo todavía, la primera se crea con la próxima tarea real.

## Ver también

[`metodologia-graphify.md`](metodologia-graphify.md) — la otra herramienta de metodología del proyecto, con un rol distinto y complementario (contexto del código existente, no gestión de tareas).
