/**
 * GET /api/labs
 * Returns the list of lab projects.
 * Replace the static data with a remote fetch when a resource API is available.
 */
export async function GET() {
  const apiUrl = process.env.NEXT_PUBLIC_RESSOURCE_API_URL;

  // if (apiUrl) {
  //   try {
  //     const res = await fetch(`${apiUrl}/labs`);
  //     if (res.ok) {
  //       return Response.json(await res.json());
  //     }
  //   } catch {
  //     /* fall through to static data */
  //   }
  // }

  const data = [
    // {
    //   slug: "grocery-list-paradigms",
    //   title: "Grocery List — 3 paradigmes",
    //   description: {
    //     en: "Same grocery list, 3 ways to interact: classic UI, WebMCP, and MCP Server.",
    //     fr: "Même liste de courses, 3 façons d'interagir : UI classique, WebMCP, et MCP Server.",
    //   },
    //   tags: ["webmcp", "mcp", "ai-agents", "demo", "react-query"],
    //   href: "https://clementbouly.dev/labs/grocery-list",
    // },
    // {
    //   slug: "ats-resume-generator",
    //   title: "ATS Resume Generator",
    //   description: {
    //     en: "Generate an ATS-optimised CV for free. No data stored, 100% client-side.",
    //     fr: "Générez un CV optimisé ATS gratuitement. Aucune donnée stockée, 100% client-side.",
    //   },
    //   tags: ["ats", "resume", "pdf", "tool"],
    //   href: "/labs/ats-resume-generator",
    // },
    // {
    //   slug: "interactive-resume-guide",
    //   title: "Interactive Resume — Guide",
    //   description: {
    //     en: "Deploy your interactive CV online, no code required. Step-by-step guide.",
    //     fr: "Déployez votre CV interactif en ligne, sans coder. Guide pas à pas.",
    //   },
    //   tags: ["guide", "tutorial", "no-code"],
    //   href: "/labs/interactive-resume-guide",
    // },
    // {
    //   slug: "remotion-animated-cv",
    //   title: "Remotion — Animated CV",
    //   description: {
    //     en: "Animated CV generated with React and Remotion. Video exploration through code.",
    //     fr: "CV animé généré via React et Remotion. Exploration vidéo par code.",
    //   },
    //   tags: ["remotion", "video", "react"],
    //   href: "/labs/remotion-animated-cv",
    // },
    // {
    //   slug: "animation-notes",
    //   title: "Animation Notes",
    //   description: {
    //     en: "Notes and exercises from the animations.dev course.",
    //     fr: "Notes et exercices du cours animations.dev",
    //   },
    //   tags: ["framer-motion", "animations", "learning"],
    //   href: "/labs/animation-notes",
    // },
    // {
    //   slug: "training",
    //   title: "Training",
    //   description: {
    //     en: "Live coding practice space.",
    //     fr: "Espace d'entraînement pour le live coding",
    //   },
    //   tags: ["live-coding"],
    //   href: "/labs/training",
    // },
    // {
    //   slug: "wavelength",
    //   title: "Wavelength",
    //   description: {
    //     en: "Are you on the same wavelength?",
    //     fr: "Trouvez-vous sur la meme longueur d'ondes !",
    //   },
    //   tags: ["react", "game"],
    //   href: "/labs/wavelength",
    // },
    // {
    //   slug: "complicity",
    //   title: "Complicity",
    //   description: {
    //     en: "Team guessing game — guess your partner's word!",
    //     fr: "Jeu de devinettes en equipe - Devinez le mot de votre complice !",
    //   },
    //   tags: ["react", "zustand", "game"],
    //   href: "/labs/complicity",
    // },
    // {
    //   slug: "animations-playground",
    //   title: "Animations Playground",
    //   description: {
    //     en: "All the portfolio animations in one place.",
    //     fr: "Toutes les animations du portfolio",
    //   },
    //   tags: ["framer-motion", "animations"],
    //   href: "/labs/animations-playground",
    // },
  ];

  return Response.json(data);
}