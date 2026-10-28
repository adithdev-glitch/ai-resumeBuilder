export const DEFAULT_SECTION_ORDER = [
  'personal',
  'summary',
  'experience',
  'education',
  'projects',
  'skills',
  'certifications',
];

export const SECTION_METADATA = {
  personal: {
    id: 'personal',
    label: 'Personal Details',
    shortLabel: 'Personal',
    icon: 'User',
    description: 'Full name, job title, contact email, phone, location & profiles',
  },
  summary: {
    id: 'summary',
    label: 'Professional Summary',
    shortLabel: 'Summary',
    icon: 'AlignLeft',
    description: 'Executive bio, value proposition & core competencies',
  },
  experience: {
    id: 'experience',
    label: 'Work Experience',
    shortLabel: 'Experience',
    icon: 'Briefcase',
    description: 'Employment timeline, roles, companies & measurable bullets',
  },
  education: {
    id: 'education',
    label: 'Education',
    shortLabel: 'Education',
    icon: 'GraduationCap',
    description: 'Degrees, colleges/universities, graduation dates & GPA',
  },
  projects: {
    id: 'projects',
    label: 'Key Projects',
    shortLabel: 'Projects',
    icon: 'FolderGit2',
    description: 'Notable portfolio work, open-source repos & technologies',
  },
  skills: {
    id: 'skills',
    label: 'Skills & Competencies',
    shortLabel: 'Skills',
    icon: 'Wrench',
    description: 'Categorized technical proficiencies, frameworks & tools',
  },
  certifications: {
    id: 'certifications',
    label: 'Certifications',
    shortLabel: 'Certifications',
    icon: 'Award',
    description: 'Industry credentials, certificates & issuing organizations',
  },
};

export const CUSTOM_SECTION_PRESETS = [
  {
    title: 'Languages',
    icon: 'Languages',
    description: 'Language proficiencies & certifications',
    defaultItem: {
      title: 'English',
      subtitle: 'Native / Bilingual',
      date: 'Fluent',
      description: 'Professional working proficiency and clear communication.',
    },
  },
  {
    title: 'Volunteer Experience',
    icon: 'HeartHandshake',
    description: 'Community service & non-profit involvement',
    defaultItem: {
      title: 'Community Volunteer',
      subtitle: 'Local Outreach Network',
      date: '2022 – Present',
      description: 'Coordinated regional aid programs and managed volunteer teams.',
    },
  },
  {
    title: 'Awards & Honors',
    icon: 'Trophy',
    description: 'Competitions, scholarships & recognitions',
    defaultItem: {
      title: 'Excellence in Innovation Award',
      subtitle: 'Tech Industry Summit',
      date: '2023',
      description: 'Recognized for impactful architectural design and product delivery.',
    },
  },
  {
    title: 'Publications & Research',
    icon: 'BookOpen',
    description: 'Papers, journals, conferences & articles',
    defaultItem: {
      title: 'Distributed Systems at Scale',
      subtitle: 'Software Engineering Journal',
      date: '2023',
      description: 'Co-authored paper evaluating real-time fault tolerance.',
    },
  },
  {
    title: 'Speaking & Conferences',
    icon: 'Mic',
    description: 'Keynotes, panels & industry presentations',
    defaultItem: {
      title: 'Conference Speaker',
      subtitle: 'Global Developer Conference',
      date: '2023',
      description: 'Presented 40-minute talk on modern frontend and design systems.',
    },
  },
  {
    title: 'Interests & Activities',
    icon: 'Compass',
    description: 'Extracurricular pursuits & sports',
    defaultItem: {
      title: 'Marathon Runner & OSS Contributor',
      subtitle: 'Athletic Club & GitHub',
      date: 'Active',
      description: 'Passionate about endurance running and open-source tooling.',
    },
  },
];

export const PRESET_SECTION_ORDERS = [
  {
    id: 'standard',
    name: 'Standard ATS (Recommended)',
    badge: 'Popular',
    description: 'Classic recruiter layout with career history prioritized.',
    order: ['personal', 'summary', 'experience', 'education', 'skills', 'projects', 'certifications'],
  },
  {
    id: 'student',
    name: 'Student / New Graduate',
    badge: 'Academic',
    description: 'Puts degrees, coursework, and personal projects first.',
    order: ['personal', 'education', 'projects', 'skills', 'experience', 'certifications'],
  },
  {
    id: 'technical',
    name: 'Technical / Developer',
    badge: 'Tech Stack',
    description: 'Showcases tech competencies and GitHub projects up front.',
    order: ['personal', 'skills', 'projects', 'experience', 'education', 'certifications'],
  },
  {
    id: 'executive',
    name: 'Executive / Leadership',
    badge: 'Executive',
    description: 'Emphasizes executive profile, leadership, and track record.',
    order: ['personal', 'summary', 'experience', 'skills', 'education', 'certifications'],
  },
];

/**
 * Normalizes an array of section keys, ensuring valid default and custom sections exist
 * without duplicates and appending any missing default sections.
 */
  export function normalizeSectionOrder(order, customSections = []) {
    const customIds = Array.isArray(customSections)
      ? customSections.map((c) => c?.id).filter(Boolean)
      : [];

    const validSet = new Set([...DEFAULT_SECTION_ORDER, ...customIds]);
    const seen = new Set();
    const normalized = [];

      const rawOrder = Array.isArray(order) && order.length > 0 ? order : DEFAULT_SECTION_ORDER;

      for (const item of rawOrder) {
        if (typeof item === 'string' && validSet.has(item) && !seen.has(item)) {
          normalized.push(item);
          seen.add(item);
        }
      }

      // Append any missing default sections
      for (const item of DEFAULT_SECTION_ORDER) {
        if (!seen.has(item)) {
          normalized.push(item);
          seen.add(item);
        }
      }

      // Append any missing custom sections that aren't in order yet
      for (const cid of customIds) {
        if (!seen.has(cid)) {
          normalized.push(cid);
          seen.add(cid);
        }
      }

      return normalized;
    }

    /**
     * Returns metadata for a standard or custom section key.
     */
    export function getSectionMetadata(sectionKey, customSections = []) {
      if (SECTION_METADATA[sectionKey]) {
        return { ...SECTION_METADATA[sectionKey], isCustom: false };
      }

      const custom = Array.isArray(customSections)
        ? customSections.find((c) => c?.id === sectionKey)
        : null;

      return {
        id: sectionKey,
        label: custom?.title || 'Custom Section',
        shortLabel: custom?.title || 'Custom',
        icon: 'Sparkles',
        description: 'User-defined custom section',
        isCustom: true,
      };
    }

    /**
     * Moves a section up or down in the section array.
     * direction: -1 (move up) or 1 (move down)
     */
      export function moveSectionInOrder(order, index, direction, customSections = []) {
        const current = normalizeSectionOrder(order, customSections);
        const targetIndex = index + direction;
        if (targetIndex < 0 || targetIndex >= current.length) {
          return current;
        }

        const result = [...current];
        const [moved] = result.splice(index, 1);
        result.splice(targetIndex, 0, moved);
        return result;
      }
