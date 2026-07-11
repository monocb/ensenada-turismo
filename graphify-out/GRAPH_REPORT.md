# Graph Report - ensenada-turismo  (2026-07-10)

## Corpus Check
- 205 files · ~285,502 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 3226 nodes · 6802 edges · 188 communities (181 shown, 7 thin omitted)
- Extraction: 98% EXTRACTED · 2% INFERRED · 0% AMBIGUOUS · INFERRED: 129 edges (avg confidence: 0.68)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `104edea3`
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
- tasks.md
- checks.mjs
- svelte-component.mjs
- index.mjs
- setLiveState
- design-system.mjs
- resumeSession
- live-commit-manual-edits.mjs
- modern-screenshot.umd.js
- impeccable-config.mjs
- el
- css-cascade.mjs
- detect-antipatterns-browser.js
- hook-lib.mjs
- showToast
- hook-admin.mjs
- manual-apply.mjs
- detect-html.mjs
- live-inject.mjs
- hook-before-edit.mjs
- insert-ui.mjs
- live-wrap.mjs
- initGlobalBar
- design-parser.mjs
- live-server.mjs
- colorize.md
- UX Writing
- live-copy-edit-agent.mjs
- detect-text.mjs
- detect-antipatterns.mjs
- parseRgb
- live-manual-edit-evidence.mjs
- documentRefForElement
- live-poll.mjs
- document.md
- handleManualEditActivity
- onboard.md
- manual-edit-routes.mjs
- context.mjs
- runHook
- GENERIC_FONTS
- onAnnotDown
- impeccable-paths.mjs
- readLiveServerInfo
- Delight Techniques
- renderGroupedTemplate
- animate.md
- context-signals.mjs
- live.mjs
- Interaction Design
- refreshParamsPanel
- adapt.md
- Handle `generate`
- Phase 1: Discovery Interview
- Typography
- resolveContext
- analyzeVisualContrastCandidate
- checkElementDesignSystemDOM
- checkQuality
- Generate Report
- layout.md
- sampleCssBackground
- parseAnyColor
- typeset.md
- Brand register
- live.md
- optimize.md
- Polish Systematically
- StaticElement
- bolder.md
- overdrive.md
- critique-storage.mjs
- collectBrowserFindings
- broadcastAgentPollingIfChanged
- pin.mjs
- craft.md
- Simplify the Design
- Hardening Dimensions
- SKILL.md
- ui-core.mjs
- session-store.mjs
- critique.md
- Nielsen's 10 Heuristics
- quieter.md
- discoverTargetCandidates
- palette.mjs
- General rules
- Responsive Design
- Craft Flow
- Generate Combined Critique Report
- Step 3: Ask strategic questions (for PRODUCT.md)
- Product register
- resolveWorkspaceProjectRoot
- checkElementTextOverflowDOM
- expandScanTargets
- scheduleSteerFocusRecover
- Common Cognitive Load Violations
- Technical Implementation
- Persona-Based Design Testing
- Extract Flow
- Init Flow
- iOS platform
- The Toolkit
- readWorkspacePatterns
- README.md
- Android platform
- Implement Animations
- Generate Report
- Cognitive Load Assessment
- /impeccable hooks
- CSP detection (first-time only)
- _
- Arquitectura de marca
- acceptedDomAlreadyClean
- Adaptation Strategies
- Handle fallback
- isGeneratedFile
- riesgos-mitigados.md
- Funcionalidades futuras
- Stack y mapa de archivos
- Heuristics Scoring Guide
- detect.mjs
- Contenido de la home
- Misión y objetivos
- linea-historica.md
- Diagnostic Scan
- normalizeGitHubEvent
- createManualEditRoutes
- 4. Plan three variants: identity first, then mode, then axes
- Requirement: El panel del menú mobile abierto es completamente opaco al contenido del hero
- checkElementQuality
- Requirement: Las place-cards usan un radio de esquina consistente con las demás tarjetas del sitio
- tasks.md
- Improve Typography Systematically
- Requirement: Las place-cards usan un radio de esquina consistente con las demás tarjetas del sitio
- Requirement: Las place-cards usan un radio de esquina consistente con las demás tarjetas del sitio
- tasks.md
- README.md
- ADDED Requirements
- Adaptation Strategies
- checkElementQuality
- tasks.md
- tasks.md
- design.md
- proposal.md
- Requirement: Las fotos del carrete de la Fragata son operables por teclado
- tasks.md
- robots.txt (crawler directives, sitemap reference)
- tasks.md
- The Toolkit
- Implement Animations
- checkElementGptBorderShadowDOM
- design.md
- proposal.md
- checkHeroEyebrow

## God Nodes (most connected - your core abstractions)
1. `el()` - 55 edges
2. `runHook()` - 36 edges
3. `setLiveState()` - 29 edges
4. `detectHtml()` - 28 edges
5. `initGlobalBar()` - 28 edges
6. `main()` - 27 edges
7. `collectBrowserFindings()` - 26 edges
8. `buildInsertConfigureRow()` - 26 edges
9. `handleKeyDown()` - 26 edges
10. `showToast()` - 25 edges

## Surprising Connections (you probably didn't know these)
- `404 Not Found page (404.html)` --references--> `favicon.svg ("ET" monogram brand mark, navy square with white border)`  [EXTRACTED]
  404.html → favicon.svg
- `OpenSpec project config (openspec/config.yaml)` --shares_data_with--> `OpenSpec CLI (openspec command)`  [INFERRED]
  openspec/config.yaml → .claude/commands/opsx/apply.md
- `latestCritique()` --indirect_call--> `v()`  [INFERRED]
  .claude/skills/impeccable/scripts/context-signals.mjs → .claude/skills/impeccable/scripts/modern-screenshot.umd.js
- `collectVisualContrastReasons()` --indirect_call--> `x()`  [INFERRED]
  .claude/skills/impeccable/scripts/detector/browser/injected/index.mjs → .claude/skills/impeccable/scripts/modern-screenshot.umd.js
- `collectVisualContrastCandidates()` --indirect_call--> `el()`  [INFERRED]
  .claude/skills/impeccable/scripts/detector/browser/injected/index.mjs → .claude/skills/impeccable/scripts/live-browser.js

## Import Cycles
- None detected.

## Hyperedges (group relationships)
- **OpenSpec fluid workflow: opsx slash commands paired with their skills** — _claude_commands_opsx_apply_opsx_apply, _claude_commands_opsx_archive_opsx_archive, _claude_commands_opsx_explore_opsx_explore, _claude_commands_opsx_propose_opsx_propose, _claude_commands_opsx_sync_opsx_sync, _claude_skills_openspec_apply_change_skill_openspec_apply_change, _claude_skills_openspec_archive_change_skill_openspec_archive_change, _claude_skills_openspec_explore_skill_openspec_explore, _claude_skills_openspec_propose_skill_openspec_propose, _claude_skills_openspec_sync_specs_skill_openspec_sync_specs [INFERRED 0.85]
- **OpenSpec spec-driven workflow artifacts (proposal, design, tasks, specs)** — openspec_config_artifact_proposal, openspec_config_artifact_design, openspec_config_artifact_tasks, openspec_config_artifact_specs [INFERRED 0.85]
- **Documentos derivados del Manual Interno de Marca v1.0** — docs_marca_identidad, docs_marca_sistema_visual, docs_marca_colores_y_tipografia, docs_marca_arquitectura_de_marca, docs_marca_fotografia_y_composicion, docs_marca_sponsors_y_reglas [INFERRED 0.85]
- **Sistema de líneas de marca y su color asociado** — docs_marca_arquitectura_de_marca, docs_marca_colores_y_tipografia, docs_marca_sistema_visual_color [INFERRED 0.80]

