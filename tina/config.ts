import { defineConfig } from 'tinacms';
import { ImagePreviewField, ImageGalleryField } from './fields/cloudinary-fields';
import { pageBlockTemplates } from './fields/page-blocks';
import { ColorPickerField } from './fields/color-field';
import { PhoneField, EmailField, BusinessHoursField } from './fields/contact-fields';
import { SocialIconSelector } from './fields/social-icon-selector';
import { MapEmbedField } from './fields/map-embed-field';

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

// ============================================
// HELPERS Y CAMPOS COMPARTIDOS
// ============================================

const seoField = {
  type: 'object',
  name: 'seo',
  label: 'SEO / Metadatos',
  fields: [
    { type: 'string', name: 'metaTitle', label: 'Meta Título' },
    { type: 'string', name: 'metaDescription', label: 'Meta Descripción', ui: { component: 'textarea' } },
    { type: 'string', name: 'ogImage', label: 'Imagen OG' },
  ],
};

const backgroundFields: any[] = [
  { type: 'image', name: 'backgroundImage', label: 'Imagen de Fondo' },
  { type: 'string', name: 'backgroundColor', label: 'Color de Fondo', description: 'Color Hex o clase CSS (ej: #ffffff o bg-gray-50)' },
  { type: 'number', name: 'backgroundOpacity', label: 'Opacidad del Fondo (%)', description: '0 (transparente) a 100 (opaco)' },
  { type: 'boolean', name: 'backgroundOverlay', label: 'Habilitar Overlay de Fondo' },
];

// ============================================
// PLANTILLAS DE SECCIONES ESPECÍFICAS
// ============================================

// --- INICIO ---
const inicioHeroTemplate = {
  name: 'hero',
  label: 'Sección Hero Carrusel',
  fields: [
    { type: 'string', name: 'title', label: 'Título' },
    { type: 'string', name: 'subtitle', label: 'Subtítulo', ui: { component: 'textarea' } },
    {
      type: 'string',
      name: 'sliderImages',
      label: 'Galería de imágenes para carrusel (máximo 6)',
      list: true,
      validate: (value: any) => {
        if (value && value.length > 6) {
          return 'Máximo 6 imágenes permitidas';
        }
      }
    },
    { type: 'boolean', name: 'showProjectsButton', label: 'Habilitar botón "Ver Proyectos"' },
    { type: 'boolean', name: 'showServicesButton', label: 'Habilitar botón "Ver Servicios"' },
    { type: 'string', name: 'ctaText', label: 'Texto botón proyectos' },
    { type: 'string', name: 'ctaLink', label: 'Enlace botón proyectos' },
    { type: 'string', name: 'secondaryCtaText', label: 'Texto botón servicios' },
    { type: 'string', name: 'secondaryCtaLink', label: 'Enlace botón servicios' },
    { type: 'boolean', name: 'overlay', label: 'Mostrar overlay oscuro' },
  ]
};

const inicioProjectsTemplate = {
  name: 'projects',
  label: 'Sección Nuestros Proyectos',
  fields: [
    { type: 'string', name: 'title', label: 'Título de la Sección' },
    { type: 'string', name: 'subtitle', label: 'Subtítulo' },
    {
      type: 'reference',
      name: 'selectedProjects',
      label: 'Selección de proyectos a mostrar en las columnas',
      list: true,
      collections: ['proyectos']
    }
  ]
};

const inicioContactTemplate = {
  name: 'contact',
  label: 'Sección Contacto',
  fields: [
    { type: 'string', name: 'title', label: 'Título' },
    { type: 'string', name: 'subtitle', label: 'Subtítulo' },
    { type: 'boolean', name: 'showEmailCard', label: 'Habilitar card de correo electrónico' },
    { type: 'boolean', name: 'showSocialsCard', label: 'Habilitar card de redes sociales' },
    { type: 'boolean', name: 'showLocationCard', label: 'Habilitar card de ubicación' },
    { type: 'boolean', name: 'showForm', label: 'Mostrar formulario de contacto' },
    { type: 'boolean', name: 'showMap', label: 'Mostrar mapa de ubicación' },
  ]
};
// Extraer plantillas genéricas existentes para compatibilidad
const testimonialsSectionTemplate = pageBlockTemplates[4];
const ctaSectionTemplate = pageBlockTemplates[5];
const teamSectionTemplate = pageBlockTemplates[7];
const faqSectionTemplate = pageBlockTemplates[8];

// --- NOSOTROS ---
const nosotrosHeroTemplate = {
  name: 'hero',
  label: 'Sección HERO',
  fields: [
    { type: 'string', name: 'title', label: 'Título' },
    { type: 'string', name: 'subtitle', label: 'Subtítulo' },
    { type: 'string', name: 'chips', label: 'Chips / Etiquetas', list: true },
    ...backgroundFields,
    { type: 'boolean', name: 'overlay', label: 'Mostrar overlay oscuro' }
  ]
};

