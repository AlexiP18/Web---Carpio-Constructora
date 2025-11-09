# 🚀 GUÍA DE MIGRACIÓN: DECAP CMS → TINA CMS.

**Proyecto:** Constructora Carpio  
**Fecha:** Noviembre 2025  
**Tiempo estimado:** 2-3 horas  
**Nivel de dificultad:** Intermedio

---

## 📚 ÍNDICE.

1. [Por Qué Migrar](#por-qué-migrar)
2. [Preparación](#preparación)
3. [Instalación](#instalación)
4. [Configuración](#configuración)
5. [Migración de Datos](#migración-de-datos)
6. [Testing](#testing)
7. [Deploy](#deploy)
8. [Rollback (si es necesario)](#rollback)

---

## 🎯 POR QUÉ MIGRAR

### Ventajas de Tina CMS sobre Decap CMS:

| Característica | Decap CMS | Tina CMS |
|---------------|-----------|----------|
| Editor Visual | ❌ No | ✅ **Editas en la página** |
| Preview en Tiempo Real | ❌ No | ✅ **Sí** |
| UI/UX | ⚠️ Antigua (2015) | ✅ **Moderna (2024)** |
| TypeScript | ⚠️ Básico | ✅ **Full Type-Safe** |
| Media Library | ⚠️ Básico | ✅ **Avanzado** |
| Git-based | ✅ Sí | ✅ **Sí** |
| Costo | ✅ Gratis | ✅ **Gratis (hasta 2 usuarios)** |

### Lo que mantienes:
- ✅ Archivos markdown (mismo formato)
- ✅ Git workflow (commits automáticos)
- ✅ Content Collections de Astro
- ✅ Estructura de carpetas
- ✅ Imágenes y assets

---

## 🛠️ PREPARACIÓN

### Paso 1: Verificar Node.js

```bash
node --version
# Debe ser v18 o superior
```

### Paso 2: Backup Completo

```bash
# Ya hecho! El commit actual sirve como backup
git log --oneline -1
```

### Paso 3: Crear Rama de Migración

```bash
git checkout -b migration/tina-cms
```

---

## 📦 INSTALACIÓN

### Paso 1: Instalar Dependencias de Tina

```bash
npm install tinacms @tinacms/cli
npm install --save-dev @tinacms/datalayer
```

### Paso 2: Agregar Scripts a package.json

Abre `package.json` y agrega estos scripts:

```json
{
  "scripts": {
    "dev": "tinacms dev -c \"astro dev\"",
    "build": "tinacms build && astro build",
    "tina:dev": "tinacms dev",
    "tina:build": "tinacms build",
    "tina:cloud": "tinacms cloud"
  }
}
```

---

## ⚙️ CONFIGURACIÓN

### Paso 1: Crear Estructura de Tina

```bash
# Crear carpeta de configuración
mkdir tina
```

### Paso 2: Crear archivo de configuración

Crea `tina/config.ts` con la configuración completa (ver siguiente archivo).

### Paso 3: Configurar Variables de Entorno

Crea `.env` en la raíz:

```env
# Tina Cloud (opcional para desarrollo local)
TINA_PUBLIC_CLIENT_ID=your-client-id
TINA_TOKEN=your-token
TINA_BRANCH=main

# Para desarrollo local sin cloud
TINA_PUBLIC_IS_LOCAL=true
```

---

## 🔧 CONFIGURACIÓN DETALLADA

### Archivo: `tina/config.ts`

Este archivo reemplaza `public/admin/config.yml` de Decap CMS.

**Características principales:**
- ✅ TypeScript con autocompletado
- ✅ Schema validation automática
- ✅ Visual editing habilitado
- ✅ Media manager integrado

Ver el archivo completo en: `tina/config.ts` (se creará en el siguiente paso)

---

## 📝 MIGRACIÓN DE DATOS

### ¡Buenas Noticias! NO Necesitas Migrar Datos

Tina CMS lee directamente los archivos markdown existentes:

- ✅ `src/content/proyectos/*.md` → Funciona tal cual
- ✅ `src/content/servicios/*.md` → Funciona tal cual
- ✅ `src/data/*.json` → Funciona tal cual

### Cambios Menores Necesarios

1. **Opcional:** Agregar frontmatter si falta:
   - Tina espera que cada archivo markdown tenga frontmatter válido
   - Ya lo tienes configurado correctamente

2. **Imágenes:** Continúan en `public/images/` (sin cambios)

---

## 🧪 TESTING

### Paso 1: Iniciar Tina en Desarrollo

```bash
npm run dev
```

Esto:
1. Inicia el servidor de Tina
2. Inicia Astro en modo dev
3. Abre el editor en: `http://localhost:4321/admin`

### Paso 2: Verificar Editor Visual

1. Ve a `http://localhost:4321/admin`
2. Deberías ver el dashboard de Tina
3. Selecciona un proyecto o servicio
4. Verifica que puedes editar

### Paso 3: Probar Edición

1. **Edita un proyecto:**
   - Cambia el título
   - Agrega una imagen
   - Guarda

2. **Verifica Git:**
   ```bash
   git status
   # Deberías ver cambios en el archivo markdown
   ```

3. **Verifica en el sitio:**
   - Ve a la página del proyecto
   - Los cambios deberían reflejarse inmediatamente

### Paso 4: Testing Checklist

- [ ] ✅ Editor visual funciona
- [ ] ✅ Guardar crea commit automático
- [ ] ✅ Cambios se reflejan en el sitio
- [ ] ✅ Media library funciona
- [ ] ✅ Todas las colecciones visibles (proyectos, servicios, páginas)
- [ ] ✅ Validación funciona (campos requeridos)

---

## 🚀 DEPLOY

### Paso 1: Build Local

```bash
npm run build
```

Esto genera:
1. Archivos de configuración de Tina
2. Build de Astro optimizado

### Paso 2: Configurar Tina Cloud (Recomendado)

#### 2.1: Crear Cuenta

1. Ve a: https://app.tina.io/
2. Sign up with GitHub
3. Autoriza acceso al repositorio

#### 2.2: Configurar Proyecto

```bash
# Ejecutar configuración de Tina Cloud
npx @tinacms/cli init cloud
```

Sigue el wizard:
- Selecciona tu repositorio
- Branch: `main`
- Output folder: `admin`

#### 2.3: Obtener Credenciales

Después del setup, Tina te dará:
- `TINA_PUBLIC_CLIENT_ID`
- `TINA_TOKEN`

Agrégalas a `.env` (ya en `.gitignore`)

### Paso 3: Configurar Netlify

#### 3.1: Variables de Entorno en Netlify

En Netlify Dashboard:
1. Site settings → Environment variables
2. Agregar:
   ```
   TINA_PUBLIC_CLIENT_ID = (tu client id)
   TINA_TOKEN = (tu token)
   TINA_BRANCH = main
   ```

#### 3.2: Actualizar Build Command

En `netlify.toml`:

```toml
[build]
  command = "npm run build"
  publish = "dist"

[[plugins]]
  package = "@tinacms/netlify-plugin"
```

### Paso 4: Deploy

```bash
git add .
git commit -m "feat: Migrar de Decap CMS a Tina CMS - Visual editing habilitado"
git push origin migration/tina-cms
```

Luego en GitHub:
1. Crear Pull Request
2. Revisar cambios
3. Merge a `main`

Netlify desplegará automáticamente.

---

## 🔄 ACCESO AL NUEVO CMS

### Desarrollo Local:

```bash
npm run dev
# Ir a: http://localhost:4321/admin
```

### Producción:

```
https://tu-sitio.netlify.app/admin
```

### Autenticación:

**Opción 1: Tina Cloud (Recomendado)**
- Login con GitHub
- Mismo flujo que Decap CMS

**Opción 2: Local Backend (Solo desarrollo)**
- No requiere autenticación
- Solo funciona en `localhost`

---

## 🎨 PERSONALIZACIÓN DEL EDITOR

### Cambiar Colores

En `tina/config.ts`:

```typescript
export default defineConfig({
  // ... configuración existente
  
  admin: {
    auth: {
      // Personalización
      useLocalAuth: process.env.TINA_PUBLIC_IS_LOCAL === 'true',
    },
  },
  
  // Color primario (brand)
  theme: {
    primary: '#103646', // Tu color azul
  },
});
```

---

## 🆘 ROLLBACK (Si Algo Sale Mal)

### Volver a Decap CMS

```bash
# 1. Volver a la rama main
git checkout main

# 2. El backup automático está en el commit anterior
git log --oneline

# 3. Si necesitas restaurar Decap CMS:
git revert HEAD  # Revierte último commit

# O simplemente no hagas merge del PR de migración
```

### Archivos a Restaurar (si es necesario):

1. `public/admin/config.yml` (Decap config)
2. `public/admin/index.html` (Decap admin)
3. Scripts en `package.json` (quitar scripts de Tina)

---

## 📊 COMPARACIÓN POST-MIGRACIÓN

### Antes (Decap CMS):

```
Usuario → /admin → Formulario → Guardar → Build → Ver cambios
Tiempo: ~3-5 minutos
```

### Después (Tina CMS):

```
Usuario → /admin → Edita EN LA PÁGINA → Guardar
Tiempo: Inmediato (preview en tiempo real)
```

---

## 🎯 PRÓXIMOS PASOS DESPUÉS DE MIGRAR

1. **Capacitar al cliente:**
   - El editor visual es más intuitivo
   - Mostrar cómo editar "in-page"
   - Explicar el preview en tiempo real

2. **Optimizaciones:**
   - Configurar media optimization
   - Agregar custom field components
   - Personalizar sidebar

3. **Documentación:**
   - Actualizar guías de uso
   - Crear videos tutorial
   - Documentar workflow nuevo

---

## 📞 SOPORTE

### Recursos Oficiales:

- **Docs:** https://tina.io/docs/
- **Discord:** https://discord.com/invite/zumN63Ybpf
- **GitHub:** https://github.com/tinacms/tinacms
- **Examples:** https://github.com/tinacms/tina-cloud-starter

### Problemas Comunes:

#### "Cannot find module 'tinacms'"
```bash
rm -rf node_modules package-lock.json
npm install
```

#### "Build failed in Netlify"
- Verificar variables de entorno
- Verificar que `tinacms build` se ejecuta antes de `astro build`

#### "No collections visible"
- Revisar paths en `tina/config.ts`
- Verificar que archivos `.md` tienen frontmatter válido

---

## ✅ CHECKLIST FINAL

### Pre-Migración:
- [ ] Backup completo (✅ Ya hecho)
- [ ] Branch de migración creada
- [ ] Node.js v18+ instalado

### Durante Migración:
- [ ] Dependencias instaladas
- [ ] `tina/config.ts` creado
- [ ] Scripts en `package.json` actualizados
- [ ] Variables de entorno configuradas

### Post-Migración:
- [ ] Testing local completo
- [ ] Tina Cloud configurado
- [ ] Variables en Netlify
- [ ] Deploy exitoso
- [ ] Cliente capacitado

---

## 💡 TIPS PRO

1. **Usa el Visual Editor:**
   - Es la principal ventaja de Tina
   - Tu cliente lo va a amar

2. **Configura Templates:**
   - Crea templates para nuevos proyectos
   - Acelera la creación de contenido

3. **Media Optimization:**
   - Tina puede optimizar imágenes automáticamente
   - Configura formatos WebP

4. **Bloques Reutilizables:**
   - Define blocks para secciones comunes
   - Drag & drop de contenido

---

## 🎉 CONCLUSIÓN

Después de esta migración tendrás:

✅ **Mejor UX para el cliente** (editor visual)  
✅ **Preview en tiempo real** (ve cambios al instante)  
✅ **UI moderna** (2024 vs 2015)  
✅ **Mismo workflow Git** (sin cambios en datos)  
✅ **TypeScript type-safe** (menos errores)  
✅ **Sin costos adicionales** (gratis hasta 2 usuarios)

**¿Listo para empezar?** 🚀

Continúa con el siguiente paso: Crear `tina/config.ts`

---

**Autor:** GitHub Copilot  
**Versión:** 1.0  
**Última actualización:** Noviembre 2025
