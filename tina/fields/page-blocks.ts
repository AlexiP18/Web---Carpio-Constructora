import type { Template } from 'tinacms';
import { ImagePreviewField, ImageGalleryField } from './cloudinary-fields';

/**
 * Templates de secciones/bloques para páginas
 * Cada template representa un tipo de sección configurable
 * 
 * NOTA: Todos los campos 'title' deben tener el mismo tipo (sin required)
 * para evitar conflictos en GraphQL
 */

// ============================================
// CAMPOS COMUNES: Animación y Configuración Visual
// ============================================
const animationFields = [
  {
    type: 'object' as const,
    name: 'animation',
    label: 'Configuración de Animación',
    fields: [
      {
        type: 'boolean' as const,
        name: 'enabled',
        label: 'Habilitar Animación',
      },
      {
        type: 'string' as const,
        name: 'type',
        label: 'Tipo de Animación',
        options: [
          { value: 'none', label: 'Sin animación' },
          { value: 'fade-in', label: 'Aparecer (Fade In)' },
          { value: 'fade-up', label: 'Aparecer desde abajo' },
          { value: 'fade-down', label: 'Aparecer desde arriba' },
          { value: 'fade-left', label: 'Aparecer desde izquierda' },
          { value: 'fade-right', label: 'Aparecer desde derecha' },
          { value: 'zoom-in', label: 'Zoom In' },
          { value: 'zoom-out', label: 'Zoom Out' },
          { value: 'flip-up', label: 'Voltear hacia arriba' },
          { value: 'flip-down', label: 'Voltear hacia abajo' },
          { value: 'slide-up', label: 'Deslizar hacia arriba' },
          { value: 'slide-down', label: 'Deslizar hacia abajo' },
          { value: 'slide-left', label: 'Deslizar hacia izquierda' },
          { value: 'slide-right', label: 'Deslizar hacia derecha' },
        ],
      },
      {
        type: 'string' as const,
        name: 'duration',
        label: 'Duración',
        options: [
          { value: '300', label: 'Rápida (300ms)' },
          { value: '500', label: 'Normal (500ms)' },
          { value: '700', label: 'Lenta (700ms)' },
          { value: '1000', label: 'Muy lenta (1s)' },
        ],
      },
      {
        type: 'string' as const,
        name: 'delay',
        label: 'Retraso',
        options: [
          { value: '0', label: 'Sin retraso' },
          { value: '100', label: '100ms' },
          { value: '200', label: '200ms' },
          { value: '300', label: '300ms' },
          { value: '500', label: '500ms' },
        ],
      },
      {
        type: 'string' as const,
        name: 'easing',
        label: 'Curva de Animación',
        options: [
          { value: 'ease', label: 'Ease (suave)' },
          { value: 'ease-in', label: 'Ease In' },
          { value: 'ease-out', label: 'Ease Out' },
          { value: 'ease-in-out', label: 'Ease In-Out' },
          { value: 'linear', label: 'Lineal' },
        ],
      },
      {
        type: 'boolean' as const,
        name: 'stagger',
        label: 'Animar elementos uno a uno',
        description: 'Para listas de elementos (servicios, proyectos, etc.)',
      },
    ],
  },
];

const sectionConfigFields = [
  {
    type: 'object' as const,
    name: 'sectionConfig',
    label: 'Configuración de Sección',
    fields: [
      {
        type: 'string' as const,
        name: 'id',
        label: 'ID de la Sección',
        description: 'Para navegación interna (sin espacios ni caracteres especiales)',
      },
      {
        type: 'string' as const,
        name: 'backgroundColor',
        label: 'Color de Fondo',
        options: [
          { value: 'white', label: 'Blanco' },
          { value: 'gray-50', label: 'Gris muy claro' },
          { value: 'gray-100', label: 'Gris claro' },
          { value: 'gray-900', label: 'Gris oscuro' },
          { value: 'primary', label: 'Color Primario' },
          { value: 'secondary', label: 'Color Secundario' },
          { value: 'accent', label: 'Color de Acento' },
          { value: 'transparent', label: 'Transparente' },
        ],
      },
      {
        type: 'string' as const,
        name: 'paddingTop',
        label: 'Espaciado Superior',
        options: [
          { value: 'none', label: 'Sin espaciado' },
          { value: 'sm', label: 'Pequeño' },
          { value: 'md', label: 'Mediano' },
          { value: 'lg', label: 'Grande' },
          { value: 'xl', label: 'Extra grande' },
        ],
      },
      {
        type: 'string' as const,
        name: 'paddingBottom',
        label: 'Espaciado Inferior',
        options: [
          { value: 'none', label: 'Sin espaciado' },
          { value: 'sm', label: 'Pequeño' },
          { value: 'md', label: 'Mediano' },
          { value: 'lg', label: 'Grande' },
          { value: 'xl', label: 'Extra grande' },
        ],
      },
      {
        type: 'boolean' as const,
        name: 'fullWidth',
        label: 'Ancho Completo',
      },
      {
        type: 'boolean' as const,
        name: 'visible',
        label: 'Sección Visible',
        description: 'Desactiva para ocultar temporalmente esta sección',
      },
    ],
  },
];

