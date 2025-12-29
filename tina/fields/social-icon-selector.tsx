import React from 'react';
import { wrapFieldsWithMeta } from 'tinacms';
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
  ShareNetwork,
  type Icon as PhosphorIcon,
} from '@phosphor-icons/react';

// Mapeo de nombres de iconos a componentes de Phosphor
const ICON_COMPONENTS: Record<string, PhosphorIcon> = {
  'ph:facebook-logo': FacebookLogo,
  'ph:facebook-logo-fill': FacebookLogo,
  'ph:instagram-logo': InstagramLogo,
  'ph:instagram-logo-fill': InstagramLogo,
  'ph:x-logo': XLogo,
  'ph:x-logo-fill': XLogo,
  'ph:twitter-logo': TwitterLogo,
  'ph:twitter-logo-fill': TwitterLogo,
  'ph:linkedin-logo': LinkedinLogo,
  'ph:linkedin-logo-fill': LinkedinLogo,
  'ph:youtube-logo': YoutubeLogo,
  'ph:youtube-logo-fill': YoutubeLogo,
  'ph:tiktok-logo': TiktokLogo,
  'ph:tiktok-logo-fill': TiktokLogo,
  'ph:whatsapp-logo': WhatsappLogo,
  'ph:whatsapp-logo-fill': WhatsappLogo,
  'ph:telegram-logo': TelegramLogo,
  'ph:telegram-logo-fill': TelegramLogo,
  'ph:messenger-logo': MessengerLogo,
  'ph:messenger-logo-fill': MessengerLogo,
  'ph:discord-logo': DiscordLogo,
  'ph:discord-logo-fill': DiscordLogo,
  'ph:slack-logo': SlackLogo,
  'ph:slack-logo-fill': SlackLogo,
  'ph:skype-logo': SkypeLogo,
  'ph:skype-logo-fill': SkypeLogo,
  'ph:wechat-logo': WechatLogo,
  'ph:wechat-logo-fill': WechatLogo,
  'ph:github-logo': GithubLogo,
  'ph:github-logo-fill': GithubLogo,
  'ph:gitlab-logo': GitlabLogo,
  'ph:gitlab-logo-fill': GitlabLogo,
  'ph:behance-logo': BehanceLogo,
  'ph:behance-logo-fill': BehanceLogo,
  'ph:dribbble-logo': DribbbleLogo,
  'ph:dribbble-logo-fill': DribbbleLogo,
  'ph:figma-logo': FigmaLogo,
  'ph:figma-logo-fill': FigmaLogo,
  'ph:medium-logo': MediumLogo,
  'ph:medium-logo-fill': MediumLogo,
  'ph:notion-logo': NotionLogo,
  'ph:notion-logo-fill': NotionLogo,
  'ph:twitch-logo': TwitchLogo,
  'ph:twitch-logo-fill': TwitchLogo,
  'ph:pinterest-logo': PinterestLogo,
  'ph:pinterest-logo-fill': PinterestLogo,
  'ph:snapchat-logo': SnapchatLogo,
  'ph:snapchat-logo-fill': SnapchatLogo,
  'ph:spotify-logo': SpotifyLogo,
  'ph:spotify-logo-fill': SpotifyLogo,
  'ph:soundcloud-logo': SoundcloudLogo,
  'ph:soundcloud-logo-fill': SoundcloudLogo,
  'ph:apple-podcasts-logo': ApplePodcastsLogo,
  'ph:apple-podcasts-logo-fill': ApplePodcastsLogo,
  'ph:reddit-logo': RedditLogo,
  'ph:reddit-logo-fill': RedditLogo,
  'ph:mastodon-logo': MastodonLogo,
  'ph:mastodon-logo-fill': MastodonLogo,
  'ph:threads-logo': ThreadsLogo,
  'ph:threads-logo-fill': ThreadsLogo,
  'ph:amazon-logo': AmazonLogo,
  'ph:amazon-logo-fill': AmazonLogo,
  'ph:paypal-logo': PaypalLogo,
  'ph:paypal-logo-fill': PaypalLogo,
  'ph:stripe-logo': StripeLogo,
  'ph:stripe-logo-fill': StripeLogo,
  'ph:google-logo': GoogleLogo,
  'ph:google-logo-fill': GoogleLogo,
  'ph:google-play-logo': GooglePlayLogo,
  'ph:google-play-logo-fill': GooglePlayLogo,
  'ph:app-store-logo': AppStoreLogo,
  'ph:app-store-logo-fill': AppStoreLogo,
  'ph:apple-logo': AppleLogo,
  'ph:apple-logo-fill': AppleLogo,
  'ph:android-logo': AndroidLogo,
  'ph:android-logo-fill': AndroidLogo,
  'ph:globe': Globe,
  'ph:globe-fill': Globe,
  'ph:envelope': Envelope,
  'ph:envelope-fill': Envelope,
  'ph:phone': Phone,
  'ph:phone-fill': Phone,
  'ph:map-pin': MapPin,
  'ph:map-pin-fill': MapPin,
  'ph:link': Link,
  'ph:link-fill': Link,
  'ph:share-network': ShareNetwork,
  'ph:share-network-fill': ShareNetwork,
};

