import React from 'react';
import { defineConfig, wrapFieldsWithMeta } from 'tinacms';

// ============================================
// Componente: Vista previa de imagen individual
// ============================================
export const ImagePreviewField = wrapFieldsWithMeta(({ input }: any) => {
  const { value, onChange } = input;

  const getPreviewUrl = (url: string) => {
    if (url && url.includes('cloudinary.com') && url.includes('/upload/')) {
      return url.replace('/upload/', '/upload/w_400,h_250,c_fill,q_auto/');
    }
    return url;
  };

  return (
    <div style={{ marginBottom: '8px' }}>
      {value && (
        <div style={{
          marginBottom: '12px',
          borderRadius: '8px',
          overflow: 'hidden',
          border: '2px solid #e5e7eb',
          backgroundColor: '#f3f4f6',
          maxWidth: '400px'
        }}>
          <img
            src={getPreviewUrl(value)}
            alt="Previsualización"
            style={{ width: '100%', height: 'auto', display: 'block' }}
            onError={(e) => {
              (e.target as HTMLImageElement).style.display = 'none';
            }}
          />
        </div>
      )}
      <input
        type="text"
        value={value || ''}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Pega la URL de Cloudinary aquí..."
        style={{
          width: '100%',
          padding: '8px 12px',
          border: '1px solid #d1d5db',
          borderRadius: '6px',
          fontSize: '14px',
          boxSizing: 'border-box'
        }}
      />
      {value && (
        <button
          type="button"
          onClick={() => onChange('')}
          style={{
            marginTop: '8px',
            padding: '6px 12px',
            backgroundColor: '#fee2e2',
            color: '#dc2626',
            border: '1px solid #fecaca',
            borderRadius: '6px',
            cursor: 'pointer',
            fontSize: '13px'
          }}
        >
          Quitar imagen
        </button>
      )}
    </div>
  );
});

// ============================================
// Componente: Galería de imágenes con previews
// ============================================
export const ImageGalleryField = wrapFieldsWithMeta(({ input }: any) => {
  const { value = [], onChange } = input;
  const [newUrl, setNewUrl] = React.useState('');

  const handleAddImage = () => {
    if (newUrl.trim()) {
      onChange([...value, newUrl.trim()]);
      setNewUrl('');
    }
  };

  const handleRemoveImage = (index: number) => {
    onChange(value.filter((_: string, i: number) => i !== index));
  };

  const getThumbnailUrl = (url: string) => {
    if (url.includes('cloudinary.com') && url.includes('/upload/')) {
      return url.replace('/upload/', '/upload/w_150,h_150,c_fill,q_auto/');
    }
    return url;
  };

  return (
    <div>
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(100px, 1fr))',
        gap: '10px',
        marginBottom: '12px'
      }}>
        {value.map((url: string, index: number) => (
          <div key={index} style={{
            position: 'relative',
            aspectRatio: '1',
            borderRadius: '6px',
            overflow: 'hidden',
            border: '2px solid #e5e7eb',
            backgroundColor: '#f3f4f6'
          }}>
            <img
              src={getThumbnailUrl(url)}
              alt={`Imagen ${index + 1}`}
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              onError={(e) => {
                (e.target as HTMLImageElement).src = 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100"><rect fill="%23f3f4f6" width="100" height="100"/><text x="50%" y="50%" text-anchor="middle" dy=".3em" fill="%239ca3af" font-size="10">Error</text></svg>';
              }}
            />
            <button
              type="button"
              onClick={() => handleRemoveImage(index)}
              style={{
                position: 'absolute',
                top: '2px',
                right: '2px',
                width: '20px',
                height: '20px',
                borderRadius: '50%',
                backgroundColor: 'rgba(239, 68, 68, 0.9)',
                color: 'white',
                border: 'none',
                cursor: 'pointer',
                fontSize: '12px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              ×
            </button>
            <span style={{
              position: 'absolute',
              bottom: '2px',
              left: '2px',
              backgroundColor: 'rgba(0,0,0,0.6)',
              color: 'white',
              padding: '1px 4px',
              borderRadius: '3px',
              fontSize: '10px'
            }}>
              {index + 1}
            </span>
          </div>
        ))}
      </div>

      <div style={{ display: 'flex', gap: '8px' }}>
        <input
          type="text"
          value={newUrl}
          onChange={(e) => setNewUrl(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddImage())}
          placeholder="Pega URL de Cloudinary..."
          style={{
            flex: 1,
            padding: '8px 12px',
            border: '1px solid #d1d5db',
            borderRadius: '6px',
            fontSize: '14px'
          }}
        />
        <button
          type="button"
          onClick={handleAddImage}
          disabled={!newUrl.trim()}
          style={{
            padding: '8px 16px',
            backgroundColor: newUrl.trim() ? '#2563eb' : '#9ca3af',
            color: 'white',
            border: 'none',
            borderRadius: '6px',
            cursor: newUrl.trim() ? 'pointer' : 'not-allowed',
            fontSize: '14px'
          }}
        >
          +
        </button>
      </div>

      <p style={{ marginTop: '6px', fontSize: '11px', color: '#6b7280' }}>
        {value.length} {value.length === 1 ? 'imagen' : 'imágenes'}
      </p>
    </div>
  );
});
