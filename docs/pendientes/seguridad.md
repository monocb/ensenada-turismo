# Seguridad

No hay backend, formularios ni funciones serverless hoy, así que la superficie de riesgo es baja.

Si se agregan formularios (por ejemplo para el concurso fotográfico, ver [`docs/proyecto/funcionalidades-futuras.md`](../proyecto/funcionalidades-futuras.md)): sumar validación, protección antispam y usar variables de entorno de Netlify para cualquier clave — nunca hardcodear tokens en el frontend.
