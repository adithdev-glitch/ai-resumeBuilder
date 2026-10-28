import React from 'react';
import { useNavigate } from 'react-router-dom';
import CvCraftLogo from '../common/CvCraftLogo';

export default function HeroSection() {
  const navigate = useNavigate();

  return (
    <section id="hero" className="relative min-h-[600px] lg:min-h-[680px] flex flex-col items-center justify-center text-center px-4 overflow-hidden bg-white border-b border-cv-slate-100">
      {/* Exact Grid Pattern Background */}
      <div className="absolute inset-0 hero-grid-pattern pointer-events-none" />

      {/* Scattered Soft Light-Blue Geometric Blocks (Faithfully placed matching Dribbble reference) */}
      <div className="absolute inset-0 pointer-events-none max-w-7xl mx-auto overflow-hidden">
        {/* Left cluster */}
        <div className="absolute top-[168px] left-[56px] w-[112px] h-[56px] bg-[#EBF3FF] rounded-none opacity-85" />
        <div className="absolute top-[280px] left-[112px] w-[112px] h-[56px] bg-[#EBF3FF] rounded-none opacity-85" />
        <div className="absolute top-[112px] left-[280px] w-[56px] h-[56px] bg-[#EBF3FF] rounded-none opacity-85" />
        <div className="absolute top-[448px] left-[168px] w-[56px] h-[56px] bg-[#EBF3FF] rounded-none opacity-85" />

        {/* Right cluster */}
        <div className="absolute top-[112px] right-[280px] w-[56px] h-[112px] bg-[#EBF3FF] rounded-none opacity-85" />
        <div className="absolute top-[168px] right-[224px] w-[56px] h-[56px] bg-[#EBF3FF] rounded-none opacity-85" />
        <div className="absolute top-[392px] right-[112px] w-[112px] h-[56px] bg-[#EBF3FF] rounded-none opacity-85" />
        <div className="absolute top-[448px] right-[168px] w-[56px] h-[112px] bg-[#EBF3FF] rounded-none opacity-85" />

        {/* Bottom cluster */}
        <div className="absolute bottom-[56px] left-[336px] w-[112px] h-[56px] bg-[#EBF3FF] rounded-none opacity-85" />
      </div>

      {/* Foreground Content */}
      <div className="relative z-10 max-w-3xl mx-auto flex flex-col items-center py-16">
        {/* Center Dark Squircle Logo Badge */}
        <div className="w-14 h-14 bg-[#0B0F19] rounded-2xl flex items-center justify-center shadow-lg mb-8 hover:scale-105 transition-transform duration-200">
          <CvCraftLogo className="h-7 w-auto" showText={false} />
        </div>

        {/* Hero Title */}
        <h1 className="text-4xl sm:text-5xl lg:text-[58px] font-extrabold text-cv-slate-900 tracking-tight leading-[1.15]">
          Build a Job-Winning
          <br />
          Resume in Minutes with AI
        </h1>

        {/* Hero Subtitle */}
        <p className="mt-6 text-sm sm:text-base text-cv-slate-600 max-w-xl font-normal leading-relaxed">
          Our AI helps you craft professional, ATS-friendly resumes effortlessly.
        </p>

        {/* CTA Button */}
        <div className="mt-8">
          <button
            onClick={() => navigate('/templates')}
            className="px-8 py-3.5 text-sm font-bold text-white bg-cv-blue hover:bg-cv-blue-hover rounded-xl shadow-md transition-all hover:shadow-lg hover:-translate-y-0.5 active:translate-y-0"
          >
            Get Started for Free
          </button>
        </div>
      </div>
    </section>
  );
}
