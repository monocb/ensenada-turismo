# luna-taruma-event-block Specification

## Purpose
Definir la presentación temporal de Luna Tarumá en el inicio de Turismo Ensenada: anuncio, agenda, relato, obras, convocatoria y créditos, con diseño adaptable e interacción accesible.
## Requirements
### Requirement: Franja de anuncio del evento dentro del hero

`index.html` SHALL incluir una franja de anuncio como último hijo de `.hero-content`, con el nombre del evento, las fechas y el horario publicados, Punta Lara como ubicación, la mención de acceso libre y gratuito, y un enlace que lleve a la sección completa del evento en la misma página.

#### Scenario: Visitante que entra al inicio

- **WHEN** un usuario carga `index.html`
- **THEN** ve la franja del evento dentro del hero, con las fechas, el horario y Punta Lara legibles sin hacer scroll

#### Scenario: El enlace baja a la sección

- **WHEN** el usuario activa el enlace de la franja
- **THEN** la página se desplaza a la sección del evento, con el desplazamiento compensado por la altura del header fijo (mismo criterio que el resto de los enlaces internos del sitio)

#### Scenario: La franja no tapa el hero en mobile

- **WHEN** se carga el inicio en viewports de 320, 360, 375, 390, 414 y 430px de ancho
- **THEN** la franja se ve completa, el `<h1>ENSENADA</h1>` del hero sigue legible y sin cortarse, y `document.documentElement.scrollWidth` no supera `window.innerWidth`

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

### Requirement: Relato del evento

La sección SHALL presentar el relato de la campaña en sus tres ideas: el río que nombra a Ensenada, la Selva Marginal como bosque subtropical más austral de la Argentina, y el Tarumá —árbol autóctono que florece cada primavera con flores amarillas y perfumadas— como la manera local de florecer.

#### Scenario: Las tres ideas están presentes

- **WHEN** se lee el relato de la sección
- **THEN** aparecen el río, la Selva Marginal y el Tarumá, y se explica que el nombre del evento nace del encuentro entre la floración del Tarumá y la primera Luna llena de la primavera

### Requirement: Jerarquía visual y composición adaptable

La sección SHALL presentar título e introducción junto a una ilustración protagonista en escritorio, la agenda antes del relato y una convocatoria con botón "Quiero participar" antes de la galería secundaria. El relato SHALL conservar los textos de campaña en una composición abierta, con las fotos de la selva y la flor junto a sus textos. Las ilustraciones SHALL conservar su proporción y contenido completos.

#### Scenario: Apertura en escritorio

- **WHEN** la sección se muestra en un viewport de 1280px o mayor
- **THEN** la ilustración de Luna y tarumá está junto al título, sin texto superpuesto, y la agenda precede al relato con 19 SEP y 26 SEP destacados, horario separado y ambas ubicaciones

#### Scenario: Lectura en celular

- **WHEN** se muestra en 320, 360, 375, 390, 414 o 430px
- **THEN** el orden es título, agenda, ilustración y relato, las imágenes y columnas respetan los márgenes del bloque, y no hay desborde horizontal

#### Scenario: Obras sin recortes

- **WHEN** se observan las cuatro ilustraciones en escritorio o celular
- **THEN** su relación de aspecto corresponde al original y el lettering del Paseo Costero queda completo

#### Scenario: Convocatoria accionable

- **WHEN** el visitante llega a la convocatoria, antes de la galería secundaria
- **THEN** encuentra el botón "Quiero participar" hacia `https://www.instagram.com/turismoensenada_/`, con foco visible y el canal identificado como Instagram

### Requirement: Agenda de noches extensible sin rediseño

La agenda SHALL estar construida como una lista de items con estructura idéntica entre sí, donde cada item representa una noche con su fecha, hora, lugar, fase lunar y actividades. Agregar una noche futura SHALL requerir únicamente agregar un item más al HTML, sin modificar `styles.css` ni `script.js`.

#### Scenario: Las dos noches confirmadas

- **WHEN** se lee la agenda
- **THEN** figura la noche del sábado 19/9 a las 19:00 hs en el Parque Costero de Punta Lara con la Luna en cuarto creciente, y la noche del sábado 26/9 en el Paseo Costero de Punta Lara, Parador 5C (Alte. Brown y 52), con la Luna llena, pintura en vivo, tango, folclore, danza, música en vivo, telescopios y sabores de la costa

#### Scenario: Se suma una noche nueva

- **WHEN** se agrega un item de noche copiando la estructura de uno existente y cambiando su texto
- **THEN** la noche nueva se muestra con el mismo tratamiento visual que las anteriores, sin editar `styles.css` ni `script.js`

#### Scenario: Acceso libre y gratuito

- **WHEN** se lee la agenda
- **THEN** queda explícito que las dos noches son de entrada libre y gratuita

### Requirement: Galería del evento con lightbox

