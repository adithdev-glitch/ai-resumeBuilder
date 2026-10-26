import React from 'react';

export default function CompactOnePage({ resume }) {
  const { personal = {}, summary = '', experience = [], education = [], projects = [], skills = [], certifications = [] } = resume || {};

  return (
    <article className="font-sans text-cv-slate-900 leading-tight text-[11px] max-w-[800px] mx-auto">
      {/* Header */}
      <header className="border-b-2 border-cv-slate-800 pb-2 mb-3">
        <div className="flex justify-between items-baseline">
          <div>
            <h1 className="text-2xl font-black uppercase tracking-tight text-cv-slate-900">
              {personal.fullName || 'Your Name'}
            </h1>
            {personal.jobTitle && (
              <p className="text-xs font-semibold text-cv-slate-700 tracking-wide uppercase">
                {personal.jobTitle}
              </p>
            )}
          </div>
          <div className="text-right text-[10px] text-cv-slate-600 space-y-0.5">
            <div>{personal.email} {personal.phone && `| ${personal.phone}`}</div>
            <div>{personal.location} {personal.website && `| ${personal.website}`} {personal.linkedin && `| ${personal.linkedin}`}</div>
          </div>
        </div>
      </header>

      {/* Summary */}
      {summary && (
        <section className="mb-2.5 resume-section-item">
          <p className="text-cv-slate-800 leading-snug">
            {summary}
          </p>
        </section>
      )}

      {/* Experience */}
      {experience.length > 0 && (
        <section className="mb-3 resume-section-item">
          <h2 className="text-[11px] font-bold uppercase tracking-wider text-cv-slate-900 border-b border-cv-slate-300 pb-0.5 mb-1.5">
            Experience
          </h2>
          <div className="space-y-2">
            {experience.map((exp) => (
              <div key={exp.id || exp._id} className="resume-section-item">
                <div className="flex justify-between font-bold text-cv-slate-900">
                  <span>{exp.role} — <span className="font-semibold text-cv-slate-700">{exp.company}</span></span>
                  <span className="font-medium text-cv-slate-600 text-[10px]">{exp.startDate} – {exp.current ? 'Present' : exp.endDate}</span>
                </div>
                {exp.bullets && exp.bullets.length > 0 && (
                  <ul className="list-disc list-outside ml-3.5 mt-0.5 space-y-0.5 text-cv-slate-700 leading-tight">
                    {exp.bullets.filter(Boolean).map((bullet, idx) => (
                      <li key={idx}>{bullet}</li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Education & Projects in 2-column or stacked compact */}
      <div className="grid grid-cols-2 gap-4 mb-3">
        {/* Education */}
        {education.length > 0 && (
          <section className="resume-section-item">
            <h2 className="text-[11px] font-bold uppercase tracking-wider text-cv-slate-900 border-b border-cv-slate-300 pb-0.5 mb-1.5">
              Education
            </h2>
            <div className="space-y-1.5">
              {education.map((edu) => (
                <div key={edu.id || edu._id} className="resume-section-item">
                  <div className="font-bold text-cv-slate-900">{edu.school}</div>
                  <div className="text-cv-slate-700 text-[10px]">{edu.degree}</div>
                  <div className="text-cv-slate-500 text-[10px]">{edu.startDate} – {edu.endDate} {edu.gpa && `| GPA: ${edu.gpa}`}</div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Key Projects */}
        {projects.length > 0 && (
          <section className="resume-section-item">
            <h2 className="text-[11px] font-bold uppercase tracking-wider text-cv-slate-900 border-b border-cv-slate-300 pb-0.5 mb-1.5">
              Projects
            </h2>
            <div className="space-y-1.5">
              {projects.map((proj) => (
                <div key={proj.id || proj._id} className="resume-section-item">
                  <div className="font-bold text-cv-slate-900 flex justify-between">
                    <span>{proj.name}</span>
                    {proj.link && <span className="text-[9px] text-cv-slate-500 font-normal">{proj.link}</span>}
                  </div>
                  {proj.description && (
                    <p className="text-[10px] text-cv-slate-700">{proj.description}</p>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}
      </div>

      {/* Skills */}
      {skills.length > 0 && (
        <section className="mb-2.5 resume-section-item">
          <h2 className="text-[11px] font-bold uppercase tracking-wider text-cv-slate-900 border-b border-cv-slate-300 pb-0.5 mb-1">
            Skills
          </h2>
          <div className="space-y-0.5 text-[10px]">
            {skills.map((skillGroup, idx) => (
              <div key={idx} className="flex gap-1.5">
                <span className="font-bold text-cv-slate-800 min-w-[70px]">{skillGroup.category}:</span>
                <span className="text-cv-slate-700">
                  {Array.isArray(skillGroup.items) ? skillGroup.items.join(', ') : skillGroup.items}
                </span>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Certifications */}
      {certifications.length > 0 && (
        <section className="resume-section-item">
          <h2 className="text-[11px] font-bold uppercase tracking-wider text-cv-slate-900 border-b border-cv-slate-300 pb-0.5 mb-1">
            Certifications
          </h2>
          <div className="flex flex-wrap gap-x-3 text-[10px] text-cv-slate-700">
            {certifications.map((cert) => (
              <span key={cert.id || cert._id}>
                <strong>{cert.name}</strong> ({cert.issuer}, {cert.date})
              </span>
            ))}
          </div>
        </section>
      )}
    </article>
  );
}
