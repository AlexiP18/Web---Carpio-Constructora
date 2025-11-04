import type { ImageMetadata } from 'astro';

// Import Los Arrayanes de Ficoa images
import ficoaImage1 from '../assets/projects/arrayanes_ficoa/0_Vista_Exterior.jpg';
import ficoaImage2 from '../assets/projects/arrayanes_ficoa/1_Vista_Entrada.jpg';
import ficoaImage3 from '../assets/projects/arrayanes_ficoa/2_Sala.jpg';
import ficoaImage4 from '../assets/projects/arrayanes_ficoa/3_Comedor.jpg';
import ficoaImage5 from '../assets/projects/arrayanes_ficoa/4_Sala_de_Estar.jpg';
import ficoaImage6 from '../assets/projects/arrayanes_ficoa/5_Area_Recreacional.jpg';
import ficoaImage7 from '../assets/projects/arrayanes_ficoa/6_Segundo_Piso.jpg';
import ficoaImage8 from '../assets/projects/arrayanes_ficoa/7_Habitacion_Master.jpg';
import ficoaImage9 from '../assets/projects/arrayanes_ficoa/8_Habitacion_Simple.jpg';

// Import Los Arrayanes de Izamba images
import izambaImage1 from '../assets/projects/arrayanes_izamba/vista.png';
import izambaImage2 from '../assets/projects/arrayanes_izamba/sala1.png';
import izambaImage3 from '../assets/projects/arrayanes_izamba/sala2.png';
import izambaImage4 from '../assets/projects/arrayanes_izamba/comedor.png';
import izambaImage5 from '../assets/projects/arrayanes_izamba/cocina.png';
import izambaImage6 from '../assets/projects/arrayanes_izamba/habitacion1.png';
import izambaImage7 from '../assets/projects/arrayanes_izamba/habitacion2.png';
import izambaImage8 from '../assets/projects/arrayanes_izamba/bano.png';
import izambaImage9 from '../assets/projects/arrayanes_izamba/jardin.png';

// Import KEOPs images
import keopsImage1 from '../assets/projects/keops/0. Principal_Vertical.jpg';
import keopsImage2 from '../assets/projects/keops/1. Principal.jpg';
import keopsImage3 from '../assets/projects/keops/2. Lobby_Exterior.jpg';
import keopsImage4 from '../assets/projects/keops/3. Lobby_Interior.jpg';
import keopsImage5 from '../assets/projects/keops/4. Lobby_Panoramica.jpg';
import keopsImage6 from '../assets/projects/keops/5. Merchandising.jpg';
import keopsImage7 from '../assets/projects/keops/6. Vista_Merchandising.jpg';
import keopsImage8 from '../assets/projects/keops/7. Vista_Completa.jpg';
import keopsVideo from '../assets/projects/keops/KEOPS_VIDEOWEB.mov';

// Tipos para los datos de proyectos
export interface ProjectTestimonial {
  rating: number;
  quote: string;
  name: string;
  position: string;
  logo: string;
  image: string;
}

export interface ProjectData {
  slug: string;
  title: string;
  description: string;
  tags: string[];
  backgroundImage: string;
  content: string;
  images: ImageMetadata[];
  testimonial: ProjectTestimonial;
  testimonials: ProjectTestimonial[];
  virtualTourVideo?: string;
}

// Create image arrays for each project
const ficoaImages = [
  ficoaImage1, ficoaImage2, ficoaImage3, ficoaImage4, ficoaImage5,
  ficoaImage6, ficoaImage7, ficoaImage8, ficoaImage9
];

const izambaImages = [
  izambaImage1, izambaImage2, izambaImage3, izambaImage4, izambaImage5,
  izambaImage6, izambaImage7, izambaImage8, izambaImage9
];

const keopsImages = [
  keopsImage1, keopsImage2, keopsImage3, keopsImage4,
  keopsImage5, keopsImage6, keopsImage7, keopsImage8
];