const nosotrosEmpresaTemplate = {
  name: 'about',
  label: 'Sección Nuestra Empresa',
  fields: [
    { type: 'string', name: 'title', label: 'Título' },
    { type: 'string', name: 'subtitle', label: 'Subtítulo' },
    { type: 'string', name: 'content', label: 'Descripción', ui: { component: 'textarea' } },
    { type: 'string', name: 'mision', label: 'Misión', ui: { component: 'textarea' } },
    { type: 'string', name: 'vision', label: 'Visión', ui: { component: 'textarea' } },
    {
      type: 'object',
      name: 'valores',
      label: 'Valores',
      list: true,
      fields: [
        { type: 'string', name: 'title', label: 'Título' },
        { type: 'string', name: 'description', label: 'Descripción', ui: { component: 'textarea' } },
        { type: 'string', name: 'icon', label: 'Icono (Lucide o clase)' }
      ]
    },
    { type: 'string', name: 'whyChooseUs', label: '¿Por qué elegirnos?', ui: { component: 'textarea' } },
    { type: 'image', name: 'image', label: 'Imagen' },
    { type: 'string', name: 'icon', label: 'Icono principal' },
    { type: 'string', name: 'slogan', label: 'Eslogan' },
    { type: 'boolean', name: 'showStats', label: 'Habilitar Botones / Estadísticas' },
    {
      type: 'object',
      name: 'stats',
      label: 'Estadísticas',
      list: true,
      fields: [
        { type: 'string', name: 'value', label: 'Valor (ej: +20)' },
        { type: 'string', name: 'label', label: 'Etiqueta (ej: Proyectos)' }
      ]
    }
  ]
};

// --- SERVICIOS ---
const serviciosHeroTemplate = {
  name: 'hero',
  label: 'Sección HERO',
  fields: [
    { type: 'string', name: 'title', label: 'Título' },
    { type: 'string', name: 'subtitle', label: 'Descripción' },
    { type: 'string', name: 'chips', label: 'Chips de servicios (información)', list: true },
    ...backgroundFields,
    { type: 'boolean', name: 'overlay', label: 'Mostrar overlay oscuro' }
  ]
};

const serviciosWhyChooseUsTemplate = {
  name: 'features',
  label: 'Sección ¿Por qué elegirnos?',
  fields: [
    { type: 'string', name: 'title', label: 'Título' },
    { type: 'string', name: 'subtitle', label: 'Descripción', ui: { component: 'textarea' } },
    {
      type: 'object',
      name: 'items',
      label: 'Chips de Información',
      list: true,
      fields: [
        { type: 'string', name: 'title', label: 'Título' },
        { type: 'string', name: 'description', label: 'Descripción', ui: { component: 'textarea' } },
        { type: 'string', name: 'icon', label: 'Icono' }
      ]
    },
    { type: 'image', name: 'images', label: 'Imágenes', list: true },
    { type: 'number', name: 'opacity', label: 'Opacidad de Imágenes (%)' }
  ]
};

const serviciosPreguntasTemplate = {
  name: 'faq',
  label: 'Sección Preguntas (FAQ)',
  fields: [
    { type: 'string', name: 'title', label: 'Título' },
    { type: 'string', name: 'subtitle', label: 'Descripción' },
    {
      type: 'object',
      name: 'items',
      label: 'Preguntas y Respuestas',
      list: true,
      fields: [
        { type: 'string', name: 'question', label: 'Pregunta' },
        { type: 'string', name: 'answer', label: 'Respuesta', ui: { component: 'textarea' } }
      ]
    },
    {
      type: 'object',
      name: 'contactCard',
      label: 'Tarjeta de Contacto',
      fields: [
        { type: 'boolean', name: 'enabled', label: 'Habilitar Tarjeta' },
        { type: 'string', name: 'title', label: 'Título' },
        { type: 'string', name: 'description', label: 'Descripción', ui: { component: 'textarea' } },
        { type: 'string', name: 'buttonText', label: 'Texto del Botón' },
        { type: 'string', name: 'buttonLink', label: 'Enlace del Botón' }
      ]
    }
  ]
};

// --- TODOS LOS SERVICIOS ---
const todosServiciosHeroTemplate = {
  name: 'hero',
  label: 'Sección HERO',
  fields: [
    { type: 'string', name: 'titleNormal', label: 'Título Normal' },
    { type: 'string', name: 'titleHighlight', label: 'Título con Énfasis' },
    { type: 'string', name: 'description', label: 'Descripción', ui: { component: 'textarea' } },
    ...backgroundFields,
    { type: 'boolean', name: 'overlay', label: 'Mostrar overlay oscuro' }
  ]
};

// --- PROYECTOS ---
const proyectosHeroTemplate = {
  name: 'hero',
  label: 'Sección HERO / Carrusel',
  fields: [
    {
      type: 'reference',
      name: 'selectedProjects',
      label: 'Seleccionar proyectos para el carrusel',
      list: true,
      collections: ['proyectos']
    }
  ]
};

const proyectosVigenteTemplate = {
  name: 'proyectoVigente',
  label: 'Sección Proyecto Vigente',
  fields: [
    { type: 'string', name: 'title', label: 'Título' },
    { type: 'string', name: 'description', label: 'Descripción', ui: { component: 'textarea' } },
    ...backgroundFields,
    { type: 'boolean', name: 'overlay', label: 'Mostrar overlay oscuro' },
    {
      type: 'reference',
      name: 'selectedProject',
      label: 'Selección de Proyecto',
      collections: ['proyectos']
    }
  ]
};

