import React from 'react';
import { wrapFieldsWithMeta } from 'tinacms';

// Componente de campo de color personalizado
export const ColorPickerField = wrapFieldsWithMeta(({ input }: any) => {
  const [displayValue, setDisplayValue] = React.useState(input.value || '#000000');

  React.useEffect(() => {
    setDisplayValue(input.value || '#000000');
  }, [input.value]);

  const handleColorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newColor = e.target.value;
    setDisplayValue(newColor);
    input.onChange(newColor);
  };

  const handleTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setDisplayValue(newValue);
    // Solo actualiza el valor real si es un color válido
    if (/^#[0-9A-Fa-f]{6}$/.test(newValue)) {
      input.onChange(newValue);
    }
  };

  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
      {/* Color Picker */}
      <input
        type="color"
        value={displayValue.startsWith('#') ? displayValue : '#000000'}
        onChange={handleColorChange}
        style={{
          width: '48px',
          height: '48px',
          padding: '0',
          border: '2px solid #e2e8f0',
          borderRadius: '8px',
          cursor: 'pointer',
          backgroundColor: 'transparent',
        }}
      />
      
      {/* Text Input for HEX value */}
      <input
        type="text"
        value={displayValue}
        onChange={handleTextChange}
        onBlur={() => {
          // Validar al perder el foco
          if (!/^#[0-9A-Fa-f]{6}$/.test(displayValue)) {
            setDisplayValue(input.value || '#000000');
          }
        }}
        placeholder="#000000"
        style={{
          flex: 1,
          padding: '10px 12px',
          border: '1px solid #e2e8f0',
          borderRadius: '6px',
          fontSize: '14px',
          fontFamily: 'monospace',
          backgroundColor: '#f7fafc',
        }}
      />
      
      {/* Color Preview Box */}
      <div
        style={{
          width: '48px',
          height: '48px',
          backgroundColor: displayValue.startsWith('#') ? displayValue : '#000000',
          borderRadius: '8px',
          border: '2px solid #e2e8f0',
          boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.1)',
        }}
      />
    </div>
  );
});

// Configuración del campo de color para usar en el schema
export const colorField = (name: string, label: string, description?: string) => ({
  type: 'string' as const,
  name,
  label,
  description,
  ui: {
    component: ColorPickerField,
  },
});
