# Verificación de la revisión visual — 18/09/2026

## Alcance

Reorganización de Luna Tarumá: apertura con ilustración, agenda prioritaria, fechas destacadas, relato editorial con fotografías, convocatoria con botón y obras sin recorte. No se incorporaron dependencias ni assets nuevos. HTML, CSS y JS del evento permanecen dentro de los marcadores de baja.

## Navegador y presentación

Se verificó en Chrome headless local con el sitio servido por HTTP:

- Anchos 320, 360, 375, 390, 414, 430, 660, 768, 960, 1280 y 1440px.
- Ningún desborde del documento ni de los elementos internos del evento fuera de sus márgenes.
- Orden móvil título → agenda → ilustración → relato; composición a dos columnas en escritorio.
- Agenda anterior al relato y convocatoria anterior a la galería secundaria.
- Cuatro ilustraciones con relación de aspecto idéntica al original, incluido el lettering completo del Paseo Costero.
- Inserción temporal de una tercera noche sin cambiar CSS/JS: permanece dentro de la grilla en todos los anchos. El item de prueba no se guarda.
- Revisión de capturas de apertura, relato, convocatoria y galería en 375 y 1280px, más vista de celular a tamaño real. Las fechas en celular mantienen día/mes en una columna y fase/horario en otra.
- El enlace «Ver el evento» deja la sección a 92px del borde superior en 375px, debajo del header de 77px.
- Las seis imágenes tienen fuentes responsive válidas, carga diferida declarada y assets inferiores a 500KB. A 375px y DPR 1 se eligen variantes de 480px.

## Interacción

- Enter y Espacio abren cada una de las seis imágenes (12 activaciones verificadas).
- El foco entra al diálogo; seis pasos de flecha derecha regresan a la imagen inicial, sin salir de la colección del evento.
- Escape cierra y devuelve el foco al disparador en todos los casos.
- Apertura por clic y retorno de foco verificados; el listener pasa la imagen explícitamente como disparador.
- Quitar los tres bloques HTML temporales antes de ejecutar el JS no produce excepciones.
- Sin excepciones JavaScript durante las pruebas.
- El usuario confirmó la cuenta `@turismoensenada_`; texto, botón y especificación coinciden con `https://www.instagram.com/turismoensenada_/`, el mismo destino de Instagram ya presente en las redes del sitio.

## Validadores

- `html-validate` 11.16.0: `index.html`, `en-fotos/index.html` y `404.html`, sin errores. Se corrigió un `role="list"` redundante preexistente en `.social-badges`; no altera el diseño.
- `stylelint` 17.15.0: sin errores.
- `node --check script.js`: sin errores.
- `linkinator` 8.1.0 con los argumentos del CI: 107 enlaces correctos (103 locales y cuatro externos), verificados después de corregir Instagram con acceso de red autorizado. El destino `turismoensenada_` respondió 200.
- `openspec validate add-luna-taruma-event-block --strict --no-interactive`: válido antes y después de implementar.
- `git diff --check`: sin errores de espacios.

Las comprobaciones y capturas se generaron en el directorio temporal de la máquina; no se añadió un framework de pruebas al proyecto.
