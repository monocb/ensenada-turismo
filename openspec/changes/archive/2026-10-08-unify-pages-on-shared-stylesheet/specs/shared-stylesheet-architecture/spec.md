## ADDED Requirements

### Requirement: El CSS compartido se declara una sola vez

Los estilos que usan varias páginas —tokens de marca, base tipográfica, encabezado, pie y diálogos— SHALL vivir en una única hoja compartida que todas las páginas cargan. Ninguna página SHALL redeclarar por su cuenta un estilo que ya provee la capa compartida.

#### Scenario: Una corrección vale para todas las páginas

- **WHEN** se corrige una regla de un componente compartido
- **THEN** la corrección se aplica a todas las páginas del sitio sin editar la hoja de cada una

#### Scenario: Los tokens existen en un solo lugar

- **WHEN** se buscan las declaraciones de tokens de marca en las hojas del sitio
- **THEN** aparecen en un único bloque, en la hoja compartida, y no repartidas en varios

### Requirement: Cada página suma sólo lo suyo

Además de la capa compartida, cada página SHALL cargar una hoja propia con los estilos exclusivos de esa página. Una hoja de página SHALL no contener estilos de una página distinta.

#### Scenario: Cargar una página del sitio

- **WHEN** se inspeccionan las hojas de estilo que carga cualquier página
- **THEN** son la capa compartida y la hoja de esa página, en ese orden

### Requirement: Las hojas vivas no se pelean por especificidad

Las hojas que el sitio sirve SHALL no usar `!important` para resolver conflictos entre reglas propias.

#### Scenario: Buscar declaraciones forzadas

- **WHEN** se buscan declaraciones `!important` en las hojas que cargan las páginas
- **THEN** no aparece ninguna

### Requirement: Los nombres de clase de estado los fija el JavaScript

Las clases que marcan estado en tiempo de ejecución (menú abierto, encabezado condensado, elemento revelado, diálogo abierto) SHALL ser las que escribe `script.js`, y el CSS SHALL escribirse contra esos nombres. Cuando una regla dependa de una clase de estado, el nombre SHALL coincidir exactamente con el que el JavaScript aplica.

#### Scenario: Una regla de estado no se aplica

- **WHEN** una regla enganchada a una clase de estado no produce ningún efecto visible
- **THEN** la causa a descartar primero es que el nombre de la clase no coincide con el que escribe el JavaScript, porque ese desfasaje no produce error de consola ni hallazgo de linter

#### Scenario: Agregar un estado nuevo

- **WHEN** se agrega un comportamiento que necesita una clase de estado nueva
- **THEN** el nombre se define en el JavaScript y la hoja lo toma de ahí, no al revés

### Requirement: Los elementos pintados con máscara declaran su caja

Un elemento sin contenido que se pinte con `mask-image` —el lettering de marca— SHALL declarar explícitamente un modo de display que acepte `width` y `aspect-ratio`, sin depender de que su contenedor lo blockifique.

#### Scenario: El lettering cuelga de un contenedor en bloque

- **WHEN** el elemento con máscara es hijo de un contenedor que no es grid ni flex
- **THEN** igual se renderiza con el ancho y la proporción declarados, en vez de colapsar a cero sin aviso

### Requirement: La escala de forma no crece

Los radios de borde SHALL salir de la escala declarada en la capa compartida. Agregar un radio fuera de esa escala SHALL requerir ampliar la escala, no declarar un valor suelto.

#### Scenario: Inspeccionar los radios en uso

- **WHEN** se inspeccionan los radios de borde de las hojas vivas
- **THEN** todos corresponden a un peldaño de la escala declarada
