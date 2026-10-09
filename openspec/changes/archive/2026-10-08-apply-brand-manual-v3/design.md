## Context

El Manual de Identidad v3.0 llegó como HTML navegable con sus SVG y su PDF, en `docs/marca/manual-identidad/`. Define seis cosas que el sitio no tiene: el lettering de pincel, el trazo de costa que lo prolonga, la tipografía Archivo, una paleta con roles explícitos, el contenedor La Caleta y un sistema de tres territorios.

El sitio llega a este cambio recién ordenado: la baja de Luna Tarumá liberó el 40% de la home y la ronda de accesibilidad dejó el orden de foco, los controles y el cromo nativo en su lugar. Encima de esa base limpia, este cambio es de lenguaje visual y nada más.

El modo es **rediseño preservando**: cambia cómo se ve, no qué dice ni cómo se navega. La arquitectura de información, las rutas, los anclas, el orden de las secciones, los textos y las fotos quedan como están.

## Goals / Non-Goals

**Goals:**

- Que la marca del manual sea la marca del sitio, empezando por el logotipo.
- Que el sistema sea coherente: una tipografía, una paleta con roles, una escala de forma.
- Que los tres territorios se lean como un sistema y no como tres tarjetas iguales.
- Que se sienta una pieza cuidada, a la altura de lo que la marca propone.

**Non-Goals:**

- Cambiar la arquitectura de información, las rutas o el orden de las secciones.
- Reescribir los textos.
- Reemplazar o reencuadrar fotos.
- Agregar build, dependencias o framework.
- Construir las aplicaciones del manual que no son web (cartelería, remeras, ploteo).

## Decisions

### D1 — Los SVG de marca se copian al sitio, no se enlazan desde la documentación

Los tres SVG viven hoy en `docs/marca/manual-identidad/`. Se copian a `assets/marca/`.

`docs/` es documentación: puede reorganizarse, versionarse o moverse sin avisar, y el sitio en producción no debería depender de esa carpeta. Los tres usan `fill="currentColor"`, así que se colorean por CSS y una sola copia sirve para todas las variantes del manual (institucional, negativo, sobre color).

### D2 — El lettering se inserta en línea, no como `<img>`

Van embebidos en el HTML como `<svg>`, no referenciados con `<img src>`.

El motivo es `currentColor`: un SVG dentro de `<img>` queda aislado y no hereda el color del contexto, así que haría falta un archivo por variante. Embebido, el mismo marcado sirve en verde sobre papel, en blanco sobre noche y en blanco sobre celeste, que son exactamente las tres versiones que el manual pide.

El nombre sigue estando como texto para lectores de pantalla y buscadores: el SVG se marca como decorativo y el texto del nombre queda disponible junto a él.

*Alternativa descartada:* una fuente con el lettering. El manual es explícito en que el trazo de pincel no se tipea nunca.

### D3 — Archivo reemplaza a Inter, en los tres pesos que el manual nombra

Se carga Archivo en 400, 700 y 900 desde el mismo proveedor que hoy sirve Inter, y se cambia la familia en la raíz. No se cargan pesos que el manual no use.

Hay una ironía que vale registrar: Archivo es la fuente que pedía el juego de Luna Tarumá hace tres semanas, y se descartó razonando que no valía una segunda familia por un bloque temporal. Para ese bloque la decisión estaba bien. A nivel sitio resulta que Archivo no era un capricho del juego: era la tipografía de la marca.

### D4 — Los tokens del manual son la base; los del sitio pasan a apoyarse en ellos

En lugar de reemplazar los nombres de token que usa todo `styles.css`, se declaran los del manual con los nombres del manual y los existentes pasan a referenciarlos:

```
--noche: #0E1330;        /* del manual */
--dark: var(--noche);    /* lo que ya usa el resto del archivo */
```

Así el cambio de color entra en un solo lugar y no hay que reescribir siete mil líneas. Además deja legible de dónde sale cada valor, que es justo lo que hoy falta: la paleta actual *se parece* a la de marca sin serlo, y nada en el archivo explica por qué.

Los cuatro bloques `:root` se dejan donde están. Reorganizarlos es exactamente lo que las convenciones del repo piden no hacer.

### D5 — La escala de forma sale de la Caleta y tiene cuatro peldaños

