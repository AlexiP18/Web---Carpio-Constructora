import { defineConfig } from 'tinacms';
import { ImagePreviewField, ImageGalleryField } from './fields/cloudinary-fields';
import { pageBlockTemplates } from './fields/page-blocks';

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

// Categorías de proyectos
const projectCategories = [
  { value: 'conjunto-habitacional', label: 'Conjunto Habitacional' },
  { value: 'diseno-residencial', label: 'Diseño Residencial' },
  { value: 'diseno-retail', label: 'Diseño Retail' },
  { value: 'edificio-comercial', label: 'Edificio Comercial' },
  { value: 'proyecto-mixto', label: 'Proyecto Mixto' },
];

// Categorías de servicios
const serviceCategories = [
  { value: 'construccion', label: 'Construcción' },
  { value: 'diseno-arquitectonico', label: 'Diseño Arquitectónico' },
  { value: 'remodelacion', label: 'Remodelación' },
  { value: 'consultoria', label: 'Consultoría' },
  { value: 'gestion-proyectos', label: 'Gestión de Proyectos' },
];

// Helper para generar URL de Cloudinary
const cloudinaryBaseUrl = 'https://res.cloudinary.com/dt5y4fsst';
const cloudinaryUploadPath = `${cloudinaryBaseUrl}/image/upload`;
const cloudinaryVideoPath = `${cloudinaryBaseUrl}/video/upload`;

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
          {
            type: 'string',
            name: 'category',
            label: 'Categoría del Proyecto',
            description: 'Selecciona la categoría principal del proyecto',
            options: projectCategories,
            required: true,
          },
          
          // --- Imágenes (compatibles con Cloudinary y locales) ---
          {
            type: 'string',
            name: 'backgroundImage',
            label: 'Imagen Principal (Hero)',
            description: `Sube la imagen a Cloudinary y pega la URL aquí`,
            ui: {
              // @ts-ignore - Custom component
              component: ImagePreviewField,
            },
          },
          {
            type: 'string',
            name: 'images',
            label: 'Galería de Imágenes',
            description: 'URLs de imágenes de Cloudinary',
            list: true,
            ui: {
              // @ts-ignore - Custom component
              component: ImageGalleryField,
            },
          },
          {
            type: 'string',
            name: 'virtualTourVideo',
            label: 'Video Tour Virtual',
            description: `URL de video de Cloudinary`,
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
              // Estructura para specs con enabled/value/label
              {
                type: 'object',
                name: 'bedrooms',
                label: 'Dormitorios',
                fields: [
                  { type: 'boolean', name: 'enabled', label: 'Habilitado' },
                  { type: 'number', name: 'value', label: 'Cantidad' },
                  { type: 'string', name: 'label', label: 'Etiqueta' },
                  { type: 'string', name: 'sublabel', label: 'Subetiqueta' },
                ],
              },
              {
                type: 'object',
                name: 'bathrooms',
                label: 'Baños',
                fields: [
                  { type: 'boolean', name: 'enabled', label: 'Habilitado' },
                  { type: 'number', name: 'value', label: 'Cantidad' },
                  { type: 'string', name: 'label', label: 'Etiqueta' },
                  { type: 'string', name: 'sublabel', label: 'Subetiqueta' },
                ],
              },
              {
                type: 'object',
                name: 'area',
                label: 'Área',
                fields: [
                  { type: 'boolean', name: 'enabled', label: 'Habilitado' },
                  { type: 'number', name: 'value', label: 'Valor (m²)' },
                  { type: 'string', name: 'label', label: 'Etiqueta' },
                  { type: 'string', name: 'sublabel', label: 'Subetiqueta' },
                ],
              },
              {
                type: 'object',
                name: 'garden',
                label: 'Jardín',
                fields: [
                  { type: 'boolean', name: 'enabled', label: 'Habilitado' },
                  { type: 'boolean', name: 'value', label: 'Tiene Jardín' },
                  { type: 'string', name: 'label', label: 'Etiqueta' },
                  { type: 'string', name: 'sublabel', label: 'Subetiqueta' },
                ],
              },
              {
                type: 'object',
                name: 'petFriendly',
                label: 'Pet Friendly',
                fields: [
                  { type: 'boolean', name: 'enabled', label: 'Habilitado' },
                  { type: 'boolean', name: 'value', label: 'Permite Mascotas' },
                  { type: 'string', name: 'label', label: 'Etiqueta' },
                  { type: 'string', name: 'sublabel', label: 'Subetiqueta' },
                ],
              },
              {
                type: 'object',
                name: 'deliveryDate',
                label: 'Fecha de Entrega',
                fields: [
                  { type: 'boolean', name: 'enabled', label: 'Habilitado' },
                  { type: 'string', name: 'value', label: 'Fecha/Estado' },
                  { type: 'string', name: 'label', label: 'Etiqueta' },
                ],
              },
              {
                type: 'object',
                name: 'customSpecs',
                label: 'Especificaciones Personalizadas',
                list: true,
                fields: [
                  { type: 'boolean', name: 'enabled', label: 'Habilitado' },
                  { type: 'string', name: 'icon', label: 'Icono (ej: ph:car)' },
                  { type: 'string', name: 'label', label: 'Etiqueta' },
                  { type: 'string', name: 'value', label: 'Valor' },
                  { type: 'string', name: 'sublabel', label: 'Subetiqueta' },
                  { 
                    type: 'string', 
                    name: 'colorScheme', 
                    label: 'Color',
                    options: ['primary', 'secondary', 'accent'],
                  },
                ],
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
          {
            type: 'string',
            name: 'category',
            label: 'Categoría del Servicio',
            description: 'Selecciona la categoría principal',
            options: serviceCategories,
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
                description: `Sube a Cloudinary y pega la URL`,
                ui: {
                  // @ts-ignore - Custom component
                  component: ImagePreviewField,
                },
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
            description: `URLs de Cloudinary`,
            ui: {
              // @ts-ignore - Custom component
              component: ImageGalleryField,
            },
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
      
      // ==========================================
      // COLECCIÓN: CATEGORÍAS DE PROYECTOS
      // ==========================================
      {
        name: 'categoriasProyectos',
        label: 'Categorías de Proyectos',
        path: 'src/content/categorias-proyectos',
        format: 'json',
        ui: {
          allowedActions: {
            create: true,
            delete: true,
          },
        },
        fields: [
          {
            type: 'string',
            name: 'name',
            label: 'Nombre de la Categoría',
            required: true,
          },
          {
            type: 'string',
            name: 'slug',
            label: 'Slug (identificador)',
            description: 'Ej: conjunto-habitacional, diseno-retail',
            required: true,
          },
          {
            type: 'string',
            name: 'description',
            label: 'Descripción',
            ui: {
              component: 'textarea',
            },
          },
          {
            type: 'string',
            name: 'icon',
            label: 'Icono',
            description: 'Nombre del icono para esta categoría',
          },
          {
            type: 'string',
            name: 'image',
            label: 'Imagen de la Categoría',
            description: 'URL de Cloudinary para imagen representativa',
          },
          {
            type: 'number',
            name: 'order',
            label: 'Orden de Visualización',
            description: 'Número para ordenar las categorías (menor = primero)',
          },
          {
            type: 'string',
            name: 'cloudinaryFolder',
            label: 'Carpeta en Cloudinary',
            description: 'Ruta de la carpeta para nuevos proyectos de esta categoría. Ej: constructora-carpio/proyectos/conjunto-habitacional',
          },
        ],
      },
      
      // ==========================================
      // COLECCIÓN: CATEGORÍAS DE SERVICIOS
      // ==========================================
      {
        name: 'categoriasServicios',
        label: 'Categorías de Servicios',
        path: 'src/content/categorias-servicios',
        format: 'json',
        fields: [
          {
            type: 'string',
            name: 'name',
            label: 'Nombre de la Categoría',
            required: true,
          },
          {
            type: 'string',
            name: 'slug',
            label: 'Slug (identificador)',
            required: true,
          },
          {
            type: 'string',
            name: 'description',
            label: 'Descripción',
            ui: {
              component: 'textarea',
            },
          },
          {
            type: 'string',
            name: 'icon',
            label: 'Icono',
          },
          {
            type: 'string',
            name: 'image',
            label: 'Imagen de la Categoría',
          },
          {
            type: 'number',
            name: 'order',
            label: 'Orden de Visualización',
          },
          {
            type: 'string',
            name: 'cloudinaryFolder',
            label: 'Carpeta en Cloudinary',
            description: 'Ej: constructora-carpio/servicios/construccion',
          },
        ],
      },
      
      // ==========================================
      // COLECCIÓN: CONFIGURACIÓN DE CLOUDINARY
      // ==========================================
      {
        name: 'cloudinaryConfig',
        label: 'Configuración Cloudinary',
        path: 'src/content/config',
        format: 'json',
        match: {
          include: 'cloudinary',
        },
        ui: {
          allowedActions: {
            create: false,
            delete: false,
          },
          global: true,
        },
        fields: [
          {
            type: 'string',
            name: 'cloudName',
            label: 'Cloud Name',
            description: 'Tu cloud name de Cloudinary (ej: dt5y4fsst)',
          },
          {
            type: 'string',
            name: 'baseFolder',
            label: 'Carpeta Base',
            description: 'Carpeta raíz para todos los assets (ej: constructora-carpio)',
          },
          {
            type: 'object',
            name: 'defaultTransformations',
            label: 'Transformaciones por Defecto',
            fields: [
              {
                type: 'number',
                name: 'imageWidth',
                label: 'Ancho de Imágenes',
                description: 'Ancho máximo para imágenes (ej: 1200)',
              },
              {
                type: 'string',
                name: 'imageQuality',
                label: 'Calidad de Imagen',
                options: ['auto', 'auto:low', 'auto:eco', 'auto:good', 'auto:best'],
              },
              {
                type: 'string',
                name: 'imageFormat',
                label: 'Formato de Imagen',
                options: ['auto', 'webp', 'avif', 'jpg', 'png'],
              },
            ],
          },
          {
            type: 'object',
            name: 'folders',
            label: 'Estructura de Carpetas',
            fields: [
              {
                type: 'string',
                name: 'proyectos',
                label: 'Carpeta de Proyectos',
                description: 'Ej: constructora-carpio/proyectos',
              },
              {
                type: 'string',
                name: 'servicios',
                label: 'Carpeta de Servicios',
                description: 'Ej: constructora-carpio/servicios',
              },
              {
                type: 'string',
                name: 'general',
                label: 'Carpeta General',
                description: 'Ej: constructora-carpio/general',
              },
            ],
          },
        ],
      },
      
      // ==========================================
      // COLECCIÓN DE PRUEBA (TEMPORAL)
      // ==========================================
      {
        name: 'paginasPrueba',
        label: 'Páginas Prueba',
        path: 'src/content/paginas-test',
        format: 'json',
        fields: [
          {
            type: 'string',
            name: 'title',
            label: 'Título',
          },
          {
            type: 'string',
            name: 'content',
            label: 'Contenido',
          },
        ],
      },
      
      // ==========================================
      // COLECCIÓN: PÁGINAS DEL SITIO
      // ==========================================
      {
        name: 'paginas',
        label: 'Páginas del Sitio',
        path: 'src/content/paginas',
        format: 'json',
        ui: {
          allowedActions: {
            create: true,
            delete: false,
          },
          filename: {
            readonly: true,
            slugify: (values) => values?.slug || values?.title?.toLowerCase().replace(/\s+/g, '-') || '',
          },
        },
        fields: [
          {
            type: 'string',
            name: 'title',
            label: 'Título de la Página',
          },
          {
            type: 'string',
            name: 'slug',
            label: 'Slug (URL)',
          },
          {
            type: 'boolean',
            name: 'published',
            label: 'Publicada',
          },
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
                ui: { component: 'textarea' },
              },
              {
                type: 'string',
                name: 'ogImage',
                label: 'Imagen OG',
              },
            ],
          },
          {
            type: 'object',
            name: 'sections',
            label: 'Secciones',
            list: true,
            templates: pageBlockTemplates,
          },
        ],
      },
      
      // ==========================================
      // COLECCIÓN: CONFIGURACIÓN GLOBAL
      // ==========================================
      {
        name: 'configuracionGlobal',
        label: 'Configuración Global',
        path: 'src/content/config',
        format: 'json',
        ui: {
          allowedActions: {
            create: false,
            delete: false,
          },
          global: true,
        },
        match: {
          include: 'global',
        },
        fields: [
          // --- Información de la Empresa ---
          {
            type: 'object',
            name: 'company',
            label: 'Información de la Empresa',
            fields: [
              {
                type: 'string',
                name: 'name',
                label: 'Nombre de la Empresa',
              },
              {
                type: 'string',
                name: 'slogan',
                label: 'Eslogan',
              },
              {
                type: 'string',
                name: 'logo',
                label: 'Logo',
                ui: {
                  // @ts-ignore
                  component: ImagePreviewField,
                },
              },
              {
                type: 'string',
                name: 'logoWhite',
                label: 'Logo Blanco (para fondos oscuros)',
                ui: {
                  // @ts-ignore
                  component: ImagePreviewField,
                },
              },
              {
                type: 'string',
                name: 'favicon',
                label: 'Favicon',
              },
            ],
          },
          
          // --- Contacto ---
          {
            type: 'object',
            name: 'contact',
            label: 'Información de Contacto',
            fields: [
              {
                type: 'string',
                name: 'phone',
                label: 'Teléfono Principal',
              },
              {
                type: 'string',
                name: 'whatsapp',
                label: 'WhatsApp',
              },
              {
                type: 'string',
                name: 'email',
                label: 'Email Principal',
              },
              {
                type: 'string',
                name: 'address',
                label: 'Dirección',
                ui: { component: 'textarea' },
              },
              {
                type: 'string',
                name: 'hours',
                label: 'Horario de Atención',
              },
            ],
          },
          
          // --- Redes Sociales ---
          {
            type: 'object',
            name: 'social',
            label: 'Redes Sociales',
            fields: [
              {
                type: 'string',
                name: 'facebook',
                label: 'Facebook URL',
              },
              {
                type: 'string',
                name: 'instagram',
                label: 'Instagram URL',
              },
              {
                type: 'string',
                name: 'linkedin',
                label: 'LinkedIn URL',
              },
              {
                type: 'string',
                name: 'youtube',
                label: 'YouTube URL',
              },
              {
                type: 'string',
                name: 'tiktok',
                label: 'TikTok URL',
              },
            ],
          },
          
          // --- Header ---
          {
            type: 'object',
            name: 'header',
            label: 'Configuración del Header',
            fields: [
              {
                type: 'boolean',
                name: 'sticky',
                label: 'Header Sticky (fijo al hacer scroll)',
              },
              {
                type: 'boolean',
                name: 'transparent',
                label: 'Header Transparente en Hero',
              },
              {
                type: 'object',
                name: 'navigation',
                label: 'Menú de Navegación',
                list: true,
                fields: [
                  {
                    type: 'string',
                    name: 'label',
                    label: 'Texto del Enlace',
                  },
                  {
                    type: 'string',
                    name: 'href',
                    label: 'URL',
                  },
                  {
                    type: 'object',
                    name: 'children',
                    label: 'Submenú',
                    list: true,
                    fields: [
                      {
                        type: 'string',
                        name: 'label',
                        label: 'Texto',
                      },
                      {
                        type: 'string',
                        name: 'href',
                        label: 'URL',
                      },
                    ],
                  },
                ],
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
          
          // --- Footer ---
          {
            type: 'object',
            name: 'footer',
            label: 'Configuración del Footer',
            fields: [
              {
                type: 'string',
                name: 'copyright',
                label: 'Texto de Copyright',
              },
              {
                type: 'boolean',
                name: 'showNewsletter',
                label: 'Mostrar Newsletter',
              },
              {
                type: 'string',
                name: 'newsletterTitle',
                label: 'Título del Newsletter',
              },
              {
                type: 'object',
                name: 'columns',
                label: 'Columnas del Footer',
                list: true,
                fields: [
                  {
                    type: 'string',
                    name: 'title',
                    label: 'Título de la Columna',
                  },
                  {
                    type: 'object',
                    name: 'links',
                    label: 'Enlaces',
                    list: true,
                    fields: [
                      {
                        type: 'string',
                        name: 'label',
                        label: 'Texto',
                      },
                      {
                        type: 'string',
                        name: 'href',
                        label: 'URL',
                      },
                    ],
                  },
                ],
              },
            ],
          },
        ],
      },
    ],
  },
});
