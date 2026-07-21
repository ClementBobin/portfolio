/**
 * GET /api/contributions
 * Returns private/non-showable contributions with metadata.
 */
export async function GET() {
  const apiUrl = process.env.NEXT_PUBLIC_RESSOURCE_API_URL;

  if (apiUrl) {
    try {
      const res = await fetch(`${apiUrl}/contributions`, { next: { revalidate: 3600 } });
      if (res.ok) return Response.json(await res.json());
    } catch { /* fall through */ }
  }

  const data = [
    {
      slug: "kindling",
      title: "Kindling",
      subtitle: { en: "Kotlin UI Component Library", fr: "Bibliothèque de composants UI Kotlin" },
      description: {
        en: "Open-source Jetpack Compose component library published to Maven Central. Ports shadcn/ui design patterns to Android — Button, Input, Dialog, DataTable, Carousel, InputOTP, Toaster and more. Includes a multi-module architecture (core, utils, compose, android) with KMP support and a full documentation site.",
        fr: "Bibliothèque de composants Jetpack Compose open-source publiée sur Maven Central. Porte les patterns shadcn/ui vers Android — Button, Input, Dialog, DataTable, Carousel, InputOTP, Toaster et plus. Architecture multi-module (core, utils, compose, android) avec support KMP et site de documentation complet.",
      },
      tags: ["kotlin", "jetpack-compose", "android", "kmp", "maven-central", "open-source"],
      href: "https://github.com/ClementBobin/kindling",
      private: false,
      status: { en: "Active", fr: "Actif" },
      highlights: {
        en: ["Published to Maven Central under io.github.clementbobin.kindling", "28 Android native helpers across feedback, security, connectivity, sensors", "Ktor-based HTTP client in :utils module", "KMP multiplatform library with AGP/Gradle CI versioning"],
        fr: ["Publié sur Maven Central sous io.github.clementbobin.kindling", "28 helpers Android natifs couvrant feedback, sécurité, connectivité, capteurs", "Client HTTP Ktor dans le module :utils", "Bibliothèque multiplatforme KMP avec versioning CI via git tags"],
      },
    },
    {
      slug: "kiln",
      title: "Kiln",
      subtitle: { en: "Interactive Project Scaffolding TUI", fr: "Outil TUI de scaffolding de projets" },
      description: {
        en: "Interactive terminal UI tool for scaffolding development projects. Browse a curated config tree, fill in variables, pick plugins, and let Kiln generate a fully-structured project — with git, Docker, CI/CD, and a build/test/format pipeline ready to go.",
        fr: "Outil TUI interactif pour le scaffolding de projets. Parcourez un arbre de configs, remplissez des variables, choisissez des plugins, et laissez Kiln générer un projet entièrement structuré — avec git, Docker, CI/CD et un pipeline build/test/format prêt à l'emploi.",
      },
      tags: ["cli", "tui", "scaffolding", "docker", "ci-cd", "devtools"],
      href: null,
      private: true,
      status: { en: "In development", fr: "En développement" },
      highlights: {
        en: ["Curated config tree with plugin selection", "Generates git, Docker, and CI/CD boilerplate", "Interactive variable filling via terminal prompts", "Supports multiple project templates"],
        fr: ["Arbre de configs avec sélection de plugins", "Génère le boilerplate git, Docker et CI/CD", "Remplissage interactif des variables via le terminal", "Supporte plusieurs templates de projets"],
      },
    },
  ];

  return Response.json(data, {
    headers: { "Cache-Control": "s-maxage=3600, stale-while-revalidate=86400" },
  });
}