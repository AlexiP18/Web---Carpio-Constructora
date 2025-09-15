# 🎠 Slider Component - Guía de Uso

El componente `Slider.astro` ha sido actualizado para ser más compatible con Astro. Aquí está la nueva forma de usarlo:

## 📋 Nuevo API del Slider

### Props disponibles:
- `slidesPerView?: number | "auto"` - Número de slides visibles (default: 1)
- `spaceBetween?: number` - Espacio entre slides en px (default: 30)
- `loop?: boolean` - Activar loop infinito (default: true)  
- `autoplay?: boolean | { delay: number }` - Autoplay (default: { delay: 5000 })
- `navigation?: boolean` - Mostrar botones de navegación (default: true)
- `pagination?: boolean` - Mostrar paginación (default: true)
- `breakpoints?: object` - Responsive breakpoints personalizados
- `class?: string` - Clases CSS adicionales
- `id?: string` - ID único (se genera automáticamente si no se proporciona)

## 🚀 Cómo usar el Slider

### Ejemplo básico:
```astro
---
import Slider from '../components/interactive/Slider.astro';
---

<Slider>
  <div class="swiper-slide">
    <div class="p-6 bg-white rounded-lg">
      <h3>Slide 1</h3>
      <p>Contenido del primer slide</p>
    </div>
  </div>
  <div class="swiper-slide">
    <div class="p-6 bg-white rounded-lg">
      <h3>Slide 2</h3>
      <p>Contenido del segundo slide</p>
    </div>
  </div>
  <div class="swiper-slide">
    <div class="p-6 bg-white rounded-lg">
      <h3>Slide 3</h3>
      <p>Contenido del tercer slide</p>
    </div>
  </div>
</Slider>
```

### Ejemplo con configuración personalizada:
```astro
<Slider 
  slidesPerView={3}
  spaceBetween={20}
  autoplay={{ delay: 3000 }}
  breakpoints={{
    640: { slidesPerView: 1 },
    768: { slidesPerView: 2 },
    1024: { slidesPerView: 3 }
  }}
>
  <!-- Aquí van tus slides -->
</Slider>
```

### Ejemplo para testimonios:
```astro
---
import Slider from '../components/interactive/Slider.astro';
import Card from '../components/base/Card.astro';

const testimonials = [
  { name: "María", comment: "Excelente trabajo" },
  { name: "Carlos", comment: "Muy profesionales" }
];
---

<Slider slidesPerView={2} spaceBetween={30}>
  {testimonials.map((testimonial) => (
    <div class="swiper-slide">
      <Card variant="elevated" size="lg">
        <h4>{testimonial.name}</h4>
        <p>{testimonial.comment}</p>
      </Card>
    </div>
  ))}
</Slider>
```

## ⚠️ Importante: Estructura requerida

Cada slide DEBE tener la clase `swiper-slide`:

```astro
<Slider>
  <div class="swiper-slide">
    <!-- Tu contenido aquí -->
  </div>
  <div class="swiper-slide">
    <!-- Tu contenido aquí -->
  </div>
</Slider>
```

## 🎨 Personalización de estilos

El slider incluye estilos predefinidos para:
- Botones de navegación en color verde de Constructora Carpio (#2d862d)
- Paginación con bullets personalizados
- Responsive design automático

Para personalizar más estilos, puedes sobrescribir las clases CSS de Swiper en tu componente padre.

## 📚 Breakpoints por defecto

```javascript
{
  640: { slidesPerView: 1 },   // Mobile
  768: { slidesPerView: 2 },   // Tablet
  1024: { slidesPerView: 3 }   // Desktop
}
```

Este nuevo diseño es más flexible y compatible con el sistema de componentes de Astro.