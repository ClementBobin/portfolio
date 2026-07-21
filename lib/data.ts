import type { PortfolioData } from "@/types/portfolio-api";

/**
 * Fetches portfolio data directly from the resource API.
 * Used by server components that need portfolio data.
 * Returns null if the API is unavailable.
 */
export async function fetchPortfolioData(): Promise<PortfolioData | null> {
  const apiUrl = process.env.NEXT_PUBLIC_RESSOURCE_API_URL;

  if (apiUrl) {
    try {
      const res = await fetch(`${apiUrl}/cv`, { next: { revalidate: 3600 } });
      if (res.ok) {
        const raw = await res.json() as Record<string, unknown>;
        const data: PortfolioData = {
          seo: raw.seo as PortfolioData["seo"],
          personal: raw.personal as PortfolioData["personal"],
          contact: raw.contact as PortfolioData["contact"],
          skills: raw.skills as PortfolioData["skills"],
          strength: raw.strengths as PortfolioData["strength"],
          experiences: raw.experiences as PortfolioData["experiences"],
          education: raw.education as PortfolioData["education"],
          projects: raw.projects as PortfolioData["projects"],
          hobbies: raw.hobbies as PortfolioData["hobbies"],
          valueCards: raw.valueCards as PortfolioData["valueCards"],
          highlights: raw.highlights as PortfolioData["highlights"],
          vision: raw.vision as PortfolioData["vision"],
          recommendations: raw.recommendation as PortfolioData["recommendations"],
        };
        return data;
      }
    } catch {
      /* fall through */
    }
  }

  return null;
}
