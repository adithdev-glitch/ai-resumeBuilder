import React, { useState } from 'react';
import { RESUME_TEMPLATES } from '../../data/templatesData';
import { ZoomIn, ZoomOut, RotateCcw, LayoutTemplate } from 'lucide-react';

export default function ResumePreview({ resume, activeTemplate = 'classic', onTemplateChange }) {
  const [zoom, setZoom] = useState(100);

  const currentTemplateObj =
    RESUME_TEMPLATES.find((t) => t.id === activeTemplate) || RESUME_TEMPLATES[0];
  const ActiveComponent = currentTemplateObj.component;

  const renderTemplate = () => {
    return <ActiveComponent resume={resume} />;
  };

  return (
    <div className="flex flex-col h-full bg-cv-slate-100 overflow-hidden select-none">
      {/* Top Bar for Preview Controls */}
      <div className="h-12 bg-white border-b border-cv-slate-200 px-4 flex items-center justify-between z-10 shrink-0">
        <div className="flex items-center gap-2">
          <LayoutTemplate className="w-4 h-4 text-cv-blue" />
          <span className="text-xs font-semibold uppercase tracking-wider text-cv-slate-500 hidden sm:inline">
            Template:
          </span>
          <select
            value={activeTemplate}
            onChange={(e) => onTemplateChange && onTemplateChange(e.target.value)}
            className="text-xs font-semibold text-cv-slate-800 bg-cv-slate-50 border border-cv-slate-200 rounded-lg px-2.5 py-1 focus:outline-none focus:ring-2 focus:ring-cv-blue focus:border-transparent transition-all cursor-pointer shadow-sm"
          >
            {RESUME_TEMPLATES.map((tmpl) => (
              <option key={tmpl.id} value={tmpl.id}>
                {tmpl.name} ({tmpl.badge})
              </option>
            ))}
          </select>
        </div>

        {/* Zoom Controls */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => setZoom((prev) => Math.max(prev - 10, 60))}
            className="p-1 text-cv-slate-500 hover:text-cv-slate-900 rounded hover:bg-cv-slate-100"
            title="Zoom Out"
            aria-label="Zoom Out"
          >
            <ZoomOut className="w-3.5 h-3.5" />
          </button>
          <span className="text-xs font-medium text-cv-slate-600 min-w-[36px] text-center">
            {zoom}%
          </span>
          <button
            onClick={() => setZoom((prev) => Math.min(prev + 10, 150))}
            className="p-1 text-cv-slate-500 hover:text-cv-slate-900 rounded hover:bg-cv-slate-100"
            title="Zoom In"
            aria-label="Zoom In"
          >
            <ZoomIn className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={() => setZoom(100)}
            className="p-1 text-cv-slate-500 hover:text-cv-slate-900 rounded hover:bg-cv-slate-100 ml-1"
            title="Reset Zoom"
            aria-label="Reset Zoom"
          >
            <RotateCcw className="w-3 h-3" />
          </button>
        </div>
      </div>

      {/* Scrollable Paper Canvas Container */}
      <div className="flex-1 overflow-auto p-4 sm:p-8 flex justify-center items-start print:p-0 print:m-0 print:block">
        <div
          style={{
            transform: `scale(${zoom / 100})`,
            transformOrigin: 'top center',
            transition: 'transform 0.15s ease-out',
          }}
          className="shrink-0 print:transform-none print:m-0 print:p-0"
        >
          {/* Printable Resume Paper */}
          <div
            id="resume-document"
            className="w-[210mm] min-h-[297mm] bg-white p-[18mm] shadow-xl border border-cv-slate-200 select-text print:min-h-0 print:h-[296mm] print:max-h-[296mm] print:p-[18mm] print:shadow-none print:border-none print:m-0 print:overflow-hidden"
          >
            {renderTemplate()}
          </div>
        </div>
      </div>
    </div>
  );
}
