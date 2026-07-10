# Graph Report - .  (2026-07-10)

## Corpus Check
- Corpus is ~15,616 words - fits in a single context window. You may not need a graph.

## Summary
- 171 nodes · 274 edges · 12 communities (11 shown, 1 thin omitted)
- Extraction: 88% EXTRACTED · 11% INFERRED · 1% AMBIGUOUS · INFERRED: 31 edges (avg confidence: 0.82)
- Token cost: 0 input · 0 output

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

## God Nodes (most connected - your core abstractions)
1. `CLAUDE.md (project instructions)` - 15 edges
2. `Índice de documentación — Turismo Ensenada` - 15 edges
3. `Colores y tipografía` - 15 edges
4. `Funcionalidades futuras` - 12 edges
5. `OpenSpec CLI (openspec command)` - 11 edges
6. `OpenSpec store selection mechanism (--store flag)` - 10 edges
7. `Bugs conocidos` - 10 edges
8. `OPSX: Archive (slash command)` - 9 edges
9. `openspec-archive-change (skill)` - 9 edges
10. `Arquitectura de marca` - 9 edges

## Surprising Connections (you probably didn't know these)
- `Home page (index.html)` --semantically_similar_to--> `En Fotos page (en-fotos/index.html)`  [INFERRED] [semantically similar]
  index.html → en-fotos/index.html
- `OpenSpec project config (openspec/config.yaml)` --shares_data_with--> `OpenSpec CLI (openspec command)`  [INFERRED]
  openspec/config.yaml → .claude/commands/opsx/apply.md
- `404 Not Found page (404.html)` --references--> `favicon.svg ("ET" monogram brand mark, navy square with white border)`  [EXTRACTED]
  404.html → favicon.svg
- `Home page (index.html)` --references--> `favicon.svg ("ET" monogram brand mark, navy square with white border)`  [EXTRACTED]
  index.html → favicon.svg
- `robots.txt (crawler directives, sitemap reference)` --conceptually_related_to--> `Home page (index.html)`  [INFERRED]
  robots.txt → index.html

## Import Cycles
- None detected.

## Hyperedges (group relationships)
- **OpenSpec fluid workflow: opsx slash commands paired with their skills** — _claude_commands_opsx_apply_opsx_apply, _claude_commands_opsx_archive_opsx_archive, _claude_commands_opsx_explore_opsx_explore, _claude_commands_opsx_propose_opsx_propose, _claude_commands_opsx_sync_opsx_sync, _claude_skills_openspec_apply_change_skill_openspec_apply_change, _claude_skills_openspec_archive_change_skill_openspec_archive_change, _claude_skills_openspec_explore_skill_openspec_explore, _claude_skills_openspec_propose_skill_openspec_propose, _claude_skills_openspec_sync_specs_skill_openspec_sync_specs [INFERRED 0.85]
- **Turismo Ensenada site pages, as enumerated in CLAUDE.md's folder map** — claude_claude_md, index_home_page, en_fotos_index_photos_page, 404_not_found_page [EXTRACTED 1.00]
- **OpenSpec spec-driven workflow artifacts (proposal, design, tasks, specs)** — openspec_config_artifact_proposal, openspec_config_artifact_design, openspec_config_artifact_tasks, openspec_config_artifact_specs [INFERRED 0.85]
- **Documentos derivados del Manual Interno de Marca v1.0** — docs_marca_identidad, docs_marca_sistema_visual, docs_marca_colores_y_tipografia, docs_marca_arquitectura_de_marca, docs_marca_fotografia_y_composicion, docs_marca_sponsors_y_reglas [INFERRED 0.85]
- **Migración a Git resuelve el riesgo de deploy manual sin backup** — docs_historial_migracion, docs_pendientes_bugs_conocidos_riesgo_deploy_manual, docs_tecnico_deploy_netlify_estado_previo [INFERRED 0.85]
- **Sistema de líneas de marca y su color asociado** — docs_marca_arquitectura_de_marca, docs_marca_colores_y_tipografia, docs_marca_sistema_visual_color [INFERRED 0.80]

## Communities (12 total, 1 thin omitted)

### Community 0 - "Interacciones de UI (script.js)"
Cohesion: 0.04
Nodes (36): activeLightboxImages, carousel, carouselNext, carouselPrev, header, hero, lightbox, lightboxClose (+28 more)

### Community 1 - "Flujo de trabajo OpenSpec"
Cohesion: 0.31
Nodes (21): OPSX: Apply (slash command), OPSX: Archive (slash command), OPSX: Explore (slash command), OPSX: Propose (slash command), OPSX: Sync (slash command), openspec-apply-change (skill), openspec-archive-change (skill), openspec-explore (skill) (+13 more)

### Community 2 - "Bugs y riesgos conocidos"
Cohesion: 0.11
Nodes (20): Historial de migración, EXPORTACION_PROYECTO (reconstrucción placeholder descartada), Bugs conocidos, Bug: botón de menú hamburguesa con seis líneas, Bug: imagen de fondo (barcos/portada) mal posicionada en celular, Bug: portada mobile con problemas de responsive, Bug: "renglón amarillo" rompe layout mobile, Riesgo: deploy manual sin source_zip (resuelto) (+12 more)

