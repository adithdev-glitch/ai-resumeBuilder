import React from 'react';
import { normalizeSectionOrder } from '../../../utils/sectionOrder';

export default function EmeraldAccent({ resume }) {
  const { personal = {}, summary = '', experience = [], education = [], projects = [], skills = [], certifications = [] } = resume || {};
  const sectionOrder = normalizeSectionOrder(resume?.sectionOrder, resume?.customSections);

  const renderSection = (key) => {
    switch (key) {
      case 'personal':
        return (
          <header key="personal" className="relative pl-4 border-l-4 border-emerald-600 pb-3 mb-5">
            <h1 className="text-3xl font-extrabold tracking-tight text-slate-900">
              {personal.fullName || 'Your Name'}
            </h1>
            {personal.jobTitle && (
              <p className="text-sm font-semibold text-emerald-700 mt-0.5">
                {personal.jobTitle}
              </p>
            )}
            <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-[11px] text-slate-600 mt-2">
              {personal.email && (
                <a href={`mailto:${personal.email}`} className="text-emerald-800 hover:underline">
                  {personal.email}
                </a>
              )}
              {personal.phone && <span>{personal.phone}</span>}
              {personal.location && <span>{personal.location}</span>}
              {personal.linkedin && <span>linkedin.com/in/{personal.linkedin.replace(/.*linkedin\.com\/in\//, '')}</span>}
              {personal.website && <span>{personal.website}</span>}
            </div>
          </header>
        );

      case 'summary':
        if (!summary) return null;
        return (
          <section key="summary" className="mb-5">
            <h2 className="text-[11px] font-bold uppercase tracking-wider text-emerald-800 border-b border-emerald-200 pb-0.5 mb-1.5 flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 bg-emerald-600 rounded-full"></span> About Me
            </h2>
            <p className="text-[11.5px] text-slate-700 leading-relaxed">
              {summary}
            </p>
          </section>
        );

      case 'experience':
        if (experience.length === 0) return null;
        return (
          <section key="experience" className="mb-5">
            <h2 className="text-[11px] font-bold uppercase tracking-wider text-emerald-800 border-b border-emerald-200 pb-0.5 mb-3 flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 bg-emerald-600 rounded-full"></span> Professional Experience
            </h2>
            <div className="space-y-3.5">
              {experience.map((exp) => (
                <div key={exp.id || exp._id}>
                  <div className="flex justify-between items-baseline">
                    <h3 className="text-xs font-bold text-slate-900">{exp.role}</h3>
                    <span className="text-[10.5px] font-medium text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-100">
                      {exp.startDate} – {exp.current ? 'Present' : exp.endDate}
                    </span>
                  </div>
                  <div className="flex justify-between text-[11px] text-slate-600 mb-1">
                    <span className="font-semibold text-slate-800">{exp.company}</span>
                    {exp.location && <span>{exp.location}</span>}
                  </div>
                  {exp.bullets && exp.bullets.length > 0 && (
                    <ul className="list-disc list-outside ml-4 space-y-1 text-[11px] text-slate-700 leading-relaxed">
                      {exp.bullets.filter(Boolean).map((bullet, idx) => (
                        <li key={idx}>{bullet}</li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
            </div>
          </section>
        );

      case 'projects':
        if (projects.length === 0) return null;
        return (
          <section key="projects" className="mb-5">
            <h2 className="text-[11px] font-bold uppercase tracking-wider text-emerald-800 border-b border-emerald-200 pb-0.5 mb-2.5 flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 bg-emerald-600 rounded-full"></span> Selected Projects
            </h2>
            <div className="space-y-2">
              {projects.map((proj) => (
                <div key={proj.id || proj._id}>
                  <div className="flex justify-between text-xs font-bold text-slate-900">
                    <span>{proj.name}</span>
                    {proj.technologies && <span className="font-normal text-[10.5px] text-slate-500 italic">{proj.technologies}</span>}
                  </div>
                  {proj.description && <p className="text-[11px] text-slate-600 mt-0.5 leading-snug">{proj.description}</p>}
                </div>
              ))}
            </div>
          </section>
        );

      case 'education':
        if (education.length === 0) return null;
        return (
          <section key="education" className="mb-5">
            <h2 className="text-[11px] font-bold uppercase tracking-wider text-emerald-800 border-b border-emerald-200 pb-0.5 mb-2 flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 bg-emerald-600 rounded-full"></span> Education
            </h2>
            <div className="space-y-2">
              {education.map((edu) => (
                <div key={edu.id || edu._id} className="flex justify-between items-baseline">
                  <div>
                    <h3 className="text-xs font-bold text-slate-900">{edu.school}</h3>
                    <p className="text-[11px] text-slate-600">
                      {edu.degree} {edu.gpa && `• GPA: ${edu.gpa}`}
                    </p>
                  </div>
                  <span className="text-[10.5px] text-slate-500">{edu.startDate} – {edu.endDate}</span>
                </div>
              ))}
            </div>
          </section>
        );

      case 'skills':
        if (skills.length === 0) return null;
        return (
          <section key="skills" className="mb-4">
            <h2 className="text-[11px] font-bold uppercase tracking-wider text-emerald-800 border-b border-emerald-200 pb-0.5 mb-2 flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 bg-emerald-600 rounded-full"></span> Core Competencies
            </h2>
            <div className="space-y-1.5 text-[11px]">
              {skills.map((grp, idx) => (
                <div key={idx} className="flex flex-wrap items-baseline gap-1.5">
                  <span className="font-bold text-slate-900 min-w-[85px]">{grp.category}:</span>
                  <span className="text-slate-700">
                    {Array.isArray(grp.items) ? grp.items.join(', ') : grp.items}
                  </span>
                </div>
              ))}
            </div>
          </section>
        );

      case 'certifications':
        if (certifications.length === 0) return null;
        return (
          <section key="certifications">
            <h2 className="text-[11px] font-bold uppercase tracking-wider text-emerald-800 border-b border-emerald-200 pb-0.5 mb-1.5 flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 bg-emerald-600 rounded-full"></span> Certifications
            </h2>
            <div className="flex flex-wrap gap-x-5 gap-y-1 text-[11px] text-slate-700">
              {certifications.map((c) => (
                <span key={c.id || c._id}>
                  <strong>{c.name}</strong> ({c.issuer} {c.date && `• ${c.date}`})
                </span>
              ))}
            </div>
          </section>
        );

      default: {
        const custom = (resume?.customSections || []).find((c) => c.id === key);
        if (!custom || !custom.items || custom.items.length === 0) return null;
        return (
          <section key={custom.id} className="mb-4 resume-section-item">
            <h2 className="text-[11px] font-bold uppercase tracking-wider text-emerald-800 border-b border-emerald-200 pb-0.5 mb-2 flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 bg-emerald-600 rounded-full"></span> {custom.title}
            </h2>
            <div className="space-y-2.5">
              {custom.items.map((item, idx) => (
                <div key={item.id || idx} className="resume-section-item">
                  <div className="flex justify-between items-baseline">
                    <h3 className="text-xs font-bold text-slate-900">
                      {item.title}
                      {item.subtitle && (
                        <span className="text-[11px] font-medium text-emerald-700 ml-1.5">
                          ({item.subtitle})
                        </span>
                      )}
                    </h3>
                    {item.date && (
                      <span className="text-[10px] text-slate-500">{item.date}</span>
                    )}
                  </div>
                  {item.description && (
                    <p className="text-[11px] text-slate-600 mt-0.5 leading-snug">
                      {item.description}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </section>
        );
      }
    }
  };

  return (
    <article className="font-sans text-slate-800 text-xs leading-normal max-w-[800px] mx-auto">
      {sectionOrder.map((key) => renderSection(key))}
    </article>
  );
}
