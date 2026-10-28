import React from 'react';
import { normalizeSectionOrder } from '../../../utils/sectionOrder';

export default function AtlanticBlue({ resume }) {
  const { personal = {}, summary = '', experience = [], education = [], projects = [], skills = [], certifications = [], languages = [] } = resume || {};
  const sectionOrder = normalizeSectionOrder(resume?.sectionOrder);

  const initials = (personal.fullName || 'User')
    .split(' ')
    .map((n) => n[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();

  return (
    <article className="font-sans text-cv-slate-900 text-xs flex flex-1 w-full min-h-full bg-white">
      {/* Left Dark Sidebar */}
      <aside className="w-[34%] bg-[#1E293B] text-slate-100 p-6 flex flex-col space-y-5 shrink-0">
        {/* Avatar or Monogram */}
        <div className="flex flex-col items-center text-center pb-5 border-b border-slate-700/80">
          {personal.avatar ? (
            <img
              src={personal.avatar}
              alt={personal.fullName}
              className="w-20 h-20 rounded-full object-cover border-2 border-slate-400 mb-3 shadow"
            />
          ) : (
            <div className="w-16 h-16 rounded-full bg-slate-700 border-2 border-slate-500 flex items-center justify-center text-lg font-bold text-white mb-3 shadow">
              {initials}
            </div>
          )}
          <h1 className="text-lg font-bold text-white leading-tight">
            {personal.fullName || 'Your Name'}
          </h1>
          {personal.jobTitle && (
            <p className="text-xs text-slate-300 font-medium mt-1">
              {personal.jobTitle}
            </p>
          )}
        </div>

        {/* Contact Details */}
        <div className="pb-4 border-b border-slate-700/80 space-y-2 text-[11px] text-slate-300">
          {personal.email && (
            <div className="break-all">
              <span className="block text-[10px] uppercase tracking-wider text-slate-400 font-semibold">Email</span>
              <a href={`mailto:${personal.email}`} className="text-slate-200 hover:text-white">
                {personal.email}
              </a>
            </div>
          )}
          {personal.phone && (
            <div>
              <span className="block text-[10px] uppercase tracking-wider text-slate-400 font-semibold">Phone</span>
              <span className="text-slate-200">{personal.phone}</span>
            </div>
          )}
          {personal.location && (
            <div>
              <span className="block text-[10px] uppercase tracking-wider text-slate-400 font-semibold">Location</span>
              <span className="text-slate-200">{personal.location}</span>
            </div>
          )}
          {personal.linkedin && (
            <div>
              <span className="block text-[10px] uppercase tracking-wider text-slate-400 font-semibold">LinkedIn</span>
              <span className="text-slate-200 break-all">{personal.linkedin}</span>
            </div>
          )}
          {personal.website && (
            <div>
              <span className="block text-[10px] uppercase tracking-wider text-slate-400 font-semibold">Website</span>
              <span className="text-slate-200 break-all">{personal.website}</span>
            </div>
          )}
        </div>

        {/* Profile / Summary */}
        {summary && (
          <div className="pb-4 border-b border-slate-700/80">
            <h2 className="text-[11px] font-bold uppercase tracking-widest text-slate-200 mb-2 flex items-center gap-1.5 resume-section-header">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-400"></span> Profile
            </h2>
            <p className="text-[10.5px] text-slate-300 leading-relaxed text-justify">
              {summary}
            </p>
          </div>
        )}

        {/* Languages */}
        <div className="pb-2">
          <h2 className="text-[11px] font-bold uppercase tracking-widest text-slate-200 mb-2 flex items-center gap-1.5 resume-section-header">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-400"></span> Languages
          </h2>
          <div className="space-y-1.5 text-[11px]">
            {languages.length > 0 ? (
              languages.map((lang, idx) => (
                <div key={idx} className="flex justify-between items-center text-slate-300">
                  <span>{lang.language || lang}</span>
                  <span className="text-[10px] text-slate-400">{lang.proficiency || 'Proficient'}</span>
                </div>
              ))
            ) : (
              <>
                <div className="flex justify-between items-center text-slate-300">
                  <span>English</span>
                  <span className="text-amber-400 text-xs">•••••</span>
                </div>
                <div className="flex justify-between items-center text-slate-300">
                  <span>Spanish</span>
                  <span className="text-amber-400 text-xs">••••◦</span>
                </div>
              </>
            )}
          </div>
        </div>

        {/* Certifications in sidebar if any */}
        {certifications.length > 0 && (
          <div className="pt-2 border-t border-slate-700/80">
            <h2 className="text-[11px] font-bold uppercase tracking-widest text-slate-200 mb-2 resume-section-header">
              Certifications
            </h2>
            <div className="space-y-1.5 text-[10.5px] text-slate-300">
              {certifications.map((c) => (
                <div key={c.id || c._id}>
                  <div className="font-semibold text-white">{c.name}</div>
                  <div className="text-[10px] text-slate-400">{c.issuer} {c.date && `(${c.date})`}</div>
                </div>
              ))}
            </div>
          </div>
        )}
      </aside>

      {/* Right Content */}
        <main className="flex-1 px-8 py-[18mm] space-y-5 bg-white text-cv-slate-800">
          {sectionOrder.map((sectionKey) => {
            switch (sectionKey) {
              case 'experience':
                if (experience.length === 0) return null;
                return (
                  <section key="experience" className="resume-section-block">
                    <h2 className="text-xs font-bold uppercase tracking-widest text-[#1E293B] border-b-2 border-[#1E293B] pb-1 mb-3 flex items-center gap-2 resume-section-header">
                      Work Experience
                    </h2>
                    <div className="space-y-4">
                      {experience.map((exp) => (
                        <div key={exp.id || exp._id} className="space-y-1 resume-section-item">
                          <div className="flex justify-between items-baseline">
                            <h3 className="text-[13px] font-bold text-slate-900">{exp.role}</h3>
                            <span className="text-[11px] font-medium text-slate-500">
                              {exp.startDate} – {exp.current ? 'Present' : exp.endDate}
                            </span>
                          </div>
                          <div className="flex justify-between text-[11px] text-blue-700 font-medium">
                            <span>{exp.company}</span>
                            {exp.location && <span className="text-slate-500 font-normal">{exp.location}</span>}
                          </div>
                          {exp.bullets && exp.bullets.length > 0 && (
                            <ul className="list-disc list-outside ml-4 space-y-1 text-[11px] text-slate-700 leading-relaxed mt-1.5">
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
                  <section key="education" className="resume-section-block">
                    <h2 className="text-xs font-bold uppercase tracking-widest text-[#1E293B] border-b-2 border-[#1E293B] pb-1 mb-2.5 resume-section-header">
                      Education
                    </h2>
                    <div className="space-y-2.5">
                      {education.map((edu) => (
                        <div key={edu.id || edu._id} className="resume-section-item">
                          <div className="flex justify-between items-baseline">
                            <h3 className="text-xs font-bold text-slate-900">{edu.school}</h3>
                            <span className="text-[10px] text-slate-500">{edu.startDate} – {edu.endDate}</span>
                          </div>
                          <div className="text-[11px] text-slate-700">
                            {edu.degree} {edu.gpa && <span className="text-slate-500">• GPA: {edu.gpa}</span>}
                          </div>
                        </div>
                      ))}
                    </div>
                  </section>
                );

              case 'skills':
                if (skills.length === 0) return null;
                return (
                  <section key="skills" className="resume-section-block">
                    <h2 className="text-xs font-bold uppercase tracking-widest text-[#1E293B] border-b-2 border-[#1E293B] pb-1 mb-2 resume-section-header">
                      Skills
                    </h2>
                    <div className="space-y-2 text-[11px]">
                      {skills.map((grp, idx) => (
                        <div key={idx} className="flex flex-wrap items-baseline gap-1.5 resume-section-item">
                          <span className="font-bold text-slate-900 min-w-[85px]">{grp.category}:</span>
                          <span className="text-slate-700">
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
        <section key="projects" className="resume-section-block">
          <h2 className="text-xs font-bold uppercase tracking-widest text-[#1E293B] border-b-2 border-[#1E293B] pb-1 mb-2 resume-section-header">
            Key Projects
          </h2>
          <div className="space-y-2.5 text-[11px]">
            {projects.map((proj) => (
              <div key={proj.id || proj._id} className="resume-section-item">
                <div className="flex justify-between font-bold text-slate-900">
                  <span>{proj.name}</span>
                  {proj.technologies && <span className="text-[10px] font-normal text-slate-500 italic">{proj.technologies}</span>}
                </div>
                {proj.description && <p className="text-[10.5px] text-slate-600 mt-0.5 leading-snug">{proj.description}</p>}
              </div>
            ))}
          </div>
        </section>
        );

        default:
        return null;
          }
        })}
      </main>
    </article>
  );
}
