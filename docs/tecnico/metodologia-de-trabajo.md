# Metodología de trabajo

Este proyecto usa dos herramientas para estructurar cómo se trabaja con Claude Code, con roles distintos y complementarios.

## OpenSpec — toda tarea nueva pasa primero por una propuesta

[OpenSpec](https://github.com/Fission-AI/openspec) es el framework de *spec-driven development* del proyecto. **Antes de implementar cualquier cambio no trivial, se crea una propuesta** en vez de escribir código directamente a partir de una idea suelta en el chat.

Flujo:
1. `/opsx:propose "<descripción del cambio>"` — crea `openspec/changes/<nombre>/` con `proposal.md` (qué y por qué), `design.md` (cómo) y `tasks.md` (pasos de implementación).
2. Revisar los artefactos generados antes de implementar.
3. `/opsx:apply` — implementa siguiendo `tasks.md`.
4. `/opsx:archive` — al terminar, archiva el change en `openspec/changes/archive/` y actualiza las specs.

Esto evita que los requerimientos vivan solo en el historial de chat: quedan versionados y son la fuente de verdad compartida entre el desarrollador y cualquier sesión de Claude Code futura. El contexto del proyecto que ven los artefactos generados está en `openspec/config.yaml`.

`openspec/changes/` empieza vacío — no hay ninguna propuesta de ejemplo todavía, la primera se crea con la próxima tarea real.

## Graphify — grafo de conocimiento del repo

[Graphify](https://github.com/Graphify-Labs/graphify) no es gestión de tareas — es una capa de contexto. Convierte el repo (código + toda la documentación en `docs/`) en un grafo consultable, para que Claude Code pueda responder preguntas sobre relaciones entre archivos sin grepear a ciegas.

Salida en `graphify-out/` (versionado en git, salvo `cache/` que es reconstruible):
- `graph.html` — visualización interactiva, se abre en cualquier navegador.
- `GRAPH_REPORT.md` — resumen legible: comunidades, nodos más conectados, conexiones sorprendentes.
- `graph.json` — grafo completo para queries programáticas.
- `manifest.json` — hashes de archivos, para reconstruir solo lo que cambió.

Uso día a día (ver la sección `## graphify` al final de `CLAUDE.md` para las reglas exactas):
- `graphify query "<pregunta>"` — para preguntas sobre el código/docs, en vez de releer todo.
- `graphify path "<A>" "<B>"` — relación entre dos conceptos.
- `graphify explain "<concepto>"` — explicación enfocada de un nodo.
- `graphify update .` — después de modificar código, para mantener el grafo al día (solo AST, sin costo de LLM).

## Por qué dos herramientas separadas

OpenSpec estructura **qué se va a construir y por qué**, antes de tocar código. Graphify da **contexto de cómo está construido lo que ya existe**, durante el trabajo. No se solapan: una tarea nueva típica arranca con `/opsx:propose`, y durante el diseño/implementación se puede consultar el grafo para entender el código existente antes de decidir el approach.
