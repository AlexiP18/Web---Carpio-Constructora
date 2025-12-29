import React from 'react';
import { wrapFieldsWithMeta } from 'tinacms';

// ============================================
// CAMPO DE TELÉFONO CON MÁSCARA (+593)
// ============================================
export const PhoneField = wrapFieldsWithMeta(({ input }: any) => {
  // Extraer solo los dígitos del valor actual
  const extractDigits = (value: string) => {
    if (!value) return '';
    // Remover cualquier prefijo y obtener solo dígitos
    const cleaned = value.replace(/[^\d]/g, '');
    // Si empieza con 593, removerlo
    const withoutCountry = cleaned.startsWith('593') ? cleaned.slice(3) : cleaned;
    return withoutCountry.slice(0, 10); // Máximo 10 dígitos
  };

  const [digits, setDigits] = React.useState(() => extractDigits(input.value || ''));

  // Sincronizar cuando cambia el valor externo
  React.useEffect(() => {
    const newDigits = extractDigits(input.value || '');
    if (newDigits !== digits) {
      setDigits(newDigits);
    }
  }, [input.value]);

  // Formatear el número para mostrar (XX XXX XXXX)
  const formatDisplay = (value: string) => {
    if (!value) return '';
    const cleaned = value.replace(/\D/g, '').slice(0, 10);
    if (cleaned.length <= 2) return cleaned;
    if (cleaned.length <= 5) return `${cleaned.slice(0, 2)} ${cleaned.slice(2)}`;
    return `${cleaned.slice(0, 2)} ${cleaned.slice(2, 5)} ${cleaned.slice(5)}`;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const rawValue = e.target.value;
    // Solo permitir dígitos
    const onlyDigits = rawValue.replace(/\D/g, '').slice(0, 10);
    setDigits(onlyDigits);
    // Guardar con el prefijo +593
    input.onChange(onlyDigits ? `+593 ${formatDisplay(onlyDigits)}` : '');
  };

  const isValid = digits.length >= 9;
  const isEmpty = digits.length === 0;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        {/* Prefijo */}
        <div
          style={{
            padding: '10px 12px',
            backgroundColor: '#edf2f7',
            border: '1px solid #e2e8f0',
            borderRadius: '6px 0 0 6px',
            fontSize: '14px',
            fontWeight: '500',
            color: '#4a5568',
            whiteSpace: 'nowrap',
          }}
        >
          🇪🇨 +593
        </div>
        
        {/* Input de teléfono */}
        <input
          type="text"
          value={formatDisplay(digits)}
          onChange={handleChange}
          placeholder="99 999 9999"
          style={{
            flex: 1,
            padding: '10px 12px',
            border: `1px solid ${!isEmpty && !isValid ? '#fc8181' : '#e2e8f0'}`,
            borderRadius: '0 6px 6px 0',
            fontSize: '14px',
            fontFamily: 'monospace',
            marginLeft: '-1px',
          }}
        />
        
        {/* Indicador de dígitos */}
        <span
          style={{
            fontSize: '12px',
            color: isValid ? '#38a169' : '#a0aec0',
            minWidth: '50px',
          }}
        >
          {digits.length}/10
        </span>
      </div>
      
      {!isEmpty && !isValid && (
        <span style={{ fontSize: '12px', color: '#e53e3e' }}>
          El número debe tener al menos 9 dígitos
        </span>
      )}
    </div>
  );
});

// ============================================
// CAMPO DE EMAIL CON VALIDACIÓN
// ============================================
export const EmailField = wrapFieldsWithMeta(({ input }: any) => {
  const [value, setValue] = React.useState(input.value || '');
  const [touched, setTouched] = React.useState(false);

  React.useEffect(() => {
    if (input.value !== value) {
      setValue(input.value || '');
    }
  }, [input.value]);

  const isValidEmail = (email: string) => {
    if (!email) return true; // Vacío es válido (no requerido)
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setValue(newValue);
    input.onChange(newValue);
  };

  const isValid = isValidEmail(value);
  const showError = touched && !isValid && value.length > 0;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        {/* Icono de email */}
        <div
          style={{
            padding: '10px 12px',
            backgroundColor: '#edf2f7',
            border: '1px solid #e2e8f0',
            borderRadius: '6px 0 0 6px',
            fontSize: '14px',
          }}
        >
          ✉️
        </div>
        
        {/* Input de email */}
        <input
          type="email"
          value={value}
          onChange={handleChange}
          onBlur={() => setTouched(true)}
          placeholder="ejemplo@empresa.com"
          style={{
            flex: 1,
            padding: '10px 12px',
            border: `1px solid ${showError ? '#fc8181' : '#e2e8f0'}`,
            borderRadius: '0 6px 6px 0',
            fontSize: '14px',
            marginLeft: '-1px',
          }}
        />
        
        {/* Indicador de validez */}
        {value && (
          <span style={{ fontSize: '16px', color: isValid ? '#38a169' : '#e53e3e' }}>
            {isValid ? '✓' : '✗'}
          </span>
        )}
      </div>
      
      {showError && (
        <span style={{ fontSize: '12px', color: '#e53e3e' }}>
          Por favor ingresa un email válido
        </span>
      )}
    </div>
  );
});