### Community 3 - "Arquitectura tecnica y CLAUDE.md"
Cohesion: 0.15
Nodes (19): 404 Not Found page (404.html), CLAUDE.md (project instructions), Gallery photo addition workflow (copy .webp to assets/en-fotos/<categoria>/ + manifest.json entry), Turismo Ensenada project identity, No-build static HTML/CSS/JS stack constraint (no package.json without consulting first), styles.css size (~7.9k lines) and dual :root block warning; avoid broad reorganizations, docs/marca/identidad.md, docs/proyecto/funcionalidades-futuras.md (+11 more)

### Community 4 - "Arquitectura de marca y colores"
Cohesion: 0.17
Nodes (17): Arquitectura de marca, ENSENADA CULTURA, ENSENADA EN FOTOS, ENSENADA EN VIVO, ENSENADA HISTORIA, ENSENADA IDENTIDAD, ENSENADA (marca madre), Colores y tipografía (+9 more)

### Community 5 - "Mision y funcionalidades futuras"
Cohesion: 0.20
Nodes (14): Sponsors y reglas, Pendiente: performance (imágenes sin optimizar, falta lazy/srcset), Funcionalidades futuras, Concurso de microrelatos "Historias de Ensenada", Espacios comerciales/publicitarios para sponsors, Sistema de datos para eventos, concursos, notas y galerías, Video real de YouTube embebido en Punta Lara, Misión y objetivos (+6 more)

### Community 6 - "Contenido y localidades del sitio"
Cohesion: 0.31
Nodes (9): Falta video real de YouTube en la sección Punta Lara, Contenido actual del sitio, El Dique, Ensenada Centro, Fragata ARA Libertad en Ensenada, Fuerte Barragán, Línea histórica pública (1520–Hoy), Punta Lara (+1 more)

### Community 7 - "Identidad y sistema visual de marca"
Cohesion: 0.29
Nodes (8): "Color vivo. Tipo fuerte.", Identidad de marca, Cierre de marca: "Una ciudad con identidad propia...", Manifiesto: "No mostramos Ensenada porque sea perfecta...", Manual Interno de Marca Turismo Ensenada v1.0, Sistema visual, Color (decisión visual), ENSENADA (la palabra)

### Community 8 - "Fotografia y composicion de marca"
Cohesion: 0.25
Nodes (8): Verde — Comunidad #00A676, Fotografía y composición, Categoría Comunidad — "Gente real", Categoría Trabajo — "Orgullo que construye", Foto protagonista, una idea por pieza, Aire — menos elementos, más impacto, Fotografía (decisión visual), Consistencia antes que decoración

### Community 9 - "Funciones del lightbox"
Cohesion: 0.50
Nodes (4): moveLightbox(), openLightbox(), renderLightboxImage(), setupPhotoReelSection()

### Community 10 - "Funciones del modal de lugares"
Cohesion: 0.67
Nodes (3): getPlaceModalFocusable(), openPlaceModal(), trapPlaceModalFocus()

## Ambiguous Edges - Review These
- `ENSENADA EN VIVO` → `Celeste — Fotos / En vivo #00C8FF`  [AMBIGUOUS]
  docs/marca/arquitectura-de-marca.md · relation: conceptually_related_to
- `ENSENADA EN VIVO` → `Rojo — En vivo (alerta) #F04438`  [AMBIGUOUS]
  docs/marca/arquitectura-de-marca.md · relation: conceptually_related_to

## Knowledge Gaps
- **58 isolated node(s):** `header`, `menu`, `menuButton`, `carousel`, `carouselPrev` (+53 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **1 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **What is the exact relationship between `ENSENADA EN VIVO` and `Celeste — Fotos / En vivo #00C8FF`?**
  _Edge tagged AMBIGUOUS (relation: conceptually_related_to) - confidence is low._
- **What is the exact relationship between `ENSENADA EN VIVO` and `Rojo — En vivo (alerta) #F04438`?**
  _Edge tagged AMBIGUOUS (relation: conceptually_related_to) - confidence is low._
- **Why does `Índice de documentación — Turismo Ensenada` connect `Mision y funcionalidades futuras` to `Bugs y riesgos conocidos`, `Arquitectura de marca y colores`, `Contenido y localidades del sitio`, `Identidad y sistema visual de marca`, `Fotografia y composicion de marca`?**
  _High betweenness centrality (0.109) - this node is a cross-community bridge._
- **Why does `Colores y tipografía` connect `Arquitectura de marca y colores` to `Fotografia y composicion de marca`, `Mision y funcionalidades futuras`, `Identidad y sistema visual de marca`?**
  _High betweenness centrality (0.040) - this node is a cross-community bridge._
- **Why does `Funcionalidades futuras` connect `Mision y funcionalidades futuras` to `Bugs y riesgos conocidos`, `Arquitectura de marca y colores`, `Contenido y localidades del sitio`?**
  _High betweenness centrality (0.035) - this node is a cross-community bridge._
- **What connects `header`, `menu`, `menuButton` to the rest of the system?**
  _68 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `Interacciones de UI (script.js)` be split into smaller, more focused modules?**
  _Cohesion score 0.043478260869565216 - nodes in this community are weakly interconnected._