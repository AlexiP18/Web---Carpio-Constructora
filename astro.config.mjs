// @ts-check
import { defineConfig } from 'astro/config';
import tailwind from "@astrojs/tailwind";
import icon from "astro-icon";
import alpinejs from "@astrojs/alpinejs";
import react from '@astrojs/react';

// https://astro.build/config
export default defineConfig({
  integrations: [
    tailwind(),
    react(), 
    icon({
      include: {
        ph: ["*"],
      },
    }),
    alpinejs()
  ],
  // Habilitar content collections
  experimental: {
    liveContentCollections: true
  }
});
