# Generar variantes responsive de imágenes (srcset)

Comando usado para generar las variantes 480w/900w/1400w de las 8 imágenes del hero (`assets/portada-home/`), vía `ffmpeg` con el encoder `libwebp`:

```bash
for f in assets/portada-home/*.webp; do
  base=$(basename "$f" .webp)
  # saltar los archivos que ya son variantes (terminan en -480w, -900w, -1400w)
  case "$base" in *-480w|*-900w|*-1400w) continue ;; esac
  for w in 480 900 1400; do
    ffmpeg -y -i "$f" -vf "scale=${w}:-1" -c:v libwebp -quality 78 "assets/portada-home/${base}-${w}w.webp" -loglevel error
  done
done
```

Convención de nombre: `<nombre-original>-<ancho>w.webp` (ej. `portada-01-aerea-480w.webp`), en la misma carpeta que el original.

Al agregar o reemplazar una imagen de portada, regenerar sus 3 variantes con este comando y agregar el atributo `srcset` correspondiente en el `<img>` de `index.html`:

```html
<img
  src="assets/portada-home/<nombre>.webp"
  srcset="assets/portada-home/<nombre>-480w.webp 480w, assets/portada-home/<nombre>-900w.webp 900w, assets/portada-home/<nombre>-1400w.webp 1400w, assets/portada-home/<nombre>.webp <ancho-original>w"
  sizes="100vw"
  ...
/>
```

`sizes="100vw"` es correcto porque el hero es full-bleed (`.hero-gallery { position: absolute; inset: 0 }`, ocupa siempre el 100% del ancho del viewport).

Antes de subir, verificar visualmente cada variante (especialmente fotos con sombras/detalle fino, más propensas a artefactos de compresión) y confirmar el ancho real generado con `ffprobe -v error -select_streams v:0 -show_entries stream=width -of csv=p=0 <archivo>`.
