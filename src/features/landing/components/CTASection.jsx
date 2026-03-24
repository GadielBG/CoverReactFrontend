import React from 'react';
import { motion } from 'framer-motion';

const CTASection = () => {
  const scrollToSection = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      className="py-20 lg:py-28"
      style={{ background: '#07070A' }}
    >
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7 }}
          className="relative rounded-[28px] p-10 lg:p-16 text-center overflow-hidden"
          style={{
            background: '#0C0C10',
            border: '1px solid rgba(255,255,255,0.06)',
          }}
        >
          {/* Glow top */}
          <div
            className="absolute top-0 left-1/2 -translate-x-1/2 rounded-full blur-[80px] opacity-30"
            style={{ width: 400, height: 200, background: '#D3FF00', marginTop: -80 }}
          />

          {/* Content */}
          <div className="relative">
            <div className="text-5xl mb-6">🎯</div>

            <h2
              className="text-3xl lg:text-5xl font-black text-white mb-4"
              style={{ fontFamily: 'Outfit, sans-serif' }}
            >
              ¿Listo para llenar tus mesas{' '}
              <span style={{
                background: 'linear-gradient(135deg, #D3FF00 0%, #FF7BDA 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}>
                cada fin de semana?
              </span>
            </h2>

            <p
              className="text-lg mb-8 max-w-xl mx-auto"
              style={{ color: '#B8BDD0', fontFamily: 'DM Sans, sans-serif' }}
            >
              Únete a los locales que ya usan COVER para gestionar sus reservas, cobrar sin efectivo y hacer crecer su negocio.
            </p>

            <button
              onClick={() => scrollToSection('registro')}
              className="px-10 py-4 rounded-full font-semibold text-black text-base transition-all duration-200 hover:opacity-90 hover:scale-105 active:scale-95"
              style={{
                background: 'linear-gradient(135deg, #D3FF00 0%, #FF7BDA 100%)',
                fontFamily: 'DM Sans, sans-serif',
              }}
            >
              Registrar mi Local Gratis
            </button>

            <p
              className="mt-4 text-sm"
              style={{ color: '#6B7084', fontFamily: 'DM Sans, sans-serif' }}
            >
              Sin costo de registro · Activación en 48h · Soporte dedicado
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default CTASection;
