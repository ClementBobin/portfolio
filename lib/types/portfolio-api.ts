/**
 * Portfolio API types — clean schema for /api/portfolio endpoint.
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

// ─── Hobbies ────────────────────────────────────────────────────────────────

export interface Hobby {
  title: LocalizedString;
  icon: string;
  details: LocalizedString[];
}

// ─── Root ────────────────────────────────────────────────────────────────────

export interface PortfolioData {
  seo: PortfolioSeo;
  personal: PortfolioPersonal;
  contact: ContactItem[];
  skills: SkillSection[];
  experiences: Experience[];
  education: Education[];
  projects: Project[];
  hobbies: Hobby[];
}