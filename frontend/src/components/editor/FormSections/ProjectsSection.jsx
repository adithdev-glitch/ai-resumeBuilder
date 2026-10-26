import React from 'react';
import { FolderGit2, Plus, Trash2, ChevronUp, ChevronDown } from 'lucide-react';

export default function ProjectsSection({ projects = [], onChange }) {
  const addProject = () => {
    const newEntry = {
      id: 'proj-' + Date.now(),
      name: '',
      technologies: '',
      link: '',
      description: '',
    };
    onChange([...projects, newEntry]);
  };

  const removeProject = (index) => {
    const updated = [...projects];
    updated.splice(index, 1);
    onChange(updated);
  };

  const moveProject = (index, direction) => {
    const newIndex = index + direction;
    if (newIndex < 0 || newIndex >= projects.length) return;
    const updated = [...projects];
    const [moved] = updated.splice(index, 1);
    updated.splice(newIndex, 0, moved);
    onChange(updated);
  };

  const updateEntry = (index, field, value) => {
    const updated = [...projects];
    updated[index] = { ...updated[index], [field]: value };
    onChange(updated);
  };

  return (
    <div className="bg-white rounded-xl border border-cv-slate-200 p-5 shadow-sm space-y-4">
      <div className="flex items-center justify-between border-b border-cv-slate-100 pb-3">
        <div>
          <h2 className="text-sm font-bold text-cv-slate-900 flex items-center gap-2">
            <FolderGit2 className="w-4 h-4 text-cv-blue" />
            Projects
          </h2>
          <p className="text-xs text-cv-slate-500">
            Open-source libraries, products built, or significant freelance deliverables.
          </p>
        </div>

        <button
          type="button"
          onClick={addProject}
          className="text-xs font-semibold text-white bg-cv-blue hover:bg-cv-blue-hover px-3 py-1.5 rounded-lg inline-flex items-center gap-1.5 transition-colors shadow-sm"
        >
          <Plus className="w-3.5 h-3.5" />
          Add Project
        </button>
      </div>

      {projects.length === 0 ? (
        <div className="text-center py-6 text-xs text-cv-slate-500 bg-cv-slate-50 border border-dashed border-cv-slate-200 rounded-lg">
          No projects added yet. Click &ldquo;Add Project&rdquo; to highlight key work.
        </div>
      ) : (
        <div className="space-y-4">
          {projects.map((proj, projIdx) => (
            <div
              key={proj.id || projIdx}
              className="border border-cv-slate-200 rounded-lg p-4 bg-cv-slate-50/50 space-y-3"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-cv-slate-700">
                  #{projIdx + 1} {proj.name ? `— ${proj.name}` : 'New Project'}
                </span>
                <div className="flex items-center gap-1">
                  <button
                    type="button"
                    disabled={projIdx === 0}
                    onClick={() => moveProject(projIdx, -1)}
                    className="p-1 text-cv-slate-400 hover:text-cv-slate-700 disabled:opacity-30 rounded hover:bg-cv-slate-200"
                    title="Move Up"
                  >
                    <ChevronUp className="w-3.5 h-3.5" />
                  </button>
                  <button
                    type="button"
                    disabled={projIdx === projects.length - 1}
                    onClick={() => moveProject(projIdx, 1)}
                    className="p-1 text-cv-slate-400 hover:text-cv-slate-700 disabled:opacity-30 rounded hover:bg-cv-slate-200"
                    title="Move Down"
                  >
                    <ChevronDown className="w-3.5 h-3.5" />
                  </button>
                  <button
                    type="button"
                    onClick={() => removeProject(projIdx)}
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
                    Project Name *
                  </label>
                  <input
                    type="text"
                    value={proj.name || ''}
                    onChange={(e) => updateEntry(projIdx, 'name', e.target.value)}
                    placeholder="e.g. Pulse Design System"
                    className="w-full px-2.5 py-1.5 text-xs bg-white border border-cv-slate-200 rounded-md focus:outline-none focus:border-cv-blue"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-cv-slate-700 mb-1">
                    Technologies Used
                  </label>
                  <input
                    type="text"
                    value={proj.technologies || ''}
                    onChange={(e) => updateEntry(projIdx, 'technologies', e.target.value)}
                    placeholder="e.g. Figma, React, TypeScript"
                    className="w-full px-2.5 py-1.5 text-xs bg-white border border-cv-slate-200 rounded-md focus:outline-none focus:border-cv-blue"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-cv-slate-700 mb-1">
                  Project Link (Optional)
                </label>
                <input
                  type="text"
                  value={proj.link || ''}
                  onChange={(e) => updateEntry(projIdx, 'link', e.target.value)}
                  placeholder="e.g. github.com/username/project"
                  className="w-full px-2.5 py-1.5 text-xs bg-white border border-cv-slate-200 rounded-md focus:outline-none focus:border-cv-blue"
                />
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-cv-slate-700 mb-1">
                  Description
                </label>
                <textarea
                  rows={2}
                  value={proj.description || ''}
                  onChange={(e) => updateEntry(projIdx, 'description', e.target.value)}
                  placeholder="Brief summary of what was built and measurable outcome..."
                  className="w-full p-2 text-xs bg-white border border-cv-slate-200 rounded-md focus:outline-none focus:border-cv-blue"
                />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
