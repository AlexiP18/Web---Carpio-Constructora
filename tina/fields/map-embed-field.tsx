import React from 'react';
import { wrapFieldsWithMeta } from 'tinacms';

// Componente para extraer y mostrar preview del mapa de Google
export const MapEmbedField = wrapFieldsWithMeta(({ input }: any) => {
  const [embedCode, setEmbedCode] = React.useState(input.value || '');
  const [error, setError] = React.useState<string | null>(null);

  // Extraer el src del iframe
  const extractIframeSrc = (code: string): string | null => {
    if (!code) return null;
    
    // Si ya es una URL directa
    if (code.startsWith('https://www.google.com/maps/embed')) {
      return code;
    }
    
    // Extraer src del iframe
    const srcMatch = code.match(/src=["']([^"']+)["']/);
    if (srcMatch && srcMatch[1]) {
      return srcMatch[1];
    }
    
    return null;
  };

  const iframeSrc = extractIframeSrc(embedCode);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;
    setEmbedCode(value);
    input.onChange(value);
    
    // Validar el código
    if (value && !extractIframeSrc(value)) {
      setError('El código no parece ser un embed válido de Google Maps');
    } else {
      setError(null);
    }
  };

  const textareaStyle: React.CSSProperties = {
    width: '100%',
    minHeight: '100px',
    padding: '12px',
    border: error ? '1px solid #e53e3e' : '1px solid #e2e8f0',
    borderRadius: '6px',
    fontSize: '13px',
    fontFamily: 'monospace',
    resize: 'vertical',
    outline: 'none',
    backgroundColor: '#f7fafc',
  };

  const previewContainerStyle: React.CSSProperties = {
    marginTop: '12px',
    borderRadius: '8px',
    overflow: 'hidden',
    border: '1px solid #e2e8f0',
    backgroundColor: '#f0f0f0',
  };

  const previewHeaderStyle: React.CSSProperties = {
    padding: '8px 12px',
    backgroundColor: '#4a5568',
    color: 'white',
    fontSize: '12px',
    fontWeight: '500',
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
  };

  const iframeContainerStyle: React.CSSProperties = {
    position: 'relative',
    width: '100%',
    height: '250px',
    backgroundColor: '#e2e8f0',
  };

  const placeholderStyle: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '200px',
    backgroundColor: '#f7fafc',
    border: '2px dashed #cbd5e0',
    borderRadius: '8px',
    marginTop: '12px',
    color: '#718096',
    textAlign: 'center',
    padding: '20px',
  };

  const helpTextStyle: React.CSSProperties = {
    marginTop: '8px',
    fontSize: '12px',
    color: '#718096',
    lineHeight: '1.5',
  };

  return (
    <div>
      {/* Campo de texto para el código embed */}
      <textarea
        value={embedCode}
        onChange={handleChange}
        placeholder='Pega aquí el código embed de Google Maps (ej: <iframe src="https://www.google.com/maps/embed?..." ...></iframe>)'
        style={textareaStyle}
      />
      
      {/* Mensaje de error */}
      {error && (
        <div style={{ color: '#e53e3e', fontSize: '12px', marginTop: '4px' }}>
          ⚠️ {error}
        </div>
      )}

      {/* Texto de ayuda */}
      <div style={helpTextStyle}>
        💡 <strong>Cómo obtener el código:</strong> En Google Maps, busca la ubicación → clic en "Compartir" → "Incorporar un mapa" → copia el código HTML.
      </div>

      {/* Preview del mapa */}
      {iframeSrc ? (
        <div style={previewContainerStyle}>
          <div style={previewHeaderStyle}>
            <span>📍</span>
            <span>Vista previa del mapa</span>
          </div>
          <div style={iframeContainerStyle}>
            <iframe
              src={iframeSrc}
              width="100%"
              height="250"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Vista previa de Google Maps"
            />
          </div>
        </div>
      ) : embedCode ? (
        <div style={placeholderStyle}>
          <span style={{ fontSize: '32px', marginBottom: '8px' }}>🗺️</span>
          <span>No se pudo cargar el mapa</span>
          <span style={{ fontSize: '12px', marginTop: '4px' }}>
            Verifica que el código embed sea válido
          </span>
        </div>
      ) : (
        <div style={placeholderStyle}>
          <span style={{ fontSize: '32px', marginBottom: '8px' }}>📍</span>
          <span>Pega el código embed para ver el mapa</span>
          <span style={{ fontSize: '12px', marginTop: '4px' }}>
            El mapa aparecerá aquí automáticamente
          </span>
        </div>
      )}
    </div>
  );
});
