## MODIFIED Requirements

### Requirement: La marca entra escribiéndose

La portada SHALL abrir con el emblema sobre el fondo institucional, **como primera pantalla del contenido y no como una capa encima del sitio**, y el emblema SHALL pintarse letra por letra, siguiendo el recorrido del trazo de cada una, a velocidad constante y encadenando cada letra con la siguiente. Terminada la palabra, el gesto SHALL seguir de largo pintando la línea de costa, sin corte entre una cosa y la otra.

Ninguna letra SHALL mostrar parte de su dibujo antes de que le toque, aunque el trazo que pinta la letra anterior se pase de su ancho. La pincelada SHALL pintarse a una velocidad que permita seguir el recorrido con la vista.

El requisito pedía que la palabra "se revelara de izquierda a derecha", que es lo que hacía el barrido por recorte: una cortina que destapa la palabra entera. El manual habla de una mano que escribe, y una mano escribe letra por letra.

#### Scenario: Llegar a la portada

- **WHEN** alguien abre la portada
- **THEN** ve el emblema sobre el fondo institucional pintándose letra por letra, y después el trazo de costa continuando el gesto

#### Scenario: Nadie espera para entrar al sitio

- **WHEN** alguien llega a la portada mientras el emblema se está pintando
- **THEN** puede bajar en cualquier momento, porque el emblema es parte de la página y no tapa el contenido

#### Scenario: Ninguna letra se adelanta

- **WHEN** se observa la secuencia letra por letra
- **THEN** cada letra está entera o no está, y ninguna muestra un pedazo antes de su turno

#### Scenario: El emblema terminado es la forma de marca

- **WHEN** la pincelada termina
- **THEN** lo que queda dibujado es exactamente el emblema de marca, sin huecos sin pintar ni trazo sobrante fuera de su dibujo

### Requirement: El trazo se ve desde su comienzo

La animacion del trazo SHALL empezar despues del primer pintado de la pagina, y las formas del emblema SHALL estar disponibles cuando el trazo arranca. La entrada SHALL no depender de un recurso de red que pueda llegar con el reloj de la animacion ya corriendo.

#### Scenario: Conexion o maquina lentas

- **WHEN** se abre la portada con la red o el procesador lentos
- **THEN** el trazo se ve desde su comienzo y no aparece con la palabra ya escrita a medias

#### Scenario: Las formas no se piden a la red

- **WHEN** arranca el trazo
- **THEN** las formas del emblema ya estan en el documento, sin depender de que haya llegado un archivo aparte

### Requirement: La entrada termina atravesando el logotipo

Al bajar, el emblema SHALL crecer hacia el espectador y desvanecerse, descubriendo debajo la portada con sus fotos. El avance de ese movimiento SHALL seguir a la posición del scroll: SHALL no correr solo una vez disparado.

El logotipo del encabezado SHALL aparecer a medida que el emblema se va, de modo que no haya dos logotipos a la vez en pantalla.

El requisito describía un cierre por tiempo, que terminaba cuando el reloj decía. Atarlo al scroll es lo que hace que no pueda ir ni muy rápido ni muy lento: va a la velocidad a la que baja quien está mirando.

#### Scenario: Bajar desde el emblema

- **WHEN** alguien empieza a bajar desde la pantalla del emblema
- **THEN** el emblema crece y se desvanece acompañando el scroll, y debajo aparece la portada con sus fotos

#### Scenario: El movimiento obedece

- **WHEN** alguien frena a mitad del recorrido, o vuelve a subir
- **THEN** el movimiento frena o vuelve con él, porque sigue a la posición del scroll y no a un cronómetro

#### Scenario: El logotipo se traspasa

- **WHEN** el emblema se está yendo
- **THEN** el logotipo del encabezado va apareciendo, sin que los dos se vean completos al mismo tiempo

### Requirement: La entrada no puede dejar el sitio inaccesible

El contenido de la pagina SHALL estar presente y alcanzable en todos los casos, incluido el de JavaScript ausente o fallado. **Bajar SHALL funcionar siempre**: si el seguimiento del scroll no corre, el emblema SHALL irse scrolleando como cualquier otra sección, sin quedar trabado ni tapando el contenido.

La animación de la pincelada SHALL quedar declarada de una forma que la `Content-Security-Policy` del sitio permita, sin depender de JavaScript para aplicarse.

El requisito hablaba de una capa que tenía que desmontarse sola. Ya no hay capa; lo que hay que garantizar es que bajar siempre lleve al contenido.

#### Scenario: Sin JavaScript

- **WHEN** se carga la portada con JavaScript deshabilitado
- **THEN** el emblema se pinta, y al bajar se va de pantalla dejando ver el resto de la página

#### Scenario: El contenido existe desde el principio

- **WHEN** un rastreador o un render sin ejecución lee la portada
- **THEN** encuentra el contenido completo de la página

#### Scenario: La política de seguridad no desarma la animación

- **WHEN** la página se sirve con las cabeceras de seguridad del sitio
- **THEN** cada trazo se pinta en su momento, y no aparecen todos juntos por haber quedado sin sus tiempos

### Requirement: Con movimiento reducido no hay entrada

Cuando la persona tenga activada la preferencia de movimiento reducido, el emblema SHALL aparecer completo y quieto, sin pintarse, y SHALL no crecer ni desvanecerse al bajar: SHALL irse scrolleando como cualquier otra sección.

#### Scenario: Preferencia de movimiento reducido activa

- **WHEN** se carga la portada con la preferencia de movimiento reducido activada
- **THEN** el emblema está completo desde el primer momento, y bajar lo deja atrás sin crecer ni desvanecerse

## REMOVED Requirements

### Requirement: La entrada se muestra una vez por sesión

**Reason**: Era una regla propia de una pantalla de carga: algo que interrumpe se muestra lo menos posible. El emblema pasa a ser la primera pantalla del contenido, y el contenido no se esconde porque ya lo hayas visto. Quien no quiera mirarlo baja, que ahora no cuesta nada.

**Migration**: Se retira el recuerdo de la sesión y, con él, el riesgo de que una segunda carga alcance a mostrar un destello.

### Requirement: La entrada no se encima con la navegación

**Reason**: Existía porque una capa encima del sitio tenía que impedir que se scrolleara por detrás. Sin capa no hay nada que contener, y el scroll es justamente lo que mueve el cierre.

**Migration**: Se retira la contención del scroll y el respaldo por tiempo que la liberaba.
