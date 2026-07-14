## REMOVED Requirements

### Requirement: La sección Cultura muestra sus fotos correctamente
**Reason**: La sección "Cultura, música y encuentros" (`#cultura`) se elimina del home por decisión de contenido — ya no hay carrusel que verificar.
**Migration**: Ninguna — no reemplaza a otro requirement, el carrusel deja de existir.

El carrusel de la sección "Cultura, música y encuentros" SHALL cargar y mostrar las 6 fotos que lo componen al navegarlo con los controles siguiente/anterior.

#### Scenario: Navegar el carrusel de Cultura
- **WHEN** un usuario hace clic repetidamente en `[data-carousel-next]` dentro de la sección `#cultura`
- **THEN** cada foto del carrusel carga (`naturalWidth > 0`) y se muestra sin espacios en blanco ni imágenes rotas
