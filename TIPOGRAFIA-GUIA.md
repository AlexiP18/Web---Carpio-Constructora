# Guía de Tipografía - Constructora Carpio

## 🎨 Fuentes Configuradas

### **Fuente Principal (Headings)**
- **Montserrat**: Para títulos, encabezados y elementos importantes
- Pesos disponibles: 400, 500, 600, 700, 800

### **Fuente Secundaria (Body)**
- **Inter**: Para textos de cuerpo, párrafos y contenido general
- Pesos disponibles: 400, 500, 600

## 📝 Clases de Tailwind CSS

### **Fuentes**
```css
font-heading    /* Montserrat para títulos */
font-body       /* Inter para textos de cuerpo */
font-sans       /* Inter como fuente por defecto */
```

### **Jerarquía de Títulos**
```css
text-display    /* Montserrat Bold, 84px - Para títulos principales */
text-title      /* Montserrat Semibold, 60px - Para títulos de sección */
text-subtitle   /* Montserrat Medium, 40px - Para subtítulos */

/* O usar los tamaños predefinidos */
text-heading-1  /* 84px */
text-heading-2  /* 60px */
text-heading-3  /* 48px */
text-heading-4  /* 40px */
text-heading-5  /* 32px */
text-heading-6  /* 26px */
```

### **Textos de Cuerpo**
```css
text-body-lg    /* Inter, 20px - Para textos destacados */
text-body       /* Inter, 18px - Para textos normales */
text-body-sm    /* Inter, 16px - Para textos pequeños */
text-caption    /* Inter, 14px - Para pies de imagen, notas */
```

## 🎨 Colores Corporativos

### **Colores Principales**
```css
/* Usando las nuevas clases de color */
text-brand-primary        /* #103646 - Azul oscuro corporativo */
text-brand-secondary      /* #D79528 - Dorado corporativo */
bg-brand-primary          /* Fondo azul corporativo */
bg-brand-secondary        /* Fondo dorado corporativo */

/* Variaciones */
text-brand-primary-light  /* #1a4a5a */
text-brand-primary-dark   /* #0a252f */
text-brand-secondary-light /* #e6a740 */
text-brand-secondary-dark  /* #b67d1f */

/* Alias para compatibilidad */
text-primary-green        /* #103646 */
text-secondary-gold       /* #D79528 */
```

## 🚀 Ejemplos de Uso

### **Título Principal**
```astro
<h1 class="text-display text-brand-primary">
  Constructora Carpio
</h1>
```

### **Título de Sección**
```astro
<h2 class="text-title text-gray-900">
  Nuestros <span class="bg-gradient-to-r from-brand-primary to-brand-secondary bg-clip-text text-transparent">Servicios</span>
</h2>
```

### **Subtítulo**
```astro
<h3 class="text-subtitle text-brand-primary">
  Construcción Industrial
</h3>
```

### **Párrafo Normal**
```astro
<p class="text-body text-gray-600">
  Transformamos sueños en estructuras duraderas con más de 20 años de experiencia.
</p>
```

### **Texto Destacado**
```astro
<p class="text-body-lg font-medium text-brand-primary">
  Calidad garantizada en cada proyecto
</p>
```

## 📱 Responsive Design

Los tamaños de fuente se ajustan automáticamente:
- **Desktop**: Tamaños completos
- **Tablet**: Tamaños reducidos proporcionalmente  
- **Mobile**: Tamaños optimizados para pantallas pequeñas

## ✨ Gradientes Corporativos

### **Gradiente Principal**
```css
bg-gradient-to-r from-brand-primary to-brand-secondary
```

### **Gradiente de Texto**
```css
bg-gradient-to-r from-brand-primary to-brand-secondary bg-clip-text text-transparent
```

## 🔧 CSS Global Automático

Todas las etiquetas HTML tendrán automáticamente las fuentes correctas:
- `h1, h2, h3, h4, h5, h6` → **Montserrat**
- `p, span, div, li` → **Inter**

## 📋 Checklist de Implementación

- ✅ Fuentes importadas (Montserrat + Inter)
- ✅ Configuración de Tailwind actualizada
- ✅ Clases de utilidad creadas
- ✅ Colores corporativos definidos
- ✅ CSS global configurado
- ✅ Scrollbar con colores corporativos
- ✅ Responsive typography configurada

---

**Nota**: Las fuentes se cargarán automáticamente y todos los componentes existentes heredarán las nuevas configuraciones tipográficas.