## Communities (188 total, 7 thin omitted)

### Community 0 - "Interacciones de UI (script.js)"
Cohesion: 0.04
Nodes (36): activeLightboxImages, carousel, carouselNext, carouselPrev, header, hero, lightbox, lightboxClose (+28 more)

### Community 1 - "Flujo de trabajo OpenSpec"
Cohesion: 0.11
Nodes (36): OPSX: Apply (slash command), OPSX: Archive (slash command), OPSX: Explore (slash command), OPSX: Propose (slash command), OPSX: Sync (slash command), openspec-apply-change (skill), openspec-archive-change (skill), openspec-explore (skill) (+28 more)

### Community 2 - "Bugs y riesgos conocidos"
Cohesion: 0.50
Nodes (4): Deploy en Netlify, Checklist de reconexión Netlify-Git, Configuración de build (netlify.toml, _redirects), Estado previo: deploy manual tipo drop sin Git

### Community 4 - "Arquitectura de marca y colores"
Cohesion: 0.24
Nodes (11): Colores y tipografía, Identidad de marca, Cierre de marca: "Una ciudad con identidad propia...", Manifiesto: "No mostramos Ensenada porque sea perfecta...", Manual Interno de Marca Turismo Ensenada v1.0, Sistema visual, Aire — menos elementos, más impacto, Color (decisión visual) (+3 more)

### Community 5 - "Mision y funcionalidades futuras"
Cohesion: 0.14
Nodes (12): Seguridad, Contenido de la home, Identidad y navegación, Secciones de la home, Ver también, Localidad: El Dique, Ver también, Localidad: Ensenada Centro (+4 more)

### Community 6 - "Contenido y localidades del sitio"
Cohesion: 0.11
Nodes (10): Accesibilidad, Bug: menú hamburguesa mostrando seis líneas, Bug: portada mobile con problemas de responsive, Bug: "renglón amarillo" rompe el layout en mobile, Bug: sección Cultura sin mostrar fotos correctamente, Performance, Pendientes, Pendiente de revisar (+2 more)

### Community 7 - "Identidad y sistema visual de marca"
Cohesion: 0.03
Nodes (136): acceptedDomAlreadyClean(), addManualContextText(), applyGlobalBarLabelState(), applyPlaceholderSizingStyles(), applySvelteComponentVariantStyle(), bufferToBase64(), buildCollapsible(), buildColorModels() (+128 more)

### Community 8 - "Fotografia y composicion de marca"
Cohesion: 0.15
Nodes (12): Purpose, Requirement: El menú mobile es funcional y usa un ícono de tres líneas, Requirement: El panel del menú mobile abierto es completamente opaco al contenido del hero, Requirement: El título del hero no se recorta en viewports mobile, Requirement: La sección Cultura muestra sus fotos correctamente, Requirements, Scenario: Abrir el menú mobile, Scenario: Menú abierto sobre el hero (+4 more)

### Community 9 - "Funciones del lightbox"
Cohesion: 0.40
Nodes (5): humanizeSlug(), moveLightbox(), openLightbox(), renderLightboxImage(), setupPhotoReelSection()

### Community 10 - "Funciones del modal de lugares"
Cohesion: 0.67
Nodes (3): getPlaceModalFocusable(), openPlaceModal(), trapPlaceModalFocus()

### Community 12 - "Stack y mapa de archivos"
Cohesion: 0.22
Nodes (7): Metodología: Graphify, Salida, Uso día a día, Ver también, Flujo, Metodología: OpenSpec, Ver también

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
Cohesion: 0.18
Nodes (11): Alternativas descartadas, Antes de comprometerse: un spike acotado, Comparación (fuentes oficiales), Evaluación: ¿conviene un generador estático?, Para el sistema de concursos (independiente del generador elegido), Por qué esta evaluación, Qué NO hacer, Recomendación (+3 more)

### Community 28 - "design.md"
Cohesion: 0.22
Nodes (8): Purpose, Requirement: El documento está enlazado desde el índice técnico, Requirement: El proyecto tiene una recomendación documentada sobre generadores estáticos, Requirement: La recomendación define condiciones concretas de activación, Requirements, Scenario: Alguien evalúa si migrar el stack, Scenario: Alguien navega la documentación técnica, Scenario: Se evalúa si es momento de migrar

### Community 29 - "ADDED Requirements"
Cohesion: 0.25
Nodes (7): Context, Decisions, Goals / Non-Goals, Migration Plan, Open Questions, Resumen de la corrección de rumbo, Risks / Trade-offs

### Community 30 - "proposal.md"
Cohesion: 0.25
Nodes (7): ADDED Requirements, Requirement: El documento está enlazado desde el índice técnico, Requirement: El proyecto tiene una recomendación documentada sobre generadores estáticos, Requirement: La recomendación define condiciones concretas de activación, Scenario: Alguien evalúa si migrar el stack, Scenario: Alguien navega la documentación técnica, Scenario: Se evalúa si es momento de migrar

### Community 31 - "tasks.md"
Cohesion: 0.29
Nodes (6): Capabilities, Impact, Modified Capabilities, New Capabilities, What Changes, Why

### Community 33 - "tasks.md"
Cohesion: 0.50
Nodes (3): 1. Escribir el documento de evaluación, 2. Enlazar desde el índice de documentación, 3. Deploy

### Community 34 - "checks.mjs"
Cohesion: 0.05
Nodes (82): borderColorsFromStyle(), borderWidthsFromStyle(), checkBorders(), checkClippedOverflow(), checkCreamPalette(), checkElementBorders(), checkElementBordersDOM(), checkElementClippedOverflow() (+74 more)

### Community 35 - "svelte-component.mjs"
Cohesion: 0.10
Nodes (44): applyLegacyDeferredAcceptsOnStartup(), appendCssToSvelteStyle(), appendSanitizedCssRule(), applyDeferredSvelteComponentAccepts(), bakeParamValuesInCss(), buildInsertVariantStub(), buildPropContract(), buildPropsScript() (+36 more)

### Community 36 - "index.mjs"
Cohesion: 0.06
Nodes (68): addBrowserFindings(), addVisualContrastFindings(), addVisualContrastResult(), analyzeVisualContrast(), analyzeVisualContrastCandidate(), blendRgba(), browserColorsClose(), browserDesignSystemConfig() (+60 more)

### Community 37 - "setLiveState"
Cohesion: 0.12
Nodes (55): abortSvelteComponentInjection(), applyEditing(), buildLocatorForLeaf(), cancelEditing(), cancelEditingToPicking(), cancelInsertConfigure(), cleanup(), cleanupAcceptedSession() (+47 more)

### Community 38 - "design-system.mjs"
Cohesion: 0.09
Nodes (54): addColorObject(), addDesignColor(), addRoundedScale(), addRoundedToken(), addSidecarColors(), addSidecarRadii(), addTypographyFonts(), addTypographySizes() (+46 more)

