# Bugs conocidos

Reportados en una auditoría previa del sitio en vivo. **No están confirmados como resueltos ni pendientes hoy** — `styles.css` tiene comentarios de parches fechados que sugieren que algunos ya se atendieron parcialmente (ver [`docs/tecnico/convenciones-de-codigo.md`](../tecnico/convenciones-de-codigo.md)); verificar manualmente en mobile antes de asumir el estado de cada uno.

1. Portada mobile con problemas de responsive.
2. Imagen de fondo (barcos/portada) mal posicionada en celular.
3. Botón de menú hamburguesa mostrando seis líneas en vez de un ícono claro de tres líneas.
4. Un "renglón amarillo" que rompe el layout en mobile.
5. Sección Cultura reportada sin mostrar fotos correctamente.
6. Falta un video real de YouTube en la sección Punta Lara (hoy sin definir, ver [`docs/proyecto/funcionalidades-futuras.md`](../proyecto/funcionalidades-futuras.md)).

## Riesgos de fondo (ya mitigados por esta migración)

- ~~Deploy manual sin `source_zip`, riesgo de pérdida de código fuente.~~ Resuelto: el código ahora vive en este repo Git.
- ~~Ausencia de Git conectado a Netlify.~~ En proceso, ver [`docs/tecnico/deploy-netlify.md`](../tecnico/deploy-netlify.md).
