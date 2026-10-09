## MODIFIED Requirements

### Requirement: La documentación describe con precisión la cantidad real de bloques `:root` en `styles.css`
`docs/tecnico/convenciones-css.md` y `CLAUDE.md` SHALL describir con precisión dónde se declaran los tokens CSS que el sitio usa realmente, y SHALL nombrar `styles.css` como la hoja histórica que ninguna página carga, no como el CSS del sitio.

El requisito pedía que la documentación indicara el número real de bloques `:root` de `styles.css`, para que alguien que fuera a agregar una variable supiera cuántos revisar. Esa guía quedó obsoleta: ya no se agregan variables a `styles.css`. Lo que hace falta ahora es que la documentación diga qué hojas están vivas y dónde se declaran los tokens.

#### Scenario: Un colaborador agrega una variable CSS nueva
- **WHEN** un colaborador lee `docs/tecnico/convenciones-css.md` o `CLAUDE.md` antes de agregar una variable CSS nueva
- **THEN** encuentra que los tokens se declaran una sola vez, en la capa compartida de `assets/css/`, y que `styles.css` no interviene

#### Scenario: Un colaborador va a corregir un estilo
- **WHEN** un colaborador busca en la documentación qué archivo tocar para cambiar un estilo del sitio
- **THEN** encuentra nombradas las hojas vivas y cuál corresponde a cada página, y encuentra dicho explícitamente que `styles.css` quedó fuera de uso

## ADDED Requirements

### Requirement: La documentación advierte de los modos de falla silenciosa del CSS

`docs/tecnico/convenciones-css.md` y `CLAUDE.md` SHALL registrar los errores de estilo que no producen error de consola ni hallazgo de linter y que, por eso, se descubren recién mirando la página renderizada.

#### Scenario: Una regla de estado no se aplica

- **WHEN** un colaborador busca por qué una regla enganchada a una clase de estado no hace nada
- **THEN** la documentación le dice que los nombres de estado los fija `script.js` y que un desfasaje de nombre no reporta error en ningún lado

#### Scenario: Un elemento con máscara no se ve

- **WHEN** un colaborador busca por qué un elemento pintado con máscara no aparece
- **THEN** la documentación le dice que un `<span>` sin `display: block` colapsa a 0×0 cuando su contenedor no lo blockifica