// ============================================
// SECCIÓN: Hero Principal
// ============================================
export const heroSection: Template = {
  name: 'hero',
  label: 'Hero Principal',
  ui: {
    defaultItem: {
      title: 'Título Principal',
      subtitle: 'Subtítulo descriptivo',
      ctaText: 'Contáctanos',
      ctaLink: '/contacto',
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
      name: 'subtitle',
      label: 'Subtítulo',
      ui: { component: 'textarea' },
    },
    {
      type: 'string',
      name: 'backgroundImage',
      label: 'Imagen de Fondo',
      ui: {
        // @ts-ignore
        component: ImagePreviewField,
      },
    },
    {
      type: 'string',
      name: 'backgroundVideo',
      label: 'Video de Fondo (opcional)',
      description: 'URL de video de Cloudinary',
    },
    {
      type: 'string',
      name: 'ctaText',
      label: 'Texto del Botón',
    },
    {
      type: 'string',
      name: 'ctaLink',
      label: 'Enlace del Botón',
    },
    {
      type: 'string',
      name: 'secondaryCtaText',
      label: 'Texto del Botón Secundario',
    },
    {
      type: 'string',
      name: 'secondaryCtaLink',
      label: 'Enlace del Botón Secundario',
    },
    {
      type: 'string',
      name: 'alignment',
      label: 'Alineación del Contenido',
      options: [
        { value: 'left', label: 'Izquierda' },
        { value: 'center', label: 'Centro' },
        { value: 'right', label: 'Derecha' },
      ],
    },
    {
      type: 'boolean',
      name: 'overlay',
      label: 'Mostrar Overlay Oscuro',
    },
  ],
};

// ============================================
// SECCIÓN: Sobre Nosotros / Resumen
// ============================================
export const aboutSection: Template = {
  name: 'about',
  label: 'Sobre Nosotros',
  ui: {
    defaultItem: {
      title: 'Sobre Nosotros',
      showStats: true,
    },
  },
  fields: [
    {
      type: 'string',
      name: 'title',
      label: 'Título de la Sección',
    },
    {
      type: 'string',
      name: 'subtitle',
      label: 'Subtítulo',
    },
    {
      type: 'string',
      name: 'content',
      label: 'Contenido',
      ui: { component: 'textarea' },
    },
    {
      type: 'string',
      name: 'image',
      label: 'Imagen',
      ui: {
        // @ts-ignore
        component: ImagePreviewField,
      },
    },
    {
      type: 'string',
      name: 'imagePosition',
      label: 'Posición de Imagen',
      options: [
        { value: 'left', label: 'Izquierda' },
        { value: 'right', label: 'Derecha' },
      ],
    },
    {
      type: 'boolean',
      name: 'showStats',
      label: 'Mostrar Estadísticas',
    },
    {
      type: 'object',
      name: 'stats',
      label: 'Estadísticas',
      list: true,
      fields: [
        { type: 'string', name: 'value', label: 'Valor' },
        { type: 'string', name: 'label', label: 'Etiqueta' },
      ],
    },
    {
      type: 'string',
      name: 'ctaText',
      label: 'Texto del Botón',
    },
    {
      type: 'string',
      name: 'ctaLink',
      label: 'Enlace del Botón',
    },
  ],
};

