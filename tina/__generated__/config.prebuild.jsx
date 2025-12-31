// tina/config.ts
import { defineConfig as defineConfig2 } from "tinacms";

// tina/fields/cloudinary-fields.tsx
import React from "react";
import { wrapFieldsWithMeta } from "tinacms";
var ImagePreviewField = wrapFieldsWithMeta(({ input }) => {
  const { value, onChange } = input;
  const getPreviewUrl = (url) => {
    if (url && url.includes("cloudinary.com") && url.includes("/upload/")) {
      return url.replace("/upload/", "/upload/w_400,h_250,c_fill,q_auto/");
    }
    return url;
  };
  return React.createElement("div", { style: { marginBottom: "8px" } }, value && React.createElement("div", { style: {
    marginBottom: "12px",
    borderRadius: "8px",
    overflow: "hidden",
    border: "2px solid #e5e7eb",
    backgroundColor: "#f3f4f6",
    maxWidth: "400px"
  } }, React.createElement(
    "img",
    {
      src: getPreviewUrl(value),
      alt: "Previsualizaci\xF3n",
      style: { width: "100%", height: "auto", display: "block" },
      onError: (e) => {
        e.target.style.display = "none";
      }
    }
  )), React.createElement(
    "input",
    {
      type: "text",
      value: value || "",
      onChange: (e) => onChange(e.target.value),
      placeholder: "Pega la URL de Cloudinary aqu\xED...",
      style: {
        width: "100%",
        padding: "8px 12px",
        border: "1px solid #d1d5db",
        borderRadius: "6px",
        fontSize: "14px",
        boxSizing: "border-box"
      }
    }
  ), value && React.createElement(
    "button",
    {
      type: "button",
      onClick: () => onChange(""),
      style: {
        marginTop: "8px",
        padding: "6px 12px",
        backgroundColor: "#fee2e2",
        color: "#dc2626",
        border: "1px solid #fecaca",
        borderRadius: "6px",
        cursor: "pointer",
        fontSize: "13px"
      }
    },
    "Quitar imagen"
  ));
});
var ImageGalleryField = wrapFieldsWithMeta(({ input }) => {
  const { value = [], onChange } = input;
  const [newUrl, setNewUrl] = React.useState("");
  const handleAddImage = () => {
    if (newUrl.trim()) {
      onChange([...value, newUrl.trim()]);
      setNewUrl("");
    }
  };
  const handleRemoveImage = (index) => {
    onChange(value.filter((_, i) => i !== index));
  };
  const getThumbnailUrl = (url) => {
    if (url.includes("cloudinary.com") && url.includes("/upload/")) {
      return url.replace("/upload/", "/upload/w_150,h_150,c_fill,q_auto/");
    }
    return url;
  };
  return React.createElement("div", null, React.createElement("div", { style: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(100px, 1fr))",
    gap: "10px",
    marginBottom: "12px"
  } }, value.map((url, index) => React.createElement("div", { key: index, style: {
    position: "relative",
    aspectRatio: "1",
    borderRadius: "6px",
    overflow: "hidden",
    border: "2px solid #e5e7eb",
    backgroundColor: "#f3f4f6"
  } }, React.createElement(
    "img",
    {
      src: getThumbnailUrl(url),
      alt: `Imagen ${index + 1}`,
      style: { width: "100%", height: "100%", objectFit: "cover" },
      onError: (e) => {
        e.target.src = 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100"><rect fill="%23f3f4f6" width="100" height="100"/><text x="50%" y="50%" text-anchor="middle" dy=".3em" fill="%239ca3af" font-size="10">Error</text></svg>';
      }
    }
  ), React.createElement(
    "button",
    {
      type: "button",
      onClick: () => handleRemoveImage(index),
      style: {
        position: "absolute",
        top: "2px",
        right: "2px",
        width: "20px",
        height: "20px",
        borderRadius: "50%",
        backgroundColor: "rgba(239, 68, 68, 0.9)",
        color: "white",
        border: "none",
        cursor: "pointer",
        fontSize: "12px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center"
      }
    },
    "\xD7"
  ), React.createElement("span", { style: {
    position: "absolute",
    bottom: "2px",
    left: "2px",
    backgroundColor: "rgba(0,0,0,0.6)",
    color: "white",
    padding: "1px 4px",
    borderRadius: "3px",
    fontSize: "10px"
  } }, index + 1)))), React.createElement("div", { style: { display: "flex", gap: "8px" } }, React.createElement(
    "input",
    {
      type: "text",
      value: newUrl,
      onChange: (e) => setNewUrl(e.target.value),
      onKeyPress: (e) => e.key === "Enter" && (e.preventDefault(), handleAddImage()),
      placeholder: "Pega URL de Cloudinary...",
      style: {
        flex: 1,
        padding: "8px 12px",
        border: "1px solid #d1d5db",
        borderRadius: "6px",
        fontSize: "14px"
      }
    }
  ), React.createElement(
    "button",
    {
      type: "button",
      onClick: handleAddImage,
      disabled: !newUrl.trim(),
      style: {
        padding: "8px 16px",
        backgroundColor: newUrl.trim() ? "#2563eb" : "#9ca3af",
        color: "white",
        border: "none",
        borderRadius: "6px",
        cursor: newUrl.trim() ? "pointer" : "not-allowed",
        fontSize: "14px"
      }
    },
    "+"
  )), React.createElement("p", { style: { marginTop: "6px", fontSize: "11px", color: "#6b7280" } }, value.length, " ", value.length === 1 ? "imagen" : "im\xE1genes"));
});

