import React from 'react';
import { motion } from 'framer-motion';

const steps = [
  {
    number: '01',
    emoji: '🔍',
    title: 'Explora',
    description: 'Descubre bares y discotecas cerca de ti con fotos, menú, reseñas y disponibilidad en tiempo real.',
  },
  {
    number: '02',
    emoji: '🪑',
    title: 'Elige tu mesa',
    description: 'Ve el mapa del local con las mesas disponibles. Elige la ubicación que más te guste: cerca del DJ, en la terraza o VIP.',
  },
  {
    number: '03',
    emoji: '💳',
    title: 'Paga fácil',
    description: 'Paga con tarjeta, QR bancario o Tigo Money. Rápido, seguro y sin efectivo.',
  },
  {
    number: '04',
    emoji: '🎉',
    title: 'Disfruta',
    description: 'Llega, muestra tu código QR y siéntate directo en tu mesa. Sin filas, sin esperas.',
  },
];

const HowItWorks = () => (
  <section
    id="como-funciona"
    className="py-20 lg:py-28"
    style={{ background: '#0C0C10' }}
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
            color: '#D3FF00',
            background: 'rgba(211,255,0,0.08)',
            border: '1px solid rgba(211,255,0,0.2)',
            fontFamily: 'DM Sans, sans-serif',
          }}
        >
          Cómo funciona
        </span>
        <h2
          className="text-4xl lg:text-5xl font-black text-white"
          style={{ fontFamily: 'Outfit, sans-serif' }}
        >
          Tu noche perfecta en{' '}
          <span style={{
            background: 'linear-gradient(135deg, #D3FF00 0%, #FF7BDA 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
          }}>
            4 simples pasos
          </span>
        </h2>
      </motion.div>

      {/* Progress line (desktop) */}
      <div className="hidden lg:block relative mb-8">
        <div className="flex justify-between relative">
          {/* Line */}
          <div
            className="absolute top-6 left-[12.5%] right-[12.5%] h-0.5"
            style={{ background: 'linear-gradient(90deg, #D3FF00 0%, #FF7BDA 100%)' }}
          />
          {steps.map((step, i) => (
            <div key={i} className="flex flex-col items-center" style={{ width: '25%' }}>
              <motion.div
                initial={{ opacity: 0, scale: 0.5 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.12 }}
                className="w-12 h-12 rounded-full flex items-center justify-center text-xl font-black relative z-10"
                style={{
                  background: 'linear-gradient(135deg, #D3FF00 0%, #FF7BDA 100%)',
                  fontFamily: 'Outfit, sans-serif',
                  color: '#07070A',
                  fontSize: 20,
                }}
              >
                {step.emoji}
              </motion.div>
            </div>
          ))}
        </div>
      </div>

      {/* Steps grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {steps.map((step, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
            className="group relative rounded-[20px] p-6 transition-all duration-300 hover:-translate-y-1"
            style={{
              background: '#141418',
              border: '1px solid rgba(255,255,255,0.04)',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.border = '1px solid rgba(211,255,0,0.25)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.border = '1px solid rgba(255,255,255,0.04)';
            }}
          >
            {/* Gradient top line on hover */}
            <div
              className="absolute top-0 left-0 right-0 h-0.5 rounded-t-[20px] opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              style={{ background: 'linear-gradient(90deg, #D3FF00, #FF7BDA)' }}
            />

            {/* Step number */}
            <div
              className="text-xs font-bold mb-4"
              style={{
                color: '#6B7084',
                fontFamily: 'DM Sans, sans-serif',
                letterSpacing: '2px',
              }}
            >
              {step.number}
            </div>

            {/* Emoji */}
            <div className="text-4xl mb-4">{step.emoji}</div>

            {/* Title */}
            <h3
              className="text-lg font-bold text-white mb-3"
              style={{ fontFamily: 'Outfit, sans-serif' }}
            >
              {step.title}
            </h3>

            {/* Description */}
            <p
              className="text-sm leading-relaxed"
              style={{ color: '#B8BDD0', fontFamily: 'DM Sans, sans-serif' }}
            >
              {step.description}
            </p>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default HowItWorks;
