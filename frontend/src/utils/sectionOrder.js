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
 * Normalizes an array of section keys, ensuring valid sections exist
 * without duplicates and appending any missing default sections.
 */
export function normalizeSectionOrder(order) {
  if (!Array.isArray(order) || order.length === 0) {
    return [...DEFAULT_SECTION_ORDER];
  }

  const validSet = new Set(DEFAULT_SECTION_ORDER);
  const seen = new Set();
  const normalized = [];

  for (const item of order) {
    if (typeof item === 'string' && validSet.has(item) && !seen.has(item)) {
      normalized.push(item);
      seen.add(item);
    }
  }

  // Append any missing sections in default order
  for (const item of DEFAULT_SECTION_ORDER) {
    if (!seen.has(item)) {
      normalized.push(item);
      seen.add(item);
    }
  }

  return normalized;
}

/**
 * Moves a section up or down in the section array.
 * direction: -1 (move up) or 1 (move down)
 */
export function moveSectionInOrder(order, index, direction) {
  const current = normalizeSectionOrder(order);
  const targetIndex = index + direction;
  if (targetIndex < 0 || targetIndex >= current.length) {
    return current;
  }

  const result = [...current];
  const [moved] = result.splice(index, 1);
  result.splice(targetIndex, 0, moved);
  return result;
}

