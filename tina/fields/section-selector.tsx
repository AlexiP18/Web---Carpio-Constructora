import React from 'react';

// Configuración de las secciones disponibles con sus previews
export const SECTION_TEMPLATES = [
  {
    name: 'hero',
    label: 'Hero / Banner Principal',
    description: 'Sección principal con imagen de fondo, título y botones de acción',
    category: 'Principal',
    preview: '/admin/previews/hero.png',
    icon: '🖼️',
  },
  {
    name: 'about',
    label: 'Acerca de / Sobre Nosotros',
    description: 'Sección con información de la empresa, imagen y texto',
    category: 'Contenido',
    preview: '/admin/previews/about.png',
    icon: '📖',
  },
  {
    name: 'services',
    label: 'Servicios',
    description: 'Grid de servicios con iconos y descripciones',
    category: 'Contenido',
    preview: '/admin/previews/services.png',
    icon: '🛠️',
  },
  {
    name: 'projects',
    label: 'Proyectos / Portafolio',
    description: 'Galería de proyectos destacados con filtros',
    category: 'Contenido',
    preview: '/admin/previews/projects.png',
    icon: '🏗️',
  },
  {
    name: 'testimonials',
    label: 'Testimonios',
    description: 'Carrusel o grid de testimonios de clientes',
    category: 'Social',
    preview: '/admin/previews/testimonials.png',
    icon: '💬',
  },
  {
    name: 'cta',
    label: 'Llamado a la Acción (CTA)',
    description: 'Banner con texto persuasivo y botón de acción',
    category: 'Conversión',
    preview: '/admin/previews/cta.png',
    icon: '🎯',
  },
  {
    name: 'contact',
    label: 'Formulario de Contacto',
    description: 'Formulario con mapa e información de contacto',
    category: 'Contacto',
    preview: '/admin/previews/contact.png',
    icon: '📧',
  },
  {
    name: 'team',
    label: 'Equipo',
    description: 'Grid con miembros del equipo y sus roles',
    category: 'Social',
    preview: '/admin/previews/team.png',
    icon: '👥',
  },
  {
    name: 'faq',
    label: 'Preguntas Frecuentes',
    description: 'Acordeón de preguntas y respuestas',
    category: 'Contenido',
    preview: '/admin/previews/faq.png',
    icon: '❓',
  },
  {
    name: 'gallery',
    label: 'Galería de Imágenes',
    description: 'Galería en grid, mosaico o slider',
    category: 'Media',
    preview: '/admin/previews/gallery.png',
    icon: '🖼️',
  },
  {
    name: 'features',
    label: 'Valores / Características',
    description: 'Lista de características con iconos',
    category: 'Contenido',
    preview: '/admin/previews/features.png',
    icon: '✨',
  },
  {
    name: 'content',
    label: 'Contenido Libre',
    description: 'Bloque de texto enriquecido para contenido personalizado',
    category: 'Contenido',
    preview: '/admin/previews/content.png',
    icon: '📝',
  },
  {
    name: 'spacer',
    label: 'Separador / Espaciador',
    description: 'Espacio en blanco con línea divisoria opcional',
    category: 'Utilidad',
    preview: '/admin/previews/spacer.png',
    icon: '➖',
  },
];

const CATEGORIES = [
  { value: 'all', label: 'Todas' },
  { value: 'Principal', label: 'Principal' },
  { value: 'Contenido', label: 'Contenido' },
  { value: 'Social', label: 'Social' },
  { value: 'Conversión', label: 'Conversión' },
  { value: 'Contacto', label: 'Contacto' },
  { value: 'Media', label: 'Media' },
  { value: 'Utilidad', label: 'Utilidad' },
];

interface SectionSelectorModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelect: (templateName: string) => void;
}

