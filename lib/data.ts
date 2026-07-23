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

  strength: {
    strengths: [
      {
        id: "frontend",
        label: {
          en: "Frontend Development",
          fr: "Développement Frontend",
        },
        description: {
          en: "Building modern and accessible interfaces.",
          fr: "Création d'interfaces modernes et accessibles.",
        },
        percentage: 95,
      },
      {
        id: "ux",
        label: {
          en: "UX Thinking",
          fr: "Approche UX",
        },
        description: {
          en: "User-centered design and interaction.",
          fr: "Conception centrée utilisateur.",
        },
        percentage: 50,
      },
      {
        id: "teamwork",
        label: {
          en: "Collaboration",
          fr: "Collaboration",
        },
        description: {
          en: "Working efficiently with multidisciplinary teams.",
          fr: "Travail efficace avec des équipes pluridisciplinaires.",
        },
        percentage: 20,
      },
    ],
    detail: {
      title: {
        en: "Professional Profile",
        fr: "Profil professionnel",
      },
      short: {
        en: "Passionate about creating intuitive digital experiences.",
        fr: "Passionné par la création d'expériences numériques intuitives.",
      },
      description: {
        en: "Experienced in building scalable frontend applications with a strong focus on maintainability.",
        fr: "Expérience dans le développement d'applications frontend évolutives avec un fort accent sur la maintenabilité.",
      },
      categories: [
        {
          id: "architecture",
          title: {
            en: "Architecture",
            fr: "Architecture",
          },
          description: {
            en: "Component-driven design.",
            fr: "Conception orientée composants.",
          },
        },
      ],
      exampleHref: "https://example.com",
    },
  },

  experiences: [],
  education: [],
  projects: [],
  hobbies: [],

  valueCards: [
    {
      icon: "Lightbulb",
      color: "#f59e0b",
      title: {
        en: "Problem Solver",
        fr: "Résolution de problèmes",
      },
      description: {
        en: "I enjoy transforming complex requirements into simple solutions.",
        fr: "J'aime transformer des besoins complexes en solutions simples.",
      },
    },
    {
      icon: "Users",
      color: "#3b82f6",
      title: {
        en: "Team Player",
        fr: "Esprit d'équipe",
      },
      description: {
        en: "Strong communication and collaboration across teams.",
        fr: "Excellente communication et collaboration entre équipes.",
      },
    },
    {
      icon: "Rocket",
      color: "#10b981",
      title: {
        en: "Continuous Learning",
        fr: "Apprentissage continu",
      },
      description: {
        en: "Always exploring new technologies and best practices.",
        fr: "Toujours à la recherche de nouvelles technologies et bonnes pratiques.",
      },
    },
  ],

  vision: {
    headline: {
      en: "Looking Forward",
      fr: "Perspectives",
    },
    subtitle: {
      en: "Building products that make a difference.",
      fr: "Construire des produits qui ont un impact.",
    },
    items: [
      {
        id: "ai",
        icon: "Sparkles",
        title: {
          en: "AI-powered UX",
          fr: "UX assistée par l'IA",
        },
        description: {
          en: "Creating interfaces enhanced by AI while keeping users in control.",
          fr: "Créer des interfaces enrichies par l'IA tout en gardant l'utilisateur maître.",
        },
        tags: [
          { en: "AI", fr: "IA" },
          { en: "UX", fr: "UX" },
        ],
      },
      {
        id: "opensource",
        icon: "Code2",
        title: {
          en: "Open Source",
          fr: "Open Source",
        },
        description: {
          en: "Contributing to tools that benefit the developer community.",
          fr: "Contribuer à des outils utiles à la communauté des développeurs.",
        },
      },
    ],
  },

  recommendations: [
    {
      id: "john-doe",
      author: {
        name: "John Doe",
        role: {
          en: "Engineering Manager",
          fr: "Responsable technique",
        },
        company: {
          en: "Acme Corp",
          fr: "Acme Corp",
        },
        linkedinUrl: "https://linkedin.com/in/johndoe",
      },
      date: "2025-03",
      excerpt: {
        en: "An excellent developer with a strong product mindset.",
        fr: "Un excellent développeur avec une forte vision produit.",
      },
      context: {
        en: "Worked together on a large-scale web platform.",
        fr: "Collaboration sur une plateforme web à grande échelle.",
      },
      strengths: [
        {
          label: {
            en: "Leadership",
            fr: "Leadership",
          },
          description: {
            en: "Takes ownership and helps teammates succeed.",
            fr: "Prend des initiatives et aide l'équipe à progresser.",
          },
        },
        {
          label: {
            en: "Code Quality",
            fr: "Qualité du code",
          },
        },
      ],
      collaboration: {
        en: "18 months",
        fr: "18 mois",
      },
    },
  ],
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
      const res = await fetch(`${apiUrl}/cv`);
      if (res.ok) {
        const raw = await res.json() as Record<string, unknown>;
        return {
          seo:             (raw.seo             as PortfolioData["seo"])             ?? EMPTY.seo,
          personal:        (raw.personal         as PortfolioData["personal"])        ?? EMPTY.personal,
          contact:         (raw.contact          as PortfolioData["contact"])         ?? [],
          skills:          (raw.skills           as PortfolioData["skills"])          ?? [],
          strength:        EMPTY.strength,
          //(raw.strengths        as PortfolioData["strength"])        ?? null,
          experiences:     (raw.experiences      as PortfolioData["experiences"])     ?? [],
          education:       (raw.education        as PortfolioData["education"])       ?? [],
          projects:        (raw.projects         as PortfolioData["projects"])        ?? [],
          hobbies:         (raw.hobbies          as PortfolioData["hobbies"])         ?? [],
          valueCards:      EMPTY.valueCards,
          //(raw.valueCards       as PortfolioData["valueCards"])      ?? null,
          vision:          EMPTY.vision,
          //(raw.vision           as PortfolioData["vision"])          ?? null,
          recommendations: EMPTY.recommendations
          //(raw.recommendation  as PortfolioData["recommendations"]) ?? null,
        };
      }
    } catch {
      /* fall through to empty defaults */
    }
  }

  return EMPTY;
}