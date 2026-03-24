import React from 'react';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import HowItWorks from '../components/HowItWorks';
import Benefits from '../components/Benefits';
import Testimonials from '../components/Testimonials';
import RegisterForm from '../components/RegisterForm';
import CTASection from '../components/CTASection';
import Footer from '../components/Footer';

const LandingPage = () => (
  <div style={{ background: '#07070A', minHeight: '100vh' }}>
    <Navbar />
    <Hero />
    <HowItWorks />
    <Benefits />
    <Testimonials />
    <RegisterForm />
    <CTASection />
    <Footer />
  </div>
);

export default LandingPage;
