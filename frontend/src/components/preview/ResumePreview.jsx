import React, { useState, useLayoutEffect, useRef } from 'react';
import { RESUME_TEMPLATES } from '../../data/templatesData';
import { ZoomIn, ZoomOut, RotateCcw, LayoutTemplate, FileText } from 'lucide-react';
import {
  applySmartPageBreaks,
  resetSmartPageBreaks,
  A4_HEIGHT_PX,
  MARGIN_PX,
} from '../../utils/pdfExport';

export default function ResumePreview({ resume, activeTemplate = 'classic', onTemplateChange }) {
  const [zoom, setZoom] = useState(100);
  const docRef = useRef(null);
  const [pageCount, setPageCount] = useState(1);

  useLayoutEffect(() => {
    const applyPagination = () => {
      const doc = docRef.current;
      if (!doc) return;

      // 1. Reset any previously shifted elements
      resetSmartPageBreaks(doc);

      // 2. Apply smart page breaks if content extends past Page 1's content zone (1055px)
      if (doc.scrollHeight > A4_HEIGHT_PX - MARGIN_PX) {
        applySmartPageBreaks(doc, A4_HEIGHT_PX, MARGIN_PX);
      }

      // 3. Calculate page count
      const calculatedPages = Math.max(1, Math.ceil(doc.scrollHeight / A4_HEIGHT_PX));
      setPageCount(calculatedPages);
    };

    applyPagination();
    const timer = setTimeout(applyPagination, 100);
    return () => clearTimeout(timer);
  }, [resume, activeTemplate]);

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
        <div className="flex items-center gap-3">
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

          {/* Page Counter Badge */}
          <div className="hidden md:inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-cv-slate-100 text-cv-slate-600 border border-cv-slate-200 text-xs font-semibold">
            <FileText className="w-3.5 h-3.5 text-cv-blue" />
            <span>{pageCount} {pageCount === 1 ? 'Page' : 'Pages'} (A4)</span>
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
            ref={docRef}
            id="resume-document"
            style={{
              minHeight: `${Math.max(1, pageCount) * 297}mm`,
            }}
            className={`w-[210mm] bg-white relative shadow-xl border border-cv-slate-200 select-text print:min-h-0 print:h-auto print:max-h-none print:p-0 print:shadow-none print:border-none print:m-0 print:overflow-visible transition-[min-height] duration-200 flex flex-col ${activeTemplate === 'atlantic' ? 'p-0' : 'p-[18mm]'}`}
          >
            {/* Visual Page Break Separators (Preview Only - cuts across paper at 297mm intervals) */}
            {pageCount > 1 &&
              Array.from({ length: pageCount - 1 }, (_, index) => {
                const pageBreakNum = index + 1;
                return (
                  <div
                    key={`page-break-${pageBreakNum}`}
                    className="no-print pointer-events-none absolute -left-[4px] -right-[4px] z-20 flex flex-col justify-center items-center select-none"
                    style={{
                      top: `${pageBreakNum * 297}mm`,
                      transform: 'translateY(-50%)',
                    }}
                    data-html2canvas-ignore="true"
                  >
                    {/* Desk Gap Strip */}
                    <div className="w-full h-8 bg-cv-slate-100 border-y border-cv-slate-300 shadow-[inset_0_3px_5px_rgba(0,0,0,0.06),inset_0_-3px_5px_rgba(0,0,0,0.06)] flex items-center justify-between px-6">
                      <div className="h-[1px] flex-1 border-t border-dashed border-cv-slate-300" />
                      <span className="mx-3 inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-white text-cv-slate-700 font-bold text-[10px] tracking-wider uppercase border border-cv-slate-300 shadow-sm">
                        <span className="w-2 h-2 rounded-full bg-cv-blue animate-pulse" />
                        Page {pageBreakNum + 1} Starts Here
                      </span>
                      <div className="h-[1px] flex-1 border-t border-dashed border-cv-slate-300" />
                    </div>
                  </div>
                );
              })}

            {renderTemplate()}
          </div>
        </div>
      </div>
    </div>
  );
}
