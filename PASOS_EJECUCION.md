# 🚀 PASOS DE EJECUCIÓN - MIGRACIÓN A TINA CMS

**IMPORTANTE:** Sigue estos pasos EN ORDEN. No te saltes ninguno.

---

## ✅ PRE-REQUISITOS

Antes de comenzar, verifica que tienes:

- [ ] Node.js v18 o superior (`node --version`)
- [ ] Git configurado
- [ ] VS Code abierto en el proyecto
- [ ] Terminal abierta en la raíz del proyecto

---

## 📋 PASO 1: CREAR RAMA DE MIGRACIÓN

```powershell
# Asegúrate de estar en main
git checkout main

# Actualiza desde remoto
git pull origin main

# Crea nueva rama para la migración
git checkout -b migration/tina-cms

# Verifica que estás en la rama correcta
git branch
```

**Resultado esperado:**
```
* migration/tina-cms
  main
```

---

## 📦 PASO 2: INSTALAR DEPENDENCIAS DE TINA

```powershell
npm install tinacms @tinacms/cli --save-dev
```

**Tiempo estimado:** 1-2 minutos

**Resultado esperado:**
```
added X packages, and audited Y packages in Zs
```

---

## 🔧 PASO 3: CONFIGURAR VARIABLES DE ENTORNO

```powershell
# Copiar el archivo de ejemplo
Copy-Item .env.example .env
```

Luego abre `.env` y verifica que tenga:

```env
TINA_PUBLIC_IS_LOCAL=true
```

**NOTA:** Esta configuración permite trabajar SIN necesidad de Tina Cloud (modo offline).

---

## 🚀 PASO 4: PRIMERA PRUEBA - INICIAR DESARROLLO

```powershell
npm run dev
```

**¿Qué está pasando?**
1. Tina CMS se está iniciando
2. Está generando archivos de configuración
3. Astro está iniciando en modo desarrollo

**Resultado esperado:**
```
Tina Cloud is running in local mode...
✓ Building Tina
  Local:   http://localhost:4321/
  Network: use --host to expose
```

**⏱️ Tiempo de inicio:** 30-60 segundos (primera vez es más lento)

---

## 🎨 PASO 5: ACCEDER AL ADMIN DE TINA

1. **Abre tu navegador** en: http://localhost:4321/admin

2. **Deberías ver:**
   - El dashboard de Tina CMS
   - 3 colecciones en el sidebar:
     - ✅ Proyectos
     - ✅ Servicios  
     - ✅ Páginas

3. **Si ves un error de autenticación:**
   - Es normal si `TINA_PUBLIC_IS_LOCAL=true` no está en `.env`
   - Detén el servidor (`Ctrl + C`)
   - Verifica `.env`
   - Vuelve a ejecutar `npm run dev`

---

## 🧪 PASO 6: TESTING - EDITAR UN PROYECTO

### 6.1: Abrir un Proyecto

1. En el admin de Tina: http://localhost:4321/admin
2. Click en **"Proyectos"** en el sidebar
3. Selecciona cualquier proyecto existente

### 6.2: Hacer una Prueba de Edición

1. Cambia el **título** del proyecto
2. Click en **"Save"** (botón azul arriba a la derecha)
3. Verás un mensaje: "Document saved successfully"

### 6.3: Verificar en Git

```powershell
# Ver cambios
git status

# Deberías ver algo como:
# modified:   src/content/proyectos/nombre-del-proyecto.md
```

### 6.4: Ver el Cambio en el Archivo

```powershell
# Ver el diff
git diff src/content/proyectos/
```

**Resultado esperado:**
```diff
-title: Título Antiguo
+title: Título Nuevo
```

### 6.5: Deshacer el Cambio de Prueba

```powershell
# Restaurar el archivo
git restore src/content/proyectos/

# Verificar que no hay cambios
git status
```

---

## ✅ PASO 7: VERIFICAR TODAS LAS COLECCIONES

### Test de Proyectos:
- [ ] Se listan todos los proyectos
- [ ] Puedes abrir cualquier proyecto
- [ ] Todos los campos son editables
- [ ] Las imágenes se ven correctamente
- [ ] Guardar funciona

### Test de Servicios:
- [ ] Se listan todos los servicios
- [ ] Puedes abrir cualquier servicio
- [ ] Hero config funciona
- [ ] Process steps funcionan
- [ ] Testimonials funcionan
- [ ] FAQs funcionan
- [ ] Guardar funciona

