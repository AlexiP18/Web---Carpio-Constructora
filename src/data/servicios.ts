// Tipos para los datos de servicios
export interface ServiceFeature {
  title: string;
  description: string;
  icon: string;
}

export interface ServiceBenefit {
  title: string;
  description: string;
  icon: string;
}

export interface ServiceStep {
  number: string;
  title: string;
  description: string;
  icon: string;
}

export interface ServiceTestimonial {
  content: string;
  author: string;
  position: string;
  rating: number;
}

export interface ServiceFAQ {
  question: string;
  answer: string;
}

export interface ServiceData {
  name: string;
  category: string;
  tagline: string;
  featuresTitle: string;
  featuresDescription: string;
  features: ServiceFeature[];
  benefits: ServiceBenefit[];
  process: ServiceStep[];
  testimonials: ServiceTestimonial[];
  faqs: ServiceFAQ[];
}

export interface ServicePageData {
  slug: string;
  title: string;
  subtitle: string;
  description: string;
  backgroundImage?: string;
  service: ServiceData;
}

// Datos de servicios
export const serviciosData: ServicePageData[] = [
  {
    slug: 'construccion',
    title: 'Innovación en Construcción',
    subtitle: 'Construcción',
    description: 'Transformamos tus ideas en realidad con soluciones constructivas de alta calidad y eficiencia.',
    backgroundImage: '/images/construccion-hero.jpg',
    service: {
      name: 'Servicio de Construcción',
      category: 'Construcción',
      tagline: 'CALIDAD',
      featuresTitle: 'Características Destacadas de Nuestro Servicio de Construcción',
      featuresDescription: 'Nuestro servicio de construcción se distingue por su enfoque en la calidad y la atención al detalle. Nos aseguramos de que cada proyecto cumpla con los más altos estándares de excelencia.',
      features: [
        {
          title: 'Compromiso con la Sostenibilidad',
          description: 'Implementamos prácticas sostenibles en cada etapa del proceso.',
          icon: 'ph:leaf'
        },
        {
          title: 'Equipo de Profesionales Altamente Capacitados',
          description: 'Nuestro equipo está compuesto por expertos en la industria.',
          icon: 'ph:users'
        },
        {
          title: 'Atención Personalizada para Cada Cliente',
          description: 'Nos adaptamos a las necesidades específicas de nuestros clientes.',
          icon: 'ph:handshake'
        }
      ],
      benefits: [
        {
          title: 'Construcción Sostenible',
          description: 'Materiales eco-friendly y técnicas que respetan el medio ambiente.',
          icon: 'ph:leaf'
        },
        {
          title: 'Eficiencia Energética',
          description: 'Diseños que optimizan el consumo energético y reducen costos.',
          icon: 'ph:lightning'
        }
      ],
      process: [
        {
          number: '01',
          title: 'Evaluación Inicial',
          description: 'Comenzamos con una reunión inicial para conocer las necesidades y expectativas del cliente.',
          icon: 'ph:magnifying-glass'
        },
        {
          number: '02',
          title: 'Reconocimiento del espacio',
          description: 'Analizamos el sitio y definimos los requisitos del proyecto.',
          icon: 'ph:blueprint'
        },
        {
          number: '03',
          title: 'Diseño y Planificación',
          description: 'Creamos planos detallados y cronogramas de trabajo.',
          icon: 'ph:blueprint'
        },
        {
          number: '04',
          title: 'Construcción',
          description: 'Ejecutamos el proyecto con supervisión constante de calidad.',
          icon: 'ph:hammer'
        }
      ],
      testimonials: [
        {
          content: 'Excelente trabajo, cumplieron con todos nuestros requisitos.',
          author: 'Juan Pérez',
          position: 'Propietario',
          rating: 5
        },
        {
          content: 'Un equipo profesional que cumplió con los plazos acordados.',
          author: 'María López',
          position: 'Directora, Inmobiliaria ABC',
          rating: 5
        },
        {
          content: 'Recomiendo sus servicios sin dudarlo.',
          author: 'Carlos Ruiz',
          position: 'Propietario, Negocios 123',
          rating: 5
        }
      ],
      faqs: [
        {
          question: '¿Cuánto tiempo toma un proyecto de construcción?',
          answer: 'El tiempo de ejecución depende del tipo de proyecto. Generalmente, un proyecto puede tardar entre 3 a 6 meses. Sin embargo, siempre trabajamos para cumplir con los plazos establecidos.'
        },
        {
          question: '¿Qué materiales utilizan?',
          answer: 'Utilizamos materiales de alta calidad que cumplen con las normativas de seguridad. Nuestros proveedores son seleccionados cuidadosamente para garantizar durabilidad y sostenibilidad.'
        },
        {
          question: '¿Ofrecen garantía en sus proyectos?',
          answer: 'Sí, ofrecemos garantía en todos nuestros proyectos. La duración y condiciones de la garantía varían según el tipo de trabajo realizado.'
        }
      ]
    }
  },
  {
    slug: 'remodelacion',
    title: 'Remodelación Integral',
    subtitle: 'Remodelación',
    description: 'Renovamos y transformamos espacios existentes con diseños modernos y funcionales.',
    backgroundImage: '/images/remodelacion-hero.jpg',
    service: {
      name: 'Servicio de Remodelación',
      category: 'Remodelación',
      tagline: 'RENOVACIÓN',
      featuresTitle: 'Características Destacadas de Nuestro Servicio de Remodelación',
      featuresDescription: 'Nuestro servicio de remodelación combina creatividad y funcionalidad para transformar espacios según tus necesidades.',
      features: [
        {
          title: 'Diseños Modernos y Funcionales',
          description: 'Creamos espacios que combinan estética y practicidad.',
          icon: 'ph:palette'
        },
        {
          title: 'Optimización de Espacios',
          description: 'Maximizamos el potencial de cada área de tu hogar o negocio.',
          icon: 'ph:layout'
        },
        {
          title: 'Materiales de Alta Calidad',
          description: 'Utilizamos los mejores materiales para garantizar durabilidad.',
          icon: 'ph:diamond'
        }
      ],
      benefits: [
        {
          title: 'Renovación Completa',
          description: 'Transformamos espacios existentes con diseños modernos.',
          icon: 'ph:house'
        },
        {
          title: 'Optimización Funcional',
          description: 'Mejoramos la funcionalidad y flujo de tus espacios.',
          icon: 'ph:arrows-clockwise'
        }
      ],
      process: [
        {
          number: '01',
          title: 'Evaluación del Espacio',
          description: 'Analizamos el estado actual y las posibilidades de mejora.',
          icon: 'ph:magnifying-glass'
        },
        {
          number: '02',
          title: 'Propuesta de Diseño',
          description: 'Desarrollamos conceptos que maximicen el potencial del espacio.',
          icon: 'ph:lightbulb'
        },
        {
          number: '03',
          title: 'Ejecución',
          description: 'Llevamos a cabo la remodelación con mínimas interrupciones.',
          icon: 'ph:wrench'
        }
      ],
      testimonials: [
        {
          content: 'Transformaron completamente nuestro hogar, superó nuestras expectativas.',
          author: 'Ana García',
          position: 'Propietaria',
          rating: 5
        },
        {
          content: 'Excelente atención al detalle y cumplimiento de tiempos.',
          author: 'Roberto Silva',
          position: 'Gerente de Oficina',
          rating: 5
        }
      ],
      faqs: [
        {
          question: '¿Puedo vivir en casa durante la remodelación?',
          answer: 'Dependiendo del alcance de la remodelación, en muchos casos es posible. Coordinamos para minimizar las molestias y mantener áreas habitables.'
        },
        {
          question: '¿Qué incluye el servicio de remodelación?',
          answer: 'Incluye diseño, demolición si es necesaria, construcción, instalaciones eléctricas y sanitarias, acabados y limpieza final.'
        },
        {
          question: '¿Manejan los permisos necesarios?',
          answer: 'Sí, nos encargamos de todos los trámites y permisos necesarios para que no tengas que preocuparte por nada.'
        }
      ]
    }
  },
  {
    slug: 'diseno-arquitectonico',
    title: 'Diseño Arquitectónico',
    subtitle: 'Diseño Arquitectónico',
    description: 'Creamos proyectos arquitectónicos personalizados que transforman tus ideas en planos profesionales.',
    service: {
      name: 'Servicio de Diseño Arquitectónico',
      category: 'Diseño Arquitectónico',
      tagline: 'DISEÑO',
      featuresTitle: 'Características Destacadas de Nuestro Servicio de Diseño Arquitectónico',
      featuresDescription: 'Nuestro servicio de diseño arquitectónico combina creatividad, funcionalidad y experiencia técnica.',
      features: [
        {
          title: 'Proyectos Personalizados',
          description: 'Diseños únicos adaptados a tus necesidades específicas.',
          icon: 'ph:pencil-ruler'
        },
        {
          title: 'Renderizados 3D Realistas',
          description: 'Visualiza tu proyecto antes de construirlo.',
          icon: 'ph:cube'
        },
        {
          title: 'Asesoría Técnica Profesional',
          description: 'Acompañamiento experto en cada etapa del diseño.',
          icon: 'ph:chats-circle'
        }
      ],
      benefits: [
        {
          title: 'Diseño Innovador',
          description: 'Soluciones arquitectónicas modernas y funcionales.',
          icon: 'ph:lightbulb'
        },
        {
          title: 'Optimización de Espacios',
          description: 'Aprovechamiento máximo de cada metro cuadrado.',
          icon: 'ph:layout'
        }
      ],
      process: [
        {
          number: '01',
          title: 'Consulta Inicial',
          description: 'Conocemos tus ideas, necesidades y expectativas del proyecto.',
          icon: 'ph:handshake'
        },
        {
          number: '02',
          title: 'Desarrollo de Diseño',
          description: 'Creamos propuestas con planos y renderizados detallados.',
          icon: 'ph:pencil-line'
        },
        {
          number: '03',
          title: 'Entrega de Documentación',
          description: 'Proporcionamos planos técnicos completos listos para construcción.',
          icon: 'ph:file-text'
        }
      ],
      testimonials: [
        {
          content: 'El diseño superó todas nuestras expectativas, muy profesional.',
          author: 'Patricia González',
          position: 'Propietaria',
          rating: 5
        },
        {
          content: 'Excelente asesoría y atención a nuestras necesidades específicas.',
          author: 'Miguel Torres',
          position: 'Director de Proyecto',
          rating: 5
        }
      ],
      faqs: [
        {
          question: '¿Cuánto tiempo toma el proceso de diseño?',
          answer: 'El tiempo varía según la complejidad del proyecto, generalmente entre 2 a 4 semanas para un diseño completo con renderizados.'
        },
        {
          question: '¿Qué incluye el servicio de diseño?',
          answer: 'Incluye planos arquitectónicos, renderizados 3D, especificaciones técnicas y asesoría durante el proceso de diseño.'
        },
        {
          question: '¿Pueden adaptar diseños existentes?',
          answer: 'Sí, podemos trabajar sobre diseños previos para mejorarlos o adaptarlos a nuevas necesidades y normativas.'
        }
      ]
    }
  }
];