// ============================================
// CAMPO DE HORARIOS CON SELECTORES
// ============================================
const DAYS_OPTIONS = [
  { value: 'lunes', label: 'Lunes' },
  { value: 'martes', label: 'Martes' },
  { value: 'miercoles', label: 'Miércoles' },
  { value: 'jueves', label: 'Jueves' },
  { value: 'viernes', label: 'Viernes' },
  { value: 'sabado', label: 'Sábado' },
  { value: 'domingo', label: 'Domingo' },
];

// Mapeo para normalizar días con/sin tildes
const normalizeDay = (day: string): string => {
  if (!day) return 'lunes';
  const normalized = day.toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, ''); // Remover acentos
  const found = DAYS_OPTIONS.find(d => 
    d.value === normalized || 
    d.label.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '') === normalized
  );
  return found?.value || 'lunes';
};

const HOURS_OPTIONS = Array.from({ length: 24 }, (_, i) => {
  const hour = i.toString().padStart(2, '0');
  return { value: `${hour}:00`, label: `${hour}:00` };
});

// Agregar medias horas
const FULL_HOURS_OPTIONS = HOURS_OPTIONS.flatMap((h) => [
  h,
  { value: h.value.replace(':00', ':30'), label: h.label.replace(':00', ':30') },
]);

export const BusinessHoursField = wrapFieldsWithMeta(({ input }: any) => {
  // Parsear el valor existente o usar defaults
  const parseHours = (value: string) => {
    if (!value) {
      return {
        dayFrom: 'lunes',
        dayTo: 'viernes',
        hourFrom: '08:00',
        hourTo: '17:00',
      };
    }
    
    // Intentar parsear formato "Lunes a Viernes: 08:00 - 17:00"
    const match = value.match(/(\S+)\s*a\s*(\S+):\s*(\d{2}:\d{2})\s*-\s*(\d{2}:\d{2})/i);
    if (match) {
      return {
        dayFrom: normalizeDay(match[1]),
        dayTo: normalizeDay(match[2]),
        hourFrom: match[3],
        hourTo: match[4],
      };
    }
    
    return {
      dayFrom: 'lunes',
      dayTo: 'viernes',
      hourFrom: '08:00',
      hourTo: '17:00',
    };
  };

  const [schedule, setSchedule] = React.useState(() => parseHours(input.value || ''));

  // Solo actualizar si el valor externo cambia significativamente
  React.useEffect(() => {
    const parsed = parseHours(input.value || '');
    if (
      parsed.dayFrom !== schedule.dayFrom ||
      parsed.dayTo !== schedule.dayTo ||
      parsed.hourFrom !== schedule.hourFrom ||
      parsed.hourTo !== schedule.hourTo
    ) {
      setSchedule(parsed);
    }
  }, [input.value]);

  const formatOutput = (sched: typeof schedule) => {
    const dayFromLabel = DAYS_OPTIONS.find(d => d.value === sched.dayFrom)?.label || 'Lunes';
    const dayToLabel = DAYS_OPTIONS.find(d => d.value === sched.dayTo)?.label || 'Viernes';
    return `${dayFromLabel} a ${dayToLabel}: ${sched.hourFrom} - ${sched.hourTo}`;
  };

  const handleChange = (field: string, value: string) => {
    const newSchedule = { ...schedule, [field]: value };
    setSchedule(newSchedule);
    input.onChange(formatOutput(newSchedule));
  };

  const selectStyle: React.CSSProperties = {
    padding: '8px 12px',
    border: '1px solid #e2e8f0',
    borderRadius: '6px',
    fontSize: '14px',
    backgroundColor: 'white',
    cursor: 'pointer',
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
      {/* Días */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
        <span style={{ fontSize: '14px', color: '#4a5568', minWidth: '50px' }}>📅 Días:</span>
        <select
          value={schedule.dayFrom}
          onChange={(e) => handleChange('dayFrom', e.target.value)}
          style={selectStyle}
        >
          {DAYS_OPTIONS.map((day) => (
            <option key={day.value} value={day.value}>
              {day.label}
            </option>
          ))}
        </select>
        <span style={{ fontSize: '14px', color: '#718096' }}>a</span>
        <select
          value={schedule.dayTo}
          onChange={(e) => handleChange('dayTo', e.target.value)}
          style={selectStyle}
        >
          {DAYS_OPTIONS.map((day) => (
            <option key={day.value} value={day.value}>
              {day.label}
            </option>
          ))}
        </select>
      </div>

      {/* Horas */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
        <span style={{ fontSize: '14px', color: '#4a5568', minWidth: '50px' }}>🕐 Hora:</span>
        <select
          value={schedule.hourFrom}
          onChange={(e) => handleChange('hourFrom', e.target.value)}
          style={selectStyle}
        >
          {FULL_HOURS_OPTIONS.map((hour) => (
            <option key={hour.value} value={hour.value}>
              {hour.label}
            </option>
          ))}
        </select>
        <span style={{ fontSize: '14px', color: '#718096' }}>a</span>
        <select
          value={schedule.hourTo}
          onChange={(e) => handleChange('hourTo', e.target.value)}
          style={selectStyle}
        >
          {FULL_HOURS_OPTIONS.map((hour) => (
            <option key={hour.value} value={hour.value}>
              {hour.label}
            </option>
          ))}
        </select>
      </div>

      {/* Preview */}
      <div
        style={{
          padding: '10px 14px',
          backgroundColor: '#f7fafc',
          border: '1px solid #e2e8f0',
          borderRadius: '6px',
          fontSize: '13px',
          color: '#4a5568',
        }}
      >
        <strong>Vista previa:</strong> {formatOutput(schedule)}
      </div>
    </div>
  );
});
