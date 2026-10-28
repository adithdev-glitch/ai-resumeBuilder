import React, { useState } from 'react';
import {
  X,
  GripVertical,
  ArrowUp,
  ArrowDown,
  RotateCcw,
  Check,
  Sparkles,
  Plus,
  User,
  AlignLeft,
  Briefcase,
  GraduationCap,
  FolderGit2,
  Wrench,
  Award,
} from 'lucide-react';
import {
  SECTION_METADATA,
  PRESET_SECTION_ORDERS,
  DEFAULT_SECTION_ORDER,
  moveSectionInOrder,
  normalizeSectionOrder,
  getSectionMetadata,
} from '../../utils/sectionOrder';

const SECTION_ICONS = {
  personal: User,
  summary: AlignLeft,
  experience: Briefcase,
  education: GraduationCap,
  projects: FolderGit2,
  skills: Wrench,
  certifications: Award,
};

export default function RearrangeSectionsModal({
  isOpen,
  onClose,
  sectionOrder,
  customSections = [],
  onUpdateOrder,
  onOpenAddSection,
}) {
  const [draggedIndex, setDraggedIndex] = useState(null);
  const [dragOverIndex, setDragOverIndex] = useState(null);

  if (!isOpen) return null;

  const currentOrder = normalizeSectionOrder(sectionOrder, customSections);

  const handleMove = (index, direction) => {
    const updated = moveSectionInOrder(currentOrder, index, direction, customSections);
    onUpdateOrder(updated);
  };

  const handleReset = () => {
    const customIds = (customSections || []).map((c) => c.id).filter(Boolean);
    onUpdateOrder([...DEFAULT_SECTION_ORDER, ...customIds]);
  };

  const handleApplyPreset = (presetOrder) => {
    onUpdateOrder(normalizeSectionOrder(presetOrder, customSections));
  };

  // Drag and Drop handlers
  const handleDragStart = (e, index) => {
    setDraggedIndex(index);
    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('text/plain', index.toString());
  };

  const handleDragOver = (e, index) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
    if (dragOverIndex !== index) {
      setDragOverIndex(index);
    }
  };

  const handleDragLeave = () => {
    setDragOverIndex(null);
  };

  const handleDrop = (e, targetIndex) => {
    e.preventDefault();
    setDragOverIndex(null);
    if (draggedIndex === null || draggedIndex === targetIndex) return;

    const updated = [...currentOrder];
    const [removed] = updated.splice(draggedIndex, 1);
    updated.splice(targetIndex, 0, removed);

    onUpdateOrder(updated);
    setDraggedIndex(null);
  };

  const handleDragEnd = () => {
    setDraggedIndex(null);
    setDragOverIndex(null);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-150">
      <div
        className="w-full max-w-lg bg-white rounded-2xl shadow-2xl border border-cv-slate-200 overflow-hidden flex flex-col max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="px-6 py-4 border-b border-cv-slate-100 flex items-center justify-between bg-cv-slate-50/70 shrink-0">
          <div>
            <h2 className="text-base font-bold text-cv-slate-900 flex items-center gap-2">
              <span>Rearrange Resume Sections</span>
            </h2>
            <p className="text-xs text-cv-slate-500 mt-0.5">
              Drag or use arrows to change section sequence in your resume.
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

        {/* Scrollable Body */}
        <div className="flex-1 overflow-y-auto p-6 space-y-5">
          {/* Presets */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-[11px] font-bold text-cv-slate-600 uppercase tracking-wider flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-cv-blue" />
                Quick Layout Presets
              </span>
            </div>
            <div className="grid grid-cols-2 gap-2">
              {PRESET_SECTION_ORDERS.map((preset) => {
                const isSelected =
                  JSON.stringify(currentOrder) === JSON.stringify(preset.order);
                return (
                  <button
                    key={preset.id}
                    type="button"
                    onClick={() => handleApplyPreset(preset.order)}
                    className={`text-left p-2.5 rounded-xl border text-xs transition-all flex flex-col justify-between ${isSelected
                        ? 'border-cv-blue bg-blue-50/60 text-cv-blue shadow-2xs'
                        : 'border-cv-slate-200 bg-white hover:bg-cv-slate-50 text-cv-slate-800'
                      }`}
                  >
                    <div className="flex items-center justify-between w-full">
                      <span className="font-bold truncate">{preset.name}</span>
                      {isSelected && <Check className="w-3.5 h-3.5 text-cv-blue shrink-0" />}
                    </div>
                    <span className="text-[10px] text-cv-slate-500 line-clamp-1 mt-0.5">
                      {preset.description}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Section List */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-[11px] font-bold text-cv-slate-600 uppercase tracking-wider">
                Current Section Order ({currentOrder.length} Sections)
              </span>
              <button
                type="button"
                onClick={handleReset}
                className="text-[11px] font-semibold text-cv-blue hover:text-cv-blue-hover inline-flex items-center gap-1 transition-colors"
                title="Reset to default order"
              >
                <RotateCcw className="w-3 h-3" />
                <span>Reset to Default</span>
              </button>
            </div>

            <div className="space-y-2 select-none">
              {currentOrder.map((sectionKey, index) => {
                const meta = getSectionMetadata(sectionKey, customSections);
                const IconComponent = SECTION_ICONS[sectionKey] || Sparkles;
                const isDragging = draggedIndex === index;
                const isOver = dragOverIndex === index;

                return (
                  <div
                    key={sectionKey}
                    draggable
                    onDragStart={(e) => handleDragStart(e, index)}
                    onDragOver={(e) => handleDragOver(e, index)}
                    onDragLeave={handleDragLeave}
                    onDrop={(e) => handleDrop(e, index)}
                    onDragEnd={handleDragEnd}
                    className={`flex items-center justify-between p-3 rounded-xl border transition-all ${isDragging
                        ? 'opacity-40 border-cv-blue border-dashed bg-blue-50/50'
                        : isOver
                          ? 'border-cv-blue bg-blue-50/30 scale-[1.01]'
                          : 'border-cv-slate-200 bg-white hover:border-cv-slate-300 shadow-2xs'
                      }`}
                  >
                    {/* Left: Drag Handle + Number + Icon + Title */}
                    <div className="flex items-center gap-3 min-w-0">
                      <div
                        className="cursor-grab active:cursor-grabbing text-cv-slate-400 hover:text-cv-slate-700 p-0.5 -ml-1 rounded transition-colors"
                        title="Drag to rearrange"
                      >
                        <GripVertical className="w-4 h-4" />
                      </div>

                      <div className="w-5 h-5 rounded-md bg-cv-slate-100 border border-cv-slate-200/80 flex items-center justify-center text-[10.5px] font-bold text-cv-slate-600 shrink-0">
                        {index + 1}
                      </div>

                        <div className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 ${meta.isCustom ? 'bg-indigo-50 text-indigo-600' : 'bg-blue-50 text-cv-blue'
                          }`}>
                          <IconComponent className="w-3.5 h-3.5" />
                        </div>

                        <div className="min-w-0">
                            <div className="text-xs font-bold text-cv-slate-900 truncate flex items-center gap-2">
                              <span>{meta.label}</span>
                              {meta.isCustom && (
                                <span className="text-[9.5px] font-semibold text-indigo-600 bg-indigo-50 border border-indigo-200/80 px-1.5 py-0.2 rounded-md">
                                  Custom
                                </span>
                              )}
                            </div>
                            <div className="text-[10px] text-cv-slate-500 truncate hidden sm:block">
                              {meta.description}
                            </div>
                          </div>
                        </div>

                        {/* Right: Up / Down Buttons */}
                        <div className="flex items-center gap-1 shrink-0 ml-2">
                          <button
                            type="button"
                            onClick={() => handleMove(index, -1)}
                            disabled={index === 0}
                            className="p-1.5 rounded-lg border border-cv-slate-200 text-cv-slate-600 hover:bg-cv-slate-100 hover:text-cv-slate-900 disabled:opacity-20 disabled:hover:bg-transparent disabled:cursor-not-allowed transition-colors cursor-pointer"
                            title="Move Up"
                          >
                            <ArrowUp className="w-3.5 h-3.5" />
                          </button>
                          <button
                            type="button"
                            onClick={() => handleMove(index, 1)}
                            disabled={index === currentOrder.length - 1}
                            className="p-1.5 rounded-lg border border-cv-slate-200 text-cv-slate-600 hover:bg-cv-slate-100 hover:text-cv-slate-900 disabled:opacity-20 disabled:hover:bg-transparent disabled:cursor-not-allowed transition-colors cursor-pointer"
                            title="Move Down"
                          >
                            <ArrowDown className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                      );
              })}
                    </div>

                    {onOpenAddSection && (
                      <button
                        type="button"
                        onClick={onOpenAddSection}
                        className="mt-3 w-full py-2.5 px-3 border border-dashed border-cv-slate-300 hover:border-cv-blue hover:bg-blue-50/30 text-cv-blue rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 cursor-pointer"
                      >
                        <Plus className="w-3.5 h-3.5" />
                        <span>Add Custom Section</span>
                      </button>
                    )}
                  </div>
        </div>

            {/* Footer */}
            <div className="px-6 py-3.5 border-t border-cv-slate-100 bg-cv-slate-50 flex items-center justify-between shrink-0">
              <span className="text-xs text-cv-slate-500">
                Changes update preview and PDF export in real time.
              </span>
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-xs font-bold text-white bg-cv-blue hover:bg-cv-blue-hover rounded-xl shadow-sm transition-all"
              >
                Done
              </button>
            </div>
          </div>
        </div>
        );
}

