# Componente Button - Guía de Uso

## Descripción
Componente de botón estándar y flexible para toda la aplicación. Soporta múltiples variantes, tamaños, iconos, animaciones y estados.

## Props Disponibles

### Básicas
- `variant`: Estilo del botón
- `size`: Tamaño del botón  
- `href`: URL de destino (convierte el botón en enlace)
- `type`: Tipo de botón (button, submit, reset)
- `class`: Clases CSS adicionales
- `disabled`: Estado deshabilitado

### Iconos
- `icon`: Nombre del icono (usando Phosphor Icons)
- `iconPosition`: Posición del icono ('left' | 'right')

### Personalización
- `animation`: Tipo de animación ('hover' | 'scale' | 'slide' | 'none')
- `rounded`: Nivel de redondeo ('none' | 'sm' | 'md' | 'lg' | 'full')

## Variantes Disponibles

### Principales
- `primary`: Azul gradiente (por defecto)
- `success`: Verde gradiente  
- `orange`: Naranja gradiente
- `danger`: Rojo gradiente

### Secundarias
- `secondary`: Gris claro
- `ghost`: Transparente con hover sutil
- `ghost-white`: Transparente blanco

### Outline
- `outline`: Borde blanco (para fondos oscuros)
- `outline-dark`: Borde oscuro (para fondos claros)
- `outline-green`: Borde verde
- `outline-danger`: Borde rojo

## Tamaños
- `xs`: Extra pequeño
- `sm`: Pequeño
- `md`: Mediano (por defecto)
- `lg`: Grande
- `xl`: Extra grande

## Ejemplos de Uso

### Botón Básico
```astro
<Button>Texto del Botón</Button>
```

### Botón con Icono
```astro
<Button icon="ph:arrow-right" iconPosition="right">
  Ver Más
</Button>
```

### Botón de Enlace
```astro
<Button href="/contacto" variant="success" size="lg">
  Contactanos
</Button>
```

### Botón con Animación Personalizada
```astro
<Button 
  variant="orange" 
  animation="scale"
  rounded="lg"
  icon="ph:phone"
  iconPosition="left"
>
  Llamar Ahora
</Button>
```

### Botón Outline
```astro
<Button variant="outline" size="md">
  Botón Secundario
</Button>
```

### Botón Deshabilitado
```astro
<Button disabled variant="primary">
  No Disponible
</Button>
```

## Casos de Uso Comunes

### Call-to-Action Principal
```astro
<Button 
  variant="orange" 
  size="lg" 
  href="/contacto"
  icon="ph:arrow-right"
>
  Solicitar Cotización
</Button>
```

### Navegación Secundaria
```astro
<Button 
  variant="outline-dark" 
  size="md"
  href="/proyectos"
>
  Ver Proyectos
</Button>
```

### Acciones de Formulario
```astro
<Button 
  type="submit" 
  variant="success"
  size="lg"
>
  Enviar Mensaje
</Button>
```

### Botones Sociales/Contacto
```astro
<Button 
  variant="ghost" 
  size="sm"
  icon="ph:phone"
  iconPosition="left"
  href="tel:+123456789"
>
  Llamar
</Button>
```

## Notas de Implementación

1. **Consistencia**: Usar siempre este componente para mantener el diseño uniforme
2. **Accesibilidad**: El componente incluye estados de focus y disabled
3. **Responsive**: Los tamaños se adaptan automáticamente en mobile
4. **Performance**: Las animaciones usan transform para mejor rendimiento
5. **SEO**: Los enlaces mantienen la semántica correcta con href

## Migración de Botones Existentes

Para migrar botones existentes al nuevo estándar:

### Antes:
```astro
<a class="bg-blue-500 text-white px-4 py-2 rounded" href="/link">
  Texto
</a>
```

### Después:
```astro
<Button variant="primary" href="/link">
  Texto
</Button>
```