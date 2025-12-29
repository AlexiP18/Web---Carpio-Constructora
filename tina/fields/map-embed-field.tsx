import React from 'react';
import { wrapFieldsWithMeta } from 'tinacms';

// Función para extraer coordenadas del código embed de Google Maps
function extractCoordinates(embedCode: string): { lat: number | null; lng: number | null } {
  if (!embedCode) return { lat: null, lng: null };

  // Método 1: Extraer de formato !2d (longitud) y !3d (latitud) en el parámetro pb=
  // Ejemplo: !2d-78.4678!3d-1.2345
  const pbMatch = embedCode.match(/!2d(-?[\d.]+)!3d(-?[\d.]+)/);
  if (pbMatch) {
    return {
      lng: parseFloat(pbMatch[1]),
      lat: parseFloat(pbMatch[2])
    };
  }

  // Método 2: Extraer de formato q=lat,lng o center=lat,lng
  const qMatch = embedCode.match(/[?&](?:q|center)=(-?[\d.]+),(-?[\d.]+)/);
  if (qMatch) {
    return {
      lat: parseFloat(qMatch[1]),
      lng: parseFloat(qMatch[2])
    };
  }

  // Método 3: Buscar coordenadas en formato @lat,lng
  const atMatch = embedCode.match(/@(-?[\d.]+),(-?[\d.]+)/);
  if (atMatch) {
    return {
      lat: parseFloat(atMatch[1]),
      lng: parseFloat(atMatch[2])
    };
  }

  // Método 4: Extraer de ll=lat,lng
  const llMatch = embedCode.match(/[?&]ll=(-?[\d.]+),(-?[\d.]+)/);
  if (llMatch) {
    return {
      lat: parseFloat(llMatch[1]),
      lng: parseFloat(llMatch[2])
    };
  }

  return { lat: null, lng: null };
}

// Componente para extraer y mostrar preview del mapa de Google
export const MapEmbedField = wrapFieldsWithMeta(({ input, form }: any) => {
  const [embedCode, setEmbedCode] = React.useState(input.value || '');
  const [error, setError] = React.useState<string | null>(null);
  const [coordinates, setCoordinates] = React.useState<{ lat: number | null; lng: number | null }>({ lat: null, lng: null });

  // Extraer el src del iframe
  const extractIframeSrc = (code: string): string | null => {
    if (!code) return null;
    
    // Si ya es una URL directa
    if (code.startsWith('https://www.google.com/maps/embed') || code.startsWith('https://maps.google.com')) {
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

  // Actualizar coordenadas cuando cambia el embed
  React.useEffect(() => {
    const coords = extractCoordinates(embedCode);
    setCoordinates(coords);
    
    // Actualizar los campos lat y lng en el formulario si existen
    if (form && form.change) {
      const fieldPath = input.name.replace('.mapEmbed', '');
      if (coords.lat !== null) {
        form.change(`${fieldPath}.lat`, coords.lat);
      }
      if (coords.lng !== null) {
        form.change(`${fieldPath}.lng`, coords.lng);
      }
    }
  }, [embedCode, form, input.name]);

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
    justifyContent: 'space-between',
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

  const coordsBoxStyle: React.CSSProperties = {
    display: 'flex',
    gap: '16px',
    padding: '10px 12px',
    backgroundColor: '#f7fafc',
    borderTop: '1px solid #e2e8f0',
    fontSize: '12px',
  };

  const coordItemStyle: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
  };

  const coordLabelStyle: React.CSSProperties = {
    color: '#718096',
    fontWeight: '500',
  };

  const coordValueStyle: React.CSSProperties = {
    fontFamily: 'monospace',
    backgroundColor: '#edf2f7',
    padding: '2px 6px',
    borderRadius: '4px',
    color: '#2d3748',
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
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <span>📍</span>
              <span>Vista previa del mapa</span>
            </div>
            {(coordinates.lat !== null || coordinates.lng !== null) && (
              <div style={{ fontSize: '11px', opacity: 0.9 }}>
                Coordenadas detectadas ✓
              </div>
            )}
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
          
          {/* Coordenadas extraídas */}
          <div style={coordsBoxStyle}>
            <div style={coordItemStyle}>
              <span style={coordLabelStyle}>📍 Latitud:</span>
              <span style={coordValueStyle}>
                {coordinates.lat !== null ? coordinates.lat.toFixed(6) : 'No detectada'}
              </span>
            </div>
            <div style={coordItemStyle}>
              <span style={coordLabelStyle}>📍 Longitud:</span>
              <span style={coordValueStyle}>
                {coordinates.lng !== null ? coordinates.lng.toFixed(6) : 'No detectada'}
              </span>
            </div>
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
            Las coordenadas se extraerán automáticamente
          </span>
        </div>
      )}
    </div>
  );
});
