import React from 'react';
import { normalizeSectionOrder } from '../../../utils/sectionOrder';

export default function ClassicSerif({ resume }) {
  const { personal = {}, summary = '', experience = [], education = [], projects = [], skills = [], certifications = [] } = resume || {};
  const sectionOrder = normalizeSectionOrder(resume?.sectionOrder);

  const renderSection = (key) => {
    switch (key) {
      case 'personal':
      return (
      <header key="personal" className="border-b border-cv-slate-300 pb-5 mb-6 text-center">
        <h1 className="text-3xl font-bold tracking-tight text-cv-slate-900 font-serif">
          {personal.fullName || 'Your Name'}
        </h1>
        {personal.jobTitle && (
          <p className="text-base text-cv-slate-700 italic mt-1 font-serif">
            {personal.jobTitle}
          </p>
        )}
        <div className="flex flex-wrap items-center justify-center gap-x-3 gap-y-1 text-xs text-cv-slate-600 mt-3 font-sans">
          {personal.email && (
            <a href={`mailto:${personal.email}`} className="hover:underline">
              {personal.email}
            </a>
          )}
          {personal.phone && <span>• {personal.phone}</span>}
          {personal.location && <span>• {personal.location}</span>}
          {personal.website && (
            <span>
              • <a href={`https://${personal.website}`} target="_blank" rel="noreferrer" className="hover:underline">{personal.website}</a>
            </span>
          )}
          {personal.linkedin && (
            <span>
              • <a href={`https://${personal.linkedin}`} target="_blank" rel="noreferrer" className="hover:underline">{personal.linkedin}</a>
            </span>
          )}
        </div>
      </header>
      );

      case 'summary':
      if (!summary) return null;
      return (
      <section key="summary" className="mb-6 resume-section-item">
        <h2 className="text-sm font-bold uppercase tracking-widest text-cv-slate-900 border-b border-cv-slate-200 pb-1 mb-2 font-sans">
          Professional Summary
        </h2>
        <p className="text-sm text-cv-slate-800 leading-relaxed text-justify">
          {summary}
        </p>
      </section>
      );

                  case 'experience':
                  if (experience.length === 0) return null;
                  return (
                  <section key="experience" className="mb-6 resume-section-item">
                    <h2 className="text-sm font-bold uppercase tracking-widest text-cv-slate-900 border-b border-cv-slate-200 pb-1 mb-3 font-sans">
                      Work Experience
                    </h2>
                    <div className="space-y-4">
                      {experience.map((exp) => (
                <div key={exp.id || exp._id} className="resume-section-item">
                  <div className="flex justify-between items-baseline">
                    <h3 className="text-base font-bold text-cv-slate-900 font-serif">
                      {exp.role || 'Position Title'}
                    </h3>
                    <span className="text-xs text-cv-slate-600 font-sans">
                      {exp.startDate} – {exp.current ? 'Present' : exp.endDate}
                    </span>
                  </div>
                  <div className="flex justify-between items-baseline text-xs text-cv-slate-700 italic mb-1.5 font-serif">
                    <span>{exp.company}</span>
                    {exp.location && <span className="not-italic text-cv-slate-500 font-sans">{exp.location}</span>}
                  </div>
                  {exp.bullets && exp.bullets.length > 0 && (
                    <ul className="list-disc list-outside ml-4 space-y-1 text-xs text-cv-slate-800 leading-normal">
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
                  <section key="education" className="mb-6 resume-section-item">
                    <h2 className="text-sm font-bold uppercase tracking-widest text-cv-slate-900 border-b border-cv-slate-200 pb-1 mb-3 font-sans">
                      Education
                    </h2>
                    <div className="space-y-3">
                      {education.map((edu) => (
                <div key={edu.id || edu._id} className="resume-section-item">
                  <div className="flex justify-between items-baseline">
                    <h3 className="text-sm font-bold text-cv-slate-900 font-serif">
                      {edu.school}
                    </h3>
                    <span className="text-xs text-cv-slate-600 font-sans">
                      {edu.startDate} – {edu.endDate}
                    </span>
                  </div>
                  <div className="text-xs text-cv-slate-700 italic font-serif">
                    {edu.degree} {edu.gpa && <span className="not-italic font-sans text-cv-slate-500">• GPA: {edu.gpa}</span>}
                  </div>
                </div>
              ))}
          </div>
        </section>
      );

                        case 'projects':
                        if (projects.length === 0) return null;
                        return (
                        <section key="projects" className="mb-6 resume-section-item">
                          <h2 className="text-sm font-bold uppercase tracking-widest text-cv-slate-900 border-b border-cv-slate-200 pb-1 mb-3 font-sans">
                            Projects
                          </h2>
                          <div className="space-y-3">
                            {projects.map((proj) => (
                              <div key={proj.id || proj._id} className="resume-section-item">
                                <div className="flex justify-between items-baseline">
                                  <h3 className="text-sm font-bold text-cv-slate-900 font-serif">
                                    {proj.name}
                                    {proj.technologies && (
                                      <span className="text-xs font-normal text-cv-slate-600 italic ml-2">
                                        ({proj.technologies})
                                      </span>
                                    )}
                                  </h3>
                                  {proj.link && (
                                    <span className="text-xs text-cv-slate-600 font-sans">
                                      {proj.link}
                                    </span>
                                  )}
                  </div>
                  {
                                proj.description && (
                                  <p className="text-xs text-cv-slate-800 mt-1 leading-normal">
                                    {proj.description}
                                  </p>
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
            <section key="skills" className="mb-6 resume-section-item">
              <h2 className="text-sm font-bold uppercase tracking-widest text-cv-slate-900 border-b border-cv-slate-200 pb-1 mb-2 font-sans">
                Skills & Competencies
              </h2>
              <div className="space-y-1.5 text-xs text-cv-slate-800">
                {skills.map((skillGroup, idx) => (
                  <div key={idx} className="flex flex-wrap items-baseline gap-1">
                    <strong className="font-semibold text-cv-slate-900 font-sans min-w-[90px]">
                      {skillGroup.category}:
                    </strong>
                    <span className="font-serif">
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
              <h2 className="text-sm font-bold uppercase tracking-widest text-cv-slate-900 border-b border-cv-slate-200 pb-1 mb-2 font-sans">
                Certifications
              </h2>
              <ul className="list-disc list-outside ml-4 space-y-1 text-xs text-cv-slate-800">
                {certifications.map((cert) => (
                  <li key={cert.id || cert._id}>
                    <strong>{cert.name}</strong> – {cert.issuer} {cert.date && `(${cert.date})`}
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
            <article className="font-serif text-cv-slate-900 leading-relaxed max-w-[800px] mx-auto">
              {sectionOrder.map((key) => renderSection(key))}
            </article>
            );
}
