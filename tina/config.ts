import { defineConfig } from 'tinacms';

// Schema para la colección de Proyectos
const proyectosCollection = {
  name: 'proyectos',
  label: 'Proyectos',
  path: 'src/content/proyectos',
  format: 'md',
  ui: {
    router: ({ document }) => {
      return `/proyecto/${document._sys.filename}`;
    },
  },
  fields: [
    // Información Básica
    {
      type: 'string',
      name: 'title',
      label: 'Título del Proyecto',
      required: true,
      description: 'Nombre completo del proyecto',
    },
    {
      type: 'string',
      name: 'subtitle',
      label: 'Subtítulo',
      description: 'Descripción corta para la tarjeta',
    },
    {
      type: 'string',
      name: 'description',
      label: 'Descripción',
      ui: {
        component: 'textarea',
      },
      description: 'Descripción completa del proyecto',
    },
    {
      type: 'string',
      name: 'category',
      label: 'Categoría',
      options: ['residencial', 'comercial', 'urbanizacion', 'edificio'],
      description: 'Tipo de proyecto',
    },
    {
      type: 'string',
      name: 'location',
      label: 'Ubicación',
      description: 'Ciudad y dirección del proyecto',
    },
    {
      type: 'string',
      name: 'status',
      label: 'Estado',
      options: ['en-construccion', 'completado', 'planificacion'],
      description: 'Estado actual del proyecto',
    },
    {
      type: 'datetime',
      name: 'startDate',
      label: 'Fecha de Inicio',
      ui: {
        dateFormat: 'YYYY-MM-DD',
      },
    },
    {
      type: 'datetime',
      name: 'endDate',
      label: 'Fecha de Finalización',
      ui: {
        dateFormat: 'YYYY-MM-DD',
      },
    },
    {
      type: 'boolean',
      name: 'featured',
      label: 'Proyecto Destacado',
      description: 'Aparecerá en la página principal',
    },

    // Imágenes
    {
      type: 'image',
      name: 'heroImage',
      label: 'Imagen Principal',
      description: 'Imagen de portada del proyecto',
    },
    {
      type: 'object',
      name: 'images',
      label: 'Galería de Imágenes',
      list: true,
      ui: {
        itemProps: (item) => {
          return { label: item?.caption || 'Imagen' };
        },
      },
      fields: [
        {
          type: 'image',
          name: 'src',
          label: 'Imagen',
          required: true,
        },
        {
          type: 'string',
          name: 'alt',
          label: 'Texto Alternativo',
          description: 'Descripción para accesibilidad',
        },
        {
          type: 'string',
          name: 'caption',
          label: 'Pie de Foto',
        },
      ],
    },

    // Especificaciones
    {
      type: 'object',
      name: 'specifications',
      label: 'Especificaciones',
      fields: [
        {
          type: 'boolean',
          name: 'enabled',
          label: 'Mostrar Especificaciones',
        },
        {
          type: 'string',
          name: 'area',
          label: 'Área Total',
          description: 'Ej: 5000 m²',
        },
        {
          type: 'string',
          name: 'units',
          label: 'Número de Unidades',
          description: 'Ej: 24 departamentos',
        },
        {
          type: 'string',
          name: 'floors',
          label: 'Número de Pisos',
        },
        {
          type: 'object',
          name: 'amenities',
          label: 'Amenidades',
          list: true,
          ui: {
            itemProps: (item) => {
              return { label: item?.name || 'Amenidad' };
            },
          },
          fields: [
            {
              type: 'string',
              name: 'name',
              label: 'Nombre',
            },
            {
              type: 'string',
              name: 'icon',
              label: 'Icono',
              description: 'Nombre del icono de Lucide',
            },
          ],
        },
      ],
    },

    // Cliente y Detalles
    {
      type: 'object',
      name: 'client',
      label: 'Información del Cliente',
      fields: [
        {
          type: 'string',
          name: 'name',
          label: 'Nombre del Cliente',
        },
        {
          type: 'string',
          name: 'website',
          label: 'Sitio Web',
        },
      ],
    },

    // Testimonios
    {
      type: 'object',
      name: 'testimonial',
      label: 'Testimonio',
      fields: [
        {
          type: 'string',
          name: 'text',
          label: 'Texto del Testimonio',
          ui: {
            component: 'textarea',
          },
        },
        {
          type: 'string',
          name: 'author',
          label: 'Autor',
        },
        {
          type: 'string',
          name: 'position',
          label: 'Cargo/Rol',
        },
      ],
    },

    // SEO
    {
      type: 'object',
      name: 'seo',
      label: 'SEO',
      fields: [
        {
          type: 'string',
          name: 'metaTitle',
          label: 'Meta Título',
          description: 'Título para motores de búsqueda',
        },
        {
          type: 'string',
          name: 'metaDescription',
          label: 'Meta Descripción',
          ui: {
            component: 'textarea',
          },
          description: 'Descripción para motores de búsqueda',
        },
      ],
    },
  ],
};

