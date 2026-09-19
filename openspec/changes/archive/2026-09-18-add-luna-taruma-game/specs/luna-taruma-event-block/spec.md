## MODIFIED Requirements

### Requirement: Sección del evento en el inicio

`index.html` SHALL incluir una sección del evento con un encabezado accesible (`aria-labelledby`) y seis partes: el relato del evento, la agenda de noches, el juego del evento, la galería de imágenes, la convocatoria a artistas y los créditos de organización.

#### Scenario: Estructura de la sección

- **WHEN** se inspecciona la sección del evento
- **THEN** contiene el relato, la agenda, el juego, la galería, la convocatoria y los créditos, y su encabezado está referenciado por `aria-labelledby`

#### Scenario: Orden de encabezados sin saltos

- **WHEN** se recorren los encabezados de `index.html` con la sección del evento presente
- **THEN** el orden sigue sin saltos de nivel (la sección aporta un `h2` y sus partes `h3`, nunca un `h4` sin `h3` padre)

#### Scenario: El juego se ubica después del relato

- **WHEN** se recorre la sección de arriba hacia abajo
- **THEN** el juego aparece una vez que la persona ya leyó de qué se trata el evento, y antes de los créditos