// --- TODOS LOS PROYECTOS ---
const todosProyectosHeroTemplate = {
  name: 'hero',
  label: 'Sección HERO',
  fields: [
    { type: 'string', name: 'titleNormal', label: 'Título Normal' },
    { type: 'string', name: 'titleHighlight', label: 'Título con Énfasis' },
    { type: 'string', name: 'description', label: 'Descripción', ui: { component: 'textarea' } },
    ...backgroundFields,
    { type: 'boolean', name: 'overlay', label: 'Mostrar overlay oscuro' }
  ]
};

// --- CONTACTO ---
const contactoHeroTemplate = {
  name: 'hero',
  label: 'Sección HERO',
  fields: [
    { type: 'string', name: 'title', label: 'Título' },
    { type: 'string', name: 'subtitle', label: 'Descripción', ui: { component: 'textarea' } },
    {
      type: 'object',
      name: 'cards',
      label: 'Cards Informativos',
      list: true,
      fields: [
        { type: 'string', name: 'title', label: 'Título' },
        { type: 'string', name: 'description', label: 'Descripción', ui: { component: 'textarea' } },
        { type: 'string', name: 'icon', label: 'Icono' }
      ]
    },
    {
      type: 'object',
      name: 'buttons',
      label: 'Botones de Contacto',
      list: true,
      fields: [
        { type: 'string', name: 'title', label: 'Título del Botón' },
        { type: 'string', name: 'icon', label: 'Icono (Lucide)' },
        { type: 'string', name: 'link', label: 'Enlace' }
      ]
    },
    ...backgroundFields,
    { type: 'boolean', name: 'overlay', label: 'Mostrar overlay oscuro' }
  ]
};

const contactoCardsTemplate = {
  name: 'cardsContacto',
  label: 'Sección de Cards de Contacto',
  fields: [
    {
      type: 'object',
      name: 'items',
      label: 'Tarjetas de Contacto',
      list: true,
      fields: [
        { type: 'string', name: 'icon', label: 'Icono' },
        { type: 'string', name: 'title', label: 'Título' },
        { type: 'string', name: 'description', label: 'Descripción', ui: { component: 'textarea' } }
      ]
    }
  ]
};

const contactoInformacionTemplate = {
  name: 'contact',
  label: 'Sección de Información de Contacto',
  fields: [
    { type: 'string', name: 'title', label: 'Título' },
    { type: 'string', name: 'subtitle', label: 'Subtítulo' },
    { type: 'boolean', name: 'showEmailCard', label: 'Habilitar card de correo electrónico' },
    { type: 'boolean', name: 'showSocialsCard', label: 'Habilitar card de redes sociales' },
    { type: 'boolean', name: 'showLocationCard', label: 'Habilitar card de ubicación' },
    { type: 'boolean', name: 'showForm', label: 'Mostrar formulario de contacto' },
    { type: 'boolean', name: 'showMap', label: 'Mostrar mapa de ubicación' }
  ]
};

