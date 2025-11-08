// tina/config.ts
import { defineConfig } from "tinacms";
var config_default = defineConfig({
  branch: "main",
  clientId: null,
  token: null,
  build: {
    outputFolder: "admin",
    publicFolder: "public"
  },
  media: {
    tina: {
      mediaRoot: "images",
      publicFolder: "public"
    }
  },
  schema: {
    collections: [
      {
        name: "proyectos",
        label: "Proyectos",
        path: "src/content/proyectos",
        format: "md",
        fields: [
          {
            type: "string",
            name: "title",
            label: "T\xEDtulo",
            required: true
          },
          {
            type: "string",
            name: "slug",
            label: "Slug"
          },
          {
            type: "string",
            name: "description",
            label: "Descripci\xF3n",
            ui: {
              component: "textarea"
            }
          },
          {
            type: "string",
            name: "tags",
            label: "Etiquetas",
            list: true
          },
          {
            type: "image",
            name: "backgroundImage",
            label: "Imagen Principal"
          },
          {
            type: "image",
            name: "images",
            label: "Galer\xEDa",
            list: true
          },
          {
            type: "rich-text",
            name: "body",
            label: "Contenido",
            isBody: true
          }
        ]
      }
    ]
  }
});
export {
  config_default as default
};
