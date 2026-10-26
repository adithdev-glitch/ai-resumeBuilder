export const sampleResume = {
  id: 'sample-resume-1',
  title: 'Senior Product Designer',
  template: 'classic', // 'classic' | 'modern' | 'compact'
  updatedAt: new Date().toISOString(),
  personal: {
    fullName: 'Jenifer Lindfield',
    jobTitle: 'Product & Interaction Designer',
    email: 'jenifer.lindfield@example.com',
    phone: '+1 (555) 234-8901',
    location: 'San Francisco, CA',
    website: 'jenifer.design',
    linkedin: 'linkedin.com/in/jenifer-design',
    github: 'github.com/jenifer-ui',
  },
  summary:
    'Product and Interaction Designer with over 4 years of experience leading end-to-end UX workflows from generative user research to production design systems. Proven record reducing task completion time by 32% for enterprise SaaS tools while ensuring strict WCAG 2.1 AA accessibility standards.',
  experience: [
    {
      id: 'exp-1',
      role: 'Senior UI/UX Designer',
      company: 'Studio Ghoib',
      location: 'San Francisco, CA',
      startDate: 'May 2023',
      endDate: 'Present',
      current: true,
      bullets: [
        'Architected a multi-brand design system in Figma adopted across 4 distributed engineering pods, cutting frontend delivery cycles by 24%.',
        'Conducted generative user testing sessions with 40+ international enterprise clients to uncover critical friction points in billing analytics.',
        'Mentored 3 junior designers and led weekly cross-functional design critiques with engineering and product leadership.',
      ],
    },
    {
      id: 'exp-2',
      role: 'Product Designer',
      company: 'Aura Cloud Technologies',
      location: 'Austin, TX',
      startDate: 'Mar 2021',
      endDate: 'Apr 2023',
      current: false,
      bullets: [
        'Redesigned onboarding flows and role-based permissions, boosting 30-day user activation from 42% to 61%.',
        'Built interactive high-fidelity prototypes in ProtoPie to validate micro-interactions prior to quarterly sprint planning.',
        'Collaborated closely with React developers to inspect UI precision and eliminate styling regressions.',
      ],
    },
    {
      id: 'exp-3',
      role: 'Frontend UI Specialist',
      company: 'Mediana Interactive',
      location: 'Seattle, WA',
      startDate: 'Jan 2020',
      endDate: 'Feb 2021',
      current: false,
      bullets: [
        'Built 14 responsive landing pages and client dashboards using clean semantic HTML5, modern CSS, and vanilla JavaScript.',
        'Conducted cross-browser performance audits, lifting Google Lighthouse accessibility scores to a consistent 98+.',
      ],
    },
  ],
  education: [
    {
      id: 'edu-1',
      degree: 'B.S. in Human-Computer Interaction',
      school: 'University of Washington',
      location: 'Seattle, WA',
      startDate: '2016',
      endDate: '2020',
      gpa: '3.85 / 4.0',
    },
  ],
  projects: [
    {
      id: 'proj-1',
      name: 'Pulse Design System',
      description: 'An open-source accessible component library with tokens, dark mode guidelines, and automated contrast checkers.',
      link: 'github.com/jenifer-ui/pulse-tokens',
      technologies: 'Figma, TypeScript, Tailwind CSS',
    },
    {
      id: 'proj-2',
      name: 'OmniTrack Analytics',
      description: 'SaaS observability dashboard designed for cloud infrastructure engineers to monitor latency spikes in real time.',
      link: 'jenifer.design/case-studies/omnitrack',
      technologies: 'User Research, Wireframing, Figma',
    },
  ],
  skills: [
    { category: 'Design', items: ['Design Systems', 'User Research', 'Rapid Prototyping', 'Information Architecture', 'Wireframing'] },
    { category: 'Tools', items: ['Figma', 'ProtoPie', 'FigJam', 'Linear', 'Notion', 'Adobe Creative Suite'] },
    { category: 'Technical', items: ['HTML5 & CSS3', 'Tailwind CSS', 'Design Tokens', 'Git', 'WCAG 2.1 AA'] },
  ],
  certifications: [
    {
      id: 'cert-1',
      name: 'Nielsen Norman Group UX Master Certified',
      issuer: 'Nielsen Norman Group',
      date: '2022',
    },
  ],
};
