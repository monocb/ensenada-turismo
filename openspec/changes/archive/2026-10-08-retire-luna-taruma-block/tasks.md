## 1. Medir el estado previo

- [x] 1.1 Registrar el alto de la home y el orden de secciones antes de borrar, para contrastar después (referencia: 8920px, con el bloque ocupando 3557px)
- [x] 1.2 Confirmar que el lightbox funciona en una galería ajena al evento, para tener con qué comparar tras la baja

## 2. Borrar el bloque

- [x] 2.1 Borrar las tres regiones marcadas de `index.html` con sus comentarios marcadores: el enlace del menú, la franja del hero y la sección del evento con el juego adentro
- [x] 2.2 Borrar la región marcada de `styles.css`, al final del archivo, sin tocar ninguna regla vecina
- [x] 2.3 Borrar la región marcada de `script.js`, que incluye el enganche al lightbox y el IIFE del juego
- [x] 2.4 Borrar `assets/luna-taruma/` completa (17 archivos `.webp`)
- [x] 2.5 Retirar `openspec/specs/luna-taruma-event-block/` y `openspec/specs/luna-taruma-quiz-game/`

## 3. Devolver lo aprendido a la convención

- [x] 3.1 Contrastar lo que hizo falta realmente con lo que decía el procedimiento documentado, y anotar las diferencias
- [x] 3.2 Incorporar esas diferencias a `openspec/specs/temporary-content-blocks/spec.md` **antes** de borrar el documento de baja
- [x] 3.3 Borrar `docs/pendientes/baja-bloque-luna-taruma.md` y su línea en `docs/pendientes/README.md`

## 4. Verificar que no quedaron residuos

- [x] 4.1 Correr la búsqueda de residuos sobre `index.html`, `styles.css`, `script.js` y `docs/`, excluyendo el archivo histórico de OpenSpec, y confirmar que no devuelve nada
- [x] 4.2 Confirmar que no quedó ningún enlace al ancla del evento en ninguna de las tres páginas
- [x] 4.3 Confirmar que `assets/` no tiene archivos huérfanos del evento y que ninguna página los referencia

## 5. Verificar que el sitio sigue sano

- [x] 5.1 Correr `html-validate` sobre las tres páginas y `stylelint` sobre `styles.css`
- [x] 5.2 Correr `linkinator` y confirmar que no aparecieron enlaces rotos
- [x] 5.3 Cargar las tres páginas en un navegador real y confirmar que la consola no reporta errores
- [x] 5.4 Comprobar que el lightbox y las galerías del resto del sitio siguen funcionando, incluido el carrusel de la Fragata
- [x] 5.5 Medir el alto de la home y el orden de secciones, y confirmar que la diferencia corresponde al bloque retirado y nada más
- [x] 5.6 Revisar la home en ancho de teléfono y de escritorio, para descartar que el borrado haya dejado un hueco o roto un espaciado

## 6. Cierre

- [x] 6.1 Ejecutar `graphify update .` para dejar el grafo al día
- [x] 6.2 Dejar la baja en un único commit revertible