export default defineConfig({
  branch: process.env.TINA_BRANCH || 'main',
  clientId: process.env.TINA_PUBLIC_CLIENT_ID,
  token: process.env.TINA_TOKEN,
  build: {
    outputFolder: 'admin',
    publicFolder: 'public',
  },
  // Configuración de Media con Cloudinary
  // Las imágenes se suben directamente a Cloudinary desde TinaCMS
  media: {
    loadCustomStore: async () => {
      const pack = await import('next-tinacms-cloudinary');
      return pack.TinaCloudCloudinaryMediaStore;
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
        path: 'src/content/servicios',
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
            name: 'subtitle',
            label: 'Subtítulo',
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
            name: 'backgroundImage',
            label: 'Imagen Principal (Hero)',
            ui: {
              // @ts-ignore
              component: ImagePreviewField,
            },
          },
          {
            type: 'object',
            name: 'service',
            label: 'Detalles y Secciones del Servicio',
            fields: [
              {
                type: 'string',
                name: 'name',
                label: 'Nombre completo (ej: Servicio de Construcción)',
              },
              {
                type: 'string',
                name: 'category',
                label: 'Categoría',
                options: serviceCategories,
              },
              {
                type: 'string',
                name: 'tagline',
                label: 'Tagline (ej: CALIDAD)',
              },
              {
                type: 'string',
                name: 'icon',
                label: 'Icono del Servicio (opcional)',
              },
              {
                type: 'boolean',
                name: 'showFeatures',
                label: 'Mostrar Sección Características',
              },
              {
                type: 'boolean',
                name: 'showBenefits',
                label: 'Mostrar Sección Beneficios',
              },
              {
                type: 'boolean',
                name: 'showProcess',
                label: 'Mostrar Sección Proceso',
              },
              {
                type: 'boolean',
                name: 'showTestimonials',
                label: 'Mostrar Sección Testimonios',
              },
              {
                type: 'boolean',
                name: 'showFaqs',
                label: 'Mostrar Sección FAQs',
              },
              {
                type: 'boolean',
                name: 'showCta',
                label: 'Mostrar Sección CTA Final',
              },
              {
                type: 'string',
                name: 'featuresTitle',
                label: 'Título de Características',
                ui: {
                  hidden: (props: any) => {
                    const vals = props.tinaForm?.values || props.form?.values || {};
                    return vals.service?.showFeatures === false;
                  }
                },
              },
              {
                type: 'string',
                name: 'featuresDescription',
                label: 'Descripción de las Características',
                ui: { 
                  component: 'textarea',
                  hidden: (props: any) => {
                    const vals = props.tinaForm?.values || props.form?.values || {};
                    return vals.service?.showFeatures === false;
                  }
                },
              },
              {
                type: 'object',
                name: 'features',
                label: 'Lista de Características',
                list: true,
                ui: {
                  hidden: (props: any) => {
                    const vals = props.tinaForm?.values || props.form?.values || {};
                    return vals.service?.showFeatures === false;
                  }
                },
                fields: [
                  { type: 'string', name: 'title', label: 'Título' },
                  { type: 'string', name: 'description', label: 'Descripción' },
                  { type: 'string', name: 'icon', label: 'Icono' },
                ],
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
                type: 'object',
                name: 'ctaButton',
                label: 'Botón CTA',
                fields: [
                  { type: 'string', name: 'text', label: 'Texto del Botón' },
                  { type: 'string', name: 'whatsappNumber', label: 'Número de WhatsApp', description: 'Ej: 593998323304' },
                  { type: 'string', name: 'url', label: 'URL Alternativa' },
                ],
              },
              {
                type: 'object',
                name: 'chips',
                label: 'Chips (Etiquetas Destacadas)',
                list: true,
                fields: [
                  { type: 'string', name: 'title', label: 'Título' },
                  { type: 'string', name: 'description', label: 'Descripción' },
                  { type: 'string', name: 'icon', label: 'Icono' },
                  { type: 'string', name: 'colorScheme', label: 'Color', options: ['primary', 'secondary'] },
                ],
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
            ui: {
              hidden: (props: any) => {
                const vals = props.tinaForm?.values || props.form?.values || {};
                return vals.service?.showBenefits === false;
              }
            },
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
            ui: {
              hidden: (props: any) => {
                const vals = props.tinaForm?.values || props.form?.values || {};
                return vals.service?.showProcess === false;
              }
            },
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
            ui: {
              hidden: (props: any) => {
                const vals = props.tinaForm?.values || props.form?.values || {};
                return vals.service?.showTestimonials === false;
              }
            },
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
            ui: {
              hidden: (props: any) => {
                const vals = props.tinaForm?.values || props.form?.values || {};
                return vals.service?.showFaqs === false;
              }
            },
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
            ui: {
              hidden: (props: any) => {
                const vals = props.tinaForm?.values || props.form?.values || {};
                return vals.service?.showCta === false;
              }
            },
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
      // COLECCIÓN: PÁGINAS DEL SITIO (INDIVIDUALES)
      // ==========================================
      {
        name: 'inicioPage',
        label: 'Página Inicio',
        path: 'src/content/paginas',
        format: 'json',
        match: {
          include: 'inicio',
        },
        ui: {
          allowedActions: { create: false, delete: false },
        },
        fields: [
          { type: 'string', name: 'title', label: 'Título de la Página' },
          { type: 'string', name: 'slug', label: 'Slug' },
          { type: 'boolean', name: 'published', label: 'Publicada' },
          seoField,
          {
            type: 'object',
            name: 'sections',
            label: 'Secciones de la Página',
            list: true,
            templates: [
              inicioHeroTemplate,
              inicioProjectsTemplate,
              inicioContactTemplate
            ]
          }
        ]
      },
      {
        name: 'nosotrosPage',
        label: 'Página Nosotros',
        path: 'src/content/paginas',
        format: 'json',
        match: {
          include: 'nosotros',
        },
        ui: {
          allowedActions: { create: false, delete: false },
        },
        fields: [
          { type: 'string', name: 'title', label: 'Título de la Página' },
          { type: 'string', name: 'slug', label: 'Slug' },
          { type: 'boolean', name: 'published', label: 'Publicada' },
          seoField,
          {
            type: 'object',
            name: 'sections',
            label: 'Secciones de la Página',
            list: true,
            templates: [
              nosotrosHeroTemplate,
              nosotrosEmpresaTemplate,
              teamSectionTemplate,
              testimonialsSectionTemplate,
              ctaSectionTemplate
            ]
          }
        ]
      },
      {
        name: 'serviciosPage',
        label: 'Página Servicios',
        path: 'src/content/paginas',
        format: 'json',
        match: {
          include: 'servicios',
        },
        ui: {
          allowedActions: { create: false, delete: false },
        },
        fields: [
          { type: 'string', name: 'title', label: 'Título de la Página' },
          { type: 'string', name: 'slug', label: 'Slug' },
          { type: 'boolean', name: 'published', label: 'Publicada' },
          seoField,
          {
            type: 'object',
            name: 'sections',
            label: 'Secciones de la Página',
            list: true,
            templates: [
              serviciosHeroTemplate,
              serviciosWhyChooseUsTemplate,
              serviciosPreguntasTemplate
            ]
          }
        ]
      },
      {
        name: 'todosServiciosPage',
        label: 'Página Todos los Servicios',
        path: 'src/content/paginas',
        format: 'json',
        match: {
          include: 'todos-servicios',
        },
        ui: {
          allowedActions: { create: false, delete: false },
        },
        fields: [
          { type: 'string', name: 'title', label: 'Título de la Página' },
          { type: 'string', name: 'slug', label: 'Slug' },
          { type: 'boolean', name: 'published', label: 'Publicada' },
          seoField,
          {
            type: 'object',
            name: 'sections',
            label: 'Secciones de la Página',
            list: true,
            templates: [
              todosServiciosHeroTemplate
            ]
          }
        ]
      },
      {
        name: 'proyectosPage',
        label: 'Página Proyectos',
        path: 'src/content/paginas',
        format: 'json',
        match: {
          include: 'proyectos',
        },
        ui: {
          allowedActions: { create: false, delete: false },
        },
        fields: [
          { type: 'string', name: 'title', label: 'Título de la Página' },
          { type: 'string', name: 'slug', label: 'Slug' },
          { type: 'boolean', name: 'published', label: 'Publicada' },
          seoField,
          {
            type: 'object',
            name: 'sections',
            label: 'Secciones de la Página',
            list: true,
            templates: [
              proyectosHeroTemplate,
              proyectosVigenteTemplate
            ]
          }
        ]
      },
      {
        name: 'todosProyectosPage',
        label: 'Página Todos los Proyectos',
        path: 'src/content/paginas',
        format: 'json',
        match: {
          include: 'todos-proyectos',
        },
        ui: {
          allowedActions: { create: false, delete: false },
        },
        fields: [
          { type: 'string', name: 'title', label: 'Título de la Página' },
          { type: 'string', name: 'slug', label: 'Slug' },
          { type: 'boolean', name: 'published', label: 'Publicada' },
          seoField,
          {
            type: 'object',
            name: 'sections',
            label: 'Secciones de la Página',
            list: true,
            templates: [
              todosProyectosHeroTemplate
            ]
          }
        ]
      },
      {
        name: 'contactoPage',
        label: 'Página Contacto',
        path: 'src/content/paginas',
        format: 'json',
        match: {
          include: 'contacto',
        },
        ui: {
          allowedActions: { create: false, delete: false },
        },
        fields: [
          { type: 'string', name: 'title', label: 'Título de la Página' },
          { type: 'string', name: 'slug', label: 'Slug' },
          { type: 'boolean', name: 'published', label: 'Publicada' },
          seoField,
          {
            type: 'object',
            name: 'sections',
            label: 'Secciones de la Página',
            list: true,
            templates: [
              contactoHeroTemplate,
              contactoCardsTemplate,
              contactoInformacionTemplate
            ]
          }
        ]
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
                type: 'image',
                name: 'logo',
                label: 'Logo Principal',
                description: 'Logo para fondos claros - Se sube a Cloudinary',
              },
              {
                type: 'image',
                name: 'logoWhite',
                label: 'Logo Blanco',
                description: 'Logo para fondos oscuros - Se sube a Cloudinary',
              },
              {
                type: 'image',
                name: 'logoIcon',
                label: 'Logo Icono/Símbolo',
                description: 'Versión pequeña del logo - Se sube a Cloudinary',
              },
              {
                type: 'image',
                name: 'favicon',
                label: 'Favicon',
                description: 'Icono del sitio - Se sube a Cloudinary',
              },
            ],
          },

          // --- Colores Institucionales ---
          {
            type: 'object',
            name: 'colors',
            label: 'Colores Institucionales',
            description: 'Colores principales de la marca',
            fields: [
              {
                type: 'string',
                name: 'primary',
                label: 'Color Primario',
                description: 'Color principal de la marca',
                ui: {
                  component: ColorPickerField,
                },
              },
              {
                type: 'string',
                name: 'secondary',
                label: 'Color Secundario',
                description: 'Color secundario de la marca',
                ui: {
                  component: ColorPickerField,
                },
              },
              {
                type: 'string',
                name: 'accent',
                label: 'Color de Acento',
                description: 'Color para destacar elementos',
                ui: {
                  component: ColorPickerField,
                },
              },
              {
                type: 'string',
                name: 'background',
                label: 'Color de Fondo',
                description: 'Color de fondo principal',
                ui: {
                  component: ColorPickerField,
                },
              },
              {
                type: 'string',
                name: 'text',
                label: 'Color de Texto',
                description: 'Color de texto principal',
                ui: {
                  component: ColorPickerField,
                },
              },
            ],
          },
          
          // --- Contacto ---
          {
            type: 'object',
            name: 'contact',
            label: 'Información de Contacto General',
            fields: [
              {
                type: 'string',
                name: 'phone',
                label: 'Teléfono Principal',
                description: 'Número de teléfono con prefijo +593 (Ecuador)',
                ui: {
                  component: PhoneField,
                },
              },
              {
                type: 'string',
                name: 'phoneSecondary',
                label: 'Teléfono Secundario',
                description: 'Número de teléfono adicional',
                ui: {
                  component: PhoneField,
                },
              },
              {
                type: 'string',
                name: 'whatsapp',
                label: 'WhatsApp',
                description: 'Número de WhatsApp para contacto directo',
                ui: {
                  component: PhoneField,
                },
              },
              {
                type: 'string',
                name: 'email',
                label: 'Email Principal',
                description: 'Correo electrónico de contacto',
                ui: {
                  component: EmailField,
                },
              },
              {
                type: 'string',
                name: 'emailSecondary',
                label: 'Email Secundario',
                description: 'Correo electrónico adicional',
                ui: {
                  component: EmailField,
                },
              },
              {
                type: 'string',
                name: 'hours',
                label: 'Horario de Atención',
                description: 'Días y horas de atención al público',
                ui: {
                  component: BusinessHoursField,
                },
              },
            ],
          },

          // --- Agentes Inmobiliarios ---
          {
            type: 'object',
            name: 'agents',
            label: 'Agentes Inmobiliarios',
            list: true,
            ui: {
              itemProps: (item) => ({
                label: item?.name || 'Agente',
              }),
            },
            fields: [
              { type: 'string', name: 'name', label: 'Nombre del Agente' },
              { type: 'string', name: 'phone', label: 'Teléfono Principal', ui: { component: PhoneField } },
              { type: 'string', name: 'phoneSecondary', label: 'Teléfono Secundario', ui: { component: PhoneField } },
              { type: 'string', name: 'whatsapp', label: 'WhatsApp', ui: { component: PhoneField } },
              { type: 'string', name: 'email', label: 'Email Principal', ui: { component: EmailField } },
              { type: 'string', name: 'emailSecondary', label: 'Email Secundario', ui: { component: EmailField } },
              { type: 'string', name: 'hours', label: 'Horarios de Atención', ui: { component: BusinessHoursField } },
            ],
          },

          // --- Ubicaciones (Principal y Oficinas) ---
          {
            type: 'object',
            name: 'locations',
            label: 'Ubicaciones',
            fields: [
              {
                type: 'object',
                name: 'main',
                label: 'Ubicación Principal (Oficina Central)',
                fields: [
                  { type: 'string', name: 'name', label: 'Nombre de la Ubicación' },
                  { type: 'string', name: 'address', label: 'Dirección Completa', ui: { component: 'textarea' } },
                  { type: 'string', name: 'city', label: 'Ciudad' },
                  { type: 'string', name: 'province', label: 'Provincia/Estado' },
                  { type: 'string', name: 'country', label: 'País' },
                  { type: 'string', name: 'postalCode', label: 'Código Postal' },
                  { type: 'string', name: 'phone', label: 'Teléfono de esta ubicación' },
                  { type: 'string', name: 'email', label: 'Email de esta ubicación' },
                  { type: 'string', name: 'mapUrl', label: 'URL de Google Maps' },
                  { type: 'string', name: 'mapEmbed', label: 'Código Embed de Google Maps', ui: { component: MapEmbedField } },
                  { type: 'number', name: 'lat', label: 'Latitud', description: 'Se extrae automáticamente del embed', ui: { component: 'hidden' } },
                  { type: 'number', name: 'lng', label: 'Longitud', description: 'Se extrae automáticamente del embed', ui: { component: 'hidden' } },
                ],
              },
              {
                type: 'object',
                name: 'offices',
                label: 'Otras Oficinas/Sucursales',
                list: true,
                fields: [
                  { type: 'string', name: 'name', label: 'Nombre de la Oficina' },
                  { type: 'string', name: 'address', label: 'Dirección Completa', ui: { component: 'textarea' } },
                  { type: 'string', name: 'city', label: 'Ciudad' },
                  { type: 'string', name: 'province', label: 'Provincia/Estado' },
                  { type: 'string', name: 'phone', label: 'Teléfono' },
                  { type: 'string', name: 'email', label: 'Email' },
                  { type: 'string', name: 'hours', label: 'Horario de Atención' },
                  { type: 'string', name: 'mapUrl', label: 'URL de Google Maps' },
                  { type: 'string', name: 'mapEmbed', label: 'Código Embed de Google Maps', ui: { component: MapEmbedField } },
                  { type: 'number', name: 'lat', label: 'Latitud', description: 'Se extrae automáticamente del embed', ui: { component: 'hidden' } },
                  { type: 'number', name: 'lng', label: 'Longitud', description: 'Se extrae automáticamente del embed', ui: { component: 'hidden' } },
                  { type: 'number', name: 'order', label: 'Orden de visualización' },
                ],
              },
            ],
          },
          
          // --- Redes Sociales (Dinámicas) ---
          {
            type: 'object',
            name: 'socialNetworks',
            label: 'Redes Sociales',
            list: true,
            ui: {
              itemProps: (item) => ({
                label: item?.name || 'Nueva Red Social',
              }),
            },
            fields: [
              {
                type: 'string',
                name: 'name',
                label: 'Nombre de la Red',
                description: 'Ej: Facebook, Instagram, TikTok, X (Twitter)',
              },
              {
                type: 'string',
                name: 'icon',
                label: 'Icono',
                description: 'Selecciona el icono de la red social',
                ui: {
                  component: SocialIconSelector,
                },
              },
              {
                type: 'string',
                name: 'url',
                label: 'URL del Perfil',
              },
              {
                type: 'boolean',
                name: 'showInHeader',
                label: 'Mostrar en Header',
              },
              {
                type: 'boolean',
                name: 'showInFooter',
                label: 'Mostrar en Footer',
              },
              {
                type: 'number',
                name: 'order',
                label: 'Orden',
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
                name: 'topBar',
                label: 'Barra Superior',
                fields: [
                  { type: 'boolean', name: 'show', label: 'Mostrar Barra Superior' },
                  { type: 'string', name: 'slogan', label: 'Eslogan en la Barra' },
                  { type: 'boolean', name: 'showSocials', label: 'Mostrar Redes Sociales' },
                  { type: 'boolean', name: 'showContact', label: 'Mostrar Teléfono/Email' },
                ],
              },
              {
                type: 'boolean',
                name: 'showWhatsappButton',
                label: 'Mostrar Botón WhatsApp',
              },
              {
                type: 'boolean',
                name: 'showContactButton',
                label: 'Mostrar Botón Contacto',
              },
              {
                type: 'object',
                name: 'navigation',
                label: 'Menú de Navegación',
                list: true,
                ui: {
                  itemProps: (item) => ({
                    label: item?.label || 'Nuevo Enlace',
                  }),
                },
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
                    type: 'number',
                    name: 'order',
                    label: 'Orden en el Menú',
                    description: 'Número para ordenar (menor = primero)',
                  },
                  {
                    type: 'boolean',
                    name: 'highlight',
                    label: 'Destacar este enlace',
                  },
                  {
                    type: 'string',
                    name: 'type',
                    label: 'Tipo de Menú',
                    options: [
                      { value: 'link', label: 'Enlace Normal' },
                      { value: 'dropdown-services', label: 'Dropdown de Servicios' },
                      { value: 'dropdown-projects', label: 'Dropdown de Proyectos' },
                      { value: 'dropdown-custom', label: 'Dropdown Personalizado' },
                    ],
                  },
                  {
                    type: 'number',
                    name: 'dropdownLimit',
                    label: 'Cantidad en Dropdown',
                    description: 'Para dropdowns de servicios/proyectos, cuántos mostrar',
                  },
                  {
                    type: 'object',
                    name: 'children',
                    label: 'Submenú (para dropdown personalizado)',
                    list: true,
                    fields: [
                      { type: 'string', name: 'label', label: 'Texto' },
                      { type: 'string', name: 'href', label: 'URL' },
                      { type: 'number', name: 'order', label: 'Orden' },
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
                name: 'phrase',
                label: 'Frase Destacada del Footer',
                ui: { component: 'textarea' },
              },
              {
                type: 'string',
                name: 'copyright',
                label: 'Texto de Copyright',
                description: 'Usa {year} para el año actual',
              },
              {
                type: 'object',
                name: 'servicesColumn',
                label: 'Columna de Servicios',
                list: true,
                ui: {
                  itemProps: (item) => ({ label: item?.label || 'Servicio' }),
                },
                fields: [
                  { type: 'string', name: 'label', label: 'Texto del Enlace' },
                  { type: 'string', name: 'href', label: 'URL' },
                ],
              },
              {
                type: 'object',
                name: 'projectsColumn',
                label: 'Columna de Proyectos (Conjunto Habitacional, Diseño Residencial, Diseño Retail)',
                list: true,
                ui: {
                  itemProps: (item) => ({ label: item?.label || 'Proyecto' }),
                },
                fields: [
                  { type: 'string', name: 'label', label: 'Texto del Enlace (ej: Conjunto Habitacional)' },
                  { type: 'string', name: 'href', label: 'URL' },
                ],
              },
              {
                type: 'object',
                name: 'companyColumn',
                label: 'Columna de Empresa (Inicio, Nosotros, Contacto)',
                list: true,
                ui: {
                  itemProps: (item) => ({ label: item?.label || 'Página' }),
                },
                fields: [
                  { type: 'string', name: 'label', label: 'Texto del Enlace (ej: Inicio, Nosotros, Contacto)' },
                  { type: 'string', name: 'href', label: 'URL' },
                ],
              },
              {
                type: 'object',
                name: 'socialAndContactColumn',
                label: 'Columna de Redes Sociales y Contacto',
                fields: [
                  { type: 'string', name: 'title', label: 'Título de la Sección' },
                  {
                    type: 'object',
                    name: 'socialLinks',
                    label: 'Redes Sociales',
                    list: true,
                    ui: {
                      itemProps: (item) => ({ label: item?.name || 'Red Social' }),
                    },
                    fields: [
                      { type: 'string', name: 'name', label: 'Nombre de la Red' },
                      { type: 'string', name: 'url', label: 'URL de Perfil' },
                      { type: 'string', name: 'icon', label: 'Icono' },
                    ],
                  },
                  { type: 'string', name: 'phone', label: 'Teléfono de Contacto' },
                  { type: 'string', name: 'email', label: 'Correo Electrónico' },
                  { type: 'string', name: 'address', label: 'Dirección' },
                ],
              },
              {
                type: 'boolean',
                name: 'showLegalPages',
                label: 'Mostrar Páginas Legales (Política de Privacidad, Términos, Cookies)',
              },
              {
                type: 'object',
                name: 'legalPagesLinks',
                label: 'Enlaces de Páginas Legales en Footer',
                list: true,
                ui: {
                  itemProps: (item) => ({ label: item?.label || 'Página Legal' }),
                },
                fields: [
                  { type: 'string', name: 'label', label: 'Texto (ej: Política de Privacidad)' },
                  { type: 'string', name: 'href', label: 'URL' },
                ],
              },
            ],
          },

          // --- Páginas Legales ---
          {
            type: 'object',
            name: 'legal',
            label: 'Configuración de Páginas Legales',
            fields: [
              // Fondo, Color de fondo/imagen
              {
                type: 'object',
                name: 'background',
                label: 'Fondo de Páginas Legales (Color / Imagen)',
                fields: [
                  {
                    type: 'string',
                    name: 'type',
                    label: 'Tipo de Fondo',
                    options: [
                      { value: 'color', label: 'Color Sólido' },
                      { value: 'gradient', label: 'Degradado Corporativo' },
                      { value: 'image', label: 'Imagen de Fondo' },
                    ],
                  },
                  {
                    type: 'string',
                    name: 'color',
                    label: 'Color de Fondo',
                    description: 'Código de color HEX o CSS (ej: #103646)',
                  },
                  {
                    type: 'image',
                    name: 'image',
                    label: 'Imagen de Fondo',
                    description: 'Se sube a Cloudinary',
                  },
                ],
              },
              // Cards (Icono, Título, Descripción)
              {
                type: 'object',
                name: 'cards',
                label: 'Cards de Páginas Legales (Icono, Título, Descripción)',
                list: true,
                ui: {
                  itemProps: (item) => ({ label: item?.title || 'Card Legal' }),
                },
                fields: [
                  { type: 'string', name: 'icon', label: 'Icono (ej: ph:shield-check)' },
                  { type: 'string', name: 'title', label: 'Título' },
                  { type: 'string', name: 'description', label: 'Descripción', ui: { component: 'textarea' } },
                ],
              },
              {
                type: 'object',
                name: 'privacyPolicy',
                label: 'Política de Privacidad',
                fields: [
                  { type: 'boolean', name: 'enabled', label: 'Habilitada' },
                  { type: 'string', name: 'title', label: 'Título de la Página' },
                  { type: 'string', name: 'slug', label: 'URL (slug)' },
                  { type: 'datetime', name: 'lastUpdated', label: 'Última Actualización' },
                  { 
                    type: 'rich-text', 
                    name: 'content', 
                    label: 'Contenido',
                    description: 'Texto completo de la política de privacidad',
                  },
                ],
              },
              {
                type: 'object',
                name: 'termsOfService',
                label: 'Términos de Servicio',
                fields: [
                  { type: 'boolean', name: 'enabled', label: 'Habilitados' },
                  { type: 'string', name: 'title', label: 'Título de la Página' },
                  { type: 'string', name: 'slug', label: 'URL (slug)' },
                  { type: 'datetime', name: 'lastUpdated', label: 'Última Actualización' },
                  { 
                    type: 'rich-text', 
                    name: 'content', 
                    label: 'Contenido',
                    description: 'Texto completo de los términos de servicio',
                  },
                ],
              },
              {
                type: 'object',
                name: 'cookies',
                label: 'Política de Cookies',
                fields: [
                  { type: 'boolean', name: 'enabled', label: 'Habilitada' },
                  { type: 'boolean', name: 'showBanner', label: 'Mostrar Banner de Cookies' },
                  { type: 'string', name: 'title', label: 'Título de la Página' },
                  { type: 'string', name: 'slug', label: 'URL (slug)' },
                  { type: 'string', name: 'bannerText', label: 'Texto del Banner', ui: { component: 'textarea' } },
                  { type: 'string', name: 'acceptButtonText', label: 'Texto Botón Aceptar' },
                  { type: 'string', name: 'rejectButtonText', label: 'Texto Botón Rechazar' },
                  { type: 'string', name: 'settingsButtonText', label: 'Texto Botón Configurar' },
                  { 
                    type: 'rich-text', 
                    name: 'content', 
                    label: 'Contenido',
                    description: 'Texto completo de la política de cookies',
                  },
                ],
              },
            ],
          },

          // --- Configuración SEO Global ---
          {
            type: 'object',
            name: 'seo',
            label: 'SEO Global',
            fields: [
              { type: 'string', name: 'defaultTitle', label: 'Título por Defecto' },
              { type: 'string', name: 'titleTemplate', label: 'Plantilla de Título', description: 'Usa %s para el título de la página. Ej: %s | Constructora Carpio' },
              { type: 'string', name: 'defaultDescription', label: 'Descripción por Defecto', ui: { component: 'textarea' } },
              { type: 'image', name: 'defaultOgImage', label: 'Imagen OG por Defecto', description: 'Se sube a Cloudinary' },
              { type: 'string', name: 'googleAnalyticsId', label: 'Google Analytics ID' },
              { type: 'string', name: 'googleTagManagerId', label: 'Google Tag Manager ID' },
            ],
          },
        ],
      },
    ],
  },
});
