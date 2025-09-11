import { defineCollection, z } from 'astro:content';

const proyectosCollection = defineCollection({
  schema: z.object({
    title: z.string(),
    description: z.string(),
    image: z.string(),
    category: z.string(),
    date: z.date(),
  })
});

const serviciosCollection = defineCollection({
  schema: z.object({
    title: z.string(),
    description: z.string(),
    image: z.string(),
    icon: z.string().optional(),
  })
});

export const collections = {
  'proyectos': proyectosCollection,
  'servicios': serviciosCollection,
};