Las seis imágenes únicas de la sección (una ilustración protagonista, dos fotos junto al relato y tres ilustraciones en la galería secundaria) SHALL abrirse en el lightbox existente del sitio como una colección del evento, reusando `openLightbox(image, galleryImages)` sin introducir un mecanismo de ampliación paralelo.

#### Scenario: Abrir una imagen

- **WHEN** el usuario activa una imagen de la apertura, del relato o de la galería secundaria del evento
- **THEN** se abre el lightbox existente mostrando esa imagen, y las flechas recorren las seis imágenes del evento, sin duplicados ni fotos de otras secciones

#### Scenario: Navegación por teclado

- **WHEN** el usuario recorre la galería con Tab y activa una imagen con Enter o Espacio
- **THEN** la imagen se abre en el lightbox, el foco entra al diálogo y Escape lo cierra devolviendo el foco al disparador

#### Scenario: Texto alternativo descriptivo

- **WHEN** se inspeccionan los `alt` de las imágenes de la galería
- **THEN** cada uno describe su contenido real (ilustración en plastilina, Selva Marginal, flor de tarumá, río) y ninguno queda vacío ni genérico

### Requirement: Convocatoria a artistas para pintar en vivo

La sección SHALL incluir la convocatoria a artistas para pintar en vivo en la noche del 26/9, indicando que se admite cualquier técnica y cuál es el canal de inscripción.

#### Scenario: Convocatoria visible con su canal

- **WHEN** se lee la parte de convocatoria
- **THEN** invita a sumarse a pintar en vivo el 26/9 e indica el canal de inscripción vigente hacia `@turismoensenada_`

### Requirement: Créditos de organización

La sección SHALL acreditar a quienes organizan —Turismo Ensenada, la Facultad de Ciencias Astronómicas y Geofísicas de la UNLP y Nexa Contenidos— y a la autoría de las ilustraciones (Mariana Ardanaz) y los aportes técnicos (Ing. Forestal Esteban Perea).

#### Scenario: Créditos completos

- **WHEN** se leen los créditos de la sección
- **THEN** figuran las tres organizaciones, la autoría de las ilustraciones y los aportes técnicos

### Requirement: La paleta del evento queda contenida en el bloque

Los colores propios del evento (paleta "crepúsculo": `#128A74`, `#1F5C3F`, `#5B54C4`, `#101733`, `#1C2452`, `#D65A3C`, acento dorado `#F2C14E`, texto crema `#F5F3EC`) SHALL declararse como custom properties en el scope del bloque del evento, y NO SHALL agregarse ni modificarse ninguna variable en los bloques `:root` de `styles.css`.

#### Scenario: Ningún `:root` cambia

- **WHEN** se comparan los 4 bloques `:root` de `styles.css` antes y después del cambio
- **THEN** son idénticos

#### Scenario: El resto del sitio conserva sus colores

- **WHEN** se recorren las demás secciones del inicio y la página `en-fotos/`
- **THEN** ningún color cambió respecto del estado previo al bloque del evento

#### Scenario: Contraste del texto del evento

- **WHEN** se mide el contraste del texto crema sobre cada fondo de la paleta del evento y del texto sobre el acento dorado
- **THEN** cada combinación usada alcanza al menos 4.5:1 para texto normal y 3:1 para texto grande, o se corrige antes de publicar

### Requirement: Los assets del evento cumplen el presupuesto de imágenes del repo

Las imágenes del evento incorporadas a `assets/` SHALL estar en formato `.webp`, pesar 500KB o menos cada una, y declarar `srcset` con variantes acordes a su ancho renderizado real más `sizes`, siguiendo el criterio ya vigente para el resto de las imágenes del sitio.

#### Scenario: Presupuesto de peso

- **WHEN** se ejecuta `find assets -type f \( -iname "*.jpg" -o -iname "*.jpeg" -o -iname "*.png" -o -iname "*.webp" \) -size +500k`
- **THEN** el comando no devuelve ningún resultado

#### Scenario: Variantes responsive

- **WHEN** se cargan las imágenes del evento en un viewport de 375px de ancho
- **THEN** el navegador descarga una variante acorde al ancho renderizado, no el archivo de mayor resolución

#### Scenario: Carga diferida

- **WHEN** se inspeccionan las imágenes del evento que quedan fuera del viewport inicial
- **THEN** declaran `loading="lazy"`

### Requirement: Acceso al evento desde la navegación principal

La navegación principal SHALL incluir un enlace a la sección del evento mientras el bloque esté publicado.

#### Scenario: Enlace en desktop y en el menú mobile

- **WHEN** se abre la navegación principal en desktop y el menú hamburguesa en mobile
- **THEN** en ambos aparece el enlace al evento y lleva a su sección

### Requirement: El bloque no rompe la validación de HTML ni la accesibilidad automatizada

El bloque SHALL pasar la validación de `html-validate` con la configuración vigente del repo, incluido el preset `html-validate:a11y`.

#### Scenario: CI en verde

- **WHEN** se corre la validación de HTML del repo con el bloque del evento presente
- **THEN** no reporta errores nuevos
