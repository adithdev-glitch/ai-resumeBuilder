import React, { useState } from 'react';
import {
  X,
  Plus,
  Sparkles,
  Languages,
  HeartHandshake,
  Trophy,
  BookOpen,
  Mic,
  Compass,
} from 'lucide-react';
import { CUSTOM_SECTION_PRESETS } from '../../utils/sectionOrder';

const PRESET_ICONS = {
  Languages,
  HeartHandshake,
  Trophy,
  BookOpen,
  Mic,
  Compass,
};

export default function AddCustomSectionModal({
  isOpen,
  onClose,
  onAddSection,
}) {
  const [customTitle, setCustomTitle] = useState('');

  if (!isOpen) return null;

  const handleAddPreset = (preset) => {
    const newSection = {
      id: 'custom-' + Date.now(),
      title: preset.title,
      items: [
        {
          id: 'citem-' + Date.now(),
          ...preset.defaultItem,
        },
      ],
    };
    onAddSection(newSection);
    onClose();
  };

  const handleAddCustom = (e) => {
    e?.preventDefault();
    const title = customTitle.trim() || 'Custom Section';
    const newSection = {
      id: 'custom-' + Date.now(),
      title,
      items: [
        {
          id: 'citem-' + Date.now(),
          title: '',
          subtitle: '',
          date: '',
          description: '',
        },
      ],
    };
    onAddSection(newSection);
    setCustomTitle('');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-150">
      <div
        className="w-full max-w-lg bg-white rounded-2xl shadow-2xl border border-cv-slate-200 overflow-hidden flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="px-6 py-4 border-b border-cv-slate-100 flex items-center justify-between bg-cv-slate-50/70">
          <div>
            <h2 className="text-base font-bold text-cv-slate-900 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-cv-blue" />
              <span>Add Custom Section</span>
            </h2>
            <p className="text-xs text-cv-slate-500 mt-0.5">
              Choose from popular additions or type any custom section title.
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 text-cv-slate-400 hover:text-cv-slate-700 hover:bg-cv-slate-200/60 rounded-lg transition-colors"
            title="Close"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 space-y-5">
          {/* Preset Suggestions */}
          <div>
            <span className="text-[11px] font-bold text-cv-slate-600 uppercase tracking-wider block mb-2.5">
              Popular Resume Sections
            </span>
            <div className="grid grid-cols-2 gap-2.5">
              {CUSTOM_SECTION_PRESETS.map((preset) => {
                const IconComponent = PRESET_ICONS[preset.icon] || Sparkles;
                return (
                  <button
                    key={preset.title}
                    type="button"
                    onClick={() => handleAddPreset(preset)}
                    className="flex items-start gap-2.5 p-3 rounded-xl border border-cv-slate-200 bg-white hover:border-cv-blue hover:bg-blue-50/40 text-left transition-all group cursor-pointer shadow-2xs"
                  >
                    <div className="w-7 h-7 rounded-lg bg-blue-50 text-cv-blue flex items-center justify-center shrink-0 group-hover:bg-cv-blue group-hover:text-white transition-colors">
                      <IconComponent className="w-3.5 h-3.5" />
                    </div>
                    <div className="min-w-0">
                      <div className="text-xs font-bold text-cv-slate-900 group-hover:text-cv-blue transition-colors truncate">
                        {preset.title}
                      </div>
                      <div className="text-[10px] text-cv-slate-500 line-clamp-1 mt-0.5">
                        {preset.description}
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Divider */}
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-cv-slate-200" />
            </div>
            <div className="relative flex justify-center text-[10px] uppercase">
              <span className="bg-white px-3 text-cv-slate-400 font-bold tracking-wider">
                Or Create Custom Title
              </span>
            </div>
          </div>

          {/* Custom Input */}
          <form onSubmit={handleAddCustom} className="space-y-3">
            <div>
              <label className="block text-xs font-semibold text-cv-slate-700 mb-1">
                Custom Section Title
              </label>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={customTitle}
                  onChange={(e) => setCustomTitle(e.target.value)}
                  placeholder="e.g. Patents, Leadership, References..."
                  className="flex-1 px-3 py-2 text-xs border border-cv-slate-200 rounded-xl focus:outline-none focus:border-cv-blue focus:ring-1 focus:ring-cv-blue"
                />
                <button
                  type="submit"
                  disabled={!customTitle.trim()}
                  className="px-4 py-2 text-xs font-bold text-white bg-cv-blue hover:bg-cv-blue-hover rounded-xl shadow-sm transition-all disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer inline-flex items-center gap-1.5"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Add</span>
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

