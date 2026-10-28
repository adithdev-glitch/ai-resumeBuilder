import React from 'react';

export default function ElegantSerif({ resume }) {
  const { personal = {}, summary = '', experience = [], education = [], projects = [], skills = [], certifications = [] } = resume || {};

  return (
    <article className="font-serif text-[#222] text-xs leading-relaxed max-w-[800px] mx-auto">
      {/* Editorial Header */}
      <header className="border-t-4 border-b border-[#333] py-4 mb-5 text-center">
        <h1 className="text-3xl font-normal tracking-wide text-black uppercase font-serif">
          {personal.fullName || 'Your Name'}
        </h1>
        {personal.jobTitle && (
          <p className="text-xs uppercase tracking-widest text-gray-600 mt-1 font-sans font-medium">
            {personal.jobTitle}
          </p>
        )}
        <div className="flex flex-wrap items-center justify-center gap-x-3 text-[11px] text-gray-600 mt-2 font-sans">
          {personal.location && <span>{personal.location}</span>}
          {personal.phone && <span>• {personal.phone}</span>}
          {personal.email && (
            <span>
              • <a href={`mailto:${personal.email}`} className="hover:underline">{personal.email}</a>
            </span>
          )}
          {personal.linkedin && (
            <span>
              • <a href={`https://${personal.linkedin}`} target="_blank" rel="noreferrer" className="hover:underline">{personal.linkedin}</a>
            </span>
          )}
        </div>
      </header>

      {/* Summary */}
      {summary && (
        <section className="mb-5">
          <h2 className="text-[11px] font-bold uppercase tracking-widest text-[#333] border-b border-gray-300 pb-0.5 mb-1.5 font-sans">
            Executive Profile
          </h2>
          <p className="text-[11.5px] text-gray-800 leading-relaxed italic text-justify">
            "{summary}"
          </p>
        </section>
      )}

      {/* Experience */}
      {experience.length > 0 && (
        <section className="mb-5">
          <h2 className="text-[11px] font-bold uppercase tracking-widest text-[#333] border-b border-gray-300 pb-0.5 mb-3 font-sans">
            Career History
          </h2>
          <div className="space-y-4">
            {experience.map((exp) => (
              <div key={exp.id || exp._id}>
                <div className="flex justify-between items-baseline">
                  <h3 className="text-sm font-bold text-black font-serif">{exp.role}</h3>
                  <span className="text-[10.5px] text-gray-600 font-sans">
                    {exp.startDate} — {exp.current ? 'Present' : exp.endDate}
                  </span>
                </div>
                <div className="flex justify-between text-xs italic text-gray-700 mb-1">
                  <span>{exp.company}</span>
                  {exp.location && <span className="not-italic text-[10.5px] text-gray-500 font-sans">{exp.location}</span>}
                </div>
                {exp.bullets && exp.bullets.length > 0 && (
                  <ul className="list-disc list-outside ml-4 space-y-1 text-[11px] text-gray-800 leading-normal">
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

      {/* Education */}
      {education.length > 0 && (
        <section className="mb-5">
          <h2 className="text-[11px] font-bold uppercase tracking-widest text-[#333] border-b border-gray-300 pb-0.5 mb-2 font-sans">
            Academic Credentials
          </h2>
          <div className="space-y-2.5">
            {education.map((edu) => (
              <div key={edu.id || edu._id} className="flex justify-between items-baseline">
                <div>
                  <h3 className="text-xs font-bold text-black">{edu.school}</h3>
                  <p className="text-[11px] italic text-gray-700">
                    {edu.degree} {edu.gpa && <span className="not-italic font-sans text-gray-500">• GPA: {edu.gpa}</span>}
                  </p>
                </div>
                <span className="text-[10.5px] text-gray-600 font-sans">{edu.startDate} – {edu.endDate}</span>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Skills */}
      {skills.length > 0 && (
        <section className="mb-5">
          <h2 className="text-[11px] font-bold uppercase tracking-widest text-[#333] border-b border-gray-300 pb-0.5 mb-2 font-sans">
            Areas of Expertise
          </h2>
          <div className="space-y-1 text-[11px]">
            {skills.map((grp, idx) => (
              <div key={idx} className="flex gap-2">
                <strong className="font-semibold text-black min-w-[85px] font-sans text-[10.5px] uppercase tracking-wider">{grp.category}:</strong>
                <span className="text-gray-800">{Array.isArray(grp.items) ? grp.items.join(' • ') : grp.items}</span>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Projects */}
      {projects.length > 0 && (
        <section className="mb-4">
          <h2 className="text-[11px] font-bold uppercase tracking-widest text-[#333] border-b border-gray-300 pb-0.5 mb-2 font-sans">
            Key Initiatives
          </h2>
          <div className="space-y-2">
            {projects.map((proj) => (
              <div key={proj.id || proj._id}>
                <div className="flex justify-between text-xs font-bold text-black">
                  <span>{proj.name}</span>
                  {proj.link && <span className="font-sans text-[10px] text-gray-500 font-normal">{proj.link}</span>}
                </div>
                {proj.description && <p className="text-[11px] text-gray-700 leading-snug">{proj.description}</p>}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Certifications */}
      {certifications.length > 0 && (
        <section>
          <h2 className="text-[11px] font-bold uppercase tracking-widest text-[#333] border-b border-gray-300 pb-0.5 mb-1.5 font-sans">
            Honors & Accreditations
          </h2>
          <div className="flex flex-wrap gap-x-5 gap-y-1 text-[11px] text-gray-800">
            {certifications.map((c) => (
              <span key={c.id || c._id}>
                <strong>{c.name}</strong> ({c.issuer}{c.date ? `, ${c.date}` : ''})
              </span>
            ))}
          </div>
        </section>
      )}
    </article>
  );
}
