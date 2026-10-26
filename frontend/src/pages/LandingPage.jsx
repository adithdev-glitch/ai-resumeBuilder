import React from 'react';
import LandingNavbar from '../components/landing/LandingNavbar';
import HeroSection from '../components/landing/HeroSection';
import FeatureMockupSection from '../components/landing/FeatureMockupSection';
import TemplatesSection from '../components/landing/TemplatesSection';
import PricingSection from '../components/landing/PricingSection';
import FaqSection from '../components/landing/FaqSection';
import Footer from '../components/landing/Footer';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-white text-cv-slate-900 flex flex-col font-sans">
      <LandingNavbar />
      <main className="flex-1">
        <HeroSection />
        <FeatureMockupSection />
        <TemplatesSection />
        <PricingSection />
        <FaqSection />
      </main>
      <Footer />
    </div>
  );
}
