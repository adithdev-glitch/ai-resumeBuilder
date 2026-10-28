import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';

export default function FaqSection() {
  const [openIdx, setOpenIdx] = useState(0);

  const faqs = [
    {
      q: 'Why are these templates strictly ATS-friendly?',
      a: 'Many modern resume builders use multi-column graphical columns, tables, or complex background graphics that cause automated Applicant Tracking Systems (Workday, Greenhouse, Lever) to fail to extract your job history. ResuMate renders clean, single-column semantic HTML with true selectable text and standard heading hierarchies.',
    },
    {
      q: 'Does the AI ever invent companies, dates, or credentials?',
      a: 'Never. Our backend system instructions strictly forbid the AI from inventing metrics, previous employers, dates, or skills you did not provide. Gemini operates purely as an editorial polishing tool to rephrase your existing achievements into concise, action-oriented bullet points.',
    },
    {
      q: 'Can I export to PDF without watermarks?',
      a: 'Yes. All exports (both print-to-PDF and DOCX) are 100% free of watermarks or brand badges, formatted to strict standard A4 specifications.',
    },
    {
      q: 'Does template switching cause me to lose my data?',
      a: 'No. All your data lives in a unified structured data model. Switching between Classic Serif, Modern Sans, and Compact One-Page re-renders your existing information instantly without losing a single bullet point.',
    },
    {
      q: 'Do I need an account to build a resume?',
      a: 'No account is required to start. You can build your resume as a guest with automatic local storage saving and download your PDF or DOCX immediately. Creating an account lets you sync across devices and save multiple versions.',
    },
  ];

  return (
    <section id="faq" className="py-20 px-4 bg-cv-slate-50 border-t border-cv-slate-200">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-extrabold text-cv-slate-900 tracking-tight">
            Frequently Asked Questions
          </h2>
          <p className="mt-2 text-sm text-cv-slate-600">
            Straightforward answers about our ATS compliance and writing assist.
          </p>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, idx) => (
            <div
              key={idx}
              className="bg-white rounded-xl border border-cv-slate-200 overflow-hidden shadow-sm"
            >
              <button
                type="button"
                onClick={() => setOpenIdx(openIdx === idx ? -1 : idx)}
                className="w-full text-left px-5 py-4 flex items-center justify-between text-sm font-semibold text-cv-slate-900 hover:text-cv-blue"
              >
                <span>{faq.q}</span>
                <ChevronDown
                  className={`w-4 h-4 text-cv-slate-400 transition-transform ${
                    openIdx === idx ? 'rotate-180 text-cv-blue' : ''
                  }`}
                />
              </button>

              {openIdx === idx && (
                <div className="px-5 pb-4 text-xs text-cv-slate-600 leading-relaxed border-t border-cv-slate-100 pt-3">
                  {faq.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
