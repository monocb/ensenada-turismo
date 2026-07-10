## 1. Reemplazar los archivos comprimidos

- [x] 1.1 Reemplazar `assets/portada-home/portada-06-flavio.webp` con la versión comprimida (764KB → ~418KB)
- [x] 1.2 Reemplazar `assets/fuerte-barragan.jpg` con la versión comprimida (552KB → ~255KB)
- [x] 1.3 Reemplazar `assets/historia/1990-vieja-estacion.jpg` con la versión comprimida (566KB → ~373KB)
- [x] 1.4 Confirmar con `find assets -size +500k` que no queda ninguna imagen por encima de 500KB

## 2. Verificación

- [x] 2.1 Levantar el sitio localmente y confirmar visualmente que el hero (portada-06-flavio), la sección Historia (fuerte-barragan x2) y el preview de video (fuerte-barragan) se ven bien, sin artefactos de compresión

## 3. Documentación y deploy

- [x] 3.1 Actualizar `docs/pendientes/performance.md`: tachar los ítems resueltos, dejar solo `srcset` pendiente
- [ ] 3.2 Commit + push a `main`
- [ ] 3.3 Verificar en producción (`ensenadaturismo.com`) que las imágenes cargan bien y pesan lo esperado
