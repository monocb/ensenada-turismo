## Context

Estado actual (verificado en este mismo repo): 3 páginas reales (`index.html`, `en-fotos/index.html`, `404.html`), `script.js` (479 líneas, vanilla, sin build), `styles.css` (7.893 líneas, con parches aditivos fechados), deploy estático directo a Netlify (`netlify.toml` con `publish = "."`, sin build command), un solo mantenedor. `docs/proyecto/funcionalidades-futuras.md` documenta como próximas features: "páginas por lugar" (8 páginas nuevas para puntos de interés hoy solo anclados en el home) y un "sistema de datos para eventos, concursos, notas y galerías" (concurso de fotos con jurado + voto público, concurso de microrelatos).

Investigación (julio 2026), contrastada contra documentación oficial — no artículos de comparación genéricos tipo "X vs Y 2026":

- **Astro Content Collections** ([docs.astro.build/en/guides/content-collections](https://docs.astro.build/en/guides/content-collections/)): sistema de datos tipado con validación por schema (Zod). **No requiere React/Vue/ningún framework de UI** — funciona con componentes `.astro` planos y HTML. Es puramente aditivo: se puede convertir una sección a Content Collections dejando el resto del sitio sin tocar, lo que también habilita adopción incremental. Trade-off real: requiere adoptar la estructura de proyecto de Astro (`src/content.config.ts`, `src/content/`, `src/pages/`), a diferencia de trabajar sobre las carpetas actuales tal cual están.
- **Eleventy data cascade** ([11ty.dev/docs/data](https://www.11ty.dev/docs/data/)): sistema de datos jerárquico (front matter, archivos de datos por directorio, datos globales) que se fusiona por prioridad. Es flexible pero **no tipado** — la documentación oficial es explícita en que la consistencia de la estructura de datos queda a cargo del desarrollador, sin validación de schema. Eleventy permite trabajar con la estructura de carpetas existente sin reescribirla, y convertir plantillas de a una.

## Resumen de la corrección de rumbo

La primera versión de este documento (previa a esta revisión) recomendaba Eleventy y descartaba Astro con el argumento de que "Astro se justifica recién cuando se necesitan componentes de framework" — ese argumento es **incorrecto**: Astro no requiere ningún framework de UI, y su ventaja real y específica para este proyecto es la validación por schema de Content Collections, relevante justamente para el futuro "sistema de datos para eventos, concursos, notas y galerías" (datos con estructura que hoy se mantiene a mano en `manifest.json`, sin ninguna validación). Esta revisión reformula la recomendación como dependiente de **cuál de los dos triggers ocurre primero**, en vez de una elección única para todo el proyecto.

## Goals / Non-Goals

**Goals:**
- Dar una recomendación clara y accionable (no un "depende" sin conclusión) sobre qué stack usar para "páginas por lugar" y el futuro sistema de datos de concursos.
- Definir condiciones concretas y verificables de cuándo migrar (no "cuando parezca buena idea").
- Mantener la recomendación consistente con las restricciones explícitas del proyecto (`CLAUDE.md`: sin build/dependencias sin consultar, sin tests de regresión visual, un solo mantenedor).

**Non-Goals:**
- No se decide ni se ejecuta la migración en este cambio.
- No se evalúan frameworks SPA (React/Vue/Next.js) — ya descartados en el informe de auditoría previo por ser sobreingeniería para un sitio de contenido/turismo.
- No se diseña el esquema de datos del futuro sistema de concursos — eso es un cambio aparte, posterior a la decisión de stack.

## Decisions

**No hay una única recomendación para "todo el proyecto" — depende de cuál de los dos triggers documentados ocurre primero.**

**Si "páginas por lugar" arranca primero → Eleventy.**
El problema ahí es estructural, no de datos: 8 páginas nuevas que van a repetir header/nav/footer, con contenido mayormente fijo por página (nombre, descripción, fotos de un punto de interés). Eleventy resuelve esto con menor fricción:
1. No requiere adoptar una estructura de proyecto nueva — trabaja sobre las carpetas actuales, se puede convertir una plantilla a la vez.
2. No shipea runtime de ningún framework de UI al cliente — el output final sigue siendo HTML/CSS/JS plano, coherente con la identidad técnica actual.
3. La falta de validación de schema no es un problema serio acá: los datos de "8 lugares" son pocos, estables y los va a cargar el propio mantenedor a mano — el mismo perfil de riesgo que `manifest.json` hoy.

**Si el "sistema de datos de concursos" arranca primero → reconsiderar Astro Content Collections en serio.**
Acá el problema sí es de datos: submissions de un concurso (potencialmente de terceros, no solo del mantenedor), con campos que necesitan consistencia (título, foto, categoría, estado de votación). Astro Content Collections da validación por schema (Zod) en tiempo de build, algo que la data cascade de Eleventy no ofrece (por documentación propia de 11ty, la consistencia de estructura queda a cargo del desarrollador). Astro tampoco requiere React/Vue — se puede usar solo por esta capa de datos, manteniendo `script.js` vanilla para la interactividad. El costo es adoptar la estructura de proyecto de Astro (`src/content/`, `src/pages/`), mayor fricción inicial que Eleventy pero justificable si el dolor real es la integridad de los datos, no la duplicación de HTML.

**Si ambos triggers terminan conviviendo (páginas por lugar Y concursos):** evaluar si Astro puede cubrir ambos casos (Content Collections para los datos + páginas generadas desde esos datos) antes de terminar con dos herramientas distintas en el mismo repo — pero esa evaluación puntual le corresponde al `/opsx:propose` que dispare la migración, con el contexto real de ese momento, no a este documento.

**Para el futuro sistema de concursos, independientemente del generador elegido: Netlify Forms + Netlify Functions, no backend propio.**
Netlify Forms da recepción de submissions y spam-filtering (Akismet) sin backend; Netlify Functions (serverless) cubre lógica de votación/jurado. Se mantiene en el ecosistema Netlify ya usado, sin agregar infraestructura nueva.

**Antes de comprometerse en el momento del trigger: un spike acotado, no una migración a ciegas.**
Independientemente de cuál dispare primero, antes de encarar la migración completa conviene un spike de alcance chico y tiempo acotado (ej. una tarde: convertir el header/nav/footer a un include, o modelar un solo lugar/concurso como Content Collection) para validar que la herramienta elegida funciona bien con el deploy actual de Netlify, antes de comprometer toda la migración de 8+ páginas. No asumir que la adopción va a ser tan lisa como sugiere la documentación de cada herramienta.

**Alternativas descartadas (para ambos triggers):**
- **No hacer nada / seguir 100% HTML a mano incluso con 11+ páginas** — descartado: la duplicación de header/nav/footer y el mantenimiento manual de datos tipo `manifest.json` ya está identificado como no escalable en la propia documentación del proyecto.
- **Hugo/Jekyll/Gatsby** — no evaluados en profundidad: Gatsby es React-based (mismo costo que Astro sin su ventaja de poder usarse sin framework); Hugo/Jekyll no aportan ventaja clara sobre Astro/Eleventy para un proyecto ya JS-friendly como este, y fragmentarían el stack (Go/Ruby vs. el JS ya usado en `script.js`).
- **Frameworks SPA (React/Vue/Next.js) como reemplazo integral** — descartado, ver `Non-Goals`.

## Risks / Trade-offs

- **[Riesgo] Este documento puede quedar desactualizado si el ecosistema Astro/Eleventy cambia significativamente.** → Mitigación: se documenta la fecha de la investigación (julio 2026) y las fuentes oficiales consultadas; si pasan más de ~12 meses antes de disparar la migración, conviene re-validar antes de ejecutar, empezando por releer la documentación oficial citada acá (no artículos de comparación de terceros).
- **[Riesgo] Terminar con dos herramientas distintas en el mismo repo si ambos triggers se disparan en momentos separados (Eleventy para lugares, Astro para concursos).** → Mitigación: explícitamente señalado arriba — si ambos triggers terminan conviviendo, el `/opsx:propose` que dispare el segundo debe evaluar si conviene migrar lo ya hecho a una sola herramienta, no asumir que da igual mezclarlas.
- **[Riesgo] El spike de validación recomendado puede revelar fricciones no anticipadas en esta investigación (ej. problemas específicos con el deploy de Netlify).** → Mitigación: por eso se recomienda un spike acotado en tiempo antes de comprometer la migración completa, no saltar directo a migrar las 8+ páginas.
- **[Riesgo] Ninguno operacional inmediato** — este cambio no toca el sitio en producción, es solo documentación.

## Migration Plan

(Aplica a la documentación de este cambio, no a una migración de stack)
1. Escribir `docs/tecnico/evaluacion-generador-estatico.md` con la comparación completa y la recomendación.
2. Enlazar desde `docs/tecnico/README.md` y `docs/proyecto/funcionalidades-futuras.md`.
3. Commit + push a `main` (cambio de documentación, deploy automático sin efecto visible en el sitio).

## Open Questions

Ninguna — la recomendación es clara. La decisión de *cuándo* ejecutar la migración queda en manos del usuario/mantenedor del proyecto, no de este cambio.