// tina/fields/page-blocks.ts
var PREVIEW_BASE_URL = false ? "" : "http://localhost:4321";
var getPreviewSrc = (filename) => `${PREVIEW_BASE_URL}/admin/previews/${filename}`;
var animationFields = [
  {
    type: "object",
    name: "animation",
    label: "Configuraci\xF3n de Animaci\xF3n",
    fields: [
      {
        type: "boolean",
        name: "enabled",
        label: "Habilitar Animaci\xF3n"
      },
      {
        type: "string",
        name: "type",
        label: "Tipo de Animaci\xF3n",
        options: [
          { value: "none", label: "Sin animaci\xF3n" },
          { value: "fade-in", label: "Aparecer (Fade In)" },
          { value: "fade-up", label: "Aparecer desde abajo" },
          { value: "fade-down", label: "Aparecer desde arriba" },
          { value: "fade-left", label: "Aparecer desde izquierda" },
          { value: "fade-right", label: "Aparecer desde derecha" },
          { value: "zoom-in", label: "Zoom In" },
          { value: "zoom-out", label: "Zoom Out" },
          { value: "flip-up", label: "Voltear hacia arriba" },
          { value: "flip-down", label: "Voltear hacia abajo" },
          { value: "slide-up", label: "Deslizar hacia arriba" },
          { value: "slide-down", label: "Deslizar hacia abajo" },
          { value: "slide-left", label: "Deslizar hacia izquierda" },
          { value: "slide-right", label: "Deslizar hacia derecha" }
        ]
      },
      {
        type: "string",
        name: "duration",
        label: "Duraci\xF3n",
        options: [
          { value: "300", label: "R\xE1pida (300ms)" },
          { value: "500", label: "Normal (500ms)" },
          { value: "700", label: "Lenta (700ms)" },
          { value: "1000", label: "Muy lenta (1s)" }
        ]
      },
      {
        type: "string",
        name: "delay",
        label: "Retraso",
        options: [
          { value: "0", label: "Sin retraso" },
          { value: "100", label: "100ms" },
          { value: "200", label: "200ms" },
          { value: "300", label: "300ms" },
          { value: "500", label: "500ms" }
        ]
      },
      {
        type: "string",
        name: "easing",
        label: "Curva de Animaci\xF3n",
        options: [
          { value: "ease", label: "Ease (suave)" },
          { value: "ease-in", label: "Ease In" },
          { value: "ease-out", label: "Ease Out" },
          { value: "ease-in-out", label: "Ease In-Out" },
          { value: "linear", label: "Lineal" }
        ]
      },
      {
        type: "boolean",
        name: "stagger",
        label: "Animar elementos uno a uno",
        description: "Para listas de elementos (servicios, proyectos, etc.)"
      }
    ]
  }
];
var sectionConfigFields = [
  {
    type: "object",
    name: "sectionConfig",
    label: "Configuraci\xF3n de Secci\xF3n",
    fields: [
      {
        type: "string",
        name: "id",
        label: "ID de la Secci\xF3n",
        description: "Para navegaci\xF3n interna (sin espacios ni caracteres especiales)"
      },
      {
        type: "string",
        name: "backgroundColor",
        label: "Color de Fondo",
        options: [
          { value: "white", label: "Blanco" },
          { value: "gray-50", label: "Gris muy claro" },
          { value: "gray-100", label: "Gris claro" },
          { value: "gray-900", label: "Gris oscuro" },
          { value: "primary", label: "Color Primario" },
          { value: "secondary", label: "Color Secundario" },
          { value: "accent", label: "Color de Acento" },
          { value: "transparent", label: "Transparente" }
        ]
      },
      {
        type: "string",
        name: "paddingTop",
        label: "Espaciado Superior",
        options: [
          { value: "none", label: "Sin espaciado" },
          { value: "sm", label: "Peque\xF1o" },
          { value: "md", label: "Mediano" },
          { value: "lg", label: "Grande" },
          { value: "xl", label: "Extra grande" }
        ]
      },
      {
        type: "string",
        name: "paddingBottom",
        label: "Espaciado Inferior",
        options: [
          { value: "none", label: "Sin espaciado" },
          { value: "sm", label: "Peque\xF1o" },
          { value: "md", label: "Mediano" },
          { value: "lg", label: "Grande" },
          { value: "xl", label: "Extra grande" }
        ]
      },
      {
        type: "boolean",
        name: "fullWidth",
        label: "Ancho Completo"
      },
      {
        type: "boolean",
        name: "visible",
        label: "Secci\xF3n Visible",
        description: "Desactiva para ocultar temporalmente esta secci\xF3n"
      }
    ]
  }
];
var heroSection = {
  name: "hero",
  label: "Hero Principal",
  ui: {
    previewSrc: getPreviewSrc("hero.svg"),
    defaultItem: {
      title: "T\xEDtulo Principal",
      subtitle: "Subt\xEDtulo descriptivo",
      ctaText: "Cont\xE1ctanos",
      ctaLink: "/contacto"
    }
  },
  fields: [
    {
      type: "string",
      name: "title",
      label: "T\xEDtulo"
    },
    {
      type: "string",
      name: "subtitle",
      label: "Subt\xEDtulo",
      ui: { component: "textarea" }
    },
    {
      type: "image",
      name: "backgroundImage",
      label: "Imagen de Fondo"
    },
    {
      type: "string",
      name: "backgroundVideo",
      label: "Video de Fondo (opcional)",
      description: "URL de video de Cloudinary"
    },
    {
      type: "string",
      name: "ctaText",
      label: "Texto del Bot\xF3n"
    },
    {
      type: "string",
      name: "ctaLink",
      label: "Enlace del Bot\xF3n"
    },
    {
      type: "string",
      name: "secondaryCtaText",
      label: "Texto del Bot\xF3n Secundario"
    },
    {
      type: "string",
      name: "secondaryCtaLink",
      label: "Enlace del Bot\xF3n Secundario"
    },
    {
      type: "string",
      name: "alignment",
      label: "Alineaci\xF3n del Contenido",
      options: [
        { value: "left", label: "Izquierda" },
        { value: "center", label: "Centro" },
        { value: "right", label: "Derecha" }
      ]
    },
    {
      type: "boolean",
      name: "overlay",
      label: "Mostrar Overlay Oscuro"
    }
  ]
};
var aboutSection = {
  name: "about",
  label: "Sobre Nosotros",
  ui: {
    previewSrc: getPreviewSrc("about.svg"),
    defaultItem: {
      title: "Sobre Nosotros",
      showStats: true
    }
  },
  fields: [
    {
      type: "string",
      name: "title",
      label: "T\xEDtulo de la Secci\xF3n"
    },
    {
      type: "string",
      name: "subtitle",
      label: "Subt\xEDtulo"
    },
    {
      type: "string",
      name: "content",
      label: "Contenido",
      ui: { component: "textarea" }
    },
    {
      type: "image",
      name: "image",
      label: "Imagen",
      description: "Se sube a Cloudinary"
    },
    {
      type: "string",
      name: "imagePosition",
      label: "Posici\xF3n de Imagen",
      options: [
        { value: "left", label: "Izquierda" },
        { value: "right", label: "Derecha" }
      ]
    },
    {
      type: "boolean",
      name: "showStats",
      label: "Mostrar Estad\xEDsticas"
    },
    {
      type: "object",
      name: "stats",
      label: "Estad\xEDsticas",
      list: true,
      fields: [
        { type: "string", name: "value", label: "Valor" },
        { type: "string", name: "label", label: "Etiqueta" }
      ]
    },
    {
      type: "string",
      name: "ctaText",
      label: "Texto del Bot\xF3n"
    },
    {
      type: "string",
      name: "ctaLink",
      label: "Enlace del Bot\xF3n"
    }
  ]
};
var servicesSection = {
  name: "services",
  label: "Servicios",
  ui: {
    previewSrc: getPreviewSrc("services.svg"),
    defaultItem: {
      title: "Nuestros Servicios",
      layout: "grid"
    }
  },
  fields: [
    {
      type: "string",
      name: "title",
      label: "T\xEDtulo de la Secci\xF3n"
    },
    {
      type: "string",
      name: "subtitle",
      label: "Subt\xEDtulo",
      ui: { component: "textarea" }
    },
    {
      type: "string",
      name: "layout",
      label: "Dise\xF1o",
      options: [
        { value: "grid", label: "Cuadr\xEDcula" },
        { value: "carousel", label: "Carrusel" },
        { value: "list", label: "Lista" },
        { value: "accordion", label: "Acorde\xF3n" }
      ]
    },
    {
      type: "object",
      name: "items",
      label: "Servicios",
      list: true,
      fields: [
        { type: "string", name: "title", label: "T\xEDtulo" },
        { type: "string", name: "description", label: "Descripci\xF3n", ui: { component: "textarea" } },
        { type: "string", name: "icon", label: "Icono" },
        { type: "image", name: "image", label: "Imagen" },
        { type: "string", name: "link", label: "Enlace" }
      ]
    },
    {
      type: "string",
      name: "ctaText",
      label: "Texto del Bot\xF3n Ver M\xE1s"
    },
    {
      type: "string",
      name: "ctaLink",
      label: "Enlace del Bot\xF3n"
    }
  ]
};
var projectsSection = {
  name: "projects",
  label: "Proyectos / Portafolio",
  ui: {
    previewSrc: getPreviewSrc("projects.svg"),
    defaultItem: {
      title: "Nuestros Proyectos",
      layout: "grid",
      limit: 6,
      showFilters: false
    }
  },
  fields: [
    {
      type: "string",
      name: "title",
      label: "T\xEDtulo de la Secci\xF3n"
    },
    {
      type: "string",
      name: "subtitle",
      label: "Subt\xEDtulo",
      ui: { component: "textarea" }
    },
    {
      type: "string",
      name: "layout",
      label: "Dise\xF1o",
      options: [
        { value: "grid", label: "Cuadr\xEDcula" },
        { value: "masonry", label: "Mosaico" },
        { value: "carousel", label: "Carrusel" },
        { value: "slider", label: "Slider Grande" }
      ]
    },
    {
      type: "number",
      name: "limit",
      label: "N\xFAmero de Proyectos a Mostrar"
    },
    {
      type: "boolean",
      name: "showFilters",
      label: "Mostrar Filtros por Categor\xEDa"
    },
    {
      type: "string",
      name: "filterCategories",
      label: "Categor\xEDas a Mostrar",
      list: true,
      options: [
        { value: "conjunto-habitacional", label: "Conjunto Habitacional" },
        { value: "diseno-residencial", label: "Dise\xF1o Residencial" },
        { value: "diseno-retail", label: "Dise\xF1o Retail" },
        { value: "edificio-comercial", label: "Edificio Comercial" }
      ]
    },
    {
      type: "string",
      name: "ctaText",
      label: "Texto del Bot\xF3n Ver Todos"
    },
    {
      type: "string",
      name: "ctaLink",
      label: "Enlace del Bot\xF3n"
    }
  ]
};
var testimonialsSection = {
  name: "testimonials",
  label: "Testimonios",
  ui: {
    previewSrc: getPreviewSrc("testimonials.svg"),
    defaultItem: {
      title: "Lo que dicen nuestros clientes",
      layout: "carousel"
    }
  },
  fields: [
    {
      type: "string",
      name: "title",
      label: "T\xEDtulo de la Secci\xF3n"
    },
    {
      type: "string",
      name: "subtitle",
      label: "Subt\xEDtulo"
    },
    {
      type: "string",
      name: "layout",
      label: "Dise\xF1o",
      options: [
        { value: "carousel", label: "Carrusel" },
        { value: "grid", label: "Cuadr\xEDcula" },
        { value: "single", label: "Uno a la vez" }
      ]
    },
    {
      type: "object",
      name: "items",
      label: "Testimonios",
      list: true,
      fields: [
        { type: "string", name: "quote", label: "Cita", ui: { component: "textarea" }, required: true },
        { type: "string", name: "author", label: "Nombre del Autor" },
        { type: "string", name: "position", label: "Cargo/Empresa" },
        { type: "image", name: "avatar", label: "Foto del Autor" },
        { type: "number", name: "rating", label: "Calificaci\xF3n (1-5)" }
      ]
    }
  ]
};
var ctaSection = {
  name: "cta",
  label: "Llamado a la Acci\xF3n (CTA)",
  ui: {
    previewSrc: getPreviewSrc("cta.svg"),
    defaultItem: {
      title: "\xBFListo para comenzar tu proyecto?",
      buttonText: "Cont\xE1ctanos",
      buttonLink: "/contacto",
      style: "default"
    }
  },
  fields: [
    {
      type: "string",
      name: "title",
      label: "T\xEDtulo"
    },
    {
      type: "string",
      name: "description",
      label: "Descripci\xF3n",
      ui: { component: "textarea" }
    },
    {
      type: "image",
      name: "backgroundImage",
      label: "Imagen de Fondo"
    },
    {
      type: "string",
      name: "buttonText",
      label: "Texto del Bot\xF3n"
    },
    {
      type: "string",
      name: "buttonLink",
      label: "Enlace del Bot\xF3n"
    },
    {
      type: "string",
      name: "secondaryButtonText",
      label: "Texto del Bot\xF3n Secundario"
    },
    {
      type: "string",
      name: "secondaryButtonLink",
      label: "Enlace del Bot\xF3n Secundario"
    },
    {
      type: "string",
      name: "style",
      label: "Estilo",
      options: [
        { value: "default", label: "Por Defecto" },
        { value: "gradient", label: "Gradiente" },
        { value: "dark", label: "Oscuro" },
        { value: "light", label: "Claro" }
      ]
    }
  ]
};
var contactSection = {
  name: "contact",
  label: "Formulario de Contacto",
  ui: {
    previewSrc: getPreviewSrc("contact.svg"),
    defaultItem: {
      title: "Cont\xE1ctanos",
      showMap: true,
      showForm: true
    }
  },
  fields: [
    {
      type: "string",
      name: "title",
      label: "T\xEDtulo"
    },
    {
      type: "string",
      name: "subtitle",
      label: "Subt\xEDtulo",
      ui: { component: "textarea" }
    },
    {
      type: "boolean",
      name: "showForm",
      label: "Mostrar Formulario"
    },
    {
      type: "boolean",
      name: "showMap",
      label: "Mostrar Mapa"
    },
    {
      type: "boolean",
      name: "showInfo",
      label: "Mostrar Informaci\xF3n de Contacto"
    },
    {
      type: "object",
      name: "info",
      label: "Informaci\xF3n de Contacto",
      fields: [
        { type: "string", name: "address", label: "Direcci\xF3n" },
        { type: "string", name: "phone", label: "Tel\xE9fono" },
        { type: "string", name: "email", label: "Email" },
        { type: "string", name: "hours", label: "Horario de Atenci\xF3n" }
      ]
    },
    {
      type: "string",
      name: "mapUrl",
      label: "URL de Google Maps Embed"
    }
  ]
};
var teamSection = {
  name: "team",
  label: "Equipo",
  ui: {
    previewSrc: getPreviewSrc("team.svg"),
    defaultItem: {
      title: "Nuestro Equipo",
      layout: "grid"
    }
  },
  fields: [
    {
      type: "string",
      name: "title",
      label: "T\xEDtulo de la Secci\xF3n"
    },
    {
      type: "string",
      name: "subtitle",
      label: "Subt\xEDtulo"
    },
    {
      type: "string",
      name: "layout",
      label: "Dise\xF1o",
      options: [
        { value: "grid", label: "Cuadr\xEDcula" },
        { value: "carousel", label: "Carrusel" }
      ]
    },
    {
      type: "object",
      name: "members",
      label: "Miembros del Equipo",
      list: true,
      fields: [
        { type: "string", name: "name", label: "Nombre", required: true },
        { type: "string", name: "position", label: "Cargo" },
        { type: "string", name: "bio", label: "Biograf\xEDa", ui: { component: "textarea" } },
        { type: "image", name: "photo", label: "Foto" },
        { type: "string", name: "linkedin", label: "LinkedIn" },
        { type: "string", name: "email", label: "Email" }
      ]
    }
  ]
};
var faqSection = {
  name: "faq",
  label: "Preguntas Frecuentes",
  ui: {
    previewSrc: getPreviewSrc("faq.svg"),
    defaultItem: {
      title: "Preguntas Frecuentes"
    }
  },
  fields: [
    {
      type: "string",
      name: "title",
      label: "T\xEDtulo de la Secci\xF3n"
    },
    {
      type: "string",
      name: "subtitle",
      label: "Subt\xEDtulo"
    },
    {
      type: "object",
      name: "items",
      label: "Preguntas",
      list: true,
      fields: [
        { type: "string", name: "question", label: "Pregunta", required: true },
        { type: "string", name: "answer", label: "Respuesta", ui: { component: "textarea" }, required: true }
      ]
    }
  ]
};
var gallerySection = {
  name: "gallery",
  label: "Galer\xEDa de Im\xE1genes",
  ui: {
    previewSrc: getPreviewSrc("gallery.svg"),
    defaultItem: {
      title: "Galer\xEDa",
      layout: "grid",
      columns: 3
    }
  },
  fields: [
    {
      type: "string",
      name: "title",
      label: "T\xEDtulo de la Secci\xF3n"
    },
    {
      type: "string",
      name: "subtitle",
      label: "Subt\xEDtulo"
    },
    {
      type: "string",
      name: "layout",
      label: "Dise\xF1o",
      options: [
        { value: "grid", label: "Cuadr\xEDcula" },
        { value: "masonry", label: "Mosaico" },
        { value: "slider", label: "Slider" }
      ]
    },
    {
      type: "number",
      name: "columns",
      label: "Columnas (para grid)"
    },
    {
      type: "string",
      name: "images",
      label: "Im\xE1genes",
      list: true,
      ui: {
        // @ts-ignore
        component: ImageGalleryField
      }
    }
  ]
};
var featuresSection = {
  name: "features",
  label: "Valores / Caracter\xEDsticas",
  ui: {
    previewSrc: getPreviewSrc("features.svg"),
    defaultItem: {
      title: "Nuestros Valores",
      layout: "grid"
    }
  },
  fields: [
    {
      type: "string",
      name: "title",
      label: "T\xEDtulo de la Secci\xF3n"
    },
    {
      type: "string",
      name: "subtitle",
      label: "Subt\xEDtulo"
    },
    {
      type: "string",
      name: "layout",
      label: "Dise\xF1o",
      options: [
        { value: "grid", label: "Cuadr\xEDcula" },
        { value: "list", label: "Lista" },
        { value: "cards", label: "Tarjetas" }
      ]
    },
    {
      type: "object",
      name: "items",
      label: "Caracter\xEDsticas",
      list: true,
      fields: [
        { type: "string", name: "title", label: "T\xEDtulo" },
        { type: "string", name: "description", label: "Descripci\xF3n", ui: { component: "textarea" } },
        { type: "string", name: "icon", label: "Icono" },
        { type: "image", name: "image", label: "Imagen" }
      ]
    }
  ]
};
var contentSection = {
  name: "content",
  label: "Contenido Libre",
  ui: {
    previewSrc: getPreviewSrc("content.svg")
  },
  fields: [
    {
      type: "string",
      name: "title",
      label: "T\xEDtulo (opcional)"
    },
    {
      type: "rich-text",
      name: "body",
      label: "Contenido"
    },
    {
      type: "string",
      name: "backgroundColor",
      label: "Color de Fondo",
      options: [
        { value: "white", label: "Blanco" },
        { value: "gray", label: "Gris Claro" },
        { value: "dark", label: "Oscuro" },
        { value: "primary", label: "Color Principal" }
      ]
    },
    {
      type: "string",
      name: "maxWidth",
      label: "Ancho M\xE1ximo",
      options: [
        { value: "sm", label: "Peque\xF1o" },
        { value: "md", label: "Mediano" },
        { value: "lg", label: "Grande" },
        { value: "full", label: "Completo" }
      ]
    }
  ]
};
var spacerSection = {
  name: "spacer",
  label: "Separador / Espaciador",
  ui: {
    previewSrc: getPreviewSrc("spacer.svg")
  },
  fields: [
    {
      type: "string",
      name: "size",
      label: "Tama\xF1o",
      options: [
        { value: "sm", label: "Peque\xF1o (32px)" },
        { value: "md", label: "Mediano (64px)" },
        { value: "lg", label: "Grande (96px)" },
        { value: "xl", label: "Extra Grande (128px)" }
      ]
    },
    {
      type: "boolean",
      name: "showDivider",
      label: "Mostrar L\xEDnea Divisoria"
    }
  ]
};
var addCommonFields = (template) => ({
  ...template,
  fields: [
    ...template.fields,
    ...animationFields,
    ...sectionConfigFields
  ]
});
var pageBlockTemplates = [
  addCommonFields(heroSection),
  addCommonFields(aboutSection),
  addCommonFields(servicesSection),
  addCommonFields(projectsSection),
  addCommonFields(testimonialsSection),
  addCommonFields(ctaSection),
  addCommonFields(contactSection),
  addCommonFields(teamSection),
  addCommonFields(faqSection),
  addCommonFields(gallerySection),
  addCommonFields(featuresSection),
  addCommonFields(contentSection),
  addCommonFields(spacerSection)
];

