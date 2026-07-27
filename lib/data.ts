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
  experiences: [],
  education: [],
  projects: [],
  hobbies: [],
  philosophy: null,
  highlights: null,
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
          contact:         (raw.contact          as PortfolioData["contact"])         ?? EMPTY.contact,
          skills:          (raw.skills           as PortfolioData["skills"])          ?? EMPTY.skills,
          strength:       (raw.strength        as PortfolioData["strength"])        ?? EMPTY.strength,
          experiences:     (raw.experiences      as PortfolioData["experiences"])     ?? EMPTY.experiences,
          education:       (raw.education        as PortfolioData["education"])       ?? EMPTY.education,
          projects:        (raw.projects         as PortfolioData["projects"])        ?? EMPTY.projects,
          hobbies:         (raw.hobbies          as PortfolioData["hobbies"])         ?? EMPTY.hobbies,
          philosophy:      (raw.philosophy       as PortfolioData["philosophy"])      ?? EMPTY.philosophy,
          highlights:      (raw.highlights       as PortfolioData["highlights"])      ?? EMPTY.highlights,
          vision:          (raw.vision           as PortfolioData["vision"])          ?? EMPTY.vision,
          recommendations: (raw.recommendations  as PortfolioData["recommendations"]) ?? EMPTY.recommendations,
        };
      }
    } catch {
      /* fall through to empty defaults */
    }
  }

  return EMPTY;
}