// Datos de proyectos
export const proyectosData: ProjectData[] = [
  {
    slug: "los-arrayanes-de-ficoa",
    title: "Los Arrayanes de Ficoa",
    description: "Diseños de vivienda unifamiliar y multifamiliar que combinan funcionalidad y estética moderna.",
    tags: ["Residencial", "Vivienda Unifamiliar", "Vivienda Multifamiliar"],
    backgroundImage: ficoaImage1.src,
    content: `Los Arrayanes de Ficoa es un desarrollo residencial integral que ofrece diseños personalizados para viviendas unifamiliares y multifamiliares, adaptándose a las necesidades específicas de cada familia.

Este proyecto combina la funcionalidad moderna con espacios diseñados para el confort y la convivencia familiar. Cada vivienda ha sido cuidadosamente planificada para maximizar el uso del espacio, la iluminación natural y la ventilación.

Con un enfoque en la calidad de vida, Los Arrayanes de Ficoa incluye áreas recreacionales, zonas verdes y espacios comunes que fomentan la interacción entre vecinos. La ubicación estratégica en Ficoa proporciona fácil acceso a servicios, comercios y vías principales.

Los materiales de construcción son de primera calidad, garantizando durabilidad y bajo mantenimiento. El diseño arquitectónico contemporáneo se integra armoniosamente con el entorno, creando un ambiente residencial atractivo y funcional.

Este proyecto representa la evolución del concepto de vivienda moderna en Ecuador, donde cada detalle ha sido pensado para ofrecer la mejor experiencia de vida a sus residentes.`,
    images: ficoaImages,
    testimonial: {
      rating: 5,
      quote: "La calidad de construcción y atención al detalle en Los Arrayanes de Ficoa es excepcional.",
      name: "María Rodríguez",
      position: "Propietaria, Los Arrayanes",
      logo: "/images/logo-placeholder.svg",
      image: "/images/placeholder-image.jpg"
    },
    testimonials: [
      {
        rating: 5,
        quote: "La calidad de construcción y atención al detalle en Los Arrayanes de Ficoa es excepcional.",
        name: "María Rodríguez",
        position: "Propietaria, Los Arrayanes",
        logo: "/images/logo-placeholder.svg",
        image: "/images/placeholder-image.jpg"
      },
      {
        rating: 5,
        quote: "Un desarrollo residencial que supera las expectativas. Diseño funcional y moderno.",
        name: "Jorge Pérez",
        position: "Residente, Los Arrayanes de Ficoa",
        logo: "/images/logo-placeholder.svg",
        image: "/images/placeholder-image.jpg"
      }
    ]
  },
  {
    slug: "los-arrayanes-de-izamba",
    title: "Los Arrayanes de Izamba",
    description: "Conjunto habitacional diseñado para ofrecer calidad de vida y espacios funcionales para toda la familia.",
    tags: ["Conjunto Habitacional", "Residencial", "Áreas Comunes"],
    backgroundImage: izambaImage1.src,
    content: `Los Arrayanes de Izamba es un conjunto habitacional moderno que redefine el concepto de comunidad residencial en Ecuador. Este proyecto ofrece viviendas diseñadas con espacios amplios y funcionales para el disfrute de toda la familia.

El conjunto habitacional cuenta con áreas recreacionales, zonas verdes, y espacios comunes que promueven la convivencia y el bienestar de sus residentes. Cada unidad ha sido diseñada pensando en la comodidad y la eficiencia espacial.

Ubicado en Izamba, este proyecto combina la tranquilidad de una zona residencial con la cercanía a servicios esenciales, centros educativos y comerciales. La seguridad es una prioridad, con sistemas de control de acceso y vigilancia.

Los materiales de construcción utilizados garantizan durabilidad y confort térmico, mientras que el diseño arquitectónico contemporáneo crea un ambiente armonioso y acogedor. Las áreas comunes incluyen jardines, parques infantiles y espacios para eventos sociales.

Los Arrayanes de Izamba es más que un lugar para vivir, es una comunidad donde las familias pueden crecer y crear recuerdos duraderos en un entorno seguro y agradable.`,
    images: izambaImages,
    testimonial: {
      rating: 5,
      quote: "Un conjunto habitacional excepcional con excelentes áreas comunes y seguridad.",
      name: "Carlos Martínez",
      position: "Propietario, Los Arrayanes de Izamba",
      logo: "/images/logo-placeholder.svg",
      image: "/images/placeholder-image.jpg"
    },
    testimonials: [
      {
        rating: 5,
        quote: "Un conjunto habitacional excepcional con excelentes áreas comunes y seguridad.",
        name: "Carlos Martínez",
        position: "Propietario, Los Arrayanes de Izamba",
        logo: "/images/logo-placeholder.svg",
        image: "/images/placeholder-image.jpg"
      },
      {
        rating: 5,
        quote: "La mejor decisión fue elegir Los Arrayanes de Izamba. Calidad y confort garantizados.",
        name: "Ana González",
        position: "Residente, Los Arrayanes de Izamba",
        logo: "/images/logo-placeholder.svg",
        image: "/images/placeholder-image.jpg"
      }
    ]
  },
  {
    slug: "keops",
    title: "KEOPs",
    description: "Diseños Retail innovadores que maximizan la experiencia de compra y el flujo de clientes.",
    tags: ["Retail", "Comercial", "Diseño Innovador"],
    backgroundImage: keopsImage2.src,
    virtualTourVideo: typeof keopsVideo === 'string' ? keopsVideo : keopsVideo,
    content: `KEOPs es un proyecto de diseño retail que revoluciona la experiencia comercial en Ecuador. Este desarrollo combina arquitectura moderna con funcionalidad estratégica para crear espacios comerciales que potencian las ventas y mejoran la experiencia del cliente.

El diseño de KEOPs se centra en la optimización del flujo de clientes, la maximización de espacios de exhibición y la creación de ambientes atractivos que invitan a la compra. Cada área ha sido planificada considerando las mejores prácticas del retail moderno.

Los espacios incluyen áreas de merchandising estratégicamente ubicadas, lobby amplios y funcionales, y diseños flexibles que se adaptan a diferentes tipos de comercio. La iluminación, los acabados y la distribución espacial crean un ambiente comercial premium.

KEOPs incorpora tecnología y diseño sostenible para reducir costos operativos y crear espacios eficientes energéticamente. El proyecto se destaca por su versatilidad, permitiendo adaptarse a las necesidades específicas de cada marca o comercio.

Este proyecto representa el futuro del retail en Ecuador, donde el diseño inteligente y la funcionalidad se combinan para crear espacios comerciales exitosos y rentables.`,
    images: keopsImages,
    testimonial: {
      rating: 5,
      quote: "KEOPs transformó nuestra visión de espacio comercial. Diseño excepcional y funcional.",
      name: "Roberto Silva",
      position: "Gerente General, Retail Group",
      logo: "/images/logo-placeholder.svg",
      image: "/images/placeholder-image.jpg"
    },
    testimonials: [
      {
        rating: 5,
        quote: "KEOPs transformó nuestra visión de espacio comercial. Diseño excepcional y funcional.",
        name: "Roberto Silva",
        position: "Gerente General, Retail Group",
        logo: "/images/logo-placeholder.svg",
        image: "/images/placeholder-image.jpg"
      },
      {
        rating: 5,
        quote: "Un proyecto retail que entiende las necesidades del comercio moderno. Altamente recomendado.",
        name: "Patricia Vega",
        position: "Directora de Operaciones, Comercial Ecuador",
        logo: "/images/logo-placeholder.svg",
        image: "/images/placeholder-image.jpg"
      }
    ]
  }
];
