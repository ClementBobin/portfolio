import type { PortfolioData } from "@/types/portfolio-api";

/**
 * Safe defaults matching the PortfolioData shape.
 * Used when the API is unavailable or returns partial data.
 */
const EMPTY: PortfolioData = {
  seo: { title: "", description: "" },
  personal: {
    name: "",
    title: { en: "", fr: "" },
    photo: "",
    subtitle: { libelle: { en: "", fr: "" } },
    summary: { en: "", fr: "" },
    location: "",
  },
  contact: [],
  skills: [],
  strength: null,
  // strength: {
  //   strengths: [
  //     {
  //       id: "frontend",
  //       label: {
  //         en: "Frontend Development",
  //         fr: "Développement Frontend",
  //       },
  //       description: {
  //         en: "Building modern and accessible interfaces.",
  //         fr: "Création d'interfaces modernes et accessibles.",
  //       },
  //       percentage: 95,
  //     },
  //     {
  //       id: "ux",
  //       label: {
  //         en: "UX Thinking",
  //         fr: "Approche UX",
  //       },
  //       description: {
  //         en: "User-centered design and interaction.",
  //         fr: "Conception centrée utilisateur.",
  //       },
  //       percentage: 50,
  //     },
  //     {
  //       id: "teamwork",
  //       label: {
  //         en: "Collaboration",
  //         fr: "Collaboration",
  //       },
  //       description: {
  //         en: "Working efficiently with multidisciplinary teams.",
  //         fr: "Travail efficace avec des équipes pluridisciplinaires.",
  //       },
  //       percentage: 20,
  //     },
  //   ],
  //   detail: {
  //     title: {
  //       en: "Professional Profile",
  //       fr: "Profil professionnel",
  //     },
  //     short: {
  //       en: "Passionate about creating intuitive digital experiences.",
  //       fr: "Passionné par la création d'expériences numériques intuitives.",
  //     },
  //     description: {
  //       en: "Experienced in building scalable frontend applications with a strong focus on maintainability.",
  //       fr: "Expérience dans le développement d'applications frontend évolutives avec un fort accent sur la maintenabilité.",
  //     },
  //     categories: [
  //       {
  //         id: "architecture",
  //         title: {
  //           en: "Architecture",
  //           fr: "Architecture",
  //         },
  //         description: {
  //           en: "Component-driven design.",
  //           fr: "Conception orientée composants.",
  //         },
  //       },
  //     ],
  //     exampleHref: "https://example.com",
  //   },
  // },

  experiences: [],
  education: [],
  projects: [],
  hobbies: [],
  valueCards: [],
  vision: null,
  recommendations: []
};

/**
 * Fetches portfolio data from the resource API.
 * Always returns a fully-shaped PortfolioData — never null.
 * Missing/null fields fall back to safe empty defaults.
 */
export async function fetchPortfolioData(): Promise<PortfolioData> {
  const apiUrl = process.env.NEXT_PUBLIC_RESSOURCE_API_URL;

  if (apiUrl) {
    try {
      const res = await fetch(`${apiUrl}/portfolio`);
      if (res.ok) {
        const raw = await res.json() as Record<string, unknown>;
        return {
          seo:             (raw.seo             as PortfolioData["seo"])             ?? EMPTY.seo,
          personal:        (raw.personal         as PortfolioData["personal"])        ?? EMPTY.personal,
          contact:         (raw.contact          as PortfolioData["contact"])         ?? [],
          skills:          (raw.skills           as PortfolioData["skills"])          ?? [],
          //strength:        EMPTY.strength,
          strength:       (raw.strength        as PortfolioData["strength"])        ?? null,
          experiences:     (raw.experiences      as PortfolioData["experiences"])     ?? [],
          education:       (raw.education        as PortfolioData["education"])       ?? [],
          projects:        (raw.projects         as PortfolioData["projects"])        ?? [],
          hobbies:         (raw.hobbies          as PortfolioData["hobbies"])         ?? [],
          //valueCards:      EMPTY.valueCards,
          valueCards:      (raw.valueCards       as PortfolioData["valueCards"])      ?? null,
          //vision:          EMPTY.vision,
          vision:          (raw.vision           as PortfolioData["vision"])          ?? null,
          //recommendations: EMPTY.recommendations
          recommendations: (raw.recommendations  as PortfolioData["recommendations"]) ?? null,
        };
      }
    } catch {
      /* fall through to empty defaults */
    }
  }

  return EMPTY;
}