// tina/fields/color-field.tsx
import React2 from "react";
import { wrapFieldsWithMeta as wrapFieldsWithMeta2 } from "tinacms";
var ColorPickerField = wrapFieldsWithMeta2(({ input }) => {
  const [displayValue, setDisplayValue] = React2.useState(input.value || "#000000");
  const [originalColor] = React2.useState(input.value || "#000000");
  React2.useEffect(() => {
    setDisplayValue(input.value || "#000000");
  }, [input.value]);
  const handleColorChange = (e) => {
    const newColor = e.target.value;
    setDisplayValue(newColor);
    input.onChange(newColor);
  };
  const handleTextChange = (e) => {
    const newValue = e.target.value;
    setDisplayValue(newValue);
    if (/^#[0-9A-Fa-f]{6}$/.test(newValue)) {
      input.onChange(newValue);
    }
  };
  const hasChanged = displayValue !== originalColor;
  return React2.createElement("div", { style: { display: "flex", alignItems: "center", gap: "12px" } }, React2.createElement(
    "input",
    {
      type: "color",
      value: displayValue.startsWith("#") ? displayValue : "#000000",
      onChange: handleColorChange,
      style: {
        width: "48px",
        height: "48px",
        padding: "0",
        border: "2px solid #e2e8f0",
        borderRadius: "8px",
        cursor: "pointer",
        backgroundColor: "transparent"
      }
    }
  ), React2.createElement(
    "input",
    {
      type: "text",
      value: displayValue,
      onChange: handleTextChange,
      onBlur: () => {
        if (!/^#[0-9A-Fa-f]{6}$/.test(displayValue)) {
          setDisplayValue(input.value || "#000000");
        }
      },
      placeholder: "#000000",
      style: {
        flex: 1,
        padding: "10px 12px",
        border: "1px solid #e2e8f0",
        borderRadius: "6px",
        fontSize: "14px",
        fontFamily: "monospace",
        backgroundColor: "#f7fafc"
      }
    }
  ), React2.createElement(
    "div",
    {
      style: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "4px"
      }
    },
    React2.createElement(
      "div",
      {
        style: {
          width: "48px",
          height: "48px",
          backgroundColor: originalColor.startsWith("#") ? originalColor : "#000000",
          borderRadius: "8px",
          border: hasChanged ? "2px solid #3182ce" : "2px solid #e2e8f0",
          boxShadow: "inset 0 2px 4px rgba(0,0,0,0.1)"
        },
        title: `Color original: ${originalColor}`
      }
    ),
    hasChanged && React2.createElement("span", { style: { fontSize: "10px", color: "#718096" } }, "Original")
  ));
});

// tina/fields/contact-fields.tsx
import React3 from "react";
import { wrapFieldsWithMeta as wrapFieldsWithMeta3 } from "tinacms";
var PhoneField = wrapFieldsWithMeta3(({ input }) => {
  const extractDigits = (value) => {
    if (!value) return "";
    const cleaned = value.replace(/[^\d]/g, "");
    const withoutCountry = cleaned.startsWith("593") ? cleaned.slice(3) : cleaned;
    return withoutCountry.slice(0, 10);
  };
  const [digits, setDigits] = React3.useState(() => extractDigits(input.value || ""));
  React3.useEffect(() => {
    const newDigits = extractDigits(input.value || "");
    if (newDigits !== digits) {
      setDigits(newDigits);
    }
  }, [input.value]);
  const formatDisplay = (value) => {
    if (!value) return "";
    const cleaned = value.replace(/\D/g, "").slice(0, 10);
    if (cleaned.length <= 2) return cleaned;
    if (cleaned.length <= 5) return `${cleaned.slice(0, 2)} ${cleaned.slice(2)}`;
    return `${cleaned.slice(0, 2)} ${cleaned.slice(2, 5)} ${cleaned.slice(5)}`;
  };
  const handleChange = (e) => {
    const rawValue = e.target.value;
    const onlyDigits = rawValue.replace(/\D/g, "").slice(0, 10);
    setDigits(onlyDigits);
    input.onChange(onlyDigits ? `+593 ${formatDisplay(onlyDigits)}` : "");
  };
  const isValid = digits.length >= 9;
  const isEmpty = digits.length === 0;
  return React3.createElement("div", { style: { display: "flex", flexDirection: "column", gap: "4px" } }, React3.createElement("div", { style: { display: "flex", alignItems: "center", gap: "8px" } }, React3.createElement(
    "div",
    {
      style: {
        padding: "10px 12px",
        backgroundColor: "#edf2f7",
        border: "1px solid #e2e8f0",
        borderRadius: "6px 0 0 6px",
        fontSize: "14px",
        fontWeight: "500",
        color: "#4a5568",
        whiteSpace: "nowrap"
      }
    },
    "\u{1F1EA}\u{1F1E8} +593"
  ), React3.createElement(
    "input",
    {
      type: "text",
      value: formatDisplay(digits),
      onChange: handleChange,
      placeholder: "99 999 9999",
      style: {
        flex: 1,
        padding: "10px 12px",
        border: `1px solid ${!isEmpty && !isValid ? "#fc8181" : "#e2e8f0"}`,
        borderRadius: "0 6px 6px 0",
        fontSize: "14px",
        fontFamily: "monospace",
        marginLeft: "-1px"
      }
    }
  ), React3.createElement(
    "span",
    {
      style: {
        fontSize: "12px",
        color: isValid ? "#38a169" : "#a0aec0",
        minWidth: "50px"
      }
    },
    digits.length,
    "/10"
  )), !isEmpty && !isValid && React3.createElement("span", { style: { fontSize: "12px", color: "#e53e3e" } }, "El n\xFAmero debe tener al menos 9 d\xEDgitos"));
});
var EmailField = wrapFieldsWithMeta3(({ input }) => {
  const [value, setValue] = React3.useState(input.value || "");
  const [touched, setTouched] = React3.useState(false);
  React3.useEffect(() => {
    if (input.value !== value) {
      setValue(input.value || "");
    }
  }, [input.value]);
  const isValidEmail = (email) => {
    if (!email) return true;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };
  const handleChange = (e) => {
    const newValue = e.target.value;
    setValue(newValue);
    input.onChange(newValue);
  };
  const isValid = isValidEmail(value);
  const showError = touched && !isValid && value.length > 0;
  return React3.createElement("div", { style: { display: "flex", flexDirection: "column", gap: "4px" } }, React3.createElement("div", { style: { display: "flex", alignItems: "center", gap: "8px" } }, React3.createElement(
    "div",
    {
      style: {
        padding: "10px 12px",
        backgroundColor: "#edf2f7",
        border: "1px solid #e2e8f0",
        borderRadius: "6px 0 0 6px",
        fontSize: "14px"
      }
    },
    "\u2709\uFE0F"
  ), React3.createElement(
    "input",
    {
      type: "email",
      value,
      onChange: handleChange,
      onBlur: () => setTouched(true),
      placeholder: "ejemplo@empresa.com",
      style: {
        flex: 1,
        padding: "10px 12px",
        border: `1px solid ${showError ? "#fc8181" : "#e2e8f0"}`,
        borderRadius: "0 6px 6px 0",
        fontSize: "14px",
        marginLeft: "-1px"
      }
    }
  ), value && React3.createElement("span", { style: { fontSize: "16px", color: isValid ? "#38a169" : "#e53e3e" } }, isValid ? "\u2713" : "\u2717")), showError && React3.createElement("span", { style: { fontSize: "12px", color: "#e53e3e" } }, "Por favor ingresa un email v\xE1lido"));
});
var DAYS_OPTIONS = [
  { value: "lunes", label: "Lunes" },
  { value: "martes", label: "Martes" },
  { value: "miercoles", label: "Mi\xE9rcoles" },
  { value: "jueves", label: "Jueves" },
  { value: "viernes", label: "Viernes" },
  { value: "sabado", label: "S\xE1bado" },
  { value: "domingo", label: "Domingo" }
];
var normalizeDay = (day) => {
  if (!day) return "lunes";
  const normalized = day.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  const found = DAYS_OPTIONS.find(
    (d) => d.value === normalized || d.label.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "") === normalized
  );
  return found?.value || "lunes";
};
var HOURS_OPTIONS = Array.from({ length: 24 }, (_, i) => {
  const hour = i.toString().padStart(2, "0");
  return { value: `${hour}:00`, label: `${hour}:00` };
});
var FULL_HOURS_OPTIONS = HOURS_OPTIONS.flatMap((h) => [
  h,
  { value: h.value.replace(":00", ":30"), label: h.label.replace(":00", ":30") }
]);
var BusinessHoursField = wrapFieldsWithMeta3(({ input }) => {
  const parseHours = (value) => {
    if (!value) {
      return {
        dayFrom: "lunes",
        dayTo: "viernes",
        hourFrom: "08:00",
        hourTo: "17:00"
      };
    }
    const match = value.match(/(\S+)\s*a\s*(\S+):\s*(\d{2}:\d{2})\s*-\s*(\d{2}:\d{2})/i);
    if (match) {
      return {
        dayFrom: normalizeDay(match[1]),
        dayTo: normalizeDay(match[2]),
        hourFrom: match[3],
        hourTo: match[4]
      };
    }
    return {
      dayFrom: "lunes",
      dayTo: "viernes",
      hourFrom: "08:00",
      hourTo: "17:00"
    };
  };
  const [schedule, setSchedule] = React3.useState(() => parseHours(input.value || ""));
  React3.useEffect(() => {
    const parsed = parseHours(input.value || "");
    if (parsed.dayFrom !== schedule.dayFrom || parsed.dayTo !== schedule.dayTo || parsed.hourFrom !== schedule.hourFrom || parsed.hourTo !== schedule.hourTo) {
      setSchedule(parsed);
    }
  }, [input.value]);
  const formatOutput = (sched) => {
    const dayFromLabel = DAYS_OPTIONS.find((d) => d.value === sched.dayFrom)?.label || "Lunes";
    const dayToLabel = DAYS_OPTIONS.find((d) => d.value === sched.dayTo)?.label || "Viernes";
    return `${dayFromLabel} a ${dayToLabel}: ${sched.hourFrom} - ${sched.hourTo}`;
  };
  const handleChange = (field, value) => {
    const newSchedule = { ...schedule, [field]: value };
    setSchedule(newSchedule);
    input.onChange(formatOutput(newSchedule));
  };
  const selectStyle = {
    padding: "8px 12px",
    border: "1px solid #e2e8f0",
    borderRadius: "6px",
    fontSize: "14px",
    backgroundColor: "white",
    cursor: "pointer"
  };
  return React3.createElement("div", { style: { display: "flex", flexDirection: "column", gap: "12px" } }, React3.createElement("div", { style: { display: "flex", alignItems: "center", gap: "8px", flexWrap: "wrap" } }, React3.createElement("span", { style: { fontSize: "14px", color: "#4a5568", minWidth: "50px" } }, "\u{1F4C5} D\xEDas:"), React3.createElement(
    "select",
    {
      value: schedule.dayFrom,
      onChange: (e) => handleChange("dayFrom", e.target.value),
      style: selectStyle
    },
    DAYS_OPTIONS.map((day) => React3.createElement("option", { key: day.value, value: day.value }, day.label))
  ), React3.createElement("span", { style: { fontSize: "14px", color: "#718096" } }, "a"), React3.createElement(
    "select",
    {
      value: schedule.dayTo,
      onChange: (e) => handleChange("dayTo", e.target.value),
      style: selectStyle
    },
    DAYS_OPTIONS.map((day) => React3.createElement("option", { key: day.value, value: day.value }, day.label))
  )), React3.createElement("div", { style: { display: "flex", alignItems: "center", gap: "8px", flexWrap: "wrap" } }, React3.createElement("span", { style: { fontSize: "14px", color: "#4a5568", minWidth: "50px" } }, "\u{1F550} Hora:"), React3.createElement(
    "select",
    {
      value: schedule.hourFrom,
      onChange: (e) => handleChange("hourFrom", e.target.value),
      style: selectStyle
    },
    FULL_HOURS_OPTIONS.map((hour) => React3.createElement("option", { key: hour.value, value: hour.value }, hour.label))
  ), React3.createElement("span", { style: { fontSize: "14px", color: "#718096" } }, "a"), React3.createElement(
    "select",
    {
      value: schedule.hourTo,
      onChange: (e) => handleChange("hourTo", e.target.value),
      style: selectStyle
    },
    FULL_HOURS_OPTIONS.map((hour) => React3.createElement("option", { key: hour.value, value: hour.value }, hour.label))
  )), React3.createElement(
    "div",
    {
      style: {
        padding: "10px 14px",
        backgroundColor: "#f7fafc",
        border: "1px solid #e2e8f0",
        borderRadius: "6px",
        fontSize: "13px",
        color: "#4a5568"
      }
    },
    React3.createElement("strong", null, "Vista previa:"),
    " ",
    formatOutput(schedule)
  ));
});