### Community 39 - "resumeSession"
Cohesion: 0.06
Nodes (75): applyConfigureBarChrome(), applyOriginalAttrsToSvelteAnchor(), applyParamDefaults(), applyParamValue(), applyPlaceholderDimensions(), applySavedSessionMeta(), buildConfirmedRow(), buildCyclingRow() (+67 more)

### Community 40 - "live-commit-manual-edits.mjs"
Cohesion: 0.10
Nodes (50): allEntryIds(), argVal(), buildRepairBatch(), candidatesForEntry(), changedFilesSinceSnapshot(), clearAppliedEntries(), collectApplyOwnedFiles(), collectRollbackFiles() (+42 more)

### Community 41 - "modern-screenshot.umd.js"
Cohesion: 0.09
Nodes (53): ae(), be(), bt(), Ce(), Ct(), de(), dt(), _e() (+45 more)

### Community 42 - "impeccable-config.mjs"
Cohesion: 0.10
Nodes (47): applyDetectionConfigSource(), clampByte(), cleanIgnoreValueDisplay(), cloneDetectionConfig(), cloneRawDetectionConfig(), colorIgnoreKey(), DEFAULT_DETECTION_CONFIG, DETECTOR_CONFIG_KEYS (+39 more)

### Community 43 - "el"
Cohesion: 0.11
Nodes (38): bindConfigureCountPillTooltip(), bindConfigureInlineControlHover(), bindConfigureModifierPillHover(), buildConfigureActionControl(), buildConfigureCountControl(), buildConfigureRow(), buildConfigureSubmitButton(), buildConfigureTrailingCluster() (+30 more)

### Community 44 - "css-cascade.mjs"
Cohesion: 0.10
Nodes (29): applyStaticDeclaration(), buildBorderOverrideMap(), buildStaticStyleMap(), buildStaticWindow(), collectStaticCssRules(), compareStaticPriority(), cssPropToCamel(), expandStaticBoxValues() (+21 more)

### Community 45 - "detect-antipatterns-browser.js"
Cohesion: 0.08
Nodes (39): addBrowserFindings(), addVisualContrastFindings(), addVisualContrastResult(), checkBorders(), checkClippedOverflow(), checkElementBorders(), checkElementBordersDOM(), checkElementClippedOverflow() (+31 more)

### Community 46 - "hook-lib.mjs"
Cohesion: 0.07
Nodes (52): ACK_EXTS, clampByte(), clampGroupedToBudget(), clampToBudget(), cleanIgnoreValueDisplay(), CO_SCAN_STYLE_NAMES, colorIgnoreKey(), DEFAULT_CONFIG (+44 more)

### Community 47 - "showToast"
Cohesion: 0.08
Nodes (52): armPageChatForTyping(), attachSteerFocusDebug(), attachSteerFocusGuard(), buildSteerProcessingDots(), clearSteerAwaitTimer(), clearSteerFocusRecoverTimer(), collapsePageChat(), expandPageChat() (+44 more)

### Community 48 - "hook-admin.mjs"
Cohesion: 0.14
Nodes (40): addIgnoreFile(), addIgnoreRule(), addIgnoreValue(), DETECTOR_CONFIG_KEYS, detectorSection(), fileHasImpeccableHookMarker(), HOOK_MANIFEST_TARGETS, hookSection() (+32 more)

### Community 49 - "manual-apply.mjs"
Cohesion: 0.10
Nodes (36): addOpToManualApplyChunk(), APPLY_EVENT_HARD_TIMEOUT_MS, APPLY_EVENT_SOFT_DEADLINE_MS, buildManualApplyAgentAction(), clearManualApplyTransaction(), collectManualApplyFiles(), compactManualApplyBatch(), compactManualApplyCandidates() (+28 more)

### Community 50 - "detect-html.mjs"
Cohesion: 0.15
Nodes (18): checkPageTypography(), checkTypography(), isBrandFontOnOwnDomain(), firstOverusedGoogleFont(), checkStaticPageTypography(), checkPageTypography(), checkTypography(), resolveSerif() (+10 more)

### Community 51 - "live-inject.mjs"
Cohesion: 0.07
Nodes (50): detectCsp(), INLINE_HEADER_SIGNALS, LAYOUT_EXTS, MONOREPO_HELPER_SIGNALS, NUXT_ROUTE_RULES_SIGNALS, NUXT_SECURITY_SIGNALS, SCAN_EXTS, SKIP_DIRS (+42 more)

### Community 52 - "hook-before-edit.mjs"
Cohesion: 0.10
Nodes (46): allow(), bumpCursorDenial(), cursorBlockMessage(), deny(), detectProposedHtml(), done(), escapeRegExp(), findingSignature() (+38 more)

### Community 53 - "insert-ui.mjs"
Cohesion: 0.11
Nodes (10): canCreateInsert(), clampPlaceholderSize(), computeInsertPosition(), groupSiblingRows(), hitSiblingInsertGap(), horizontalOverlap(), insertCreateDisabledReason(), insertLineCoords() (+2 more)

### Community 54 - "live-wrap.mjs"
Cohesion: 0.14
Nodes (34): argVal(), buildInsertWrapperLines(), computeInsertLine(), INSERT_POSITIONS, insertCli(), isInsertPosition(), resolveElementMatch(), buildSvelteComponentCssAuthoring() (+26 more)

### Community 55 - "initGlobalBar"
Cohesion: 0.10
Nodes (37): ACTIONS, actionLabel(), barPaletteForTheme(), brandMarkSvg(), buildDesignHeader(), buildParamsPanel(), buildSavingRow(), cursorForInsertAxis() (+29 more)

### Community 56 - "design-parser.mjs"
Cohesion: 0.15
Nodes (33): buildColor(), CANONICAL_SECTIONS, collectBullets(), collectColorValues(), collectParagraphs(), detectFormat(), extractColors(), extractComponents() (+25 more)

### Community 57 - "live-server.mjs"
Cohesion: 0.09
Nodes (43): assembleLiveBrowserScript(), assertLiveBrowserScriptParts(), LIVE_BROWSER_SCRIPT_PARTS, readLiveBrowserScriptParts(), resolveLiveBrowserScriptParts(), acknowledgePendingEvent(), activeSessionSummaries(), agentPollingConnected() (+35 more)

### Community 58 - "colorize.md"
Cohesion: 0.11
Nodes (17): Accent Color Application, Accessibility, Assess Color Opportunity, Background & Surfaces, Balance & Refinement, Borders & Accents, Cohesion, Data Visualization (+9 more)

### Community 59 - "UX Writing"
Cohesion: 0.12
Nodes (15): Apply Clarity Principles, Assess Current Copy, Button & CTA Text, Confirmation Dialogs, Empty States, Error Messages, Form Labels & Instructions, Help Text & Tooltips (+7 more)

### Community 60 - "live-copy-edit-agent.mjs"
Cohesion: 0.14
Nodes (31): applyMockWrites(), buildCopyEditBatchPrompt(), checkFrameworkSourceSyntax(), chooseCopyEditAgent(), COMMAND_AUTH_CACHE, commandAuthed(), commandExists(), compactBatchForPrompt() (+23 more)

