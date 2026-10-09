## Purpose

TBD - created by syncing change fix-css-conventions-doc-drift. Update Purpose after archive.
## Requirements
### Requirement: La documentación describe con precisión la cantidad real de bloques `:root` en `styles.css`
`docs/tecnico/convenciones-css.md` y `CLAUDE.md` SHALL describir con precisión dónde se declaran los tokens CSS que el sitio usa realmente, y SHALL nombrar `styles.css` como la hoja histórica que ninguna página carga, no como el CSS del sitio.

El requisito pedía que la documentación indicara el número real de bloques `:root` de `styles.css`, para que alguien que fuera a agregar una variable supiera cuántos revisar. Esa guía quedó obsoleta: ya no se agregan variables a `styles.css`. Lo que hace falta ahora es que la documentación diga qué hojas están vivas y dónde se declaran los tokens.

#### Scenario: Un colaborador agrega una variable CSS nueva
- **WHEN** un colaborador lee `docs/tecnico/convenciones-css.md` o `CLAUDE.md` antes de agregar una variable CSS nueva
- **THEN** encuentra que los tokens se declaran una sola vez, en la capa compartida de `assets/css/`, y que `styles.css` no interviene

#### Scenario: Un colaborador va a corregir un estilo
- **WHEN** un colaborador busca en la documentación qué archivo tocar para cambiar un estilo del sitio
- **THEN** encuentra nombradas las hojas vivas y cuál corresponde a cada página, y encuentra dicho explícitamente que `styles.css` quedó fuera de uso

### Requirement: La documentación describe con precisión el mecanismo real de las galerías de fotos
`CLAUDE.md` y la documentación técnica del patrón de galerías SHALL describir el mecanismo verificable en `script.js` (atributos `data-photo-*` + numeración secuencial de archivos), no un mecanismo basado en `manifest.json` que ningún código lee.

#### Scenario: Un colaborador agrega una foto nueva a una galería existente
- **WHEN** un colaborador lee `CLAUDE.md` o la documentación técnica de galerías antes de agregar una foto nueva
- **THEN** encuentra instrucciones que reflejan el mecanismo real: subir el archivo con el número secuencial siguiente y actualizar `data-photo-count` en el HTML de la sección correspondiente

#### Scenario: No queda ningún archivo de datos sin uso documentado como si estuviera activo
- **WHEN** se busca `manifest.json` en el repositorio
- **THEN** no existe el archivo `assets/en-fotos/manifest.json`, ni referencias a él como mecanismo activo en la documentación

### Requirement: DESIGN.md describe con precisión el estado resuelto del radio de las place-cards
`DESIGN.md` SHALL describir el radio de 18px de las place-cards (`.place-card`) como una decisión de marca ya resuelta (change archivado `2026-07-10-unify-place-card-radius`), documentada como el radio nombrado de "card" compartido con `.fragata-hero`, `.video-panel` y `.culture-slide` — no como una deriva no intencional pendiente de unificar.

#### Scenario: Un colaborador lee DESIGN.md sobre el radio de las place-cards
- **WHEN** un colaborador lee la sección "Cards / Containers" de `DESIGN.md`
- **THEN** encuentra que el radio de 18px es la decisión vigente y documentada, no una nota de "candidato a unificar en una futura pasada"

#### Scenario: Un colaborador busca los radios nombrados del sistema
- **WHEN** un colaborador lee la sección de tokens de `DESIGN.md` (`rounded.*`)
- **THEN** encuentra un token de "card" (18px) además de `control` (10px), `pill` (999px) y `flat` (0px)

### Requirement: La documentación advierte de los modos de falla silenciosa del CSS

`docs/tecnico/convenciones-css.md` y `CLAUDE.md` SHALL registrar los errores de estilo que no producen error de consola ni hallazgo de linter y que, por eso, se descubren recién mirando la página renderizada.

#### Scenario: Una regla de estado no se aplica

- **WHEN** un colaborador busca por qué una regla enganchada a una clase de estado no hace nada
- **THEN** la documentación le dice que los nombres de estado los fija `script.js` y que un desfasaje de nombre no reporta error en ningún lado

#### Scenario: Un elemento con máscara no se ve

- **WHEN** un colaborador busca por qué un elemento pintado con máscara no aparece
- **THEN** la documentación le dice que un `<span>` sin `display: block` colapsa a 0×0 cuando su contenedor no lo blockifica