### Test de Páginas:
- [ ] Se listan: index, quienes-somos, contacto
- [ ] Puedes editar cualquiera
- [ ] Hero section funciona
- [ ] Guardar funciona

---

## 🎯 PASO 8: TESTING VISUAL EN EL SITIO

### 8.1: Mantén el Servidor Corriendo

Asegúrate de que `npm run dev` sigue ejecutándose.

### 8.2: Abre el Sitio

En otra pestaña del navegador: http://localhost:4321

### 8.3: Navega y Verifica

- [ ] Página de inicio carga correctamente
- [ ] Sección de proyectos funciona
- [ ] Página individual de proyecto funciona
- [ ] Sección de servicios funciona
- [ ] Página individual de servicio funciona
- [ ] Página "Quiénes Somos" funciona
- [ ] Página de contacto funciona

### 8.4: Test de Cambio en Tiempo Real

1. Con el sitio abierto: http://localhost:4321/proyectos
2. En otra pestaña: http://localhost:4321/admin
3. Edita el **subtitle** de un proyecto
4. Guarda
5. Refresca la página de proyectos
6. El cambio debe aparecer

---

## 📸 PASO 9: TESTING DE IMÁGENES

### 9.1: Probar Media Manager

1. En el admin, abre un proyecto
2. Click en el campo **"Imagen Principal"**
3. Deberías ver el Media Manager de Tina
4. Verifica que se listan imágenes de `public/images/`

### 9.2: Agregar una Imagen a la Galería

1. En un proyecto, scroll hasta **"Galería de Imágenes"**
2. Click en **"Add Imagen"**
3. Selecciona una imagen
4. Agrega caption y alt text
5. Guarda

### 9.3: Verificar en el Sitio

1. Ve a la página del proyecto editado
2. La nueva imagen debe aparecer en la galería

---

## 🏗️ PASO 10: BUILD DE PRODUCCIÓN (TEST)

### 10.1: Detener el Servidor de Desarrollo

```powershell
# En la terminal donde corre npm run dev
# Presiona: Ctrl + C
```

### 10.2: Ejecutar Build

```powershell
npm run build
```

**¿Qué está pasando?**
1. Tina genera archivos de configuración
2. Astro hace build optimizado
3. Se genera carpeta `dist/`

**Resultado esperado:**
```
✓ Building Tina
✓ Built in Xs
✓ Built in Xs
```

**⏱️ Tiempo:** 30-60 segundos

### 10.3: Verificar Build

```powershell
# Ver archivos generados
ls dist
```

Deberías ver:
- index.html
- proyectos/
- proyecto/
- servicios/
- admin/ ← **¡Nuevo! Admin de Tina**

### 10.4: Preview del Build

```powershell
npm run preview
```

Abre: http://localhost:4321

Verifica que todo funciona igual que en desarrollo.

---

## 💾 PASO 11: COMMIT DE LA MIGRACIÓN

### 11.1: Ver Archivos Modificados

```powershell
git status
```

**Archivos esperados:**
- `modified:   package.json` (scripts actualizados)
- `modified:   .gitignore` (agregado /admin y tina)
- `new file:   tina/config.ts` (configuración de Tina)
- `new file:   .env.example`
- `new file:   MIGRACION_TINA_CMS.md`
- `new file:   PASOS_EJECUCION.md`

### 11.2: Ver Cambios Específicos

```powershell
# Ver cambios en package.json
git diff package.json

# Ver cambios en .gitignore
git diff .gitignore
```

### 11.3: Hacer Commit

```powershell
# Agregar todos los cambios
git add .

# Commit con mensaje descriptivo
git commit -m "feat: Migrar de Decap CMS a Tina CMS

- Instalar tinacms y @tinacms/cli
- Crear configuración en tina/config.ts
- Actualizar scripts en package.json
- Agregar soporte para visual editing
- Configurar colecciones: proyectos, servicios, páginas
- Actualizar .gitignore para archivos generados
- Agregar .env.example con configuración local

BREAKING CHANGE: Decap CMS quedará deprecado
Usar npm run dev para iniciar el nuevo editor
"
```

### 11.4: Verificar Commit

```powershell
git log --oneline -1
```

---

