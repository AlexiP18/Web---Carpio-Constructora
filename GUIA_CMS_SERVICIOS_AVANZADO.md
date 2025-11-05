# Guía Avanzada de Configuración CMS para Servicios

## 🎨 Nuevas Funcionalidades

Esta guía documenta las nuevas opciones de personalización disponibles en el CMS para la gestión de servicios.

---

## 📋 Tabla de Contenidos

1. [Configuración del Hero Banner](#configuración-del-hero-banner)
2. [Chips de Información](#chips-de-información)
3. [Botón de Cotización Personalizado](#botón-de-cotización-personalizado)
4. [Control de Secciones](#control-de-secciones)
5. [Ejemplos Prácticos](#ejemplos-prácticos)

---

## 🎯 Configuración del Hero Banner

El Hero Banner ahora es completamente configurable desde el CMS. Puedes personalizar:

- **Chips informativos** (tarjetas de destacados)
- **Botón de llamada a la acción** (CTA)
- **Integración con WhatsApp** o páginas internas

### Ubicación en el CMS

```
Servicios → [Seleccionar servicio] → Información del Servicio → ⚙️ Configuración del Hero
```

---

## 💡 Chips de Información

### ¿Qué son?

Los chips son tarjetas informativas que aparecen en el Hero Banner del servicio, destacando características clave.

### Configuración

| Campo | Descripción | Ejemplo |
|-------|-------------|---------|
| **Título** | Nombre corto del destacado | "Calidad Premium" |
| **Descripción** | Texto explicativo breve | "Materiales de primera y acabados impecables" |
| **Icono** | Icono de Phosphor | `ph:star-fill`, `ph:users-fill` |
| **Color de Fondo** | Primario (Azul) o Secundario (Verde) | `primary` o `secondary` |

### Límites

- **Mínimo:** 0 chips (se muestran chips por defecto)
- **Máximo:** 4 chips
- **Recomendado:** 2-3 chips para mejor visualización

### Iconos Disponibles

Puedes usar cualquier icono de [Phosphor Icons](https://phosphoricons.com/). Ejemplos populares:

- `ph:star-fill` - Estrella (calidad)
- `ph:users-fill` - Usuarios (equipo)
- `ph:shield-check-fill` - Escudo (seguridad)
- `ph:clock-fill` - Reloj (puntualidad)
- `ph:trophy-fill` - Trofeo (excelencia)
- `ph:chart-line-up` - Gráfica (crecimiento)
- `ph:handshake` - Apretón de manos (confianza)
- `ph:leaf` - Hoja (sostenibilidad)

### Ejemplo de Configuración

```yaml
heroConfig:
  chips:
    - title: "Calidad Premium"
      description: "Materiales de primera y acabados impecables"
      icon: "ph:star-fill"
      colorScheme: "primary"
    
    - title: "Equipo Profesional"
      description: "Especialistas con años de experiencia"
      icon: "ph:users-fill"
      colorScheme: "secondary"
    
    - title: "Garantía Extendida"
      description: "Respaldo en todos nuestros proyectos"
      icon: "ph:shield-check-fill"
      colorScheme: "primary"
```

---

## 📞 Botón de Cotización Personalizado

### Tipos de Acción

El botón puede configurarse de dos formas:

#### 1. **Ir a Página de Contacto** (Por defecto)

Redirige al usuario a una página interna del sitio.

**Configuración:**
- **Tipo de Acción:** `Ir a Página de Contacto`
- **URL Alternativa:** `/contacto` (o cualquier otra página)
- **Texto del Botón:** "Solicitar Cotización"

#### 2. **Abrir WhatsApp**

Abre una conversación de WhatsApp con un mensaje predefinido.

**Configuración:**
- **Tipo de Acción:** `Abrir WhatsApp`
- **Número de WhatsApp:** `+593991234567` (con código de país, sin espacios)
- **Texto del Botón:** "Contactar por WhatsApp"

### Formato del Número de WhatsApp

✅ **Correcto:**
- `+593991234567` (Ecuador)
- `+34612345678` (España)
- `+12025551234` (USA)

❌ **Incorrecto:**
- `0991234567` (falta código de país)
- `+593 99 123 4567` (contiene espacios)
- `593991234567` (falta el símbolo +)

### Ejemplo de Configuración

#### Botón con WhatsApp:
```yaml
heroConfig:
  ctaButton:
    text: "Contactar por WhatsApp"
    actionType: "whatsapp"
    whatsappNumber: "+593991234567"
```

#### Botón con Página:
```yaml
heroConfig:
  ctaButton:
    text: "Solicitar Cotización"
    actionType: "page"
    url: "/contacto"
```

---

## 🔄 Control de Secciones

### Sección de Testimonios

Ahora puedes **activar/desactivar** la sección completa de testimonios y personalizar sus textos.

#### Ubicación en el CMS

```
Servicios → [Seleccionar servicio] → Información del Servicio → 📢 Sección de Testimonios
```

#### Configuración Disponible

| Campo | Descripción | Por Defecto |
|-------|-------------|-------------|
| **Mostrar Sección** | Toggle para activar/desactivar | ✅ Activado |
| **Título de la Sección** | Título principal | "Lo que Dicen Nuestros Clientes" |
| **Tagline** | Etiqueta superior | "TESTIMONIOS" |
| **Testimonios (Items)** | Lista de testimonios | Array vacío |

#### Campos de cada Testimonio

- **Contenido:** Texto del testimonio
- **Autor:** Nombre del cliente
- **Cargo:** Posición o descripción del cliente
- **Calificación:** Estrellas (1-5)

#### Ejemplo:

```yaml
testimonialsSection:
  enabled: true  # ← Cambiar a false para ocultar toda la sección
  title: "Lo que Dicen Nuestros Clientes"
  tagline: "TESTIMONIOS"
  items:
    - content: "Excelente trabajo, cumplieron con todos nuestros requisitos."
      author: "Juan Pérez"
      position: "Propietario"
      rating: 5
    - content: "Un equipo profesional que cumplió con los plazos acordados."
      author: "María López"
      position: "Directora, Inmobiliaria ABC"
      rating: 5
```

**Para ocultar la sección:** Cambia `enabled: true` a `enabled: false`

---

### Sección de Preguntas Frecuentes (FAQs)

Similar a Testimonios, ahora puedes controlar completamente esta sección.

#### Ubicación en el CMS

```
Servicios → [Seleccionar servicio] → Información del Servicio → ❓ Sección de Preguntas Frecuentes
```

#### Configuración Disponible

| Campo | Descripción | Por Defecto |
|-------|-------------|-------------|
| **Mostrar Sección** | Toggle para activar/desactivar | ✅ Activado |
| **Título de la Sección** | Título principal | "Preguntas Frecuentes" |
| **Tagline** | Etiqueta superior | "PREGUNTAS FRECUENTES" |
| **Descripción** | Texto introductorio | Personalizable |
| **Preguntas (Items)** | Lista de preguntas y respuestas | Array vacío |

#### Campos de cada FAQ

- **Pregunta:** Texto de la pregunta
- **Respuesta:** Texto de la respuesta (puede ser largo)

#### Ejemplo:

```yaml
faqsSection:
  enabled: true  # ← Cambiar a false para ocultar toda la sección
  title: "Preguntas Frecuentes"
  tagline: "PREGUNTAS FRECUENTES"
  description: "Aquí encontrarás respuestas a las preguntas más comunes sobre nuestro servicio de construcción."
  items:
    - question: "¿Cuánto tiempo toma un proyecto de construcción?"
      answer: "El tiempo de ejecución depende del tipo de proyecto. Generalmente, un proyecto puede tardar entre 3 a 6 meses."
    - question: "¿Qué materiales utilizan?"
      answer: "Utilizamos materiales de alta calidad que cumplen con las normativas de seguridad."
```

**Para ocultar la sección:** Cambia `enabled: true` a `enabled: false`

---

## 📝 Ejemplos Prácticos

### Caso 1: Servicio de Construcción Residencial

```yaml
heroConfig:
  chips:
    - title: "15+ Años"
      description: "De experiencia en el sector"
      icon: "ph:trophy-fill"
      colorScheme: "primary"
    
    - title: "Garantía 5 años"
      description: "En todos nuestros proyectos"
      icon: "ph:shield-check-fill"
      colorScheme: "secondary"
    
    - title: "Materiales Premium"
      description: "Certificados y garantizados"
      icon: "ph:star-fill"
      colorScheme: "primary"
  
  ctaButton:
    text: "Contactar por WhatsApp"
    actionType: "whatsapp"
    whatsappNumber: "+593991234567"

testimonialsSection:
  enabled: true
  title: "Testimonios de Nuestros Clientes"
  tagline: "EXPERIENCIAS REALES"
  items:
    - content: "Construyeron nuestra casa de ensueño con excelente calidad."
      author: "Ana García"
      position: "Propietaria"
      rating: 5

faqsSection:
  enabled: true
  title: "Preguntas Frecuentes sobre Construcción"
  tagline: "RESUELVE TUS DUDAS"
  description: "Todo lo que necesitas saber sobre nuestros servicios."
  items:
    - question: "¿Cuánto cuesta construir una casa?"
      answer: "El costo depende del tamaño, materiales y acabados. Ofrecemos cotizaciones gratuitas."
```

---

### Caso 2: Servicio de Remodelación (Sin Testimonios)

```yaml
heroConfig:
  chips:
    - title: "Rápida Ejecución"
      description: "Proyectos en tiempo récord"
      icon: "ph:clock-fill"
      colorScheme: "primary"
    
    - title: "Sin Interrupciones"
      description: "Puedes seguir viviendo en tu hogar"
      icon: "ph:house"
      colorScheme: "secondary"
  
  ctaButton:
    text: "Solicitar Presupuesto"
    actionType: "page"
    url: "/contacto"

testimonialsSection:
  enabled: false  # ← Sección desactivada

faqsSection:
  enabled: true
  title: "¿Tienes Dudas sobre la Remodelación?"
  tagline: "PREGUNTAS COMUNES"
  items:
    - question: "¿Cuánto tiempo dura una remodelación?"
      answer: "Dependiendo del tamaño, entre 2 semanas y 2 meses."
```

---

### Caso 3: Servicio Minimalista (Solo 1 Chip)

```yaml
heroConfig:
  chips:
    - title: "Diseño Arquitectónico Profesional"
      description: "Planos y renderizados de alta calidad"
      icon: "ph:pencil-ruler"
      colorScheme: "primary"
  
  ctaButton:
    text: "Agendar Consulta"
    actionType: "whatsapp"
    whatsappNumber: "+593981234567"

testimonialsSection:
  enabled: true
  items: []  # Sin testimonios aún

faqsSection:
  enabled: false  # Sin FAQs
```

---

## 🎨 Mejores Prácticas

### Para Chips

1. ✅ **Usa entre 2-3 chips** para mejor diseño
2. ✅ **Alterna colores** (primary/secondary) para contraste visual
3. ✅ **Mensajes cortos** - máximo 50 caracteres en descripción
4. ✅ **Iconos relevantes** - que representen el concepto

### Para Botón CTA

1. ✅ **WhatsApp para contacto inmediato** - ideal para consultas rápidas
2. ✅ **Página de contacto para formularios** - ideal para cotizaciones detalladas
3. ✅ **Texto claro y accionable** - "Contactar Ahora", "Solicitar Cotización"

### Para Testimonios

1. ✅ **Activa solo si tienes 3+ testimonios reales**
2. ✅ **Usa testimonios con nombres completos y contexto**
3. ✅ **Varía las calificaciones** (no todos 5 estrellas puede parecer falso)

### Para FAQs

1. ✅ **Incluye 3-5 preguntas relevantes**
2. ✅ **Respuestas concisas pero completas**
3. ✅ **Actualiza regularmente** basándote en preguntas reales de clientes

---

## 🔧 Retrocompatibilidad

El sistema mantiene compatibilidad con la estructura anterior:

- Si no configuras `heroConfig`, se usan chips por defecto
- Si no usas `testimonialsSection`, el sistema lee `testimonials` (estructura anterior)
- Si no usas `faqsSection`, el sistema lee `faqs` (estructura anterior)

Esto significa que **todos los servicios existentes seguirán funcionando sin cambios**.

---

## ❓ Preguntas Frecuentes

### ¿Puedo usar diferentes números de WhatsApp por servicio?

Sí, cada servicio puede tener su propio número de WhatsApp configurado independientemente.

### ¿Qué pasa si dejo los chips vacíos?

Se mostrarán automáticamente 2 chips por defecto: "Calidad Premium" y "Equipo Profesional".

### ¿Puedo ocultar ambas secciones (Testimonios y FAQs)?

Sí, simplemente configura `enabled: false` en ambas secciones.

### ¿Los cambios se reflejan inmediatamente?

Sí, después de guardar en el CMS, los cambios se subirán a GitHub y Netlify los desplegará automáticamente (toma 1-3 minutos).

---

## 📚 Recursos Adicionales

- **Phosphor Icons:** https://phosphoricons.com/
- **Formato WhatsApp:** https://faq.whatsapp.com/general/chats/how-to-use-click-to-chat
- **Guía Principal del CMS:** Ver `GUIA_USO_CMS.md`

---

## 🆘 Soporte

Si tienes problemas con la configuración:

1. Verifica que el formato del número de WhatsApp sea correcto
2. Asegúrate de que los iconos existan en Phosphor Icons
3. Revisa que `enabled` esté en `true` o `false` (sin comillas)
4. Consulta los ejemplos prácticos de esta guía

---

**Fecha de creación:** Noviembre 2025  
**Versión:** 2.0  
**Última actualización:** Controles avanzados para servicios
