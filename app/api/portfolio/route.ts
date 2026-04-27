import type { PortfolioData } from "@/lib/types/portfolio-api";

export async function GET() {
  const apiUrl = process.env.NEXT_PUBLIC_RESSOURCE_API_URL;

  if (apiUrl) {
    try {
      const res = await fetch(`${apiUrl}/cv`, { next: { revalidate: 3600 } });
      if (res.ok) {
        const raw = await res.json();
        const data: PortfolioData = {
          seo: raw.seo,
          personal: raw.personal,
          contact: raw.contact,
          skills: raw.skills,
          strength: raw.strengths,
          experiences: raw.experiences,
          education: raw.education,
          projects: raw.projects,
          hobbies: raw.hobbies,
          valueCards: raw.valueCards,
          highlights: raw.highlights,
          vision: raw.vision,
          recommendations: raw.recommendation,
        };
        return Response.json(data);
      }
    } catch {
      /* fall through */
    }
  }
}