## 🔄 PASO 12: SINCRONIZAR CON REMOTO

### 12.1: Push de la Rama de Migración

```powershell
# Subir rama al remoto
git push origin migration/tina-cms
```

### 12.2: Crear Pull Request

1. Ve a GitHub: https://github.com/AlexiP18/Web---Carpio-Constructora
2. Verás un banner: **"Compare & pull request"**
3. Click en el banner
4. Título: `feat: Migrar a Tina CMS - Visual Editing`
5. Descripción:

```markdown
## 🎯 Objetivo

Migrar de Decap CMS a Tina CMS para mejorar la experiencia de edición.

## ✨ Cambios

- ✅ Tina CMS instalado y configurado
- ✅ Visual editing habilitado
- ✅ Soporte para proyectos, servicios y páginas
- ✅ Media manager integrado
- ✅ Preview en tiempo real
- ✅ Build de producción funcional

## 🧪 Testing

- ✅ Editor funciona localmente
- ✅ Guardar crea cambios en markdown
- ✅ Build de producción exitoso
- ✅ Todas las colecciones funcionan
- ✅ Imágenes se cargan correctamente

## 📋 Próximos Pasos

1. Merge de este PR
2. Deploy a Netlify (staging)
3. Configurar Tina Cloud para producción
4. Capacitar al cliente en el nuevo editor
5. Remover archivos de Decap CMS

## ⚠️ Breaking Changes

- Scripts cambiados en package.json
- `npm run dev` ahora inicia Tina + Astro
- Editor movido a `/admin` (antes `/admin/`)

## 📸 Screenshots

(Agregar screenshots del nuevo editor)
```

6. Click en **"Create pull request"**

---

## 🎉 PASO 13: TESTING EN NETLIFY (STAGING)

### 13.1: Deploy Preview Automático

Netlify creará un deploy preview automáticamente para el PR.

En GitHub, busca el comentario de Netlify con:
```
✅ Deploy Preview ready!
```

### 13.2: Testing en Deploy Preview

1. Click en el link del deploy preview
2. Repite todos los tests del PASO 8
3. Verifica que todo funciona igual

### 13.3: Testing del Admin en Deploy Preview

**NOTA:** El admin NO funcionará todavía porque falta configurar Tina Cloud.

Esto es esperado. En el PASO 14 configuraremos producción.

---

## ☁️ PASO 14: CONFIGURAR TINA CLOUD (PRODUCCIÓN)

### 14.1: Crear Cuenta en Tina Cloud

1. Ve a: https://app.tina.io/
2. Click en **"Sign up with GitHub"**
3. Autoriza acceso a GitHub

### 14.2: Crear Nuevo Proyecto

1. Click en **"New Project"**
2. Selecciona el repositorio: `Web---Carpio-Constructora`
3. Branch: `main`
4. Framework: **Astro**
5. Click en **"Create Project"**

### 14.3: Obtener Credenciales

Después de crear el proyecto, verás:

```
TINA_PUBLIC_CLIENT_ID=xxxxx
TINA_TOKEN=yyyyy
```

**¡Cópialas!** Las necesitarás en el siguiente paso.

### 14.4: Configurar Variables en Netlify

1. Ve a Netlify Dashboard
2. Site settings → Environment variables
3. Agregar las siguientes variables:

```
TINA_PUBLIC_CLIENT_ID = (tu client id de Tina Cloud)
TINA_TOKEN = (tu token de Tina Cloud)
TINA_BRANCH = main
```

4. Click en **"Save"**

### 14.5: Actualizar .env Local (Opcional)

Si quieres usar Tina Cloud en desarrollo local:

```env
# .env
# Comentar o remover la línea local
# TINA_PUBLIC_IS_LOCAL=true

# Agregar credenciales de Tina Cloud
TINA_PUBLIC_CLIENT_ID=tu-client-id
TINA_TOKEN=tu-token
TINA_BRANCH=main
```

---

## 🚀 PASO 15: MERGE Y DEPLOY FINAL

### 15.1: Merge del Pull Request

1. En GitHub, abre el PR
2. Espera a que pasen los checks de Netlify
3. Click en **"Merge pull request"**
4. Click en **"Confirm merge"**
5. Opcional: **"Delete branch"** (limpiar rama de migración)

### 15.2: Actualizar Local

