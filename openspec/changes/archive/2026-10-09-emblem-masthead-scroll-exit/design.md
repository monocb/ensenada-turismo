## Context

Lo que hay hoy es una capa que tapa el sitio, se pinta y se va sola. Lo que se quiere es que el emblema sea la primera pantalla y se vaya cuando la persona baja.

De la demo de referencia, medido sobre el archivo:

| | |
|---|---|
| Letras | 8, cada una un `<path>` relleno con su `mask` |
| Huecos | 9 `fill-rule="evenodd"` |
| Máscaras | 9 — una por letra más la de la costa |
| Pinceladas | 15 en las letras, 1 en la costa |
| Recorrido | arranca a 250 ms, las letras terminan a 2128 ms, la costa a 2658 ms |

Y lo que el sitio impone:

- **`Content-Security-Policy: style-src 'self'`**, sin `'unsafe-inline'`.
- La página tiene que servir sin JavaScript, y bajar tiene que funcionar igual.
- Sin build: CSS escrito a mano y un poco de JavaScript.
- El encabezado es fijo y vive en la capa compartida con las otras dos páginas.

## Goals / Non-Goals

**Goals:**

- Que el emblema se pinte como lo pinta la demo, sin cambiarle el gesto, pero a un ritmo que se pueda seguir.
- Que nadie espere para ver el sitio.
- Que el cierre lo maneje quien baja, no un cronómetro.
- Que bajar funcione siempre, pase lo que pase con el JavaScript.

**Non-Goals:**

- Tocar el dibujo, el orden o la dirección de los trazos.
- Unificar las máscaras.
- Llevar la pincelada al encabezado, al pie o al 404.

## Decisions

### El emblema es una sección, no una capa

Deja de ser un elemento fijo encima de todo y pasa a ser la primera sección del contenido. Eso solo ya resuelve la mitad de los problemas que veníamos arrastrando: no hay que decidir cada cuánto se muestra, no hay que contener el scroll, no hay que garantizar que se desmonte, y no hay un control para saltear porque no hay nada que saltear.

Lo que antes era una garantía difícil —"la capa tiene que irse sola aunque el JavaScript no corra"— se vuelve trivial: una sección se va scrolleando, como cualquier sección.

### Los tiempos de cada pincelada se mudan a CSS

La demo declara cada trazo así:

```html
<path ... style="animation-delay:250ms;animation-duration:220ms"/>
```

Son dieciséis atributos `style`. La CSP del sitio los ignora y **el resultado no sería una animación distinta sino ninguna**: todos los trazos quedarían con retardo y duración por defecto, o sea el emblema apareciendo de golpe. El síntoma se confunde con "va muy rápido", que es justo lo que veníamos discutiendo.

Van a `home.css` como reglas, direccionadas por la máscara y la posición del trazo. Las alternativas se descartan: bajar la CSP abre inyección de estilos en todo el sitio para ahorrar dieciséis reglas y hay un spec que la fija; aplicarlos desde JavaScript rompe el caso sin JavaScript; los hashes hay que regenerarlos ante cualquier retoque.

### El recorrido se estira entero, no trazo por trazo

A la velocidad de la demo cada letra dura unos 244 ms. Se multiplican **todos** los tiempos por 1,5: el primer trazo pasa a 375 ms, las letras terminan a 3192 ms y la costa a 3988 ms. Escalar por igual conserva el encadenado que la demo ya tiene calculado; retocar trazos sueltos lo rompería.

Que ahora dure cuatro segundos no cuesta nada: no hay nadie esperando atrás.

### El cierre sigue al scroll, y por eso no puede ir ni rápido ni lento

Un cierre disparado por el scroll pero que después corre solo volvería a tener el problema de siempre: una velocidad decidida de antemano. Si en cambio el avance del movimiento **es** la posición del scroll, la velocidad la pone quien baja. Frena si frena, vuelve si sube.

Para que haya recorrido donde moverse, la sección del emblema es más alta que la pantalla y el emblema queda pegado arriba mientras esa altura de más pasa. Ese excedente es el presupuesto del cierre: con poco, el movimiento se siente abrupto; con mucho, hay que scrollear de más para llegar al contenido. Arranca en un 60 % de pantalla y se ajusta mirándolo.

### El seguimiento es JavaScript, y sin él se scrollea y listo

Las animaciones ligadas al scroll que hace el navegador solo existen hoy en Chrome y derivados. Para un sitio de turismo, donde más de la mitad de las visitas van a llegar desde un teléfono, eso deja afuera a demasiada gente. El seguimiento lo hace JavaScript, que anda en todos lados.

Y como el sitio tiene que servir sin JavaScript, la geometría del cierre **se activa desde JavaScript**: sin él, la sección mide una pantalla, el emblema no queda pegado y se va scrolleando como cualquier otra cosa. No es el cierre que queremos, pero es correcto, y es el valor seguro.

Con movimiento reducido, lo mismo: el emblema no crece ni se desvanece, se va scrolleando.

### El logotipo se pasa de uno al otro

Con el emblema grande arriba, el lettering chico del encabezado estaría repetido en la misma pantalla. Se apaga mientras el emblema está a la vista y se enciende a medida que se va, atado al mismo avance del scroll: el logotipo no se duplica, se traspasa.

Como el encabezado vive en la capa compartida, el apagado se declara condicionado a que la portada tenga emblema; las otras dos páginas no se enteran. Y sin JavaScript el lettering del encabezado queda visible, que es el valor seguro.

### Lo que queda sin uso se va

El sprite incrustado del wordmark y de la costa, los fotogramas del barrido por recorte y `setupIntro()` entero quedan sin referencia. Se retiran en el mismo cambio: dos emblemas conviviendo invitan a que el próximo edite el que no se usa.

El encabezado, el pie y el 404 siguen con el logotipo como máscara desde archivo. No se animan y lo comparten entre las tres páginas.

## Risks / Trade-offs

- **Los trazos no animan por la CSP y se confunde con que va rápido** → se verifica que cada letra aparezca en su momento, no sólo que el final esté bien.
- **Una pincelada deja un hueco permanente, o una máscara destapa la letra vecina antes de tiempo** → no lo ve ningún linter; se compara el emblema terminado contra la forma de referencia por píxeles, y se mide letra por letra que nada se adelante.
- **El cierre deja la página en un estado raro** → el criterio es que bajar siempre funcione: con JavaScript, sin JavaScript y con movimiento reducido. En el peor caso el emblema se va scrolleando.
- **El cierre gasta scroll** → ese excedente es lo que da margen al movimiento. Se arranca en un 60 % de pantalla y se ajusta.
- **La home gana una pantalla** → quien entra ve el emblema antes que las fotos. Es la decisión, no un efecto colateral: el que quiere contenido baja, y bajar ya no cuesta esperar.
- **Un oyente de scroll por cuadro cuesta** → el sitio ya tiene uno; el cálculo se engancha ahí y se corta apenas el emblema deja de estar a la vista.

## Migration Plan

Nada que migrar. Volver atrás es devolver la capa y su `setupIntro()`.

## Open Questions

- Cuánto scroll pedir para el cierre. Arranca en 60 % de pantalla y se ajusta mirándolo.
