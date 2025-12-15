/**
 * Cloudinary Configuration for Astro
 * 
 * Utilidades para generar URLs optimizadas de Cloudinary
 */

// Configuración desde variables de entorno
const CLOUD_NAME = import.meta.env.CLOUDINARY_CLOUD_NAME || 'dt5y4fsst';

export interface CloudinaryTransformOptions {
  width?: number;
  height?: number;
  crop?: 'fill' | 'fit' | 'scale' | 'crop' | 'thumb' | 'auto';
  quality?: 'auto' | 'auto:low' | 'auto:eco' | 'auto:good' | 'auto:best' | number;
  format?: 'auto' | 'webp' | 'avif' | 'jpg' | 'png';
  gravity?: 'auto' | 'face' | 'faces' | 'center' | 'north' | 'south' | 'east' | 'west';
  effect?: string;
  blur?: number;
  dpr?: 'auto' | number;
}

/**
 * Genera una URL de Cloudinary con transformaciones
 * 
 * @param publicId - El ID público del recurso en Cloudinary (ej: "projects/casa_amaranto/exterior_1")
 * @param options - Opciones de transformación
 * @returns URL optimizada de Cloudinary
 * 
 * @example
 * // Imagen básica
 * getCloudinaryUrl('projects/keops/lobby', { width: 800 })
 * 
 * // Imagen con múltiples transformaciones
 * getCloudinaryUrl('projects/casa_amaranto/hero', {
 *   width: 1200,
 *   height: 600,
 *   crop: 'fill',
 *   quality: 'auto',
 *   format: 'auto'
 * })
 */
export function getCloudinaryUrl(publicId: string, options: CloudinaryTransformOptions = {}): string {
  const {
    width,
    height,
    crop = 'fill',
    quality = 'auto',
    format = 'auto',
    gravity,
    effect,
    blur,
    dpr = 'auto',
  } = options;

  // Construir transformaciones
  const transforms: string[] = [];
  
  if (width) transforms.push(`w_${width}`);
  if (height) transforms.push(`h_${height}`);
  if (crop) transforms.push(`c_${crop}`);
  if (quality) transforms.push(`q_${quality}`);
  if (format) transforms.push(`f_${format}`);
  if (gravity) transforms.push(`g_${gravity}`);
  if (effect) transforms.push(`e_${effect}`);
  if (blur) transforms.push(`e_blur:${blur}`);
  if (dpr) transforms.push(`dpr_${dpr}`);

  const transformString = transforms.join(',');
  
  return `https://res.cloudinary.com/${CLOUD_NAME}/image/upload/${transformString}/${publicId}`;
}

/**
 * Genera una URL de video de Cloudinary con transformaciones
 */
export function getCloudinaryVideoUrl(publicId: string, options: CloudinaryTransformOptions = {}): string {
  const {
    width,
    height,
    quality = 'auto',
    format,
  } = options;

  const transforms: string[] = [];
  
  if (width) transforms.push(`w_${width}`);
  if (height) transforms.push(`h_${height}`);
  if (quality) transforms.push(`q_${quality}`);
  if (format) transforms.push(`f_${format}`);

  const transformString = transforms.length > 0 ? transforms.join(',') + '/' : '';
  
  return `https://res.cloudinary.com/${CLOUD_NAME}/video/upload/${transformString}${publicId}`;
}

/**
 * Genera un poster (thumbnail) de un video
 */
export function getVideoPosterUrl(publicId: string, options: CloudinaryTransformOptions = {}): string {
  const transforms = [
    'so_0', // Start offset 0 (primer frame)
    options.width ? `w_${options.width}` : 'w_800',
    options.height ? `h_${options.height}` : '',
    'c_fill',
    'q_auto',
    'f_auto',
  ].filter(Boolean).join(',');

  return `https://res.cloudinary.com/${CLOUD_NAME}/video/upload/${transforms}/${publicId}.jpg`;
}

/**
 * Genera srcset para imágenes responsivas
 */
export function getResponsiveSrcset(publicId: string, sizes: number[] = [400, 800, 1200, 1600]): string {
  return sizes
    .map(size => {
      const url = getCloudinaryUrl(publicId, { width: size, quality: 'auto', format: 'auto' });
      return `${url} ${size}w`;
    })
    .join(', ');
}

/**
 * Genera URL con placeholder blur para lazy loading
 */
export function getBlurPlaceholder(publicId: string): string {
  return getCloudinaryUrl(publicId, {
    width: 50,
    quality: 'auto:low',
    format: 'auto',
    blur: 1000,
  });
}

/**
 * Detecta si una URL es de Cloudinary
 */
export function isCloudinaryUrl(url: string): boolean {
  return url.includes('cloudinary.com') || url.includes('res.cloudinary.com');
}

/**
 * Detecta si es una URL local
 */
export function isLocalUrl(url: string): boolean {
  return url.startsWith('/') || url.startsWith('./');
}

/**
 * Obtiene la URL optimizada (Cloudinary o local)
 * Útil para transición gradual
 */
export function getOptimizedImageUrl(
  src: string, 
  options: CloudinaryTransformOptions = {}
): string {
  // Si ya es URL de Cloudinary, añadir transformaciones
  if (isCloudinaryUrl(src)) {
    // Extraer public_id y añadir transformaciones
    const match = src.match(/\/upload\/(?:v\d+\/)?(.+)$/);
    if (match) {
      return getCloudinaryUrl(match[1], options);
    }
  }
  
  // Si es URL local, mantener como está (para transición gradual)
  if (isLocalUrl(src)) {
    return src;
  }
  
  // Si es un public_id directo
  return getCloudinaryUrl(src, options);
}