### Community 61 - "detect-text.mjs"
Cohesion: 0.08
Nodes (49): detectUrl(), runVisualContrastFallback(), serializeDesignSystemForBrowser(), CSS_IN_JS_EXTENSIONS, detectText(), extFromFilePath(), extractCSSinJS(), extractStyleBlocks() (+41 more)

### Community 62 - "detect-antipatterns.mjs"
Cohesion: 0.17
Nodes (26): confirm(), detectCli(), formatFindings(), formatFindingSummary(), handleStdin(), printUsage(), createBrowserDetector(), getAP() (+18 more)

### Community 63 - "parseRgb"
Cohesion: 0.13
Nodes (32): analyzeVisualContrast(), analyzeVisualContrastCandidate(), checkColors(), checkElementAIPaletteDOM(), checkElementColors(), checkElementColorsDOM(), checkElementGlow(), checkElementGlowDOM() (+24 more)

### Community 64 - "live-manual-edit-evidence.mjs"
Cohesion: 0.16
Nodes (26): analyzeSourceHint(), buildCandidatesForOp(), buildContextHintsByRef(), buildManualEditEvidence(), collectSearchFiles(), countOps(), decodeBasicHtml(), escapeRegExp() (+18 more)

### Community 65 - "documentRefForElement"
Cohesion: 0.18
Nodes (16): buildInsertPlaceholderSnapshotFromDom(), buildPickedAnchorSnapshot(), captureAndEmit(), checkpointPayload(), copyEditContainerContext(), copyEditLeafContext(), documentRefForElement(), extractContext() (+8 more)

### Community 66 - "live-poll.mjs"
Cohesion: 0.18
Nodes (24): completionAckForAcceptResult(), completionTypeForAcceptResult(), augmentEventWithAcceptHandling(), buildAcceptScriptArgs(), buildPollReplyPayload(), EVENT_TYPES_NEEDING_AGENT_REPLY, fetchNextEvent(), fetchServerStatus() (+16 more)

### Community 67 - "document.md"
Cohesion: 0.08
Nodes (24): Component translation rules, Narrative mapping, Pitfalls, Scan mode (approach C: auto-extract, then confirm descriptive language), Schema, Seed mode, Step 1: Confirm seed mode, Step 1: Find the design assets (+16 more)

### Community 68 - "handleManualEditActivity"
Cohesion: 0.19
Nodes (24): clearStoredManualApplyState(), fetchPendingCount(), handleManualEditActivity(), hidePendingApplyDock(), manualApplyLoadingText(), manualApplyStateKey(), manualEditEventForCurrentPage(), numberOrNull() (+16 more)

### Community 69 - "onboard.md"
Cohesion: 0.09
Nodes (22): Assess Onboarding Needs, Context Over Ceremony, Contextual Help, Design Onboarding Experiences, Documentation & Help, Empty State Design, Feature Discovery & Adoption, Guided Tours & Walkthroughs (+14 more)

### Community 70 - "manual-edit-routes.mjs"
Cohesion: 0.19
Nodes (19): args, cwd, pageUrlFilter, remaining, compactManualLogText(), summarizeManualApplyFailures(), summarizeManualDiagnostics(), summarizeManualLogFile() (+11 more)

### Community 71 - "context.mjs"
Cohesion: 0.16
Nodes (20): buildMissingTargetDirective(), buildResolvedContextDirective(), buildTargetSelectionDirective(), buildUpdateDirective(), cli(), compareSemver(), computeUpdateDirective(), DESIGN_NAMES (+12 more)

### Community 72 - "runHook"
Cohesion: 0.16
Nodes (14): applyConfigSource(), applyDetectorConfigSource(), cloneDefaultConfig(), detectorSection(), hookSection(), ignoreValueFilesKey(), mergeIgnoreValues(), numberOr() (+6 more)

### Community 73 - "GENERIC_FONTS"
Cohesion: 0.14
Nodes (16): contextSourcePath(), contextSourceStatus(), findMonorepoRoot(), firstExisting(), hasGitBoundary(), isCandidateProjectRoot(), isPathInside(), isPathInsideOrEqual() (+8 more)

### Community 74 - "onAnnotDown"
Cohesion: 0.20
Nodes (17): beginEditPin(), buildAnnotationsForCapture(), buildPinElement(), cancelEditingPin(), clampPlaceholderSize(), finalizeEditingPin(), initAnnotOverlay(), localCoords() (+9 more)

### Community 75 - "impeccable-paths.mjs"
Cohesion: 0.20
Nodes (18): resolveProjectRoot(), firstExisting(), getDesignSidecarCandidates(), getDesignSidecarPath(), getImpeccableDir(), getLegacyLiveAnnotationsDir(), getLegacyLiveConfigPath(), getLegacyLiveServerPath() (+10 more)

### Community 76 - "readLiveServerInfo"
Cohesion: 0.21
Nodes (17): isLiveServerPidReachable(), readLiveServerInfo(), completeCli(), completeThroughServer(), parseArgs(), readServerInfo(), collectManualApplyFiles(), manualApplyReplyCommand() (+9 more)

### Community 77 - "Delight Techniques"
Cohesion: 0.11
Nodes (18): Appropriate to Context, Assess Delight Opportunities, Celebration Moments, Compound Over Time, Delight Amplifies, Never Blocks, Delight Principles, Delight Techniques, Easter Eggs & Hidden Delights (+10 more)

### Community 78 - "renderGroupedTemplate"
Cohesion: 0.13
Nodes (20): averageRgb01(), captureChromeNodes(), captureElementFromRenderedAncestor(), captureElementToBlob(), compileShader(), cssColorToRgb01(), dominantRgb01(), findBackdropAncestor() (+12 more)

### Community 79 - "animate.md"
Cohesion: 0.12
Nodes (16): Avoid Redundant Copy, Confirmation Dialogs: Use Sparingly, Consistency: The Terminology Problem, Don't Blame the User, Empty States Are Opportunities, Error Message Templates, Error Messages: The Formula, Form Instructions (+8 more)

### Community 80 - "context-signals.mjs"
Cohesion: 0.20
Nodes (16): extractPlatform(), extractRegister(), extractSectionValue(), loadContext(), safeRead(), cli(), COMMON_DEV_PORTS, devServerSignals() (+8 more)

### Community 81 - "live.mjs"
Cohesion: 0.22
Nodes (13): resolveTargetSelection(), parseTargetOptions(), parseTargetPath(), TargetArgError, __dirname, ensureServerRunning(), globToRegex(), liveCli() (+5 more)

### Community 82 - "Interaction Design"
Cohesion: 0.12
Nodes (17): CSS Anchor Positioning, Destructive Actions: Undo > Confirm, Dropdown & Overlay Positioning, Fixed Positioning Fallback, Focus Rings: Do Them Right, Form Design: The Non-Obvious, Gesture Discoverability, Interaction Design (+9 more)

### Community 83 - "refreshParamsPanel"
Cohesion: 0.13
Nodes (15): Alpha Is A Design Smell, Building Functional Palettes, Color & Contrast, Color Spaces: Use OKLCH, Contrast & Accessibility, Dangerous Color Combinations, Dark Mode Is Not Inverted Light Mode, Palette Structure (+7 more)

### Community 84 - "adapt.md"
Cohesion: 0.08
Nodes (25): Assess Adaptation Challenge, Breakpoints: Content-Driven, Content Adaptation, Desktop Adaptation (Mobile → Desktop), Detect Input Method, Not Just Screen Size, Email Adaptation (Web → Email), Implement Adaptations, Layout Adaptation Patterns (+17 more)

