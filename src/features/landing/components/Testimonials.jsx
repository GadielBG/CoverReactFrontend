import React from 'react';
import { motion } from 'framer-motion';

const testimonials = [
  {
    stars: 5,
    quote: 'Desde que usamos COVER, nuestras reservas de viernes y sábado aumentaron un 45%. Los pagos anticipados eliminaron casi todos los no-shows. No puedo imaginar volver a operar sin la plataforma.',
    name: 'Roberto Campos',
    role: 'Gerente · La Costilla Bar',
    initials: 'RC',
    gradientFrom: '#D3FF00',
    gradientTo: '#00D68F',
  },
  {
    stars: 5,
    quote: 'El mapa de mesas en tiempo real es increíble. Mis clientes eligen exactamente dónde quieren sentarse y llegan sabiendo que su mesa los espera. La experiencia mejoró muchísimo.',
    name: 'Marcela López',
    role: 'Dueña · Forum Club',
    initials: 'ML',
    gradientFrom: '#FF7BDA',
    gradientTo: '#4A90FF',
  },
  {
    stars: 5,
    quote: 'Los pagos por QR nos cambiaron todo. Ya no hay confusiones con el efectivo y el cierre de caja es perfecto. El panel de analíticas me ayuda a planificar el personal para cada noche.',
    name: 'Andrés Paredes',
    role: 'Admin · Hallwright\'s Pub',
    initials: 'AP',
    gradientFrom: '#4A90FF',
    gradientTo: '#FF7BDA',
  },
];

const Stars = ({ count }) => (
  <div className="flex gap-1 mb-4">
    {Array.from({ length: count }).map((_, i) => (
      <span key={i} style={{ color: '#D3FF00', fontSize: 14 }}>★</span>
    ))}
  </div>
);

const Testimonials = () => (
  <section
    id="testimonios"
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
          Testimonios
        </span>
        <h2
          className="text-4xl lg:text-5xl font-black text-white"
          style={{ fontFamily: 'Outfit, sans-serif' }}
        >
          Lo que dicen nuestros{' '}
          <span style={{
            background: 'linear-gradient(135deg, #D3FF00 0%, #FF7BDA 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
          }}>
            aliados
          </span>
        </h2>
      </motion.div>

      {/* Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {testimonials.map((t, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
            className="rounded-[20px] p-6 flex flex-col"
            style={{
              background: '#141418',
              border: '1px solid rgba(255,255,255,0.04)',
            }}
          >
            {/* Stars */}
            <Stars count={t.stars} />

            {/* Quote */}
            <p
              className="text-sm leading-relaxed italic flex-1 mb-6"
              style={{ color: '#B8BDD0', fontFamily: 'DM Sans, sans-serif' }}
            >
              "{t.quote}"
            </p>

            {/* Author */}
            <div className="flex items-center gap-3">
              <div
                className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-black flex-shrink-0"
                style={{
                  background: `linear-gradient(135deg, ${t.gradientFrom} 0%, ${t.gradientTo} 100%)`,
                  color: '#07070A',
                  fontFamily: 'Outfit, sans-serif',
                }}
              >
                {t.initials}
              </div>
              <div>
                <div
                  className="text-sm font-bold text-white"
                  style={{ fontFamily: 'DM Sans, sans-serif' }}
                >
                  {t.name}
                </div>
                <div
                  className="text-xs"
                  style={{ color: '#6B7084', fontFamily: 'DM Sans, sans-serif' }}
                >
                  {t.role}
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default Testimonials;
