/**
 * Script para actualizar archivos .md con URLs de Cloudinary
 * 
 * Uso: node scripts/update-md-with-cloudinary.mjs
 * 
 * Este script lee cloudinary-urls.json y actualiza los archivos .md
 * reemplazando las rutas locales por URLs de Cloudinary
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Configuración
const CONFIG = {
  urlsFile: path.join(__dirname, '..', 'cloudinary-urls.json'),
  proyectosPath: path.join(__dirname, '..', 'src', 'content', 'proyectos'),
  cloudName: 'dt5y4fsst',
  // Modo: 'preview' solo muestra cambios, 'apply' los aplica
  mode: process.argv.includes('--apply') ? 'apply' : 'preview',
};

/**
 * Genera URL optimizada de Cloudinary para usar en los .md
 */
function generateOptimizedUrl(publicId, options = {}) {
  const { width = 1200, quality = 'auto', format = 'auto' } = options;
  return `https://res.cloudinary.com/${CONFIG.cloudName}/image/upload/w_${width},q_${quality},f_${format}/${publicId}`;
}

/**
 * Mapea ruta local a public_id de Cloudinary
 */
function localPathToPublicId(localPath, urlsData) {
  // Normalizar la ruta - remover / inicial y barras inversas
  const normalizedPath = localPath.replace(/\\/g, '/').replace(/^\//, '');
  
  // Buscar en todos los proyectos
  for (const [projectName, projectData] of Object.entries(urlsData.projects)) {
    for (const image of projectData.images) {
      // Normalizar también la ruta del JSON
      const imageLocalPath = image.localPath.replace(/^\//, '');
      
      if (normalizedPath === imageLocalPath || 
          normalizedPath.endsWith(imageLocalPath) || 
          imageLocalPath.endsWith(normalizedPath.split('/').slice(-3).join('/'))) {
        return image.publicId;
      }
    }
  }
  
  return null;
}

/**
 * Procesa un archivo .md
 */
function processMdFile(filePath, urlsData) {
  const content = fs.readFileSync(filePath, 'utf-8');
  let newContent = content;
  const changes = [];
  
  // Regex para encontrar rutas de imágenes locales (permite espacios en la ruta)
  const imagePathRegex = /\/images\/projects\/[^\n"'\]]+\.(webp|jpg|jpeg|png)/gi;
  
  const matches = content.match(imagePathRegex) || [];
  
  for (const match of matches) {
    const publicId = localPathToPublicId(match, urlsData);
    
    if (publicId) {
      // Generar URL optimizada
      const cloudinaryUrl = generateOptimizedUrl(publicId);
      newContent = newContent.replace(match, cloudinaryUrl);
      
      changes.push({
        from: match,
        to: cloudinaryUrl,
      });
    }
  }
  
  return { newContent, changes };
}

/**
 * Función principal
 */
async function main() {
  console.log('\n🔄 Actualizando archivos .md con URLs de Cloudinary...\n');
  console.log(`📋 Modo: ${CONFIG.mode === 'apply' ? '✏️ APLICAR CAMBIOS' : '👁️ PREVIEW (usa --apply para aplicar)'}\n`);
  
  // Verificar archivo de URLs
  if (!fs.existsSync(CONFIG.urlsFile)) {
    console.error('❌ Error: No se encontró cloudinary-urls.json');
    console.error('   Ejecuta primero: node scripts/upload-to-cloudinary.mjs');
    process.exit(1);
  }
  
  const urlsData = JSON.parse(fs.readFileSync(CONFIG.urlsFile, 'utf-8'));
  console.log(`☁️ Cloud Name: ${urlsData.cloudName}`);
  console.log(`📅 Fecha de subida: ${urlsData.timestamp}\n`);
  
  // Obtener archivos .md
  const mdFiles = fs.readdirSync(CONFIG.proyectosPath)
    .filter(f => f.endsWith('.md'))
    .map(f => path.join(CONFIG.proyectosPath, f));
  
  console.log(`📁 Archivos .md encontrados: ${mdFiles.length}\n`);
  
  let totalChanges = 0;
  
  for (const mdFile of mdFiles) {
    const fileName = path.basename(mdFile);
    const { newContent, changes } = processMdFile(mdFile, urlsData);
    
    if (changes.length > 0) {
      console.log(`📝 ${fileName} (${changes.length} cambios)`);
      
      for (const change of changes) {
        console.log(`   🔗 ${path.basename(change.from)}`);
        if (CONFIG.mode === 'preview') {
          console.log(`      → ${change.to.substring(0, 80)}...`);
        }
      }
      
      if (CONFIG.mode === 'apply') {
        fs.writeFileSync(mdFile, newContent, 'utf-8');
        console.log(`   ✅ Actualizado`);
      }
      
      totalChanges += changes.length;
    } else {
      console.log(`⏭️ ${fileName} (sin cambios)`);
    }
  }
  
  console.log(`\n${'─'.repeat(50)}`);
  console.log(`📊 Total de cambios: ${totalChanges}`);
  
  if (CONFIG.mode === 'preview' && totalChanges > 0) {
    console.log(`\n💡 Para aplicar los cambios, ejecuta:`);
    console.log(`   node scripts/update-md-with-cloudinary.mjs --apply`);
  }
}

main().catch(console.error);
