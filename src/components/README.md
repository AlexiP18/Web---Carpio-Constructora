# 📁 Estructura de Componentes - Constructora Carpio

## 🎯 Arquitectura de Componentes

### `/base/` - Componentes Fundamentales (Design System)
- **Button.astro** - Botón base con variantes (primary, secondary, outline, ghost)
- **Card.astro** - Tarjeta base para contenido
- **Input.astro** - Input base para formularios
- **Badge.astro** - Etiquetas y categorías
- **Avatar.astro** - Imágenes de perfil/usuario
- **Typography.astro** - Títulos, párrafos, texto base

### `/layout/` - Componentes de Estructura
- **SectionLayout.astro** - Wrapper para secciones
- **SectionHeader.astro** - Header reutilizable para secciones
- **Container.astro** - Contenedor responsive
- **Grid.astro** - Sistema de grillas
- **Spacer.astro** - Espaciado consistente

### `/forms/` - Componentes de Formularios
- **FormWrapper.astro** - Wrapper con Felte + Zod
- **FormField.astro** - Campo individual con validación
- **ContactForm.astro** - Formulario de contacto completo
- **NewsletterForm.astro** - Suscripción newsletter
- **QuoteForm.astro** - Formulario de cotización

### `/interactive/` - Componentes Interactivos (shadcn/ui + Alpine)
- **Accordion.tsx** - FAQ accordion (shadcn)
- **Dialog.tsx** - Modales (shadcn)
- **Tabs.tsx** - Pestañas (shadcn)
- **Slider.astro** - Carrusel con Swiper
- **Dropdown.tsx** - Menús desplegables (shadcn)
- **Tooltip.tsx** - Tooltips informativos (shadcn)

### `/media/` - Componentes Multimedia
- **OptimizedImage.astro** - Imágenes optimizadas con Sharp
- **Gallery.astro** - Galería de imágenes
- **VideoPlayer.astro** - Reproductor de video
- **ImageCarousel.astro** - Carrusel de imágenes

### `/navigation/` - Componentes de Navegación
- **Header.astro** - Header principal
- **MobileMenu.astro** - Menú móvil con Alpine
- **Breadcrumbs.astro** - Migas de pan
- **Pagination.astro** - Paginación
- **Footer.astro** - Footer principal

## 📄 Por Páginas/Secciones

### `/pages/home/` - Página de Inicio
- **Hero.astro** - Sección hero principal
- **AboutSummary.astro** - Resumen sobre nosotros
- **ServicesPreview.astro** - Vista previa servicios
- **ProjectsPortfolio.astro** - Portfolio de proyectos
- **TestimonialsSlider.astro** - Testimonios en slider
- **CompanyStats.astro** - Estadísticas de la empresa

### `/pages/services/` - Página de Servicios
- **ServicesGrid.astro** - Grid de servicios
- **ServiceCard.astro** - Tarjeta individual de servicio
- **ServicesBenefits.astro** - Beneficios de servicios
- **ServicesCTA.astro** - Call to action servicios
- **ServicesProcess.astro** - Proceso de trabajo

### `/pages/service/` - Página Individual de Servicio
- **ServiceHero.astro** - Hero específico del servicio
- **ServiceFeatures.astro** - Características del servicio
- **ServiceProcess.astro** - Proceso específico
- **ServiceProjects.astro** - Proyectos relacionados
- **ServicePricing.astro** - Precios del servicio
- **ServiceFAQ.astro** - FAQ específico

### `/pages/projects/` - Página de Proyectos
- **ProjectsHero.astro** - Hero de proyectos
- **ProjectsFilter.astro** - Filtros de proyectos
- **ProjectsGrid.astro** - Grid de proyectos
- **ProjectCard.astro** - Tarjeta de proyecto
- **ProjectsPagination.astro** - Paginación de proyectos

### `/pages/project/` - Página Individual de Proyecto
- **ProjectHero.astro** - Hero del proyecto
- **ProjectGallery.astro** - Galería del proyecto
- **ProjectDetails.astro** - Detalles técnicos
- **ProjectTimeline.astro** - Timeline del proyecto
- **RelatedProjects.astro** - Proyectos relacionados

### `/pages/about/` - Quiénes Somos
- **AboutHero.astro** - Hero sobre nosotros
- **CompanyHistory.astro** - Historia de la empresa
- **TeamSection.astro** - Equipo de trabajo
- **CompanyValues.astro** - Valores de la empresa
- **CompanyMission.astro** - Misión y visión
- **CompanyAchievements.astro** - Logros y certificaciones

### `/pages/contact/` - Página de Contacto
- **ContactHero.astro** - Hero de contacto
- **ContactInfo.astro** - Información de contacto
- **ContactForm.astro** - Formulario principal
- **ContactMap.astro** - Mapa de ubicación
- **ContactFAQ.astro** - FAQ de contacto
- **ContactOffices.astro** - Oficinas/ubicaciones

## 🔧 Herramientas por Componente

### Base (Astro + Tailwind + CVA)
- Button, Card, Input, Badge → `class-variance-authority` + `tailwind-merge`
- Typography → Sistema de tokens Tailwind

### Interactivos (shadcn/ui)
- Accordion, Dialog, Tabs, Dropdown, Tooltip → React + shadcn/ui
- Hidratación: `client:visible` o `client:idle`

### Animados (AOS + Motion)
- Secciones → `data-aos` attributes
- Micro-interacciones → `motion` library

### Formularios (Felte + Zod)
- Todos los formularios → Validación robusta + UX

### Multimedia (Sharp + Astro Assets)
- Imágenes → Optimización automática + formatos modernos

### Slider/Carrusel (Swiper)
- Testimonios, Proyectos, Galería → Swiper con navegación completa