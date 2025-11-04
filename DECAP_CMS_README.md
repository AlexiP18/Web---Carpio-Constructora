# ✅ Configuración Completa de Decap CMS - Constructora Carpio

## 🎨 Diseño Mejorado del Panel de Administración

El panel de administración cuenta con:
- ✨ Interfaz moderna y profesional
- 🎨 Colores corporativos de Constructora Carpio
- 📱 Diseño responsive y adaptable
- ⚡ Animaciones suaves y transiciones
- 🌙 Soporte para modo oscuro
- ♿ Mejoras de accesibilidad

## 📦 Archivos Creados/Modificados

### Configuración Principal
- ✅ `netlify.toml` - Configuración de Netlify
- ✅ `public/admin/config.yml` - Configuración basada en estructura real del proyecto
- ✅ `public/admin/index.html` - Panel con diseño personalizado
- ✅ `public/admin/preview.css` - Estilos para vista previa
- ✅ `tsconfig.json` - Actualizado para soportar JSON imports

### Archivos de Datos (Editables desde el CMS)
- ✅ `src/data/home.json` - Datos de la página principal
- ✅ `src/data/about.json` - Información "Quiénes Somos"
- ✅ `src/data/contact.json` - Información de contacto
- ✅ `src/data/settings.json` - Configuración general del sitio

### Utilidades y Ejemplos
- ✅ `src/lib/cms.ts` - Funciones helper para cargar datos del CMS
- ✅ `src/pages/cms-example.astro` - Página de ejemplo de uso
- ✅ `DECAP_CMS_SETUP.md` - Guía completa de configuración
- ✅ `DECAP_CMS_ADVANCED.md` - Configuraciones avanzadas

## 🎯 Características Implementadas

### Colecciones Configuradas (Basadas en Estructura Real)

#### 1. **🏗️ Proyectos** (`src/content/proyectos/`)
Estructura basada en `src/data/proyectos.ts`:
- **Información básica**: slug, título, descripción, etiquetas
- **Imágenes**: imagen principal + galería completa
- **Contenido**: descripción detallada en markdown
- **Video**: tour virtual opcional
- **Testimonios**: testimonio principal + testimonios adicionales
- **Filtros**: por tipo (Residencial, Comercial, Industrial, Retail)
- **Vista previa**: `/proyecto/[slug]`

**Campos principales**:
- `slug`, `title`, `description`
- `tags` (múltiple selección)
- `backgroundImage` (imagen hero)
- `images` (array de imágenes)
- `content` (markdown)
- `virtualTourVideo`
- `testimonial` (objeto)
- `testimonials` (array)

#### 2. **🛠️ Servicios** (`src/content/servicios/`)
Estructura basada en `src/data/servicios.ts`:
- **Información del servicio**: nombre, categoría, tagline
- **Características**: título, descripción, iconos Phosphor
- **Beneficios**: con descripciones e iconos
- **Proceso**: pasos numerados del flujo de trabajo
- **Testimonios**: opiniones de clientes
- **FAQs**: preguntas frecuentes
- **Vista previa**: `/servicios/[slug]`

**Campos principales**:
- `slug`, `title`, `subtitle`, `description`
- `service.name`, `service.category`, `service.tagline`
- `service.features` (array con iconos)
- `service.benefits` (array)
- `service.process` (pasos numerados)
- `service.testimonials` (array)
- `service.faqs` (array)

#### 3. **📄 Configuración de Páginas**

**📞 Información de Contacto** (`src/data/contact.json`):
- Teléfonos (principal y secundario)
- Emails (principal y secundario)
- Dirección física completa
- Horarios de atención
- Redes sociales (Facebook, Instagram, LinkedIn, Twitter, YouTube)
- Múltiples ubicaciones/sucursales con mapas

**⚙️ Configuración General** (`src/data/settings.json`):
- Información del sitio (nombre, descripción)
- Logo y favicon
- Configuración SEO:
  - Meta título y descripción
  - Palabras clave
  - Imagen Open Graph
- Analíticas:
  - Google Analytics ID
  - Facebook Pixel ID

