## 1. Implementación

- [x] 1.1 Agregar `text-shadow` a `.hero-content p.hero-tagline span` en `styles.css:7330`

## 2. Verificación visual

- [x] 2.1 Capturar zoom 2-3x del tagline en desktop y mobile, comparar legibilidad de la franja dorada antes/después
- [x] 2.2 Ajustar el valor de `text-shadow` si la primera iteración no se ve suficientemente definida (no hizo falta, primera iteración quedó bien)
- [x] 2.3 Confirmar que el resto del tagline (zona sobre el scrim oscuro) no se ve afectado negativamente (halo sucio, etc.)

## 3. Documentación

- [x] 3.1 Actualizar `docs/pendientes/accesibilidad.md` con los 4 resultados de la medición de contraste (3 que ya cumplían + este fix)

## 4. Deploy

- [ ] 4.1 Commit + push a `main` (confirmar con el usuario antes)
- [ ] 4.2 Verificar en producción
- [ ] 4.3 Archivar el change y sincronizar la spec `text-contrast-over-images`
