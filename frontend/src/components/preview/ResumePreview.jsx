import React, { useState } from 'react';
import ClassicSerif from './templates/ClassicSerif';
import ModernSans from './templates/ModernSans';
import CompactOnePage from './templates/CompactOnePage';
import { ZoomIn, ZoomOut, RotateCcw } from 'lucide-react';

export default function ResumePreview({ resume, activeTemplate = 'classic', onTemplateChange }) {
  const [zoom, setZoom] = useState(100);

  const renderTemplate = () => {
    switch (activeTemplate) {
      case 'modern':
        return <ModernSans resume={resume} />;
      case 'compact':
        return <CompactOnePage resume={resume} />;
      case 'classic':
      default:
        return <ClassicSerif resume={resume} />;
    }
  };

  return (
    <div className="flex flex-col h-full bg-cv-slate-100 overflow-hidden select-none">
      {/* Top Bar for Preview Controls */}
      <div className="h-12 bg-white border-b border-cv-slate-200 px-4 flex items-center justify-between z-10 shrink-0">
        <div className="flex items-center gap-2">
          <span className="text-xs font-semibold uppercase tracking-wider text-cv-slate-500">
            Template:
          </span>
          <div className="inline-flex rounded-md shadow-sm" role="group">
            <button
              type="button"
              onClick={() => onTemplateChange && onTemplateChange('classic')}
              className={`px-2.5 py-1 text-xs font-medium border rounded-l-md transition-colors ${
                activeTemplate === 'classic'
                  ? 'bg-cv-blue text-white border-cv-blue'
                  : 'bg-white text-cv-slate-700 border-cv-slate-200 hover:bg-cv-slate-50'
              }`}
            >
              Classic Serif
            </button>
            <button
              type="button"
              onClick={() => onTemplateChange && onTemplateChange('modern')}
              className={`px-2.5 py-1 text-xs font-medium border-t border-b border-r transition-colors ${
                activeTemplate === 'modern'
                  ? 'bg-cv-blue text-white border-cv-blue'
                  : 'bg-white text-cv-slate-700 border-cv-slate-200 hover:bg-cv-slate-50'
              }`}
            >
              Modern Sans
            </button>
            <button
              type="button"
              onClick={() => onTemplateChange && onTemplateChange('compact')}
              className={`px-2.5 py-1 text-xs font-medium border rounded-r-md transition-colors ${
                activeTemplate === 'compact'
                  ? 'bg-cv-blue text-white border-cv-blue'
                  : 'bg-white text-cv-slate-700 border-cv-slate-200 hover:bg-cv-slate-50'
              }`}
            >
              Compact
            </button>
          </div>
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
      <div className="flex-1 overflow-auto p-4 sm:p-8 flex justify-center items-start">
        <div
          style={{
            transform: `scale(${zoom / 100})`,
            transformOrigin: 'top center',
            transition: 'transform 0.15s ease-out',
          }}
          className="shrink-0"
        >
          {/* Printable Resume Paper */}
          <div
            id="resume-document"
            className="w-[210mm] min-h-[297mm] bg-white p-[18mm] shadow-xl border border-cv-slate-200 select-text"
          >
            {renderTemplate()}
          </div>
        </div>
      </div>
    </div>
  );
}
