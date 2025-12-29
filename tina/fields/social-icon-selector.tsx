import React from 'react';
import { wrapFieldsWithMeta } from 'tinacms';

// Lista completa de iconos de redes sociales disponibles
const SOCIAL_ICONS = [
  // Principales
  { value: 'facebook', label: 'Facebook', category: 'popular' },
  { value: 'instagram', label: 'Instagram', category: 'popular' },
  { value: 'x-twitter', label: 'X (Twitter)', category: 'popular' },
  { value: 'twitter', label: 'Twitter (antiguo)', category: 'popular' },
  { value: 'linkedin', label: 'LinkedIn', category: 'popular' },
  { value: 'youtube', label: 'YouTube', category: 'popular' },
  { value: 'tiktok', label: 'TikTok', category: 'popular' },
  { value: 'whatsapp', label: 'WhatsApp', category: 'popular' },
  
  // Mensajería
  { value: 'telegram', label: 'Telegram', category: 'mensajeria' },
  { value: 'messenger', label: 'Messenger', category: 'mensajeria' },
  { value: 'discord', label: 'Discord', category: 'mensajeria' },
  { value: 'slack', label: 'Slack', category: 'mensajeria' },
  { value: 'skype', label: 'Skype', category: 'mensajeria' },
  { value: 'viber', label: 'Viber', category: 'mensajeria' },
  { value: 'wechat', label: 'WeChat', category: 'mensajeria' },
  { value: 'line', label: 'Line', category: 'mensajeria' },
  
  // Profesionales / Negocios
  { value: 'github', label: 'GitHub', category: 'profesional' },
  { value: 'gitlab', label: 'GitLab', category: 'profesional' },
  { value: 'bitbucket', label: 'Bitbucket', category: 'profesional' },
  { value: 'behance', label: 'Behance', category: 'profesional' },
  { value: 'dribbble', label: 'Dribbble', category: 'profesional' },
  { value: 'figma', label: 'Figma', category: 'profesional' },
  { value: 'medium', label: 'Medium', category: 'profesional' },
  { value: 'dev', label: 'Dev.to', category: 'profesional' },
  { value: 'stackoverflow', label: 'Stack Overflow', category: 'profesional' },
  
  // Video / Streaming
  { value: 'twitch', label: 'Twitch', category: 'video' },
  { value: 'vimeo', label: 'Vimeo', category: 'video' },
  { value: 'dailymotion', label: 'Dailymotion', category: 'video' },
  
  // Fotos / Imágenes
  { value: 'pinterest', label: 'Pinterest', category: 'fotos' },
  { value: 'flickr', label: 'Flickr', category: 'fotos' },
  { value: 'unsplash', label: 'Unsplash', category: 'fotos' },
  { value: '500px', label: '500px', category: 'fotos' },
  
  // Música / Audio
  { value: 'spotify', label: 'Spotify', category: 'musica' },
  { value: 'soundcloud', label: 'SoundCloud', category: 'musica' },
  { value: 'apple', label: 'Apple Music', category: 'musica' },
  { value: 'deezer', label: 'Deezer', category: 'musica' },
  
  // Social Alternativo
  { value: 'reddit', label: 'Reddit', category: 'social' },
  { value: 'tumblr', label: 'Tumblr', category: 'social' },
  { value: 'snapchat', label: 'Snapchat', category: 'social' },
  { value: 'mastodon', label: 'Mastodon', category: 'social' },
  { value: 'threads', label: 'Threads', category: 'social' },
  { value: 'bluesky', label: 'Bluesky', category: 'social' },
  
  // E-commerce / Negocios
  { value: 'amazon', label: 'Amazon', category: 'ecommerce' },
  { value: 'shopify', label: 'Shopify', category: 'ecommerce' },
  { value: 'etsy', label: 'Etsy', category: 'ecommerce' },
  { value: 'paypal', label: 'PayPal', category: 'ecommerce' },
  
  // Otros
  { value: 'google', label: 'Google', category: 'otros' },
  { value: 'google-maps', label: 'Google Maps', category: 'otros' },
  { value: 'tripadvisor', label: 'TripAdvisor', category: 'otros' },
  { value: 'yelp', label: 'Yelp', category: 'otros' },
  { value: 'rss', label: 'RSS', category: 'otros' },
  { value: 'email', label: 'Email', category: 'otros' },
  { value: 'phone', label: 'Teléfono', category: 'otros' },
  { value: 'globe', label: 'Sitio Web', category: 'otros' },
  { value: 'link', label: 'Enlace', category: 'otros' },
];