// ============================================
// SECCIÓN: Servicios
// ============================================
export const servicesSection: Template = {
  name: 'services',
  label: 'Servicios',
  ui: {
    defaultItem: {
      title: 'Nuestros Servicios',
      layout: 'grid',
    },
  },
  fields: [
    {
      type: 'string',
      name: 'title',
      label: 'Título de la Sección',
    },
    {
      type: 'string',
      name: 'subtitle',
      label: 'Subtítulo',
      ui: { component: 'textarea' },
    },
    {
      type: 'string',
      name: 'layout',
      label: 'Diseño',
      options: [
        { value: 'grid', label: 'Cuadrícula' },
        { value: 'carousel', label: 'Carrusel' },
        { value: 'list', label: 'Lista' },
        { value: 'accordion', label: 'Acordeón' },
      ],
    },
    {
      type: 'object',
      name: 'items',
      label: 'Servicios',
      list: true,
      fields: [
        { type: 'string', name: 'title', label: 'Título' },
        { type: 'string', name: 'description', label: 'Descripción', ui: { component: 'textarea' } },
        { type: 'string', name: 'icon', label: 'Icono' },
        {
          type: 'string',
          name: 'image',
          label: 'Imagen',
          ui: {
            // @ts-ignore
            component: ImagePreviewField,
          },
        },
        { type: 'string', name: 'link', label: 'Enlace' },
      ],
    },
    {
      type: 'string',
      name: 'ctaText',
      label: 'Texto del Botón Ver Más',
    },
    {
      type: 'string',
      name: 'ctaLink',
      label: 'Enlace del Botón',
    },
  ],
};

// ============================================
// SECCIÓN: Proyectos / Portafolio
// ============================================
export const projectsSection: Template = {
  name: 'projects',
  label: 'Proyectos / Portafolio',
  ui: {
    defaultItem: {
      title: 'Nuestros Proyectos',
      layout: 'grid',
      limit: 6,
      showFilters: false,
    },
  },
  fields: [
    {
      type: 'string',
      name: 'title',
      label: 'Título de la Sección',
    },
    {
      type: 'string',
      name: 'subtitle',
      label: 'Subtítulo',
      ui: { component: 'textarea' },
    },
    {
      type: 'string',
      name: 'layout',
      label: 'Diseño',
      options: [
        { value: 'grid', label: 'Cuadrícula' },
        { value: 'masonry', label: 'Mosaico' },
        { value: 'carousel', label: 'Carrusel' },
        { value: 'slider', label: 'Slider Grande' },
      ],
    },
    {
      type: 'number',
      name: 'limit',
      label: 'Número de Proyectos a Mostrar',
    },
    {
      type: 'boolean',
      name: 'showFilters',
      label: 'Mostrar Filtros por Categoría',
    },
    {
      type: 'string',
      name: 'filterCategories',
      label: 'Categorías a Mostrar',
      list: true,
      options: [
        { value: 'conjunto-habitacional', label: 'Conjunto Habitacional' },
        { value: 'diseno-residencial', label: 'Diseño Residencial' },
        { value: 'diseno-retail', label: 'Diseño Retail' },
        { value: 'edificio-comercial', label: 'Edificio Comercial' },
      ],
    },
    {
      type: 'string',
      name: 'ctaText',
      label: 'Texto del Botón Ver Todos',
    },
    {
      type: 'string',
      name: 'ctaLink',
      label: 'Enlace del Botón',
    },
  ],
};

// ============================================
// SECCIÓN: Testimonios
// ============================================
export const testimonialsSection: Template = {
  name: 'testimonials',
  label: 'Testimonios',
  ui: {
    defaultItem: {
      title: 'Lo que dicen nuestros clientes',
      layout: 'carousel',
    },
  },
  fields: [
    {
      type: 'string',
      name: 'title',
      label: 'Título de la Sección',
    },
    {
      type: 'string',
      name: 'subtitle',
      label: 'Subtítulo',
    },
    {
      type: 'string',
      name: 'layout',
      label: 'Diseño',
      options: [
        { value: 'carousel', label: 'Carrusel' },
        { value: 'grid', label: 'Cuadrícula' },
        { value: 'single', label: 'Uno a la vez' },
      ],
    },
    {
      type: 'object',
      name: 'items',
      label: 'Testimonios',
      list: true,
      fields: [
        { type: 'string', name: 'quote', label: 'Cita', ui: { component: 'textarea' }, required: true },
        { type: 'string', name: 'author', label: 'Nombre del Autor' },
        { type: 'string', name: 'position', label: 'Cargo/Empresa' },
        {
          type: 'string',
          name: 'avatar',
          label: 'Foto del Autor',
          ui: {
            // @ts-ignore
            component: ImagePreviewField,
          },
        },
        { type: 'number', name: 'rating', label: 'Calificación (1-5)' },
      ],
    },
  ],
};