### Community 85 - "Handle `generate`"
Cohesion: 0.18
Nodes (11): 1. Read the screenshot (if present), 2. Wrap the element, 3. Load the action's reference, 5. Apply the freeform prompt (if present), 6. Write all variants in a single edit, 7. Parameters (composition-sized, 0–4 per variant), 8. Signal done, Aborting an in-flight session (+3 more)

### Community 86 - "Phase 1: Discovery Interview"
Cohesion: 0.12
Nodes (15): Anti-Goals, Brief Structure, Constraints, Content & Data, Design Direction, How to use the probes, Important limits, Interview cadence (+7 more)

### Community 87 - "Typography"
Cohesion: 0.12
Nodes (16): Accessibility Considerations, Anti-reflexes worth defending against, Classic Typography Principles, Fluid Type, Font Selection & Pairing, Modern Web Typography, Modular Scale & Hierarchy, OpenType Features (+8 more)

### Community 88 - "resolveContext"
Cohesion: 0.22
Nodes (11): browserDesignSystemConfig(), browserFindingsFromMap(), browserPrimaryFont(), checkBrowserDesignSystemSources(), checkHtmlPatterns(), checkPageQualityDOM(), checkPageQualityFromDoc(), collectBrowserFindings() (+3 more)

### Community 90 - "checkElementDesignSystemDOM"
Cohesion: 0.23
Nodes (20): checkColors(), checkElementAIPaletteDOM(), checkElementColors(), checkElementColorsDOM(), checkElementGlowDOM(), checkElementIconTile(), checkElementIconTileDOM(), checkGlow() (+12 more)

### Community 91 - "checkQuality"
Cohesion: 0.22
Nodes (9): After This File, Codex: Visual Direction & Asset Production, Four stop points before code, Step A: Explore Directions with the User, Step B: Generate the Brand Palette First, Step C: Generate 1-3 Visual Mocks Against the Palette, Step D: Approval Loop, Step E: Mock Fidelity Inventory (+1 more)

### Community 92 - "Generate Report"
Cohesion: 0.13
Nodes (14): 1. Accessibility (A11y), 2. Performance, 3. Theming, 4. Responsive Design, 5. Anti-Patterns (CRITICAL), Anti-Patterns Verdict, Audit Health Score, Detailed Findings by Severity (+6 more)

### Community 93 - "layout.md"
Cohesion: 0.13
Nodes (14): Assess Current Layout, Break Card Grid Monotony, Choose the Right Layout Tool, Create Visual Rhythm, Establish a Spacing System, Improve Layout Systematically, Live-mode signature params, Manage Depth & Elevation (+6 more)

### Community 94 - "sampleCssBackground"
Cohesion: 0.20
Nodes (15): blendRgba(), clampByte(), firstCssUrl(), getLayerValue(), loadVisualContrastImage(), parseObjectPosition(), parsePositionPair(), parsePositionToken() (+7 more)

### Community 95 - "parseAnyColor"
Cohesion: 0.12
Nodes (21): borderColorsFromStyle(), borderWidthsFromStyle(), browserColorsClose(), browserHasDirectText(), browserRadiusTokens(), browserSampleText(), checkCreamPalette(), checkElementDesignSystemDOM() (+13 more)

### Community 96 - "typeset.md"
Cohesion: 0.25
Nodes (11): directChildDirs(), discoverRootsForPattern(), discoverTargetCandidates(), expandSimplePattern(), findTargetExample(), hasFallbackWorkspaceChildren(), isIgnoredWorkspaceDiscoveryDir(), isMonorepoRoot() (+3 more)

### Community 97 - "Brand register"
Cohesion: 0.14
Nodes (14): Brand bans (on top of the shared absolute bans), Brand permissions, Brand register, Color, Font selection procedure, Imagery, Layout, Motion (+6 more)

### Community 98 - "live.md"
Cohesion: 0.14
Nodes (13): Cleanup, Exit, Handle `accept`, Handle `discard`, Handle `manual_edit_apply`, Handle `prefetch`, Handle `steer`, Poll loop (+5 more)

### Community 99 - "optimize.md"
Cohesion: 0.14
Nodes (13): Animation Performance, Assess Performance Issues, Core Web Vitals Optimization, Cumulative Layout Shift (CLS < 0.1), First Input Delay (FID < 100ms) / INP (< 200ms), Largest Contentful Paint (LCP < 2.5s), Loading Performance, Network Optimization (+5 more)

### Community 100 - "Polish Systematically"
Cohesion: 0.10
Nodes (19): Clean Up, Code Quality, Color & Contrast, Content & Copy, Design System Discovery, Edge Cases & Error States, Final Verification, Forms & Inputs (+11 more)

### Community 101 - "StaticElement"
Cohesion: 0.22
Nodes (11): checkElementMotion(), checkElementMotionDOM(), checkLayout(), checkMotion(), checkPageLayout(), isCardLike(), isCardLikeDOM(), isCardLikeFromProps() (+3 more)

### Community 102 - "bolder.md"
Cohesion: 0.15
Nodes (12): Amplify the Design, Assess Current State, Color Amplification, Composition Boldness, Design-System Lock, Motion & Animation, Plan Amplification, Register (+4 more)

### Community 103 - "overdrive.md"
Cohesion: 0.10
Nodes (20): Animate complex properties, Assess What "Extraordinary" Means Here, For data-heavy interfaces, For functional UI, For performance-critical UI, For visual/marketing surfaces, Implement with Discipline, Interact with the device (+12 more)

### Community 104 - "critique-storage.mjs"
Cohesion: 0.32
Nodes (11): kebab(), listSnapshotsForSlug(), main(), nowFilenameStamp(), parseFrontmatter(), readLatestSnapshot(), readTrend(), serializeFrontmatter() (+3 more)

### Community 105 - "collectBrowserFindings"
Cohesion: 0.25
Nodes (7): Extract Flow, Step 1: Discover the Design System, Step 2: Identify Patterns, Step 3: Plan Extraction, Step 4: Extract & Enrich, Step 5: Migrate, Step 6: Document

### Community 106 - "broadcastAgentPollingIfChanged"
Cohesion: 0.14
Nodes (32): acceptCli(), argVal(), buildCarbonizeReplacement(), decodeHtmlAttr(), deindentContent(), detectCommentSyntax(), escapeRegExp(), expandReplaceRange() (+24 more)

### Community 107 - "pin.mjs"
Cohesion: 0.23
Nodes (11): CODEX_HARNESSES, commandPrefixForSkillsDir(), __dirname, findHarnessDirs(), generatePinnedSkill(), HARNESS_DIRS, loadCommandMetadata(), pin() (+3 more)

### Community 108 - "craft.md"
Cohesion: 0.29
Nodes (6): Context, Decisions, Goals / Non-Goals, Migration Plan, Open Questions, Risks / Trade-offs

### Community 109 - "Simplify the Design"
Cohesion: 0.17
Nodes (11): Assess Current State, Code Simplification, Content Simplification, Document Removed Complexity, Information Architecture, Interaction Simplification, Layout Simplification, Plan Simplification (+3 more)

