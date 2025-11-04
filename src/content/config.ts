import { defineCollection, z } from 'astro:content';

// Schema para proyectos basado en ProjectData de proyectos.ts
const proyectosCollection = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    slug: z.string(),
    description: z.string(),
    tags: z.array(z.string()),
    backgroundImage: z.string(),
    images: z.array(z.string()).optional(),
    virtualTourVideo: z.string().optional(),
    testimonial: z.object({
      rating: z.number(),
      quote: z.string(),
      name: z.string(),
      position: z.string(),
      logo: z.string(),
      image: z.string(),
    }),
    testimonials: z.array(z.object({
      rating: z.number(),
      quote: z.string(),
      name: z.string(),
      position: z.string(),
      logo: z.string(),
      image: z.string(),
    })).optional(),
  })
});

// Schema para servicios basado en ServicePageData de servicios.ts
const serviciosCollection = defineCollection({
  type: 'content',
  schema: z.object({
    slug: z.string(),
    title: z.string(),
    subtitle: z.string(),
    description: z.string(),
    backgroundImage: z.string().optional(),
    service: z.object({
      name: z.string(),
      category: z.string(),
      tagline: z.string(),
      featuresTitle: z.string(),
      featuresDescription: z.string(),
      features: z.array(z.object({
        title: z.string(),
        description: z.string(),
        icon: z.string(),
      })),
      benefits: z.array(z.object({
        title: z.string(),
        description: z.string(),
        icon: z.string(),
      })),
      process: z.array(z.object({
        number: z.string(),
        title: z.string(),
        description: z.string(),
        icon: z.string(),
      })),
      testimonials: z.array(z.object({
        content: z.string(),
        author: z.string(),
        position: z.string(),
        rating: z.number(),
      })).optional(),
      faqs: z.array(z.object({
        question: z.string(),
        answer: z.string(),
      })).optional(),
    }),
  })
});

export const collections = {
  'proyectos': proyectosCollection,
  'servicios': serviciosCollection,
};