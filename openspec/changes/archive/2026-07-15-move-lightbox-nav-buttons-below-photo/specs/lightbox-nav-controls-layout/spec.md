## ADDED Requirements

### Requirement: Las flechas de navegación del lightbox están debajo de la foto, no superpuestas
`.lightbox-prev` y `.lightbox-next` SHALL posicionarse debajo de la imagen ampliada del lightbox (`.image-lightbox img`), como un par centrado horizontalmente, SHALL NOT superponerse visualmente con la foto en ningún tamaño u orientación de imagen. Este comportamiento SHALL aplicar en cualquier página del sitio que use el lightbox compartido (Fragata, En Fotos, y cualquier otra galería).

#### Scenario: Abrir una foto vertical/alta
- **WHEN** un usuario abre en el lightbox una foto con proporción vertical (más alta que ancha)
- **THEN** las flechas de navegación permanecen debajo de la foto, sin superponerse con ninguna parte de la imagen

#### Scenario: Mismo comportamiento en cualquier galería
- **WHEN** se compara el lightbox abierto desde una foto de Fragata con el lightbox abierto desde una foto de En Fotos
- **THEN** las flechas de navegación se ven en la misma posición (debajo de la foto) y con la misma forma en ambos casos

### Requirement: Las flechas de navegación tienen forma rectangular con esquinas redondeadas
`.lightbox-nav` SHALL renderizarse como un rectángulo con esquinas redondeadas (no un círculo).

#### Scenario: Verificar la forma del botón
- **WHEN** se inspecciona el CSS computado de `.lightbox-nav`
- **THEN** su `border-radius` es un valor moderado (no `50%` ni `999px`, que producirían un círculo), y su `width` es mayor a su `height`
