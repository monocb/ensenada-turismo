## Context

Esta baja es distinta de los otros cambios del repo: casi todo el trabajo de diseño ya se hizo hace tres semanas, cuando el bloque se publicó. El procedimiento está escrito, el inventario está escrito, y el propio código se armó pensando en este momento (marcas `LUNA-TARUMA:INICIO/FIN` en los tres archivos, paleta en scope local para no tocar los `:root` del sitio, JS con guard que no rompe si el markup no está).

Lo que queda por decidir no es *cómo borrar*, sino **cómo verificar que el borrado quedó limpio** y **qué hacer con lo que aprendamos**, porque es la primera vez que este procedimiento se ejecuta de verdad. Hasta hoy la convención de contenido temporal se probó sólo en simulacro, al implementar el bloque.

Antes de escribir esto se verificó el inventario contra el repositorio real: los 5 pares de marcadores están donde el documento dice, `en-fotos/index.html` y `404.html` no enlazan al ancla pese a compartir el header, `sitemap.xml` no tiene entradas del evento, y fuera del archivo histórico sólo 5 archivos mencionan Luna Tarumá. **El inventario documentado era correcto y completo.**

## Goals / Non-Goals

**Goals:**

- Que la home vuelva a su estado previo, sin rastros del evento y sin residuos.
- Que la baja entre en un solo commit revertible.
- Que quede registrado si el procedimiento documentado sirvió tal como estaba escrito.
- Que el material del evento siga recuperable si hay una segunda edición.

**Non-Goals:**

- Rediseñar o reacomodar la home una vez liberado el espacio. El orden previo de secciones ya existía y se restaura solo; cualquier mejora de composición es parte del tercer change.
- Corregir los hallazgos de las Web Interface Guidelines que caigan fuera del bloque. Eso es el segundo change.
- Archivar el evento como página propia o galería permanente. Si se quiere, es una decisión de contenido aparte.

## Decisions

### D1 — Borrar las regiones marcadas, no "limpiar" los archivos

Se borra exactamente lo que está entre marcadores, incluidos los comentarios marcadores. No se aprovecha el viaje para reordenar `styles.css`, renombrar clases vecinas ni tocar reglas adyacentes.

El motivo es poder revertir: si algo sale mal, `git revert` de un commit que sólo borra regiones delimitadas devuelve el sitio al estado exacto anterior. Un commit que además reorganiza no tiene esa propiedad.

*Alternativa descartada:* aprovechar para corregir de paso los hallazgos de accesibilidad que están dentro del bloque. Son los que desaparecen solos al borrarlo, así que no hay nada que corregir; y mezclar un borrado con correcciones hace el diff ilegible.

### D2 — El material del evento no se "pierde", queda en el archivo de OpenSpec y en git

Las dos specs se retiran con `REMOVED` y su migración apunta a dónde queda todo: `openspec/changes/archive/2026-09-18-add-luna-taruma-event-block/` y `.../2026-09-18-add-luna-taruma-game/`, más el historial de git.

Esto importa porque el evento puede repetirse el año que viene. Retirar la capacidad del sitio no es lo mismo que tirar el trabajo: las diez preguntas del juego, la escena SVG, el relato del río y la selva y las ilustraciones de Mariana Ardanaz están todas recuperables con un `git show`.

Las imágenes se borran del repositorio porque pesan y no se referencian más; siguen en el historial y, sobre todo, en el kit original fuera del repo (`E:\claude code\Lucas\EVENTO LUNA LUCAS`), que es la fuente real.

### D3 — Verificar antes de dar por terminado, con el mismo grep que propone el documento

La verificación de residuos usa la búsqueda que el propio documento de baja dejó escrita, extendida con el prefijo del juego:

```
grep -rn "LUNA-TARUMA\|luna-taruma\|luna-strip\|lt-night\|lt-gallery\|ltg" index.html styles.css script.js docs/
```

No debe devolver nada. El archivo histórico de OpenSpec queda fuera de la búsqueda a propósito: ahí las referencias *deben* seguir existiendo.

Además se corre lo mismo que corre el CI (`html-validate`, `stylelint`, `linkinator`) y se revisa la consola del navegador en las tres páginas, porque el bloque enganchaba sus imágenes a un lightbox compartido y hay que confirmar que el resto de las galerías sigue andando.

### D4 — El aprendizaje vuelve a la convención antes de borrar el documento de baja

El documento de baja se borra, pero no antes de contrastarlo con lo que hizo falta realmente. Si el inventario estaba incompleto, si un paso faltaba o si algo salió distinto de lo previsto, eso se incorpora a `temporary-content-blocks` **primero**.

Es el único momento en que esa información existe. Una vez borrado el documento, nadie va a reconstruir qué costó la baja. Por eso los dos requisitos nuevos de la convención: verificar la baja, y devolver lo aprendido.

*Alternativa descartada:* borrar y listo, dejando la convención como estaba. Funcionaría esta vez y nos dejaría igual de ciegos para el próximo evento.

### D5 — Medir el antes y el después

Se registra el alto de la home antes (8920px) y después del borrado, y se confirma el orden de secciones resultante. Es la forma más directa de comprobar que se fue lo que tenía que irse y nada más: si el alto baja mucho más o mucho menos que los 3557px del bloque, algo se borró de más o de menos.

## Risks / Trade-offs

- **Se borra algo de más, de una región marcada mal cerrada** → Las marcas se verificaron antes de empezar (5 pares, 6+2+2 líneas). Después del borrado, el alto medido de la home y los linters del CI detectan un borrado excesivo.
- **Queda un ancla rota en el menú** → El enlace del menú está dentro de una de las tres regiones marcadas de `index.html`, así que se va con ella. `linkinator` lo confirma, y ya se verificó que las otras dos páginas no enlazan al ancla.
- **El lightbox deja de funcionar para el resto del sitio** → El bloque sólo agregaba un `addEventListener` sobre sus propias imágenes; el lightbox es anterior e independiente. Se verifica abriendo una galería de otra sección.
- **Alguien quiere el evento de vuelta el año que viene y no lo encuentra** → Mitigado por D2: las migraciones de las specs retiradas dicen exactamente dónde está todo.
- **La URL `/#luna-taruma` circuló por redes y queda muerta** → Es un ancla, no una ruta: quien la abra cae en la home, no en un 404. Se asume.

## Migration Plan

1. Verificar el inventario contra el repositorio (hecho, ver Context).
2. Borrar las regiones marcadas de los tres archivos, los assets y las dos specs.
3. Contrastar con el procedimiento documentado y actualizar `temporary-content-blocks` con lo aprendido.
4. Borrar el documento de baja y su línea en el índice.
5. Verificar: grep de residuos, linters del CI, consola del navegador, lightbox del resto del sitio, alto y orden de la home.
6. Un commit. Rollback: `git revert`.

## Open Questions

Ninguna bloqueante. Una decisión de contenido que queda abierta y no bloquea esta baja: si el evento merece quedar archivado como página propia o como galería dentro de "Ensenada en Fotos". Hoy el material queda en git y en el kit original, que alcanza para recuperarlo; convertirlo en contenido permanente es una decisión editorial, no técnica.
