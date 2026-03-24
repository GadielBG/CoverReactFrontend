import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    setMenuOpen(false);
  };

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
      style={{
        background: scrolled ? 'rgba(7,7,10,0.85)' : 'transparent',
        backdropFilter: scrolled ? 'blur(20px)' : 'none',
        borderBottom: scrolled ? '1px solid rgba(255,255,255,0.05)' : 'none',
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
            <span
              className="text-2xl font-black tracking-[3px]"
              style={{
                fontFamily: 'Outfit, sans-serif',
                background: 'linear-gradient(135deg, #D3FF00 0%, #FF7BDA 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              COVER
            </span>
          </button>

          {/* Desktop Nav Links */}
          <div className="hidden md:flex items-center gap-8">
            {[
              { label: 'Cómo funciona', id: 'como-funciona' },
              { label: 'Para Locales', id: 'para-locales' },
              { label: 'Testimonios', id: 'testimonios' },
            ].map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className="text-sm transition-colors duration-200 hover:text-white"
                style={{ color: '#B8BDD0', fontFamily: 'DM Sans, sans-serif' }}
              >
                {item.label}
              </button>
            ))}
          </div>

          {/* CTA */}
          <div className="hidden md:block">
            <button
              onClick={() => scrollToSection('registro')}
              className="px-6 py-2.5 rounded-full text-sm font-semibold text-black transition-all duration-200 hover:opacity-90 hover:scale-105 active:scale-95"
              style={{
                background: 'linear-gradient(135deg, #D3FF00 0%, #FF7BDA 100%)',
                fontFamily: 'DM Sans, sans-serif',
              }}
            >
              Registrar mi Local
            </button>
          </div>

          {/* Mobile Hamburger */}
          <button
            className="md:hidden flex flex-col gap-1.5 p-2"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Menú"
          >
            <span
              className="block w-5 h-0.5 bg-white transition-all duration-300"
              style={{ transform: menuOpen ? 'rotate(45deg) translateY(8px)' : '' }}
            />
            <span
              className="block w-5 h-0.5 bg-white transition-all duration-300"
              style={{ opacity: menuOpen ? 0 : 1 }}
            />
            <span
              className="block w-5 h-0.5 bg-white transition-all duration-300"
              style={{ transform: menuOpen ? 'rotate(-45deg) translateY(-8px)' : '' }}
            />
          </button>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {menuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2 }}
              className="md:hidden overflow-hidden"
              style={{ borderTop: '1px solid rgba(255,255,255,0.08)' }}
            >
              <div className="flex flex-col gap-4 py-5">
                {[
                  { label: 'Cómo funciona', id: 'como-funciona' },
                  { label: 'Para Locales', id: 'para-locales' },
                  { label: 'Testimonios', id: 'testimonios' },
                ].map((item) => (
                  <button
                    key={item.id}
                    onClick={() => scrollToSection(item.id)}
                    className="text-sm text-left transition-colors hover:text-white"
                    style={{ color: '#B8BDD0', fontFamily: 'DM Sans, sans-serif' }}
                  >
                    {item.label}
                  </button>
                ))}
                <button
                  onClick={() => scrollToSection('registro')}
                  className="px-6 py-3 rounded-full text-sm font-semibold text-black w-full"
                  style={{
                    background: 'linear-gradient(135deg, #D3FF00 0%, #FF7BDA 100%)',
                    fontFamily: 'DM Sans, sans-serif',
                  }}
                >
                  Registrar mi Local
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </nav>
  );
};

export default Navbar;
