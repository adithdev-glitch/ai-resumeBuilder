import { Document, Packer, Paragraph, TextRun, HeadingLevel, AlignmentType } from 'docx';

export async function exportResumeToDocx(resume) {
  const {
    personal = {},
    summary = '',
    experience = [],
    education = [],
    projects = [],
    skills = [],
    certifications = [],
  } = resume || {};

  const docChildren = [];

  // Name Header
  docChildren.push(
    new Paragraph({
      text: personal.fullName || 'Untitled Resume',
      heading: HeadingLevel.TITLE,
      alignment: AlignmentType.CENTER,
      spacing: { after: 120 },
    })
  );

  // Subtitle / Job Title
  if (personal.jobTitle) {
    docChildren.push(
      new Paragraph({
        children: [
          new TextRun({
            text: personal.jobTitle,
            italics: true,
            size: 24,
            color: '475569',
          }),
        ],
        alignment: AlignmentType.CENTER,
        spacing: { after: 120 },
      })
    );
  }

  // Contact Info
  const contactParts = [
    personal.email,
    personal.phone,
    personal.location,
    personal.website,
    personal.linkedin,
  ].filter(Boolean);

  if (contactParts.length > 0) {
    docChildren.push(
      new Paragraph({
        children: [
          new TextRun({
            text: contactParts.join('  •  '),
            size: 18,
            color: '64748B',
          }),
        ],
        alignment: AlignmentType.CENTER,
        spacing: { after: 240 },
      })
    );
  }

  // Summary
  if (summary) {
    docChildren.push(
      new Paragraph({
        text: 'PROFESSIONAL SUMMARY',
        heading: HeadingLevel.HEADING_2,
        spacing: { before: 200, after: 100 },
      }),
      new Paragraph({
        children: [new TextRun({ text: summary, size: 20 })],
        spacing: { after: 200 },
      })
    );
  }

  // Experience
  if (experience.length > 0) {
    docChildren.push(
      new Paragraph({
        text: 'WORK EXPERIENCE',
        heading: HeadingLevel.HEADING_2,
        spacing: { before: 200, after: 100 },
      })
    );

    experience.forEach((exp) => {
      docChildren.push(
        new Paragraph({
          children: [
            new TextRun({ text: exp.role || 'Role', bold: true, size: 21 }),
            new TextRun({ text: ` — ${exp.company || ''}`, bold: true, size: 21, color: '334155' }),
            new TextRun({
              text: `\t${exp.startDate || ''} – ${exp.current ? 'Present' : exp.endDate || ''}`,
              italics: true,
              size: 19,
              color: '64748B',
            }),
          ],
          spacing: { before: 120, after: 60 },
        })
      );

      if (exp.location) {
        docChildren.push(
          new Paragraph({
            children: [new TextRun({ text: exp.location, italics: true, size: 18, color: '64748B' })],
            spacing: { after: 60 },
          })
        );
      }

      (exp.bullets || []).filter(Boolean).forEach((bullet) => {
        docChildren.push(
          new Paragraph({
            bullet: { level: 0 },
            children: [new TextRun({ text: bullet, size: 20 })],
            spacing: { after: 40 },
          })
        );
      });
    });
  }

  // Education
  if (education.length > 0) {
    docChildren.push(
      new Paragraph({
        text: 'EDUCATION',
        heading: HeadingLevel.HEADING_2,
        spacing: { before: 200, after: 100 },
      })
    );

    education.forEach((edu) => {
      docChildren.push(
        new Paragraph({
          children: [
            new TextRun({ text: edu.school || '', bold: true, size: 21 }),
            new TextRun({
              text: `\t${edu.startDate || ''} – ${edu.endDate || ''}`,
              italics: true,
              size: 19,
              color: '64748B',
            }),
          ],
          spacing: { before: 100, after: 40 },
        }),
        new Paragraph({
          children: [
            new TextRun({ text: edu.degree || '', italics: true, size: 20 }),
            edu.gpa ? new TextRun({ text: ` (GPA: ${edu.gpa})`, size: 19, color: '64748B' }) : new TextRun(''),
          ],
          spacing: { after: 100 },
        })
      );
    });
  }

  // Projects
  if (projects.length > 0) {
    docChildren.push(
      new Paragraph({
        text: 'KEY PROJECTS',
        heading: HeadingLevel.HEADING_2,
        spacing: { before: 200, after: 100 },
      })
    );

    projects.forEach((proj) => {
      docChildren.push(
        new Paragraph({
          children: [
            new TextRun({ text: proj.name || '', bold: true, size: 20 }),
            proj.technologies ? new TextRun({ text: ` [${proj.technologies}]`, italics: true, size: 18, color: '64748B' }) : new TextRun(''),
          ],
          spacing: { before: 80, after: 40 },
        })
      );
      if (proj.description) {
        docChildren.push(
          new Paragraph({
            children: [new TextRun({ text: proj.description, size: 19 })],
            spacing: { after: 80 },
          })
        );
      }
    });
  }

  // Skills
  if (skills.length > 0) {
    docChildren.push(
      new Paragraph({
        text: 'SKILLS & COMPETENCIES',
        heading: HeadingLevel.HEADING_2,
        spacing: { before: 200, after: 100 },
      })
    );

    skills.forEach((skillGroup) => {
      const items = Array.isArray(skillGroup.items) ? skillGroup.items.join(', ') : skillGroup.items;
      docChildren.push(
        new Paragraph({
          children: [
            new TextRun({ text: `${skillGroup.category}: `, bold: true, size: 20 }),
            new TextRun({ text: items, size: 20 }),
          ],
          spacing: { after: 60 },
        })
      );
    });
  }

  // Certifications
  if (certifications.length > 0) {
    docChildren.push(
      new Paragraph({
        text: 'CERTIFICATIONS',
        heading: HeadingLevel.HEADING_2,
        spacing: { before: 200, after: 100 },
      })
    );

    certifications.forEach((cert) => {
      docChildren.push(
        new Paragraph({
          bullet: { level: 0 },
          children: [
            new TextRun({ text: cert.name, bold: true, size: 20 }),
            new TextRun({ text: ` — ${cert.issuer} ${cert.date ? `(${cert.date})` : ''}`, size: 19 }),
          ],
          spacing: { after: 40 },
        })
      );
    });
  }

  const doc = new Document({
    sections: [
      {
        properties: {},
        children: docChildren,
      },
    ],
  });

  const blob = await Packer.toBlob(doc);
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `${(personal.fullName || 'Resume').replace(/\s+/g, '_')}_Resume.docx`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}
