import ClassicSerif from '../components/preview/templates/ClassicSerif';
import AtlanticBlue from '../components/preview/templates/AtlanticBlue';
import MercuryFlow from '../components/preview/templates/MercuryFlow';
import ModernSans from '../components/preview/templates/ModernSans';
import IvyLeagueATS from '../components/preview/templates/IvyLeagueATS';
import TechExecutive from '../components/preview/templates/TechExecutive';
import CompactOnePage from '../components/preview/templates/CompactOnePage';
import ElegantSerif from '../components/preview/templates/ElegantSerif';
import EmeraldAccent from '../components/preview/templates/EmeraldAccent';
import CharcoalSplit from '../components/preview/templates/CharcoalSplit';
import NordicClean from '../components/preview/templates/NordicClean';

export const RESUME_TEMPLATES = [
  {
    id: 'classic',
    name: 'CLASSIC CLEAR',
    category: 'simple',
    badge: '100% ATS Score',
    tagline: 'Standard single-column layout preferred by recruiters',
    description: 'Universally recognized standard resume format. Clean horizontal dividers and clear visual hierarchy guarantee flawless ATS parsing.',
    component: ClassicSerif,
    accentColor: '#3B82F6',
  },
  {
    id: 'atlantic',
    name: 'ATLANTIC BLUE',
    category: 'creative',
    badge: 'Modern Executive',
    tagline: 'Dark navy sidebar with crisp modern profile layout',
    description: 'Striking two-tone layout inspired by executive resumes. Deep navy left sidebar for profile and competencies, with clean work experience columns.',
    component: AtlanticBlue,
    accentColor: '#1E293B',
  },
  {
    id: 'mercury',
    name: 'MERCURY FLOW',
    category: 'modern',
    badge: 'Recruiter Favorite',
    tagline: 'Airy timeline alignment with centered executive header',
    description: 'Clean modern alignment with left-sided date columns. Generous whitespace that guides the hiring manager’s eye straight to key career achievements.',
    component: MercuryFlow,
    accentColor: '#475569',
  },
  {
    id: 'modern',
    name: 'MODERN SANS',
    category: 'modern',
    badge: 'High Contrast',
    tagline: 'Contemporary tech-ready design with punchy typography',
    description: 'High-contrast sans-serif format tailored for tech, design, and high-growth venture roles. Compact date alignments and bold subheadings.',
    component: ModernSans,
    accentColor: '#2563EB',
  },
  {
    id: 'ivyleague',
    name: 'IVY LEAGUE ATS',
    category: 'simple',
    badge: 'Top Tier Standard',
    tagline: 'Prestigious Harvard & Wall Street single-column serif',
    description: 'The golden standard of Fortune 500 corporate, legal, and banking institutions. Strictly linear single column with centered traditional headers.',
    component: IvyLeagueATS,
    accentColor: '#111827',
  },
  {
    id: 'tech',
    name: 'TECH EXECUTIVE',
    category: 'modern',
    badge: 'Dev Stack Matrix',
    tagline: 'Developer-oriented layout with skills matrix & GitHub focus',
    description: 'Engineered specifically for software engineers, tech leads, and product builders. Highlights code repositories, technical stacks, and measurable impact.',
    component: TechExecutive,
    accentColor: '#4F46E5',
  },
  {
    id: 'compact',
    name: 'COMPACT ONE-PAGE',
    category: 'simple',
    badge: '1-Page Fit',
    tagline: 'Space-saving density for extensive career timelines',
    description: 'Maximum information density designed to fit 5–10 years of professional experience onto a single immaculate page without clutter or crowding.',
    component: CompactOnePage,
    accentColor: '#0F172A',
  },
  {
    id: 'elegant',
    name: 'ELEGANT SERIF',
    category: 'creative',
    badge: 'Executive & Legal',
    tagline: 'Sophisticated editorial look with refined typography',
    description: 'Double-rule accents and editorial typography bring an air of authority and maturity, making it ideal for directors, academics, and senior partners.',
    component: ElegantSerif,
    accentColor: '#334155',
  },
  {
    id: 'accent',
    name: 'EMERALD ACCENT',
    category: 'modern',
    badge: 'Clean Contrast',
    tagline: 'Subtle emerald borders with modern badge styling',
    description: 'Fresh emerald-toned accent borders add personality while retaining 100% ATS text parseability and structured semantic hierarchy.',
    component: EmeraldAccent,
    accentColor: '#059669',
  },
  {
    id: 'charcoal',
    name: 'CHARCOAL SPLIT',
    category: 'creative',
    badge: 'Two-Column Split',
    tagline: 'Dark executive header banner with structured grid',
    description: 'Features a high-impact charcoal header bar with a balanced dual-column lower section for education, projects, and specialized skills.',
    component: CharcoalSplit,
    accentColor: '#18181B',
  },
  {
    id: 'nordic',
    name: 'NORDIC MINIMAL',
    category: 'simple',
    badge: 'Scandinavian Clean',
    tagline: 'Minimalist aesthetic with spacious modern typography',
    description: 'Subtle numbered sections, calm stone palette, and balanced breathing room designed for discerning design, architecture, and luxury brands.',
    component: NordicClean,
    accentColor: '#57534E',
  },
];

export const TEMPLATE_CATEGORIES = [
  { id: 'all', label: 'All Templates' },
  { id: 'simple', label: 'Simple' },
  { id: 'modern', label: 'Modern' },
  { id: 'creative', label: 'Creative' },
];
