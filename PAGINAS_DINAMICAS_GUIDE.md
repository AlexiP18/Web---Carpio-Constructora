# 📄 Sistema de Páginas Dinámicas con TinaCMS

## Descripción General

Este sistema permite gestionar las páginas principales del sitio (Inicio, Nosotros, Servicios, Proyectos, Contacto) de forma completamente visual desde el panel de administración de TinaCMS.

## Características Principales

### ✅ Páginas Configurables
- **Inicio** (`/`)
- **Quiénes Somos** (`/quienes-somos`)
- **Servicios** (`/servicios`)
- **Proyectos** (`/proyectos`)
- **Contacto** (`/contacto`)

### ✅ Bloques/Secciones Disponibles

| Bloque | Descripción | Casos de uso |
|--------|-------------|--------------|
| `hero` | Sección principal con imagen/video de fondo | Cabecera de página |
| `about` | Sobre nosotros con estadísticas | Historia, misión |
| `services` | Grid de servicios | Listado de servicios |
| `projects` | Portafolio de proyectos | Galería de proyectos |
| `testimonials` | Slider de testimonios | Opiniones de clientes |
| `cta` | Llamado a la acción | Conversión |
| `contact` | Formulario + info de contacto | Página de contacto |
| `team` | Equipo de trabajo | Quiénes somos |
| `faq` | Preguntas frecuentes | Soporte |
| `gallery` | Galería de imágenes | Portafolio visual |
| `features` | Características/valores | Beneficios |
| `content` | Contenido libre (Rich Text) | Texto extenso |
| `spacer` | Separador/espaciador | Divisiones |

## Estructura de Archivos

```
src/
├── content/
│   └── paginas/           # JSONs de cada página
│       ├── inicio.json
│       ├── nosotros.json
│       ├── servicios.json
│       ├── proyectos.json
│       └── contacto.json
│
├── components/
│   ├── BlockRenderer.astro    # Renderizador principal
│   └── blocks/                # Componentes de bloques
│       ├── HeroBlock.astro
│       ├── AboutBlock.astro
│       ├── ServicesBlock.astro
│       ├── ProjectsBlock.astro
│       ├── TestimonialsBlock.astro
│       ├── CTABlock.astro
│       ├── ContactBlock.astro
│       ├── TeamBlock.astro
│       ├── FAQBlock.astro
│       ├── GalleryBlock.astro
│       ├── FeaturesBlock.astro
│       ├── ContentBlock.astro
│       └── SpacerBlock.astro
│
tina/
├── config.ts                  # Configuración de TinaCMS
└── fields/
    ├── cloudinary-fields.tsx  # Campos de imágenes
    └── page-blocks.ts         # Templates de bloques
```

## Uso en Páginas Astro

Para usar el sistema de páginas dinámicas en tus archivos Astro:

```astro
---
import Layout from '@/layouts/Layout.astro';
import BlockRenderer from '@/components/BlockRenderer.astro';

// Leer el JSON de la página desde TinaCMS o directamente
import pageData from '@/content/paginas/inicio.json';

// O usar la API de TinaCMS
// const pageQuery = await client.queries.paginas({ relativePath: 'inicio.json' });
// const pageData = pageQuery.data.paginas;
---

<Layout title={pageData.seo?.metaTitle || pageData.title}>
  <BlockRenderer sections={pageData.sections} />
</Layout>
```

## Configuración de un Bloque (Ejemplo: Hero)

```json
{
  "_template": "hero",
  "title": "Construimos tus sueños con excelencia",
  "subtitle": "Más de 20 años de experiencia...",
  "backgroundImage": "https://res.cloudinary.com/.../imagen.jpg",
  "ctaText": "Ver Proyectos",
  "ctaLink": "/proyectos",
  "secondaryCtaText": "Contáctanos",
  "secondaryCtaLink": "/contacto",
  "alignment": "center",
  "overlay": true
}
```

## Reordenar Secciones

En el panel de TinaCMS:
1. Ve a **Páginas del Sitio** > Selecciona la página
2. En **Secciones de la Página**, arrastra y suelta para reordenar
3. Guarda los cambios

## Agregar Nueva Sección

1. Haz clic en el botón **+** en "Secciones de la Página"
2. Selecciona el tipo de bloque
3. Configura los campos del bloque
4. Guarda los cambios

## Crear Nuevo Tipo de Bloque

### 1. Crear el Template en TinaCMS

```typescript
// tina/fields/page-blocks.ts

export const newSection: Template = {
  name: 'newBlock',
  label: 'Nuevo Bloque',
  fields: [
    {
      type: 'string',
      name: 'title',
      label: 'Título',
    },
    // ... más campos
  ],
};

// Agregar al array de templates
export const pageBlockTemplates = [
  // ... otros templates
  newSection,
];
```

### 2. Crear el Componente Astro

```astro
---
// src/components/blocks/NewBlock.astro

interface Props {
  title?: string;
  // ... más props
}

const { title } = Astro.props;
---

<section class="py-16">
  <h2>{title}</h2>
</section>
```

### 3. Registrar en BlockRenderer

```astro
// src/components/BlockRenderer.astro

import NewBlock from './blocks/NewBlock.astro';

const blockComponents: Record<string, any> = {
  // ... otros bloques
  newBlock: NewBlock,
};
```

## Notas Importantes

1. **Imágenes**: Usa URLs de Cloudinary para optimización automática
2. **SEO**: Cada página tiene campos de SEO (metaTitle, metaDescription, ogImage)
3. **Previsualización**: TinaCMS permite ver los cambios en tiempo real
4. **Validación**: Los campos requeridos están marcados en el esquema

## Acceso al Panel

```
URL: http://localhost:4321/admin
```

En producción, configura las credenciales de TinaCMS Cloud para autenticación.
