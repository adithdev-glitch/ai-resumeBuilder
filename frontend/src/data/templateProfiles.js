import { sampleResume } from './sampleResume';

export const TEMPLATE_PROFILES = {
  classic: {
    ...sampleResume,
    personal: {
      fullName: 'Emily Carter',
      jobTitle: 'Senior Project Manager',
      email: 'emily.carter@email.com',
      phone: '+1 415 555 0192',
      location: 'Toronto, Canada',
      linkedin: 'linkedin.com/in/emily-carter',
      website: 'emilycarter.co',
    },
    summary:
      'Project Manager with 6+ years of experience coordinating cross-functional initiatives in technology and business operations. Skilled in stakeholder communication, project planning, risk mitigation, and delivery tracking.',
    experience: [
      {
        id: 'ec-1',
        role: 'Senior Project Manager',
        company: 'Northridge Digital',
        location: 'Toronto, Canada',
        startDate: '10/2022',
        endDate: 'Present',
        current: true,
        bullets: [
          'Managed release plans across product, engineering, and operations teams.',
          'Coordinated sprint schedules, risk reviews, and milestone reporting.',
          'Improved delivery tracking, reducing gaps across current and next sprint tasks.',
        ],
      },
      {
        id: 'ec-2',
        role: 'Project Coordinator',
        company: 'HighPoint Solutions',
        location: 'Toronto, Canada',
        startDate: '08/2020',
        endDate: '09/2022',
        current: false,
        bullets: [
          'Supported schedules, budgets, and documentation for transformation initiatives.',
          'Facilitated team meetings and maintained cross-department action logs.',
        ],
      },
    ],
  },
  atlantic: {
    ...sampleResume,
    personal: {
      fullName: 'Brian T. Wayne',
      jobTitle: 'Business Development Consultant',
      email: 'brian@wayne-exec.com',
      phone: '+1 415 784 9012',
      location: 'Pacific Coast Hwy, Malibu, CA',
      linkedin: 'linkedin.com/in/brian-wayne',
      website: 'wayneexec.com',
    },
    summary:
      'Dynamic business development consultant with a proven track record of securing strategic enterprise partnerships, driving client acquisition, and maximizing multi-market revenue pipelines.',
    experience: [
      {
        id: 'bw-1',
        role: 'Business Development Consultant',
        company: 'Applause Inc.',
        location: 'New York, NY',
        startDate: '2021',
        endDate: 'Present',
        current: true,
        bullets: [
          'Developed and implemented strategic sales workflows resulting in a 70% increase in new enterprise accounts.',
          'Collaborated with cross-functional leadership to drive business growth and expansion.',
          'Secured high-value contracts and analyzed trends to identify high-margin opportunities.',
        ],
      },
      {
        id: 'bw-2',
        role: 'Senior Account Executive',
        company: 'Apex Media',
        location: 'Los Angeles, CA',
        startDate: '2018',
        endDate: '2021',
        current: false,
        bullets: [
          'Managed enterprise portfolio generating $8.2M ARR across 4 core verticals.',
          'Led contract negotiations with Fortune 500 tech clients.',
        ],
      },
    ],
  },
  mercury: {
    ...sampleResume,
    personal: {
      fullName: 'Camila Rivera',
      jobTitle: 'Senior Sales Manager',
      email: 'camila.rivera@email.com',
      phone: '+1 305 222 6589',
      location: 'Miami, United States',
      linkedin: 'linkedin.com/in/camila-rivera',
      website: 'riverasales.com',
    },
    summary:
      'Results-driven sales professional with 8+ years of experience in account growth, client relationship management, and pipeline development across B2B SaaS environments. Consistently exceeded sales targets by 25%.',
    experience: [
      {
        id: 'cr-1',
        role: 'Enterprise Sales Manager',
        company: 'BrightPath Solutions',
        location: 'Miami, FL',
        startDate: '01/2023',
        endDate: 'Present',
        current: true,
        bullets: [
          'Manage portfolio of mid-market and enterprise clients across retail and finance sectors.',
          'Lead quarterly sales planning and improved team conversion rates by 18%.',
          'Coordinate with operations teams to ensure seamless client retention.',
        ],
      },
      {
        id: 'cr-2',
        role: 'Account Manager',
        company: 'Montane Office Supply',
        location: 'Miami, FL',
        startDate: '07/2020',
        endDate: '12/2022',
        current: false,
        bullets: [
          'Owned inbound and outbound sales operations, driving $3.4M in contract value.',
          'Strengthened key accounts with proactive communication and tailored proposals.',
        ],
      },
    ],
  },
  modern: {
    ...sampleResume,
    personal: {
      fullName: 'Daniel Mercer',
      jobTitle: 'Vice President of Sales',
      email: 'daniel.mercer@corp.com',
      phone: '+1 312 555 0197',
      location: 'Chicago, IL',
      linkedin: 'linkedin.com/in/daniel-mercer',
      website: 'danielmercer.io',
    },
    summary:
      'Sales executive with 10+ years of high-yield performance across B2B enterprise software. Proven success establishing international sales teams and scaling revenue pipelines.',
  },
  ivyleague: {
    ...sampleResume,
    personal: {
      fullName: 'Lena Hoffmann',
      jobTitle: 'Operations Manager',
      email: 'lena.hoffmann@management.de',
      phone: '+49 (151) 4627 6391',
      location: 'Berlin, Germany',
      linkedin: 'linkedin.com/in/lena-hoffmann',
      website: 'hoffmann-ops.de',
    },
    summary:
      'Operations professional with 7+ years of experience supporting logistics process improvement and cross-functional teams in fast-paced retail and corporate environments.',
  },
  tech: {
    ...sampleResume,
    personal: {
      fullName: 'Matteo Ricci',
      jobTitle: 'Head of Operations & Engineering',
      email: 'matteo.ricci@tech.it',
      phone: '+39 340 568 4112',
      location: 'Milan, Italy',
      linkedin: 'linkedin.com/in/matteo-ricci',
      website: 'matteoricci.dev',
    },
  },
};

export function getProfileForTemplate(templateId) {
  return TEMPLATE_PROFILES[templateId] || sampleResume;
}