const CATEGORIES = [
  { value: 'all', label: '📋 Todos' },
  { value: 'popular', label: '⭐ Populares' },
  { value: 'mensajeria', label: '💬 Mensajería' },
  { value: 'profesional', label: '💼 Profesional' },
  { value: 'video', label: '🎬 Video' },
  { value: 'fotos', label: '📷 Fotos' },
  { value: 'musica', label: '🎵 Música' },
  { value: 'social', label: '👥 Social' },
  { value: 'ecommerce', label: '🛒 E-commerce' },
  { value: 'otros', label: '📌 Otros' },
];

// Componente de selector de iconos de redes sociales
export const SocialIconSelector = wrapFieldsWithMeta(({ input }: any) => {
  const [searchTerm, setSearchTerm] = React.useState('');
  const [selectedCategory, setSelectedCategory] = React.useState('all');
  const [isOpen, setIsOpen] = React.useState(false);
  const dropdownRef = React.useRef<HTMLDivElement>(null);

  // Cerrar dropdown al hacer clic fuera
  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Filtrar iconos según búsqueda y categoría
  const filteredIcons = SOCIAL_ICONS.filter((icon) => {
    const matchesSearch = 
      icon.label.toLowerCase().includes(searchTerm.toLowerCase()) ||
      icon.value.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || icon.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  // Obtener el icono seleccionado actualmente
  const selectedIcon = SOCIAL_ICONS.find((icon) => icon.value === input.value);

  const handleSelect = (value: string) => {
    input.onChange(value);
    setIsOpen(false);
    setSearchTerm('');
  };

  const inputStyle: React.CSSProperties = {
    width: '100%',
    padding: '10px 12px',
    border: '1px solid #e2e8f0',
    borderRadius: '6px',
    fontSize: '14px',
    outline: 'none',
  };

  const dropdownStyle: React.CSSProperties = {
    position: 'absolute',
    top: '100%',
    left: 0,
    right: 0,
    backgroundColor: 'white',
    border: '1px solid #e2e8f0',
    borderRadius: '6px',
    boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
    zIndex: 1000,
    maxHeight: '350px',
    overflow: 'hidden',
    display: 'flex',
    flexDirection: 'column',
  };

  const optionStyle: React.CSSProperties = {
    padding: '10px 12px',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    borderBottom: '1px solid #f0f0f0',
  };

  return (
    <div ref={dropdownRef} style={{ position: 'relative' }}>
      {/* Campo de selección */}
      <div
        onClick={() => setIsOpen(!isOpen)}
        style={{
          ...inputStyle,
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          backgroundColor: '#f7fafc',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          {selectedIcon ? (
            <>
              <span style={{ fontSize: '18px' }}>
                {getIconEmoji(selectedIcon.value)}
              </span>
              <span>{selectedIcon.label}</span>
              <span style={{ fontSize: '12px', color: '#718096' }}>
                ({selectedIcon.value})
              </span>
            </>
          ) : (
            <span style={{ color: '#a0aec0' }}>Selecciona un icono...</span>
          )}
        </div>
        <span style={{ color: '#718096' }}>{isOpen ? '▲' : '▼'}</span>
      </div>

      {/* Dropdown */}
      {isOpen && (
        <div style={dropdownStyle}>
          {/* Barra de búsqueda */}
          <div style={{ padding: '10px', borderBottom: '1px solid #e2e8f0' }}>
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="🔍 Buscar red social..."
              style={{
                ...inputStyle,
                marginBottom: '8px',
              }}
              autoFocus
            />
            
            {/* Filtro por categoría */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px' }}>
              {CATEGORIES.map((cat) => (
                <button
                  key={cat.value}
                  onClick={() => setSelectedCategory(cat.value)}
                  style={{
                    padding: '4px 8px',
                    fontSize: '12px',
                    border: 'none',
                    borderRadius: '4px',
                    cursor: 'pointer',
                    backgroundColor: selectedCategory === cat.value ? '#3182ce' : '#edf2f7',
                    color: selectedCategory === cat.value ? 'white' : '#4a5568',
                  }}
                >
                  {cat.label}
                </button>
              ))}
            </div>
          </div>

          {/* Lista de iconos */}
          <div style={{ overflowY: 'auto', maxHeight: '250px' }}>
            {filteredIcons.length > 0 ? (
              filteredIcons.map((icon) => (
                <div
                  key={icon.value}
                  onClick={() => handleSelect(icon.value)}
                  style={{
                    ...optionStyle,
                    backgroundColor: input.value === icon.value ? '#ebf8ff' : 'transparent',
                  }}
                  onMouseEnter={(e) => {
                    if (input.value !== icon.value) {
                      e.currentTarget.style.backgroundColor = '#f7fafc';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (input.value !== icon.value) {
                      e.currentTarget.style.backgroundColor = 'transparent';
                    }
                  }}
                >
                  <span style={{ fontSize: '20px', width: '28px', textAlign: 'center' }}>
                    {getIconEmoji(icon.value)}
                  </span>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontWeight: '500' }}>{icon.label}</div>
                    <div style={{ fontSize: '12px', color: '#718096' }}>{icon.value}</div>
                  </div>
                  {input.value === icon.value && (
                    <span style={{ color: '#38a169' }}>✓</span>
                  )}
                </div>
              ))
            ) : (
              <div style={{ padding: '20px', textAlign: 'center', color: '#718096' }}>
                No se encontraron resultados
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
});

// Función para obtener emoji representativo del icono
function getIconEmoji(iconName: string): string {
  const emojiMap: Record<string, string> = {
    'facebook': '📘',
    'instagram': '📸',
    'x-twitter': '✖️',
    'twitter': '🐦',
    'linkedin': '💼',
    'youtube': '▶️',
    'tiktok': '🎵',
    'whatsapp': '💬',
    'telegram': '✈️',
    'messenger': '💭',
    'discord': '🎮',
    'slack': '💬',
    'skype': '☁️',
    'viber': '📞',
    'wechat': '💚',
    'line': '💚',
    'github': '🐙',
    'gitlab': '🦊',
    'bitbucket': '🪣',
    'behance': '🎨',
    'dribbble': '🏀',
    'figma': '🎨',
    'medium': '📝',
    'dev': '👨‍💻',
    'stackoverflow': '📚',
    'twitch': '🎮',
    'vimeo': '🎬',
    'dailymotion': '📺',
    'pinterest': '📌',
    'flickr': '📷',
    'unsplash': '📸',
    '500px': '📷',
    'spotify': '🎧',
    'soundcloud': '☁️',
    'apple': '🍎',
    'deezer': '🎵',
    'reddit': '🤖',
    'tumblr': '📱',
    'snapchat': '👻',
    'mastodon': '🐘',
    'threads': '🧵',
    'bluesky': '☁️',
    'amazon': '📦',
    'shopify': '🛒',
    'etsy': '🎁',
    'paypal': '💳',
    'google': '🔍',
    'google-maps': '📍',
    'tripadvisor': '🦉',
    'yelp': '⭐',
    'rss': '📡',
    'email': '✉️',
    'phone': '📞',
    'globe': '🌐',
    'link': '🔗',
  };
  return emojiMap[iconName] || '🔗';
}
