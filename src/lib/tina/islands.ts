import type { IslandRegistry } from '@tinacms/astro/experimental';
import type { QueryResult } from '@tinacms/astro/data';
import type { PaginasQuery, PaginasPruebaQuery, InicioPageQuery } from '../../../tina/__generated__/types';
import HomeBody from '../../components/islands/HomeBody.astro';
import PruebaBody from '../../components/islands/PruebaBody.astro';
import { getHome, getPrueba } from './data';

export const islands: IslandRegistry = {
  home: {
    fetch: (_request, _params) => getHome(),
    component: HomeBody,
    wrapper: { tag: 'main' },
    propsFromData: (data) => ({
      data: (data as QueryResult<InicioPageQuery>).data?.inicioPage,
    }),
  },
  prueba: {
    fetch: (_request, _params) => getPrueba(),
    component: PruebaBody,
    wrapper: { tag: 'div' },
    propsFromData: (data) => ({
      data: (data as QueryResult<PaginasPruebaQuery>).data?.paginasPrueba,
    }),
  },
};
