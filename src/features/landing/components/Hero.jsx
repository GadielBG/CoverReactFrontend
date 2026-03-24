import React from 'react';
import { motion } from 'framer-motion';

const floatVariants = {
  initial: { y: 0 },
  animate: {
    y: [-10, 10, -10],
    transition: { duration: 6, repeat: Infinity, ease: 'easeInOut' },
  },
};

const floatVariants2 = {
  initial: { y: 0 },
  animate: {
    y: [10, -10, 10],
    transition: { duration: 8, repeat: Infinity, ease: 'easeInOut' },
  },
};

const PhoneMockup = () => (
  <div
    className="relative mx-auto"
    style={{
      width: 260,
      transform: 'perspective(1000px) rotateY(-8deg) rotateX(4deg)',
      filter: 'drop-shadow(0 40px 80px rgba(211,255,0,0.15))',
    }}
  >
    {/* Phone frame */}
    <div
      className="relative rounded-[36px] p-1.5"
      style={{
        background: 'linear-gradient(135deg, rgba(255,255,255,0.15), rgba(255,255,255,0.03))',
        border: '1px solid rgba(255,255,255,0.12)',
      }}
    >
      <div
        className="rounded-[28px] overflow-hidden"
        style={{ background: '#141418', height: 520 }}
      >
        {/* Status bar */}
        <div className="flex justify-between items-center px-5 pt-3 pb-1">
          <span className="text-white text-xs font-medium" style={{ fontFamily: 'DM Sans, sans-serif' }}>9:41</span>
          <div
            className="w-20 h-5 rounded-full"
            style={{ background: 'rgba(255,255,255,0.08)' }}
          />
          <div className="flex gap-1 items-center">
            <div className="w-3 h-2 border border-white/50 rounded-sm" />
            <div className="w-2 h-2 rounded-full border border-white/50" />
          </div>
        </div>

        {/* App header */}
        <div className="px-5 pt-4 pb-3">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-xs mb-0.5" style={{ color: '#6B7084', fontFamily: 'DM Sans, sans-serif' }}>Bienvenido de nuevo</p>
              <p className="text-white font-bold text-base" style={{ fontFamily: 'Outfit, sans-serif' }}>La Paz, Bolivia</p>
            </div>
            <div
              className="w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold text-black"
              style={{ background: 'linear-gradient(135deg, #D3FF00, #FF7BDA)' }}
            >
              A
            </div>
          </div>
        </div>

        {/* Search bar */}
        <div className="px-5 mb-4">
          <div
            className="flex items-center gap-2 px-4 py-2.5 rounded-2xl"
            style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.06)' }}
          >
            <span className="text-sm">🔍</span>
            <span className="text-xs" style={{ color: '#6B7084', fontFamily: 'DM Sans, sans-serif' }}>Buscar bar o discoteca...</span>
          </div>
        </div>

        {/* Section title */}
        <div className="px-5 mb-3">
          <p className="text-white font-bold text-sm" style={{ fontFamily: 'Outfit, sans-serif' }}>Destacados esta noche</p>
        </div>

        {/* Venue cards */}
        <div className="px-5 flex gap-3 overflow-hidden">
          {[
            { name: 'Forum Club', tag: 'VIP', color: '#D3FF00' },
            { name: 'Hallwright\'s', tag: 'Pub', color: '#FF7BDA' },
          ].map((venue, i) => (
            <div
              key={i}
              className="flex-shrink-0 rounded-2xl overflow-hidden"
              style={{
                width: 130,
                background: 'linear-gradient(160deg, rgba(255,255,255,0.07) 0%, rgba(255,255,255,0.02) 100%)',
                border: '1px solid rgba(255,255,255,0.06)',
              }}
            >
              <div
                className="h-20 flex items-center justify-center text-3xl"
                style={{ background: `linear-gradient(135deg, ${venue.color}22, ${venue.color}08)` }}
              >
                🎶
              </div>
              <div className="p-2.5">
                <div
                  className="text-xs font-bold text-white mb-1"
                  style={{ fontFamily: 'Outfit, sans-serif' }}
                >
                  {venue.name}
                </div>
                <div className="flex items-center gap-1.5">
                  <span
                    className="text-[10px] px-1.5 py-0.5 rounded-full font-semibold"
                    style={{ background: `${venue.color}22`, color: venue.color }}
                  >
                    {venue.tag}
                  </span>
                  <span className="text-[10px]" style={{ color: '#6B7084' }}>★ 4.8</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom tabs */}
        <div
          className="absolute bottom-0 left-0 right-0 flex justify-around py-4 px-2"
          style={{ background: 'rgba(7,7,10,0.95)', borderTop: '1px solid rgba(255,255,255,0.06)' }}
        >
          {['🏠', '🔍', '🎫', '👤'].map((icon, i) => (
            <div key={i} className="flex flex-col items-center gap-1">
              <span className="text-lg">{icon}</span>
              {i === 0 && (
                <div
                  className="w-1 h-1 rounded-full"
                  style={{ background: '#D3FF00' }}
                />
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  </div>
);

const Hero = () => {
  const scrollToSection = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      className="relative min-h-screen flex items-center overflow-hidden pt-20"
      style={{ background: '#07070A' }}
    >
      {/* Background grid */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)
          `,
          backgroundSize: '60px 60px',
        }}
      />

      {/* Orbs */}
      <motion.div
        variants={floatVariants}
        initial="initial"
        animate="animate"
        className="absolute top-1/4 left-1/4 rounded-full blur-[120px] opacity-20"
        style={{ width: 500, height: 500, background: '#D3FF00', transform: 'translateX(-50%) translateY(-50%)' }}
      />
      <motion.div
        variants={floatVariants2}
        initial="initial"
        animate="animate"
        className="absolute top-1/3 right-1/4 rounded-full blur-[120px] opacity-15"
        style={{ width: 400, height: 400, background: '#FF7BDA' }}
      />
      <div
        className="absolute bottom-1/4 left-1/3 rounded-full blur-[100px] opacity-10"
        style={{ width: 300, height: 300, background: '#4A90FF' }}
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full py-16 lg:py-24">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left Content */}
          <div>
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-6"
              style={{
                background: 'rgba(211,255,0,0.08)',
                border: '1px solid rgba(211,255,0,0.25)',
              }}
            >
              <span className="w-2 h-2 rounded-full inline-block" style={{ background: '#D3FF00' }} />
              <span className="text-sm font-medium" style={{ color: '#D3FF00', fontFamily: 'DM Sans, sans-serif' }}>
                Disponible en La Paz, Bolivia
              </span>
            </motion.div>

            {/* Title */}
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="font-black leading-tight mb-6"
              style={{ fontFamily: 'Outfit, sans-serif', fontSize: 'clamp(2.5rem, 5vw, 4rem)' }}
            >
              <span className="text-white">Reserva tu mesa.</span>
              <br />
              <span style={{
                background: 'linear-gradient(135deg, #D3FF00 0%, #FF7BDA 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}>
                Vive la noche.
              </span>
            </motion.h1>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-lg leading-relaxed mb-8 max-w-lg"
              style={{ color: '#B8BDD0', fontFamily: 'DM Sans, sans-serif' }}
            >
              COVER conecta a los amantes de la vida nocturna con los mejores bares y discotecas.
              Reserva tu mesa, paga desde la app y llega directo a disfrutar.
            </motion.p>

            {/* Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-col sm:flex-row gap-4 mb-12"
            >
              <button
                onClick={() => scrollToSection('registro')}
                className="px-8 py-4 rounded-full font-semibold text-black text-base transition-all duration-200 hover:opacity-90 hover:scale-105 active:scale-95"
                style={{
                  background: 'linear-gradient(135deg, #D3FF00 0%, #FF7BDA 100%)',
                  fontFamily: 'DM Sans, sans-serif',
                }}
              >
                Registrar mi Local
              </button>
              <button
                className="px-8 py-4 rounded-full font-semibold text-white text-base transition-all duration-200 hover:bg-white/10"
                style={{
                  border: '1px solid rgba(255,255,255,0.2)',
                  fontFamily: 'DM Sans, sans-serif',
                }}
              >
                Descargar App
              </button>
            </motion.div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="flex gap-8"
            >
              {[
                { value: '50+', label: 'Locales' },
                { value: '2,400+', label: 'Reservas' },
                { value: '4.8', label: 'Rating ★' },
              ].map((stat, i) => (
                <div key={i}>
                  <div
                    className="text-3xl font-black"
                    style={{
                      fontFamily: 'Outfit, sans-serif',
                      background: 'linear-gradient(135deg, #D3FF00 0%, #FF7BDA 100%)',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                      backgroundClip: 'text',
                    }}
                  >
                    {stat.value}
                  </div>
                  <div className="text-sm mt-1" style={{ color: '#6B7084', fontFamily: 'DM Sans, sans-serif' }}>
                    {stat.label}
                  </div>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Right Content - Phone + Floating Cards */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="relative flex justify-center lg:justify-end"
          >
            <div className="relative">
              <PhoneMockup />

              {/* Floating card 1 - Reservas hoy */}
              <motion.div
                variants={floatVariants}
                initial="initial"
                animate="animate"
                className="absolute -left-8 top-16 rounded-2xl px-4 py-3 shadow-2xl"
                style={{
                  background: 'rgba(20,20,24,0.95)',
                  border: '1px solid rgba(211,255,0,0.2)',
                  backdropFilter: 'blur(20px)',
                  minWidth: 160,
                }}
              >
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-base">📈</span>
                  <span className="text-xs font-semibold text-white" style={{ fontFamily: 'DM Sans, sans-serif' }}>
                    Reservas hoy
                  </span>
                </div>
                <div className="flex items-baseline gap-2">
                  <span className="text-xl font-black" style={{ fontFamily: 'Outfit, sans-serif', color: '#D3FF00' }}>+34</span>
                  <span className="text-xs font-medium" style={{ color: '#00D68F' }}>↑ 18%</span>
                </div>
              </motion.div>

              {/* Floating card 2 - Mesa confirmada */}
              <motion.div
                variants={floatVariants2}
                initial="initial"
                animate="animate"
                className="absolute -right-8 bottom-24 rounded-2xl px-4 py-3 shadow-2xl"
                style={{
                  background: 'rgba(20,20,24,0.95)',
                  border: '1px solid rgba(255,123,218,0.2)',
                  backdropFilter: 'blur(20px)',
                  minWidth: 160,
                }}
              >
                <div className="flex items-center gap-2">
                  <span className="text-base">✅</span>
                  <div>
                    <div className="text-xs font-semibold text-white" style={{ fontFamily: 'DM Sans, sans-serif' }}>
                      Mesa confirmada
                    </div>
                    <div className="text-xs mt-0.5" style={{ color: '#6B7084', fontFamily: 'DM Sans, sans-serif' }}>
                      Mesa 4 · VIP
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
