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
      type: 'string',
      name: 'selectedProjects',
      label: 'Selección de proyectos a mostrar en las columnas',
      list: true,
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
  name: 'projectsCarousel',
  label: 'Sección HERO / Carrusel',
  fields: [
    {
      type: 'string',
      name: 'selectedProjects',
      label: 'Seleccionar proyectos para el carrusel',
      list: true,
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
          },
          {
            type: 'string',
            name: 'description',
            label: 'Descripción Corta (SEO)',
            ui: { component: 'textarea' },
          },
          {
            type: 'object',
            name: 'project',
            label: 'Información y Secciones del Proyecto',
            fields: [
              // --- CATEGORIAS ---
              {
                type: 'object',
                name: 'categories',
                label: 'Categorías',
                fields: [
                  { type: 'string', name: 'icon', label: 'Icono' },
                  { type: 'string', name: 'title', label: 'Título' },
                  { type: 'string', name: 'description', label: 'Descripción', ui: { component: 'textarea' } },
                ]
              },
              // --- GENERAL ---
              {
                type: 'object',
                name: 'general',
                label: 'Información General',
                fields: [
                  { type: 'string', name: 'name', label: 'Nombre del Proyecto' },
                  { type: 'string', name: 'description', label: 'Descripción del Proyecto', ui: { component: 'textarea' } },
                  {
                    type: 'string',
                    name: 'category',
                    label: 'Categoría',
                    options: [
                      { value: 'conjunto-habitacional', label: 'Conjuntos Habitacionales' },
                      { value: 'diseno-residencial', label: 'Diseño Residencial' },
                      { value: 'diseno-retail', label: 'Diseño Retail' }
                    ]
                  },
                  { type: 'string', name: 'location', label: 'Ubicación' },
                  {
                    type: 'object',
                    name: 'specifications',
                    label: 'Especificaciones',
                    list: true,
                    fields: [
                      { type: 'string', name: 'icon', label: 'Icono' },
                      { type: 'string', name: 'title', label: 'Título' },
                      { type: 'string', name: 'description', label: 'Descripción' }
                    ]
                  },
                  {
                    type: 'image',
                    name: 'images',
                    label: 'Galería de imágenes (Máximo 30 imágenes)',
                    list: true,
                    validate: (value: any) => {
                      if (value && value.length > 30) {
                        return 'No puedes agregar más de 30 imágenes';
                      }
                    }
                  },
                  { type: 'string', name: 'brochure', label: 'Brochure (Link/Ruta)' },
                  { type: 'string', name: 'virtualTourVideo', label: 'Tour Virtual / Video (Link)' },
                  { type: 'string', name: 'manager', label: 'Encargado del proyecto (Usuario Contacto)' }
                ]
              },
              // --- HERO ---
              {
                type: 'object',
                name: 'heroSection',
                label: 'Sección HERO',
                fields: [
                  {
                    type: 'string',
                    name: 'projectStatusChip',
                    label: 'Estado del Proyecto (Chip)',
                    options: [
                      { value: 'disponible', label: 'Proyecto Disponible' },
                      { value: 'vigente', label: 'Proyecto Vigente' },
                      { value: 'proximo', label: 'Proyecto Próximo' }
                    ]
                  },
                  { type: 'image', name: 'backgroundImage', label: 'Imagen de Fondo' },
                  { type: 'string', name: 'backgroundColor', label: 'Color de Fondo' },
                  { type: 'number', name: 'backgroundOpacity', label: 'Opacidad del Fondo (%)' },
                  { type: 'boolean', name: 'backgroundOverlay', label: 'Habilitar Overlay de Fondo' },
                  {
                    type: 'object',
                    name: 'infoChips',
                    label: 'Chips Informativos (Máximo 3)',
                    list: true,
                    validate: (value: any) => {
                      if (value && value.length > 3) {
                        return 'No puedes agregar más de 3 chips';
                      }
                    },
                    fields: [
                      { type: 'string', name: 'icon', label: 'Icono' },
                      { type: 'string', name: 'title', label: 'Título' }
                    ]
                  },
                  {
                    type: 'object',
                    name: 'buttons',
                    label: 'Botones Informativos',
                    fields: [
                      { type: 'boolean', name: 'whatsapp', label: 'Habilitar WhatsApp' },
                      { type: 'boolean', name: 'email', label: 'Habilitar Email' },
                      { type: 'boolean', name: 'contacto', label: 'Habilitar Contacto' }
                    ]
                  }
                ]
              },
              // --- DETALLES PROYECTO ---
              {
                type: 'object',
                name: 'detailsSection',
                label: 'Sección DETALLES PROYECTO',
                fields: [
                  { type: 'boolean', name: 'showSpecifications', label: 'Habilitar Especificaciones' }
                ]
              },
              // --- VIDEO ---
              {
                type: 'object',
                name: 'videoSection',
                label: 'Sección VIDEO',
                fields: [
                  { type: 'boolean', name: 'enabled', label: 'Habilitar Sección' },
                  { type: 'string', name: 'videoUrl', label: 'URL de Video (Link)' },
                  { type: 'string', name: 'title', label: 'Título' },
                  { type: 'string', name: 'description', label: 'Descripción', ui: { component: 'textarea' } }
                ]
              },
              // --- MOSAICO VISUAL ---
              {
                type: 'object',
                name: 'visualMosaicSection',
                label: 'Sección MOSAICO VISUAL',
                fields: [
                  { type: 'boolean', name: 'enabled', label: 'Habilitar Sección' },
                  { type: 'string', name: 'title', label: 'Título' },
                  { type: 'string', name: 'description', label: 'Descripción', ui: { component: 'textarea' } },
                  { type: 'image', name: 'images', label: 'Imágenes del Mosaico', list: true }
                ]
              },
              // --- NUESTROS PROYECTOS ---
              {
                type: 'object',
                name: 'ourProjectsSection',
                label: 'Sección NUESTROS PROYECTOS',
                fields: [
                  { type: 'boolean', name: 'enabled', label: 'Habilitar Sección' },
                  { type: 'string', name: 'title', label: 'Título' },
                  { type: 'string', name: 'description', label: 'Descripción', ui: { component: 'textarea' } }
                ]
              },
              // --- CONTACTO ---
              {
                type: 'object',
                name: 'contactSection',
                label: 'Sección CONTACTO',
                fields: [
                  { type: 'boolean', name: 'enabled', label: 'Habilitar Sección' },
                  { type: 'string', name: 'title', label: 'Título' },
                  { type: 'string', name: 'description', label: 'Descripción', ui: { component: 'textarea' } },
                  {
                    type: 'object',
                    name: 'buttons',
                    label: 'Botones de Contacto',
                    fields: [
                      { type: 'boolean', name: 'whatsapp', label: 'Habilitar WhatsApp' },
                      { type: 'boolean', name: 'email', label: 'Habilitar Email' }
                    ]
                  }
                ]
              }
            ]
          },
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
            label: 'Descripción Corta (SEO)',
            ui: { component: 'textarea' },
          },
          {
            type: 'image',
            name: 'backgroundImage',
            label: 'Imagen Principal de Fondo',
          },
          {
            type: 'object',
            name: 'service',
            label: 'Detalles del Servicio',
            fields: [
              // --- CATEGORIAS ---
              {
                type: 'object',
                name: 'categories',
                label: 'Categorías',
                fields: [
                  { type: 'string', name: 'icon', label: 'Icono' },
                  { type: 'string', name: 'title', label: 'Título' },
                  { type: 'string', name: 'description', label: 'Descripción', ui: { component: 'textarea' } },
                ]
              },
              // --- GENERAL ---
              {
                type: 'object',
                name: 'general',
                label: 'Información General',
                fields: [
                  { type: 'string', name: 'name', label: 'Nombre del Servicio' },
                  { type: 'string', name: 'description', label: 'Descripción del Servicio', ui: { component: 'textarea' } },
                  { type: 'string', name: 'contact', label: 'Contacto (Ej: Teléfono o Correo)' },
                  {
                    type: 'object',
                    name: 'process',
                    label: 'Proceso/Pasos del Servicio',
                    list: true,
                    fields: [
                      { type: 'string', name: 'number', label: 'Número de Paso (ej: 01, #)' },
                      { type: 'string', name: 'icon', label: 'Icono' },
                      { type: 'string', name: 'title', label: 'Título' },
                      { type: 'string', name: 'description', label: 'Descripción', ui: { component: 'textarea' } },
                    ]
                  }
                ]
              },
              // --- HERO ---
              {
                type: 'object',
                name: 'heroSection',
                label: 'Sección HERO',
                fields: [
                  { type: 'image', name: 'backgroundImage', label: 'Imagen de Fondo' },
                  { type: 'string', name: 'backgroundColor', label: 'Color de Fondo' },
                  { type: 'number', name: 'backgroundOpacity', label: 'Opacidad del Fondo (%)' },
                  { type: 'boolean', name: 'backgroundOverlay', label: 'Habilitar Overlay de Fondo' },
                  {
                    type: 'object',
                    name: 'infoCards',
                    label: 'Cards Informativos (Máximo 3)',
                    list: true,
                    validate: (value: any) => {
                      if (value && value.length > 3) {
                        return 'No puedes agregar más de 3 tarjetas';
                      }
                    },
                    fields: [
                      { type: 'string', name: 'icon', label: 'Icono' },
                      { type: 'string', name: 'title', label: 'Título' },
                      {
                        type: 'string',
                        name: 'description',
                        label: 'Descripción (Máximo 50 caracteres)',
                        validate: (val: any) => {
                          if (val && val.length > 50) {
                            return 'La descripción no puede superar los 50 caracteres';
                          }
                        }
                      }
                    ]
                  },
                  {
                    type: 'object',
                    name: 'buttons',
                    label: 'Botones Informativos',
                    fields: [
                      { type: 'boolean', name: 'whatsapp', label: 'Habilitar WhatsApp' },
                      { type: 'boolean', name: 'email', label: 'Habilitar Email' },
                      { type: 'boolean', name: 'contacto', label: 'Habilitar Contacto' },
                    ]
                  }
                ]
              },
              // --- PROCESO ---
              {
                type: 'object',
                name: 'proceso',
                label: 'Sección PROCESO',
                fields: [
                  { type: 'string', name: 'title', label: 'Título de la Sección' },
                  { type: 'string', name: 'description', label: 'Descripción de la Sección', ui: { component: 'textarea' } },
                  {
                    type: 'object',
                    name: 'steps',
                    label: 'Pasos del Proceso',
                    list: true,
                    fields: [
                      { type: 'string', name: 'number', label: 'Número de Paso (ej: 01, #)' },
                      { type: 'string', name: 'icon', label: 'Icono' },
                      { type: 'string', name: 'title', label: 'Título' },
                      { type: 'string', name: 'description', label: 'Descripción', ui: { component: 'textarea' } },
                    ]
                  }
                ]
              },
              // --- COMIENZA HOY ---
              {
                type: 'object',
                name: 'comienzaHoy',
                label: 'Sección COMIENZA HOY',
                fields: [
                  { type: 'string', name: 'title', label: 'Título de la Sección' },
                  { type: 'string', name: 'description', label: 'Descripción de la Sección', ui: { component: 'textarea' } },
                  {
                    type: 'object',
                    name: 'infoCards',
                    label: 'Cards Informativos (Máximo 4)',
                    list: true,
                    validate: (value: any) => {
                      if (value && value.length > 4) {
                        return 'No puedes agregar más de 4 tarjetas';
                      }
                    },
                    fields: [
                      { type: 'string', name: 'icon', label: 'Icono' },
                      { type: 'string', name: 'title', label: 'Título' },
                      {
                        type: 'string',
                        name: 'description',
                        label: 'Descripción (Máximo 50 caracteres)',
                        validate: (val: any) => {
                          if (val && val.length > 50) {
                            return 'La descripción no puede superar los 50 caracteres';
                          }
                        }
                      }
                    ]
                  },
                  {
                    type: 'object',
                    name: 'contactCard',
                    label: 'Card Contacto',
                    fields: [
                      { type: 'boolean', name: 'showWhatsapp', label: 'Habilitar botón WhatsApp' },
                      { type: 'boolean', name: 'showEmail', label: 'Habilitar botón Email' },
                    ]
                  }
                ]
              }
            ]
          },
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
              pageBlockTemplates[1], // about
              pageBlockTemplates[2], // services
              inicioProjectsTemplate,
              pageBlockTemplates[4], // testimonials
              inicioContactTemplate,
              pageBlockTemplates[5], // cta
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
              pageBlockTemplates[7], // team
              pageBlockTemplates[4], // testimonials
              pageBlockTemplates[5], // cta
              pageBlockTemplates[10], // features
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
              pageBlockTemplates[11], // content
              pageBlockTemplates[2], // services
              serviciosWhyChooseUsTemplate,
              serviciosPreguntasTemplate,
              pageBlockTemplates[5], // cta
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
              pageBlockTemplates[0], // hero genérico
              proyectosHeroTemplate, // projectsCarousel
              pageBlockTemplates[3], // projects genérico
              proyectosVigenteTemplate, // proyectoVigente personalizado
              pageBlockTemplates[5], // cta genérico
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
              contactoInformacionTemplate,
              pageBlockTemplates[8], // faq
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
