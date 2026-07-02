import { createClient } from "tinacms/dist/client";
import { queries } from "./types";
export const client = createClient({ cacheDir: '/home/joelpp/Escritorio/Web---Carpio-Constructora/tina/__generated__/.cache/1783006547892', url: 'http://localhost:4001/graphql', token: 'undefined', queries,  });
export default client;
  