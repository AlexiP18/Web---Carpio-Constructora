import { client } from '../../../tina/__generated__/client';
import { requestWithMetadata } from '@tinacms/astro';

export const getHome = () =>
  requestWithMetadata(
    client.queries.paginas({ relativePath: 'inicio.json' }),
    { priority: 'primary' }
  );
