/**
 * Portfolio API types — clean schema for /api/portfolio endpoint.
 * All optional fields: if null/undefined, the section/field is hidden.
 */

export type LocalizedString = {
  en: string;
  fr: string;
};

// ─── SEO ────────────────────────────────────────────────────────────────────

export interface PortfolioSeo {
  title: string;
  description: string;
}

// ─── Personal ───────────────────────────────────────────────────────────────

export interface PortfolioPersonal {
  name: string;
  title: LocalizedString;
  status?: LocalizedString;
  photo: string;
  photoBackEmoji?: string;
  subtitle: LocalizedString;
  summary: LocalizedString;
  location: string;
  yearsExperience?: number;
  role?: LocalizedString; // e.g. "Développeur UX"
}

// ─── Contact ────────────────────────────────────────────────────────────────

export type ContactType = "website" | "github" | "linkedin" | "email" | "location" | "twitter" | string;

export interface ContactItem {
  type: ContactType;
  label: string;
  href?: string;
}

// ─── Skills ─────────────────────────────────────────────────────────────────

export type SkillType = "badges" | "text" | "languages";

export interface SkillItem {
  name: string | LocalizedString;
  level?: string | LocalizedString;
}

export interface SkillSection {
  title: LocalizedString;
  type: SkillType;
  items: SkillItem[];
}

// ─── Strengths (horizontal timeline) ────────────────────────────────────────

export interface StrengthItem {
  id: string;
  label: LocalizedString;
  level: number; // 0–100
  color: string;
  description: LocalizedString;
  example?: {
    label: LocalizedString;
    href: string;
  };
}

// ─── Experience ─────────────────────────────────────────────────────────────

export type WorkType = "work" | "experience";

export interface ExperienceTech {
  name: string;
}

export interface ExperienceDetails {
  context?: LocalizedString;
  tasks?: LocalizedString | { en: string[]; fr: string[] };
  env?: LocalizedString;
}

export interface Experience {
  id: string;
  company: LocalizedString;
  role: LocalizedString;
  period: LocalizedString;
  description: LocalizedString;
  techs: (ExperienceTech | string)[];
  type: LocalizedString;
  workType: WorkType;
  href?: string;
  isHighlighted?: boolean;
  details?: ExperienceDetails;
}

// ─── Education ──────────────────────────────────────────────────────────────

export interface Education {
  school: LocalizedString;
  degree: LocalizedString;
  degreeHref?: string;
  href?: string;
  specialty?: LocalizedString;
  period: string;
}

// ─── Projects ───────────────────────────────────────────────────────────────

export interface ProjectTech {
  name: string;
}

export interface Project {
  id: string;
  title: LocalizedString;
  description: LocalizedString;
  media?: string;
  techs: ProjectTech[];
  github?: string;
  url?: string;
}

// ─── Hobbies / Passions ─────────────────────────────────────────────────────

export interface Hobby {
  title: LocalizedString;
  icon: string;
  emoji?: string;
  details: LocalizedString[];
}

// ─── What I Bring ────────────────────────────────────────────────────────────

export interface ValueCard {
  icon: string; // lucide icon name
  title: LocalizedString;
  description: LocalizedString;
  color?: string;
}

// ─── Highlights ──────────────────────────────────────────────────────────────

export interface Highlight {
  id: string;
  value: string; // e.g. "3+"
  label: LocalizedString;
  description?: LocalizedString;
  icon?: string;
}

// ─── Vision / Future ─────────────────────────────────────────────────────────

export interface VisionItem {
  id: string;
  icon: string;
  title: LocalizedString;
  description: LocalizedString;
  tags?: LocalizedString[];
}

export interface VisionSection {
  headline?: LocalizedString;
  subtitle?: LocalizedString;
  items: VisionItem[];
}

// ─── Recommendations ─────────────────────────────────────────────────────────

export interface RecommendationStrengths {
  label: LocalizedString;
  description?: LocalizedString;
}

export interface Recommendation {
  id: string;
  author: {
    name: string;
    role: LocalizedString;
    company: LocalizedString;
    photo?: string;
    linkedinUrl?: string;
  };
  date?: string;
  excerpt: LocalizedString; // short preview
  context?: LocalizedString;
  strengths?: RecommendationStrengths[];
  collaboration?: LocalizedString;
}

// ─── Root ────────────────────────────────────────────────────────────────────

export interface PortfolioData {
  seo: PortfolioSeo;
  personal: PortfolioPersonal;
  contact: ContactItem[];
  skills: SkillSection[];
  strengths?: StrengthItem[] | null;
  experiences: Experience[];
  education: Education[];
  projects: Project[];
  hobbies: Hobby[];
  valueCards?: ValueCard[] | null;
  highlights?: Highlight[] | null;
  vision?: VisionSection | null;
  recommendations?: Recommendation[] | null;
}