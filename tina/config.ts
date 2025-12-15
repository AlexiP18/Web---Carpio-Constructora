import { defineConfig } from 'tinacms';

// Opciones predefinidas para tags de proyectos
const projectTagOptions = [
  'residencial',
  'comercial',
  'industrial',
  'departamentos',
  'casas',
  'oficinas',
  'locales',
  'bodegas',
  'en-construccion',
  'completado',
  'preventa',
  'entrega-inmediata',
];

export default defineConfig({
  branch: process.env.TINA_BRANCH || 'main',
  clientId: process.env.TINA_PUBLIC_CLIENT_ID,
  token: process.env.TINA_TOKEN,
  build: {
    outputFolder: 'admin',
    publicFolder: 'public',
  },
  media: {
    tina: {
      mediaRoot: 'images',
      publicFolder: 'public',
    },
  },
  schema: {
    collections: [
      // ==========================================
      // COLECCIÓN: PROYECTOS
      // ==========================================
      {
        name: 'proyectos',
        label: 'Proyectos',
        path: 'src/content/proyectos',
        format: 'md',
        ui: {
          filename: {
            readonly: false,
            slugify: (values) => {
              return values?.slug || values?.title?.toLowerCase().replace(/\s+/g, '-') || '';
            },
          },
        },
        fields: [
          // --- Información Básica ---
          {
            type: 'string',
            name: 'title',
            label: 'Título del Proyecto',
            required: true,
          },
          {
            type: 'string',
            name: 'slug',
            label: 'Slug (URL)',
            description: 'Se genera automáticamente del título si se deja vacío',
          },
          {
            type: 'string',
            name: 'description',
            label: 'Descripción Corta',
            description: 'Resumen breve para tarjetas y SEO (máx. 160 caracteres)',
            ui: {
              component: 'textarea',
            },
          },
          {
            type: 'string',
            name: 'tags',
            label: 'Etiquetas',
            list: true,
            options: projectTagOptions,
          },
          {
            type: 'string',
            name: 'status',
            label: 'Estado del Proyecto',
            options: [
              { value: 'en-construccion', label: 'En Construcción' },
              { value: 'completado', label: 'Completado' },
              { value: 'preventa', label: 'Preventa' },
              { value: 'planificacion', label: 'En Planificación' },
            ],
          },
          
          // --- Imágenes (compatibles con Cloudinary y locales) ---
          {
            type: 'string',
            name: 'backgroundImage',
            label: 'Imagen Principal',
            description: 'URL de Cloudinary o ruta local (ej: /images/proyecto.webp)',
          },
          {
            type: 'string',
            name: 'images',
            label: 'Galería de Imágenes',
            description: 'URLs de Cloudinary o rutas locales',
            list: true,
          },
          {
            type: 'string',
            name: 'videoUrl',
            label: 'Video del Proyecto',
            description: 'URL de Cloudinary para video o YouTube',
          },
          
          // --- Ubicación ---
          {
            type: 'object',
            name: 'location',
            label: 'Ubicación',
            fields: [
              {
                type: 'string',
                name: 'address',
                label: 'Dirección',
              },
              {
                type: 'string',
                name: 'city',
                label: 'Ciudad',
              },
              {
                type: 'string',
                name: 'sector',
                label: 'Sector/Barrio',
              },
              {
                type: 'string',
                name: 'mapUrl',
                label: 'URL de Google Maps',
              },
              {
                type: 'number',
                name: 'lat',
                label: 'Latitud',
              },
              {
                type: 'number',
                name: 'lng',
                label: 'Longitud',
              },
            ],
          },
          
          // --- Especificaciones del Proyecto ---
          {
            type: 'object',
            name: 'specifications',
            label: 'Especificaciones',
            fields: [
              {
                type: 'number',
                name: 'totalUnits',
                label: 'Total de Unidades',
              },
              {
                type: 'number',
                name: 'availableUnits',
                label: 'Unidades Disponibles',
              },
              {
                type: 'number',
                name: 'floors',
                label: 'Número de Pisos',
              },
              {
                type: 'string',
                name: 'areaRange',
                label: 'Rango de Área (m²)',
                description: 'Ej: 80 - 150 m²',
              },
              {
                type: 'string',
                name: 'priceRange',
                label: 'Rango de Precios',
                description: 'Ej: $85,000 - $150,000',
              },
              {
                type: 'string',
                name: 'deliveryDate',
                label: 'Fecha de Entrega',
              },
              {
                type: 'number',
                name: 'parkingSpaces',
                label: 'Estacionamientos',
              },
            ],
          },
          
          // --- Amenidades ---
          {
            type: 'string',
            name: 'amenities',
            label: 'Amenidades',
            list: true,
            description: 'Lista de amenidades del proyecto',
          },
          
          // --- Características Destacadas ---
          {
            type: 'object',
            name: 'features',
            label: 'Características Destacadas',
            list: true,
            fields: [
              {
                type: 'string',
                name: 'icon',
                label: 'Icono',
                description: 'Nombre del icono (ej: home, building, tree)',
              },
              {
                type: 'string',
                name: 'title',
                label: 'Título',
              },
              {
                type: 'string',
                name: 'description',
                label: 'Descripción',
              },
            ],
          },
          
          // --- Testimonios del Proyecto ---
          {
            type: 'object',
            name: 'testimonials',
            label: 'Testimonios',
            list: true,
            fields: [
              {
                type: 'string',
                name: 'name',
                label: 'Nombre del Cliente',
              },
              {
                type: 'string',
                name: 'quote',
                label: 'Testimonio',
                ui: {
                  component: 'textarea',
                },
              },
              {
                type: 'string',
                name: 'image',
                label: 'Foto del Cliente',
                description: 'URL de Cloudinary o ruta local',
              },
              {
                type: 'string',
                name: 'unitType',
                label: 'Tipo de Unidad Adquirida',
              },
            ],
          },
          
          // --- SEO ---
          {
            type: 'object',
            name: 'seo',
            label: 'SEO',
            fields: [
              {
                type: 'string',
                name: 'metaTitle',
                label: 'Meta Título',
              },
              {
                type: 'string',
                name: 'metaDescription',
                label: 'Meta Descripción',
                ui: {
                  component: 'textarea',
                },
              },
              {
                type: 'string',
                name: 'ogImage',
                label: 'Imagen para Redes Sociales',
              },
            ],
          },
          
          // --- Contenido Principal ---
          {
            type: 'rich-text',
            name: 'body',
            label: 'Contenido Detallado',
            isBody: true,
          },
        ],
      },
      
      // ==========================================
      // COLECCIÓN: SERVICIOS
      // ==========================================
      {
        name: 'servicios',
        label: 'Servicios',
        path: 'src/content/services',
        format: 'md',
        ui: {
          filename: {
            readonly: false,
            slugify: (values) => {
              return values?.slug || values?.title?.toLowerCase().replace(/\s+/g, '-') || '';
            },
          },
        },
        fields: [
          // --- Información Básica ---
          {
            type: 'string',
            name: 'title',
            label: 'Título del Servicio',
            required: true,
          },
          {
            type: 'string',
            name: 'slug',
            label: 'Slug (URL)',
          },
          {
            type: 'string',
            name: 'shortDescription',
            label: 'Descripción Corta',
            description: 'Para tarjetas y listados',
            ui: {
              component: 'textarea',
            },
          },
          {
            type: 'string',
            name: 'icon',
            label: 'Icono del Servicio',
            description: 'Nombre del icono (ej: building, hammer, blueprint)',
          },
          
          // --- Configuración del Hero ---
          {
            type: 'object',
            name: 'heroConfig',
            label: 'Configuración del Hero',
            fields: [
              {
                type: 'string',
                name: 'backgroundImage',
                label: 'Imagen de Fondo',
                description: 'URL de Cloudinary o ruta local',
              },
              {
                type: 'string',
                name: 'subtitle',
                label: 'Subtítulo',
              },
              {
                type: 'string',
                name: 'ctaText',
                label: 'Texto del Botón CTA',
              },
              {
                type: 'string',
                name: 'ctaLink',
                label: 'Enlace del Botón CTA',
              },
            ],
          },
          
          // --- Galería ---
          {
            type: 'string',
            name: 'gallery',
            label: 'Galería de Imágenes',
            list: true,
            description: 'URLs de Cloudinary o rutas locales',
          },
          
          // --- Beneficios ---
          {
            type: 'object',
            name: 'benefits',
            label: 'Beneficios del Servicio',
            list: true,
            fields: [
              {
                type: 'string',
                name: 'icon',
                label: 'Icono',
              },
              {
                type: 'string',
                name: 'title',
                label: 'Título',
              },
              {
                type: 'string',
                name: 'description',
                label: 'Descripción',
              },
            ],
          },
          
          // --- Proceso/Pasos ---
          {
            type: 'object',
            name: 'process',
            label: 'Proceso del Servicio',
            list: true,
            fields: [
              {
                type: 'number',
                name: 'step',
                label: 'Número de Paso',
              },
              {
                type: 'string',
                name: 'title',
                label: 'Título del Paso',
              },
              {
                type: 'string',
                name: 'description',
                label: 'Descripción',
              },
            ],
          },
          
          // --- Testimonios del Servicio ---
          {
            type: 'object',
            name: 'testimonialsSection',
            label: 'Sección de Testimonios',
            fields: [
              {
                type: 'boolean',
                name: 'enabled',
                label: 'Mostrar Testimonios',
              },
              {
                type: 'string',
                name: 'title',
                label: 'Título de la Sección',
              },
              {
                type: 'object',
                name: 'items',
                label: 'Testimonios',
                list: true,
                fields: [
                  {
                    type: 'string',
                    name: 'name',
                    label: 'Nombre',
                  },
                  {
                    type: 'string',
                    name: 'role',
                    label: 'Cargo/Rol',
                  },
                  {
                    type: 'string',
                    name: 'quote',
                    label: 'Testimonio',
                    ui: {
                      component: 'textarea',
                    },
                  },
                  {
                    type: 'string',
                    name: 'image',
                    label: 'Foto',
                  },
                ],
              },
            ],
          },
          
          // --- FAQs ---
          {
            type: 'object',
            name: 'faqsSection',
            label: 'Preguntas Frecuentes',
            fields: [
              {
                type: 'boolean',
                name: 'enabled',
                label: 'Mostrar FAQs',
              },
              {
                type: 'string',
                name: 'title',
                label: 'Título de la Sección',
              },
              {
                type: 'object',
                name: 'items',
                label: 'Preguntas',
                list: true,
                fields: [
                  {
                    type: 'string',
                    name: 'question',
                    label: 'Pregunta',
                  },
                  {
                    type: 'string',
                    name: 'answer',
                    label: 'Respuesta',
                    ui: {
                      component: 'textarea',
                    },
                  },
                ],
              },
            ],
          },
          
          // --- CTA Final ---
          {
            type: 'object',
            name: 'ctaSection',
            label: 'Sección CTA Final',
            fields: [
              {
                type: 'string',
                name: 'title',
                label: 'Título',
              },
              {
                type: 'string',
                name: 'description',
                label: 'Descripción',
              },
              {
                type: 'string',
                name: 'buttonText',
                label: 'Texto del Botón',
              },
              {
                type: 'string',
                name: 'buttonLink',
                label: 'Enlace del Botón',
              },
              {
                type: 'string',
                name: 'backgroundImage',
                label: 'Imagen de Fondo',
              },
            ],
          },
          
          // --- Contenido Principal ---
          {
            type: 'rich-text',
            name: 'body',
            label: 'Contenido Detallado',
            isBody: true,
          },
        ],
      },
    ],
  },
});