// Modal de selección de secciones
export const SectionSelectorModal: React.FC<SectionSelectorModalProps> = ({
  isOpen,
  onClose,
  onSelect,
}) => {
  const [searchTerm, setSearchTerm] = React.useState('');
  const [selectedCategory, setSelectedCategory] = React.useState('all');
  const [imageErrors, setImageErrors] = React.useState<Record<string, boolean>>({});

  if (!isOpen) return null;

  const filteredSections = SECTION_TEMPLATES.filter((section) => {
    const matchesSearch =
      section.label.toLowerCase().includes(searchTerm.toLowerCase()) ||
      section.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory =
      selectedCategory === 'all' || section.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleImageError = (sectionName: string) => {
    setImageErrors(prev => ({ ...prev, [sectionName]: true }));
  };

  const modalOverlayStyle: React.CSSProperties = {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 10000,
    padding: '20px',
  };

  const modalStyle: React.CSSProperties = {
    backgroundColor: 'white',
    borderRadius: '12px',
    width: '100%',
    maxWidth: '900px',
    maxHeight: '85vh',
    display: 'flex',
    flexDirection: 'column',
    boxShadow: '0 20px 60px rgba(0, 0, 0, 0.3)',
  };

  const headerStyle: React.CSSProperties = {
    padding: '20px 24px',
    borderBottom: '1px solid #e2e8f0',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  };

  const searchBarStyle: React.CSSProperties = {
    padding: '16px 24px',
    borderBottom: '1px solid #e2e8f0',
    backgroundColor: '#f7fafc',
  };

  const gridContainerStyle: React.CSSProperties = {
    padding: '20px 24px',
    overflowY: 'auto',
    flex: 1,
  };

  const gridStyle: React.CSSProperties = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
    gap: '16px',
  };

  const cardStyle: React.CSSProperties = {
    border: '1px solid #e2e8f0',
    borderRadius: '10px',
    overflow: 'hidden',
    cursor: 'pointer',
    transition: 'all 0.2s ease',
    backgroundColor: 'white',
  };

  const cardHoverStyle: React.CSSProperties = {
    ...cardStyle,
    borderColor: '#3182ce',
    boxShadow: '0 4px 12px rgba(49, 130, 206, 0.15)',
    transform: 'translateY(-2px)',
  };

  const previewStyle: React.CSSProperties = {
    width: '100%',
    height: '140px',
    objectFit: 'cover',
    backgroundColor: '#e2e8f0',
  };

  const placeholderStyle: React.CSSProperties = {
    width: '100%',
    height: '140px',
    backgroundColor: '#edf2f7',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    color: '#718096',
  };

  const cardContentStyle: React.CSSProperties = {
    padding: '14px',
  };

  const inputStyle: React.CSSProperties = {
    width: '100%',
    padding: '10px 14px',
    border: '1px solid #e2e8f0',
    borderRadius: '8px',
    fontSize: '14px',
    outline: 'none',
    marginBottom: '12px',
  };

  const categoryButtonsStyle: React.CSSProperties = {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '8px',
  };

  return (
    <div style={modalOverlayStyle} onClick={onClose}>
      <div style={modalStyle} onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div style={headerStyle}>
          <div>
            <h2 style={{ margin: 0, fontSize: '20px', fontWeight: '600', color: '#1a202c' }}>
              ➕ Agregar Nueva Sección
            </h2>
            <p style={{ margin: '4px 0 0', fontSize: '14px', color: '#718096' }}>
              Selecciona el tipo de sección que deseas agregar
            </p>
          </div>
          <button
            onClick={onClose}
            style={{
              background: 'none',
              border: 'none',
              fontSize: '24px',
              cursor: 'pointer',
              color: '#718096',
              padding: '4px',
            }}
          >
            ✕
          </button>
        </div>

        {/* Búsqueda y filtros */}
        <div style={searchBarStyle}>
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="🔍 Buscar secciones..."
            style={inputStyle}
            autoFocus
          />
          <div style={categoryButtonsStyle}>
            {CATEGORIES.map((cat) => (
              <button
                key={cat.value}
                onClick={() => setSelectedCategory(cat.value)}
                style={{
                  padding: '6px 12px',
                  fontSize: '13px',
                  border: 'none',
                  borderRadius: '6px',
                  cursor: 'pointer',
                  backgroundColor:
                    selectedCategory === cat.value ? '#3182ce' : '#edf2f7',
                  color: selectedCategory === cat.value ? 'white' : '#4a5568',
                  fontWeight: selectedCategory === cat.value ? '500' : '400',
                  transition: 'all 0.15s ease',
                }}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Grid de secciones */}
        <div style={gridContainerStyle}>
          {filteredSections.length > 0 ? (
            <div style={gridStyle}>
              {filteredSections.map((section) => (
                <SectionCard
                  key={section.name}
                  section={section}
                  onClick={() => onSelect(section.name)}
                  hasImageError={imageErrors[section.name]}
                  onImageError={() => handleImageError(section.name)}
                />
              ))}
            </div>
          ) : (
            <div style={{ textAlign: 'center', padding: '40px', color: '#718096' }}>
              <span style={{ fontSize: '48px', display: 'block', marginBottom: '12px' }}>
                🔍
              </span>
              <p>No se encontraron secciones</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// Componente de card individual
interface SectionCardProps {
  section: typeof SECTION_TEMPLATES[0];
  onClick: () => void;
  hasImageError: boolean;
  onImageError: () => void;
}

const SectionCard: React.FC<SectionCardProps> = ({
  section,
  onClick,
  hasImageError,
  onImageError,
}) => {
  const [isHovered, setIsHovered] = React.useState(false);

  return (
    <div
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        border: isHovered ? '2px solid #3182ce' : '1px solid #e2e8f0',
        borderRadius: '10px',
        overflow: 'hidden',
        cursor: 'pointer',
        transition: 'all 0.2s ease',
        backgroundColor: 'white',
        transform: isHovered ? 'translateY(-2px)' : 'none',
        boxShadow: isHovered
          ? '0 4px 12px rgba(49, 130, 206, 0.15)'
          : '0 1px 3px rgba(0,0,0,0.05)',
      }}
    >
      {/* Preview Image or Placeholder */}
      {!hasImageError ? (
        <img
          src={section.preview}
          alt={section.label}
          onError={onImageError}
          style={{
            width: '100%',
            height: '140px',
            objectFit: 'cover',
            backgroundColor: '#e2e8f0',
          }}
        />
      ) : (
        <div
          style={{
            width: '100%',
            height: '140px',
            backgroundColor: isHovered ? '#ebf8ff' : '#f7fafc',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            transition: 'background-color 0.2s ease',
          }}
        >
          <span style={{ fontSize: '40px', marginBottom: '4px' }}>{section.icon}</span>
          <span style={{ fontSize: '11px', color: '#a0aec0' }}>{section.category}</span>
        </div>
      )}

      {/* Content */}
      <div style={{ padding: '14px' }}>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            marginBottom: '6px',
          }}
        >
          <span style={{ fontSize: '16px' }}>{section.icon}</span>
          <h3
            style={{
              margin: 0,
              fontSize: '14px',
              fontWeight: '600',
              color: '#1a202c',
            }}
          >
            {section.label}
          </h3>
        </div>
        <p
          style={{
            margin: 0,
            fontSize: '12px',
            color: '#718096',
            lineHeight: '1.4',
          }}
        >
          {section.description}
        </p>
        <div
          style={{
            marginTop: '10px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <span
            style={{
              fontSize: '11px',
              padding: '3px 8px',
              backgroundColor: '#edf2f7',
              borderRadius: '4px',
              color: '#4a5568',
            }}
          >
            {section.category}
          </span>
          {isHovered && (
            <span
              style={{
                fontSize: '11px',
                color: '#3182ce',
                fontWeight: '500',
              }}
            >
              Clic para agregar →
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default SectionSelectorModal;
