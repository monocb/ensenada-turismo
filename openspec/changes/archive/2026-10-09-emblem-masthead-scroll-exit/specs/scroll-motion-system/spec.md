## ADDED Requirements

### Requirement: Un elemento puede irse con el scroll, no sólo entrar

Además de las entradas, el sistema SHALL admitir que un elemento **se vaya** a medida que avanza el scroll. El avance de ese movimiento SHALL seguir a la posición del scroll, de modo que la velocidad la ponga quien está bajando y no una duración fijada de antemano.

#### Scenario: El movimiento sigue al scroll

- **WHEN** alguien baja por un elemento que se va con el scroll
- **THEN** el movimiento avanza con él, y si frena o vuelve a subir, el movimiento frena o vuelve

#### Scenario: No arranca y corre solo

- **WHEN** el scroll llega al punto donde el elemento empieza a irse
- **THEN** el movimiento no se dispara para correr por su cuenta: queda atado a la posición

### Requirement: Irse con el scroll nunca puede trabar el scroll

Un elemento que se va con el scroll SHALL no impedir llegar al contenido que tiene debajo. Si el seguimiento no corre —sin JavaScript, con JavaScript fallado o con movimiento reducido— el elemento SHALL irse scrolleando como cualquier otra sección.

#### Scenario: Sin JavaScript

- **WHEN** se baja por la página con JavaScript deshabilitado
- **THEN** el elemento se va de pantalla scrolleando y se llega al contenido de abajo

#### Scenario: Con movimiento reducido

- **WHEN** se baja con la preferencia de movimiento reducido activada
- **THEN** el elemento se va sin transformarse ni desvanecerse, y se llega al contenido de abajo

### Requirement: El cálculo del scroll no se paga de más

El seguimiento del scroll SHALL engancharse al oyente que el sitio ya tiene y SHALL dejar de calcular cuando el elemento no está a la vista.

#### Scenario: El elemento quedó atrás

- **WHEN** el elemento que se va con el scroll ya no está en pantalla
- **THEN** su cálculo deja de ejecutarse en cada cuadro
