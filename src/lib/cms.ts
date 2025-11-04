// Utilidades para cargar datos del CMS
// Ejemplo de uso en componentes Astro

/**
 * Carga los datos de la página principal
 * @returns {Promise<Object>} Datos de home.json
 */
export async function getHomeData() {
  try {
    const data = await import('../data/home.json');
    return data.default || data;
  } catch (error) {
    console.error('Error loading home data:', error);
    return null;
  }
}

/**
 * Carga los datos de la página "Quiénes Somos"
 * @returns {Promise<Object>} Datos de about.json
 */
export async function getAboutData() {
  try {
    const data = await import('../data/about.json');
    return data.default || data;
  } catch (error) {
    console.error('Error loading about data:', error);
    return null;
  }
}

/**
 * Carga los datos de contacto
 * @returns {Promise<Object>} Datos de contact.json
 */
export async function getContactData() {
  try {
    const data = await import('../data/contact.json');
    return data.default || data;
  } catch (error) {
    console.error('Error loading contact data:', error);
    return null;
  }
}

/**
 * Carga la configuración general del sitio
 * @returns {Promise<Object>} Datos de settings.json
 */
export async function getSettingsData() {
  try {
    const data = await import('../data/settings.json');
    return data.default || data;
  } catch (error) {
    console.error('Error loading settings data:', error);
    return null;
  }
}

/**
 * Ejemplo de uso en un componente Astro:
 * 
 * ---
 * import { getHomeData } from '@/lib/cms';
 * const homeData = await getHomeData();
 * const { hero, about, testimonials } = homeData;
 * ---
 * 
 * <section>
 *   <h1>{hero.title}</h1>
 *   <p>{hero.subtitle}</p>
 * </section>
 */

export default {
  getHomeData,
  getAboutData,
  getContactData,
  getSettingsData
};
