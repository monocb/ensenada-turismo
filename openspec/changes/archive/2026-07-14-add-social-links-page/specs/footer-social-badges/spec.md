## REMOVED Requirements

### Requirement: El footer muestra las redes sociales como badges con ícono y handle
**Reason**: El cliente decidió sacar las redes sociales del footer por completo — pasan a vivir en una nueva sección dedicada del inicio, `#redes` (capability `home-social-links-section`), como última sección del inicio después de Fragata, con un tratamiento visual más elaborado (vidrio esmerilado, hover que cambia el color de fondo de toda la sección).
**Migration**: El wayfinding a redes sociales desde cualquier página pasa a ser el link "Redes" en el nav principal y en el nav "Guía de la página" del footer (cubierto por `site-footer-coverage`), que lleva a `/#redes`.

### Requirement: La cápsula de redes sociales bajo el hero ya no existe
**Reason**: Este requirement documentaba que `.social-strip` (la cápsula bajo el hero, eliminada en un cambio anterior) no debía reaparecer. Con la eliminación completa de los badges de redes del footer, todo el capability `footer-social-badges` queda obsoleto — no tiene sentido mantener un requirement aislado sobre un elemento que ya no existe en ningún lugar del sitio.
**Migration**: Ninguna — no hay comportamiento que preservar; la ausencia de `.social-strip` ya no necesita ser un requirement propio una vez que no hay badges de redes en absoluto que pudieran confundirse con él.
