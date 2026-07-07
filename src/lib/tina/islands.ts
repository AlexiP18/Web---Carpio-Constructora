import type { IslandRegistry } from '@tinacms/astro/experimental';
import type { QueryResult } from '@tinacms/astro/data';
import type { PaginasQuery } from '../../../tina/__generated__/types';
import HomeBody from '../../components/islands/HomeBody.astro';
import { getHome } from './data';

export const islands: IslandRegistry = {
  home: {
    fetch: (_request, _params) => getHome(),
    component: HomeBody,
    wrapper: { tag: 'main' },
    propsFromData: (data) => ({
      data: (data as QueryResult<PaginasQuery>).data?.paginas,
    }),
  },
};