// tina/fields/social-icon-selector.tsx
import React4 from "react";
import { wrapFieldsWithMeta as wrapFieldsWithMeta4 } from "tinacms";
import {
  FacebookLogo,
  InstagramLogo,
  XLogo,
  TwitterLogo,
  LinkedinLogo,
  YoutubeLogo,
  TiktokLogo,
  WhatsappLogo,
  TelegramLogo,
  MessengerLogo,
  DiscordLogo,
  SlackLogo,
  SkypeLogo,
  WechatLogo,
  GithubLogo,
  GitlabLogo,
  BehanceLogo,
  DribbbleLogo,
  FigmaLogo,
  MediumLogo,
  NotionLogo,
  TwitchLogo,
  PinterestLogo,
  SnapchatLogo,
  SpotifyLogo,
  SoundcloudLogo,
  ApplePodcastsLogo,
  RedditLogo,
  MastodonLogo,
  ThreadsLogo,
  AmazonLogo,
  PaypalLogo,
  StripeLogo,
  GoogleLogo,
  GooglePlayLogo,
  AppStoreLogo,
  AppleLogo,
  AndroidLogo,
  Globe,
  Envelope,
  Phone,
  MapPin,
  Link,
  ShareNetwork
} from "@phosphor-icons/react";
var ICON_COMPONENTS = {
  "ph:facebook-logo": FacebookLogo,
  "ph:facebook-logo-fill": FacebookLogo,
  "ph:instagram-logo": InstagramLogo,
  "ph:instagram-logo-fill": InstagramLogo,
  "ph:x-logo": XLogo,
  "ph:x-logo-fill": XLogo,
  "ph:twitter-logo": TwitterLogo,
  "ph:twitter-logo-fill": TwitterLogo,
  "ph:linkedin-logo": LinkedinLogo,
  "ph:linkedin-logo-fill": LinkedinLogo,
  "ph:youtube-logo": YoutubeLogo,
  "ph:youtube-logo-fill": YoutubeLogo,
  "ph:tiktok-logo": TiktokLogo,
  "ph:tiktok-logo-fill": TiktokLogo,
  "ph:whatsapp-logo": WhatsappLogo,
  "ph:whatsapp-logo-fill": WhatsappLogo,
  "ph:telegram-logo": TelegramLogo,
  "ph:telegram-logo-fill": TelegramLogo,
  "ph:messenger-logo": MessengerLogo,
  "ph:messenger-logo-fill": MessengerLogo,
  "ph:discord-logo": DiscordLogo,
  "ph:discord-logo-fill": DiscordLogo,
  "ph:slack-logo": SlackLogo,
  "ph:slack-logo-fill": SlackLogo,
  "ph:skype-logo": SkypeLogo,
  "ph:skype-logo-fill": SkypeLogo,
  "ph:wechat-logo": WechatLogo,
  "ph:wechat-logo-fill": WechatLogo,
  "ph:github-logo": GithubLogo,
  "ph:github-logo-fill": GithubLogo,
  "ph:gitlab-logo": GitlabLogo,
  "ph:gitlab-logo-fill": GitlabLogo,
  "ph:behance-logo": BehanceLogo,
  "ph:behance-logo-fill": BehanceLogo,
  "ph:dribbble-logo": DribbbleLogo,
  "ph:dribbble-logo-fill": DribbbleLogo,
  "ph:figma-logo": FigmaLogo,
  "ph:figma-logo-fill": FigmaLogo,
  "ph:medium-logo": MediumLogo,
  "ph:medium-logo-fill": MediumLogo,
  "ph:notion-logo": NotionLogo,
  "ph:notion-logo-fill": NotionLogo,
  "ph:twitch-logo": TwitchLogo,
  "ph:twitch-logo-fill": TwitchLogo,
  "ph:pinterest-logo": PinterestLogo,
  "ph:pinterest-logo-fill": PinterestLogo,
  "ph:snapchat-logo": SnapchatLogo,
  "ph:snapchat-logo-fill": SnapchatLogo,
  "ph:spotify-logo": SpotifyLogo,
  "ph:spotify-logo-fill": SpotifyLogo,
  "ph:soundcloud-logo": SoundcloudLogo,
  "ph:soundcloud-logo-fill": SoundcloudLogo,
  "ph:apple-podcasts-logo": ApplePodcastsLogo,
  "ph:apple-podcasts-logo-fill": ApplePodcastsLogo,
  "ph:reddit-logo": RedditLogo,
  "ph:reddit-logo-fill": RedditLogo,
  "ph:mastodon-logo": MastodonLogo,
  "ph:mastodon-logo-fill": MastodonLogo,
  "ph:threads-logo": ThreadsLogo,
  "ph:threads-logo-fill": ThreadsLogo,
  "ph:amazon-logo": AmazonLogo,
  "ph:amazon-logo-fill": AmazonLogo,
  "ph:paypal-logo": PaypalLogo,
  "ph:paypal-logo-fill": PaypalLogo,
  "ph:stripe-logo": StripeLogo,
  "ph:stripe-logo-fill": StripeLogo,
  "ph:google-logo": GoogleLogo,
  "ph:google-logo-fill": GoogleLogo,
  "ph:google-play-logo": GooglePlayLogo,
  "ph:google-play-logo-fill": GooglePlayLogo,
  "ph:app-store-logo": AppStoreLogo,
  "ph:app-store-logo-fill": AppStoreLogo,
  "ph:apple-logo": AppleLogo,
  "ph:apple-logo-fill": AppleLogo,
  "ph:android-logo": AndroidLogo,
  "ph:android-logo-fill": AndroidLogo,
  "ph:globe": Globe,
  "ph:globe-fill": Globe,
  "ph:envelope": Envelope,
  "ph:envelope-fill": Envelope,
  "ph:phone": Phone,
  "ph:phone-fill": Phone,
  "ph:map-pin": MapPin,
  "ph:map-pin-fill": MapPin,
  "ph:link": Link,
  "ph:link-fill": Link,
  "ph:share-network": ShareNetwork,
  "ph:share-network-fill": ShareNetwork
};
function PhosphorIconPreview({ iconName, size = 20 }) {
  const IconComponent = ICON_COMPONENTS[iconName];
  const isFill = iconName.includes("-fill");
  if (!IconComponent) {
    return React4.createElement("span", { style: { fontSize: size, width: size, textAlign: "center" } }, "\u{1F517}");
  }
  return React4.createElement(
    IconComponent,
    {
      size,
      weight: isFill ? "fill" : "regular",
      style: { color: "#4a5568" }
    }
  );
}
var SOCIAL_ICONS = [
  // Principales / Populares
  { value: "ph:facebook-logo", label: "Facebook", category: "popular" },
  { value: "ph:facebook-logo-fill", label: "Facebook (relleno)", category: "popular" },
  { value: "ph:instagram-logo", label: "Instagram", category: "popular" },
  { value: "ph:instagram-logo-fill", label: "Instagram (relleno)", category: "popular" },
  { value: "ph:x-logo", label: "X (Twitter)", category: "popular" },
  { value: "ph:x-logo-fill", label: "X (relleno)", category: "popular" },
  { value: "ph:twitter-logo", label: "Twitter (antiguo)", category: "popular" },
  { value: "ph:twitter-logo-fill", label: "Twitter (relleno)", category: "popular" },
  { value: "ph:linkedin-logo", label: "LinkedIn", category: "popular" },
  { value: "ph:linkedin-logo-fill", label: "LinkedIn (relleno)", category: "popular" },
  { value: "ph:youtube-logo", label: "YouTube", category: "popular" },
  { value: "ph:youtube-logo-fill", label: "YouTube (relleno)", category: "popular" },
  { value: "ph:tiktok-logo", label: "TikTok", category: "popular" },
  { value: "ph:tiktok-logo-fill", label: "TikTok (relleno)", category: "popular" },
  { value: "ph:whatsapp-logo", label: "WhatsApp", category: "popular" },
  { value: "ph:whatsapp-logo-fill", label: "WhatsApp (relleno)", category: "popular" },
  // Mensajería
  { value: "ph:telegram-logo", label: "Telegram", category: "mensajeria" },
  { value: "ph:telegram-logo-fill", label: "Telegram (relleno)", category: "mensajeria" },
  { value: "ph:messenger-logo", label: "Messenger", category: "mensajeria" },
  { value: "ph:messenger-logo-fill", label: "Messenger (relleno)", category: "mensajeria" },
  { value: "ph:discord-logo", label: "Discord", category: "mensajeria" },
  { value: "ph:discord-logo-fill", label: "Discord (relleno)", category: "mensajeria" },
  { value: "ph:slack-logo", label: "Slack", category: "mensajeria" },
  { value: "ph:slack-logo-fill", label: "Slack (relleno)", category: "mensajeria" },
  { value: "ph:skype-logo", label: "Skype", category: "mensajeria" },
  { value: "ph:skype-logo-fill", label: "Skype (relleno)", category: "mensajeria" },
  { value: "ph:wechat-logo", label: "WeChat", category: "mensajeria" },
  { value: "ph:wechat-logo-fill", label: "WeChat (relleno)", category: "mensajeria" },
  // Profesional / Desarrollo
  { value: "ph:github-logo", label: "GitHub", category: "profesional" },
  { value: "ph:github-logo-fill", label: "GitHub (relleno)", category: "profesional" },
  { value: "ph:gitlab-logo", label: "GitLab", category: "profesional" },
  { value: "ph:gitlab-logo-fill", label: "GitLab (relleno)", category: "profesional" },
  { value: "ph:behance-logo", label: "Behance", category: "profesional" },
  { value: "ph:behance-logo-fill", label: "Behance (relleno)", category: "profesional" },
  { value: "ph:dribbble-logo", label: "Dribbble", category: "profesional" },
  { value: "ph:dribbble-logo-fill", label: "Dribbble (relleno)", category: "profesional" },
  { value: "ph:figma-logo", label: "Figma", category: "profesional" },
  { value: "ph:figma-logo-fill", label: "Figma (relleno)", category: "profesional" },
  { value: "ph:medium-logo", label: "Medium", category: "profesional" },
  { value: "ph:medium-logo-fill", label: "Medium (relleno)", category: "profesional" },
  { value: "ph:notion-logo", label: "Notion", category: "profesional" },
  { value: "ph:notion-logo-fill", label: "Notion (relleno)", category: "profesional" },
  // Video / Streaming
  { value: "ph:twitch-logo", label: "Twitch", category: "video" },
  { value: "ph:twitch-logo-fill", label: "Twitch (relleno)", category: "video" },
  // Fotos / Imágenes
  { value: "ph:pinterest-logo", label: "Pinterest", category: "fotos" },
  { value: "ph:pinterest-logo-fill", label: "Pinterest (relleno)", category: "fotos" },
  { value: "ph:snapchat-logo", label: "Snapchat", category: "fotos" },
  { value: "ph:snapchat-logo-fill", label: "Snapchat (relleno)", category: "fotos" },
  // Música / Audio
  { value: "ph:spotify-logo", label: "Spotify", category: "musica" },
  { value: "ph:spotify-logo-fill", label: "Spotify (relleno)", category: "musica" },
  { value: "ph:soundcloud-logo", label: "SoundCloud", category: "musica" },
  { value: "ph:soundcloud-logo-fill", label: "SoundCloud (relleno)", category: "musica" },
  { value: "ph:apple-podcasts-logo", label: "Apple Podcasts", category: "musica" },
  { value: "ph:apple-podcasts-logo-fill", label: "Apple Podcasts (relleno)", category: "musica" },
  // Social Alternativo
  { value: "ph:reddit-logo", label: "Reddit", category: "social" },
  { value: "ph:reddit-logo-fill", label: "Reddit (relleno)", category: "social" },
  { value: "ph:mastodon-logo", label: "Mastodon", category: "social" },
  { value: "ph:mastodon-logo-fill", label: "Mastodon (relleno)", category: "social" },
  { value: "ph:threads-logo", label: "Threads", category: "social" },
  { value: "ph:threads-logo-fill", label: "Threads (relleno)", category: "social" },
  // E-commerce / Negocios
  { value: "ph:amazon-logo", label: "Amazon", category: "ecommerce" },
  { value: "ph:amazon-logo-fill", label: "Amazon (relleno)", category: "ecommerce" },
  { value: "ph:paypal-logo", label: "PayPal", category: "ecommerce" },
  { value: "ph:paypal-logo-fill", label: "PayPal (relleno)", category: "ecommerce" },
  { value: "ph:stripe-logo", label: "Stripe", category: "ecommerce" },
  { value: "ph:stripe-logo-fill", label: "Stripe (relleno)", category: "ecommerce" },
  // Otros / Utilidades
  { value: "ph:google-logo", label: "Google", category: "otros" },
  { value: "ph:google-logo-fill", label: "Google (relleno)", category: "otros" },
  { value: "ph:google-play-logo", label: "Google Play", category: "otros" },
  { value: "ph:google-play-logo-fill", label: "Google Play (relleno)", category: "otros" },
  { value: "ph:app-store-logo", label: "App Store", category: "otros" },
  { value: "ph:app-store-logo-fill", label: "App Store (relleno)", category: "otros" },
  { value: "ph:apple-logo", label: "Apple", category: "otros" },
  { value: "ph:apple-logo-fill", label: "Apple (relleno)", category: "otros" },
  { value: "ph:android-logo", label: "Android", category: "otros" },
  { value: "ph:android-logo-fill", label: "Android (relleno)", category: "otros" },
  { value: "ph:globe", label: "Sitio Web", category: "otros" },
  { value: "ph:globe-fill", label: "Sitio Web (relleno)", category: "otros" },
  { value: "ph:envelope", label: "Email", category: "otros" },
  { value: "ph:envelope-fill", label: "Email (relleno)", category: "otros" },
  { value: "ph:phone", label: "Tel\xE9fono", category: "otros" },
  { value: "ph:phone-fill", label: "Tel\xE9fono (relleno)", category: "otros" },
  { value: "ph:map-pin", label: "Ubicaci\xF3n", category: "otros" },
  { value: "ph:map-pin-fill", label: "Ubicaci\xF3n (relleno)", category: "otros" },
  { value: "ph:link", label: "Enlace", category: "otros" },
  { value: "ph:link-fill", label: "Enlace (relleno)", category: "otros" },
  { value: "ph:share-network", label: "Compartir", category: "otros" },
  { value: "ph:share-network-fill", label: "Compartir (relleno)", category: "otros" }
];
var CATEGORIES = [
  { value: "all", label: "\u{1F4CB} Todos" },
  { value: "popular", label: "\u2B50 Populares" },
  { value: "mensajeria", label: "\u{1F4AC} Mensajer\xEDa" },
  { value: "profesional", label: "\u{1F4BC} Profesional" },
  { value: "video", label: "\u{1F3AC} Video" },
  { value: "fotos", label: "\u{1F4F7} Fotos" },
  { value: "musica", label: "\u{1F3B5} M\xFAsica" },
  { value: "social", label: "\u{1F465} Social" },
  { value: "ecommerce", label: "\u{1F6D2} E-commerce" },
  { value: "otros", label: "\u{1F4CC} Otros" }
];
var SocialIconSelector = wrapFieldsWithMeta4(({ input }) => {
  const [searchTerm, setSearchTerm] = React4.useState("");
  const [selectedCategory, setSelectedCategory] = React4.useState("all");
  const [isOpen, setIsOpen] = React4.useState(false);
  const dropdownRef = React4.useRef(null);
  React4.useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);
  const filteredIcons = SOCIAL_ICONS.filter((icon) => {
    const matchesSearch = icon.label.toLowerCase().includes(searchTerm.toLowerCase()) || icon.value.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "all" || icon.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });
  const selectedIcon = SOCIAL_ICONS.find((icon) => icon.value === input.value);
  const handleSelect = (value) => {
    input.onChange(value);
    setIsOpen(false);
    setSearchTerm("");
  };
  const inputStyle = {
    width: "100%",
    padding: "10px 12px",
    border: "1px solid #e2e8f0",
    borderRadius: "6px",
    fontSize: "14px",
    outline: "none"
  };
  const dropdownStyle = {
    position: "absolute",
    top: "100%",
    left: 0,
    right: 0,
    backgroundColor: "white",
    border: "1px solid #e2e8f0",
    borderRadius: "6px",
    boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
    zIndex: 1e3,
    maxHeight: "350px",
    overflow: "hidden",
    display: "flex",
    flexDirection: "column"
  };
  const optionStyle = {
    padding: "10px 12px",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    gap: "10px",
    borderBottom: "1px solid #f0f0f0"
  };
  return React4.createElement("div", { ref: dropdownRef, style: { position: "relative" } }, React4.createElement(
    "div",
    {
      onClick: () => setIsOpen(!isOpen),
      style: {
        ...inputStyle,
        cursor: "pointer",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        backgroundColor: "#f7fafc"
      }
    },
    React4.createElement("div", { style: { display: "flex", alignItems: "center", gap: "10px" } }, selectedIcon ? React4.createElement(React4.Fragment, null, React4.createElement(PhosphorIconPreview, { iconName: selectedIcon.value, size: 20 }), React4.createElement("span", null, selectedIcon.label), React4.createElement("span", { style: { fontSize: "11px", color: "#718096", fontFamily: "monospace" } }, selectedIcon.value)) : React4.createElement("span", { style: { color: "#a0aec0" } }, "Selecciona un icono...")),
    React4.createElement("span", { style: { color: "#718096" } }, isOpen ? "\u25B2" : "\u25BC")
  ), isOpen && React4.createElement("div", { style: dropdownStyle }, React4.createElement("div", { style: { padding: "10px", borderBottom: "1px solid #e2e8f0" } }, React4.createElement(
    "input",
    {
      type: "text",
      value: searchTerm,
      onChange: (e) => setSearchTerm(e.target.value),
      placeholder: "\u{1F50D} Buscar red social...",
      style: {
        ...inputStyle,
        marginBottom: "8px"
      },
      autoFocus: true
    }
  ), React4.createElement("div", { style: { display: "flex", flexWrap: "wrap", gap: "4px" } }, CATEGORIES.map((cat) => React4.createElement(
    "button",
    {
      key: cat.value,
      onClick: () => setSelectedCategory(cat.value),
      style: {
        padding: "4px 8px",
        fontSize: "12px",
        border: "none",
        borderRadius: "4px",
        cursor: "pointer",
        backgroundColor: selectedCategory === cat.value ? "#3182ce" : "#edf2f7",
        color: selectedCategory === cat.value ? "white" : "#4a5568"
      }
    },
    cat.label
  )))), React4.createElement("div", { style: { overflowY: "auto", maxHeight: "250px" } }, filteredIcons.length > 0 ? filteredIcons.map((icon) => React4.createElement(
    "div",
    {
      key: icon.value,
      onClick: () => handleSelect(icon.value),
      style: {
        ...optionStyle,
        backgroundColor: input.value === icon.value ? "#ebf8ff" : "transparent"
      },
      onMouseEnter: (e) => {
        if (input.value !== icon.value) {
          e.currentTarget.style.backgroundColor = "#f7fafc";
        }
      },
      onMouseLeave: (e) => {
        if (input.value !== icon.value) {
          e.currentTarget.style.backgroundColor = "transparent";
        }
      }
    },
    React4.createElement("div", { style: { width: "28px", display: "flex", justifyContent: "center", alignItems: "center" } }, React4.createElement(PhosphorIconPreview, { iconName: icon.value, size: 22 })),
    React4.createElement("div", { style: { flex: 1 } }, React4.createElement("div", { style: { fontWeight: "500" } }, icon.label), React4.createElement("div", { style: { fontSize: "11px", color: "#718096", fontFamily: "monospace" } }, icon.value)),
    input.value === icon.value && React4.createElement("span", { style: { color: "#38a169" } }, "\u2713")
  )) : React4.createElement("div", { style: { padding: "20px", textAlign: "center", color: "#718096" } }, "No se encontraron resultados"))));
});

