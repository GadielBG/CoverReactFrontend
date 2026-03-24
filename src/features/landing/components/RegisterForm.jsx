import React, { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useDropzone } from 'react-dropzone';

// ─── Shared styles ──────────────────────────────────────────────────────────
const inputStyle = {
  width: '100%',
  background: 'rgba(255,255,255,0.04)',
  border: '1px solid rgba(255,255,255,0.1)',
  borderRadius: 12,
  padding: '12px 16px',
  color: '#FFFFFF',
  fontSize: 14,
  fontFamily: 'DM Sans, sans-serif',
  outline: 'none',
  transition: 'border-color 0.2s',
};

const labelStyle = {
  display: 'block',
  fontSize: 13,
  fontWeight: 600,
  color: '#B8BDD0',
  marginBottom: 6,
  fontFamily: 'DM Sans, sans-serif',
};

const selectStyle = { ...inputStyle, appearance: 'none', cursor: 'pointer' };

// ─── Field components ────────────────────────────────────────────────────────
const Field = ({ label, children }) => (
  <div>
    <label style={labelStyle}>{label}</label>
    {children}
  </div>
);

const Input = ({ ...props }) => (
  <input
    style={inputStyle}
    onFocus={(e) => (e.target.style.borderColor = 'rgba(211,255,0,0.5)')}
    onBlur={(e) => (e.target.style.borderColor = 'rgba(255,255,255,0.1)')}
    {...props}
  />
);

const Select = ({ children, ...props }) => (
  <div className="relative">
    <select
      style={selectStyle}
      onFocus={(e) => (e.target.style.borderColor = 'rgba(211,255,0,0.5)')}
      onBlur={(e) => (e.target.style.borderColor = 'rgba(255,255,255,0.1)')}
      {...props}
    >
      {children}
    </select>
    <span className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none" style={{ color: '#6B7084' }}>▾</span>
  </div>
);

const Textarea = ({ ...props }) => (
  <textarea
    style={{ ...inputStyle, resize: 'vertical', minHeight: 90 }}
    onFocus={(e) => (e.target.style.borderColor = 'rgba(211,255,0,0.5)')}
    onBlur={(e) => (e.target.style.borderColor = 'rgba(255,255,255,0.1)')}
    {...props}
  />
);

