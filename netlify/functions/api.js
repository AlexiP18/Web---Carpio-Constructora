/**
 * Netlify Function: TinaCMS Cloudinary Media Handler
 * 
 * Esta función maneja las operaciones de media (upload, list, delete)
 * entre TinaCMS y Cloudinary.
 */

import ServerlessHttp from 'serverless-http';
import express, { Router } from 'express';
import { isAuthorized } from '@tinacms/auth';
import { createMediaHandler } from 'next-tinacms-cloudinary/dist/handlers.js';

const app = express();

// Middleware para parsear JSON y form data
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));

const router = Router();

// Crear el media handler de Cloudinary
const mediaHandler = createMediaHandler({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  authorized: async (req, _res) => {
    try {
      // En desarrollo, permitir todo
      if (process.env.NODE_ENV === 'development') {
        return true;
      }

      // En producción, verificar autenticación de TinaCloud
      const user = await isAuthorized(req);
      return user && user.verified;
    } catch (e) {
      console.error('Authorization error:', e);
      return false;
    }
  },
});

// Rutas para el media handler
// GET: Listar imágenes
router.get('/cloudinary/media', mediaHandler);

// POST: Subir imagen
router.post('/cloudinary/media', mediaHandler);

// DELETE: Eliminar imagen
router.delete('/cloudinary/media/:media', (req, res) => {
  req.query.media = ['media', req.params.media];
  return mediaHandler(req, res);
});

// Montar el router en ambas rutas (para compatibilidad)
app.use('/api/', router);
app.use('/.netlify/functions/api/', router);

// Exportar el handler para Netlify Functions
export const handler = ServerlessHttp(app);
