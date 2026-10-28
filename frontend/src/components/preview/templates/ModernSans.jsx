import React from 'react';
import { normalizeSectionOrder } from '../../../utils/sectionOrder';

export default function ModernSans({ resume }) {
  const { personal = {}, summary = '', experience = [], education = [], projects = [], skills = [], certifications = [] } = resume || {};
  const sectionOrder = normalizeSectionOrder(resume?.sectionOrder, resume?.customSections);

  const renderSection = (key) => {
    switch (key) {
      case 'personal':
        return (
          <header key="personal" className="mb-6">
            <h1 className="text-3xl font-extrabold tracking-tight text-cv-slate-900">
              {personal.fullName || 'Your Name'}
            </h1>
            {personal.jobTitle && (
              <p className="text-base font-medium text-cv-blue-600 mt-0.5">
                {personal.jobTitle}
              </p>
            )}
            <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-cv-slate-600 mt-2.5">
              {personal.email && (
                <a href={`mailto:${personal.email}`} className="hover:text-cv-blue">
                  {personal.email}
                </a>
              )}
              {personal.phone && <span>{personal.phone}</span>}
              {personal.location && <span>{personal.location}</span>}
              {personal.website && (
                <a href={`https://${personal.website}`} target="_blank" rel="noreferrer" className="hover:text-cv-blue font-medium">
                  {personal.website}
                </a>
              )}
              {personal.linkedin && (
                <a href={`https://${personal.linkedin}`} target="_blank" rel="noreferrer" className="hover:text-cv-blue">
                  {personal.linkedin}
                </a>
              )}
            </div>
          </header>
        );

      case 'summary':
        if (!summary) return null;
        return (
          <section key="summary" className="mb-5 resume-section-item">
            <h2 className="text-xs font-bold uppercase tracking-wider text-cv-slate-500 border-b-2 border-cv-slate-200 pb-1 mb-2">
              Summary
            </h2>
            <p className="text-xs text-cv-slate-700 leading-relaxed">
              {summary}
            </p>
          </section>
        );

      case 'experience':
        if (experience.length === 0) return null;
        return (
          <section key="experience" className="mb-5 resume-section-item">
            <h2 className="text-xs font-bold uppercase tracking-wider text-cv-slate-500 border-b-2 border-cv-slate-200 pb-1 mb-3">
              Experience
            </h2>
            <div className="space-y-4">
              {experience.map((exp) => (
                <div key={exp.id || exp._id} className="resume-section-item">
                  <div className="flex justify-between items-baseline">
                    <h3 className="text-sm font-bold text-cv-slate-900">
                      {exp.role} <span className="font-normal text-cv-slate-600">at {exp.company}</span>
                    </h3>
                    <span className="text-xs font-medium text-cv-slate-500">
                      {exp.startDate} – {exp.current ? 'Present' : exp.endDate}
                    </span>
                  </div>
                  {exp.location && (
                    <p className="text-[11px] text-cv-slate-500 mb-1.5">{exp.location}</p>
                  )}
                  {exp.bullets && exp.bullets.length > 0 && (
                    <ul className="list-disc list-outside ml-4 space-y-1 text-xs text-cv-slate-700 leading-normal">
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
          <section key="education" className="mb-5 resume-section-item">
            <h2 className="text-xs font-bold uppercase tracking-wider text-cv-slate-500 border-b-2 border-cv-slate-200 pb-1 mb-2.5">
              Education
            </h2>
            <div className="space-y-2">
              {education.map((edu) => (
                <div key={edu.id || edu._id} className="flex justify-between items-baseline resume-section-item">
                  <div>
                    <h3 className="text-xs font-bold text-cv-slate-900">{edu.school}</h3>
                    <p className="text-xs text-cv-slate-700">{edu.degree} {edu.gpa && `• GPA: ${edu.gpa}`}</p>
                  </div>
                  <span className="text-xs text-cv-slate-500">{edu.startDate} – {edu.endDate}</span>
                </div>
              ))}
            </div>
          </section>
        );

      case 'projects':
        if (projects.length === 0) return null;
        return (
          <section key="projects" className="mb-5 resume-section-item">
            <h2 className="text-xs font-bold uppercase tracking-wider text-cv-slate-500 border-b-2 border-cv-slate-200 pb-1 mb-2.5">
              Key Projects
            </h2>
            <div className="space-y-2.5">
              {projects.map((proj) => (
                <div key={proj.id || proj._id} className="resume-section-item">
                  <div className="flex justify-between items-baseline">
                    <h3 className="text-xs font-bold text-cv-slate-900">
                      {proj.name}
                      {proj.technologies && (
                        <span className="font-normal text-cv-slate-500 text-[11px] ml-2">
                          [{proj.technologies}]
                        </span>
                      )}
                    </h3>
                    {proj.link && (
                      <span className="text-xs text-cv-blue-600 hover:underline">{proj.link}</span>
                    )}
                  </div>
                  {
                    proj.description && (
                      <p className="text-xs text-cv-slate-700 mt-0.5">{proj.description}</p>
                    )
                  }
                </div>
              ))}
            </div>
          </section>
        );

      case 'skills':
        if (skills.length === 0) return null;
        return (
          <section key="skills" className="mb-5 resume-section-item">
            <h2 className="text-xs font-bold uppercase tracking-wider text-cv-slate-500 border-b-2 border-cv-slate-200 pb-1 mb-2">
              Skills
            </h2>
            <div className="space-y-1 text-xs">
              {skills.map((skillGroup, idx) => (
                <div key={idx} className="flex gap-2">
                  <span className="font-semibold text-cv-slate-800 min-w-[90px]">{skillGroup.category}:</span>
                  <span className="text-cv-slate-700">
                    {Array.isArray(skillGroup.items) ? skillGroup.items.join(', ') : skillGroup.items}
                  </span>
                </div>
              ))}
            </div>
          </section>
        );

      case 'certifications':
        if (certifications.length === 0) return null;
        return (
          <section key="certifications" className="resume-section-item">
            <h2 className="text-xs font-bold uppercase tracking-wider text-cv-slate-500 border-b-2 border-cv-slate-200 pb-1 mb-2">
              Certifications
            </h2>
            <div className="space-y-1 text-xs text-cv-slate-700">
              {certifications.map((cert) => (
                <div key={cert.id || cert._id}>
                  <span className="font-semibold text-cv-slate-900">{cert.name}</span> – {cert.issuer} {cert.date && `(${cert.date})`}
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
            <h2 className="text-xs font-bold uppercase tracking-wider text-cv-slate-500 border-b-2 border-cv-slate-200 pb-1 mb-3">
              {custom.title}
            </h2>
            <div className="space-y-3">
              {custom.items.map((item, idx) => (
                <div key={item.id || idx} className="resume-section-item">
                  <div className="flex justify-between items-baseline">
                    <h3 className="text-xs font-bold text-cv-slate-900">
                      {item.title}
                      {item.subtitle && (
                        <span className="text-xs font-normal text-cv-slate-600 italic ml-2">
                          ({item.subtitle})
                        </span>
                      )}
                    </h3>
                    {item.date && (
                      <span className="text-[11px] text-cv-slate-500">{item.date}</span>
                    )}
                  </div>
                  {item.description && (
                    <p className="text-xs text-cv-slate-700 mt-0.5 leading-relaxed">
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
    <article className="font-sans text-cv-slate-900 leading-normal max-w-[800px] mx-auto">
      {sectionOrder.map((key) => renderSection(key))}
    </article>
  );
}