// ============================================
// SECCIÓN: Llamado a la Acción (CTA)
// ============================================
export const ctaSection: Template = {
  name: 'cta',
  label: 'Llamado a la Acción (CTA)',
  ui: {
    defaultItem: {
      title: '¿Listo para comenzar tu proyecto?',
      buttonText: 'Contáctanos',
      buttonLink: '/contacto',
      style: 'default',
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
      ui: { component: 'textarea' },
    },
    {
      type: 'string',
      name: 'backgroundImage',
      label: 'Imagen de Fondo',
      ui: {
        // @ts-ignore
        component: ImagePreviewField,
      },
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
      name: 'secondaryButtonText',
      label: 'Texto del Botón Secundario',
    },
    {
      type: 'string',
      name: 'secondaryButtonLink',
      label: 'Enlace del Botón Secundario',
    },
    {
      type: 'string',
      name: 'style',
      label: 'Estilo',
      options: [
        { value: 'default', label: 'Por Defecto' },
        { value: 'gradient', label: 'Gradiente' },
        { value: 'dark', label: 'Oscuro' },
        { value: 'light', label: 'Claro' },
      ],
    },
  ],
};

// ============================================
// SECCIÓN: Contacto
// ============================================
export const contactSection: Template = {
  name: 'contact',
  label: 'Formulario de Contacto',
  ui: {
    defaultItem: {
      title: 'Contáctanos',
      showMap: true,
      showForm: true,
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
      name: 'subtitle',
      label: 'Subtítulo',
      ui: { component: 'textarea' },
    },
    {
      type: 'boolean',
      name: 'showForm',
      label: 'Mostrar Formulario',
    },
    {
      type: 'boolean',
      name: 'showMap',
      label: 'Mostrar Mapa',
    },
    {
      type: 'boolean',
      name: 'showInfo',
      label: 'Mostrar Información de Contacto',
    },
    {
      type: 'object',
      name: 'info',
      label: 'Información de Contacto',
      fields: [
        { type: 'string', name: 'address', label: 'Dirección' },
        { type: 'string', name: 'phone', label: 'Teléfono' },
        { type: 'string', name: 'email', label: 'Email' },
        { type: 'string', name: 'hours', label: 'Horario de Atención' },
      ],
    },
    {
      type: 'string',
      name: 'mapUrl',
      label: 'URL de Google Maps Embed',
    },
  ],
};

// ============================================
// SECCIÓN: Equipo
// ============================================
export const teamSection: Template = {
  name: 'team',
  label: 'Equipo',
  ui: {
    defaultItem: {
      title: 'Nuestro Equipo',
      layout: 'grid',
    },
  },
  fields: [
    {
      type: 'string',
      name: 'title',
      label: 'Título de la Sección',
    },
    {
      type: 'string',
      name: 'subtitle',
      label: 'Subtítulo',
    },
    {
      type: 'string',
      name: 'layout',
      label: 'Diseño',
      options: [
        { value: 'grid', label: 'Cuadrícula' },
        { value: 'carousel', label: 'Carrusel' },
      ],
    },
    {
      type: 'object',
      name: 'members',
      label: 'Miembros del Equipo',
      list: true,
      fields: [
        { type: 'string', name: 'name', label: 'Nombre', required: true },
        { type: 'string', name: 'position', label: 'Cargo' },
        { type: 'string', name: 'bio', label: 'Biografía', ui: { component: 'textarea' } },
        {
          type: 'string',
          name: 'photo',
          label: 'Foto',
          ui: {
            // @ts-ignore
            component: ImagePreviewField,
          },
        },
        { type: 'string', name: 'linkedin', label: 'LinkedIn' },
        { type: 'string', name: 'email', label: 'Email' },
      ],
    },
  ],
};

// ============================================
// SECCIÓN: FAQ / Preguntas Frecuentes
// ============================================
export const faqSection: Template = {
  name: 'faq',
  label: 'Preguntas Frecuentes',
  ui: {
    defaultItem: {
      title: 'Preguntas Frecuentes',
    },
  },
  fields: [
    {
      type: 'string',
      name: 'title',
      label: 'Título de la Sección',
    },
    {
      type: 'string',
      name: 'subtitle',
      label: 'Subtítulo',
    },
    {
      type: 'object',
      name: 'items',
      label: 'Preguntas',
      list: true,
      fields: [
        { type: 'string', name: 'question', label: 'Pregunta', required: true },
        { type: 'string', name: 'answer', label: 'Respuesta', ui: { component: 'textarea' }, required: true },
      ],
    },
  ],
};