### Community 110 - "Hardening Dimensions"
Cohesion: 0.17
Nodes (11): Accessibility Resilience, Assess Hardening Needs, Edge Cases & Boundary Conditions, Error Handling, Hardening Dimensions, Input Validation & Sanitization, Internationalization (i18n), Performance Resilience (+3 more)

### Community 111 - "SKILL.md"
Cohesion: 0.26
Nodes (12): FORBIDDEN_MANUAL_EDIT_TEXT_CHARS, INSERT_POSITIONS, isValidId(), isValidVariantId(), validateAnnotationFields(), validateEvent(), validateInsertGenerate(), validateManualEditEvent() (+4 more)

### Community 112 - "ui-core.mjs"
Cohesion: 0.23
Nodes (10): createLiveBrowserDomHelpers(), activeElementDeep(), appendStyleToLiveUiRoot(), appendToLiveUiRoot(), escapeCssIdent(), getLiveUiElementById(), LIVE_CHROME_MOUNT_CONTRACT, LIVE_UI_COMPONENT_IDS (+2 more)

### Community 113 - "session-store.mjs"
Cohesion: 0.27
Nodes (9): applyEvent(), baseSnapshot(), COMPLETED_PHASES, getJournalPath(), getSnapshotPath(), rebuildSnapshotFromJournal(), safeSessionId(), toPendingEvent() (+1 more)

### Community 114 - "critique.md"
Cohesion: 0.18
Nodes (10): Action Summary, Ask the User, Assessment A: Design Review, Assessment B: Detector + Browser Evidence, Assessment Orchestration, Hard Invariants, Persist the Snapshot, Purpose (+2 more)

### Community 115 - "Nielsen's 10 Heuristics"
Cohesion: 0.18
Nodes (11): 10. Help and Documentation, 1. Visibility of System Status, 2. Match Between System and Real World, 3. User Control and Freedom, 4. Consistency and Standards, 5. Error Prevention, 6. Recognition Rather Than Recall, 7. Flexibility and Efficiency of Use (+3 more)

### Community 116 - "quieter.md"
Cohesion: 0.18
Nodes (10): Assess Current State, Color Refinement, Composition Refinement, Motion Reduction, Plan Refinement, Refine the Design, Register, Simplification (+2 more)

### Community 117 - "discoverTargetCandidates"
Cohesion: 0.29
Nodes (6): Capabilities, Impact, Modified Capabilities, New Capabilities, What Changes, Why

### Community 118 - "palette.mjs"
Cohesion: 0.24
Nodes (7): args, buildWeights(), hashUnit(), pickSeed(), seed, SEEDS, weightedPick()

### Community 119 - "General rules"
Cohesion: 0.18
Nodes (11): Absolute bans, Color, Color & Theme, Design guidance, General rules, Interaction, Layout, Motion (+3 more)

### Community 120 - "Responsive Design"
Cohesion: 0.27
Nodes (10): bindEditBadgeProxy(), editBadgeProxyTargets(), initEditBadge(), initEditBadgeHitProxies(), positionEditBadge(), proxyMouseEvent(), setImportantStyle(), styleEditBadgeProxy() (+2 more)

### Community 121 - "Craft Flow"
Cohesion: 0.20
Nodes (10): Craft Flow, Gates: do not compress, Production bar, Step 0: Project Foundation, Step 1: Shape the Design, Step 2: Load References, Step 3: Visual Direction & Assets (Harness-Gated), Step 4: Build to Production Quality (+2 more)

### Community 122 - "Generate Combined Critique Report"
Cohesion: 0.20
Nodes (10): Anti-Patterns Verdict, Design Health Score, Generate Combined Critique Report, Minor Observations, Overall Impression, Persona Red Flags, Priority Issues, Questions to Consider (+2 more)

### Community 123 - "Step 3: Ask strategic questions (for PRODUCT.md)"
Cohesion: 0.20
Nodes (10): Accessibility & Inclusion, Brand & Personality, Conversion & proof (brand register only), Interview mode, not confirmation mode, Minimum viable interview, Platform (ask right after register), Positioning, Register (ask first; it shapes everything below) (+2 more)

### Community 124 - "Product register"
Cohesion: 0.20
Nodes (9): Color, Components, Layout, Motion, Product bans (on top of the shared absolute bans), Product permissions, Product register, The product slop test (+1 more)

### Community 125 - "resolveWorkspaceProjectRoot"
Cohesion: 0.36
Nodes (8): coLocatedStylesheets(), expandScanTargets(), hasPathTraversal(), isInsideProject(), normalizeScanTargets(), parseStaticStyleImports(), STYLE_EXTS, UI_CODE_EXTS

### Community 126 - "checkElementTextOverflowDOM"
Cohesion: 0.32
Nodes (8): checkElementTextOverflowDOM(), classSelector(), clippedByInset(), clippedByRect(), expandBoxShorthand(), firstMetricLengthPx(), isScreenReaderOnlyTextStyle(), metricLengthPx()

### Community 127 - "expandScanTargets"
Cohesion: 0.09
Nodes (21): 1. Overview, 2. Colors, 3. Typography, 4. Elevation, 5. Components, 6. Do's and Don'ts, Buttons, Cards / Containers (+13 more)

### Community 128 - "scheduleSteerFocusRecover"
Cohesion: 0.62
Nodes (7): elementMatchesOriginalMarkup(), findLiveElementForOriginalMarkup(), findLiveElementFromAnchorSnapshot(), isUsableInjectionAnchor(), normalizeElementClassName(), parseOriginalMarkupElement(), resolveLiveInjectionAnchor()

### Community 129 - "Common Cognitive Load Violations"
Cohesion: 0.22
Nodes (9): 1. The Wall of Options, 2. The Memory Bridge, 3. The Hidden Navigation, 4. The Jargon Barrier, 5. The Visual Noise Floor, 6. The Inconsistent Pattern, 7. The Multi-Task Demand, 8. The Context Switch (+1 more)

### Community 130 - "Technical Implementation"
Cohesion: 0.10
Nodes (19): Accessibility, Assess Animation Opportunities, CSS Animations, Delight Moments, Entrance Animations, Feedback & Guidance, Implement Animations, JavaScript Animation (+11 more)

### Community 131 - "Persona-Based Design Testing"
Cohesion: 0.25
Nodes (8): 1. Impatient Power User: "Alex", 2. Confused First-Timer: "Jordan", 3. Accessibility-Dependent User: "Sam", 4. Deliberate Stress Tester: "Riley", 5. Distracted Mobile User: "Casey", Persona-Based Design Testing, Project-Specific Personas, Selecting Personas

### Community 132 - "Extract Flow"
Cohesion: 0.09
Nodes (17): Assess Current Typography, Establish Hierarchy, Fix Readability, Font Selection, Improve Typography Systematically, Live-mode signature params, Plan Typography Improvements, Refine Details (+9 more)

### Community 133 - "Init Flow"
Cohesion: 0.25
Nodes (7): Init Flow, Step 1: Load current state, Step 2: Explore the codebase, Step 4: Write PRODUCT.md, Step 5: Decide on DESIGN.md, Step 6: Configure live mode (when code exists), Step 7: Recommend starting points, then wrap up

### Community 134 - "iOS platform"
Cohesion: 0.29
Nodes (6): Context, Decisions, Goals / Non-Goals, Migration Plan, Open Questions, Risks / Trade-offs

