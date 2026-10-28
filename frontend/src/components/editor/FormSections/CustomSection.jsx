import React, { useState } from 'react';
import {
  Sparkles,
  Plus,
  Trash2,
  ChevronUp,
  ChevronDown,
  Edit2,
  Check,
} from 'lucide-react';

export default function CustomSection({
  section,
  onChange,
  onDelete,
}) {
  const [isEditingTitle, setIsEditingTitle] = useState(false);
  const [titleInput, setTitleInput] = useState(section.title || 'Custom Section');

  const items = Array.isArray(section.items) ? section.items : [];

  const handleTitleSubmit = () => {
    const trimmed = titleInput.trim() || 'Custom Section';
    setTitleInput(trimmed);
    onChange({ ...section, title: trimmed });
    setIsEditingTitle(false);
  };

  const addItem = () => {
    const newItem = {
      id: 'citem-' + Date.now(),
      title: '',
      subtitle: '',
      date: '',
      description: '',
    };
    onChange({ ...section, items: [...items, newItem] });
  };

  const updateItem = (index, field, value) => {
    const updated = [...items];
    updated[index] = { ...updated[index], [field]: value };
    onChange({ ...section, items: updated });
  };

  const removeItem = (index) => {
    const updated = items.filter((_, i) => i !== index);
    onChange({ ...section, items: updated });
  };

  const moveItem = (index, direction) => {
    const targetIndex = index + direction;
    if (targetIndex < 0 || targetIndex >= items.length) return;
    const updated = [...items];
    const [moved] = updated.splice(index, 1);
    updated.splice(targetIndex, 0, moved);
    onChange({ ...section, items: updated });
  };

  return (
    <div className="bg-white rounded-xl border border-cv-slate-200 p-5 shadow-sm space-y-4">
      {/* Header with Title Editing and Delete Section */}
      <div className="flex items-center justify-between border-b border-cv-slate-100 pb-3">
        <div className="flex items-center gap-2 flex-1 min-w-0 mr-3">
          <div className="w-6 h-6 rounded-md bg-indigo-50 text-indigo-600 flex items-center justify-center shrink-0">
            <Sparkles className="w-3.5 h-3.5" />
          </div>

          {isEditingTitle ? (
            <div className="flex items-center gap-1.5 flex-1 max-w-sm">
              <input
                type="text"
                autoFocus
                value={titleInput}
                onChange={(e) => setTitleInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') handleTitleSubmit();
                  if (e.key === 'Escape') setIsEditingTitle(false);
                }}
                className="w-full px-2 py-1 text-sm font-bold border border-cv-blue rounded-md focus:outline-none focus:ring-1 focus:ring-cv-blue text-cv-slate-900"
                placeholder="Section Title"
              />
              <button
                type="button"
                onClick={handleTitleSubmit}
                className="p-1.5 bg-cv-blue text-white rounded-md hover:bg-cv-blue-hover transition-colors"
                title="Save Title"
              >
                <Check className="w-3.5 h-3.5" />
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-2 group cursor-pointer" onClick={() => setIsEditingTitle(true)}>
              <h2 className="text-sm font-bold text-cv-slate-900 truncate">
                {section.title || 'Custom Section'}
              </h2>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  setIsEditingTitle(true);
                }}
                className="text-cv-slate-400 group-hover:text-cv-blue transition-colors p-0.5 rounded"
                title="Click to rename section"
              >
                <Edit2 className="w-3 h-3" />
              </button>
            </div>
          )}
        </div>

        {/* Delete Entire Custom Section Button */}
        <button
          type="button"
          onClick={() => {
            if (window.confirm(`Are you sure you want to remove the "${section.title || 'Custom'}" section?`)) {
              onDelete(section.id);
            }
          }}
          className="text-xs text-cv-slate-400 hover:text-red-600 p-1 rounded-md hover:bg-red-50 transition-colors inline-flex items-center gap-1 shrink-0"
          title="Delete this section"
        >
          <Trash2 className="w-3.5 h-3.5" />
          <span className="hidden sm:inline text-[11px]">Remove Section</span>
        </button>
      </div>

      {/* Items List */}
      <div className="space-y-4">
        {items.map((item, index) => (
          <div
            key={item.id || index}
            className="p-3.5 bg-cv-slate-50/70 border border-cv-slate-200/80 rounded-xl space-y-3 relative group"
          >
            {/* Top row with Entry number and Delete entry */}
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-bold text-cv-slate-500 uppercase tracking-wider">
                Entry {index + 1}
              </span>

              <div className="flex items-center gap-1">
                <button
                  type="button"
                  onClick={() => moveItem(index, -1)}
                  disabled={index === 0}
                  className="p-1 rounded text-cv-slate-400 hover:text-cv-slate-700 disabled:opacity-20 transition-colors"
                  title="Move entry up"
                >
                  <ChevronUp className="w-3.5 h-3.5" />
                </button>
                <button
                  type="button"
                  onClick={() => moveItem(index, 1)}
                  disabled={index === items.length - 1}
                  className="p-1 rounded text-cv-slate-400 hover:text-cv-slate-700 disabled:opacity-20 transition-colors"
                  title="Move entry down"
                >
                  <ChevronDown className="w-3.5 h-3.5" />
                </button>
                <div className="w-[1px] h-3 bg-cv-slate-200 mx-0.5" />
                <button
                  type="button"
                  onClick={() => removeItem(index)}
                  className="p-1 rounded text-cv-slate-400 hover:text-red-600 transition-colors"
                  title="Delete entry"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Input Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-[11px] font-semibold text-cv-slate-700 mb-1">
                  Title / Subject *
                </label>
                <input
                  type="text"
                  value={item.title || ''}
                  onChange={(e) => updateItem(index, 'title', e.target.value)}
                  placeholder="e.g. Volunteer Lead, Spanish, Best Paper"
                  className="w-full px-3 py-1.5 text-xs bg-white border border-cv-slate-200 rounded-lg focus:outline-none focus:border-cv-blue focus:ring-1 focus:ring-cv-blue"
                />
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-cv-slate-700 mb-1">
                  Organization / Subtitle
                </label>
                <input
                  type="text"
                  value={item.subtitle || ''}
                  onChange={(e) => updateItem(index, 'subtitle', e.target.value)}
                  placeholder="e.g. Red Cross, Native, IEEE"
                  className="w-full px-3 py-1.5 text-xs bg-white border border-cv-slate-200 rounded-lg focus:outline-none focus:border-cv-blue focus:ring-1 focus:ring-cv-blue"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block text-[11px] font-semibold text-cv-slate-700 mb-1">
                  Date / Period / Level
                </label>
                <input
                  type="text"
                  value={item.date || ''}
                  onChange={(e) => updateItem(index, 'date', e.target.value)}
                  placeholder="e.g. 2022 – Present, Fluent, May 2023"
                  className="w-full px-3 py-1.5 text-xs bg-white border border-cv-slate-200 rounded-lg focus:outline-none focus:border-cv-blue focus:ring-1 focus:ring-cv-blue"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block text-[11px] font-semibold text-cv-slate-700 mb-1">
                  Description / Notes (Optional)
                </label>
                <textarea
                  rows={2}
                  value={item.description || ''}
                  onChange={(e) => updateItem(index, 'description', e.target.value)}
                  placeholder="Additional context, accomplishments, or details..."
                  className="w-full px-3 py-2 text-xs bg-white border border-cv-slate-200 rounded-lg focus:outline-none focus:border-cv-blue focus:ring-1 focus:ring-cv-blue"
                />
              </div>
            </div>
          </div>
        ))}

        {items.length === 0 && (
          <div className="text-center py-6 border-2 border-dashed border-cv-slate-200 rounded-xl bg-cv-slate-50/50">
            <p className="text-xs text-cv-slate-500 mb-2">No entries added to this section yet.</p>
            <button
              type="button"
              onClick={addItem}
              className="text-xs font-semibold text-cv-blue hover:text-cv-blue-hover inline-flex items-center gap-1.5"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add first entry</span>
            </button>
          </div>
        )}
      </div>

      {/* Add Entry Button */}
      {items.length > 0 && (
        <button
          type="button"
          onClick={addItem}
          className="w-full py-2 border border-dashed border-cv-slate-300 hover:border-cv-blue hover:bg-blue-50/30 text-cv-blue rounded-xl text-xs font-semibold transition-all flex items-center justify-center gap-1.5 cursor-pointer"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>Add Entry</span>
        </button>
      )}
    </div>
  );
}

