/**
 * Portfolio API types — clean schema for /api/portfolio endpoint.
 * All optional fields: if null/undefined, the section/field is hidden.
 */

import type { LocalizedArray, LocalizedString } from "./global";

// --- SEO --------------------------------------------------------------------

export interface PortfolioSeo {
  title: string;
  description: string;
}

// --- Personal ---------------------------------------------------------------

export interface PortfolioPersonal {
  name: string;
  title: LocalizedString;
  status?: LocalizedString;
  photo: string;
  photoBackEmoji?: string;
  subtitle: {
    libelle: LocalizedString;
    href?: string;
  };
  summary: LocalizedString;
  location: string;
  yearsExperience?: number;
  role?: LocalizedString; // e.g. "Développeur UX"
}

// --- Contact ----------------------------------------------------------------

export type ContactType =
  | "website"
  | "github"
  | "linkedin"
  | "email"
  | "location"
  | "twitter"
  | string;

export interface ContactItem {
  type: ContactType;
  label: string;
  href?: string;
}

// --- Skills -----------------------------------------------------------------

export type SkillType = "badges" | "text" | "languages";

export interface SkillItem {
  name: string | LocalizedString;
  level?: string | LocalizedString;
}

export interface SkillSection {
  title: LocalizedString;
  icon: string; // lucide icon name
  color: string; // hex color
  type: SkillType;
  items: SkillItem[];
}

// --- Strengths (horizontal timeline) ----------------------------------------

export interface StrengthItem {
  strengths: {
    id: string;
    label: LocalizedString;
    description: LocalizedString;
    percentage: number;
  }[];

  detail?: {
    title: LocalizedString;
    short?: LocalizedString;
    description?: LocalizedString;
    categories?: {
      id: string;
      title: LocalizedString;
      description: LocalizedString;
    }[];
    exampleHref?: string;
    // Nouveaux — pour le modal
    example?: {
      media?: string;              // image ou URL
      mediaCaption?: LocalizedString;
      quote?: LocalizedString;     // bloc texte mis en avant (fond beige)
      categories: {               // colonne droite du modal
        id: string;
        title: LocalizedString;
        description: LocalizedString;
      }[];
    };
  };
}
// --- Experience -------------------------------------------------------------

export type WorkType = "work" | "experience";

export interface ExperienceTech {
  name: string;
}

export interface ExperienceDetails {
  context?: LocalizedString;
  tasks?: LocalizedString | LocalizedArray;
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
  // Nouveaux
  media?: string;
  tasks?: LocalizedArray;
}
// --- Education --------------------------------------------------------------

export interface Education {
  school: LocalizedString;
  degree: LocalizedString;
  degreeHref?: string;
  href?: string;
  specialty?: LocalizedString;
  period: string;
  // Nouveaux
  media?: string;
  description?: LocalizedString;
  tasks?: LocalizedArray;
}

// --- Projects ---------------------------------------------------------------

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

// --- Hobbies / Passions -----------------------------------------------------

export interface Hobby {
  title: LocalizedString;
  icon: string;
  emoji?: string;
  details: LocalizedString[];
}

// --- What I Bring ------------------------------------------------------------

export interface PhilosophyCard {
  id: string;
  icon: string;
  title: LocalizedString;
  variant: "numbered" | "checklist";   // gauche = numbered, droite = checklist
  description?: LocalizedString;       // intro texte (droite seulement)
  items: {
    title: LocalizedString;
    description: LocalizedString;
  }[];
}

export interface PhilosophySection {
  eyebrow?: LocalizedString;
  title: LocalizedString;
  subtitle?: LocalizedString;
  cards: PhilosophyCard[];
}

// --- Highlights --------------------------------------------------------------

export interface Highlight {
  tag?: LocalizedString[];
  label: LocalizedString;
  description?: LocalizedString;
  icon?: string;
  highlight?: boolean;
  href?: string;
  githubHref?: string;
}

// --- Vision / Future ---------------------------------------------------------

export interface VisionItem {
  id: string;
  icon: string;
  color: string;
  title: LocalizedString;
  description: LocalizedString;
  tags?: LocalizedString[];
  // Nouveaux
  items?: LocalizedString[];           // checklist pour la carte gauche
  subcards?: {                          // sous-cartes pour la carte droite
    title: LocalizedString;
    description: LocalizedString;
  }[];
  cta?: {                               // bouton CTA optionnel
    label: LocalizedString;
    href: string;
  };
  eyebrow?: LocalizedString;           // label au-dessus du titre (ex: "ACTIVE SOFTWARE PROJECTS")
  variant?: "checklist" | "subcards";  // style de la carte
}

// --- Recommendations ---------------------------------------------------------

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


// --- Root --------------------------------------------------------------------

export interface PortfolioData {
  seo: PortfolioSeo;
  personal: PortfolioPersonal;
  contact: ContactItem[];
  skills: SkillSection[];
  strength?: StrengthItem | null;
  experiences: Experience[];
  education: Education[];
  projects: Project[];
  hobbies: Hobby[];
  philosophy?: PhilosophySection | null;
  highlights?: Highlight[] | null;
  vision?: VisionItem[] | null;
  recommendations?: Recommendation[] | null;
}