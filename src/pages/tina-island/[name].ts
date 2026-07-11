import type { APIRoute } from 'astro';
import { experimental_createIslandRoute } from '@tinacms/astro/experimental';
import { islands } from '../../lib/tina/islands';
import { logClientConfig } from '../../lib/tina/data';

export const prerender = false;

// Envolver la ruta original de la isla de TinaCMS
const baseRoute = experimental_createIslandRoute(islands);

export const ALL: APIRoute = async (context) => {
  console.log(`\n--- [Tina Island SSR Request: ${context.params.name}] ---`);
  logClientConfig();
  
  try {
    const response = await baseRoute(context);
    console.log(`[Tina Island SSR Response] status: ${response.status}`);
    return response;
  } catch (error) {
    console.error(`[Tina Island SSR Error]`, error);
    throw error;
  }
};