### Community 135 - "The Toolkit"
Cohesion: 0.17
Nodes (11): Accessibility & Inclusion, Anti-references, Brand Personality, Conversion & proof, Design Principles, Platform, Positioning, Product (+3 more)

### Community 136 - "readWorkspacePatterns"
Cohesion: 0.29
Nodes (6): Context, Decisions, Goals / Non-Goals, Migration Plan, Open Questions, Risks / Trade-offs

### Community 137 - "README.md"
Cohesion: 0.29
Nodes (5): Categorías de referencia, Fotografía y composición, Fotografía (decisión visual), Caso de uso: agregar una foto nueva a una galería, Patrón de galería: `assets/en-fotos/manifest.json`

### Community 138 - "Android platform"
Cohesion: 0.29
Nodes (10): escapeRegExp(), isExcludedByWorkspacePattern(), MONOREPO_FALLBACK_PROJECT_DIRS, nearestProjectLikeRoot(), normalizeWorkspacePattern(), projectRootFromDoubleStarPattern(), projectRootFromWorkspacePattern(), resolveWorkspaceProjectRoot() (+2 more)

### Community 139 - "Implement Animations"
Cohesion: 0.29
Nodes (7): Audit Health Score, Detailed Findings by Severity, Executive Summary, Generate Report, Patterns & Systemic Issues, Platform Conformance Verdict, Positive Findings

### Community 140 - "Generate Report"
Cohesion: 0.29
Nodes (6): Context, Decisions, Goals / Non-Goals, Migration Plan, Open Questions, Risks / Trade-offs

### Community 141 - "Cognitive Load Assessment"
Cohesion: 0.29
Nodes (7): Cognitive Load Assessment, Cognitive Load Checklist, Extraneous Load: Bad Design, Germane Load: Learning Effort, Intrinsic Load: The Task Itself, The Working Memory Rule, Three Types of Cognitive Load

### Community 142 - "/impeccable hooks"
Cohesion: 0.29
Nodes (6): Capabilities, Impact, Modified Capabilities, New Capabilities, What Changes, Why

### Community 143 - "CSP detection (first-time only)"
Cohesion: 0.29
Nodes (7): append-arrays, append-string, Consent prompt template, CSP detection (first-time only), Drift-heal warning, First-time setup (config missing or invalid), Troubleshooting

### Community 144 - "_"
Cohesion: 0.25
Nodes (9): buildSelectorSegment(), generateSelector(), isElementHidden(), isLikelyHashedClass(), postSerializedFindings(), renderBrowserFindings(), scanResultMeta(), serializeFindings() (+1 more)

### Community 145 - "Arquitectura de marca"
Cohesion: 0.29
Nodes (7): Arquitectura de marca, ENSENADA CULTURA, ENSENADA EN FOTOS, ENSENADA EN VIVO, ENSENADA HISTORIA, ENSENADA IDENTIDAD, ENSENADA (marca madre)

### Community 146 - "acceptedDomAlreadyClean"
Cohesion: 0.29
Nodes (6): Capabilities, Impact, Modified Capabilities, New Capabilities, What Changes, Why

### Community 147 - "Adaptation Strategies"
Cohesion: 0.40
Nodes (4): Purpose, Requirement: La documentación describe con precisión la cantidad real de bloques `:root` en `styles.css`, Requirements, Scenario: Un colaborador agrega una variable CSS nueva

### Community 148 - "Handle fallback"
Cohesion: 0.40
Nodes (5): Handle fallback, Step 1: Identify where the element actually lives, Step 2: Show three variants in the DOM for preview, Step 3: On accept, write to true source, Step 4: On discard, clean up the served file

### Community 149 - "isGeneratedFile"
Cohesion: 0.53
Nodes (5): hasGeneratedHeader(), HEADER_MARKERS, isGeneratedFile(), isGitIgnored(), searchDir()

### Community 150 - "riesgos-mitigados.md"
Cohesion: 0.40
Nodes (3): Riesgos ya mitigados, Historial de migración, Sobre la carpeta `EXPORTACION_PROYECTO` (no incluida en este repo)

### Community 151 - "Funcionalidades futuras"
Cohesion: 0.40
Nodes (5): Concurso de microrelatos "Historias de Ensenada", Concurso fotográfico, Funcionalidades futuras, Otras mejoras de producto planteadas, Páginas por lugar

### Community 152 - "Stack y mapa de archivos"
Cohesion: 0.18
Nodes (9): Alcance actual vs. proyectado, Misión y objetivos, Objetivos, Qué es, Convención de `assets/`, Mapa de archivos, Stack, Stack y mapa de archivos (+1 more)

### Community 153 - "Heuristics Scoring Guide"
Cohesion: 0.50
Nodes (4): Heuristics Scoring Guide, Issue Severity (P0–P3), Reference Material, Score Summary

### Community 154 - "detect.mjs"
Cohesion: 0.50
Nodes (3): candidates, detectorPath, __dirname

### Community 155 - "Contenido de la home"
Cohesion: 0.32
Nodes (8): parseYamlFlowList(), readJson(), readLernaWorkspaces(), readPackageWorkspaces(), readPnpmWorkspaces(), readWorkspacePatterns(), stripYamlInlineComment(), unquoteYamlValue()

### Community 156 - "Misión y objetivos"
Cohesion: 0.08
Nodes (22): Adaptation Strategies, Assess Adaptation Challenge, Implement & Verify, Orientation & foldables, Phone → Tablet (iPad / large screens), Platform → platform (iOS ↔ Android), Web → native (porting a website or web app), 1. Accessibility (VoiceOver / TalkBack) (+14 more)

### Community 158 - "Diagnostic Scan"
Cohesion: 0.29
Nodes (6): Purpose, Requirement: La compresión no introduce degradación visual perceptible, Requirement: Ninguna imagen del repositorio supera 500KB, Requirements, Scenario: Revisión visual de una imagen recomprimida, Scenario: Verificación de peso de imágenes

### Community 159 - "normalizeGitHubEvent"
Cohesion: 0.50
Nodes (3): ADDED Requirements, Requirement: La documentación describe con precisión la cantidad real de bloques `:root` en `styles.css`, Scenario: Un colaborador agrega una variable CSS nueva

### Community 160 - "createManualEditRoutes"
Cohesion: 0.40
Nodes (4): ADDED Requirements, Requirement: El panel del menú mobile abierto es completamente opaco al contenido del hero, Scenario: Menú abierto sobre el hero, Scenario: Verificación en múltiples anchos

### Community 161 - "4. Plan three variants: identity first, then mode, then axes"
Cohesion: 0.29
Nodes (6): Constraints, Failure modes, Flow, /impeccable hooks, Intentional findings, Routing

### Community 162 - "Requirement: El panel del menú mobile abierto es completamente opaco al contenido del hero"
Cohesion: 0.50
Nodes (3): 1. Aplicar el fix, 2. Verificación, 3. Deploy

### Community 163 - "checkElementQuality"
Cohesion: 0.29
Nodes (6): Context, Decisions, Goals / Non-Goals, Migration Plan, Open Questions, Risks / Trade-offs

### Community 164 - "Requirement: Las place-cards usan un radio de esquina consistente con las demás tarjetas del sitio"
Cohesion: 0.29
Nodes (6): Capabilities, Impact, Modified Capabilities, New Capabilities, What Changes, Why