// Schema para la colección de Servicios
const serviciosCollection = {
  name: 'servicios',
  label: 'Servicios',
  path: 'src/content/servicios',
  format: 'md',
  ui: {
    router: ({ document }) => {
      return `/servicios/${document._sys.filename}`;
    },
  },
  fields: [
    // Información Básica
    {
      type: 'string',
      name: 'title',
      label: 'Título del Servicio',
      required: true,
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
      name: 'category',
      label: 'Categoría',
      options: ['construccion', 'remodelacion', 'consultoria', 'diseno'],
    },
    {
      type: 'image',
      name: 'heroImage',
      label: 'Imagen Principal',
    },
    {
      type: 'boolean',
      name: 'featured',
      label: 'Servicio Destacado',
    },

    // Hero Configuration
    {
      type: 'object',
      name: 'heroConfig',
      label: 'Configuración del Hero',
      fields: [
        {
          type: 'boolean',
          name: 'enabled',
          label: 'Mostrar Hero',
        },
        {
          type: 'string',
          name: 'title',
          label: 'Título',
        },
        {
          type: 'string',
          name: 'subtitle',
          label: 'Subtítulo',
          ui: {
            component: 'textarea',
          },
        },
        {
          type: 'image',
          name: 'image',
          label: 'Imagen de Fondo',
        },
        {
          type: 'object',
          name: 'chips',
          label: 'Chips/Tags',
          list: true,
          fields: [
            {
              type: 'string',
              name: 'text',
              label: 'Texto',
            },
            {
              type: 'string',
              name: 'icon',
              label: 'Icono',
            },
          ],
        },
        {
          type: 'object',
          name: 'cta',
          label: 'Call to Action',
          fields: [
            {
              type: 'string',
              name: 'text',
              label: 'Texto del Botón',
            },
            {
              type: 'string',
              name: 'link',
              label: 'Enlace',
            },
          ],
        },
      ],
    },

    // Características
    {
      type: 'string',
      name: 'featuresTitle',
      label: 'Título de Características',
    },
    {
      type: 'string',
      name: 'featuresDescription',
      label: 'Descripción de Características',
      ui: {
        component: 'textarea',
      },
    },
    {
      type: 'object',
      name: 'features',
      label: 'Características',
      list: true,
      ui: {
        itemProps: (item) => {
          return { label: item?.title || 'Característica' };
        },
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
          ui: {
            component: 'textarea',
          },
        },
        {
          type: 'string',
          name: 'icon',
          label: 'Icono',
        },
      ],
    },

    // Proceso
    {
      type: 'object',
      name: 'process',
      label: 'Proceso del Servicio',
      fields: [
        {
          type: 'boolean',
          name: 'enabled',
          label: 'Mostrar Proceso',
        },
        {
          type: 'string',
          name: 'title',
          label: 'Título',
        },
        {
          type: 'object',
          name: 'steps',
          label: 'Pasos',
          list: true,
          ui: {
            itemProps: (item) => {
              return { label: `${item?.number}. ${item?.title}` || 'Paso' };
            },
          },
          fields: [
            {
              type: 'number',
              name: 'number',
              label: 'Número',
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
              ui: {
                component: 'textarea',
              },
            },
          ],
        },
      ],
    },

    // Beneficios
    {
      type: 'object',
      name: 'benefits',
      label: 'Beneficios',
      fields: [
        {
          type: 'boolean',
          name: 'enabled',
          label: 'Mostrar Beneficios',
        },
        {
          type: 'string',
          name: 'title',
          label: 'Título',
        },
        {
          type: 'object',
          name: 'items',
          label: 'Lista de Beneficios',
          list: true,
          ui: {
            itemProps: (item) => {
              return { label: item?.title || 'Beneficio' };
            },
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
              name: 'icon',
              label: 'Icono',
            },
          ],
        },
      ],
    },

    // Testimonios
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
          label: 'Título',
        },
        {
          type: 'object',
          name: 'testimonials',
          label: 'Testimonios',
          list: true,
          ui: {
            itemProps: (item) => {
              return { label: item?.author || 'Testimonio' };
            },
          },
          fields: [
            {
              type: 'string',
              name: 'text',
              label: 'Texto',
              ui: {
                component: 'textarea',
              },
            },
            {
              type: 'string',
              name: 'author',
              label: 'Autor',
            },
            {
              type: 'string',
              name: 'position',
              label: 'Cargo',
            },
            {
              type: 'number',
              name: 'rating',
              label: 'Calificación',
              description: '1-5 estrellas',
            },
          ],
        },
      ],
    },

    // FAQs
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
          label: 'Título',
        },
        {
          type: 'object',
          name: 'faqs',
          label: 'Preguntas',
          list: true,
          ui: {
            itemProps: (item) => {
              return { label: item?.question || 'Pregunta' };
            },
          },
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

    // SEO
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
      ],
    },
  ],
};

