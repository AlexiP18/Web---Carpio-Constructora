import { createClient } from 'tinacms/dist/client';
import { queries } from '../../../tina/__generated__/types';
import { requestWithMetadata } from '@tinacms/astro';

// Detectar si está en entorno de producción
const isProd = typeof process !== 'undefined'
  ? (process.env.NODE_ENV === 'production' || process.env.NETLIFY === 'true')
  : import.meta.env.PROD;

const clientId = typeof process !== 'undefined'
  ? process.env.TINA_PUBLIC_CLIENT_ID
  : import.meta.env.PUBLIC_TINA_CLIENT_ID;

const token = typeof process !== 'undefined'
  ? process.env.TINA_TOKEN
  : import.meta.env.TINA_TOKEN;

const branch = typeof process !== 'undefined'
  ? (process.env.TINA_BRANCH || process.env.HEAD || 'main')
  : (import.meta.env.TINA_BRANCH || 'main');

// Usar endpoint de Tina Cloud en producción, o local en desarrollo
const url = isProd && clientId
  ? `https://content.tinajs.io/content/${clientId}/github/${branch}`
  : 'http://localhost:4001/graphql';

export const customClient = createClient({
  url,
  token,
  queries,
});

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
