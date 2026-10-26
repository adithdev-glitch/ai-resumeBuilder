import React from 'react';
import { AlignLeft, RefreshCw, Loader2 } from 'lucide-react';

export default function SummarySection({
  summary = '',
  onChange,
  onGenerateSummary,
  isGenerating = false,
}) {
  const wordCount = summary ? summary.trim().split(/\s+/).filter(Boolean).length : 0;

  return (
    <div className="bg-white rounded-xl border border-cv-slate-200 p-5 shadow-sm space-y-4">
      <div className="flex items-center justify-between border-b border-cv-slate-100 pb-3">
        <div>
          <h2 className="text-sm font-bold text-cv-slate-900 flex items-center gap-2">
            <AlignLeft className="w-4 h-4 text-cv-blue" />
            Professional Summary
          </h2>
          <p className="text-xs text-cv-slate-500">
            A concise 2–3 sentence overview highlighting your core strengths and impact.
          </p>
        </div>

        {/* Suggest Summary button */}
        <button
          type="button"
          onClick={onGenerateSummary}
          disabled={isGenerating}
          className="text-xs font-semibold text-cv-blue-600 hover:text-cv-blue-700 bg-cv-blue-50 hover:bg-cv-blue-100 border border-cv-blue-border px-3 py-1.5 rounded-lg inline-flex items-center gap-1.5 transition-colors disabled:opacity-50"
        >
          {isGenerating ? (
            <>
              <Loader2 className="w-3.5 h-3.5 animate-spin" />
              Generating...
            </>
          ) : (
            <>
              <RefreshCw className="w-3.5 h-3.5" />
              Suggest Summary
            </>
          )}
        </button>
      </div>

      <div>
        <textarea
          rows={4}
          value={summary}
          onChange={(e) => onChange(e.target.value)}
          placeholder="e.g. Product and Interaction Designer with over 4 years of experience leading end-to-end UX workflows..."
          className="w-full p-3 text-xs border border-cv-slate-200 rounded-lg focus:outline-none focus:border-cv-blue focus:ring-1 focus:ring-cv-blue leading-relaxed"
        />
        <div className="flex justify-between items-center mt-1.5 text-[11px] text-cv-slate-500">
          <span>Keep it between 40–80 words for optimal ATS impact.</span>
          <span>{wordCount} words</span>
        </div>
      </div>
    </div>
  );
}