```powershell
# Volver a main
git checkout main

# Actualizar desde remoto
git pull origin main

# Eliminar rama local de migración
git branch -d migration/tina-cms
```

### 15.3: Verificar Deploy en Producción

1. Ve a Netlify Dashboard
2. Espera a que termine el deploy (2-3 minutos)
3. Abre tu sitio en producción

### 15.4: Testing del Admin en Producción

1. Ve a: `https://tu-sitio.netlify.app/admin`
2. **Deberías ver el login de Tina Cloud**
3. Login con GitHub
4. **¡Listo!** Ya puedes editar en producción

---

## 🧹 PASO 16: LIMPIEZA (OPCIONAL)

Una vez que confirmes que Tina CMS funciona perfectamente:

### 16.1: Remover Archivos de Decap CMS

```powershell
# Eliminar configuración de Decap
Remove-Item public/admin/config.yml
Remove-Item public/admin/index.html

# Actualizar scripts (ya no se necesitan)
# En package.json, remover:
# - "cms:dev": "npx decap-server"
# - "cms:help": ...
```

### 16.2: Commit de Limpieza

```powershell
git add .
git commit -m "chore: Remover archivos de Decap CMS

Decap CMS ha sido completamente reemplazado por Tina CMS.
"
git push origin main
```

---

## 📊 COMPARACIÓN: ANTES vs DESPUÉS

### Antes (Decap CMS):

```powershell
# Terminal 1
npm run cms:dev

# Terminal 2
npm run dev

# Ir a: localhost:4321/admin/
# Formulario estático
# Sin preview
```

### Después (Tina CMS):

```powershell
# Solo necesitas:
npm run dev

# Ir a: localhost:4321/admin
# Editor visual
# Preview en tiempo real
# UI moderna
```

---

## 🎯 CHECKLIST FINAL

### Desarrollo:
- [ ] `npm run dev` inicia Tina + Astro
- [ ] Admin accesible en `/admin`
- [ ] Todas las colecciones visibles
- [ ] Editar y guardar funciona
- [ ] Cambios se reflejan en el sitio

### Build:
- [ ] `npm run build` funciona sin errores
- [ ] Carpeta `admin/` generada en `dist/`
- [ ] Preview funciona

### Producción:
- [ ] Variables de entorno en Netlify
- [ ] Deploy exitoso
- [ ] Admin funciona en producción
- [ ] Login con GitHub funciona
- [ ] Editar y guardar funciona

### Git:
- [ ] Rama de migración merged a main
- [ ] PR cerrado
- [ ] Archivos de Decap removidos
- [ ] Local actualizado

---

## 🆘 TROUBLESHOOTING

### Error: "Cannot find module 'tinacms'"

```powershell
# Limpiar e instalar
Remove-Item -Recurse -Force node_modules
Remove-Item package-lock.json
npm install
```

### Error: "Tina Cloud authentication failed"

**Solución:**
1. Verifica que `.env` tenga las credenciales correctas
2. O usa modo local: `TINA_PUBLIC_IS_LOCAL=true`

### Error: "Collection not found"

**Solución:**
1. Verifica que los paths en `tina/config.ts` sean correctos
2. Verifica que los archivos markdown existen
3. Reinicia el servidor: `Ctrl + C` y `npm run dev`

### Error: Build falla en Netlify

**Solución:**
1. Verifica variables de entorno en Netlify
2. Verifica que `tinacms build` se ejecuta antes de `astro build`
3. Revisa logs en Netlify Dashboard

---

## 📞 SOPORTE

Si tienes problemas:

1. **Docs oficiales:** https://tina.io/docs/
2. **Discord de Tina:** https://discord.com/invite/zumN63Ybpf
3. **GitHub Issues:** https://github.com/tinacms/tinacms/issues

---

## 🎉 ¡FELICIDADES!

Has migrado exitosamente de Decap CMS a Tina CMS.

Ahora tienes:
- ✅ Editor visual en tiempo real
- ✅ UI moderna y profesional
- ✅ Mejor experiencia para tu cliente
- ✅ Mismo workflow Git-based
- ✅ Sin costos adicionales

**Próximo paso:** Capacitar al cliente en el nuevo editor.

---

**Tiempo total de migración:** 2-3 horas  
**Nivel de dificultad:** ⭐⭐⭐ (3/5)  
**Resultado:** 🎉🎉🎉

¡A editar se ha dicho! 🚀