Hoy conviven once radios distintos (999, 24, 18, 14, 12, 10, 8, 7, 0 y dos con `!important`). Se reducen a:

| Token | Valor | Para |
|---|---|---|
| `--r-pastilla` | 999px | botones y pastillas |
| `--r-caleta` | 20px | contenedores de marca y tarjetas grandes |
| `--r-media` | 12px | fotos y media |
| `--r-chico` | 8px | controles chicos |

Los valores huérfanos se mapean al peldaño más cercano: 24 y 18 a caleta, 14 y 10 a media, 7 a chico.

### D6 — La animación de la pincelada es la única del rediseño

El manual describe una secuencia de cuatro tiempos: empieza el trazo, se completa la palabra, el trazo sigue de largo, dibuja la costa. Se implementa animando el trazo de costa como si se dibujara, encadenado después de la aparición del lettering.

Es la única animación que agrega este cambio. El manual la nombra explícitamente, así que está motivada; cualquier otra cosa que se mueva sería movimiento porque sí. Con `prefers-reduced-motion` el emblema aparece completo.

### D7 — Los territorios heredan el color del manual sin cambiar de estructura

Cada tarjeta recibe su par de colores mediante una variable local, y los estilos compartidos la consumen:

- Punta Lara: `#1B5E20` y `#3E8E3F`, la reserva natural.
- El Dique: `#6B7280` y `#FFD43D`, el corazón obrero.
- Ensenada Centro: `#0E1330` y `#F04438`, la historia viva.

Una sola regla con el esqueleto y tres declaraciones de color. Sumar Isla Santiago más adelante, que el manual ya contempla como emblema ribereño, es agregar un par de colores y nada más.

### D8 — El contraste se mide, no se estima

La paleta nueva es más saturada. El repo ya tiene antecedente de esto: en julio se midió el contraste con sampleo real de píxeles y apareció un texto a 1.5:1 que a ojo parecía bien. Se repite el procedimiento con el arnés de Chromium de esta sesión, sobre los lugares donde hay texto sobre foto y sobre los pares nuevos de color.

## Risks / Trade-offs

- **La paleta saturada rompe contrastes que hoy pasan** → D8: se miden todos los pares sobre píxeles reales, antes de dar el cambio por bueno.
- **Cambiar la familia tipográfica desacomoda layouts calculados para Inter** → Archivo tiene métricas distintas. Se revisan los lugares con texto ajustado (el hero, los títulos de sección, los botones) en escritorio y teléfono, y se buscan desbordes y saltos de línea nuevos.
- **El lettering en SVG no escala bien en pantallas chicas** → Se define un ancho mínimo y se verifica legibilidad a 360px. El manual fija una versión mínima legible a 2 cm, que es la referencia.
- **Siete mil líneas de CSS escritas para la paleta vieja** → D4 hace que el cambio entre por los tokens, no por los usos. El riesgo real es que algún color esté hardcodeado fuera de los tokens; se buscan los hex sueltos antes de empezar.
- **El cambio es grande y no hay regresión visual automática** → Se capturan las tres páginas antes y después, en dos anchos, y se comparan con criterio explícito. No se busca que sea idéntico, que sería absurdo en un rediseño, sino que no haya nada roto.

## Migration Plan

1. Copiar los SVG a `assets/marca/` y buscar hex hardcodeados fuera de los tokens.
2. Declarar los tokens del manual y colgar de ellos los existentes.
3. Cambiar la tipografía y revisar lo que se desacomode.
4. Insertar el lettering y el trazo, con su animación.
5. Unificar la escala de forma.
6. Aplicar el sistema de territorios.
7. Medir contraste, revisar las tres páginas en dos anchos, correr el CI.
8. Actualizar `docs/marca/colores-y-tipografia.md`, que documenta la v1.0 y aclara que el CSS no la usa: pasa a documentar la v3.0 y a decir que ahora sí.

Rollback: `git revert`. No cambia rutas, ni contenido, ni datos.

## Open Questions

Ninguna bloqueante. Dos cosas se resuelven mirándolas al implementar: cuánto espacio darle al lettering en el hero sin que compita con el titular, y si el trazo de costa funciona mejor pegado al lettering o separado.
