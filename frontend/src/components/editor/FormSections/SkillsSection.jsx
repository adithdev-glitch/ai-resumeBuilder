import React from 'react';
import { Sparkles, Plus, Trash2 } from 'lucide-react';

export default function SkillsSection({ skills = [], onChange }) {
  const addCategory = () => {
    const newCategory = {
      category: 'New Category',
      items: [''],
    };
    onChange([...skills, newCategory]);
  };

  const removeCategory = (index) => {
    const updated = [...skills];
    updated.splice(index, 1);
    onChange(updated);
  };

  const updateCategoryName = (index, name) => {
    const updated = [...skills];
    updated[index] = { ...updated[index], category: name };
    onChange(updated);
  };

  const updateItemsString = (index, text) => {
    const updated = [...skills];
    const items = text.split(',').map((s) => s.trim()).filter(Boolean);
    updated[index] = { ...updated[index], items };
    onChange(updated);
  };

  return (
    <div className="bg-white rounded-xl border border-cv-slate-200 p-5 shadow-sm space-y-4">
      <div className="flex items-center justify-between border-b border-cv-slate-100 pb-3">
        <div>
          <h2 className="text-sm font-bold text-cv-slate-900 flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-cv-blue" />
            Skills & Competencies
          </h2>
          <p className="text-xs text-cv-slate-500">
            Categorize your technical proficiencies, tools, and industry expertise.
          </p>
        </div>

        <button
          type="button"
          onClick={addCategory}
          className="text-xs font-semibold text-white bg-cv-blue hover:bg-cv-blue-hover px-3 py-1.5 rounded-lg inline-flex items-center gap-1.5 transition-colors shadow-sm"
        >
          <Plus className="w-3.5 h-3.5" />
          Add Category
        </button>
      </div>

      {skills.length === 0 ? (
        <div className="text-center py-6 text-xs text-cv-slate-500 bg-cv-slate-50 border border-dashed border-cv-slate-200 rounded-lg">
          No skills added. Click &ldquo;Add Category&rdquo; to group your skills.
        </div>
      ) : (
        <div className="space-y-3">
          {skills.map((skillGroup, idx) => {
            const itemsString = Array.isArray(skillGroup.items)
              ? skillGroup.items.join(', ')
              : skillGroup.items || '';

            return (
              <div
                key={idx}
                className="flex items-start gap-3 p-3 bg-cv-slate-50 rounded-lg border border-cv-slate-200"
              >
                <div className="w-1/3">
                  <label className="block text-[10px] font-bold text-cv-slate-600 uppercase mb-1">
                    Category Name
                  </label>
                  <input
                    type="text"
                    value={skillGroup.category || ''}
                    onChange={(e) => updateCategoryName(idx, e.target.value)}
                    placeholder="e.g. Design, Frontend, Tools"
                    className="w-full px-2.5 py-1.5 text-xs bg-white border border-cv-slate-200 rounded-md focus:outline-none focus:border-cv-blue"
                  />
                </div>

                <div className="flex-1">
                  <label className="block text-[10px] font-bold text-cv-slate-600 uppercase mb-1">
                    Skills (Comma separated)
                  </label>
                  <input
                    type="text"
                    defaultValue={itemsString}
                    onBlur={(e) => updateItemsString(idx, e.target.value)}
                    placeholder="e.g. React, TypeScript, Tailwind CSS, Next.js"
                    className="w-full px-2.5 py-1.5 text-xs bg-white border border-cv-slate-200 rounded-md focus:outline-none focus:border-cv-blue"
                  />
                </div>

                <button
                  type="button"
                  onClick={() => removeCategory(idx)}
                  className="p-1.5 text-red-500 hover:text-red-700 hover:bg-red-50 rounded mt-5"
                  title="Remove Category"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
