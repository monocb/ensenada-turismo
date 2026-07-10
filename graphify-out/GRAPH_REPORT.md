# Graph Report - ensenada-turismo  (2026-07-10)

## Corpus Check
- 69 files · ~25,668 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 354 nodes · 412 edges · 33 communities (31 shown, 2 thin omitted)
- Extraction: 96% EXTRACTED · 4% INFERRED · 0% AMBIGUOUS · INFERRED: 16 edges (avg confidence: 0.78)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `c3706010`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- Interacciones de UI (script.js)
- Flujo de trabajo OpenSpec
- Bugs y riesgos conocidos
- Arquitectura tecnica y CLAUDE.md
- Arquitectura de marca y colores
- Mision y funcionalidades futuras
- Contenido y localidades del sitio
- Identidad y sistema visual de marca
- Fotografia y composicion de marca
- Funciones del lightbox
- Funciones del modal de lugares
- Efecto de profundidad de fotos
- Stack y mapa de archivos
- Misión y objetivos
- Metodología: Graphify
- ADDED Requirements
- design.md
- proposal.md
- Contenido de la home
- tasks.md
- design.md
- proposal.md
- ADDED Requirements
- Contenido de la home
- design.md
- proposal.md
- Metodología: Graphify
- Evaluación: ¿conviene un generador estático?
- design.md
- ADDED Requirements
- proposal.md
- tasks.md
- convenciones-js.md

## God Nodes (most connected - your core abstractions)
1. `OpenSpec CLI (openspec command)` - 11 edges
2. `OpenSpec store selection mechanism (--store flag)` - 10 edges
3. `OPSX: Archive (slash command)` - 9 edges
4. `openspec-archive-change (skill)` - 9 edges
5. `OPSX: Propose (slash command)` - 8 edges
6. `openspec-propose (skill)` - 8 edges
7. `tasks.md artifact (implementation steps)` - 8 edges
8. `AskUserQuestion tool` - 8 edges
9. `Arquitectura de marca` - 8 edges
10. `Evaluación: ¿conviene un generador estático?` - 7 edges

## Surprising Connections (you probably didn't know these)
- `Home page (index.html)` --semantically_similar_to--> `En Fotos page (en-fotos/index.html)`  [INFERRED] [semantically similar]
  index.html → en-fotos/index.html
- `OpenSpec project config (openspec/config.yaml)` --shares_data_with--> `OpenSpec CLI (openspec command)`  [INFERRED]
  openspec/config.yaml → .claude/commands/opsx/apply.md
- `404 Not Found page (404.html)` --references--> `favicon.svg ("ET" monogram brand mark, navy square with white border)`  [EXTRACTED]
  404.html → favicon.svg
- `Home page (index.html)` --references--> `favicon.svg ("ET" monogram brand mark, navy square with white border)`  [EXTRACTED]
  index.html → favicon.svg
- `En Fotos page (en-fotos/index.html)` --references--> `favicon.svg ("ET" monogram brand mark, navy square with white border)`  [EXTRACTED]
  en-fotos/index.html → favicon.svg

## Import Cycles
- None detected.

## Hyperedges (group relationships)
- **OpenSpec fluid workflow: opsx slash commands paired with their skills** — _claude_commands_opsx_apply_opsx_apply, _claude_commands_opsx_archive_opsx_archive, _claude_commands_opsx_explore_opsx_explore, _claude_commands_opsx_propose_opsx_propose, _claude_commands_opsx_sync_opsx_sync, _claude_skills_openspec_apply_change_skill_openspec_apply_change, _claude_skills_openspec_archive_change_skill_openspec_archive_change, _claude_skills_openspec_explore_skill_openspec_explore, _claude_skills_openspec_propose_skill_openspec_propose, _claude_skills_openspec_sync_specs_skill_openspec_sync_specs [INFERRED 0.85]
- **OpenSpec spec-driven workflow artifacts (proposal, design, tasks, specs)** — openspec_config_artifact_proposal, openspec_config_artifact_design, openspec_config_artifact_tasks, openspec_config_artifact_specs [INFERRED 0.85]
- **Documentos derivados del Manual Interno de Marca v1.0** — docs_marca_identidad, docs_marca_sistema_visual, docs_marca_colores_y_tipografia, docs_marca_arquitectura_de_marca, docs_marca_fotografia_y_composicion, docs_marca_sponsors_y_reglas [INFERRED 0.85]
- **Sistema de líneas de marca y su color asociado** — docs_marca_arquitectura_de_marca, docs_marca_colores_y_tipografia, docs_marca_sistema_visual_color [INFERRED 0.80]

