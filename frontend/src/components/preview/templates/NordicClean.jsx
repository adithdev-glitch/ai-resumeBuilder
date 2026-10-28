import React from 'react';
import { normalizeSectionOrder } from '../../../utils/sectionOrder';

export default function NordicClean({ resume }) {
  const { personal = {}, summary = '', experience = [], education = [], projects = [], skills = [], certifications = [] } = resume || {};
  const sectionOrder = normalizeSectionOrder(resume?.sectionOrder);

  const renderSection = (key) => {
    switch (key) {
      case 'personal':
      return (
      <header key="personal" className="pb-5 mb-5 border-b border-stone-300">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-2">
          <div>
            <h1 className="text-3xl font-light tracking-tight text-stone-900">
              <span className="font-bold">{personal.fullName?.split(' ')[0] || 'Your'}</span>{' '}
              {personal.fullName?.split(' ').slice(1).join(' ') || 'Name'}
            </h1>
            {personal.jobTitle && (
              <p className="text-xs uppercase tracking-widest text-stone-500 font-medium mt-1">
                {personal.jobTitle}
              </p>
            )}
          </div>
          <div className="text-left sm:text-right text-[11px] text-stone-600 space-y-0.5">
            {personal.email && <div>{personal.email}</div>}
            <div>{personal.phone} {personal.location && `• ${personal.location}`}</div>
            {personal.linkedin && <div>{personal.linkedin}</div>}
          </div>
        </div>
      </header>
      );

      case 'summary':
      if (!summary) return null;
      return (
      <section key="summary" className="mb-5">
        <p className="text-[11.5px] text-stone-600 leading-relaxed font-light">
          {summary}
        </p>
      </section>
      );

                  case 'experience':
                  if (experience.length === 0) return null;
                  return (
                  <section key="experience" className="mb-5">
                    <h2 className="text-[11px] font-semibold uppercase tracking-widest text-stone-400 mb-3">
                      Work Experience
                    </h2>
                    <div className="space-y-4">
                      {experience.map((exp) => (
                <div key={exp.id || exp._id}>
                  <div className="flex justify-between items-baseline">
                    <h3 className="text-xs font-semibold text-stone-900">{exp.role}</h3>
                    <span className="text-[10px] text-stone-400 font-mono">
                      {exp.startDate} — {exp.current ? 'Present' : exp.endDate}
                    </span>
                  </div>
                  <div className="text-[11px] text-stone-500 mb-1">
                    {exp.company} {exp.location && `• ${exp.location}`}
                  </div>
                  {exp.bullets && exp.bullets.length > 0 && (
                    <ul className="list-disc list-outside ml-4 space-y-1 text-[11px] text-stone-700 leading-relaxed">
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
              <h2 className="text-[11px] font-semibold uppercase tracking-widest text-stone-400 mb-2.5">
                Education
              </h2>
              <div className="space-y-2">
                {education.map((edu) => (
                  <div key={edu.id || edu._id}>
                    <div className="flex justify-between font-semibold text-xs text-stone-900">
                      <span>{edu.school}</span>
                      <span className="text-[10px] text-stone-400 font-mono">{edu.endDate}</span>
                    </div>
                    <div className="text-[11px] text-stone-500">
                      {edu.degree} {edu.gpa && `• GPA: ${edu.gpa}`}
                    </div>
                  </div>
                ))}
              </div>
            </section>
            );

                case 'skills':
                if (skills.length === 0) return null;
                return (
                <section key="skills" className="mb-5">
                  <h2 className="text-[11px] font-semibold uppercase tracking-widest text-stone-400 mb-2.5">
                    Expertise & Skills
                  </h2>
                  <div className="space-y-1.5 text-[11px]">
                    {skills.map((grp, idx) => (
                      <div key={idx} className="flex gap-1.5">
                        <span className="font-semibold text-stone-800 min-w-[70px]">{grp.category}:</span>
                        <span className="text-stone-600">
                          {Array.isArray(grp.items) ? grp.items.join(', ') : grp.items}
                        </span>
                      </div>
                    ))}
                  </div>
                </section>
            );

                        case 'projects':
                        if (projects.length === 0) return null;
                        return (
                        <section key="projects" className="mb-4">
                          <h2 className="text-[11px] font-semibold uppercase tracking-widest text-stone-400 mb-2.5">
                            Selected Work & Projects
                          </h2>
                          <div className="space-y-2">
                            {projects.map((proj) => (
                              <div key={proj.id || proj._id} className="pb-2 border-b border-stone-100 last:border-b-0">
                                <div className="flex justify-between font-semibold text-xs text-stone-900">
                                  <span>{proj.name}</span>
                                  {proj.link && <span className="text-[10px] text-stone-400 font-normal">{proj.link}</span>}
                                </div>
                                {proj.technologies && <div className="text-[10px] text-stone-400 font-mono">{proj.technologies}</div>}
                                {proj.description && <p className="text-[11px] text-stone-600 mt-0.5 leading-snug">{proj.description}</p>}
                              </div>
              ))}
                </div>
              </section>
            );

            case 'certifications':
            if (certifications.length === 0) return null;
            return (
            <section key="certifications">
              <h2 className="text-[11px] font-semibold uppercase tracking-widest text-stone-400 mb-1.5">
                Certifications
              </h2>
              <div className="flex flex-wrap gap-x-4 gap-y-1 text-[11px] text-stone-600">
                {certifications.map((c) => (
                  <span key={c.id || c._id}>
                    {c.name} — <span className="text-stone-400">{c.issuer}</span>
                  </span>
                ))}
              </div>
            </section>
            );

            default:
            return null;
    }
  };

            return (
            <article className="font-sans text-stone-800 text-xs leading-normal max-w-[800px] mx-auto">
              {sectionOrder.map((key) => renderSection(key))}
            </article>
            );
}
