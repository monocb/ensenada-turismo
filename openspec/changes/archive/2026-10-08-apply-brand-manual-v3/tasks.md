## 1. Preparar

- [x] 1.1 Capturar las tres páginas en escritorio y teléfono como referencia del estado previo
- [x] 1.2 Copiar los tres SVG del manual a `assets/marca/`
- [x] 1.3 Buscar colores hardcodeados fuera de los tokens, que no se actualizarían solos al cambiar la paleta

## 2. Tokens del manual

- [x] 2.1 Declarar en el `:root` base los tokens del manual con sus nombres y un comentario que registre el rol de cada uno
- [x] 2.2 Hacer que los tokens existentes del sitio referencien a los del manual, sin renombrar nada en el resto del archivo
- [x] 2.3 Reemplazar los colores hardcodeados encontrados en 1.3 por el token que corresponda
- [x] 2.4 Declarar la escala de forma de cuatro peldaños

## 3. Tipografía

- [x] 3.1 Cambiar la carga de fuentes: Archivo en 400, 700 y 900 en lugar de Inter
- [x] 3.2 Cambiar la familia en la raíz y asignar los pesos según el manual: el más pesado para títulos, el intermedio para subtítulos, el regular para texto corrido
- [x] 3.3 Revisar qué se desacomodó por el cambio de métricas: desbordes, saltos de línea nuevos, botones que ahora envuelven

## 4. El logotipo

- [x] 4.1 Insertar el lettering en línea en el encabezado de las tres páginas, con el nombre disponible como texto
- [x] 4.2 Insertar el emblema en el hero de la portada, con el trazo de costa como continuación
- [x] 4.3 Verificar las tres variantes de color del manual: institucional sobre claro, negativo sobre oscuro y sobre color
- [x] 4.4 Definir el tamaño mínimo y comprobar legibilidad a 360px de ancho

## 5. La pincelada

- [x] 5.1 Animar el trazo de costa como si se dibujara, encadenado después del lettering
- [x] 5.2 Con movimiento reducido, mostrar el emblema completo sin animar

## 6. Forma

- [x] 6.1 Mapear los once radios actuales a los cuatro peldaños de la escala
- [x] 6.2 Confirmar que no quedan radios fuera de la escala

## 7. Territorios

- [x] 7.1 Asignar a cada tarjeta de territorio su par de colores del manual mediante una variable local
- [x] 7.2 Reescribir los estilos compartidos para que consuman esa variable, dejando un único esqueleto
- [x] 7.3 Comprobar que sumar un territorio nuevo sería declarar un par de colores y nada más

## 8. Verificación

- [x] 8.1 Medir el contraste real de todo el texto sobre fotos, sobre píxeles y no estimado
- [x] 8.2 Medir el contraste de los pares de color nuevos: texto sobre cada territorio, botones, enlaces, volantillos
- [x] 8.3 Correr `html-validate`, `stylelint` y `linkinator`
- [x] 8.4 Revisar consola limpia en las tres páginas
- [x] 8.5 Revisar las tres páginas en escritorio y teléfono buscando desbordes, cortes y saltos
- [x] 8.6 Confirmar que el orden de foco y el enlace de salto siguen funcionando después del rediseño
- [x] 8.7 Comparar contra las capturas de referencia y revisar que no haya nada roto

## 9. Cierre

- [x] 9.1 Actualizar `docs/marca/colores-y-tipografia.md` a la v3.0, incluyendo que el CSS ahora sí coincide
- [x] 9.2 Ejecutar `graphify update .`

## 10. Redisenio de composicion (agregado tras la devolucion del dueno)

- [x] 10.1 Critica estructurada de la home antes de tocar nada
- [x] 10.2 Portada nueva escrita de cero en assets/css/home.css, sin !important
- [x] 10.3 Encabezado partido con el lettering centrado
- [x] 10.4 Bento asimetrico en las lineas, con En Fotos dominante
- [x] 10.5 Los tres territorios como superficies banadas con sus iconos de pincel
- [x] 10.6 Historia con el sello patrio
- [x] 10.7 Seguinos como CTA primario, banado en el azul de marca
- [x] 10.8 Contraste medido de nuevo: acero profundizado, acento fuera del texto chico
- [x] 10.9 Verificado en 9 anchos entre 360 y 1920px
- [x] 10.10 DESIGN.md actualizado al sistema v3.0
