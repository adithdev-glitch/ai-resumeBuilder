import React from 'react';
import { normalizeSectionOrder } from '../../../utils/sectionOrder';

export default function IvyLeagueATS({ resume }) {
  const { personal = {}, summary = '', experience = [], education = [], projects = [], skills = [], certifications = [] } = resume || {};
  const sectionOrder = normalizeSectionOrder(resume?.sectionOrder, resume?.customSections);

  const renderSection = (key) => {
    switch (key) {
      case 'personal':
        return (
          <header key="personal" className="text-center pb-3 mb-4 border-b-2 border-black">
            <h1 className="text-2xl font-bold tracking-wider uppercase text-black">
              {personal.fullName || 'Your Name'}
            </h1>
            {personal.jobTitle && (
              <p className="text-xs italic text-gray-700 mt-0.5">
                {personal.jobTitle}
              </p>
            )}
            <div className="flex flex-wrap items-center justify-center gap-x-2 text-[11px] text-gray-800 mt-1.5 font-sans">
              {personal.location && <span>{personal.location}</span>}
              {personal.phone && <span>| {personal.phone}</span>}
              {personal.email && (
                <span>
                  | <a href={`mailto:${personal.email}`} className="hover:underline">{personal.email}</a>
                </span>
              )}
              {personal.linkedin && (
                <span>
                  | <a href={`https://${personal.linkedin}`} target="_blank" rel="noreferrer" className="hover:underline">{personal.linkedin}</a>
                </span>
              )}
              {personal.website && (
                <span>
                  | <a href={`https://${personal.website}`} target="_blank" rel="noreferrer" className="hover:underline">{personal.website}</a>
                </span>
              )}
            </div>
          </header>
        );

      case 'summary':
        if (!summary) return null;
        return (
          <section key="summary" className="mb-4">
            <h2 className="text-[11px] font-bold uppercase tracking-wider text-black border-b border-black pb-0.5 mb-1.5 font-sans">
              Professional Summary
            </h2>
            <p className="text-[11px] text-gray-900 leading-relaxed text-justify">
              {summary}
            </p>
          </section>
        );

      case 'education':
        if (education.length === 0) return null;
        return (
          <section key="education" className="mb-4">
            <h2 className="text-[11px] font-bold uppercase tracking-wider text-black border-b border-black pb-0.5 mb-1.5 font-sans">
              Education
            </h2>
            <div className="space-y-2">
              {education.map((edu) => (
                <div key={edu.id || edu._id}>
                  <div className="flex justify-between font-bold text-black text-xs">
                    <span>{edu.school}</span>
                    <span className="font-normal text-[11px] font-sans">{edu.location || 'USA'}</span>
                  </div>
                  <div className="flex justify-between text-[11px] italic text-gray-800">
                    <span>{edu.degree}</span>
                    <span className="not-italic font-sans text-[10.5px]">{edu.startDate} – {edu.endDate}</span>
                  </div>
                  {edu.gpa && <div className="text-[10px] text-gray-600 font-sans">Honors / GPA: {edu.gpa}</div>}
                </div>
              ))}
            </div>
          </section>
        );

      case 'experience':
        if (experience.length === 0) return null;
        return (
          <section key="experience" className="mb-4">
            <h2 className="text-[11px] font-bold uppercase tracking-wider text-black border-b border-black pb-0.5 mb-1.5 font-sans">
              Professional Experience
            </h2>
            <div className="space-y-3">
              {experience.map((exp) => (
                <div key={exp.id || exp._id}>
                  <div className="flex justify-between font-bold text-black text-xs">
                    <span>{exp.company}</span>
                    <span className="font-normal text-[11px] font-sans">{exp.location}</span>
                  </div>
                  <div className="flex justify-between text-[11px] italic text-gray-800 mb-1">
                    <span>{exp.role}</span>
                    <span className="not-italic font-sans text-[10.5px]">
                      {exp.startDate} – {exp.current ? 'Present' : exp.endDate}
                    </span>
                  </div>
                  {exp.bullets && exp.bullets.length > 0 && (
                    <ul className="list-disc list-outside ml-4 space-y-0.5 text-[11px] text-gray-900 leading-normal">
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
            <h2 className="text-[11px] font-bold uppercase tracking-wider text-black border-b border-black pb-0.5 mb-1.5 font-sans">
              Key Projects
            </h2>
            <div className="space-y-2">
              {projects.map((proj) => (
                <div key={proj.id || proj._id}>
                  <div className="flex justify-between text-xs font-bold text-black">
                    <span>{proj.name} {proj.technologies && <span className="font-normal italic text-gray-600 text-[10.5px]">({proj.technologies})</span>}</span>
                    {proj.link && <span className="font-normal text-[10px] font-sans text-gray-600">{proj.link}</span>}
                  </div>
                  {proj.description && <p className="text-[11px] text-gray-800 mt-0.5 leading-snug">{proj.description}</p>}
                </div>
              ))}
            </div>
          </section>
        );

      case 'skills':
        if (skills.length === 0) return null;
        return (
          <section key="skills" className="mb-3">
            <h2 className="text-[11px] font-bold uppercase tracking-wider text-black border-b border-black pb-0.5 mb-1.5 font-sans">
              Skills & Interests
            </h2>
            <div className="space-y-1 text-[11px] text-gray-900">
              {skills.map((grp, idx) => (
                <div key={idx} className="flex gap-2">
                  <strong className="font-semibold text-black min-w-[90px] font-sans">{grp.category}:</strong>
                  <span>{Array.isArray(grp.items) ? grp.items.join(', ') : grp.items}</span>
                </div>
              ))}
            </div>
          </section>
        );

      case 'certifications':
        if (certifications.length === 0) return null;
        return (
          <section key="certifications">
            <h2 className="text-[11px] font-bold uppercase tracking-wider text-black border-b border-black pb-0.5 mb-1 font-sans">
              Certifications & Accreditations
            </h2>
            <ul className="list-disc list-outside ml-4 text-[11px] text-gray-900 space-y-0.5">
              {certifications.map((c) => (
                <li key={c.id || c._id}>
                  <strong>{c.name}</strong> — {c.issuer} {c.date && `(${c.date})`}
                </li>
              ))}
            </ul>
          </section>
        );

      default: {
        const custom = (resume?.customSections || []).find((c) => c.id === key);
        if (!custom || !custom.items || custom.items.length === 0) return null;
        return (
          <section key={custom.id} className="mb-3 resume-section-item">
            <h2 className="text-[11px] font-bold uppercase tracking-wider text-black border-b border-black pb-0.5 mb-1.5 font-sans">
              {custom.title}
            </h2>
            <div className="space-y-2">
              {custom.items.map((item, idx) => (
                <div key={item.id || idx} className="resume-section-item">
                  <div className="flex justify-between items-baseline font-serif">
                    <strong className="text-black text-xs font-bold">
                      {item.title}
                      {item.subtitle && (
                        <span className="font-normal italic text-gray-700 ml-1.5">
                          ({item.subtitle})
                        </span>
                      )}
                    </strong>
                    {item.date && (
                      <span className="text-[10.5px] font-sans text-gray-600">{item.date}</span>
                    )}
                  </div>
                  {item.description && (
                    <p className="text-[11px] text-gray-800 leading-normal mt-0.5">
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
    <article className="font-serif text-[#111827] text-xs leading-normal max-w-[800px] mx-auto">
      {sectionOrder.map((key) => renderSection(key))}
    </article>
  );
}
