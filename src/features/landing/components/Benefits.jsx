import React from 'react';
import { motion } from 'framer-motion';

const benefits = [
  {
    emoji: '📈',
    title: 'Más visibilidad',
    description: 'Tu local aparece en búsquedas de miles de usuarios que buscan dónde salir esta noche.',
    metric: '+40%',
    metricLabel: 'aumento en reservas',
  },
  {
    emoji: '🪑',
    title: 'Gestión de mesas',
    description: 'Administra tu distribución de mesas en tiempo real. Asigna, bloquea y gestiona desde tu panel.',
    metric: 'Tiempo real',
    metricLabel: 'disponibilidad',
  },
  {
    emoji: '💰',
    title: 'Pagos seguros',
    description: 'Cobra por adelantado con QR bancario, Tigo Money o tarjeta. Sin efectivo, sin excusas.',
    metric: '-65%',
    metricLabel: 'no-shows',
  },
  {
    emoji: '📊',
    title: 'Analíticas',
    description: 'Conoce a tus clientes, identifica horarios pico y optimiza tu operación con datos reales.',
    metric: '360°',
    metricLabel: 'vista del negocio',
  },
  {
    emoji: '💬',
    title: 'Chat directo',
    description: 'Comunícate con tus clientes antes de su visita. Confirma detalles, responde preguntas y crea experiencias.',
    metric: '<2 min',
    metricLabel: 'respuesta promedio',
  },
  {
    emoji: '🔔',
    title: 'Promociones',
    description: 'Lanza ofertas y happy hours con notificaciones push. Llega directo al celular de tus clientes.',
    metric: '5x',
    metricLabel: 'alcance orgánico',
  },
];

const Benefits = () => (
  <section
    id="para-locales"
    className="py-20 lg:py-28"
    style={{ background: '#07070A' }}
  >
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.6 }}
        className="text-center mb-16"
      >
        <span
          className="inline-block text-xs font-bold tracking-[3px] uppercase mb-4 px-4 py-1.5 rounded-full"
          style={{
            color: '#FF7BDA',
            background: 'rgba(255,123,218,0.08)',
            border: '1px solid rgba(255,123,218,0.2)',
            fontFamily: 'DM Sans, sans-serif',
          }}
        >
          Para Locales
        </span>
        <h2
          className="text-4xl lg:text-5xl font-black text-white"
          style={{ fontFamily: 'Outfit, sans-serif' }}
        >
          Haz crecer tu negocio con{' '}
          <span style={{
            background: 'linear-gradient(135deg, #D3FF00 0%, #FF7BDA 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
          }}>
            COVER
          </span>
        </h2>
      </motion.div>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {benefits.map((benefit, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.5, delay: i * 0.08 }}
            className="group relative rounded-[20px] p-6 transition-all duration-300 cursor-default"
            style={{
              background: '#141418',
              border: '1px solid rgba(255,255,255,0.04)',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-4px)';
              e.currentTarget.style.border = '1px solid rgba(211,255,0,0.2)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.border = '1px solid rgba(255,255,255,0.04)';
            }}
          >
            {/* Top gradient line on hover */}
            <div
              className="absolute top-0 left-0 right-0 h-0.5 rounded-t-[20px] opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              style={{ background: 'linear-gradient(90deg, #D3FF00, #FF7BDA)' }}
            />

            {/* Emoji */}
            <div className="text-4xl mb-4">{benefit.emoji}</div>

            {/* Title */}
            <h3
              className="text-lg font-bold text-white mb-2"
              style={{ fontFamily: 'Outfit, sans-serif' }}
            >
              {benefit.title}
            </h3>

            {/* Description */}
            <p
              className="text-sm leading-relaxed mb-5"
              style={{ color: '#B8BDD0', fontFamily: 'DM Sans, sans-serif' }}
            >
              {benefit.description}
            </p>

            {/* Metric */}
            <div
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl"
              style={{ background: 'rgba(211,255,0,0.06)', border: '1px solid rgba(211,255,0,0.12)' }}
            >
              <span
                className="text-base font-black"
                style={{
                  fontFamily: 'Outfit, sans-serif',
                  background: 'linear-gradient(135deg, #D3FF00, #FF7BDA)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
              >
                {benefit.metric}
              </span>
              <span className="text-xs" style={{ color: '#6B7084', fontFamily: 'DM Sans, sans-serif' }}>
                {benefit.metricLabel}
              </span>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default Benefits;
