# Configuración de Decap CMS para Constructora Carpio

## 📋 Pasos para configurar Decap CMS en Netlify

### 1. Desplegar el sitio en Netlify

1. Sube tu repositorio a GitHub
2. Ve a [Netlify](https://app.netlify.com)
3. Haz clic en "Add new site" > "Import an existing project"
4. Conecta tu repositorio de GitHub
5. La configuración de build ya está en `netlify.toml`, solo haz clic en "Deploy"

### 2. Habilitar Netlify Identity

1. En tu sitio de Netlify, ve a **Site settings** > **Identity**
2. Haz clic en **Enable Identity**
3. En **Registration preferences**, selecciona **Invite only** (para mayor seguridad)
4. En **External providers**, puedes habilitar GitHub, Google, etc. (opcional)

### 3. Habilitar Git Gateway

1. En la sección **Identity**, ve a **Services** > **Git Gateway**
2. Haz clic en **Enable Git Gateway**
3. Esto permitirá que Decap CMS haga commits directamente a tu repositorio

### 4. Invitar usuarios

1. Ve a **Identity** en el panel de Netlify
2. Haz clic en **Invite users**
3. Ingresa el email del administrador
4. El usuario recibirá un email de invitación

### 5. Acceder al panel de administración

Una vez desplegado el sitio, puedes acceder a:
```
https://tu-sitio.netlify.app/admin/
```

## 🔧 Desarrollo Local

Para trabajar con Decap CMS en local:

1. Instala el proxy local de Decap:
```bash
npx decap-server
```

2. En otra terminal, ejecuta el servidor de desarrollo:
```bash
npm run dev
```

3. Accede a:
```
http://localhost:4321/admin/
```

## 📁 Estructura de Contenido

El CMS está configurado para gestionar:

### Proyectos
- **Ubicación**: `src/content/proyectos/`
- **Campos**: título, descripción, imagen, categoría, estado, ubicación, fechas, galería, etc.
- **URL**: `/proyecto/[slug]`

### Servicios
- **Ubicación**: `src/content/services/`
- **Campos**: título, descripción, imagen, icono, características, beneficios
- **URL**: `/servicios/[slug]`

### Páginas Configurables
- **Página Principal**: `src/data/home.json`
  - Hero section
  - Sección sobre nosotros
  - Misión y visión
  - Testimonios

- **Quiénes Somos**: `src/data/about.json`
  - Información de la empresa
  - Valores corporativos
  - Equipo de trabajo

- **Contacto**: `src/data/contact.json`
  - Información de contacto
  - Redes sociales
  - Ubicaciones

- **Configuración General**: `src/data/settings.json`
  - SEO
  - Analíticas
  - Configuración del sitio

## 🎨 Personalización

Para personalizar el CMS, edita:
```
public/admin/config.yml
```

## 🔐 Seguridad

- El CMS solo es accesible para usuarios autenticados
- Los usuarios deben ser invitados manualmente
- Git Gateway maneja los commits de forma segura
- Todas las credenciales se gestionan a través de Netlify Identity

## 📚 Recursos

- [Documentación de Decap CMS](https://decapcms.org/docs/)
- [Netlify Identity](https://docs.netlify.com/visitor-access/identity/)
- [Git Gateway](https://docs.netlify.com/visitor-access/git-gateway/)

## ⚠️ Notas Importantes

1. Asegúrate de que `local_backend: true` esté en `config.yml` solo durante desarrollo
2. Los cambios en el CMS se commitean directamente a tu repositorio
3. Netlify reconstruirá automáticamente el sitio con cada cambio
4. Las imágenes se guardan en `public/images/`

## 🚀 Workflow Recomendado

1. **Desarrollo**: Trabaja en tu rama de desarrollo
2. **Contenido**: Los editores trabajan directamente en la rama principal a través del CMS
3. **Deploy**: Netlify despliega automáticamente los cambios
4. **Backup**: Git mantiene un historial completo de todos los cambios

---

¿Necesitas ayuda? Consulta la documentación o contacta al equipo técnico.