// ─── Step 1: Info del local ──────────────────────────────────────────────────
const Step1 = ({ data, onChange }) => {
  const onDrop = useCallback((acceptedFiles) => {
    onChange('fotos', [...(data.fotos || []), ...acceptedFiles].slice(0, 5));
  }, [data.fotos, onChange]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { 'image/jpeg': [], 'image/png': [], 'image/webp': [] },
    maxSize: 5 * 1024 * 1024,
    maxFiles: 5,
  });

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
      <div className="sm:col-span-2">
        <Field label="Nombre del local *">
          <Input
            type="text"
            placeholder="Ej: Forum Club"
            value={data.nombre}
            onChange={(e) => onChange('nombre', e.target.value)}
          />
        </Field>
      </div>

      <Field label="Tipo de local *">
        <Select value={data.tipo} onChange={(e) => onChange('tipo', e.target.value)}>
          <option value="">Seleccionar...</option>
          {['Bar', 'Discoteca', 'Pub', 'Lounge', 'Karaoke', 'Restaurante-Bar'].map((t) => (
            <option key={t} value={t}>{t}</option>
          ))}
        </Select>
      </Field>

      <Field label="Teléfono *">
        <Input
          type="tel"
          placeholder="+591 2 244 1234"
          value={data.telefono}
          onChange={(e) => onChange('telefono', e.target.value)}
        />
      </Field>

      <div className="sm:col-span-2">
        <Field label="Email del negocio *">
          <Input
            type="email"
            placeholder="contacto@tulocal.com"
            value={data.email}
            onChange={(e) => onChange('email', e.target.value)}
          />
        </Field>
      </div>

      <div className="sm:col-span-2">
        <Field label="Descripción">
          <Textarea
            placeholder="Describe tu local: ambiente, música, horarios especiales..."
            value={data.descripcion}
            onChange={(e) => onChange('descripcion', e.target.value)}
          />
        </Field>
      </div>

      <div className="sm:col-span-2">
        <label style={labelStyle}>Fotos del local (máx. 5)</label>
        <div
          {...getRootProps()}
          className="rounded-[12px] p-8 text-center cursor-pointer transition-all duration-200"
          style={{
            border: `2px dashed ${isDragActive ? 'rgba(211,255,0,0.6)' : 'rgba(255,255,255,0.1)'}`,
            background: isDragActive ? 'rgba(211,255,0,0.05)' : 'rgba(255,255,255,0.02)',
          }}
        >
          <input {...getInputProps()} />
          <div className="text-3xl mb-2">📸</div>
          <p style={{ color: '#B8BDD0', fontSize: 14, fontFamily: 'DM Sans, sans-serif' }}>
            {isDragActive ? 'Suelta las fotos aquí...' : 'Arrastra fotos o haz clic para seleccionar'}
          </p>
          <p style={{ color: '#6B7084', fontSize: 12, marginTop: 4, fontFamily: 'DM Sans, sans-serif' }}>
            JPG, PNG, WEBP · Máx. 5MB por foto · Hasta 5 fotos
          </p>
        </div>

        {data.fotos?.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-3">
            {data.fotos.map((file, i) => (
              <div
                key={i}
                className="flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs"
                style={{ background: 'rgba(211,255,0,0.08)', border: '1px solid rgba(211,255,0,0.2)', color: '#D3FF00', fontFamily: 'DM Sans, sans-serif' }}
              >
                <span>🖼️</span>
                <span className="max-w-[120px] truncate">{file.name}</span>
                <button
                  onClick={() => onChange('fotos', data.fotos.filter((_, j) => j !== i))}
                  className="hover:text-white ml-1"
                >
                  ✕
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

// ─── Step 2: Ubicación ───────────────────────────────────────────────────────
const Step2 = ({ data, onChange }) => (
  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
    <div className="sm:col-span-2">
      <Field label="Dirección *">
        <Input
          type="text"
          placeholder="Av. Arce 2344"
          value={data.direccion}
          onChange={(e) => onChange('direccion', e.target.value)}
        />
      </Field>
    </div>

    <Field label="Zona / Barrio *">
      <Input
        type="text"
        placeholder="Sopocachi"
        value={data.zona}
        onChange={(e) => onChange('zona', e.target.value)}
      />
    </Field>

    <Field label="Ciudad *">
      <Select value={data.ciudad} onChange={(e) => onChange('ciudad', e.target.value)}>
        <option value="">Seleccionar...</option>
        {['La Paz', 'Cochabamba', 'Santa Cruz', 'Sucre', 'Oruro', 'Tarija'].map((c) => (
          <option key={c} value={c}>{c}</option>
        ))}
      </Select>
    </Field>

    <div className="sm:col-span-2">
      <Field label="Referencia">
        <Input
          type="text"
          placeholder="A 1 cuadra del cine Monje Campero"
          value={data.referencia}
          onChange={(e) => onChange('referencia', e.target.value)}
        />
      </Field>
    </div>

    {/* Map placeholder */}
    <div className="sm:col-span-2">
      <label style={labelStyle}>Ubicación en mapa</label>
      <div
        className="rounded-[12px] flex items-center justify-center"
        style={{
          background: 'rgba(255,255,255,0.02)',
          border: '1px solid rgba(255,255,255,0.08)',
          height: 200,
        }}
      >
        <div className="text-center">
          <div className="text-4xl mb-2">🗺️</div>
          <p style={{ color: '#6B7084', fontSize: 13, fontFamily: 'DM Sans, sans-serif' }}>
            Integración con Google Maps disponible próximamente
          </p>
        </div>
      </div>
    </div>
  </div>
);

// ─── Step 3: Mesas ───────────────────────────────────────────────────────────
const MesaCounter = ({ emoji, title, subtitle, value, onChange }) => (
  <div
    className="rounded-[16px] p-5 flex items-center justify-between"
    style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)' }}
  >
    <div className="flex items-center gap-3">
      <span className="text-2xl">{emoji}</span>
      <div>
        <div style={{ color: '#FFFFFF', fontSize: 14, fontWeight: 600, fontFamily: 'DM Sans, sans-serif' }}>{title}</div>
        <div style={{ color: '#6B7084', fontSize: 12, fontFamily: 'DM Sans, sans-serif' }}>{subtitle}</div>
      </div>
    </div>
    <div className="flex items-center gap-3">
      <button
        onClick={() => onChange(Math.max(0, value - 1))}
        className="w-8 h-8 rounded-full flex items-center justify-center text-lg font-bold transition-colors"
        style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)', color: '#B8BDD0' }}
      >
        −
      </button>
      <span style={{ color: '#FFFFFF', fontSize: 16, fontWeight: 700, fontFamily: 'Outfit, sans-serif', minWidth: 24, textAlign: 'center' }}>
        {value}
      </span>
      <button
        onClick={() => onChange(value + 1)}
        className="w-8 h-8 rounded-full flex items-center justify-center text-lg font-bold transition-colors"
        style={{ background: 'rgba(211,255,0,0.12)', border: '1px solid rgba(211,255,0,0.3)', color: '#D3FF00' }}
      >
        +
      </button>
    </div>
  </div>
);

const Step3 = ({ data, onChange }) => {
  const totalMesas = (data.mesasRedondas || 0) + (data.mesasRectangulares || 0) + (data.mesasVip || 0);

  return (
    <div className="space-y-5">
      <MesaCounter
        emoji="⭕"
        title="Mesa redonda"
        subtitle="2-4 personas"
        value={data.mesasRedondas || 0}
        onChange={(v) => onChange('mesasRedondas', v)}
      />
      <MesaCounter
        emoji="▭"
        title="Mesa rectangular"
        subtitle="4-8 personas"
        value={data.mesasRectangulares || 0}
        onChange={(v) => onChange('mesasRectangulares', v)}
      />
      <MesaCounter
        emoji="👑"
        title="Mesa VIP"
        subtitle="6-12 personas"
        value={data.mesasVip || 0}
        onChange={(v) => onChange('mesasVip', v)}
      />

      <div className="grid grid-cols-2 gap-4 pt-2">
        <Field label="Total de mesas">
          <Input
            type="number"
            value={totalMesas}
            readOnly
            style={{ ...inputStyle, color: '#D3FF00', cursor: 'default', opacity: 0.8 }}
          />
        </Field>
        <Field label="Capacidad total del local *">
          <Input
            type="number"
            placeholder="120"
            value={data.capacidad || ''}
            onChange={(e) => onChange('capacidad', e.target.value)}
          />
        </Field>
      </div>

      <Field label="Zonas del local (separadas por comas)">
        <Input
          type="text"
          placeholder="Terraza, Pista principal, VIP, Bar"
          value={data.zonas || ''}
          onChange={(e) => onChange('zonas', e.target.value)}
        />
      </Field>

      <Field label="Plano del local (opcional)">
        <div
          className="rounded-[12px] p-6 text-center cursor-pointer transition-all duration-200"
          style={{ border: '2px dashed rgba(255,255,255,0.08)', background: 'rgba(255,255,255,0.02)' }}
        >
          <div className="text-2xl mb-1">📐</div>
          <p style={{ color: '#6B7084', fontSize: 13, fontFamily: 'DM Sans, sans-serif' }}>
            Sube el plano de distribución de tu local
          </p>
        </div>
      </Field>
    </div>
  );
};

// ─── Step 4: Horarios ────────────────────────────────────────────────────────
const DAYS = [
  { key: 'lunes', label: 'Lun', full: 'Lunes', highlight: false, defaultOpen: true },
  { key: 'martes', label: 'Mar', full: 'Martes', highlight: false, defaultOpen: true },
  { key: 'miercoles', label: 'Mié', full: 'Miércoles', highlight: false, defaultOpen: true },
  { key: 'jueves', label: 'Jue', full: 'Jueves', highlight: false, defaultOpen: true },
  { key: 'viernes', label: 'Vie', full: 'Viernes', highlight: true, defaultOpen: true },
  { key: 'sabado', label: 'Sáb', full: 'Sábado', highlight: true, defaultOpen: true },
  { key: 'domingo', label: 'Dom', full: 'Domingo', highlight: false, defaultOpen: false },
];

const Step4 = ({ data, onChange }) => {
  const hours = data.horarios || {};

  const updateDay = (day, field, value) => {
    onChange('horarios', {
      ...hours,
      [day]: { ...hours[day], [field]: value },
    });
  };

  const isDayOpen = (day) => {
    if (hours[day]?.enabled !== undefined) return hours[day].enabled;
    return DAYS.find((d) => d.key === day)?.defaultOpen ?? true;
  };

  return (
    <div className="space-y-5">
      {/* Days grid */}
      <div className="space-y-2">
        {DAYS.map((day) => {
          const open = isDayOpen(day.key);
          return (
            <div
              key={day.key}
              className="rounded-[12px] px-4 py-3 flex items-center gap-3"
              style={{
                background: day.highlight && open ? 'rgba(211,255,0,0.04)' : 'rgba(255,255,255,0.02)',
                border: `1px solid ${day.highlight && open ? 'rgba(211,255,0,0.15)' : 'rgba(255,255,255,0.06)'}`,
              }}
            >
              {/* Day label */}
              <div
                className="w-12 text-sm font-bold flex-shrink-0"
                style={{
                  fontFamily: 'DM Sans, sans-serif',
                  color: day.highlight && open ? '#D3FF00' : open ? '#FFFFFF' : '#6B7084',
                }}
              >
                {day.label}
              </div>

              {/* Time inputs */}
              {open ? (
                <div className="flex items-center gap-2 flex-1">
                  <input
                    type="time"
                    value={hours[day.key]?.apertura || '20:00'}
                    onChange={(e) => updateDay(day.key, 'apertura', e.target.value)}
                    style={{
                      ...inputStyle,
                      padding: '6px 10px',
                      width: 'auto',
                      fontSize: 13,
                      colorScheme: 'dark',
                    }}
                  />
                  <span style={{ color: '#6B7084', fontSize: 12 }}>–</span>
                  <input
                    type="time"
                    value={hours[day.key]?.cierre || '03:00'}
                    onChange={(e) => updateDay(day.key, 'cierre', e.target.value)}
                    style={{
                      ...inputStyle,
                      padding: '6px 10px',
                      width: 'auto',
                      fontSize: 13,
                      colorScheme: 'dark',
                    }}
                  />
                </div>
              ) : (
                <div className="flex-1">
                  <span style={{ color: '#6B7084', fontSize: 13, fontFamily: 'DM Sans, sans-serif' }}>Cerrado</span>
                </div>
              )}

              {/* Toggle */}
              <button
                onClick={() => updateDay(day.key, 'enabled', !open)}
                className="relative w-10 h-5 rounded-full transition-all duration-200 flex-shrink-0"
                style={{ background: open ? 'linear-gradient(135deg, #D3FF00, #FF7BDA)' : 'rgba(255,255,255,0.1)' }}
              >
                <span
                  className="absolute top-0.5 w-4 h-4 rounded-full bg-white transition-all duration-200"
                  style={{ left: open ? 'calc(100% - 18px)' : 2 }}
                />
              </button>
            </div>
          );
        })}
      </div>

      {/* Pricing */}
      <div className="grid grid-cols-2 gap-4 pt-2">
        <Field label="Precio mínimo por mesa">
          <Input
            type="text"
            placeholder="Bs 150"
            value={data.precioMinimo || ''}
            onChange={(e) => onChange('precioMinimo', e.target.value)}
          />
        </Field>
        <Field label="Precio mesa VIP">
          <Input
            type="text"
            placeholder="Bs 500"
            value={data.precioVip || ''}
            onChange={(e) => onChange('precioVip', e.target.value)}
          />
        </Field>
      </div>
    </div>
  );
};

// ─── Progress Steps ──────────────────────────────────────────────────────────
const STEPS = [
  { label: 'Info del local', icon: '🏢' },
  { label: 'Ubicación', icon: '📍' },
  { label: 'Mesas', icon: '🪑' },
  { label: 'Horarios', icon: '🕙' },
];

const ProgressBar = ({ currentStep, onStepClick }) => (
  <div className="flex items-center justify-between mb-8">
    {STEPS.map((step, i) => {
      const state = i < currentStep ? 'completed' : i === currentStep ? 'active' : 'pending';
      return (
        <React.Fragment key={i}>
          <button
            onClick={() => i < currentStep && onStepClick(i)}
            className="flex flex-col items-center gap-2 transition-all"
            style={{ cursor: i < currentStep ? 'pointer' : 'default' }}
          >
            <div
              className="w-10 h-10 rounded-full flex items-center justify-center text-base transition-all duration-300"
              style={{
                background:
                  state === 'completed'
                    ? 'linear-gradient(135deg, #D3FF00, #FF7BDA)'
                    : state === 'active'
                    ? 'rgba(211,255,0,0.15)'
                    : 'rgba(255,255,255,0.05)',
                border:
                  state === 'active'
                    ? '2px solid #D3FF00'
                    : state === 'completed'
                    ? 'none'
                    : '2px solid rgba(255,255,255,0.1)',
                color: state === 'completed' ? '#07070A' : state === 'active' ? '#D3FF00' : '#6B7084',
              }}
            >
              {state === 'completed' ? '✓' : step.icon}
            </div>
            <span
              className="text-xs hidden sm:block"
              style={{
                fontFamily: 'DM Sans, sans-serif',
                color: state === 'active' ? '#D3FF00' : state === 'completed' ? '#B8BDD0' : '#6B7084',
                fontWeight: state === 'active' ? 600 : 400,
              }}
            >
              {step.label}
            </span>
          </button>

          {i < STEPS.length - 1 && (
            <div
              className="flex-1 h-px mx-2"
              style={{
                background:
                  i < currentStep
                    ? 'linear-gradient(90deg, #D3FF00, #FF7BDA)'
                    : 'rgba(255,255,255,0.08)',
              }}
            />
          )}
        </React.Fragment>
      );
    })}
  </div>
);

// ─── Sidebar ─────────────────────────────────────────────────────────────────
const sidebarBenefits = [
  { icon: '🎁', text: 'Sin costo de registro' },
  { icon: '⚡', text: 'Activación en 48h' },
  { icon: '🎧', text: 'Soporte dedicado' },
  { icon: '💻', text: 'Panel web incluido' },
];

const Sidebar = () => (
  <div className="hidden lg:block lg:w-80 flex-shrink-0">
    <div
      className="rounded-[24px] p-8 sticky top-24"
      style={{ background: '#141418', border: '1px solid rgba(255,255,255,0.06)' }}
    >
      <span
        className="inline-block text-xs font-bold tracking-[2px] uppercase mb-5 px-3 py-1 rounded-full"
        style={{
          color: '#D3FF00',
          background: 'rgba(211,255,0,0.08)',
          border: '1px solid rgba(211,255,0,0.2)',
          fontFamily: 'DM Sans, sans-serif',
        }}
      >
        Únete a COVER
      </span>

      <h3
        className="text-2xl font-black text-white mb-3 leading-tight"
        style={{ fontFamily: 'Outfit, sans-serif' }}
      >
        Registra tu local y llena tus mesas
      </h3>

      <p
        className="text-sm leading-relaxed mb-8"
        style={{ color: '#B8BDD0', fontFamily: 'DM Sans, sans-serif' }}
      >
        Completa el formulario y nuestro equipo verificará tu local en menos de 48 horas. Sin costo de registro.
      </p>

      <div className="space-y-4">
        {sidebarBenefits.map((b, i) => (
          <div key={i} className="flex items-center gap-3">
            <div
              className="w-9 h-9 rounded-xl flex items-center justify-center text-lg flex-shrink-0"
              style={{ background: 'rgba(211,255,0,0.08)', border: '1px solid rgba(211,255,0,0.15)' }}
            >
              {b.icon}
            </div>
            <span style={{ color: '#B8BDD0', fontSize: 14, fontFamily: 'DM Sans, sans-serif' }}>{b.text}</span>
          </div>
        ))}
      </div>

      {/* Decorative orb */}
      <div
        className="absolute -bottom-10 -right-10 rounded-full blur-[60px] opacity-20 pointer-events-none"
        style={{ width: 200, height: 200, background: '#D3FF00' }}
      />
    </div>
  </div>
);

// ─── Main RegisterForm ───────────────────────────────────────────────────────
const RegisterForm = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    // Step 1
    nombre: '', tipo: '', telefono: '', email: '', descripcion: '', fotos: [],
    // Step 2
    direccion: '', zona: '', ciudad: '', referencia: '',
    // Step 3
    mesasRedondas: 0, mesasRectangulares: 0, mesasVip: 0, capacidad: '', zonas: '',
    // Step 4
    horarios: {}, precioMinimo: '', precioVip: '',
  });

  const updateField = (key, value) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
  };

  const handleNext = () => {
    if (currentStep < 3) setCurrentStep((s) => s + 1);
  };

  const handleBack = () => {
    if (currentStep > 0) setCurrentStep((s) => s - 1);
  };

  const handleSubmit = () => {
    setSubmitted(true);
  };

  const stepComponents = [
    <Step1 data={formData} onChange={updateField} />,
    <Step2 data={formData} onChange={updateField} />,
    <Step3 data={formData} onChange={updateField} />,
    <Step4 data={formData} onChange={updateField} />,
  ];

  return (
    <section
      id="registro"
      className="py-20 lg:py-28"
      style={{ background: '#0C0C10' }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <span
            className="inline-block text-xs font-bold tracking-[3px] uppercase mb-4 px-4 py-1.5 rounded-full"
            style={{
              color: '#D3FF00',
              background: 'rgba(211,255,0,0.08)',
              border: '1px solid rgba(211,255,0,0.2)',
              fontFamily: 'DM Sans, sans-serif',
            }}
          >
            Registro de Local
          </span>
          <h2
            className="text-4xl lg:text-5xl font-black text-white"
            style={{ fontFamily: 'Outfit, sans-serif' }}
          >
            Empieza hoy,{' '}
            <span style={{
              background: 'linear-gradient(135deg, #D3FF00 0%, #FF7BDA 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}>
              gratis
            </span>
          </h2>
        </motion.div>

        {submitted ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="max-w-lg mx-auto text-center rounded-[24px] p-12"
            style={{ background: '#141418', border: '1px solid rgba(211,255,0,0.2)' }}
          >
            <div className="text-6xl mb-6">🎉</div>
            <h3 className="text-2xl font-black text-white mb-3" style={{ fontFamily: 'Outfit, sans-serif' }}>
              ¡Registro enviado!
            </h3>
            <p className="text-base" style={{ color: '#B8BDD0', fontFamily: 'DM Sans, sans-serif' }}>
              Nuestro equipo revisará tu solicitud y te contactará en menos de 48 horas.
            </p>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.6 }}
            className="flex gap-10 items-start"
          >
            <Sidebar />

            {/* Form card */}
            <div className="flex-1 min-w-0">
              <div
                className="rounded-[24px] p-6 sm:p-8"
                style={{ background: '#141418', border: '1px solid rgba(255,255,255,0.06)' }}
              >
                {/* Progress bar */}
                <ProgressBar currentStep={currentStep} onStepClick={setCurrentStep} />

                {/* Step title */}
                <div className="mb-6">
                  <h4
                    className="text-lg font-bold text-white"
                    style={{ fontFamily: 'Outfit, sans-serif' }}
                  >
                    Paso {currentStep + 1} — {STEPS[currentStep].label}
                  </h4>
                  <p className="text-sm mt-1" style={{ color: '#6B7084', fontFamily: 'DM Sans, sans-serif' }}>
                    {currentStep === 0 && 'Cuéntanos sobre tu local'}
                    {currentStep === 1 && '¿Dónde está ubicado tu local?'}
                    {currentStep === 2 && 'Configura la distribución de mesas'}
                    {currentStep === 3 && 'Define tus horarios de atención'}
                  </p>
                </div>

                {/* Step content */}
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentStep}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.25 }}
                  >
                    {stepComponents[currentStep]}
                  </motion.div>
                </AnimatePresence>

                {/* Navigation */}
                <div className="flex justify-between items-center mt-8 pt-6" style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}>
                  <button
                    onClick={handleBack}
                    disabled={currentStep === 0}
                    className="px-6 py-3 rounded-full text-sm font-semibold transition-all duration-200 disabled:opacity-30 disabled:cursor-not-allowed hover:bg-white/10"
                    style={{
                      border: '1px solid rgba(255,255,255,0.15)',
                      color: '#B8BDD0',
                      fontFamily: 'DM Sans, sans-serif',
                    }}
                  >
                    ← Atrás
                  </button>

                  {currentStep < 3 ? (
                    <button
                      onClick={handleNext}
                      className="px-8 py-3 rounded-full text-sm font-semibold text-black transition-all duration-200 hover:opacity-90 hover:scale-105"
                      style={{
                        background: 'linear-gradient(135deg, #D3FF00 0%, #FF7BDA 100%)',
                        fontFamily: 'DM Sans, sans-serif',
                      }}
                    >
                      Siguiente →
                    </button>
                  ) : (
                    <button
                      onClick={handleSubmit}
                      className="px-8 py-3 rounded-full text-sm font-semibold text-black transition-all duration-200 hover:opacity-90 hover:scale-105"
                      style={{
                        background: 'linear-gradient(135deg, #D3FF00 0%, #FF7BDA 100%)',
                        fontFamily: 'DM Sans, sans-serif',
                      }}
                    >
                      Enviar Registro ✓
                    </button>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default RegisterForm;