// Schema para la colección de Páginas
const pagesCollection = {
  name: 'pages',
  label: 'Páginas',
  path: 'src/data/pages',
  format: 'json',
  ui: {
    allowedActions: {
      create: false,
      delete: false,
    },
  },
  match: {
    include: '{index,quienes-somos,contacto}',
  },
  fields: [
    {
      type: 'object',
      name: 'hero',
      label: 'Hero Section',
      fields: [
        {
          type: 'boolean',
          name: 'enabled',
          label: 'Mostrar Hero',
        },
        {
          type: 'string',
          name: 'title',
          label: 'Título',
        },
        {
          type: 'string',
          name: 'subtitle',
          label: 'Subtítulo',
          ui: {
            component: 'textarea',
          },
        },
        {
          type: 'object',
          name: 'buttons',
          label: 'Botones',
          list: true,
          fields: [
            {
              type: 'string',
              name: 'text',
              label: 'Texto',
            },
            {
              type: 'string',
              name: 'link',
              label: 'Enlace',
            },
            {
              type: 'string',
              name: 'variant',
              label: 'Estilo',
              options: ['primary', 'secondary', 'outline'],
            },
          ],
        },
        {
          type: 'object',
          name: 'images',
          label: 'Imágenes',
          list: true,
          fields: [
            {
              type: 'image',
              name: 'src',
              label: 'Imagen',
            },
            {
              type: 'string',
              name: 'alt',
              label: 'Texto Alternativo',
            },
          ],
        },
      ],
    },
    // Secciones adicionales específicas por página
    // (Se pueden agregar más según necesidades)
  ],
};

// Configuración principal de Tina CMS
export default defineConfig({
  branch: process.env.TINA_BRANCH || 'main',
  
  // Client ID de Tina Cloud (obtener en https://app.tina.io)
  clientId: process.env.TINA_PUBLIC_CLIENT_ID || null,
  token: process.env.TINA_TOKEN || null,

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

  // Define el schema con todas las colecciones
  schema: {
    collections: [
      proyectosCollection,
      serviciosCollection,
      pagesCollection,
    ],
  },

  // Configuración de búsqueda
  search: {
    tina: {
      indexerToken: process.env.TINA_SEARCH_TOKEN,
      stopwordLanguages: ['spa'],
    },
  },

  // Configuración del admin
  admin: {
    auth: {
      // Usar autenticación local solo en desarrollo
      useLocalAuth: process.env.TINA_PUBLIC_IS_LOCAL === 'true',
    },
  },

  // Tema personalizado (colores de Constructora Carpio)
  theme: {
    primary: '#103646', // Azul principal
  },
});
