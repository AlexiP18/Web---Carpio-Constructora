/**
 * Script para crear estructura de carpetas en Cloudinary
 * y reorganizar imágenes existentes
 * 
 * Uso: node scripts/organize-cloudinary-folders.mjs
 */

import 'dotenv/config';
import { v2 as cloudinary } from 'cloudinary';

// Configurar Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Estructura de carpetas a crear
const folderStructure = {
  'constructora-carpio': {
    'proyectos': {
      'conjunto-habitacional': {
        'arrayanes-ficoa': ['galeria', 'videos'],
        'arrayanes-izamba': ['galeria', 'videos'],
      },
      'diseno-residencial': {
        'residencial-las-palmas': ['galeria', 'videos'],
        'everest': ['galeria', 'videos'],
      },
      'diseno-retail': {
        'keops': ['galeria', 'videos'],
        'centro-comercial': ['galeria', 'videos'],
      },
    },
    'servicios': {
      'construccion': ['imagenes'],
      'diseno-arquitectonico': ['imagenes'],
      'remodelacion': ['imagenes'],
      'consultoria': ['imagenes'],
    },
    'general': {
      'equipo': [],
      'oficinas': [],
      'logos': [],
      'testimonios': [],
    },
  },
};

/**
 * Crea carpetas recursivamente
 */
async function createFolders(structure, parentPath = '') {
  for (const [name, content] of Object.entries(structure)) {
    const fullPath = parentPath ? `${parentPath}/${name}` : name;
    
    try {
      // Crear carpeta subiendo un archivo placeholder (Cloudinary crea carpetas automáticamente)
      console.log(`📁 Verificando carpeta: ${fullPath}`);
      
      if (Array.isArray(content)) {
        // Es un array de subcarpetas finales
        for (const subfolder of content) {
          const subPath = `${fullPath}/${subfolder}`;
          console.log(`   └── ${subPath}`);
        }
      } else if (typeof content === 'object') {
        // Tiene más subcarpetas
        await createFolders(content, fullPath);
      }
    } catch (error) {
      console.error(`❌ Error con carpeta ${fullPath}:`, error.message);
    }
  }
}

/**
 * Lista todas las imágenes actuales en Cloudinary
 */
async function listCurrentAssets() {
  console.log('\n📋 Listando assets actuales en Cloudinary...\n');
  
  try {
    const result = await cloudinary.api.resources({
      type: 'upload',
      prefix: 'carpio-constructora', // Carpeta actual
      max_results: 500,
    });
    
    console.log(`Total de assets encontrados: ${result.resources.length}\n`);
    
    // Agrupar por carpeta
    const byFolder = {};
    for (const asset of result.resources) {
      const folder = asset.folder || 'raíz';
      if (!byFolder[folder]) byFolder[folder] = [];
      byFolder[folder].push(asset.public_id);
    }
    
    for (const [folder, assets] of Object.entries(byFolder)) {
      console.log(`📂 ${folder}: ${assets.length} archivos`);
    }
    
    return result.resources;
  } catch (error) {
    console.error('Error listando assets:', error.message);
    return [];
  }
}

/**
 * Mueve un asset a una nueva carpeta
 */
async function moveAsset(publicId, newFolder) {
  const filename = publicId.split('/').pop();
  const newPublicId = `${newFolder}/${filename}`;
  
  try {
    await cloudinary.uploader.rename(publicId, newPublicId);
    console.log(`✅ Movido: ${publicId} → ${newPublicId}`);
    return true;
  } catch (error) {
    console.error(`❌ Error moviendo ${publicId}:`, error.message);
    return false;
  }
}

/**
 * Mapeo de carpetas actuales a nueva estructura
 */
const folderMapping = {
  // Mapear carpetas existentes a la nueva estructura
  'carpio-constructora/projects/keops': 'constructora-carpio/proyectos/diseno-retail/keops/galeria',
  'carpio-constructora/projects/arrayanes_ficoa': 'constructora-carpio/proyectos/conjunto-habitacional/arrayanes-ficoa/galeria',
  'carpio-constructora/projects/arrayanes_izamba': 'constructora-carpio/proyectos/conjunto-habitacional/arrayanes-izamba/galeria',
  // Agrega más mapeos según tus carpetas actuales
};

/**
 * Reorganiza assets según el mapeo
 */
async function reorganizeAssets() {
  const assets = await listCurrentAssets();
  
  console.log('\n🔄 Reorganizando assets...\n');
  
  for (const asset of assets) {
    const currentFolder = asset.folder;
    
    // Buscar si hay un mapeo para esta carpeta
    for (const [oldPath, newPath] of Object.entries(folderMapping)) {
      if (currentFolder && currentFolder.startsWith(oldPath.replace('carpio-constructora/', ''))) {
        await moveAsset(asset.public_id, newPath);
        break;
      }
    }
  }
}

// Menú principal
async function main() {
  const args = process.argv.slice(2);
  const command = args[0] || 'help';
  
  console.log('🏗️  Organizador de Cloudinary - Constructora Carpio\n');
  
  switch (command) {
    case 'list':
      await listCurrentAssets();
      break;
      
    case 'structure':
      console.log('📂 Estructura de carpetas propuesta:\n');
      console.log(JSON.stringify(folderStructure, null, 2));
      break;
      
    case 'reorganize':
      console.log('⚠️  ADVERTENCIA: Esto moverá archivos en Cloudinary.');
      console.log('   Las URLs antiguas dejarán de funcionar.\n');
      console.log('   Ejecuta con --confirm para proceder.\n');
      
      if (args.includes('--confirm')) {
        await reorganizeAssets();
      }
      break;
      
    default:
      console.log(`
Uso: node scripts/organize-cloudinary-folders.mjs <comando>

Comandos disponibles:
  list        - Lista todos los assets actuales en Cloudinary
  structure   - Muestra la estructura de carpetas propuesta
  reorganize  - Reorganiza los assets (requiere --confirm)

Ejemplos:
  node scripts/organize-cloudinary-folders.mjs list
  node scripts/organize-cloudinary-folders.mjs structure
  node scripts/organize-cloudinary-folders.mjs reorganize --confirm
      `);
  }
}

main();
