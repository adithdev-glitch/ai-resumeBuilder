import React from 'react';
import { normalizeSectionOrder } from '../../../utils/sectionOrder';

export default function TechExecutive({ resume }) {
  const { personal = {}, summary = '', experience = [], education = [], projects = [], skills = [], certifications = [] } = resume || {};
  const sectionOrder = normalizeSectionOrder(resume?.sectionOrder);

  const renderSection = (key) => {
    switch (key) {
      case 'personal':
            return (
            <header key="personal" className="pb-4 mb-4 border-b-2 border-indigo-600">
              <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-1">
                <div>
                  <h1 className="text-2xl font-extrabold tracking-tight text-slate-900">
                    {personal.fullName || 'Your Name'}
                  </h1>
                  {personal.jobTitle && (
                    <p className="text-sm font-semibold text-indigo-600 mt-0.5">
                      {personal.jobTitle}
                    </p>
                  )}
                </div>
                  <div className="text-left sm:text-right text-[11px] text-slate-600 space-y-0.5 font-mono">
                    {personal.email && (
                      <div>
                        <a href={`mailto:${personal.email}`} className="text-slate-800 hover:text-indigo-600">
                          {personal.email}
                        </a>
                      </div>
                    )}
                    <div>
                      {personal.phone && <span>{personal.phone}</span>}
                      {personal.location && <span> • {personal.location}</span>}
                    </div>
                    <div className="space-x-2 text-indigo-600">
                      {personal.github && (
                        <a href={`https://${personal.github}`} target="_blank" rel="noreferrer" className="hover:underline">
                          {personal.github}
                        </a>
                      )}
                      {personal.linkedin && (
                        <a href={`https://${personal.linkedin}`} target="_blank" rel="noreferrer" className="hover:underline">
                          {personal.linkedin}
                        </a>
                      )}
                    </div>
                  </div>
                </div>
    </header>
  );

      case 'summary':
  if (!summary) return null;
  return (
    <section key="summary" className="mb-4">
      <p className="text-[11.5px] text-slate-700 leading-relaxed bg-slate-50 p-2.5 rounded border border-slate-200">
        {summary}
      </p>
    </section>
  );

                case 'skills':
                if (skills.length === 0) return null;
                return (
                <section key="skills" className="mb-4">
                  <h2 className="text-[11px] font-bold uppercase tracking-wider text-slate-700 border-b border-slate-200 pb-1 mb-2 font-mono flex items-center gap-1.5">
                    <span className="w-2 h-2 bg-indigo-600 rounded-sm"></span> Core Technical Skills
                  </h2>
                  <div className="space-y-1.5 text-[11px]">
                    {skills.map((grp, idx) => (
                      <div key={idx} className="flex flex-wrap items-center gap-1.5">
                        <span className="font-semibold text-slate-900 min-w-[90px] font-mono text-[10.5px]">
                          {grp.category}:
                        </span>
                        <div className="flex flex-wrap gap-1">
                          {(Array.isArray(grp.items) ? grp.items : grp.items.split(',')).map((item, i) => (
                            <span key={i} className="px-1.5 py-0.5 bg-indigo-50 text-indigo-700 rounded text-[10.5px] font-medium border border-indigo-100">
                              {typeof item === 'string' ? item.trim() : item}
                            </span>
                          ))}
                        </div>
                      </div>
              ))}
        </div>
      </section>
    );

                  case 'experience':
                  if (experience.length === 0) return null;
                  return (
                  <section key="experience" className="mb-4">
                    <h2 className="text-[11px] font-bold uppercase tracking-wider text-slate-700 border-b border-slate-200 pb-1 mb-3 font-mono flex items-center gap-1.5">
                      <span className="w-2 h-2 bg-indigo-600 rounded-sm"></span> Engineering & Work Experience
                    </h2>
                    <div className="space-y-3.5">
                      {experience.map((exp) => (
                        <div key={exp.id || exp._id}>
                          <div className="flex justify-between items-baseline">
                            <h3 className="text-xs font-bold text-slate-900">
                              {exp.role} <span className="font-semibold text-indigo-700">@ {exp.company}</span>
                            </h3>
                            <span className="text-[10.5px] font-mono text-slate-500">
                              {exp.startDate} – {exp.current ? 'Present' : exp.endDate}
                            </span>
                          </div>
                          {exp.location && <div className="text-[10px] text-slate-500 mb-1">{exp.location}</div>}
                          {exp.bullets && exp.bullets.length > 0 && (
                            <ul className="list-disc list-outside ml-4 space-y-1 text-[11px] text-slate-700 leading-normal">
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
                    <section key="projects" className="mb-4">
                      <h2 className="text-[11px] font-bold uppercase tracking-wider text-slate-700 border-b border-slate-200 pb-1 mb-2.5 font-mono flex items-center gap-1.5">
                        <span className="w-2 h-2 bg-indigo-600 rounded-sm"></span> Featured Engineering Projects
                      </h2>
                      <div className="space-y-2.5">
                        {projects.map((proj) => (
                          <div key={proj.id || proj._id} className="bg-slate-50/70 p-2.5 rounded border border-slate-200">
                            <div className="flex justify-between items-baseline font-bold text-xs text-slate-900">
                              <span>{proj.name}</span>
                              {proj.link && (
                                <a href={`https://${proj.link}`} target="_blank" rel="noreferrer" className="text-[10.5px] font-mono text-indigo-600 hover:underline">
                                  {proj.link}
                                </a>
                              )}
                            </div>
                            {proj.technologies && (
                              <div className="text-[10.5px] font-mono text-slate-500 mt-0.5">
                                Stack: {proj.technologies}
                              </div>
                            )}
                            {proj.description && (
                              <p className="text-[11px] text-slate-700 mt-1 leading-snug">
                                {proj.description}
                              </p>
                            )}
                          </div>
              ))}
            </div>
          </section>
        );

              case 'education':
              if (education.length === 0) return null;
              return (
              <section key="education" className="mb-4">
                <h2 className="text-[11px] font-bold uppercase tracking-wider text-slate-700 border-b border-slate-200 pb-1 mb-2 font-mono">
                  Education
                </h2>
                <div className="space-y-2">
                  {education.map((edu) => (
                    <div key={edu.id || edu._id}>
                      <div className="flex justify-between text-xs font-bold text-slate-900">
                        <span>{edu.school}</span>
                        <span className="text-[10.5px] font-mono text-slate-500">{edu.endDate}</span>
                      </div>
                      <div className="text-[11px] text-slate-600">
                        {edu.degree} {edu.gpa && `• GPA: ${edu.gpa}`}
                      </div>
                    </div>
                  ))}
                </div>
              </section>
              );

                  case 'certifications':
                  if (certifications.length === 0) return null;
                  return (
                  <section key="certifications" className="mb-4">
                    <h2 className="text-[11px] font-bold uppercase tracking-wider text-slate-700 border-b border-slate-200 pb-1 mb-2 font-mono">
                      Certifications
                    </h2>
                    <ul className="space-y-1.5 text-[11px] text-slate-800">
                      {certifications.map((c) => (
                        <li key={c.id || c._id} className="flex justify-between">
                          <strong>{c.name}</strong>
                          <span className="text-[10.5px] text-slate-500 font-mono">{c.issuer}</span>
                        </li>
                      ))}
                    </ul>
                  </section>
              );

              default:
              return null;
    }
  };

              return (
              <article className="font-sans text-slate-900 text-xs leading-normal max-w-[800px] mx-auto">
                {sectionOrder.map((key) => renderSection(key))}
              </article>
              );
}