## 🚀 Próximos Pasos

### 1. Desplegar en Netlify
```bash
# 1. Sube tu código a GitHub
git add .
git commit -m "Configuración completa de Decap CMS"
git push origin main

# 2. Ve a https://app.netlify.com
# 3. "Add new site" > "Import an existing project"
# 4. Conecta tu repositorio
# 5. Deploy (la configuración ya está lista)
```

### 2. Habilitar Netlify Identity
1. Site settings > Identity > Enable Identity
2. Registration: **Invite only**
3. Services > Git Gateway > Enable Git Gateway

### 3. Invitar Administradores
1. Identity > Invite users
2. Ingresa emails de los administradores
3. Los usuarios recibirán un email de invitación

### 4. Acceder al CMS
```
https://tu-sitio.netlify.app/admin/
```

## 💻 Desarrollo Local

```bash
# Terminal 1: Proxy de Decap CMS
npx decap-server

# Terminal 2: Servidor de desarrollo
npm run dev

# Acceder a:
http://localhost:4321/admin/
```

## 📝 Cómo Usar los Datos del CMS

### En cualquier componente Astro:

```astro
---
import { getHomeData, getContactData } from '@/lib/cms';

const homeData = await getHomeData();
const contactData = await getContactData();

const { hero, testimonials } = homeData;
const { phone, email, social } = contactData;
---

<section>
  <h1>{hero.title}</h1>
  <p>{hero.subtitle}</p>
  <a href={`tel:${phone}`}>{phone}</a>
</section>

{testimonials.map((t) => (
  <div>
    <p>{t.content}</p>
    <p>- {t.name}, {t.position}</p>
  </div>
))}
```

### Ver ejemplo completo:
```
http://localhost:4321/cms-example
```

## 🔐 Seguridad

- ✅ Solo usuarios invitados pueden acceder
- ✅ Git Gateway maneja los commits de forma segura
- ✅ Panel admin visible solo para autenticados
- ✅ Todo el contenido se versiona en Git

## 🎨 Personalización

### Modificar campos:
Edita `public/admin/config.yml`

### Agregar nueva colección:
```yaml
- name: "blog"
  label: "Blog"
  folder: "src/content/blog"
  create: true
  fields:
    - {label: "Título", name: "title", widget: "string"}
    - {label: "Contenido", name: "body", widget: "markdown"}
```

### Cambiar idioma del CMS:
```yaml
locale: "es"  # Ya está configurado
```

## 📊 Workflow de Trabajo

1. **Editores**: Trabajan en `https://tu-sitio.netlify.app/admin/`
2. **Cambios**: Se commitean automáticamente a GitHub
3. **Deploy**: Netlify reconstruye el sitio automáticamente
4. **Sitio actualizado**: En ~2 minutos

## 🆘 Solución de Problemas

### No puedo acceder a /admin/
- Verifica que Netlify Identity esté habilitado
- Verifica que Git Gateway esté habilitado
- Limpia caché del navegador

### Los cambios no se guardan
- Verifica que Git Gateway esté habilitado
- Revisa los permisos del repositorio
- Verifica la conexión del backend en config.yml

### Error de autenticación
- Verifica que el email esté invitado en Netlify Identity
- Acepta la invitación desde el email
- Intenta cerrar sesión y volver a entrar

## 📚 Recursos Adicionales

- [Documentación Decap CMS](https://decapcms.org/docs/)
- [Netlify Identity](https://docs.netlify.com/visitor-access/identity/)
- [Widgets disponibles](https://decapcms.org/docs/widgets/)
- [Ejemplos de configuración](https://decapcms.org/docs/examples/)

## ✨ Funcionalidades Adicionales Disponibles

- Vista previa en vivo (configurar según necesidad)
- Subida de imágenes drag & drop
- Editor markdown rico
- Validaciones de campos
- Campos relacionados
- Internacionalización (i18n)
- Flujos de trabajo (draft/review/ready)

---

🎉 **¡Tu CMS está listo para usar!**

Una vez desplegado en Netlify y configurado Identity, podrás administrar todo el contenido del sitio de forma visual y segura.
