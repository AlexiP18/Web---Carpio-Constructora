# Guía: TinaCMS + Cloudinary

## Flujo de Trabajo para Agregar Contenido

### 📁 Estructura de Carpetas en Cloudinary

```
constructora-carpio/
├── proyectos/
│   ├── conjunto-habitacional/
│   │   ├── [nombre-proyecto]/
│   │   │   ├── galeria/
│   │   │   └── videos/
│   ├── diseno-residencial/
│   │   └── [nombre-proyecto]/...
│   └── diseno-retail/
│       └── [nombre-proyecto]/...
├── servicios/
│   ├── construccion/
│   ├── diseno-arquitectonico/
│   └── [categoria]/...
└── general/
    ├── equipo/
    ├── logos/
    └── testimonios/
```

---

## 🆕 Agregar un Nuevo Proyecto

### Paso 1: Subir Imágenes a Cloudinary

1. Ve a [Cloudinary Dashboard](https://console.cloudinary.com/pm/c-a7e0b9d0d1c6c1/media_library)
2. Navega a la carpeta correspondiente según la categoría:
   - `constructora-carpio/proyectos/conjunto-habitacional/`
   - `constructora-carpio/proyectos/diseno-residencial/`
   - `constructora-carpio/proyectos/diseno-retail/`
3. Crea una nueva carpeta con el nombre del proyecto (ej: `mi-nuevo-proyecto`)
4. Dentro crea subcarpetas: `galeria/` y `videos/`
5. Sube las imágenes y videos

### Paso 2: Copiar URLs

Para cada imagen subida:
1. Click en la imagen
2. Copia la URL (botón "Copy URL")
3. La URL tendrá este formato:
   ```
   https://res.cloudinary.com/dt5y4fsst/image/upload/v1234567890/constructora-carpio/proyectos/categoria/proyecto/galeria/imagen.jpg
   ```

### Paso 3: Crear Proyecto en TinaCMS

1. Ve a `/admin` en tu sitio
2. Navega a **Proyectos** → **Crear Nuevo**
3. Completa los campos:
   - **Título**: Nombre del proyecto
   - **Categoría**: Selecciona la categoría correspondiente
   - **Imagen Principal**: Pega la URL de Cloudinary de la imagen hero
   - **Galería**: Agrega cada URL de imagen
   - **Video Tour Virtual**: Pega la URL del video (si existe)

---

## 🆕 Agregar una Nueva Categoría

### Para Proyectos:

1. Ve a `/admin`
2. Navega a **Categorías de Proyectos** → **Crear Nueva**
3. Completa:
   - **Nombre**: Ej: "Edificio Comercial"
   - **Slug**: Ej: "edificio-comercial"
   - **Carpeta Cloudinary**: `constructora-carpio/proyectos/edificio-comercial`
4. En Cloudinary, crea la carpeta correspondiente

### Para Servicios:

1. Ve a `/admin`
2. Navega a **Categorías de Servicios** → **Crear Nueva**
3. Sigue el mismo proceso

---

## 🎥 Agregar Videos

### Subir Video a Cloudinary:

1. En Cloudinary, navega a la carpeta del proyecto → `videos/`
2. Click en **Upload**
3. Sube el video (formatos soportados: MP4, MOV, WebM)
4. Cloudinary lo procesará automáticamente

### Usar el Video:

La URL será algo como:
```
https://res.cloudinary.com/dt5y4fsst/video/upload/v1234567890/constructora-carpio/proyectos/categoria/proyecto/videos/tour.mov
```

**Nota**: El componente `ProjectVideo` convierte automáticamente a MP4 y WebM para mejor compatibilidad.

---

## 📋 Referencia Rápida de URLs

### Imagen con Transformaciones Automáticas:
```
https://res.cloudinary.com/dt5y4fsst/image/upload/w_1200,q_auto,f_auto/RUTA_DEL_ARCHIVO
```

### Video con Conversión Automática:
```
# MP4
https://res.cloudinary.com/dt5y4fsst/video/upload/f_mp4,vc_h264/RUTA_DEL_ARCHIVO

# WebM
https://res.cloudinary.com/dt5y4fsst/video/upload/f_webm,vc_vp9/RUTA_DEL_ARCHIVO
```

### Poster de Video (primer frame):
```
https://res.cloudinary.com/dt5y4fsst/video/upload/so_0,f_jpg,w_1280/RUTA_DEL_ARCHIVO.jpg
```

---

## ⚠️ Notas Importantes

1. **URLs Directas**: Siempre pega la URL completa de Cloudinary en TinaCMS
2. **No mover archivos**: Una vez subidos, evita mover archivos en Cloudinary (cambia la URL)
3. **Nombres de archivo**: Usa nombres descriptivos sin espacios ni caracteres especiales
4. **Formatos recomendados**:
   - Imágenes: JPG, PNG, WebP
   - Videos: MP4, MOV (Cloudinary los convierte automáticamente)

---

## 🔧 Comandos Útiles

```bash
# Listar assets en Cloudinary
node scripts/organize-cloudinary-folders.mjs list

# Subir video desde terminal
node scripts/upload-video-to-cloudinary.mjs ruta/al/video.mp4
```
