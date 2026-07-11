import { createClient } from 'tinacms/dist/client';
import { queries } from '../../../tina/__generated__/types';
import { requestWithMetadata } from '@tinacms/astro';

// Detectar si está en entorno de producción
const isProd = typeof process !== 'undefined'
  ? (process.env.NODE_ENV === 'production' || process.env.NETLIFY === 'true')
  : import.meta.env.PROD;

// Función para evitar el reemplazo estático de Vite durante el build
const getDynamicEnv = (key: string): string | undefined => {
  if (typeof process !== 'undefined' && process.env) {
    return process.env[key];
  }
  return undefined;
};

const clientId = getDynamicEnv('TINA_PUBLIC_CLIENT_ID') || getDynamicEnv('PUBLIC_TINA_CLIENT_ID');
const token = getDynamicEnv('TINA_TOKEN');
const branch = getDynamicEnv('TINA_BRANCH') || getDynamicEnv('HEAD') || 'main';

// Usar endpoint de Tina Cloud en producción, o local en desarrollo
const url = isProd && clientId
  ? `https://content.tinajs.io/content/${clientId}/github/${branch}`
  : 'http://localhost:4001/graphql';

export const customClient = createClient({
  url,
  token,
  queries,
});

// Logs útiles para las funciones de servidor
export const logClientConfig = () => {
  console.log(`[Tina Client Debug] isProd: ${isProd}`);
  console.log(`[Tina Client Debug] clientId configurado: ${clientId ? 'SÍ (longitud: ' + clientId.length + ')' : 'NO'}`);
  console.log(`[Tina Client Debug] token configurado: ${token ? 'SÍ (longitud: ' + token.length + ')' : 'NO'}`);
  console.log(`[Tina Client Debug] branch configurado: ${branch}`);
  console.log(`[Tina Client Debug] URL final: ${url}`);
};

export const getHome = () =>
  requestWithMetadata(
    customClient.queries.paginas({ relativePath: 'inicio.json' }),
    { priority: 'primary' }
  );

export const getPrueba = () =>
  requestWithMetadata(
    customClient.queries.paginasPrueba({ relativePath: 'prueba.json' }),
    { priority: 'primary' }
  );
