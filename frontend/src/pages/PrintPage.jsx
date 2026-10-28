import React, { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useResume } from '../context/ResumeContext';
import { RESUME_TEMPLATES } from '../data/templatesData';
import { sampleResume } from '../data/sampleResume';
import { ArrowLeft, Printer, Download, CheckCircle2 } from 'lucide-react';

export default function PrintPage() {
  const navigate = useNavigate();
  const { resume: contextResume, activeTemplate } = useResume();
  const hasAutoPrinted = useRef(false);

  // Fallback to local storage if accessed directly
  const resume = (() => {
    if (contextResume?.personal?.fullName) return contextResume;
    try {
      const saved = localStorage.getItem('resumate_current_resume') || localStorage.getItem('cvcraft_current_resume');
      if (saved) return JSON.parse(saved);
    } catch {
      // fallback
    }
    return sampleResume;
  })();

  const currentTemplateId = activeTemplate || resume.template || 'classic';
  const templateObj =
    RESUME_TEMPLATES.find((t) => t.id === currentTemplateId) || RESUME_TEMPLATES[0];
  const ActiveComponent = templateObj.component;

  const handlePrint = () => {
    window.print();
  };

  useEffect(() => {
    // Automatically trigger print dialog after document rendering settles
    if (!hasAutoPrinted.current) {
      hasAutoPrinted.current = true;
      const timer = setTimeout(() => {
        window.print();
      }, 600);
      return () => clearTimeout(timer);
    }
  }, []);

  return (
    <div className="min-h-screen bg-slate-100 font-sans text-slate-900 flex flex-col items-center print:min-h-0 print:h-auto print:bg-white print:block print:p-0 print:m-0">
      {/* Floating Top Control Bar (Hidden when printing / saving to PDF) */}
      <div className="no-print w-full bg-white/95 backdrop-blur-md border-b border-slate-200 sticky top-0 z-50 px-6 py-3.5 shadow-sm flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button
            onClick={() => window.close() || navigate('/editor')}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-slate-700 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to Editor</span>
          </button>
          <div className="h-4 w-[1px] bg-slate-200 hidden sm:block" />
          <span className="text-xs font-bold text-slate-800 truncate hidden sm:inline">
            {resume.personal?.fullName || 'Resume'} — {templateObj.name}
          </span>
        </div>

        <div className="flex items-center gap-2.5">
          <span className="text-[11px] text-slate-500 hidden md:inline">
            Tip: In the print dialog, set Destination to <strong>"Save as PDF"</strong>
          </span>
          <button
            onClick={handlePrint}
            className="inline-flex items-center gap-2 px-5 py-2 text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 rounded-xl shadow-sm hover:shadow transition-all"
          >
            <Printer className="w-3.5 h-3.5" />
            <span>Save as PDF / Print</span>
          </button>
        </div>
      </div>

      {/* Printable Paper Canvas */}
      <div className="flex-1 w-full flex justify-center py-6 sm:py-10 px-2 sm:px-4 print:p-0 print:m-0 print:block print:w-[210mm]">
        <div
          id="resume-document"
          className="w-[210mm] min-h-[297mm] bg-white p-[18mm] shadow-2xl border border-slate-200/80 rounded-none print:shadow-none print:border-none print:p-[18mm] print:m-0 print:min-h-0 print:h-[296mm] print:max-h-[296mm] print:overflow-hidden"
        >
          <ActiveComponent resume={resume} />
        </div>
      </div>
    </div>
  );
}
