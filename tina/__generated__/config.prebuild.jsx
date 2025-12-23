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
var heroSection = {
  name: "hero",
  label: "Hero Principal",
  ui: {
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
      type: "string",
      name: "backgroundImage",
      label: "Imagen de Fondo",
      ui: {
        // @ts-ignore
        component: ImagePreviewField
      }
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
      type: "string",
      name: "image",
      label: "Imagen",
      ui: {
        // @ts-ignore
        component: ImagePreviewField
      }
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
        {
          type: "string",
          name: "image",
          label: "Imagen",
          ui: {
            // @ts-ignore
            component: ImagePreviewField
          }
        },
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
        {
          type: "string",
          name: "avatar",
          label: "Foto del Autor",
          ui: {
            // @ts-ignore
            component: ImagePreviewField
          }
        },
        { type: "number", name: "rating", label: "Calificaci\xF3n (1-5)" }
      ]
    }
  ]
};
var ctaSection = {
  name: "cta",
  label: "Llamado a la Acci\xF3n (CTA)",
  ui: {
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
      type: "string",
      name: "backgroundImage",
      label: "Imagen de Fondo",
      ui: {
        // @ts-ignore
        component: ImagePreviewField
      }
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
        {
          type: "string",
          name: "photo",
          label: "Foto",
          ui: {
            // @ts-ignore
            component: ImagePreviewField
          }
        },
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
        {
          type: "string",
          name: "image",
          label: "Imagen",
          ui: {
            // @ts-ignore
            component: ImagePreviewField
          }
        }
      ]
    }
  ]
};
var contentSection = {
  name: "content",
  label: "Contenido Libre",
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
var pageBlockTemplates = [
  heroSection,
  aboutSection,
  servicesSection,
  projectsSection,
  testimonialsSection,
  ctaSection,
  contactSection,
  teamSection,
  faqSection,
  gallerySection,
  featuresSection,
  contentSection,
  spacerSection
];

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
  media: {
    tina: {
      mediaRoot: "images",
      publicFolder: "public"
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
          },
          // Router para vista previa en iframe
          router: (args) => {
            const filename = args.document._sys.filename;
            const routeMap = {
              "inicio": "/",
              "nosotros": "/quienes-somos",
              "servicios": "/servicios",
              "proyectos": "/proyectos",
              "contacto": "/contacto"
            };
            return routeMap[filename] ?? `/${filename}`;
          }
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
            templates: pageBlockTemplates
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
                type: "string",
                name: "logo",
                label: "Logo",
                ui: {
                  // @ts-ignore
                  component: ImagePreviewField
                }
              },
              {
                type: "string",
                name: "logoWhite",
                label: "Logo Blanco (para fondos oscuros)",
                ui: {
                  // @ts-ignore
                  component: ImagePreviewField
                }
              },
              {
                type: "string",
                name: "favicon",
                label: "Favicon"
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
                label: "Tel\xE9fono Principal"
              },
              {
                type: "string",
                name: "whatsapp",
                label: "WhatsApp"
              },
              {
                type: "string",
                name: "email",
                label: "Email Principal"
              },
              {
                type: "string",
                name: "address",
                label: "Direcci\xF3n",
                ui: { component: "textarea" }
              },
              {
                type: "string",
                name: "hours",
                label: "Horario de Atenci\xF3n"
              }
            ]
          },
          // --- Redes Sociales ---
          {
            type: "object",
            name: "social",
            label: "Redes Sociales",
            fields: [
              {
                type: "string",
                name: "facebook",
                label: "Facebook URL"
              },
              {
                type: "string",
                name: "instagram",
                label: "Instagram URL"
              },
              {
                type: "string",
                name: "linkedin",
                label: "LinkedIn URL"
              },
              {
                type: "string",
                name: "youtube",
                label: "YouTube URL"
              },
              {
                type: "string",
                name: "tiktok",
                label: "TikTok URL"
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
                type: "object",
                name: "navigation",
                label: "Men\xFA de Navegaci\xF3n",
                list: true,
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
                    type: "object",
                    name: "children",
                    label: "Submen\xFA",
                    list: true,
                    fields: [
                      {
                        type: "string",
                        name: "label",
                        label: "Texto"
                      },
                      {
                        type: "string",
                        name: "href",
                        label: "URL"
                      }
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
                label: "Texto de Copyright"
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
                type: "object",
                name: "columns",
                label: "Columnas del Footer",
                list: true,
                fields: [
                  {
                    type: "string",
                    name: "title",
                    label: "T\xEDtulo de la Columna"
                  },
                  {
                    type: "object",
                    name: "links",
                    label: "Enlaces",
                    list: true,
                    fields: [
                      {
                        type: "string",
                        name: "label",
                        label: "Texto"
                      },
                      {
                        type: "string",
                        name: "href",
                        label: "URL"
                      }
                    ]
                  }
                ]
              }
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
