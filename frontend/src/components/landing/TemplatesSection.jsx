import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useResume } from '../../context/ResumeContext';
import { ArrowRight, Check } from 'lucide-react';

export default function TemplatesSection() {
  const navigate = useNavigate();
  const { setActiveTemplate } = useResume();

  const templates = [
    {
      id: 'classic',
      name: 'Classic Serif',
      tagline: 'Standard single-column academic & corporate layout',
      badge: 'Most Popular',
      font: 'Newsreader Serif',
      features: ['Single-column strict ATS layout', 'Standard header hierarchy', 'Ideal for executive & legal roles'],
    },
    {
      id: 'modern',
      name: 'Modern Sans',
      tagline: 'High-contrast typography designed for tech and design',
      badge: 'ATS Verified',
      font: 'Public Sans',
      features: ['Subtle divider accents', 'Compact date & company alignment', 'Optimized for product & engineering'],
    },
    {
      id: 'compact',
      name: 'Compact One-Page',
      tagline: 'High density single-page format for dense careers',
      badge: '1-Page Fit',
      font: 'Plus Jakarta Sans',
      features: ['Tight baseline spacing', 'Dual-column education & projects', 'Maximum information density'],
    },
  ];

  const handleSelectTemplate = (id) => {
    setActiveTemplate(id);
    navigate('/editor');
  };

  return (
    <section id="templates" className="py-20 px-4 bg-cv-slate-50 border-t border-cv-slate-200">
      <div className="max-w-7xl mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <h2 className="text-3xl font-extrabold text-cv-slate-900 tracking-tight">
            ATS-Friendly Templates
          </h2>
          <p className="mt-2 text-sm text-cv-slate-600">
            Engineered to pass employer applicant tracking algorithms without parsing errors.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {templates.map((tmpl) => (
            <div
              key={tmpl.id}
              className="bg-white rounded-2xl border border-cv-slate-200 shadow-sm hover:border-cv-blue-border hover:shadow-md transition-all p-6 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-cv-blue bg-cv-blue-50 px-2.5 py-1 rounded-full border border-cv-blue-border">
                    {tmpl.badge}
                  </span>
                  <span className="text-xs text-cv-slate-400 font-medium">{tmpl.font}</span>
                </div>

                <h3 className="text-lg font-bold text-cv-slate-900">{tmpl.name}</h3>
                <p className="text-xs text-cv-slate-500 mt-1">{tmpl.tagline}</p>

                <ul className="mt-6 space-y-2.5 text-xs text-cv-slate-700">
                  {tmpl.features.map((feat, idx) => (
                    <li key={idx} className="flex items-center gap-2">
                      <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <button
                type="button"
                onClick={() => handleSelectTemplate(tmpl.id)}
                className="mt-8 w-full py-2.5 px-4 text-xs font-semibold text-cv-blue hover:text-white bg-cv-blue-50 hover:bg-cv-blue rounded-xl border border-cv-blue-border hover:border-transparent transition-all flex items-center justify-center gap-1.5"
              >
                Use Template <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <button
            onClick={() => navigate('/templates')}
            className="inline-flex items-center gap-2 px-8 py-3.5 bg-slate-900 hover:bg-black text-white text-xs font-bold rounded-xl shadow-md hover:shadow-lg transition-all"
          >
            <span>Explore All 11+ ATS-Friendly Templates</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </section>
  );
}
