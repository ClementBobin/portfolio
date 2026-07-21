import type { PortfolioData } from "@/lib/types/portfolio-api";

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
  valueCards: null,
  highlights: null,
  vision: null,
  recommendations: null,
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
      const res = await fetch(`${apiUrl}/cv`, { next: { revalidate: 3600 } });
      if (res.ok) {
        const raw = await res.json() as Record<string, unknown>;
        return {
          seo:             (raw.seo             as PortfolioData["seo"])             ?? EMPTY.seo,
          personal:        (raw.personal         as PortfolioData["personal"])        ?? EMPTY.personal,
          contact:         (raw.contact          as PortfolioData["contact"])         ?? [],
          skills:          (raw.skills           as PortfolioData["skills"])          ?? [],
          strength:        (raw.strengths        as PortfolioData["strength"])        ?? null,
          experiences:     (raw.experiences      as PortfolioData["experiences"])     ?? [],
          education:       (raw.education        as PortfolioData["education"])       ?? [],
          projects:        (raw.projects         as PortfolioData["projects"])        ?? [],
          hobbies:         (raw.hobbies          as PortfolioData["hobbies"])         ?? [],
          valueCards:      (raw.valueCards       as PortfolioData["valueCards"])      ?? null,
          highlights:      (raw.highlights       as PortfolioData["highlights"])      ?? null,
          vision:          (raw.vision           as PortfolioData["vision"])          ?? null,
          recommendations: (raw.recommendation  as PortfolioData["recommendations"]) ?? null,
        };
      }
    } catch {
      /* fall through to empty defaults */
    }
  }

  return EMPTY;
}