### Community 166 - "Improve Typography Systematically"
Cohesion: 0.12
Nodes (22): checkElementOversizedH1(), checkElementOversizedH1DOM(), checkElementQuality(), checkElementQualityDOM(), checkOversizedH1(), checkQuality(), checkRepeatedSectionKickers(), checkRepeatedSectionKickersDOM() (+14 more)

### Community 167 - "Requirement: Las place-cards usan un radio de esquina consistente con las demás tarjetas del sitio"
Cohesion: 0.33
Nodes (5): Purpose, Requirement: Las place-cards usan un radio de esquina consistente con las demás tarjetas del sitio, Requirements, Scenario: La imagen de portada respeta la esquina redondeada, Scenario: Renderizado de las place-cards

### Community 168 - "Requirement: Las place-cards usan un radio de esquina consistente con las demás tarjetas del sitio"
Cohesion: 0.40
Nodes (4): ADDED Requirements, Requirement: Las place-cards usan un radio de esquina consistente con las demás tarjetas del sitio, Scenario: La imagen de portada respeta la esquina redondeada, Scenario: Renderizado de las place-cards

### Community 169 - "tasks.md"
Cohesion: 0.50
Nodes (3): 1. Aplicar el fix, 2. Verificación, 3. Deploy

### Community 170 - "README.md"
Cohesion: 0.29
Nodes (3): Marca, Índice de documentación — Turismo Ensenada, Técnico

### Community 171 - "ADDED Requirements"
Cohesion: 0.47
Nodes (6): applyPatchText(), envProjectDir(), looksLikeApplyPatch(), normalizeGitHubEvent(), normalizeHookEvent(), parseGitHubToolArgs()

### Community 172 - "Adaptation Strategies"
Cohesion: 0.29
Nodes (7): Android platform, Color & theming, Components & motion, Layout & structure, The Android slop test, Touch targets, Typography

### Community 173 - "checkElementQuality"
Cohesion: 0.29
Nodes (6): Capabilities, Impact, Modified Capabilities, New Capabilities, What Changes, Why

### Community 174 - "tasks.md"
Cohesion: 0.33
Nodes (5): ADDED Requirements, Requirement: La compresión no introduce degradación visual perceptible, Requirement: Ninguna imagen del repositorio supera 500KB, Scenario: Revisión visual de una imagen recomprimida, Scenario: Verificación de peso de imágenes

### Community 175 - "tasks.md"
Cohesion: 0.50
Nodes (3): 1. Reemplazar los archivos comprimidos, 2. Verificación, 3. Documentación y deploy

### Community 176 - "design.md"
Cohesion: 0.29
Nodes (6): Context, Decisions, Goals / Non-Goals, Migration Plan, Open Questions, Risks / Trade-offs

### Community 177 - "proposal.md"
Cohesion: 0.29
Nodes (6): Capabilities, Impact, Modified Capabilities, New Capabilities, What Changes, Why

### Community 178 - "Requirement: Las fotos del carrete de la Fragata son operables por teclado"
Cohesion: 0.33
Nodes (5): Purpose, Requirement: Las fotos del carrete de la Fragata son operables por teclado, Requirements, Scenario: El foco es visible, Scenario: Navegar y abrir una foto del carrete de la Fragata por teclado

### Community 179 - "tasks.md"
Cohesion: 0.40
Nodes (4): ADDED Requirements, Requirement: Las fotos del carrete de la Fragata son operables por teclado, Scenario: El foco es visible, Scenario: Navegar y abrir una foto del carrete de la Fragata por teclado

### Community 181 - "tasks.md"
Cohesion: 0.50
Nodes (3): 1. Aplicar el fix, 2. Verificación, 3. Deploy

### Community 182 - "The Toolkit"
Cohesion: 0.29
Nodes (6): Purpose, Requirement: Las páginas declaran las propiedades Open Graph recomendadas, Requirement: Todas las páginas tienen Twitter Card completo, Requirements, Scenario: Compartir el link de En Fotos en Twitter/X, Scenario: Un scraper de red social lee la metadata

### Community 183 - "Implement Animations"
Cohesion: 0.53
Nodes (6): bumpEditCount(), dedupeAgainstCache(), ensureFile(), ensureSession(), findingCacheKey(), rememberFindings()

### Community 184 - "checkElementGptBorderShadowDOM"
Cohesion: 0.33
Nodes (5): ADDED Requirements, Requirement: Las páginas declaran las propiedades Open Graph recomendadas, Requirement: Todas las páginas tienen Twitter Card completo, Scenario: Compartir el link de En Fotos en Twitter/X, Scenario: Un scraper de red social lee la metadata

### Community 185 - "design.md"
Cohesion: 0.40
Nodes (5): 4. Plan three variants: identity first, then mode, then axes, Phase A: Extract the identity (non-skippable), Phase B: Pick mode (default vs departure), Phase C: Plan three variants, Phase D: Squint test

### Community 186 - "proposal.md"
Cohesion: 0.50
Nodes (3): 1. Completar metadata en en-fotos/index.html, 2. Completar metadata en index.html, 3. Verificación y deploy

### Community 189 - "checkHeroEyebrow"
Cohesion: 0.40
Nodes (5): checkElementHeroEyebrow(), checkElementHeroEyebrowDOM(), checkHeroEyebrow(), isAccentColor(), resolveVarRefs()

## Knowledge Gaps
- **905 isolated node(s):** `Context`, `Goals / Non-Goals`, `Decisions`, `Risks / Trade-offs`, `Migration Plan` (+900 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **7 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `el()` connect `el` to `checks.mjs`, `index.mjs`, `StaticElement`, `design-system.mjs`, `Improve Typography Systematically`, `Identidad y sistema visual de marca`, `resumeSession`, `setLiveState`, `css-cascade.mjs`, `showToast`, `_`, `detect-html.mjs`, `detect-text.mjs`, `initGlobalBar`, `resolveContext`, `parseRgb`, `parseAnyColor`?**
  _High betweenness centrality (0.055) - this node is a cross-community bridge._
- **Why does `v()` connect `modern-screenshot.umd.js` to `checks.mjs`, `Identidad y sistema visual de marca`, `context-signals.mjs`, `initGlobalBar`, `design-parser.mjs`, `checkHeroEyebrow`?**
  _High betweenness centrality (0.044) - this node is a cross-community bridge._
- **Why does `normalizeSourceFallbackBlock()` connect `Identidad y sistema visual de marca` to `css-cascade.mjs`, `resumeSession`?**
  _High betweenness centrality (0.028) - this node is a cross-community bridge._
- **Are the 29 inferred relationships involving `el()` (e.g. with `browserFindingsFromMap()` and `collectVisualContrastCandidates()`) actually correct?**
  _`el()` has 29 INFERRED edges - model-reasoned connections that need verification._
- **Are the 7 inferred relationships involving `initGlobalBar()` (e.g. with `hideAgentPollTooltip()` and `onDetectMessage()`) actually correct?**
  _`initGlobalBar()` has 7 INFERRED edges - model-reasoned connections that need verification._
- **What connects `Context`, `Goals / Non-Goals`, `Decisions` to the rest of the system?**
  _913 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `Interacciones de UI (script.js)` be split into smaller, more focused modules?**
  _Cohesion score 0.043478260869565216 - nodes in this community are weakly interconnected._