// Función para renderizar el icono de Phosphor
function PhosphorIconPreview({ iconName, size = 20 }: { iconName: string; size?: number }) {
  const IconComponent = ICON_COMPONENTS[iconName];
  const isFill = iconName.includes('-fill');
  
  if (!IconComponent) {
    return <span style={{ fontSize: size, width: size, textAlign: 'center' }}>🔗</span>;
  }
  
  return (
    <IconComponent 
      size={size} 
      weight={isFill ? 'fill' : 'regular'} 
      style={{ color: '#4a5568' }}
    />
  );
}

// Lista de iconos de redes sociales disponibles en Phosphor Icons
// Formato: ph:nombre-logo o ph:nombre-logo-fill
const SOCIAL_ICONS = [
  // Principales / Populares
  { value: 'ph:facebook-logo', label: 'Facebook', category: 'popular' },
  { value: 'ph:facebook-logo-fill', label: 'Facebook (relleno)', category: 'popular' },
  { value: 'ph:instagram-logo', label: 'Instagram', category: 'popular' },
  { value: 'ph:instagram-logo-fill', label: 'Instagram (relleno)', category: 'popular' },
  { value: 'ph:x-logo', label: 'X (Twitter)', category: 'popular' },
  { value: 'ph:x-logo-fill', label: 'X (relleno)', category: 'popular' },
  { value: 'ph:twitter-logo', label: 'Twitter (antiguo)', category: 'popular' },
  { value: 'ph:twitter-logo-fill', label: 'Twitter (relleno)', category: 'popular' },
  { value: 'ph:linkedin-logo', label: 'LinkedIn', category: 'popular' },
  { value: 'ph:linkedin-logo-fill', label: 'LinkedIn (relleno)', category: 'popular' },
  { value: 'ph:youtube-logo', label: 'YouTube', category: 'popular' },
  { value: 'ph:youtube-logo-fill', label: 'YouTube (relleno)', category: 'popular' },
  { value: 'ph:tiktok-logo', label: 'TikTok', category: 'popular' },
  { value: 'ph:tiktok-logo-fill', label: 'TikTok (relleno)', category: 'popular' },
  { value: 'ph:whatsapp-logo', label: 'WhatsApp', category: 'popular' },
  { value: 'ph:whatsapp-logo-fill', label: 'WhatsApp (relleno)', category: 'popular' },
  
  // Mensajería
  { value: 'ph:telegram-logo', label: 'Telegram', category: 'mensajeria' },
  { value: 'ph:telegram-logo-fill', label: 'Telegram (relleno)', category: 'mensajeria' },
  { value: 'ph:messenger-logo', label: 'Messenger', category: 'mensajeria' },
  { value: 'ph:messenger-logo-fill', label: 'Messenger (relleno)', category: 'mensajeria' },
  { value: 'ph:discord-logo', label: 'Discord', category: 'mensajeria' },
  { value: 'ph:discord-logo-fill', label: 'Discord (relleno)', category: 'mensajeria' },
  { value: 'ph:slack-logo', label: 'Slack', category: 'mensajeria' },
  { value: 'ph:slack-logo-fill', label: 'Slack (relleno)', category: 'mensajeria' },
  { value: 'ph:skype-logo', label: 'Skype', category: 'mensajeria' },
  { value: 'ph:skype-logo-fill', label: 'Skype (relleno)', category: 'mensajeria' },
  { value: 'ph:wechat-logo', label: 'WeChat', category: 'mensajeria' },
  { value: 'ph:wechat-logo-fill', label: 'WeChat (relleno)', category: 'mensajeria' },
  
  // Profesional / Desarrollo
  { value: 'ph:github-logo', label: 'GitHub', category: 'profesional' },
  { value: 'ph:github-logo-fill', label: 'GitHub (relleno)', category: 'profesional' },
  { value: 'ph:gitlab-logo', label: 'GitLab', category: 'profesional' },
  { value: 'ph:gitlab-logo-fill', label: 'GitLab (relleno)', category: 'profesional' },
  { value: 'ph:behance-logo', label: 'Behance', category: 'profesional' },
  { value: 'ph:behance-logo-fill', label: 'Behance (relleno)', category: 'profesional' },
  { value: 'ph:dribbble-logo', label: 'Dribbble', category: 'profesional' },
  { value: 'ph:dribbble-logo-fill', label: 'Dribbble (relleno)', category: 'profesional' },
  { value: 'ph:figma-logo', label: 'Figma', category: 'profesional' },
  { value: 'ph:figma-logo-fill', label: 'Figma (relleno)', category: 'profesional' },
  { value: 'ph:medium-logo', label: 'Medium', category: 'profesional' },
  { value: 'ph:medium-logo-fill', label: 'Medium (relleno)', category: 'profesional' },
  { value: 'ph:notion-logo', label: 'Notion', category: 'profesional' },
  { value: 'ph:notion-logo-fill', label: 'Notion (relleno)', category: 'profesional' },
  
  // Video / Streaming
  { value: 'ph:twitch-logo', label: 'Twitch', category: 'video' },
  { value: 'ph:twitch-logo-fill', label: 'Twitch (relleno)', category: 'video' },
  
  // Fotos / Imágenes
  { value: 'ph:pinterest-logo', label: 'Pinterest', category: 'fotos' },
  { value: 'ph:pinterest-logo-fill', label: 'Pinterest (relleno)', category: 'fotos' },
  { value: 'ph:snapchat-logo', label: 'Snapchat', category: 'fotos' },
  { value: 'ph:snapchat-logo-fill', label: 'Snapchat (relleno)', category: 'fotos' },
  
  // Música / Audio
  { value: 'ph:spotify-logo', label: 'Spotify', category: 'musica' },
  { value: 'ph:spotify-logo-fill', label: 'Spotify (relleno)', category: 'musica' },
  { value: 'ph:soundcloud-logo', label: 'SoundCloud', category: 'musica' },
  { value: 'ph:soundcloud-logo-fill', label: 'SoundCloud (relleno)', category: 'musica' },
  { value: 'ph:apple-podcasts-logo', label: 'Apple Podcasts', category: 'musica' },
  { value: 'ph:apple-podcasts-logo-fill', label: 'Apple Podcasts (relleno)', category: 'musica' },
  
  // Social Alternativo
  { value: 'ph:reddit-logo', label: 'Reddit', category: 'social' },
  { value: 'ph:reddit-logo-fill', label: 'Reddit (relleno)', category: 'social' },
  { value: 'ph:mastodon-logo', label: 'Mastodon', category: 'social' },
  { value: 'ph:mastodon-logo-fill', label: 'Mastodon (relleno)', category: 'social' },
  { value: 'ph:threads-logo', label: 'Threads', category: 'social' },
  { value: 'ph:threads-logo-fill', label: 'Threads (relleno)', category: 'social' },
  
  // E-commerce / Negocios
  { value: 'ph:amazon-logo', label: 'Amazon', category: 'ecommerce' },
  { value: 'ph:amazon-logo-fill', label: 'Amazon (relleno)', category: 'ecommerce' },
  { value: 'ph:paypal-logo', label: 'PayPal', category: 'ecommerce' },
  { value: 'ph:paypal-logo-fill', label: 'PayPal (relleno)', category: 'ecommerce' },
  { value: 'ph:stripe-logo', label: 'Stripe', category: 'ecommerce' },
  { value: 'ph:stripe-logo-fill', label: 'Stripe (relleno)', category: 'ecommerce' },
  
  // Otros / Utilidades
  { value: 'ph:google-logo', label: 'Google', category: 'otros' },
  { value: 'ph:google-logo-fill', label: 'Google (relleno)', category: 'otros' },
  { value: 'ph:google-play-logo', label: 'Google Play', category: 'otros' },
  { value: 'ph:google-play-logo-fill', label: 'Google Play (relleno)', category: 'otros' },
  { value: 'ph:app-store-logo', label: 'App Store', category: 'otros' },
  { value: 'ph:app-store-logo-fill', label: 'App Store (relleno)', category: 'otros' },
  { value: 'ph:apple-logo', label: 'Apple', category: 'otros' },
  { value: 'ph:apple-logo-fill', label: 'Apple (relleno)', category: 'otros' },
  { value: 'ph:android-logo', label: 'Android', category: 'otros' },
  { value: 'ph:android-logo-fill', label: 'Android (relleno)', category: 'otros' },
  { value: 'ph:globe', label: 'Sitio Web', category: 'otros' },
  { value: 'ph:globe-fill', label: 'Sitio Web (relleno)', category: 'otros' },
  { value: 'ph:envelope', label: 'Email', category: 'otros' },
  { value: 'ph:envelope-fill', label: 'Email (relleno)', category: 'otros' },
  { value: 'ph:phone', label: 'Teléfono', category: 'otros' },
  { value: 'ph:phone-fill', label: 'Teléfono (relleno)', category: 'otros' },
  { value: 'ph:map-pin', label: 'Ubicación', category: 'otros' },
  { value: 'ph:map-pin-fill', label: 'Ubicación (relleno)', category: 'otros' },
  { value: 'ph:link', label: 'Enlace', category: 'otros' },
  { value: 'ph:link-fill', label: 'Enlace (relleno)', category: 'otros' },
  { value: 'ph:share-network', label: 'Compartir', category: 'otros' },
  { value: 'ph:share-network-fill', label: 'Compartir (relleno)', category: 'otros' },
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
              <PhosphorIconPreview iconName={selectedIcon.value} size={20} />
              <span>{selectedIcon.label}</span>
              <span style={{ fontSize: '11px', color: '#718096', fontFamily: 'monospace' }}>
                {selectedIcon.value}
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
                  <div style={{ width: '28px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <PhosphorIconPreview iconName={icon.value} size={22} />
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontWeight: '500' }}>{icon.label}</div>
                    <div style={{ fontSize: '11px', color: '#718096', fontFamily: 'monospace' }}>{icon.value}</div>
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