// ============================================
// SECCIÓN: Galería de Imágenes
// ============================================
export const gallerySection: Template = {
  name: 'gallery',
  label: 'Galería de Imágenes',
  ui: {
    defaultItem: {
      title: 'Galería',
      layout: 'grid',
      columns: 3,
    },
  },
  fields: [
    {
      type: 'string',
      name: 'title',
      label: 'Título de la Sección',
    },
    {
      type: 'string',
      name: 'subtitle',
      label: 'Subtítulo',
    },
    {
      type: 'string',
      name: 'layout',
      label: 'Diseño',
      options: [
        { value: 'grid', label: 'Cuadrícula' },
        { value: 'masonry', label: 'Mosaico' },
        { value: 'slider', label: 'Slider' },
      ],
    },
    {
      type: 'number',
      name: 'columns',
      label: 'Columnas (para grid)',
    },
    {
      type: 'string',
      name: 'images',
      label: 'Imágenes',
      list: true,
      ui: {
        // @ts-ignore
        component: ImageGalleryField,
      },
    },
  ],
};

// ============================================
// SECCIÓN: Valores / Características
// ============================================
export const featuresSection: Template = {
  name: 'features',
  label: 'Valores / Características',
  ui: {
    defaultItem: {
      title: 'Nuestros Valores',
      layout: 'grid',
    },
  },
  fields: [
    {
      type: 'string',
      name: 'title',
      label: 'Título de la Sección',
    },
    {
      type: 'string',
      name: 'subtitle',
      label: 'Subtítulo',
    },
    {
      type: 'string',
      name: 'layout',
      label: 'Diseño',
      options: [
        { value: 'grid', label: 'Cuadrícula' },
        { value: 'list', label: 'Lista' },
        { value: 'cards', label: 'Tarjetas' },
      ],
    },
    {
      type: 'object',
      name: 'items',
      label: 'Características',
      list: true,
      fields: [
        { type: 'string', name: 'title', label: 'Título' },
        { type: 'string', name: 'description', label: 'Descripción', ui: { component: 'textarea' } },
        { type: 'string', name: 'icon', label: 'Icono' },
        {
          type: 'string',
          name: 'image',
          label: 'Imagen',
          ui: {
            // @ts-ignore
            component: ImagePreviewField,
          },
        },
      ],
    },
  ],
};

// ============================================
// SECCIÓN: Contenido Libre (Rich Text)
// ============================================
export const contentSection: Template = {
  name: 'content',
  label: 'Contenido Libre',
  fields: [
    {
      type: 'string',
      name: 'title',
      label: 'Título (opcional)',
    },
    {
      type: 'rich-text',
      name: 'body',
      label: 'Contenido',
    },
    {
      type: 'string',
      name: 'backgroundColor',
      label: 'Color de Fondo',
      options: [
        { value: 'white', label: 'Blanco' },
        { value: 'gray', label: 'Gris Claro' },
        { value: 'dark', label: 'Oscuro' },
        { value: 'primary', label: 'Color Principal' },
      ],
    },
    {
      type: 'string',
      name: 'maxWidth',
      label: 'Ancho Máximo',
      options: [
        { value: 'sm', label: 'Pequeño' },
        { value: 'md', label: 'Mediano' },
        { value: 'lg', label: 'Grande' },
        { value: 'full', label: 'Completo' },
      ],
    },
  ],
};

// ============================================
// SECCIÓN: Separador / Espaciador
// ============================================
export const spacerSection: Template = {
  name: 'spacer',
  label: 'Separador / Espaciador',
  fields: [
    {
      type: 'string',
      name: 'size',
      label: 'Tamaño',
      options: [
        { value: 'sm', label: 'Pequeño (32px)' },
        { value: 'md', label: 'Mediano (64px)' },
        { value: 'lg', label: 'Grande (96px)' },
        { value: 'xl', label: 'Extra Grande (128px)' },
      ],
    },
    {
      type: 'boolean',
      name: 'showDivider',
      label: 'Mostrar Línea Divisoria',
    },
  ],
};

// ============================================
// Exportar todos los templates con campos comunes
// ============================================

// Función helper para agregar campos comunes a cada template
const addCommonFields = (template: Template): Template => ({
  ...template,
  fields: [
    ...template.fields,
    ...animationFields,
    ...sectionConfigFields,
  ],
});

export const pageBlockTemplates = [
  addCommonFields(heroSection),
  addCommonFields(aboutSection),
  addCommonFields(servicesSection),
  addCommonFields(projectsSection),
  addCommonFields(testimonialsSection),
  addCommonFields(ctaSection),
  addCommonFields(contactSection),
  addCommonFields(teamSection),
  addCommonFields(faqSection),
  addCommonFields(gallerySection),
  addCommonFields(featuresSection),
  addCommonFields(contentSection),
  addCommonFields(spacerSection),
];
