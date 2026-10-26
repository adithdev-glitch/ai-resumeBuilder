import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import CvCraftLogo from '../common/CvCraftLogo';
import { ChevronDown, Menu, X } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export default function LandingNavbar() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [templatesDropdown, setTemplatesDropdown] = useState(false);

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-cv-slate-100 transition-all">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center">
          <CvCraftLogo className="h-8 w-auto" />
        </Link>

        {/* Center Nav Links */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-cv-slate-700">
          <a href="#hero" className="hover:text-cv-blue transition-colors">
            Home
          </a>
          <a href="#features" className="hover:text-cv-blue transition-colors">
            Features
          </a>
          <div className="relative">
            <button
              onClick={() => setTemplatesDropdown(!templatesDropdown)}
              onMouseEnter={() => setTemplatesDropdown(true)}
              className="inline-flex items-center gap-1 hover:text-cv-blue transition-colors py-2"
            >
              Templates
              <ChevronDown className="w-3.5 h-3.5 opacity-60" />
            </button>

            {templatesDropdown && (
              <div
                onMouseLeave={() => setTemplatesDropdown(false)}
                className="absolute top-full left-0 mt-1 w-52 bg-white border border-cv-slate-200 rounded-xl shadow-modal py-2 z-50 animate-in fade-in zoom-in-95 duration-100"
              >
                <Link
                  to="/editor"
                  className="block px-4 py-2 text-xs font-semibold text-cv-slate-800 hover:bg-cv-blue-50 hover:text-cv-blue"
                >
                  Classic Serif (ATS Single-Column)
                </Link>
                <Link
                  to="/editor"
                  className="block px-4 py-2 text-xs font-semibold text-cv-slate-800 hover:bg-cv-blue-50 hover:text-cv-blue"
                >
                  Modern Sans (High Contrast)
                </Link>
                <Link
                  to="/editor"
                  className="block px-4 py-2 text-xs font-semibold text-cv-slate-800 hover:bg-cv-blue-50 hover:text-cv-blue"
                >
                  Compact One-Page (Executive)
                </Link>
              </div>
            )}
          </div>
          <a href="#pricing" className="hover:text-cv-blue transition-colors">
            Pricing
          </a>
          <a href="#testimonials" className="hover:text-cv-blue transition-colors">
            Testimonials
          </a>
          <a href="#faq" className="hover:text-cv-blue transition-colors">
            FAQ
          </a>
        </nav>

        {/* Right Action Buttons */}
        <div className="hidden md:flex items-center gap-3">
          {user ? (
            <Link
              to="/dashboard"
              className="px-5 py-2 text-sm font-semibold text-cv-slate-700 hover:text-cv-blue rounded-xl border border-cv-slate-200 hover:border-cv-blue-border transition-all"
            >
              Dashboard
            </Link>
          ) : (
            <Link
              to="/login"
              className="px-6 py-2 text-sm font-semibold text-cv-blue hover:text-cv-blue-hover rounded-xl border border-cv-blue hover:bg-cv-blue-50 transition-all"
            >
              Login
            </Link>
          )}

          <button
            onClick={() => navigate('/editor')}
            className="px-6 py-2 text-sm font-semibold text-white bg-cv-blue hover:bg-cv-blue-hover rounded-xl shadow-sm transition-all hover:shadow hover:-translate-y-0.5 active:translate-y-0"
          >
            Get Started
          </button>
        </div>

        {/* Mobile menu trigger */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden p-2 text-cv-slate-600 hover:text-cv-slate-900"
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-b border-cv-slate-200 px-6 py-4 space-y-3">
          <a
            href="#hero"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-sm font-medium text-cv-slate-700 hover:text-cv-blue"
          >
            Home
          </a>
          <a
            href="#features"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-sm font-medium text-cv-slate-700 hover:text-cv-blue"
          >
            Features
          </a>
          <Link
            to="/editor"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-sm font-medium text-cv-slate-700 hover:text-cv-blue"
          >
            Templates
          </Link>
          <a
            href="#pricing"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-sm font-medium text-cv-slate-700 hover:text-cv-blue"
          >
            Pricing
          </a>
          <a
            href="#faq"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-sm font-medium text-cv-slate-700 hover:text-cv-blue"
          >
            FAQ
          </a>

          <div className="pt-3 border-t border-cv-slate-100 flex flex-col gap-2">
            <Link
              to="/login"
              className="text-center py-2 text-sm font-semibold text-cv-blue border border-cv-blue rounded-xl"
            >
              Login
            </Link>
            <Link
              to="/editor"
              className="text-center py-2 text-sm font-semibold text-white bg-cv-blue rounded-xl"
            >
              Get Started
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
