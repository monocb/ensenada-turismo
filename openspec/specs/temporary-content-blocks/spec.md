# temporary-content-blocks Specification

## Purpose
Establecer una convención para publicar y retirar eventos y campañas temporales mediante marcadores y un procedimiento documentado, sin dejar enlaces, estilos ni assets huérfanos.
## Requirements
### Requirement: Todo contenido temporal está delimitado por comentarios marcadores

El contenido publicado con fecha de vencimiento (campañas, eventos, convocatorias) SHALL quedar encerrado entre comentarios marcadores de apertura y cierre en cada archivo que lo contenga (`index.html`, `styles.css`, `script.js`), con un identificador de bloque idéntico en todos los archivos.

#### Scenario: Localizar todo el contenido temporal de un bloque

- **WHEN** se busca el identificador del bloque en el repositorio con `grep -rn "<identificador>" index.html styles.css script.js`
- **THEN** se obtienen los pares de marcadores de apertura y cierre de cada archivo involucrado, sin omitir ninguno

#### Scenario: El marcador declara su fecha de baja prevista

- **WHEN** se lee el comentario de apertura de un bloque temporal
- **THEN** indica qué es el bloque, desde cuándo está publicado, cuándo se prevé darlo de baja y dónde está documentado el procedimiento

### Requirement: El procedimiento de baja está documentado antes de publicar

Cada bloque temporal SHALL tener, en el momento de publicarse, una página en `docs/` que liste los archivos y assets que lo componen y los pasos exactos para retirarlo, indexada desde el índice de documentación.

#### Scenario: La documentación existe al publicar

- **WHEN** el bloque temporal está publicado en el sitio
- **THEN** existe su página de baja en `docs/` con el inventario de archivos y assets y los pasos de retiro, enlazada desde el índice de `docs/`

#### Scenario: Baja ejecutable por otra persona

- **WHEN** alguien que no participó de la implementación sigue el procedimiento documentado
- **THEN** puede retirar el bloque completo sin inspeccionar el historial de git ni adivinar qué archivos toca

### Requirement: La baja devuelve el sitio a su estado previo sin residuos

Retirar un bloque temporal SHALL poder hacerse en un solo commit y SHALL no dejar residuos: ni reglas CSS huérfanas, ni enlaces de navegación apuntando a secciones inexistentes, ni assets sin referencia en `assets/`, ni handlers de JS sobre elementos ausentes.

#### Scenario: Sin enlaces rotos tras la baja

- **WHEN** se retira el bloque y se recorre el sitio
- **THEN** ningún enlace de navegación apunta a un ancla que ya no existe

#### Scenario: Sin assets huérfanos tras la baja

- **WHEN** se retira el bloque
- **THEN** los assets que existían solo para ese bloque quedan eliminados del repositorio, según el inventario de su página de baja

#### Scenario: El JS no rompe sin el bloque

- **WHEN** se retira el HTML del bloque pero se carga el sitio antes de limpiar el JS asociado
- **THEN** la consola no reporta errores: el código del bloque consulta sus elementos de forma tolerante a que no existan, igual que el resto de `script.js`