// tina/fields/map-embed-field.tsx
import React5 from "react";
import { wrapFieldsWithMeta as wrapFieldsWithMeta5 } from "tinacms";
function extractCoordinates(embedCode) {
  if (!embedCode) return { lat: null, lng: null };
  const pbMatch = embedCode.match(/!2d(-?[\d.]+)!3d(-?[\d.]+)/);
  if (pbMatch) {
    return {
      lng: parseFloat(pbMatch[1]),
      lat: parseFloat(pbMatch[2])
    };
  }
  const qMatch = embedCode.match(/[?&](?:q|center)=(-?[\d.]+),(-?[\d.]+)/);
  if (qMatch) {
    return {
      lat: parseFloat(qMatch[1]),
      lng: parseFloat(qMatch[2])
    };
  }
  const atMatch = embedCode.match(/@(-?[\d.]+),(-?[\d.]+)/);
  if (atMatch) {
    return {
      lat: parseFloat(atMatch[1]),
      lng: parseFloat(atMatch[2])
    };
  }
  const llMatch = embedCode.match(/[?&]ll=(-?[\d.]+),(-?[\d.]+)/);
  if (llMatch) {
    return {
      lat: parseFloat(llMatch[1]),
      lng: parseFloat(llMatch[2])
    };
  }
  return { lat: null, lng: null };
}
var MapEmbedField = wrapFieldsWithMeta5(({ input, form }) => {
  const [embedCode, setEmbedCode] = React5.useState(input.value || "");
  const [error, setError] = React5.useState(null);
  const [coordinates, setCoordinates] = React5.useState({ lat: null, lng: null });
  const extractIframeSrc = (code) => {
    if (!code) return null;
    if (code.startsWith("https://www.google.com/maps/embed") || code.startsWith("https://maps.google.com")) {
      return code;
    }
    const srcMatch = code.match(/src=["']([^"']+)["']/);
    if (srcMatch && srcMatch[1]) {
      return srcMatch[1];
    }
    return null;
  };
  const iframeSrc = extractIframeSrc(embedCode);
  React5.useEffect(() => {
    const coords = extractCoordinates(embedCode);
    setCoordinates(coords);
    if (form && form.change) {
      const fieldPath = input.name.replace(".mapEmbed", "");
      if (coords.lat !== null) {
        form.change(`${fieldPath}.lat`, coords.lat);
      }
      if (coords.lng !== null) {
        form.change(`${fieldPath}.lng`, coords.lng);
      }
    }
  }, [embedCode, form, input.name]);
  const handleChange = (e) => {
    const value = e.target.value;
    setEmbedCode(value);
    input.onChange(value);
    if (value && !extractIframeSrc(value)) {
      setError("El c\xF3digo no parece ser un embed v\xE1lido de Google Maps");
    } else {
      setError(null);
    }
  };
  const textareaStyle = {
    width: "100%",
    minHeight: "100px",
    padding: "12px",
    border: error ? "1px solid #e53e3e" : "1px solid #e2e8f0",
    borderRadius: "6px",
    fontSize: "13px",
    fontFamily: "monospace",
    resize: "vertical",
    outline: "none",
    backgroundColor: "#f7fafc"
  };
  const previewContainerStyle = {
    marginTop: "12px",
    borderRadius: "8px",
    overflow: "hidden",
    border: "1px solid #e2e8f0",
    backgroundColor: "#f0f0f0"
  };
  const previewHeaderStyle = {
    padding: "8px 12px",
    backgroundColor: "#4a5568",
    color: "white",
    fontSize: "12px",
    fontWeight: "500",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between"
  };
  const iframeContainerStyle = {
    position: "relative",
    width: "100%",
    height: "250px",
    backgroundColor: "#e2e8f0"
  };
  const placeholderStyle = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    height: "200px",
    backgroundColor: "#f7fafc",
    border: "2px dashed #cbd5e0",
    borderRadius: "8px",
    marginTop: "12px",
    color: "#718096",
    textAlign: "center",
    padding: "20px"
  };
  const helpTextStyle = {
    marginTop: "8px",
    fontSize: "12px",
    color: "#718096",
    lineHeight: "1.5"
  };
  const coordsBoxStyle = {
    display: "flex",
    gap: "16px",
    padding: "10px 12px",
    backgroundColor: "#f7fafc",
    borderTop: "1px solid #e2e8f0",
    fontSize: "12px"
  };
  const coordItemStyle = {
    display: "flex",
    alignItems: "center",
    gap: "6px"
  };
  const coordLabelStyle = {
    color: "#718096",
    fontWeight: "500"
  };
  const coordValueStyle = {
    fontFamily: "monospace",
    backgroundColor: "#edf2f7",
    padding: "2px 6px",
    borderRadius: "4px",
    color: "#2d3748"
  };
  return React5.createElement("div", null, React5.createElement(
    "textarea",
    {
      value: embedCode,
      onChange: handleChange,
      placeholder: 'Pega aqu\xED el c\xF3digo embed de Google Maps (ej: <iframe src="https://www.google.com/maps/embed?..." ...></iframe>)',
      style: textareaStyle
    }
  ), error && React5.createElement("div", { style: { color: "#e53e3e", fontSize: "12px", marginTop: "4px" } }, "\u26A0\uFE0F ", error), React5.createElement("div", { style: helpTextStyle }, "\u{1F4A1} ", React5.createElement("strong", null, "C\xF3mo obtener el c\xF3digo:"), ' En Google Maps, busca la ubicaci\xF3n \u2192 clic en "Compartir" \u2192 "Incorporar un mapa" \u2192 copia el c\xF3digo HTML.'), iframeSrc ? React5.createElement("div", { style: previewContainerStyle }, React5.createElement("div", { style: previewHeaderStyle }, React5.createElement("div", { style: { display: "flex", alignItems: "center", gap: "6px" } }, React5.createElement("span", null, "\u{1F4CD}"), React5.createElement("span", null, "Vista previa del mapa")), (coordinates.lat !== null || coordinates.lng !== null) && React5.createElement("div", { style: { fontSize: "11px", opacity: 0.9 } }, "Coordenadas detectadas \u2713")), React5.createElement("div", { style: iframeContainerStyle }, React5.createElement(
    "iframe",
    {
      src: iframeSrc,
      width: "100%",
      height: "250",
      style: { border: 0 },
      allowFullScreen: true,
      loading: "lazy",
      referrerPolicy: "no-referrer-when-downgrade",
      title: "Vista previa de Google Maps"
    }
  )), React5.createElement("div", { style: coordsBoxStyle }, React5.createElement("div", { style: coordItemStyle }, React5.createElement("span", { style: coordLabelStyle }, "\u{1F4CD} Latitud:"), React5.createElement("span", { style: coordValueStyle }, coordinates.lat !== null ? coordinates.lat.toFixed(6) : "No detectada")), React5.createElement("div", { style: coordItemStyle }, React5.createElement("span", { style: coordLabelStyle }, "\u{1F4CD} Longitud:"), React5.createElement("span", { style: coordValueStyle }, coordinates.lng !== null ? coordinates.lng.toFixed(6) : "No detectada")))) : embedCode ? React5.createElement("div", { style: placeholderStyle }, React5.createElement("span", { style: { fontSize: "32px", marginBottom: "8px" } }, "\u{1F5FA}\uFE0F"), React5.createElement("span", null, "No se pudo cargar el mapa"), React5.createElement("span", { style: { fontSize: "12px", marginTop: "4px" } }, "Verifica que el c\xF3digo embed sea v\xE1lido")) : React5.createElement("div", { style: placeholderStyle }, React5.createElement("span", { style: { fontSize: "32px", marginBottom: "8px" } }, "\u{1F4CD}"), React5.createElement("span", null, "Pega el c\xF3digo embed para ver el mapa"), React5.createElement("span", { style: { fontSize: "12px", marginTop: "4px" } }, "Las coordenadas se extraer\xE1n autom\xE1ticamente")));
});

