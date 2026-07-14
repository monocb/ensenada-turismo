## ADDED Requirements

### Requirement: El footer muestra las redes sociales como badges con ícono y handle
El `<nav class="footer-links footer-social-links">` de `index.html`, `en-fotos/index.html` y `404.html` SHALL contener 3 links (Instagram, Facebook, TikTok), cada uno con un ícono SVG y el handle de la cuenta (`turismoensenada_`, `turismoeda`, `@turismoensenada`) como texto, en vez de solo el nombre de la red social. Ninguno de los 3 badges SHALL estar envuelto en un contenedor con fondo/borde propio (sin cápsula general). Cada badge SHALL tener un fondo translúcido con sombra leve, y SHALL mostrar una animación de elevación (`transform`) y aclarado de fondo al pasar el mouse o recibir foco de teclado.

#### Scenario: Badge con ícono y handle
- **WHEN** se carga cualquiera de las 3 páginas y se inspecciona el link a Instagram dentro de `.footer-social-links`
- **THEN** contiene un ícono SVG y el texto "turismoensenada_"

#### Scenario: Sin cápsula contenedora
- **WHEN** se inspecciona `.footer-social-links` en cualquiera de las 3 páginas
- **THEN** el `<nav>` no tiene `background`, `border` ni `box-shadow` propios de tipo cápsula — cada badge individual sí puede tenerlos

#### Scenario: Hover del badge
- **WHEN** un usuario pasa el mouse sobre un badge del footer
- **THEN** el badge se eleva (`transform`) y su fondo se vuelve más opaco, igual que el comportamiento que tenía la cápsula eliminada bajo el hero

### Requirement: La cápsula de redes sociales bajo el hero ya no existe
`index.html` SHALL NOT contener ningún elemento `.social-strip`.

#### Scenario: Sin cápsula bajo el hero
- **WHEN** se carga `index.html`
- **THEN** no existe ningún elemento con la clase `social-strip`
