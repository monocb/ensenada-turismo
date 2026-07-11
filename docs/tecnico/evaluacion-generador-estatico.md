# Evaluación: ¿conviene un generador estático?

Investigación realizada en **julio 2026**. Antes de reutilizar esta recomendación después de mucho tiempo, re-validar contra la documentación oficial citada acá (no artículos de comparación de terceros, que suelen ser contenido genérico poco confiable).

## Por qué esta evaluación

El stack actual (HTML/CSS/JS plano, sin build, sin dependencias — ver [`stack-y-mapa-de-archivos.md`](stack-y-mapa-de-archivos.md)) funciona bien para las 3 páginas reales que tiene el sitio hoy. Pero [`funcionalidades-futuras.md`](../proyecto/funcionalidades-futuras.md) ya documenta dos features que el patrón actual no va a soportar bien:

- **Páginas por lugar**: 8 páginas nuevas (una por punto de interés), hoy solo ancladas dentro del home. Van a repetir header/nav/footer, algo que a mano se vuelve tedioso y propenso a inconsistencias más allá de 2-3 páginas.
- **Sistema de datos para eventos, concursos, notas y galerías**: el concurso de fotos (jurado + voto público) y el concurso de microrelatos necesitan un manejo de datos más serio que el patrón actual de atributos `data-photo-*` en HTML, que hoy alcanza para las galerías de fotos.

`CLAUDE.md` pide consultar antes de agregar build o dependencias al proyecto. Este documento es esa consulta, resuelta de antemano para no bloquear el arranque de esas features cuando llegue el momento.

## Comparación (fuentes oficiales)

| | Astro Content Collections | Eleventy data cascade |
|---|---|---|
| Fuente | [docs.astro.build/en/guides/content-collections](https://docs.astro.build/en/guides/content-collections/) | [11ty.dev/docs/data](https://www.11ty.dev/docs/data/) |
| Tipado / validación | Sí — schemas Zod, valida en build | No — la consistencia de datos queda a cargo del desarrollador |
| ¿Requiere un framework de UI (React/Vue)? | No — funciona con componentes `.astro` planos y HTML | No — plantillas propias (Nunjucks, Liquid, etc.) |
| Adopción incremental | Sí — puramente aditivo, se puede convertir una sección sin tocar el resto | Sí — se puede convertir una plantilla a la vez |
| Estructura de proyecto | Requiere adoptar la propia de Astro (`src/content/`, `src/pages/`, `src/content.config.ts`) | Trabaja sobre las carpetas existentes, sin reestructurar |
| JS de framework en el output final | No, salvo que se agreguen "islands" explícitamente | No |

Ambas herramientas permiten adopción incremental y ninguna obliga a usar React/Vue — la elección entre ellas depende de **cuál de los dos problemas se resuelve primero**, no de una preferencia general.

## Recomendación

**No hay una única herramienta recomendada para todo el proyecto — depende de qué feature arranca primero.**

### Si "páginas por lugar" arranca primero → Eleventy

El problema ahí es estructural (HTML repetido), no de integridad de datos: 8 páginas con contenido fijo y estable (nombre, descripción, fotos de un lugar), cargado por el propio mantenedor. Eleventy resuelve esto con la menor fricción posible:

- No requiere adoptar una estructura de proyecto nueva.
- No shipea runtime de ningún framework de UI — el sitio sigue siendo HTML/CSS/JS plano en el output.
- La falta de validación de schema no es un problema serio acá: mismo perfil de riesgo que el patrón `data-photo-*` hoy (pocos datos, cargados a mano, un solo mantenedor).

### Si el sistema de datos de concursos arranca primero → reconsiderar Astro Content Collections

Acá el problema sí es de integridad de datos: submissions de un concurso (potencialmente de terceros), con campos que necesitan consistencia (título, foto, categoría, estado de votación). Astro Content Collections da validación por schema en tiempo de build — algo que Eleventy no ofrece de forma nativa. Astro tampoco obliga a adoptar React/Vue: se puede usar solo por su capa de datos, manteniendo `script.js` vanilla para toda la interactividad como está hoy. El costo es mayor fricción inicial (adoptar la estructura de proyecto de Astro), justificable cuando el dolor real es la integridad de los datos.

### Si ambos triggers terminan conviviendo

Antes de terminar con dos herramientas distintas en el mismo repo, evaluar si Astro puede cubrir ambos casos (Content Collections para los datos + páginas generadas desde esos datos). Esa evaluación puntual le corresponde al `/opsx:propose` que dispare la segunda migración, con el contexto real de ese momento.

### Para el sistema de concursos (independiente del generador elegido)

**Netlify Forms + Netlify Functions**, no backend propio. Netlify Forms da recepción de submissions con spam-filtering (Akismet) incluido sin backend; Netlify Functions (serverless) cubre la lógica de votación/jurado. Se mantiene en el ecosistema Netlify que el proyecto ya usa, sin agregar infraestructura nueva.

## Antes de comprometerse: un spike acotado

Al llegar el momento del trigger que corresponda, antes de migrar las 8+ páginas o todo el sistema de datos de una vez, conviene un spike chico y acotado en el tiempo (por ejemplo, una tarde: convertir el header/nav/footer a un include, o modelar un solo lugar/concurso con la herramienta elegida) para validar que funciona bien con el deploy actual de Netlify. No asumir que la adopción va a ser tan lisa como sugiere la documentación de cada herramienta.

## Qué NO hacer

- No migrar nada todavía — ninguno de los dos triggers está activo hoy.
- No adoptar un framework SPA (React/Vue/Next.js) como reemplazo integral del sitio — sobre-ingeniería para un sitio de contenido/turismo de este tamaño, perjudica SEO sin necesidad de SSR adicional.
- No mezclar Astro y Eleventy sin evaluar antes si conviene consolidar en una sola herramienta (ver "si ambos triggers terminan conviviendo").

## Alternativas descartadas

- **Hugo / Jekyll / Gatsby**: no evaluadas en profundidad. Gatsby es React-based (mismo costo que Astro, sin su ventaja de poder usarse sin framework). Hugo/Jekyll no aportan ventaja clara sobre Astro/Eleventy para un proyecto ya JS-friendly como este, y fragmentarían el stack (Go/Ruby vs. el JS ya usado en `script.js`).
