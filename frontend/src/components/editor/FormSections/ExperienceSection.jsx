import React from 'react';
import {
  Briefcase,
  Plus,
  Trash2,
  ChevronUp,
  ChevronDown,
  Wand2,
  Target,
  Sparkles,
  Loader2,
} from 'lucide-react';

export default function ExperienceSection({
  experience = [],
  onChange,
  onImproveBullet,
  onOpenTailorModal,
  improvingBulletId = null,
}) {
  const addExperience = () => {
    const newEntry = {
      id: 'exp-' + Date.now(),
      role: '',
      company: '',
      location: '',
      startDate: '',
      endDate: '',
      current: false,
      bullets: [''],
    };
    onChange([newEntry, ...experience]);
  };

  const removeExperience = (index) => {
    const updated = [...experience];
    updated.splice(index, 1);
    onChange(updated);
  };

  const moveExperience = (index, direction) => {
    const newIndex = index + direction;
    if (newIndex < 0 || newIndex >= experience.length) return;
    const updated = [...experience];
    const [moved] = updated.splice(index, 1);
    updated.splice(newIndex, 0, moved);
    onChange(updated);
  };

  const updateEntry = (index, field, value) => {
    const updated = [...experience];
    updated[index] = { ...updated[index], [field]: value };
    onChange(updated);
  };

  // Bullet point handlers
  const updateBullet = (expIndex, bulletIndex, text) => {
    const updated = [...experience];
    const newBullets = [...(updated[expIndex].bullets || [])];
    newBullets[bulletIndex] = text;
    updated[expIndex].bullets = newBullets;
    onChange(updated);
  };

  const addBullet = (expIndex) => {
    const updated = [...experience];
    const newBullets = [...(updated[expIndex].bullets || []), ''];
    updated[expIndex].bullets = newBullets;
    onChange(updated);
  };

  const removeBullet = (expIndex, bulletIndex) => {
    const updated = [...experience];
    const newBullets = [...(updated[expIndex].bullets || [])];
    newBullets.splice(bulletIndex, 1);
    updated[expIndex].bullets = newBullets;
    onChange(updated);
  };

  return (
    <div className="bg-white rounded-xl border border-cv-slate-200 p-5 shadow-sm space-y-4">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-cv-slate-100 pb-3">
        <div>
          <h2 className="text-sm font-bold text-cv-slate-900 flex items-center gap-2">
            <Briefcase className="w-4 h-4 text-cv-blue" />
            Work Experience
          </h2>
          <p className="text-xs text-cv-slate-500">
            Detail your relevant professional roles, accomplishments, and quantifiable impact.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={onOpenTailorModal}
            className="text-xs font-semibold text-cv-blue-600 hover:text-cv-blue-700 bg-cv-blue-50 hover:bg-cv-blue-100 border border-cv-blue-border px-3 py-1.5 rounded-lg inline-flex items-center gap-1.5 transition-colors"
          >
            <Target className="w-3.5 h-3.5" />
            Tailor to Job Description
          </button>
          <button
            type="button"
            onClick={addExperience}
            className="text-xs font-semibold text-white bg-cv-blue hover:bg-cv-blue-hover px-3 py-1.5 rounded-lg inline-flex items-center gap-1.5 transition-colors shadow-sm"
          >
            <Plus className="w-3.5 h-3.5" />
            Add Role
          </button>
        </div>
      </div>

      {experience.length === 0 ? (
        <div className="text-center py-6 text-xs text-cv-slate-500 bg-cv-slate-50 border border-dashed border-cv-slate-200 rounded-lg">
          No experience entries added yet. Click &ldquo;Add Role&rdquo; to start.
        </div>
      ) : (
        <div className="space-y-4">
          {experience.map((exp, expIdx) => (
            <div
              key={exp.id || expIdx}
              className="border border-cv-slate-200 rounded-lg p-4 bg-cv-slate-50/50 space-y-3 relative group"
            >
              {/* Row header with controls */}
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-cv-slate-700">
                  #{expIdx + 1} {exp.role ? `— ${exp.role}` : 'New Position'}
                </span>
                <div className="flex items-center gap-1">
                  <button
                    type="button"
                    disabled={expIdx === 0}
                    onClick={() => moveExperience(expIdx, -1)}
                    className="p-1 text-cv-slate-400 hover:text-cv-slate-700 disabled:opacity-30 rounded hover:bg-cv-slate-200"
                    title="Move Up"
                  >
                    <ChevronUp className="w-3.5 h-3.5" />
                  </button>
                  <button
                    type="button"
                    disabled={expIdx === experience.length - 1}
                    onClick={() => moveExperience(expIdx, 1)}
                    className="p-1 text-cv-slate-400 hover:text-cv-slate-700 disabled:opacity-30 rounded hover:bg-cv-slate-200"
                    title="Move Down"
                  >
                    <ChevronDown className="w-3.5 h-3.5" />
                  </button>
                  <button
                    type="button"
                    onClick={() => removeExperience(expIdx)}
                    className="p-1 text-red-500 hover:text-red-700 rounded hover:bg-red-50 ml-1"
                    title="Delete Position"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              {/* Position Fields */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-semibold text-cv-slate-700 mb-1">
                    Job Title *
                  </label>
                  <input
                    type="text"
                    value={exp.role || ''}
                    onChange={(e) => updateEntry(expIdx, 'role', e.target.value)}
                    placeholder="e.g. Senior Frontend Engineer"
                    className="w-full px-2.5 py-1.5 text-xs bg-white border border-cv-slate-200 rounded-md focus:outline-none focus:border-cv-blue"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-cv-slate-700 mb-1">
                    Company Name *
                  </label>
                  <input
                    type="text"
                    value={exp.company || ''}
                    onChange={(e) => updateEntry(expIdx, 'company', e.target.value)}
                    placeholder="e.g. Acme Corp"
                    className="w-full px-2.5 py-1.5 text-xs bg-white border border-cv-slate-200 rounded-md focus:outline-none focus:border-cv-blue"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-cv-slate-700 mb-1">
                    Location
                  </label>
                  <input
                    type="text"
                    value={exp.location || ''}
                    onChange={(e) => updateEntry(expIdx, 'location', e.target.value)}
                    placeholder="e.g. New York, NY (or Remote)"
                    className="w-full px-2.5 py-1.5 text-xs bg-white border border-cv-slate-200 rounded-md focus:outline-none focus:border-cv-blue"
                  />
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block text-[11px] font-semibold text-cv-slate-700 mb-1">
                      Start Date
                    </label>
                    <input
                      type="text"
                      value={exp.startDate || ''}
                      onChange={(e) => updateEntry(expIdx, 'startDate', e.target.value)}
                      placeholder="e.g. Jan 2021"
                      className="w-full px-2 py-1.5 text-xs bg-white border border-cv-slate-200 rounded-md focus:outline-none focus:border-cv-blue"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-semibold text-cv-slate-700 mb-1">
                      End Date
                    </label>
                    <input
                      type="text"
                      disabled={exp.current}
                      value={exp.current ? 'Present' : exp.endDate || ''}
                      onChange={(e) => updateEntry(expIdx, 'endDate', e.target.value)}
                      placeholder="e.g. Present"
                      className="w-full px-2 py-1.5 text-xs bg-white border border-cv-slate-200 rounded-md focus:outline-none focus:border-cv-blue disabled:bg-cv-slate-100 disabled:text-cv-slate-500"
                    />
                  </div>
                </div>
              </div>

              {/* Current Job Checkbox */}
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id={`current-job-${expIdx}`}
                  checked={exp.current || false}
                  onChange={(e) => updateEntry(expIdx, 'current', e.target.checked)}
                  className="rounded border-cv-slate-300 text-cv-blue focus:ring-cv-blue w-3.5 h-3.5"
                />
                <label htmlFor={`current-job-${expIdx}`} className="text-xs text-cv-slate-600 select-none">
                  I currently work here
                </label>
              </div>

              {/* Bullet Points */}
              <div className="space-y-2 pt-2 border-t border-cv-slate-200">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-semibold text-cv-slate-700">
                    Key Achievements / Bullet Points
                  </span>
                  <button
                    type="button"
                    onClick={() => addBullet(expIdx)}
                    className="text-[11px] font-medium text-cv-blue hover:text-cv-blue-hover inline-flex items-center gap-1"
                  >
                    <Plus className="w-3 h-3" />
                    Add Bullet
                  </button>
                </div>

                <div className="space-y-2">
                  {(exp.bullets || []).map((bullet, bIdx) => {
                    const bulletKey = `${exp.id || expIdx}-bullet-${bIdx}`;
                    const isImprovingThis = improvingBulletId === bulletKey;

                    return (
                      <div key={bIdx} className="flex items-start gap-2">
                        <span className="text-cv-slate-400 mt-2 text-xs">•</span>
                        <textarea
                          rows={2}
                          value={bullet}
                          onChange={(e) => updateBullet(expIdx, bIdx, e.target.value)}
                          placeholder="e.g. Spearheaded redesign of core checkout flow, lifting conversion rate by 18%..."
                          className="flex-1 p-2 text-xs bg-white border border-cv-slate-200 rounded-md focus:outline-none focus:border-cv-blue focus:ring-1 focus:ring-cv-blue leading-relaxed"
                        />
                        <div className="flex flex-col gap-1 mt-1">
                          {/* Inline AI Rewrite trigger */}
                          <button
                            type="button"
                            title="Rewrite with strong action verbs & impact"
                            disabled={!bullet.trim() || isImprovingThis}
                            onClick={() =>
                              onImproveBullet({
                                bullet,
                                bulletKey,
                                expIndex: expIdx,
                                bulletIndex: bIdx,
                                role: exp.role,
                              })
                            }
                            className="p-1.5 text-cv-slate-600 hover:text-cv-blue hover:bg-cv-blue-50 border border-cv-slate-200 rounded-md transition-colors disabled:opacity-30"
                          >
                            {isImprovingThis ? (
                              <Loader2 className="w-3.5 h-3.5 animate-spin text-cv-blue" />
                            ) : (
                              <span className="text-[10px] font-semibold px-0.5">Rewrite</span>
                            )}
                          </button>
                          <button
                            type="button"
                            onClick={() => removeBullet(expIdx, bIdx)}
                            className="p-1 text-cv-slate-400 hover:text-red-600 rounded hover:bg-red-50"
                            title="Remove bullet"
                          >
                            <Trash2 className="w-3 h-3" />
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