// tina/config.ts
var projectTagOptions = [
  "residencial",
  "comercial",
  "industrial",
  "departamentos",
  "casas",
  "oficinas",
  "locales",
  "bodegas",
  "en-construccion",
  "completado",
  "preventa",
  "entrega-inmediata"
];
var projectCategories = [
  { value: "conjunto-habitacional", label: "Conjunto Habitacional" },
  { value: "diseno-residencial", label: "Dise\xF1o Residencial" },
  { value: "diseno-retail", label: "Dise\xF1o Retail" },
  { value: "edificio-comercial", label: "Edificio Comercial" },
  { value: "proyecto-mixto", label: "Proyecto Mixto" }
];
var serviceCategories = [
  { value: "construccion", label: "Construcci\xF3n" },
  { value: "diseno-arquitectonico", label: "Dise\xF1o Arquitect\xF3nico" },
  { value: "remodelacion", label: "Remodelaci\xF3n" },
  { value: "consultoria", label: "Consultor\xEDa" },
  { value: "gestion-proyectos", label: "Gesti\xF3n de Proyectos" }
];
var cloudinaryBaseUrl = "https://res.cloudinary.com/dt5y4fsst";
var cloudinaryUploadPath = `${cloudinaryBaseUrl}/image/upload`;
var cloudinaryVideoPath = `${cloudinaryBaseUrl}/video/upload`;
var config_default = defineConfig2({
  branch: process.env.TINA_BRANCH || "main",
  clientId: process.env.TINA_PUBLIC_CLIENT_ID,
  token: process.env.TINA_TOKEN,
  build: {
    outputFolder: "admin",
    publicFolder: "public"
  },
  // Configuración de Media con Cloudinary
  // Las imágenes se suben directamente a Cloudinary desde TinaCMS
  media: {
    loadCustomStore: async () => {
      const pack = await import("next-tinacms-cloudinary");
      return pack.TinaCloudCloudinaryMediaStore;
    }
  },
  schema: {
    collections: [
      // ==========================================
      // COLECCIÓN: PROYECTOS
      // ==========================================
      {
        name: "proyectos",
        label: "Proyectos",
        path: "src/content/proyectos",
        format: "md",
        ui: {
          filename: {
            readonly: false,
            slugify: (values) => {
              return values?.slug || values?.title?.toLowerCase().replace(/\s+/g, "-") || "";
            }
          }
        },
        fields: [
          // --- Información Básica ---
          {
            type: "string",
            name: "title",
            label: "T\xEDtulo del Proyecto",
            required: true
          },
          {
            type: "string",
            name: "slug",
            label: "Slug (URL)",
            description: "Se genera autom\xE1ticamente del t\xEDtulo si se deja vac\xEDo"
          },
          {
            type: "string",
            name: "description",
            label: "Descripci\xF3n Corta",
            description: "Resumen breve para tarjetas y SEO (m\xE1x. 160 caracteres)",
            ui: {
              component: "textarea"
            }
          },
          {
            type: "string",
            name: "tags",
            label: "Etiquetas",
            list: true,
            options: projectTagOptions
          },
          {
            type: "string",
            name: "status",
            label: "Estado del Proyecto",
            options: [
              { value: "en-construccion", label: "En Construcci\xF3n" },
              { value: "completado", label: "Completado" },
              { value: "preventa", label: "Preventa" },
              { value: "planificacion", label: "En Planificaci\xF3n" }
            ]
          },
          {
            type: "string",
            name: "category",
            label: "Categor\xEDa del Proyecto",
            description: "Selecciona la categor\xEDa principal del proyecto",
            options: projectCategories,
            required: true
          },
          // --- Imágenes (compatibles con Cloudinary y locales) ---
          {
            type: "string",
            name: "backgroundImage",
            label: "Imagen Principal (Hero)",
            description: `Sube la imagen a Cloudinary y pega la URL aqu\xED`,
            ui: {
              // @ts-ignore - Custom component
              component: ImagePreviewField
            }
          },
          {
            type: "string",
            name: "images",
            label: "Galer\xEDa de Im\xE1genes",
            description: "URLs de im\xE1genes de Cloudinary",
            list: true,
            ui: {
              // @ts-ignore - Custom component
              component: ImageGalleryField
            }
          },
          {
            type: "string",
            name: "virtualTourVideo",
            label: "Video Tour Virtual",
            description: `URL de video de Cloudinary`
          },
          // --- Ubicación ---
          {
            type: "object",
            name: "location",
            label: "Ubicaci\xF3n",
            fields: [
              {
                type: "string",
                name: "address",
                label: "Direcci\xF3n"
              },
              {
                type: "string",
                name: "city",
                label: "Ciudad"
              },
              {
                type: "string",
                name: "sector",
                label: "Sector/Barrio"
              },
              {
                type: "string",
                name: "mapUrl",
                label: "URL de Google Maps"
              },
              {
                type: "number",
                name: "lat",
                label: "Latitud"
              },
              {
                type: "number",
                name: "lng",
                label: "Longitud"
              }
            ]
          },
          // --- Especificaciones del Proyecto ---
          {
            type: "object",
            name: "specifications",
            label: "Especificaciones",
            fields: [
              // Estructura para specs con enabled/value/label
              {
                type: "object",
                name: "bedrooms",
                label: "Dormitorios",
                fields: [
                  { type: "boolean", name: "enabled", label: "Habilitado" },
                  { type: "number", name: "value", label: "Cantidad" },
                  { type: "string", name: "label", label: "Etiqueta" },
                  { type: "string", name: "sublabel", label: "Subetiqueta" }
                ]
              },
              {
                type: "object",
                name: "bathrooms",
                label: "Ba\xF1os",
                fields: [
                  { type: "boolean", name: "enabled", label: "Habilitado" },
                  { type: "number", name: "value", label: "Cantidad" },
                  { type: "string", name: "label", label: "Etiqueta" },
                  { type: "string", name: "sublabel", label: "Subetiqueta" }
                ]
              },
              {
                type: "object",
                name: "area",
                label: "\xC1rea",
                fields: [
                  { type: "boolean", name: "enabled", label: "Habilitado" },
                  { type: "number", name: "value", label: "Valor (m\xB2)" },
                  { type: "string", name: "label", label: "Etiqueta" },
                  { type: "string", name: "sublabel", label: "Subetiqueta" }
                ]
              },
              {
                type: "object",
                name: "garden",
                label: "Jard\xEDn",
                fields: [
                  { type: "boolean", name: "enabled", label: "Habilitado" },
                  { type: "boolean", name: "value", label: "Tiene Jard\xEDn" },
                  { type: "string", name: "label", label: "Etiqueta" },
                  { type: "string", name: "sublabel", label: "Subetiqueta" }
                ]
              },
              {
                type: "object",
                name: "petFriendly",
                label: "Pet Friendly",
                fields: [
                  { type: "boolean", name: "enabled", label: "Habilitado" },
                  { type: "boolean", name: "value", label: "Permite Mascotas" },
                  { type: "string", name: "label", label: "Etiqueta" },
                  { type: "string", name: "sublabel", label: "Subetiqueta" }
                ]
              },
              {
                type: "object",
                name: "deliveryDate",
                label: "Fecha de Entrega",
                fields: [
                  { type: "boolean", name: "enabled", label: "Habilitado" },
                  { type: "string", name: "value", label: "Fecha/Estado" },
                  { type: "string", name: "label", label: "Etiqueta" }
                ]
              },
              {
                type: "object",
                name: "customSpecs",
                label: "Especificaciones Personalizadas",
                list: true,
                fields: [
                  { type: "boolean", name: "enabled", label: "Habilitado" },
                  { type: "string", name: "icon", label: "Icono (ej: ph:car)" },
                  { type: "string", name: "label", label: "Etiqueta" },
                  { type: "string", name: "value", label: "Valor" },
                  { type: "string", name: "sublabel", label: "Subetiqueta" },
                  {
                    type: "string",
                    name: "colorScheme",
                    label: "Color",
                    options: ["primary", "secondary", "accent"]
                  }
                ]
              }
            ]
          },
          // --- Amenidades ---
          {
            type: "string",
            name: "amenities",
            label: "Amenidades",
            list: true,
            description: "Lista de amenidades del proyecto"
          },
          // --- Características Destacadas ---
          {
            type: "object",
            name: "features",
            label: "Caracter\xEDsticas Destacadas",
            list: true,
            fields: [
              {
                type: "string",
                name: "icon",
                label: "Icono",
                description: "Nombre del icono (ej: home, building, tree)"
              },
              {
                type: "string",
                name: "title",
                label: "T\xEDtulo"
              },
              {
                type: "string",
                name: "description",
                label: "Descripci\xF3n"
              }
            ]
          },
          // --- Testimonios del Proyecto ---
          {
            type: "object",
            name: "testimonials",
            label: "Testimonios",
            list: true,
            fields: [
              {
                type: "string",
                name: "name",
                label: "Nombre del Cliente"
              },
              {
                type: "string",
                name: "quote",
                label: "Testimonio",
                ui: {
                  component: "textarea"
                }
              },
              {
                type: "string",
                name: "image",
                label: "Foto del Cliente",
                description: "URL de Cloudinary o ruta local"
              },
              {
                type: "string",
                name: "unitType",
                label: "Tipo de Unidad Adquirida"
              }
            ]
          },
          // --- SEO ---
          {
            type: "object",
            name: "seo",
            label: "SEO",
            fields: [
              {
                type: "string",
                name: "metaTitle",
                label: "Meta T\xEDtulo"
              },
              {
                type: "string",
                name: "metaDescription",
                label: "Meta Descripci\xF3n",
                ui: {
                  component: "textarea"
                }
              },
              {
                type: "string",
                name: "ogImage",
                label: "Imagen para Redes Sociales"
              }
            ]
          },
          // --- Contenido Principal ---
          {
            type: "rich-text",
            name: "body",
            label: "Contenido Detallado",
            isBody: true
          }
        ]
      },
      // ==========================================
      // COLECCIÓN: SERVICIOS
      // ==========================================
      {
        name: "servicios",
        label: "Servicios",
        path: "src/content/services",
        format: "md",
        ui: {
          filename: {
            readonly: false,
            slugify: (values) => {
              return values?.slug || values?.title?.toLowerCase().replace(/\s+/g, "-") || "";
            }
          }
        },
        fields: [
          // --- Información Básica ---
          {
            type: "string",
            name: "title",
            label: "T\xEDtulo del Servicio",
            required: true
          },
          {
            type: "string",
            name: "slug",
            label: "Slug (URL)"
          },
          {
            type: "string",
            name: "shortDescription",
            label: "Descripci\xF3n Corta",
            description: "Para tarjetas y listados",
            ui: {
              component: "textarea"
            }
          },
          {
            type: "string",
            name: "icon",
            label: "Icono del Servicio",
            description: "Nombre del icono (ej: building, hammer, blueprint)"
          },
          {
            type: "string",
            name: "category",
            label: "Categor\xEDa del Servicio",
            description: "Selecciona la categor\xEDa principal",
            options: serviceCategories
          },
          // --- Configuración del Hero ---
          {
            type: "object",
            name: "heroConfig",
            label: "Configuraci\xF3n del Hero",
            fields: [
              {
                type: "string",
                name: "backgroundImage",
                label: "Imagen de Fondo",
                description: `Sube a Cloudinary y pega la URL`,
                ui: {
                  // @ts-ignore - Custom component
                  component: ImagePreviewField
                }
              },
              {
                type: "string",
                name: "subtitle",
                label: "Subt\xEDtulo"
              },
              {
                type: "string",
                name: "ctaText",
                label: "Texto del Bot\xF3n CTA"
              },
              {
                type: "string",
                name: "ctaLink",
                label: "Enlace del Bot\xF3n CTA"
              }
            ]
          },
          // --- Galería ---
          {
            type: "string",
            name: "gallery",
            label: "Galer\xEDa de Im\xE1genes",
            list: true,
            description: `URLs de Cloudinary`,
            ui: {
              // @ts-ignore - Custom component
              component: ImageGalleryField
            }
          },
          // --- Beneficios ---
          {
            type: "object",
            name: "benefits",
            label: "Beneficios del Servicio",
            list: true,
            fields: [
              {
                type: "string",
                name: "icon",
                label: "Icono"
              },
              {
                type: "string",
                name: "title",
                label: "T\xEDtulo"
              },
              {
                type: "string",
                name: "description",
                label: "Descripci\xF3n"
              }
            ]
          },
          // --- Proceso/Pasos ---
          {
            type: "object",
            name: "process",
            label: "Proceso del Servicio",
            list: true,
            fields: [
              {
                type: "number",
                name: "step",
                label: "N\xFAmero de Paso"
              },
              {
                type: "string",
                name: "title",
                label: "T\xEDtulo del Paso"
              },
              {
                type: "string",
                name: "description",
                label: "Descripci\xF3n"
              }
            ]
          },
          // --- Testimonios del Servicio ---
          {
            type: "object",
            name: "testimonialsSection",
            label: "Secci\xF3n de Testimonios",
            fields: [
              {
                type: "boolean",
                name: "enabled",
                label: "Mostrar Testimonios"
              },
              {
                type: "string",
                name: "title",
                label: "T\xEDtulo de la Secci\xF3n"
              },
              {
                type: "object",
                name: "items",
                label: "Testimonios",
                list: true,
                fields: [
                  {
                    type: "string",
                    name: "name",
                    label: "Nombre"
                  },
                  {
                    type: "string",
                    name: "role",
                    label: "Cargo/Rol"
                  },
                  {
                    type: "string",
                    name: "quote",
                    label: "Testimonio",
                    ui: {
                      component: "textarea"
                    }
                  },
                  {
                    type: "string",
                    name: "image",
                    label: "Foto"
                  }
                ]
              }
            ]
          },
          // --- FAQs ---
          {
            type: "object",
            name: "faqsSection",
            label: "Preguntas Frecuentes",
            fields: [
              {
                type: "boolean",
                name: "enabled",
                label: "Mostrar FAQs"
              },
              {
                type: "string",
                name: "title",
                label: "T\xEDtulo de la Secci\xF3n"
              },
              {
                type: "object",
                name: "items",
                label: "Preguntas",
                list: true,
                fields: [
                  {
                    type: "string",
                    name: "question",
                    label: "Pregunta"
                  },
                  {
                    type: "string",
                    name: "answer",
                    label: "Respuesta",
                    ui: {
                      component: "textarea"
                    }
                  }
                ]
              }
            ]
          },
          // --- CTA Final ---
          {
            type: "object",
            name: "ctaSection",
            label: "Secci\xF3n CTA Final",
            fields: [
              {
                type: "string",
                name: "title",
                label: "T\xEDtulo"
              },
              {
                type: "string",
                name: "description",
                label: "Descripci\xF3n"
              },
              {
                type: "string",
                name: "buttonText",
                label: "Texto del Bot\xF3n"
              },
              {
                type: "string",
                name: "buttonLink",
                label: "Enlace del Bot\xF3n"
              },
              {
                type: "string",
                name: "backgroundImage",
                label: "Imagen de Fondo"
              }
            ]
          },
          // --- Contenido Principal ---
          {
            type: "rich-text",
            name: "body",
            label: "Contenido Detallado",
            isBody: true
          }
        ]
      },
      // ==========================================
      // COLECCIÓN: CATEGORÍAS DE PROYECTOS
      // ==========================================
      {
        name: "categoriasProyectos",
        label: "Categor\xEDas de Proyectos",
        path: "src/content/categorias-proyectos",
        format: "json",
        ui: {
          allowedActions: {
            create: true,
            delete: true
          }
        },
        fields: [
          {
            type: "string",
            name: "name",
            label: "Nombre de la Categor\xEDa",
            required: true
          },
          {
            type: "string",
            name: "slug",
            label: "Slug (identificador)",
            description: "Ej: conjunto-habitacional, diseno-retail",
            required: true
          },
          {
            type: "string",
            name: "description",
            label: "Descripci\xF3n",
            ui: {
              component: "textarea"
            }
          },
          {
            type: "string",
            name: "icon",
            label: "Icono",
            description: "Nombre del icono para esta categor\xEDa"
          },
          {
            type: "string",
            name: "image",
            label: "Imagen de la Categor\xEDa",
            description: "URL de Cloudinary para imagen representativa"
          },
          {
            type: "number",
            name: "order",
            label: "Orden de Visualizaci\xF3n",
            description: "N\xFAmero para ordenar las categor\xEDas (menor = primero)"
          },
          {
            type: "string",
            name: "cloudinaryFolder",
            label: "Carpeta en Cloudinary",
            description: "Ruta de la carpeta para nuevos proyectos de esta categor\xEDa. Ej: constructora-carpio/proyectos/conjunto-habitacional"
          }
        ]
      },
      // ==========================================
      // COLECCIÓN: CATEGORÍAS DE SERVICIOS
      // ==========================================
      {
        name: "categoriasServicios",
        label: "Categor\xEDas de Servicios",
        path: "src/content/categorias-servicios",
        format: "json",
        fields: [
          {
            type: "string",
            name: "name",
            label: "Nombre de la Categor\xEDa",
            required: true
          },
          {
            type: "string",
            name: "slug",
            label: "Slug (identificador)",
            required: true
          },
          {
            type: "string",
            name: "description",
            label: "Descripci\xF3n",
            ui: {
              component: "textarea"
            }
          },
          {
            type: "string",
            name: "icon",
            label: "Icono"
          },
          {
            type: "string",
            name: "image",
            label: "Imagen de la Categor\xEDa"
          },
          {
            type: "number",
            name: "order",
            label: "Orden de Visualizaci\xF3n"
          },
          {
            type: "string",
            name: "cloudinaryFolder",
            label: "Carpeta en Cloudinary",
            description: "Ej: constructora-carpio/servicios/construccion"
          }
        ]
      },
      // ==========================================
      // COLECCIÓN: CONFIGURACIÓN DE CLOUDINARY
      // ==========================================
      {
        name: "cloudinaryConfig",
        label: "Configuraci\xF3n Cloudinary",
        path: "src/content/config",
        format: "json",
        match: {
          include: "cloudinary"
        },
        ui: {
          allowedActions: {
            create: false,
            delete: false
          },
          global: true
        },
        fields: [
          {
            type: "string",
            name: "cloudName",
            label: "Cloud Name",
            description: "Tu cloud name de Cloudinary (ej: dt5y4fsst)"
          },
          {
            type: "string",
            name: "baseFolder",
            label: "Carpeta Base",
            description: "Carpeta ra\xEDz para todos los assets (ej: constructora-carpio)"
          },
          {
            type: "object",
            name: "defaultTransformations",
            label: "Transformaciones por Defecto",
            fields: [
              {
                type: "number",
                name: "imageWidth",
                label: "Ancho de Im\xE1genes",
                description: "Ancho m\xE1ximo para im\xE1genes (ej: 1200)"
              },
              {
                type: "string",
                name: "imageQuality",
                label: "Calidad de Imagen",
                options: ["auto", "auto:low", "auto:eco", "auto:good", "auto:best"]
              },
              {
                type: "string",
                name: "imageFormat",
                label: "Formato de Imagen",
                options: ["auto", "webp", "avif", "jpg", "png"]
              }
            ]
          },
          {
            type: "object",
            name: "folders",
            label: "Estructura de Carpetas",
            fields: [
              {
                type: "string",
                name: "proyectos",
                label: "Carpeta de Proyectos",
                description: "Ej: constructora-carpio/proyectos"
              },
              {
                type: "string",
                name: "servicios",
                label: "Carpeta de Servicios",
                description: "Ej: constructora-carpio/servicios"
              },
              {
                type: "string",
                name: "general",
                label: "Carpeta General",
                description: "Ej: constructora-carpio/general"
              }
            ]
          }
        ]
      },
      // ==========================================
      // COLECCIÓN DE PRUEBA (TEMPORAL)
      // ==========================================
      {
        name: "paginasPrueba",
        label: "P\xE1ginas Prueba",
        path: "src/content/paginas-test",
        format: "json",
        fields: [
          {
            type: "string",
            name: "title",
            label: "T\xEDtulo"
          },
          {
            type: "string",
            name: "content",
            label: "Contenido"
          }
        ]
      },
      // ==========================================
      // COLECCIÓN: PÁGINAS DEL SITIO
      // ==========================================
      {
        name: "paginas",
        label: "P\xE1ginas del Sitio",
        path: "src/content/paginas",
        format: "json",
        ui: {
          allowedActions: {
            create: true,
            delete: false
          },
          filename: {
            readonly: true,
            slugify: (values) => values?.slug || values?.title?.toLowerCase().replace(/\s+/g, "-") || ""
          }
          // NOTA: Visual Editing con router requiere React + useTina hook
          // Astro usa SSG/SSR sin React por defecto, por lo que usamos el 
          // editor de página completa (full-page editor) en lugar de visual editing
          // Más info: https://tina.io/docs/frameworks/astro/#enabling-visual-editing-optional
        },
        fields: [
          {
            type: "string",
            name: "title",
            label: "T\xEDtulo de la P\xE1gina"
          },
          {
            type: "string",
            name: "slug",
            label: "Slug (URL)"
          },
          {
            type: "boolean",
            name: "published",
            label: "Publicada"
          },
          {
            type: "object",
            name: "seo",
            label: "SEO",
            fields: [
              {
                type: "string",
                name: "metaTitle",
                label: "Meta T\xEDtulo"
              },
              {
                type: "string",
                name: "metaDescription",
                label: "Meta Descripci\xF3n",
                ui: { component: "textarea" }
              },
              {
                type: "string",
                name: "ogImage",
                label: "Imagen OG"
              }
            ]
          },
          {
            type: "object",
            name: "sections",
            label: "Secciones",
            list: true,
            templates: pageBlockTemplates,
            ui: {
              visualSelector: true
            }
          }
        ]
      },
      // ==========================================
      // COLECCIÓN: CONFIGURACIÓN GLOBAL
      // ==========================================
      {
        name: "configuracionGlobal",
        label: "Configuraci\xF3n Global",
        path: "src/content/config",
        format: "json",
        ui: {
          allowedActions: {
            create: false,
            delete: false
          },
          global: true
        },
        match: {
          include: "global"
        },
        fields: [
          // --- Información de la Empresa ---
          {
            type: "object",
            name: "company",
            label: "Informaci\xF3n de la Empresa",
            fields: [
              {
                type: "string",
                name: "name",
                label: "Nombre de la Empresa"
              },
              {
                type: "string",
                name: "slogan",
                label: "Eslogan"
              },
              {
                type: "image",
                name: "logo",
                label: "Logo Principal",
                description: "Logo para fondos claros - Se sube a Cloudinary"
              },
              {
                type: "image",
                name: "logoWhite",
                label: "Logo Blanco",
                description: "Logo para fondos oscuros - Se sube a Cloudinary"
              },
              {
                type: "image",
                name: "logoIcon",
                label: "Logo Icono/S\xEDmbolo",
                description: "Versi\xF3n peque\xF1a del logo - Se sube a Cloudinary"
              },
              {
                type: "image",
                name: "favicon",
                label: "Favicon",
                description: "Icono del sitio - Se sube a Cloudinary"
              }
            ]
          },
          // --- Colores Institucionales ---
          {
            type: "object",
            name: "colors",
            label: "Colores Institucionales",
            description: "Colores principales de la marca",
            fields: [
              {
                type: "string",
                name: "primary",
                label: "Color Primario",
                description: "Color principal de la marca",
                ui: {
                  component: ColorPickerField
                }
              },
              {
                type: "string",
                name: "secondary",
                label: "Color Secundario",
                description: "Color secundario de la marca",
                ui: {
                  component: ColorPickerField
                }
              },
              {
                type: "string",
                name: "accent",
                label: "Color de Acento",
                description: "Color para destacar elementos",
                ui: {
                  component: ColorPickerField
                }
              },
              {
                type: "string",
                name: "background",
                label: "Color de Fondo",
                description: "Color de fondo principal",
                ui: {
                  component: ColorPickerField
                }
              },
              {
                type: "string",
                name: "text",
                label: "Color de Texto",
                description: "Color de texto principal",
                ui: {
                  component: ColorPickerField
                }
              }
            ]
          },
          // --- Contacto ---
          {
            type: "object",
            name: "contact",
            label: "Informaci\xF3n de Contacto",
            fields: [
              {
                type: "string",
                name: "phone",
                label: "Tel\xE9fono Principal",
                description: "N\xFAmero de tel\xE9fono con prefijo +593 (Ecuador)",
                ui: {
                  component: PhoneField
                }
              },
              {
                type: "string",
                name: "phoneSecondary",
                label: "Tel\xE9fono Secundario",
                description: "N\xFAmero de tel\xE9fono adicional",
                ui: {
                  component: PhoneField
                }
              },
              {
                type: "string",
                name: "whatsapp",
                label: "WhatsApp",
                description: "N\xFAmero de WhatsApp para contacto directo",
                ui: {
                  component: PhoneField
                }
              },
              {
                type: "string",
                name: "email",
                label: "Email Principal",
                description: "Correo electr\xF3nico de contacto",
                ui: {
                  component: EmailField
                }
              },
              {
                type: "string",
                name: "emailSecondary",
                label: "Email Secundario",
                description: "Correo electr\xF3nico adicional",
                ui: {
                  component: EmailField
                }
              },
              {
                type: "string",
                name: "hours",
                label: "Horario de Atenci\xF3n",
                description: "D\xEDas y horas de atenci\xF3n al p\xFAblico",
                ui: {
                  component: BusinessHoursField
                }
              }
            ]
          },
          // --- Ubicaciones (Principal y Oficinas) ---
          {
            type: "object",
            name: "locations",
            label: "Ubicaciones",
            fields: [
              {
                type: "object",
                name: "main",
                label: "Ubicaci\xF3n Principal (Oficina Central)",
                fields: [
                  { type: "string", name: "name", label: "Nombre de la Ubicaci\xF3n" },
                  { type: "string", name: "address", label: "Direcci\xF3n Completa", ui: { component: "textarea" } },
                  { type: "string", name: "city", label: "Ciudad" },
                  { type: "string", name: "province", label: "Provincia/Estado" },
                  { type: "string", name: "country", label: "Pa\xEDs" },
                  { type: "string", name: "postalCode", label: "C\xF3digo Postal" },
                  { type: "string", name: "phone", label: "Tel\xE9fono de esta ubicaci\xF3n" },
                  { type: "string", name: "email", label: "Email de esta ubicaci\xF3n" },
                  { type: "string", name: "mapUrl", label: "URL de Google Maps" },
                  { type: "string", name: "mapEmbed", label: "C\xF3digo Embed de Google Maps", ui: { component: MapEmbedField } },
                  { type: "number", name: "lat", label: "Latitud", description: "Se extrae autom\xE1ticamente del embed", ui: { component: "hidden" } },
                  { type: "number", name: "lng", label: "Longitud", description: "Se extrae autom\xE1ticamente del embed", ui: { component: "hidden" } }
                ]
              },
              {
                type: "object",
                name: "offices",
                label: "Otras Oficinas/Sucursales",
                list: true,
                fields: [
                  { type: "string", name: "name", label: "Nombre de la Oficina" },
                  { type: "string", name: "address", label: "Direcci\xF3n Completa", ui: { component: "textarea" } },
                  { type: "string", name: "city", label: "Ciudad" },
                  { type: "string", name: "province", label: "Provincia/Estado" },
                  { type: "string", name: "phone", label: "Tel\xE9fono" },
                  { type: "string", name: "email", label: "Email" },
                  { type: "string", name: "hours", label: "Horario de Atenci\xF3n" },
                  { type: "string", name: "mapUrl", label: "URL de Google Maps" },
                  { type: "string", name: "mapEmbed", label: "C\xF3digo Embed de Google Maps", ui: { component: MapEmbedField } },
                  { type: "number", name: "lat", label: "Latitud", description: "Se extrae autom\xE1ticamente del embed", ui: { component: "hidden" } },
                  { type: "number", name: "lng", label: "Longitud", description: "Se extrae autom\xE1ticamente del embed", ui: { component: "hidden" } },
                  { type: "number", name: "order", label: "Orden de visualizaci\xF3n" }
                ]
              }
            ]
          },
          // --- Redes Sociales (Dinámicas) ---
          {
            type: "object",
            name: "socialNetworks",
            label: "Redes Sociales",
            list: true,
            ui: {
              itemProps: (item) => ({
                label: item?.name || "Nueva Red Social"
              })
            },
            fields: [
              {
                type: "string",
                name: "name",
                label: "Nombre de la Red",
                description: "Ej: Facebook, Instagram, TikTok, X (Twitter)"
              },
              {
                type: "string",
                name: "icon",
                label: "Icono",
                description: "Selecciona el icono de la red social",
                ui: {
                  component: SocialIconSelector
                }
              },
              {
                type: "string",
                name: "url",
                label: "URL del Perfil"
              },
              {
                type: "boolean",
                name: "showInHeader",
                label: "Mostrar en Header"
              },
              {
                type: "boolean",
                name: "showInFooter",
                label: "Mostrar en Footer"
              },
              {
                type: "number",
                name: "order",
                label: "Orden"
              }
            ]
          },
          // --- Header ---
          {
            type: "object",
            name: "header",
            label: "Configuraci\xF3n del Header",
            fields: [
              {
                type: "boolean",
                name: "sticky",
                label: "Header Sticky (fijo al hacer scroll)"
              },
              {
                type: "boolean",
                name: "transparent",
                label: "Header Transparente en Hero"
              },
              {
                type: "boolean",
                name: "showTopBar",
                label: "Mostrar Barra Superior (con tel\xE9fono/email)"
              },
              {
                type: "object",
                name: "navigation",
                label: "Men\xFA de Navegaci\xF3n",
                list: true,
                ui: {
                  itemProps: (item) => ({
                    label: item?.label || "Nuevo Enlace"
                  })
                },
                fields: [
                  {
                    type: "string",
                    name: "label",
                    label: "Texto del Enlace"
                  },
                  {
                    type: "string",
                    name: "href",
                    label: "URL"
                  },
                  {
                    type: "number",
                    name: "order",
                    label: "Orden en el Men\xFA",
                    description: "N\xFAmero para ordenar (menor = primero)"
                  },
                  {
                    type: "boolean",
                    name: "highlight",
                    label: "Destacar este enlace"
                  },
                  {
                    type: "string",
                    name: "type",
                    label: "Tipo de Men\xFA",
                    options: [
                      { value: "link", label: "Enlace Normal" },
                      { value: "dropdown-services", label: "Dropdown de Servicios" },
                      { value: "dropdown-projects", label: "Dropdown de Proyectos" },
                      { value: "dropdown-custom", label: "Dropdown Personalizado" }
                    ]
                  },
                  {
                    type: "number",
                    name: "dropdownLimit",
                    label: "Cantidad en Dropdown",
                    description: "Para dropdowns de servicios/proyectos, cu\xE1ntos mostrar"
                  },
                  {
                    type: "object",
                    name: "children",
                    label: "Submen\xFA (para dropdown personalizado)",
                    list: true,
                    fields: [
                      { type: "string", name: "label", label: "Texto" },
                      { type: "string", name: "href", label: "URL" },
                      { type: "number", name: "order", label: "Orden" }
                    ]
                  }
                ]
              },
              {
                type: "string",
                name: "ctaText",
                label: "Texto del Bot\xF3n CTA"
              },
              {
                type: "string",
                name: "ctaLink",
                label: "Enlace del Bot\xF3n CTA"
              }
            ]
          },
          // --- Footer ---
          {
            type: "object",
            name: "footer",
            label: "Configuraci\xF3n del Footer",
            fields: [
              {
                type: "string",
                name: "copyright",
                label: "Texto de Copyright",
                description: "Usa {year} para el a\xF1o actual"
              },
              {
                type: "boolean",
                name: "showNewsletter",
                label: "Mostrar Newsletter"
              },
              {
                type: "string",
                name: "newsletterTitle",
                label: "T\xEDtulo del Newsletter"
              },
              {
                type: "string",
                name: "newsletterSubtitle",
                label: "Subt\xEDtulo del Newsletter"
              },
              {
                type: "object",
                name: "columns",
                label: "Columnas del Footer",
                list: true,
                ui: {
                  itemProps: (item) => ({
                    label: item?.title || "Nueva Columna"
                  })
                },
                fields: [
                  { type: "string", name: "title", label: "T\xEDtulo de la Columna" },
                  { type: "number", name: "order", label: "Orden" },
                  {
                    type: "object",
                    name: "links",
                    label: "Enlaces",
                    list: true,
                    fields: [
                      { type: "string", name: "label", label: "Texto" },
                      { type: "string", name: "href", label: "URL" },
                      { type: "number", name: "order", label: "Orden" }
                    ]
                  }
                ]
              }
            ]
          },
          // --- Páginas Legales ---
          {
            type: "object",
            name: "legal",
            label: "P\xE1ginas Legales",
            fields: [
              {
                type: "object",
                name: "privacyPolicy",
                label: "Pol\xEDtica de Privacidad",
                fields: [
                  { type: "boolean", name: "enabled", label: "Habilitada" },
                  { type: "string", name: "title", label: "T\xEDtulo de la P\xE1gina" },
                  { type: "string", name: "slug", label: "URL (slug)" },
                  { type: "datetime", name: "lastUpdated", label: "\xDAltima Actualizaci\xF3n" },
                  {
                    type: "rich-text",
                    name: "content",
                    label: "Contenido",
                    description: "Texto completo de la pol\xEDtica de privacidad"
                  }
                ]
              },
              {
                type: "object",
                name: "termsOfService",
                label: "T\xE9rminos de Servicio",
                fields: [
                  { type: "boolean", name: "enabled", label: "Habilitados" },
                  { type: "string", name: "title", label: "T\xEDtulo de la P\xE1gina" },
                  { type: "string", name: "slug", label: "URL (slug)" },
                  { type: "datetime", name: "lastUpdated", label: "\xDAltima Actualizaci\xF3n" },
                  {
                    type: "rich-text",
                    name: "content",
                    label: "Contenido",
                    description: "Texto completo de los t\xE9rminos de servicio"
                  }
                ]
              },
              {
                type: "object",
                name: "cookies",
                label: "Pol\xEDtica de Cookies",
                fields: [
                  { type: "boolean", name: "enabled", label: "Habilitada" },
                  { type: "boolean", name: "showBanner", label: "Mostrar Banner de Cookies" },
                  { type: "string", name: "title", label: "T\xEDtulo de la P\xE1gina" },
                  { type: "string", name: "slug", label: "URL (slug)" },
                  { type: "string", name: "bannerText", label: "Texto del Banner", ui: { component: "textarea" } },
                  { type: "string", name: "acceptButtonText", label: "Texto Bot\xF3n Aceptar" },
                  { type: "string", name: "rejectButtonText", label: "Texto Bot\xF3n Rechazar" },
                  { type: "string", name: "settingsButtonText", label: "Texto Bot\xF3n Configurar" },
                  {
                    type: "rich-text",
                    name: "content",
                    label: "Contenido",
                    description: "Texto completo de la pol\xEDtica de cookies"
                  }
                ]
              }
            ]
          },
          // --- Configuración SEO Global ---
          {
            type: "object",
            name: "seo",
            label: "SEO Global",
            fields: [
              { type: "string", name: "defaultTitle", label: "T\xEDtulo por Defecto" },
              { type: "string", name: "titleTemplate", label: "Plantilla de T\xEDtulo", description: "Usa %s para el t\xEDtulo de la p\xE1gina. Ej: %s | Constructora Carpio" },
              { type: "string", name: "defaultDescription", label: "Descripci\xF3n por Defecto", ui: { component: "textarea" } },
              { type: "image", name: "defaultOgImage", label: "Imagen OG por Defecto", description: "Se sube a Cloudinary" },
              { type: "string", name: "googleAnalyticsId", label: "Google Analytics ID" },
              { type: "string", name: "googleTagManagerId", label: "Google Tag Manager ID" }
            ]
          }
        ]
      }
    ]
  }
});
export {
  config_default as default
};
