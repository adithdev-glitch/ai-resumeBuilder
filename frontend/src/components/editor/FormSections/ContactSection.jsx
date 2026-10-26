import React from 'react';
import { User, Mail, Phone, MapPin, Globe, Link2 } from 'lucide-react';

export default function ContactSection({ personal = {}, onChange }) {
  const updateField = (field, value) => {
    onChange({ ...personal, [field]: value });
  };

  return (
    <div className="bg-white rounded-xl border border-cv-slate-200 p-5 shadow-sm space-y-4">
      <div className="border-b border-cv-slate-100 pb-3">
        <h2 className="text-sm font-bold text-cv-slate-900 flex items-center gap-2">
          <User className="w-4 h-4 text-cv-blue" />
          Personal Details
        </h2>
        <p className="text-xs text-cv-slate-500">
          Your contact information displayed prominently at the top of the resume.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-semibold text-cv-slate-700 mb-1">
            Full Name *
          </label>
          <input
            type="text"
            required
            value={personal.fullName || ''}
            onChange={(e) => updateField('fullName', e.target.value)}
            placeholder="e.g. Jenifer Lindfield"
            className="w-full px-3 py-2 text-xs border border-cv-slate-200 rounded-lg focus:outline-none focus:border-cv-blue focus:ring-1 focus:ring-cv-blue"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-cv-slate-700 mb-1">
            Professional Title *
          </label>
          <input
            type="text"
            required
            value={personal.jobTitle || ''}
            onChange={(e) => updateField('jobTitle', e.target.value)}
            placeholder="e.g. Senior Product Designer"
            className="w-full px-3 py-2 text-xs border border-cv-slate-200 rounded-lg focus:outline-none focus:border-cv-blue focus:ring-1 focus:ring-cv-blue"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-cv-slate-700 mb-1 flex items-center gap-1.5">
            <Mail className="w-3 h-3 text-cv-slate-400" />
            Email Address *
          </label>
          <input
            type="email"
            required
            value={personal.email || ''}
            onChange={(e) => updateField('email', e.target.value)}
            placeholder="jenifer@example.com"
            className="w-full px-3 py-2 text-xs border border-cv-slate-200 rounded-lg focus:outline-none focus:border-cv-blue focus:ring-1 focus:ring-cv-blue"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-cv-slate-700 mb-1 flex items-center gap-1.5">
            <Phone className="w-3 h-3 text-cv-slate-400" />
            Phone Number
          </label>
          <input
            type="tel"
            value={personal.phone || ''}
            onChange={(e) => updateField('phone', e.target.value)}
            placeholder="+1 (555) 000-0000"
            className="w-full px-3 py-2 text-xs border border-cv-slate-200 rounded-lg focus:outline-none focus:border-cv-blue focus:ring-1 focus:ring-cv-blue"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-cv-slate-700 mb-1 flex items-center gap-1.5">
            <MapPin className="w-3 h-3 text-cv-slate-400" />
            Location (City, State / Country)
          </label>
          <input
            type="text"
            value={personal.location || ''}
            onChange={(e) => updateField('location', e.target.value)}
            placeholder="San Francisco, CA"
            className="w-full px-3 py-2 text-xs border border-cv-slate-200 rounded-lg focus:outline-none focus:border-cv-blue focus:ring-1 focus:ring-cv-blue"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-cv-slate-700 mb-1 flex items-center gap-1.5">
            <Globe className="w-3 h-3 text-cv-slate-400" />
            Portfolio / Website
          </label>
          <input
            type="text"
            value={personal.website || ''}
            onChange={(e) => updateField('website', e.target.value)}
            placeholder="jenifer.design"
            className="w-full px-3 py-2 text-xs border border-cv-slate-200 rounded-lg focus:outline-none focus:border-cv-blue focus:ring-1 focus:ring-cv-blue"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-cv-slate-700 mb-1 flex items-center gap-1.5">
            <Link2 className="w-3 h-3 text-cv-slate-400" />
            LinkedIn URL
          </label>
          <input
            type="text"
            value={personal.linkedin || ''}
            onChange={(e) => updateField('linkedin', e.target.value)}
            placeholder="linkedin.com/in/username"
            className="w-full px-3 py-2 text-xs border border-cv-slate-200 rounded-lg focus:outline-none focus:border-cv-blue focus:ring-1 focus:ring-cv-blue"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-cv-slate-700 mb-1 flex items-center gap-1.5">
            <Link2 className="w-3 h-3 text-cv-slate-400" />
            GitHub / Other Profile
          </label>
          <input
            type="text"
            value={personal.github || ''}
            onChange={(e) => updateField('github', e.target.value)}
            placeholder="github.com/username"
            className="w-full px-3 py-2 text-xs border border-cv-slate-200 rounded-lg focus:outline-none focus:border-cv-blue focus:ring-1 focus:ring-cv-blue"
          />
        </div>
      </div>
    </div>
  );
}
