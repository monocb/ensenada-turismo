## 1. Markup del juego en la sección

- [x] 1.1 Insertar el contenedor raíz `.ltg` en `index.html` dentro de `#luna-taruma`, después de `.lt-story` y antes de `.lt-call`, sin salir de las marcas `LUNA-TARUMA:INICIO/FIN` existentes
- [x] 1.2 Encabezar la parte con un `h3.lt-subtitle` persistente ("Florecé el Tarumá"), fuera de las tres tarjetas, y bajar los encabezados internos del juego a `h4` (pregunta y título de resultado)
- [x] 1.3 Portar la escena SVG renombrando los `id` de sus gradientes a `ltg-glow` y `ltg-river`, y marcarla `aria-hidden="true"`
- [x] 1.4 Portar las tres tarjetas (intro, pregunta, resultado) con clases e `id` prefijados `ltg-`, conservando los textos tal como vienen
- [x] 1.5 Descartar el `<header>` propio del juego (logo en base64 + tag) y la leyenda de borrador "Boceto de juego para la web" del footer
- [x] 1.6 Corregir el horario de las dos noches en la tarjeta de resultado: de "18 hs" a "19:00 hs"
- [x] 1.7 Poner `aria-live="polite"` en el contenedor de la pregunta y en el del dato de contexto, y dar etiqueta accesible al marcador de flores

## 2. Estilos

- [x] 2.1 Agregar el CSS del juego al final de `styles.css`, dentro de marcas `LUNA-TARUMA:INICIO/FIN`, con un comentario fechado que siga la convención del archivo
- [x] 2.2 Declarar sobre `.ltg` los tres tokens que el bloque no tiene: `--ltg-indigo-claro`, `--ltg-crema-tenue` y `--ltg-linea`, y borrar el `:root` del juego
- [x] 2.3 Reescribir cada selector del juego para que descienda de `.ltg`, reemplazando los colores por las variables `--lt-*` que el bloque ya hereda
- [x] 2.4 Eliminar los estilos sobre selectores de elemento globales (`html`, `body`, `h1`, `h2`, `p`, `header`, `footer`), trasladando lo que aportaban a las clases del componente
- [x] 2.5 Quitar el `font-family` del juego y el `<link>` a la fuente Archivo, para que herede Inter
- [x] 2.6 Fijar ancho máximo y centrado del juego dentro de la sección, en lugar de estirarlo al ancho completo
- [x] 2.7 Conservar el bloque `@media (prefers-reduced-motion: reduce)` del juego, adaptado a las clases prefijadas

## 3. Lógica

- [x] 3.1 Agregar el JS del juego a `script.js` dentro de marcas `LUNA-TARUMA:INICIO/FIN`, envuelto en un IIFE que no exporte nada
- [x] 3.2 Abrir el IIFE con un guard sobre el contenedor raíz que retorne si el markup no está, con el comentario que lo explique
- [x] 3.3 Actualizar todas las referencias a `id` para usar el prefijo `ltg-`
- [x] 3.4 Usar el `reduceMotion` que `script.js` ya calcula para insertar las flores en su escala final sin transición cuando corresponde
- [x] 3.5 Apuntar el texto de compartir al ancla del evento (`ensenadaturismo.com/#luna-taruma`) en lugar de la raíz del sitio

## 4. Documentación

- [x] 4.1 Sumar el juego al inventario de `docs/pendientes/baja-bloque-luna-taruma.md`: qué agrega en cada uno de los tres archivos
- [x] 4.2 Confirmar que el procedimiento de baja documentado retira también el juego sin pasos nuevos, y ajustarlo si no

## 5. Verificación

- [x] 5.1 Servir el sitio y jugar una partida completa: empezar, acertar, errar, llegar al resultado, compartir y volver a jugar
- [x] 5.2 Comprobar que con 10 aciertos el árbol queda con sus diez flores y la Luna llena, sin sombra sobre el disco
- [x] 5.3 Jugar una partida completa solo con teclado, verificando foco visible en cada control
- [x] 5.4 Verificar con movimiento reducido activado que el juego sigue siendo jugable y no anima
- [x] 5.5 Recorrer la home entera comparando contra el estado previo, para descartar que algún estilo del juego se haya derramado
- [x] 5.6 Validar el HTML de `index.html`: sin `id` duplicados, un solo `h1`, jerarquía de encabezados sin saltos
- [x] 5.7 Comprobar en las herramientas de desarrollo que no hay pedidos a la fuente Archivo ni globales nuevos filtrados al alcance de la página
- [x] 5.8 Revisar el juego en ancho de teléfono y de escritorio
- [x] 5.9 Ejecutar `graphify update .` para dejar el grafo al día
