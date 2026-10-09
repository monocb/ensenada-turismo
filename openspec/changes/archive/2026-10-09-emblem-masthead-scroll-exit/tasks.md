## 1. Portar el emblema de la demo

- [x] 1.1 Llevar a `index.html` el lettering de la demo: las ocho letras como `<path>` con sus huecos, cada una con su `mask`, y la costa con la suya
- [x] 1.2 Conservar los colores actuales: el lettering en blanco y la costa en amarillo
- [x] 1.3 Mantener una máscara por letra, sin unificarlas, y sin tocar el orden, la dirección ni el dibujo de los trazos

## 2. Los tiempos, dentro de la política de seguridad del sitio

- [x] 2.1 Pasar a `home.css` los tiempos de las dieciséis pinceladas, que la demo declara con atributos `style` que la CSP del sitio ignora
- [x] 2.2 Pasar también a CSS los dos `style` de maquetado de la demo
- [x] 2.3 Escalar todos los tiempos por igual, una vez y media, para que el gesto se pueda seguir con la vista sin romper el encadenado entre trazos
- [x] 2.4 Llevar a `home.css` el resto de los estilos de la demo: el trazo, el remate redondeado, el `pathLength` normalizado y el desborde respecto del `viewBox`
- [x] 2.5 Comprobar en el navegador que no quede ningún atributo `style` en el emblema y que la consola no reporte violaciones de la política

## 3. El emblema como primera pantalla

- [x] 3.1 Convertir la capa de la entrada en la primera sección de la portada, dentro del contenido y no encima de él
- [x] 3.2 Dar a la sección altura de más respecto de la pantalla, para que el cierre tenga recorrido donde moverse
- [x] 3.3 Dejar el emblema pegado arriba mientras ese excedente pasa
- [x] 3.4 Hacer que esa geometría se active desde JavaScript, para que sin él la sección mida una pantalla y se vaya scrolleando

## 4. El cierre atado al scroll

- [x] 4.1 Calcular el avance del cierre a partir de la posición del scroll dentro de la sección
- [x] 4.2 Mover el emblema con ese avance: crece hacia el espectador y se desvanece sobre el final, manteniéndose visible mientras se acerca
- [x] 4.3 Enganchar el cálculo al oyente de scroll que el sitio ya tiene y cortarlo cuando el emblema deja de estar a la vista
- [x] 4.4 Encender el lettering del encabezado con el mismo avance, para que el logotipo se traspase en vez de duplicarse
- [x] 4.5 Dejar el apagado del lettering del encabezado condicionado a que la portada tenga emblema, para no afectar a las otras dos páginas
- [x] 4.6 Con movimiento reducido, sin crecimiento ni desvanecido: el emblema se va scrolleando
- [x] 4.7 Darle nombres distintos al marcador de la seccion y al estado del documento: con el mismo, `querySelector` encuentra el `<html>` donde se escribe el estado y no la seccion

## 5. Limpiar lo que queda sin uso

- [x] 5.1 Retirar `setupIntro()` entero: el recuerdo de la sesión, la contención del scroll y el respaldo por tiempo
- [x] 5.2 Retirar la capa, sus fotogramas y el sprite incrustado del wordmark y de la costa
- [x] 5.3 Retirar los fotogramas del barrido por recorte y las reglas que queden huérfanas
- [x] 5.4 Confirmar que el encabezado, el pie y el 404 siguen con su logotipo intacto

## 6. Verificación

- [x] 6.1 El emblema terminado coincide con la forma de marca: sin huecos sin pintar ni trazo sobrante, comparado por píxeles contra la referencia y no a ojo
- [x] 6.2 Ninguna letra muestra un pedazo antes de su turno, medido letra por letra a lo largo de la secuencia
- [x] 6.3 Cada trazo se pinta en su momento y no aparecen todos juntos, que es lo que pasaría si los tiempos quedaran sin aplicar
- [x] 6.4 El primer trazo arranca después del primer pintado; si el margen no alcanza, correr el recorrido completo una misma cantidad y dejar registrado cuánto
- [x] 6.5 El cierre sigue al scroll: a media bajada el emblema está a media transformación, y al subir vuelve
- [x] 6.6 Bajar llega al contenido con JavaScript, sin JavaScript y con movimiento reducido
- [x] 6.7 El logotipo del encabezado aparece a medida que el emblema se va, sin que los dos se vean completos a la vez
- [x] 6.8 En teléfono: la secuencia completa, el cierre con el dedo, sin desborde horizontal
- [x] 6.9 El cálculo del scroll deja de correr cuando el emblema ya no está a la vista
- [x] 6.10 `html-validate`, `stylelint` y `linkinator` en verde; consola limpia en las tres páginas
- [x] 6.11 Contraste y resto de la portada sin cambios respecto de hoy
- [x] 6.12 Anotar el peso servido comprimido de `index.html` antes y después
- [x] 6.13 `graphify update .`
