// @ts-check
import { defineConfig } from 'astro/config';
import tailwind from "@astrojs/tailwind";
import icon from "astro-icon";
import alpinejs from "@astrojs/alpinejs";
import react from '@astrojs/react';
import tina from '@tinacms/astro/integration';
import netlify from '@astrojs/netlify';

// https://astro.build/config
export default defineConfig({
  adapter: netlify(),
  integrations: [
    tailwind(),
    react(), 
    icon({
      include: {
        ph: ["*"],
      },
    }),
    alpinejs(),
    tina()
  ],
  // Habilitar content collections
  experimental: {
    liveContentCollections: true
  },
  // Variables de entorno públicas
  vite: {
    define: {
      'import.meta.env.CLOUDINARY_CLOUD_NAME': JSON.stringify(process.env.CLOUDINARY_CLOUD_NAME || 'dt5y4fsst'),
    }
  }
});
