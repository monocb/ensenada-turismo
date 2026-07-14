## ADDED Requirements

### Requirement: El lightbox muestra la foto a resolución completa sin importar la galería de origen
Al abrir cualquier foto en el lightbox compartido (`.image-lightbox`), la imagen mostrada SHALL ser la de mayor resolución disponible para esa foto — no la variante de `srcset` que el navegador eligió para el thumbnail que disparó la apertura. Esto aplica a toda galería del sitio, incluidos los carretes de `en-fotos/index.html`.

#### Scenario: Foto de un carrete de en-fotos
- **WHEN** un usuario abre una foto desde cualquiera de los 3 carretes de `en-fotos/index.html`
- **THEN** la foto se muestra a su resolución completa, no a la variante `-480w`/`-900w` usada para el thumbnail de la grilla

#### Scenario: Foto de Fragata
- **WHEN** un usuario abre una foto desde la sección Fragata
- **THEN** la foto se muestra a su resolución completa, igual que antes de este cambio