## Communities (33 total, 2 thin omitted)

### Community 0 - "Interacciones de UI (script.js)"
Cohesion: 0.04
Nodes (36): activeLightboxImages, carousel, carouselNext, carouselPrev, header, hero, lightbox, lightboxClose (+28 more)

### Community 1 - "Flujo de trabajo OpenSpec"
Cohesion: 0.31
Nodes (21): OPSX: Apply (slash command), OPSX: Archive (slash command), OPSX: Explore (slash command), OPSX: Propose (slash command), OPSX: Sync (slash command), openspec-apply-change (skill), openspec-archive-change (skill), openspec-explore (skill) (+13 more)

### Community 2 - "Bugs y riesgos conocidos"
Cohesion: 0.50
Nodes (4): Deploy en Netlify, Checklist de reconexión Netlify-Git, Configuración de build (netlify.toml, _redirects), Estado previo: deploy manual tipo drop sin Git

### Community 3 - "Arquitectura tecnica y CLAUDE.md"
Cohesion: 0.60
Nodes (5): 404 Not Found page (404.html), En Fotos page (en-fotos/index.html), favicon.svg ("ET" monogram brand mark, navy square with white border), Home page (index.html), robots.txt (crawler directives, sitemap reference)

### Community 4 - "Arquitectura de marca y colores"
Cohesion: 0.09
Nodes (24): Arquitectura de marca, ENSENADA CULTURA, ENSENADA EN FOTOS, ENSENADA EN VIVO, ENSENADA HISTORIA, ENSENADA IDENTIDAD, ENSENADA (marca madre), Colores y tipografía (+16 more)

### Community 5 - "Mision y funcionalidades futuras"
Cohesion: 0.08
Nodes (21): Seguridad, Contenido de la home, Identidad y navegación, Secciones de la home, Ver también, Concurso de microrelatos "Historias de Ensenada", Concurso fotográfico, Funcionalidades futuras (+13 more)

### Community 6 - "Contenido y localidades del sitio"
Cohesion: 0.09
Nodes (13): Accesibilidad, Bug: menú hamburguesa mostrando seis líneas, Bug: portada mobile con problemas de responsive, Bug: "renglón amarillo" rompe el layout en mobile, Bug: sección Cultura sin mostrar fotos correctamente, Performance, Pendientes, Riesgos ya mitigados (+5 more)

### Community 7 - "Identidad y sistema visual de marca"
Cohesion: 0.14
Nodes (13): Antes de tocar colores o textos de marca, Aviso sobre `styles.css`, Cómo agregar una foto a una galería, Cómo previsualizar en local, graphify, Mapa de carpetas, Metodología de trabajo, Pendientes conocidos (+5 more)

### Community 8 - "Fotografia y composicion de marca"
Cohesion: 0.20
Nodes (9): Purpose, Requirement: El menú mobile es funcional y usa un ícono de tres líneas, Requirement: El título del hero no se recorta en viewports mobile, Requirement: La sección Cultura muestra sus fotos correctamente, Requirements, Scenario: Abrir el menú mobile, Scenario: Navegar el carrusel de Cultura, Scenario: Viewport de teléfono angosto (320px) (+1 more)

