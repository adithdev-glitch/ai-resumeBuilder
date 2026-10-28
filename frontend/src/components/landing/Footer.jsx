import React from 'react';
import { Link } from 'react-router-dom';
import CvCraftLogo from '../common/CvCraftLogo';

export default function Footer() {
  return (
    <footer className="bg-white border-t border-cv-slate-200 py-12 px-6">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6 text-xs text-cv-slate-500">
        <div className="flex items-center gap-3">
          <CvCraftLogo className="h-6 w-auto" />
          <span className="text-cv-slate-400">|</span>
          <span>Job-winning ATS resume builder</span>
        </div>

        <div className="flex flex-wrap items-center gap-6">
          <a href="#hero" className="hover:text-cv-blue transition-colors">Home</a>
          <a href="#features" className="hover:text-cv-blue transition-colors">Features</a>
          <a href="#templates" className="hover:text-cv-blue transition-colors">Templates</a>
          <a href="#pricing" className="hover:text-cv-blue transition-colors">Pricing</a>
          <a href="#faq" className="hover:text-cv-blue transition-colors">FAQ</a>
          <Link to="/templates" className="font-semibold text-cv-blue hover:underline">Browse Templates</Link>
        </div>

        <div>
          © {new Date().getFullYear()} ResuMate. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
