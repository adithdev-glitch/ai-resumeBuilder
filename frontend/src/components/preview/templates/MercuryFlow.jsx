import React from 'react';

export default function MercuryFlow({ resume }) {
  const { personal = {}, summary = '', experience = [], education = [], projects = [], skills = [], certifications = [] } = resume || {};

  const initials = (personal.fullName || 'User')
    .split(' ')
    .map((n) => n[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();

  return (
    <article className="font-sans text-cv-slate-800 text-xs leading-normal max-w-[800px] mx-auto">
      {/* Centered Modern Header with Avatar / Monogram */}
      <header className="flex flex-col items-center text-center pb-6 border-b border-slate-200 mb-6">
        {personal.avatar ? (
          <img
            src={personal.avatar}
            alt={personal.fullName}
            className="w-16 h-16 rounded-full object-cover border border-slate-300 mb-2.5 shadow-sm"
          />
        ) : (
          <div className="w-14 h-14 rounded-full bg-slate-100 border border-slate-300 flex items-center justify-center text-sm font-bold text-slate-700 mb-2.5 shadow-sm">
            {initials}
          </div>
        )}
        <h1 className="text-2xl font-bold tracking-tight text-slate-900">
          {personal.fullName || 'Your Name'}
        </h1>
        {personal.jobTitle && (
          <p className="text-xs font-semibold uppercase tracking-wider text-slate-500 mt-0.5">
            {personal.jobTitle}
          </p>
        )}
        <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-1 text-[11px] text-slate-600 mt-2.5">
          {personal.email && (
            <a href={`mailto:${personal.email}`} className="hover:text-blue-600">
              {personal.email}
            </a>
          )}
          {personal.phone && <span>• {personal.phone}</span>}
          {personal.location && <span>• {personal.location}</span>}
          {personal.website && (
            <span>
              • <a href={`https://${personal.website}`} target="_blank" rel="noreferrer" className="hover:text-blue-600">{personal.website}</a>
            </span>
          )}
          {personal.linkedin && (
            <span>
              • <a href={`https://${personal.linkedin}`} target="_blank" rel="noreferrer" className="hover:text-blue-600">{personal.linkedin}</a>
            </span>
          )}
        </div>
      </header>

      {/* Summary */}
      {summary && (
        <section className="mb-6 text-center max-w-xl mx-auto">
          <h2 className="text-[11px] font-bold uppercase tracking-widest text-slate-400 mb-2">
            Summary
          </h2>
          <p className="text-[11.5px] text-slate-700 leading-relaxed">
            {summary}
          </p>
        </section>
      )}

      {/* Professional Experience with Distinct Left Date Column */}
      {experience.length > 0 && (
        <section className="mb-6">
          <div className="text-center mb-4">
            <h2 className="text-[11px] font-bold uppercase tracking-widest text-slate-900 inline-block border-b-2 border-slate-900 pb-0.5">
              Professional Experience
            </h2>
          </div>
          <div className="space-y-4">
            {experience.map((exp) => (
              <div key={exp.id || exp._id} className="grid grid-cols-12 gap-4">
                <div className="col-span-3 text-right text-[11px] text-slate-500 font-medium pt-0.5">
                  <div>{exp.startDate} – {exp.current ? 'Present' : exp.endDate}</div>
                  {exp.location && <div className="text-[10px] text-slate-400">{exp.location}</div>}
                </div>
                <div className="col-span-9 border-l border-slate-200 pl-4 space-y-1">
                  <h3 className="text-xs font-bold text-slate-900">
                    {exp.role} <span className="font-normal text-slate-600">— {exp.company}</span>
                  </h3>
                  {exp.bullets && exp.bullets.length > 0 && (
                    <ul className="list-disc list-outside ml-3.5 space-y-1 text-[11px] text-slate-700 leading-relaxed">
                      {exp.bullets.filter(Boolean).map((bullet, idx) => (
                        <li key={idx}>{bullet}</li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Education */}
      {education.length > 0 && (
        <section className="mb-6">
          <div className="text-center mb-3">
            <h2 className="text-[11px] font-bold uppercase tracking-widest text-slate-900 inline-block border-b-2 border-slate-900 pb-0.5">
              Education
            </h2>
          </div>
          <div className="space-y-3">
            {education.map((edu) => (
              <div key={edu.id || edu._id} className="grid grid-cols-12 gap-4">
                <div className="col-span-3 text-right text-[11px] text-slate-500 font-medium">
                  {edu.startDate} – {edu.endDate}
                </div>
                <div className="col-span-9 border-l border-slate-200 pl-4">
                  <h3 className="text-xs font-bold text-slate-900">{edu.school}</h3>
                  <p className="text-[11px] text-slate-600">
                    {edu.degree} {edu.gpa && `• GPA: ${edu.gpa}`}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Skills */}
      {skills.length > 0 && (
        <section className="mb-6">
          <div className="text-center mb-3">
            <h2 className="text-[11px] font-bold uppercase tracking-widest text-slate-900 inline-block border-b-2 border-slate-900 pb-0.5">
              Skills
            </h2>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-[11px] max-w-xl mx-auto">
            {skills.map((skillGroup, idx) => (
              <div key={idx} className="bg-slate-50 p-2.5 rounded border border-slate-100">
                <strong className="block text-slate-900 font-bold mb-1">{skillGroup.category}</strong>
                <p className="text-slate-600 leading-tight">
                  {Array.isArray(skillGroup.items) ? skillGroup.items.join(', ') : skillGroup.items}
                </p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Projects */}
      {projects.length > 0 && (
        <section className="mb-5">
          <div className="text-center mb-3">
            <h2 className="text-[11px] font-bold uppercase tracking-widest text-slate-900 inline-block border-b-2 border-slate-900 pb-0.5">
              Projects
            </h2>
          </div>
          <div className="space-y-2.5">
            {projects.map((proj) => (
              <div key={proj.id || proj._id} className="grid grid-cols-12 gap-4">
                <div className="col-span-3 text-right text-[11px] text-slate-500 font-medium">
                  {proj.technologies && <span>{proj.technologies}</span>}
                </div>
                <div className="col-span-9 border-l border-slate-200 pl-4">
                  <div className="flex justify-between font-bold text-slate-900 text-xs">
                    <span>{proj.name}</span>
                    {proj.link && <span className="text-[10px] text-blue-600 font-normal">{proj.link}</span>}
                  </div>
                  {proj.description && <p className="text-[11px] text-slate-600 mt-0.5 leading-snug">{proj.description}</p>}
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Certifications */}
      {certifications.length > 0 && (
        <section>
          <div className="text-center mb-2">
            <h2 className="text-[11px] font-bold uppercase tracking-widest text-slate-900 inline-block border-b-2 border-slate-900 pb-0.5">
              Certifications
            </h2>
          </div>
          <div className="flex flex-wrap justify-center gap-x-6 gap-y-1 text-[11px] text-slate-700">
            {certifications.map((c) => (
              <span key={c.id || c._id}>
                <strong>{c.name}</strong> — {c.issuer} {c.date && `(${c.date})`}
              </span>
            ))}
          </div>
        </section>
      )}
    </article>
  );
}
