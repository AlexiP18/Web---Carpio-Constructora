import { defineConfig } from 'tinacms';

export default defineConfig({
  branch: 'main',
  clientId: null,
  token: null,
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
      {
        name: 'proyectos',
        label: 'Proyectos',
        path: 'src/content/proyectos',
        format: 'md',
        fields: [
          {
            type: 'string',
            name: 'title',
            label: 'Título',
            required: true,
          },
          {
            type: 'string',
            name: 'slug',
            label: 'Slug',
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
            name: 'tags',
            label: 'Etiquetas',
            list: true,
          },
          {
            type: 'image',
            name: 'backgroundImage',
            label: 'Imagen Principal',
          },
          {
            type: 'image',
            name: 'images',
            label: 'Galería',
            list: true,
          },
          {
            type: 'rich-text',
            name: 'body',
            label: 'Contenido',
            isBody: true,
          },
        ],
      },
    ],
  },
});