### Community 9 - "Funciones del lightbox"
Cohesion: 0.40
Nodes (5): humanizeSlug(), moveLightbox(), openLightbox(), renderLightboxImage(), setupPhotoReelSection()

### Community 10 - "Funciones del modal de lugares"
Cohesion: 0.67
Nodes (3): getPlaceModalFocusable(), openPlaceModal(), trapPlaceModalFocus()

### Community 12 - "Stack y mapa de archivos"
Cohesion: 0.10
Nodes (16): Alcance actual vs. proyectado, Misión y objetivos, Objetivos, Qué es, Metodología: Graphify, Salida, Uso día a día, Ver también (+8 more)

### Community 13 - "Misión y objetivos"
Cohesion: 0.22
Nodes (8): ADDED Requirements, Requirement: El menú mobile es funcional y usa un ícono de tres líneas, Requirement: El título del hero no se recorta en viewports mobile, Requirement: La sección Cultura muestra sus fotos correctamente, Scenario: Abrir el menú mobile, Scenario: Navegar el carrusel de Cultura, Scenario: Viewport de teléfono angosto (320px), Scenario: Viewport de teléfono típico (375-430px)

### Community 14 - "Metodología: Graphify"
Cohesion: 0.29
Nodes (6): Context, Decisions, Goals / Non-Goals, Migration Plan, Open Questions, Risks / Trade-offs

### Community 15 - "ADDED Requirements"
Cohesion: 0.18
Nodes (10): Purpose, Requirement: Cabeceras de seguridad HTTP en todas las rutas, Requirement: El sitio no puede ser embebido en un iframe ajeno, Requirement: La Content-Security-Policy permite el embed de YouTube, Requirement: La Content-Security-Policy permite Google Fonts, Requirements, Scenario: Cualquier página del sitio incluye cabeceras de seguridad, Scenario: El embed de YouTube se reproduce sin violar la CSP (+2 more)

### Community 16 - "design.md"
Cohesion: 0.20
Nodes (9): ADDED Requirements, Requirement: Cabeceras de seguridad HTTP en todas las rutas, Requirement: El sitio no puede ser embebido en un iframe ajeno, Requirement: La Content-Security-Policy permite el embed de YouTube, Requirement: La Content-Security-Policy permite Google Fonts, Scenario: Cualquier página del sitio incluye cabeceras de seguridad, Scenario: El embed de YouTube se reproduce sin violar la CSP, Scenario: Google Fonts carga sin violar la CSP (+1 more)

### Community 17 - "proposal.md"
Cohesion: 0.29
Nodes (6): Context, Decisions, Goals / Non-Goals, Migration Plan, Open Questions, Risks / Trade-offs

### Community 18 - "Contenido de la home"
Cohesion: 0.29
Nodes (6): Capabilities, Impact, Modified Capabilities, New Capabilities, What Changes, Why

### Community 19 - "tasks.md"
Cohesion: 0.50
Nodes (3): 1. Crear el archivo `_headers`, 2. Verificación local/preview, 3. Deploy y validación en producción

### Community 20 - "design.md"
Cohesion: 0.29
Nodes (6): Capabilities, Impact, Modified Capabilities, New Capabilities, What Changes, Why

### Community 21 - "proposal.md"
Cohesion: 0.29
Nodes (6): Purpose, Requirement: El alt de las fotos de galería incluye título y ubicación, Requirement: Ninguna foto de galería recibe un alt genérico no descriptivo, Requirements, Scenario: Una sección de galería no define título, Scenario: Una sección de galería tiene título y ubicación definidos

### Community 22 - "ADDED Requirements"
Cohesion: 0.33
Nodes (5): ADDED Requirements, Requirement: El alt de las fotos de galería incluye título y ubicación, Requirement: Ninguna foto de galería recibe un alt genérico no descriptivo, Scenario: Una sección de galería no define título, Scenario: Una sección de galería tiene título y ubicación definidos

