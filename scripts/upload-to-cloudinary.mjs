/**
 * Script para subir imágenes a Cloudinary
 * 
 * Uso: node scripts/upload-to-cloudinary.mjs
 * 
 * Este script sube las imágenes de proyectos a Cloudinary
 * y genera un archivo JSON con las URLs para actualizar los .md
 */

import 'dotenv/config';
import { v2 as cloudinary } from 'cloudinary';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Configurar Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME || 'dt5y4fsst',
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Configuración
const CONFIG = {
  // Carpeta base de imágenes locales
  localBasePath: path.join(__dirname, '..', 'public', 'images', 'projects'),
  // Carpeta en Cloudinary
  cloudinaryFolder: 'carpio-constructora/projects',
  // Archivo de salida con las URLs
  outputFile: path.join(__dirname, '..', 'cloudinary-urls.json'),
  // Proyectos a migrar (vacío = todos)
  projectsToMigrate: [], // Ejemplo: ['casa_amaranto', 'casa_magna']
  // Extensiones de imagen válidas
  validExtensions: ['.webp', '.jpg', '.jpeg', '.png', '.gif'],
  // Opciones de upload
  uploadOptions: {
    resource_type: 'image',
    quality: 'auto:good',
    fetch_format: 'auto',
  },
};

/**
 * Obtiene todos los archivos de imagen en una carpeta recursivamente
 */
function getImageFiles(dir, files = []) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    
    if (entry.isDirectory()) {
      getImageFiles(fullPath, files);
    } else if (entry.isFile()) {
      const ext = path.extname(entry.name).toLowerCase();
      if (CONFIG.validExtensions.includes(ext)) {
        files.push(fullPath);
      }
    }
  }
  
  return files;
}

/**
 * Genera el public_id para Cloudinary basado en la ruta local
 */
function generatePublicId(localPath) {
  // Obtener ruta relativa desde la carpeta de proyectos
  const relativePath = path.relative(CONFIG.localBasePath, localPath);
  
  // Convertir a formato de Cloudinary (sin extensión, con /)
  const publicId = relativePath
    .replace(/\\/g, '/') // Windows paths
    .replace(/\.[^/.]+$/, ''); // Remover extensión
  
  return `${CONFIG.cloudinaryFolder}/${publicId}`;
}

/**
 * Sube una imagen a Cloudinary
 */
async function uploadImage(localPath) {
  const publicId = generatePublicId(localPath);
  
  try {
    console.log(`📤 Subiendo: ${path.basename(localPath)}`);
    
    const result = await cloudinary.uploader.upload(localPath, {
      ...CONFIG.uploadOptions,
      public_id: publicId,
      overwrite: true,
      invalidate: true,
    });
    
    console.log(`   ✅ Subido: ${result.secure_url}`);
    
    return {
      localPath: path.relative(path.join(__dirname, '..', 'public'), localPath).replace(/\\/g, '/'),
      publicId: result.public_id,
      url: result.secure_url,
      width: result.width,
      height: result.height,
      format: result.format,
      bytes: result.bytes,
    };
  } catch (error) {
    console.error(`   ❌ Error: ${error.message}`);
    return {
      localPath: localPath,
      error: error.message,
    };
  }
}

/**
 * Sube un video a Cloudinary
 */
async function uploadVideo(localPath) {
  const publicId = generatePublicId(localPath).replace(/\.[^/.]+$/, '');
  
  try {
    console.log(`🎬 Subiendo video: ${path.basename(localPath)}`);
    
    const result = await cloudinary.uploader.upload(localPath, {
      resource_type: 'video',
      public_id: publicId,
      overwrite: true,
      invalidate: true,
      eager: [
        { streaming_profile: 'hd', format: 'm3u8' }, // HLS streaming
        { format: 'mp4', quality: 'auto' }, // MP4 optimizado
      ],
      eager_async: true,
    });
    
    console.log(`   ✅ Video subido: ${result.secure_url}`);
    
    return {
      localPath: path.relative(path.join(__dirname, '..', 'public'), localPath).replace(/\\/g, '/'),
      publicId: result.public_id,
      url: result.secure_url,
      duration: result.duration,
      format: result.format,
      bytes: result.bytes,
    };
  } catch (error) {
    console.error(`   ❌ Error en video: ${error.message}`);
    return {
      localPath: localPath,
      error: error.message,
    };
  }
}

