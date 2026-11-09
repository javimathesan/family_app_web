# Family App — sitio web

Página del producto Family App: qué es, cómo funciona, familias amigas, Family App Plus, lo que viene y un formulario para avisar del lanzamiento.

Sitio estático: HTML + CSS + JS, sin dependencias ni build.

## Estructura

```
index.html        Página
styles.css        Estilos
main.js           Planilla interactiva del hero + formulario
assets/favicon.svg
```

## Verlo en local

Abrí `index.html` en el navegador, o desde la carpeta:

```powershell
npx serve .
```

## Antes de publicar

- **Correo del formulario**: en `main.js`, cambiá `CONTACT_EMAIL`. Hoy el botón abre el correo del visitante (mailto). Si querés guardar los correos sin depender de eso, conectá un servicio de formularios (Formspree, Netlify Forms o una Cloud Function de Firebase, que ya usa la app).
- **Textos**: el hero usa el ejemplo "Tareas de Sofi"; ajustá tareas y premio en `main.js` (`TASKS`, `GOAL`).

## Capturas de la app

Están en `assets/capturas/` (formato .webp, 540×1120). Para reemplazar una, guardá la nueva con el **mismo nombre** y listo:

- `ajustes-hogar.webp`, `palabras.webp`, `juegos.webp`, `personalizar.webp` → sección "Así se ve la app"
- `reglas-de-juego.webp` → sección de juegos
- `avatar.webp` → sección Plus

Recortá la barra de estado del teléfono (hora, batería) antes de guardarlas. No subas capturas con nombres reales: el historial de Git las conserva aunque después las reemplaces.

## Imagen para compartir

`assets/og-image-v2.jpg` (1200×630) es la vista previa que muestran WhatsApp, Facebook y X. Las etiquetas `og:` en `index.html` la apuntan con la URL completa; si la web pasa a un dominio propio, actualizá `og:url` y `og:image`.

WhatsApp y Teams guardan la vista previa en caché. Si cambiás la imagen, guardala con otro nombre (por ejemplo `og-image-v3.jpg`) y actualizá `og:image`, así la vuelven a leer. Todo lo importante va en el cuadrado del centro, porque algunas apps la recortan en cuadrado.

## Publicar con GitHub Pages

1. Subí los archivos al repo `javimathesan/family_app_web` (rama `main`).
2. En GitHub: Settings → Pages → Source: *Deploy from a branch* → `main` / `root`.
3. Queda en `https://javimathesan.github.io/family_app_web/`.
