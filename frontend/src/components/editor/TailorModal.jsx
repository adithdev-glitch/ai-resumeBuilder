import React, { useState } from 'react';
import { X, ArrowRight, Loader2 } from 'lucide-react';

export default function TailorModal({ isOpen, onClose, onTailorSubmit, isTailoring = false }) {
  const [jobDescription, setJobDescription] = useState('');
  const [targetRole, setTargetRole] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!jobDescription.trim()) return;
    onTailorSubmit({ jobDescription, targetRole });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-cv-slate-900/40 backdrop-blur-[2px]">
      <div className="bg-white rounded-xl shadow-modal border border-cv-slate-200 max-w-xl w-full p-6 space-y-4 animate-in fade-in zoom-in-95 duration-150">
        <div className="flex items-center justify-between border-b border-cv-slate-100 pb-3">
          <div>
            <h3 className="text-base font-bold text-cv-slate-900">Tailor Resume to Job Description</h3>
            <p className="text-xs text-cv-slate-500 mt-0.5">
              Paste the role requirements to align your experience bullets with target keywords.
            </p>
          </div>
          <button
            onClick={onClose}
            className="text-cv-slate-400 hover:text-cv-slate-600 p-1 rounded-md"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-cv-slate-700 mb-1">
              Target Job Title (Optional)
            </label>
            <input
              type="text"
              placeholder="e.g. Senior Frontend Engineer"
              value={targetRole}
              onChange={(e) => setTargetRole(e.target.value)}
              className="w-full px-3 py-2 text-xs border border-cv-slate-200 rounded-lg focus:outline-none focus:border-cv-blue focus:ring-1 focus:ring-cv-blue"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-cv-slate-700 mb-1">
              Job Description / Requirements *
            </label>
            <textarea
              required
              rows={6}
              placeholder="Paste the job description or bullet list of required qualifications here..."
              value={jobDescription}
              onChange={(e) => setJobDescription(e.target.value)}
              className="w-full p-3 text-xs border border-cv-slate-200 rounded-lg focus:outline-none focus:border-cv-blue focus:ring-1 focus:ring-cv-blue leading-relaxed"
            />
          </div>

          <div className="flex items-center justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              disabled={isTailoring}
              className="px-4 py-2 text-xs font-medium text-cv-slate-600 hover:text-cv-slate-900 rounded-lg border border-cv-slate-200 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={!jobDescription.trim() || isTailoring}
              className="px-4 py-2 text-xs font-semibold text-white bg-cv-blue hover:bg-cv-blue-hover disabled:opacity-50 rounded-lg shadow-sm transition-colors inline-flex items-center gap-1.5"
            >
              {isTailoring ? (
                <>
                  <Loader2 className="w-3.5 h-3.5 animate-spin" />
                  Analyzing Keywords...
                </>
              ) : (
                <>
                  Tailor Experience
                  <ArrowRight className="w-3.5 h-3.5" />
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
