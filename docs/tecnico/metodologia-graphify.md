# Metodología: Graphify

Grafo de conocimiento del repo.

[Graphify](https://github.com/Graphify-Labs/graphify) no es gestión de tareas — es una capa de contexto. Convierte el repo (código + toda la documentación en `docs/`) en un grafo consultable, para que Claude Code pueda responder preguntas sobre relaciones entre archivos sin grepear a ciegas.

## Salida

En `graphify-out/` (versionado en git, salvo `cache/` que es reconstruible):
- `graph.html` — visualización interactiva, se abre en cualquier navegador.
- `GRAPH_REPORT.md` — resumen legible: comunidades, nodos más conectados, conexiones sorprendentes.
- `graph.json` — grafo completo para queries programáticas.
- `manifest.json` — hashes de archivos, para reconstruir solo lo que cambió.

## Uso día a día

Ver la sección `## graphify` al final de `CLAUDE.md` para las reglas exactas.

- `graphify query "<pregunta>"` — para preguntas sobre el código/docs, en vez de releer todo.
- `graphify path "<A>" "<B>"` — relación entre dos conceptos.
- `graphify explain "<concepto>"` — explicación enfocada de un nodo.
- `graphify update .` — después de modificar código, para mantener el grafo al día (solo AST, sin costo de LLM). El hook de git post-commit ya hace esto automáticamente para archivos de código; para cambios de solo documentación, correrlo a mano.

## Ver también

[`metodologia-openspec.md`](metodologia-openspec.md) — OpenSpec estructura **qué se va a construir y por qué**, antes de tocar código. Graphify da **contexto de cómo está construido lo que ya existe**, durante el trabajo. No se solapan: una tarea nueva típica arranca con `/opsx:propose`, y durante el diseño/implementación se puede consultar el grafo para entender el código existente antes de decidir el approach.