### Community 23 - "Contenido de la home"
Cohesion: 0.50
Nodes (3): 1. Implementar el nuevo template de alt, 2. Verificación, 3. Deploy

### Community 24 - "design.md"
Cohesion: 0.29
Nodes (6): Context, Decisions, Goals / Non-Goals, Migration Plan, Open Questions, Risks / Trade-offs

### Community 25 - "proposal.md"
Cohesion: 0.29
Nodes (6): Capabilities, Impact, Modified Capabilities, New Capabilities, What Changes, Why

### Community 26 - "Metodología: Graphify"
Cohesion: 0.50
Nodes (3): 1. Corregir el bug confirmado (hero h1 recortado), 2. Actualizar documentación de los 4 bugs con el estado verificado, 3. Deploy y validación en producción

### Community 27 - "Evaluación: ¿conviene un generador estático?"
Cohesion: 0.12
Nodes (13): Índice de documentación — Turismo Ensenada, Alternativas descartadas, Antes de comprometerse: un spike acotado, Comparación (fuentes oficiales), Evaluación: ¿conviene un generador estático?, Para el sistema de concursos (independiente del generador elegido), Por qué esta evaluación, Qué NO hacer (+5 more)

### Community 28 - "design.md"
Cohesion: 0.25
Nodes (7): Context, Decisions, Goals / Non-Goals, Migration Plan, Open Questions, Resumen de la corrección de rumbo, Risks / Trade-offs

### Community 29 - "ADDED Requirements"
Cohesion: 0.25
Nodes (7): ADDED Requirements, Requirement: El documento está enlazado desde el índice técnico, Requirement: El proyecto tiene una recomendación documentada sobre generadores estáticos, Requirement: La recomendación define condiciones concretas de activación, Scenario: Alguien evalúa si migrar el stack, Scenario: Alguien navega la documentación técnica, Scenario: Se evalúa si es momento de migrar

### Community 30 - "proposal.md"
Cohesion: 0.29
Nodes (6): Capabilities, Impact, Modified Capabilities, New Capabilities, What Changes, Why

### Community 31 - "tasks.md"
Cohesion: 0.50
Nodes (3): 1. Escribir el documento de evaluación, 2. Enlazar desde el índice de documentación, 3. Deploy

## Knowledge Gaps
- **191 isolated node(s):** `Concurso fotográfico`, `Concurso de microrelatos "Historias de Ensenada"`, `Páginas por lugar`, `Otras mejoras de producto planteadas`, `Técnico` (+186 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **2 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `OpenSpec project config (openspec/config.yaml)` connect `Identidad y sistema visual de marca` to `Flujo de trabajo OpenSpec`?**
  _High betweenness centrality (0.044) - this node is a cross-community bridge._
- **Why does `OpenSpec CLI (openspec command)` connect `Flujo de trabajo OpenSpec` to `Identidad y sistema visual de marca`?**
  _High betweenness centrality (0.037) - this node is a cross-community bridge._
- **What connects `Concurso fotográfico`, `Concurso de microrelatos "Historias de Ensenada"`, `Páginas por lugar` to the rest of the system?**
  _196 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `Interacciones de UI (script.js)` be split into smaller, more focused modules?**
  _Cohesion score 0.043478260869565216 - nodes in this community are weakly interconnected._
- **Should `Arquitectura de marca y colores` be split into smaller, more focused modules?**
  _Cohesion score 0.0873015873015873 - nodes in this community are weakly interconnected._
- **Should `Mision y funcionalidades futuras` be split into smaller, more focused modules?**
  _Cohesion score 0.08275862068965517 - nodes in this community are weakly interconnected._
- **Should `Contenido y localidades del sitio` be split into smaller, more focused modules?**
  _Cohesion score 0.08695652173913043 - nodes in this community are weakly interconnected._