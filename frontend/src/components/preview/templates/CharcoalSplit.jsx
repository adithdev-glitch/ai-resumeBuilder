import React from 'react';
import { normalizeSectionOrder } from '../../../utils/sectionOrder';

export default function CharcoalSplit({ resume }) {
  const { personal = {}, summary = '', experience = [], education = [], projects = [], skills = [], certifications = [] } = resume || {};
  const sectionOrder = normalizeSectionOrder(resume?.sectionOrder, resume?.customSections);

  const renderSection = (key) => {
    switch (key) {
      case 'personal':
        return (
          <header key="personal" className="bg-slate-900 text-white p-5 rounded-lg mb-5 shadow-sm">
            <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-2">
              <div>
                <h1 className="text-2xl font-bold tracking-tight text-white">
                  {personal.fullName || 'Your Name'}
                </h1>
                {personal.jobTitle && (
                  <p className="text-xs font-medium text-slate-300 tracking-wide uppercase mt-0.5">
                    {personal.jobTitle}
                  </p>
                )}
              </div>
              <div className="text-left sm:text-right text-[11px] text-slate-300 space-y-0.5">
                {personal.email && <div>{personal.email}</div>}
                {personal.phone && <div>{personal.phone} • {personal.location}</div>}
                {personal.linkedin && <div>{personal.linkedin}</div>}
              </div>
            </div>
          </header>
        );

      case 'summary':
        if (!summary) return null;
        return (
          <section key="summary" className="mb-5">
            <h2 className="text-[11px] font-bold uppercase tracking-wider text-slate-900 border-b-2 border-slate-900 pb-0.5 mb-1.5">
              Executive Summary
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
            <h2 className="text-[11px] font-bold uppercase tracking-wider text-slate-900 border-b-2 border-slate-900 pb-0.5 mb-3">
              Experience History
            </h2>
            <div className="space-y-4">
              {experience.map((exp) => (
                <div key={exp.id || exp._id}>
                  <div className="flex justify-between items-baseline">
                    <h3 className="text-xs font-bold text-slate-900">{exp.role}</h3>
                    <span className="text-[10.5px] font-medium text-slate-500">
                      {exp.startDate} – {exp.current ? 'Present' : exp.endDate}
                    </span>
                  </div>
                  <div className="flex justify-between text-[11px] text-slate-600 font-medium mb-1">
                    <span>{exp.company}</span>
                    {exp.location && <span className="font-normal text-slate-400">{exp.location}</span>}
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

      case 'education':
        if (education.length === 0) return null;
        return (
          <section key="education" className="mb-5">
            <h2 className="text-[11px] font-bold uppercase tracking-wider text-slate-900 border-b-2 border-slate-900 pb-0.5 mb-2">
              Education
            </h2>
            <div className="space-y-2">
              {education.map((edu) => (
                <div key={edu.id || edu._id}>
                  <div className="flex justify-between font-bold text-xs text-slate-900">
                    <span>{edu.school}</span>
                    <span className="text-[10px] text-slate-500 font-normal">{edu.endDate}</span>
                  </div>
                  <div className="text-[11px] text-slate-600">
                    {edu.degree} {edu.gpa && `• GPA: ${edu.gpa}`}
                  </div>
                </div>
              ))}
            </div>
          </section>
        );

      case 'projects':
        if (projects.length === 0) return null;
        return (
          <section key="projects" className="mb-5">
            <h2 className="text-[11px] font-bold uppercase tracking-wider text-slate-900 border-b-2 border-slate-900 pb-0.5 mb-2">
              Key Projects
            </h2>
            <div className="space-y-2.5">
              {projects.map((proj) => (
                <div key={proj.id || proj._id} className="border-l-2 border-slate-300 pl-3">
                  <div className="flex justify-between font-bold text-xs text-slate-900">
                    <span>{proj.name}</span>
                    {proj.link && <span className="font-normal text-[10px] text-blue-600">{proj.link}</span>}
                  </div>
                  {proj.technologies && <div className="text-[10.5px] text-slate-500 italic">{proj.technologies}</div>}
                  {proj.description && <p className="text-[11px] text-slate-600 mt-0.5 leading-snug">{proj.description}</p>}
                </div>
              ))}
            </div>
          </section>
        );

      case 'skills':
        if (skills.length === 0) return null;
        return (
          <section key="skills" className="mb-5">
            <h2 className="text-[11px] font-bold uppercase tracking-wider text-slate-900 border-b-2 border-slate-900 pb-0.5 mb-2">
              Technical & Soft Skills
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[11px]">
              {skills.map((grp, idx) => (
                <div key={idx} className="bg-slate-50 p-2 rounded border border-slate-200">
                  <span className="font-bold text-slate-900 block mb-0.5">{grp.category}</span>
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
          <section key="certifications" className="mb-5">
            <h2 className="text-[11px] font-bold uppercase tracking-wider text-slate-900 border-b-2 border-slate-900 pb-0.5 mb-2">
              Certificates & Honors
            </h2>
            <div className="space-y-2 text-[11px]">
              {certifications.map((c) => (
                <div key={c.id || c._id} className="flex justify-between">
                  <strong className="text-slate-800">{c.name}</strong>
                  <span className="text-[10px] text-slate-500">{c.issuer}</span>
                </div>
              ))}
            </div>
          </section>
        );

      default: {
        const custom = (resume?.customSections || []).find((c) => c.id === key);
        if (!custom || !custom.items || custom.items.length === 0) return null;
        return (
          <section key={custom.id} className="mb-5 resume-section-item">
            <h2 className="text-[11px] font-bold uppercase tracking-wider text-slate-900 border-b-2 border-slate-900 pb-0.5 mb-2">
              {custom.title}
            </h2>
            <div className="space-y-3">
              {custom.items.map((item, idx) => (
                <div key={item.id || idx} className="resume-section-item">
                  <div className="flex justify-between items-baseline">
                    <h3 className="text-xs font-bold text-slate-900">
                      {item.title}
                      {item.subtitle && (
                        <span className="text-[11px] font-normal text-slate-500 ml-2">
                          ({item.subtitle})
                        </span>
                      )}
                    </h3>
                    {item.date && (
                      <span className="text-[10.5px] font-medium text-slate-500">
                        {item.date}
                      </span>
                    )}
                  </div>
                  {item.description && (
                    <p className="text-[11px] text-slate-600 mt-0.5 leading-relaxed">
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