/**
 * Procesa todos los proyectos
 */
async function processProjects() {
  console.log('\n🚀 Iniciando migración a Cloudinary...\n');
  console.log(`📁 Carpeta origen: ${CONFIG.localBasePath}`);
  console.log(`☁️  Carpeta destino: ${CONFIG.cloudinaryFolder}\n`);
  
  // Verificar credenciales
  if (!process.env.CLOUDINARY_API_KEY || !process.env.CLOUDINARY_API_SECRET) {
    console.error('❌ Error: Faltan credenciales de Cloudinary');
    console.error('   Asegúrate de tener CLOUDINARY_API_KEY y CLOUDINARY_API_SECRET en .env');
    process.exit(1);
  }
  
  // Obtener lista de proyectos
  let projects = fs.readdirSync(CONFIG.localBasePath, { withFileTypes: true })
    .filter(entry => entry.isDirectory())
    .map(entry => entry.name);
  
  // Filtrar si hay proyectos específicos
  if (CONFIG.projectsToMigrate.length > 0) {
    projects = projects.filter(p => CONFIG.projectsToMigrate.includes(p));
  }
  
  console.log(`📋 Proyectos a procesar: ${projects.join(', ')}\n`);
  
  const results = {
    timestamp: new Date().toISOString(),
    cloudName: process.env.CLOUDINARY_CLOUD_NAME,
    projects: {},
  };
  
  for (const project of projects) {
    const projectPath = path.join(CONFIG.localBasePath, project);
    console.log(`\n📂 Procesando: ${project}`);
    console.log('─'.repeat(40));
    
    // Obtener todas las imágenes del proyecto
    const imageFiles = getImageFiles(projectPath);
    
    if (imageFiles.length === 0) {
      console.log('   ⚠️ No se encontraron imágenes');
      continue;
    }
    
    console.log(`   📸 ${imageFiles.length} imágenes encontradas`);
    
    results.projects[project] = {
      images: [],
      videos: [],
    };
    
    // Subir cada imagen
    for (const imagePath of imageFiles) {
      const result = await uploadImage(imagePath);
      results.projects[project].images.push(result);
      
      // Pequeña pausa para no saturar la API
      await new Promise(resolve => setTimeout(resolve, 200));
    }
    
    // Buscar videos
    const videoPath = path.join(projectPath, '0. multimedia');
    if (fs.existsSync(videoPath)) {
      const videoFiles = fs.readdirSync(videoPath)
        .filter(f => ['.mp4', '.mov', '.webm'].includes(path.extname(f).toLowerCase()));
      
      for (const videoFile of videoFiles) {
        const fullVideoPath = path.join(videoPath, videoFile);
        const result = await uploadVideo(fullVideoPath);
        results.projects[project].videos.push(result);
      }
    }
  }
  
  // Guardar resultados
  fs.writeFileSync(CONFIG.outputFile, JSON.stringify(results, null, 2));
  console.log(`\n✅ Migración completada!`);
  console.log(`📄 URLs guardadas en: ${CONFIG.outputFile}`);
  
  // Resumen
  let totalImages = 0;
  let totalVideos = 0;
  let totalErrors = 0;
  
  for (const project of Object.values(results.projects)) {
    totalImages += project.images.filter(i => !i.error).length;
    totalVideos += project.videos.filter(v => !v.error).length;
    totalErrors += project.images.filter(i => i.error).length + project.videos.filter(v => v.error).length;
  }
  
  console.log(`\n📊 Resumen:`);
  console.log(`   ✅ Imágenes subidas: ${totalImages}`);
  console.log(`   🎬 Videos subidos: ${totalVideos}`);
  if (totalErrors > 0) {
    console.log(`   ❌ Errores: ${totalErrors}`);
  }
}

// Ejecutar
processProjects().catch(console.error);
