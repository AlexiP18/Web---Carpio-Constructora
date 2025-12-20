/**
 * Script para subir videos a Cloudinary
 * 
 * Uso: node scripts/upload-video-to-cloudinary.mjs <ruta-del-video>
 * Ejemplo: node scripts/upload-video-to-cloudinary.mjs src/assets/videos/tour-proyecto.mp4
 */

import 'dotenv/config';
import { v2 as cloudinary } from 'cloudinary';
import path from 'path';

// Configurar Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

async function uploadVideo(videoPath) {
  const fileName = path.basename(videoPath, path.extname(videoPath));
  
  console.log(`\n📹 Subiendo video: ${videoPath}`);
  console.log(`   Nombre: ${fileName}`);
  
  try {
    const result = await cloudinary.uploader.upload(videoPath, {
      resource_type: 'video',
      folder: 'constructora-carpio/videos',
      public_id: fileName,
      overwrite: true,
      // Optimizaciones automáticas
      eager: [
        { format: 'mp4', video_codec: 'h264' },
        { format: 'webm', video_codec: 'vp9' }
      ],
      eager_async: true,
    });
    
    console.log(`\n✅ Video subido exitosamente!`);
    console.log(`\n📋 URLs del video:`);
    console.log(`   Original: ${result.secure_url}`);
    console.log(`   MP4 optimizado: ${result.secure_url.replace('/upload/', '/upload/f_mp4,vc_h264/')}`);
    console.log(`   WebM: ${result.secure_url.replace('/upload/', '/upload/f_webm,vc_vp9/')}`);
    console.log(`\n📌 Public ID: ${result.public_id}`);
    console.log(`   Duración: ${result.duration} segundos`);
    console.log(`   Tamaño: ${(result.bytes / 1024 / 1024).toFixed(2)} MB`);
    
    console.log(`\n🎯 Para usar en ProjectVideo.astro:`);
    console.log(`   <ProjectVideo videoUrl="${result.secure_url}" />`);
    
    return result;
  } catch (error) {
    console.error(`\n❌ Error subiendo video:`, error.message);
    throw error;
  }
}

// Obtener ruta del video desde argumentos
const videoPath = process.argv[2];

if (!videoPath) {
  console.log(`
📹 Script para subir videos a Cloudinary

Uso:
  node scripts/upload-video-to-cloudinary.mjs <ruta-del-video>

Ejemplos:
  node scripts/upload-video-to-cloudinary.mjs src/assets/videos/tour.mp4
  node scripts/upload-video-to-cloudinary.mjs C:/Videos/proyecto-demo.mov
  node scripts/upload-video-to-cloudinary.mjs ./mi-video.mp4

Formatos soportados: mp4, mov, avi, webm, mkv
  `);
  process.exit(0);
}

// Ejecutar
uploadVideo(videoPath);
