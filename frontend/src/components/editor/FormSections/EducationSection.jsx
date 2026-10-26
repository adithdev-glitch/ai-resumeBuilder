import React from 'react';
import { GraduationCap, Plus, Trash2, ChevronUp, ChevronDown } from 'lucide-react';

export default function EducationSection({ education = [], onChange }) {
  const addEducation = () => {
    const newEntry = {
      id: 'edu-' + Date.now(),
      degree: '',
      school: '',
      location: '',
      startDate: '',
      endDate: '',
      gpa: '',
    };
    onChange([...education, newEntry]);
  };

  const removeEducation = (index) => {
    const updated = [...education];
    updated.splice(index, 1);
    onChange(updated);
  };

  const moveEducation = (index, direction) => {
    const newIndex = index + direction;
    if (newIndex < 0 || newIndex >= education.length) return;
    const updated = [...education];
    const [moved] = updated.splice(index, 1);
    updated.splice(newIndex, 0, moved);
    onChange(updated);
  };

  const updateEntry = (index, field, value) => {
    const updated = [...education];
    updated[index] = { ...updated[index], [field]: value };
    onChange(updated);
  };

  return (
    <div className="bg-white rounded-xl border border-cv-slate-200 p-5 shadow-sm space-y-4">
      <div className="flex items-center justify-between border-b border-cv-slate-100 pb-3">
        <div>
          <h2 className="text-sm font-bold text-cv-slate-900 flex items-center gap-2">
            <GraduationCap className="w-4 h-4 text-cv-blue" />
            Education
          </h2>
          <p className="text-xs text-cv-slate-500">
            Degrees, academic background, and relevant coursework.
          </p>
        </div>

        <button
          type="button"
          onClick={addEducation}
          className="text-xs font-semibold text-white bg-cv-blue hover:bg-cv-blue-hover px-3 py-1.5 rounded-lg inline-flex items-center gap-1.5 transition-colors shadow-sm"
        >
          <Plus className="w-3.5 h-3.5" />
          Add Education
        </button>
      </div>

      {education.length === 0 ? (
        <div className="text-center py-6 text-xs text-cv-slate-500 bg-cv-slate-50 border border-dashed border-cv-slate-200 rounded-lg">
          No education entries added yet. Click &ldquo;Add Education&rdquo; to add your degrees.
        </div>
      ) : (
        <div className="space-y-4">
          {education.map((edu, eduIdx) => (
            <div
              key={edu.id || eduIdx}
              className="border border-cv-slate-200 rounded-lg p-4 bg-cv-slate-50/50 space-y-3"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-cv-slate-700">
                  #{eduIdx + 1} {edu.school ? `— ${edu.school}` : 'New Degree'}
                </span>
                <div className="flex items-center gap-1">
                  <button
                    type="button"
                    disabled={eduIdx === 0}
                    onClick={() => moveEducation(eduIdx, -1)}
                    className="p-1 text-cv-slate-400 hover:text-cv-slate-700 disabled:opacity-30 rounded hover:bg-cv-slate-200"
                    title="Move Up"
                  >
                    <ChevronUp className="w-3.5 h-3.5" />
                  </button>
                  <button
                    type="button"
                    disabled={eduIdx === education.length - 1}
                    onClick={() => moveEducation(eduIdx, 1)}
                    className="p-1 text-cv-slate-400 hover:text-cv-slate-700 disabled:opacity-30 rounded hover:bg-cv-slate-200"
                    title="Move Down"
                  >
                    <ChevronDown className="w-3.5 h-3.5" />
                  </button>
                  <button
                    type="button"
                    onClick={() => removeEducation(eduIdx)}
                    className="p-1 text-red-500 hover:text-red-700 rounded hover:bg-red-50 ml-1"
                    title="Delete Entry"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-semibold text-cv-slate-700 mb-1">
                    School / University *
                  </label>
                  <input
                    type="text"
                    value={edu.school || ''}
                    onChange={(e) => updateEntry(eduIdx, 'school', e.target.value)}
                    placeholder="e.g. Stanford University"
                    className="w-full px-2.5 py-1.5 text-xs bg-white border border-cv-slate-200 rounded-md focus:outline-none focus:border-cv-blue"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-cv-slate-700 mb-1">
                    Degree / Major *
                  </label>
                  <input
                    type="text"
                    value={edu.degree || ''}
                    onChange={(e) => updateEntry(eduIdx, 'degree', e.target.value)}
                    placeholder="e.g. B.S. in Computer Science"
                    className="w-full px-2.5 py-1.5 text-xs bg-white border border-cv-slate-200 rounded-md focus:outline-none focus:border-cv-blue"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-cv-slate-700 mb-1">
                    Location
                  </label>
                  <input
                    type="text"
                    value={edu.location || ''}
                    onChange={(e) => updateEntry(eduIdx, 'location', e.target.value)}
                    placeholder="e.g. Stanford, CA"
                    className="w-full px-2.5 py-1.5 text-xs bg-white border border-cv-slate-200 rounded-md focus:outline-none focus:border-cv-blue"
                  />
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block text-[11px] font-semibold text-cv-slate-700 mb-1">
                      Years
                    </label>
                    <input
                      type="text"
                      value={edu.startDate && edu.endDate ? `${edu.startDate} – ${edu.endDate}` : edu.endDate || ''}
                      onChange={(e) => {
                        const val = e.target.value;
                        if (val.includes('–')) {
                          const [s, end] = val.split('–');
                          updateEntry(eduIdx, 'startDate', s.trim());
                          updateEntry(eduIdx, 'endDate', end.trim());
                        } else {
                          updateEntry(eduIdx, 'endDate', val);
                        }
                      }}
                      placeholder="e.g. 2018 – 2022"
                      className="w-full px-2 py-1.5 text-xs bg-white border border-cv-slate-200 rounded-md focus:outline-none focus:border-cv-blue"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-semibold text-cv-slate-700 mb-1">
                      GPA (Optional)
                    </label>
                    <input
                      type="text"
                      value={edu.gpa || ''}
                      onChange={(e) => updateEntry(eduIdx, 'gpa', e.target.value)}
                      placeholder="e.g. 3.9 / 4.0"
                      className="w-full px-2 py-1.5 text-xs bg-white border border-cv-slate-200 rounded-md focus:outline-none focus:border-cv-blue"
                    />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
