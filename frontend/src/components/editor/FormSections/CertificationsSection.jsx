import React from 'react';
import { Award, Plus, Trash2 } from 'lucide-react';

export default function CertificationsSection({ certifications = [], onChange }) {
  const addCertification = () => {
    const newEntry = {
      id: 'cert-' + Date.now(),
      name: '',
      issuer: '',
      date: '',
    };
    onChange([...certifications, newEntry]);
  };

  const removeCertification = (index) => {
    const updated = [...certifications];
    updated.splice(index, 1);
    onChange(updated);
  };

  const updateEntry = (index, field, value) => {
    const updated = [...certifications];
    updated[index] = { ...updated[index], [field]: value };
    onChange(updated);
  };

  return (
    <div className="bg-white rounded-xl border border-cv-slate-200 p-5 shadow-sm space-y-4">
      <div className="flex items-center justify-between border-b border-cv-slate-100 pb-3">
        <div>
          <h2 className="text-sm font-bold text-cv-slate-900 flex items-center gap-2">
            <Award className="w-4 h-4 text-cv-blue" />
            Certifications & Licenses
          </h2>
          <p className="text-xs text-cv-slate-500">
            Professional licenses, course certificates, and accredited achievements.
          </p>
        </div>

        <button
          type="button"
          onClick={addCertification}
          className="text-xs font-semibold text-white bg-cv-blue hover:bg-cv-blue-hover px-3 py-1.5 rounded-lg inline-flex items-center gap-1.5 transition-colors shadow-sm"
        >
          <Plus className="w-3.5 h-3.5" />
          Add Certification
        </button>
      </div>

      {certifications.length === 0 ? (
        <div className="text-center py-6 text-xs text-cv-slate-500 bg-cv-slate-50 border border-dashed border-cv-slate-200 rounded-lg">
          No certifications added. Click &ldquo;Add Certification&rdquo; to add your credentials.
        </div>
      ) : (
        <div className="space-y-3">
          {certifications.map((cert, idx) => (
            <div
              key={cert.id || idx}
              className="flex items-center gap-3 p-3 bg-cv-slate-50 rounded-lg border border-cv-slate-200"
            >
              <div className="flex-1">
                <label className="block text-[10px] font-bold text-cv-slate-600 uppercase mb-1">
                  Certification Name *
                </label>
                <input
                  type="text"
                  value={cert.name || ''}
                  onChange={(e) => updateEntry(idx, 'name', e.target.value)}
                  placeholder="e.g. AWS Certified Solutions Architect"
                  className="w-full px-2.5 py-1.5 text-xs bg-white border border-cv-slate-200 rounded-md focus:outline-none focus:border-cv-blue"
                />
              </div>

              <div className="w-1/3">
                <label className="block text-[10px] font-bold text-cv-slate-600 uppercase mb-1">
                  Issuing Org
                </label>
                <input
                  type="text"
                  value={cert.issuer || ''}
                  onChange={(e) => updateEntry(idx, 'issuer', e.target.value)}
                  placeholder="e.g. Amazon Web Services"
                  className="w-full px-2.5 py-1.5 text-xs bg-white border border-cv-slate-200 rounded-md focus:outline-none focus:border-cv-blue"
                />
              </div>

              <div className="w-24">
                <label className="block text-[10px] font-bold text-cv-slate-600 uppercase mb-1">
                  Year
                </label>
                <input
                  type="text"
                  value={cert.date || ''}
                  onChange={(e) => updateEntry(idx, 'date', e.target.value)}
                  placeholder="2023"
                  className="w-full px-2.5 py-1.5 text-xs bg-white border border-cv-slate-200 rounded-md focus:outline-none focus:border-cv-blue"
                />
              </div>

              <button
                type="button"
                onClick={() => removeCertification(idx)}
                className="p-1.5 text-red-500 hover:text-red-700 hover:bg-red-50 rounded mt-5"
                title="Remove Certification"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
