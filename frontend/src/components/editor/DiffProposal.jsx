import React, { useState } from 'react';
import { Check, X, Edit3, ArrowRight } from 'lucide-react';

export default function DiffProposal({
  isOpen,
  title = 'Suggested Improvement',
  original = '',
  suggested = '',
  onAccept,
  onReject,
  contextNote = '',
}) {
  const [editedText, setEditedText] = useState(suggested);
  const [isEditing, setIsEditing] = useState(false);

  // Sync state if suggested changes
  React.useEffect(() => {
    setEditedText(suggested);
    setIsEditing(false);
  }, [suggested]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-cv-slate-900/40 backdrop-blur-[2px]">
      <div className="bg-white rounded-xl shadow-modal border border-cv-slate-200 max-w-2xl w-full p-6 space-y-5 animate-in fade-in zoom-in-95 duration-150">
        <div className="flex items-center justify-between border-b border-cv-slate-100 pb-3">
          <div>
            <h3 className="text-base font-bold text-cv-slate-900">{title}</h3>
            {contextNote && (
              <p className="text-xs text-cv-slate-500 mt-0.5">{contextNote}</p>
            )}
          </div>
          <button
            onClick={onReject}
            className="text-cv-slate-400 hover:text-cv-slate-600 p-1 rounded-md"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
          {/* Original Text */}
          <div className="flex flex-col bg-red-50/50 border border-red-200/60 rounded-lg p-3.5">
            <span className="font-semibold text-red-900 mb-1.5 flex items-center gap-1.5 uppercase tracking-wider text-[10px]">
              Original
            </span>
            <p className="text-cv-slate-700 leading-relaxed whitespace-pre-wrap flex-1">
              {original || '(Empty)'}
            </p>
          </div>

          {/* Suggested Text (Editable) */}
          <div className="flex flex-col bg-emerald-50/50 border border-emerald-200/60 rounded-lg p-3.5">
            <div className="flex items-center justify-between mb-1.5">
              <span className="font-semibold text-emerald-900 flex items-center gap-1.5 uppercase tracking-wider text-[10px]">
                Suggested <ArrowRight className="w-3 h-3 text-emerald-600" />
              </span>
              <button
                type="button"
                onClick={() => setIsEditing(!isEditing)}
                className="text-[11px] font-medium text-emerald-700 hover:text-emerald-900 inline-flex items-center gap-1 underline"
              >
                <Edit3 className="w-3 h-3" />
                {isEditing ? 'Preview' : 'Edit suggestion'}
              </button>
            </div>

            {isEditing ? (
              <textarea
                value={editedText}
                onChange={(e) => setEditedText(e.target.value)}
                className="w-full h-32 p-2 text-xs border border-emerald-300 rounded bg-white focus:outline-none focus:ring-1 focus:ring-emerald-500 text-cv-slate-800"
              />
            ) : (
              <p className="text-cv-slate-800 leading-relaxed whitespace-pre-wrap flex-1 font-medium">
                {editedText}
              </p>
            )}
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex items-center justify-end gap-3 pt-3 border-t border-cv-slate-100">
          <button
            type="button"
            onClick={onReject}
            className="px-4 py-2 text-xs font-semibold text-cv-slate-600 hover:text-cv-slate-900 hover:bg-cv-slate-100 rounded-lg border border-cv-slate-200 transition-colors"
          >
            Reject
          </button>
          <button
            type="button"
            onClick={() => onAccept(editedText)}
            className="px-4 py-2 text-xs font-semibold text-white bg-cv-blue hover:bg-cv-blue-hover rounded-lg shadow-sm transition-colors inline-flex items-center gap-1.5"
          >
            <Check className="w-4 h-4" />
            Accept Suggestion
          </button>
        </div>
      </div>
    </div>
  );
}
