# 🎨 Guía de Componentes - Constructora Carpio

## 📋 Arquitectura de Componentes

### Estructura de Carpetas
```
src/components/
├── base/           # Componentes Astro básicos con estilos shadcn/ui
│   ├── Button.astro
│   ├── Card.astro  
│   └── Input.astro
├── ui/             # Componentes shadcn/ui (React)
│   ├── accordion.tsx
│   ├── button.tsx
│   ├── card.tsx
│   ├── dialog.tsx
│   ├── input.tsx
│   └── tabs.tsx
├── interactive/    # Wrappers para React en Astro
│   ├── ContactFAQWrapper.astro
│   └── Slider.astro
├── media/          # Componentes de medios optimizados
│   └── OptimizedImage.astro
└── layout/         # Componentes de layout
    └── SectionLayout.astro
```

## 🚀 Uso de Componentes

### 1. Componentes Astro Básicos (Recomendado para la mayoría de casos)

#### Button.astro
```astro
---
import Button from '../components/base/Button.astro';
---

<!-- Botón básico -->
<Button variant="default">Enviar</Button>

<!-- Botón como enlace -->
<Button href="/contacto" variant="outline">Contacto</Button>

<!-- Variantes disponibles -->
<Button variant="default">Default</Button>
<Button variant="destructive">Destructive</Button>
<Button variant="outline">Outline</Button>
<Button variant="secondary">Secondary</Button>
<Button variant="ghost">Ghost</Button>
<Button variant="link">Link</Button>

<!-- Tamaños disponibles -->
<Button size="sm">Pequeño</Button>
<Button size="default">Normal</Button>
<Button size="lg">Grande</Button>
<Button size="icon">🔍</Button>
```

#### Card.astro
```astro
---
import Card from '../components/base/Card.astro';
---

<Card variant="default" size="md">
  <h3>Título de la tarjeta</h3>
  <p>Contenido de la tarjeta...</p>
</Card>

<!-- Variantes -->
<Card variant="elevated">Con sombra elevada</Card>
<Card variant="outlined">Con borde</Card>
```

#### Input.astro
```astro
---
import Input from '../components/base/Input.astro';
---

<Input 
  type="text" 
  placeholder="Ingresa tu nombre"
  variant="default"
  size="default"
/>

<!-- Estados -->
<Input variant="error" placeholder="Campo con error" />
<Input variant="success" placeholder="Campo válido" />
```

### 2. Componentes React con shadcn/ui (Para interactividad compleja)

#### FAQ con Accordion
```astro
---
import ContactFAQWrapper from '../components/interactive/ContactFAQWrapper.astro';
---

<!-- FAQ automático con datos predefinidos -->
<ContactFAQWrapper />
```

### 3. Componentes de Media Optimizados

#### OptimizedImage.astro
```astro
---
import OptimizedImage from '../components/media/OptimizedImage.astro';
import imageSrc from '../assets/example.jpg';
---

<OptimizedImage 
  src={imageSrc}
  alt="Descripción de la imagen"
  width={800}
  height={600}
  formats={['avif', 'webp', 'jpeg']}
  loading="lazy"
/>
```

#### Slider.astro
```astro
---
import Slider from '../components/interactive/Slider.astro';

const slides = [
  { id: 1, title: "Slide 1", content: "..." },
  { id: 2, title: "Slide 2", content: "..." }
];
---

<Slider 
  slides={slides}
  slidesPerView={3}
  spaceBetween={30}
  autoplay={{ delay: 5000 }}
  navigation={true}
  pagination={true}
/>
```

## 🎯 Mejores Prácticas

### 1. Cuándo usar qué componente

- **Componentes .astro básicos**: Para la mayoría de elementos estáticos (botones, tarjetas, inputs)
- **Componentes React (.tsx)**: Solo para interactividad compleja (accordions, modals, tabs)
- **Wrappers**: Para integrar React en páginas Astro cuando sea necesario

### 2. Estilos consistentes

Todos los componentes usan:
- **cn()** para combinar clases inteligentemente
- **cva()** para variantes consistentes  
- **Tokens de diseño** de Constructora Carpio
- **Estilos de shadcn/ui** para accesibilidad

### 3. Rendimiento

- Los componentes .astro se renderizan en el servidor (más rápido)
- Los componentes React solo se cargan cuando se necesita interactividad
- Imágenes optimizadas automáticamente con Sharp

## 🔧 Instalación de Nuevos Componentes shadcn/ui

Para agregar más componentes:

```bash
npx shadcn@latest add [componente]
```

Ejemplos:
```bash
npx shadcn@latest add badge
npx shadcn@latest add tooltip  
npx shadcn@latest add sheet
npx shadcn@latest add select
```

Luego crear un wrapper .astro si es necesario para usar en páginas Astro.

## 📚 Componentes Disponibles

### ✅ Listos para usar
- [x] Button (Astro + React)
- [x] Card (Astro + React)  
- [x] Input (Astro + React)
- [x] Accordion (React con wrapper)
- [x] Dialog (React)
- [x] Tabs (React)
- [x] OptimizedImage (Astro)
- [x] Slider (Astro)

### 🔄 Pendientes por instalar
- [ ] Badge
- [ ] Tooltip
- [ ] Select
- [ ] Textarea
- [ ] Checkbox
- [ ] Radio Group
- [ ] Switch

## 🎨 Personalización

Los componentes siguen el sistema de diseño de Constructora Carpio:

```typescript
// src/lib/utils.ts
export const designTokens = {
  colors: {
    primary: "#2d862d",
    secondary: "#dad9d8", 
    accent: "#0c0801"
  },
  // ... más tokens
}
```

Para personalizar, edita los tokens en `src/lib/utils.ts` y los cambios se aplicarán automáticamente a todos los componentes.