import type { NextRequest } from "next/server";
import type { PortfolioData } from "@/lib/types/portfolio-api";

/**
 * GET /api/portfolio
 * Returns structured portfolio data.
 * Falls back to static data if the external API is unavailable.
 */
export async function GET(_req: NextRequest) {
  // Try fetching from external resource API
  const apiUrl = process.env.NEXT_PUBLIC_RESSOURCE_API_URL;

  console.log(apiUrl)

  if (apiUrl) {
    try {
      const res = await fetch(`${apiUrl}/cv`, {
        next: { revalidate: 3600 },
      });
      if (res.ok) {
        const raw = await res.json();
        // Transform raw CV format → clean PortfolioData (strip labels, pdf, limits)
        const data: PortfolioData = {
          seo: raw.seo ?? fallbackData.seo,
          personal: raw.personal ?? fallbackData.personal,
          contact: raw.contact ?? fallbackData.contact,
          skills: raw.skills ?? fallbackData.skills,
          experiences: raw.experiences ?? fallbackData.experiences,
          education: raw.education ?? fallbackData.education,
          projects: raw.projects ?? fallbackData.projects,
          hobbies: raw.hobbies ?? fallbackData.hobbies,
        };
        return Response.json(data);
      }
    } catch {
      // fall through to static data
    }
  }

  return Response.json(fallbackData);
}

// ─── Static Fallback ─────────────────────────────────────────────────────────

const fallbackData: PortfolioData = {
  seo: {
    title: "Clément BOBIN — IT Project Coordinator (Work-Study)",
    description: "Interactive portfolio of Clément BOBIN, junior fullstack developer.",
  },
  personal: {
    name: "Clément BOBIN",
    title: {
      en: "MSc Expert in Software Architecture and Development (Work-Study)",
      fr: "Mastère Expert en Architecture et Développement Logiciel (Alternance)",
    },
    photo: "https://clementbobin.github.io/public/avatar.png",
    photoBackEmoji: "👨‍💻",
    subtitle: {
      en: "Seeking work-study opportunity",
      fr: "En recherche d'alternance",
    },
    summary: {
      en: "Fullstack developer. I enjoy analyzing problems, designing the right architecture, and building robust solutions from API to user interface, including deployment and automation.",
      fr: "Développeur fullstack. J'aime analyser un problème, concevoir une architecture adaptée et construire des solutions robustes, de l'API jusqu'à l'interface utilisateur, en passant par le déploiement et l'automatisation.",
    },
    location: "Beaune, France",
  },
  contact: [
    { type: "website", label: "Portfolio", href: "https://portfolio-clement.vercel.app" },
    { type: "github", label: "ClementBobin", href: "https://github.com/ClementBobin" },
    { type: "linkedin", label: "Clément Bobin", href: "https://www.linkedin.com/in/cl%C3%A9ment-bobin-958559293" },
    { type: "location", label: "Beaune, France" },
  ],
  skills: [
    {
      title: { en: "Languages", fr: "Langues" },
      type: "languages",
      items: [
        { name: { en: "French", fr: "Français" }, level: { en: "Native", fr: "Natif" } },
        { name: { en: "English", fr: "Anglais" }, level: { en: "B2 (Cambridge)", fr: "B2 (Cambridge)" } },
      ],
    },
    {
      title: { en: "Frontend", fr: "Frontend" },
      type: "badges",
      items: [
        { name: "React" }, { name: "TypeScript" }, { name: "Next.js" },
        { name: "Tailwind CSS" }, { name: "Three.js" }, { name: "Framer Motion" },
        { name: "Vite" }, { name: "Kotlin" },
      ],
    },
    {
      title: { en: "Backend", fr: "Backend" },
      type: "badges",
      items: [
        { name: "Node.js" }, { name: "Python" }, { name: "PHP" },
        { name: "C#" }, { name: ".NET" }, { name: "Express.js" }, { name: "Fastify" },
      ],
    },
    {
      title: { en: "Database", fr: "Base de données" },
      type: "badges",
      items: [
        { name: "PostgreSQL" }, { name: "MongoDB" }, { name: "SQL" },
        { name: "Neon" }, { name: "Prisma" },
      ],
    },
    {
      title: { en: "Tools", fr: "Outils" },
      type: "badges",
      items: [
        { name: "Git" }, { name: "Docker" }, { name: "Linux" },
        { name: "Azure" }, { name: "GitHub Actions" }, { name: "PowerShell" }, { name: "Nix" },
      ],
    },
    {
      title: { en: "Methodologies", fr: "Méthodologies" },
      type: "text",
      items: [{ name: { en: "Agile/Scrum, TDD, Code Review, CI/CD", fr: "Agile/Scrum, TDD, Code Review, CI/CD" } }],
    },
  ],
  experiences: [
    {
      id: "actemium-2026",
      company: { en: "Actemium Dijon", fr: "Actemium Dijon" },
      role: { en: "IT Services for Organizations (Apprentice)", fr: "BTS Services Informatiques aux Organisations (Alternant)" },
      period: { en: "Sep 2025 - Present", fr: "Sep 2025 - Présent" },
      description: { en: "Upgrading and maintaining core application systems and infrastructure", fr: "Modernisation et maintenance des systèmes centraux d'application et de l'infrastructure" },
      techs: [
        { name: "Node.js" }, { name: "TypeScript" }, { name: "PostgreSQL" },
        { name: "C#" }, { name: "React" }, { name: ".NET" }, { name: "Linux" },
      ],
      type: { en: "Apprentice", fr: "Alternant" },
      workType: "work",
      href: "https://www.actemium.fr/implantations/actemium-dijon/presentation/",
      isHighlighted: true,
      details: {
        context: { en: "Team of 14 within a 300-person company.", fr: "Équipe de 14 personnes au sein d'une entreprise de 300 salariés." },
        tasks: {
          en: ["Modernized an IoT sensor data management project", "Designed, developed, and maintained a backend API", "Migrated from SVN to Git using PowerShell scripts", "Developed and maintained a time-tracking application"],
          fr: ["Modernisation d'un projet de gestion de données de capteurs IoT", "Conception et développement d'une API backend", "Migration de SVN vers Git via des scripts PowerShell", "Développement d'une application de pointage"],
        },
      },
    },
    {
      id: "actemium-iot",
      company: { en: "Actemium Dijon", fr: "Actemium Dijon" },
      role: { en: "IT Services for Organizations (Internship)", fr: "BTS Services Informatiques aux Organisations (Stage)" },
      period: { en: "Feb 2025 - Mar 2025", fr: "Fév 2025 - Mar 2025" },
      description: { en: "Modernization of an IoT database management project with API and web interface.", fr: "Modernisation d'un projet de gestion de base de données IoT avec API et interface web." },
      techs: [{ name: "Node.js" }, { name: "TypeScript" }, { name: "PostgreSQL" }],
      type: { en: "Internship", fr: "Stage" },
      workType: "work",
      href: "https://www.actemium.fr/implantations/actemium-dijon/presentation/",
      details: {
        context: { en: "Team of 8 people.", fr: "Équipe de 8 personnes." },
        tasks: {
          en: ["Modernization of IoT sensor data", "Design backend API", "Development of visualization web interface"],
          fr: ["Modernisation des données capteurs IoT", "Conception API backend", "Développement d'un site de visualisation"],
        },
        env: { en: "Node.js / TypeScript / PostgreSQL / Docker", fr: "Node.js / TypeScript / PostgreSQL / Docker" },
      },
    },
    {
      id: "actemium-windows",
      company: { en: "Actemium Dijon", fr: "Actemium Dijon" },
      role: { en: "IT Services for Organizations (Internship)", fr: "BTS Services Informatiques aux Organisations (Stage)" },
      period: { en: "May 2024 - Jun 2024", fr: "Mai 2024 - Juin 2024" },
      description: { en: "Website modernization and Windows database management tools.", fr: "Modernisation de site web et outils Windows de gestion de base de données." },
      techs: [{ name: "C#" }, { name: "PowerShell" }, { name: "SQL" }],
      type: { en: "Internship", fr: "Stage" },
      workType: "work",
      href: "https://www.actemium.fr/implantations/actemium-dijon/presentation/",
    },
    {
      id: "volunteer",
      company: { en: "Computer Club", fr: "Club Informatique" },
      role: { en: "Volunteer", fr: "Bénévole" },
      period: { en: "2023 - 2025", fr: "2023 - 2025" },
      description: { en: "Helping members with IT, software, and hardware.", fr: "Aide aux adhérents sur les sujets informatiques." },
      techs: [],
      type: { en: "Volunteer", fr: "Bénévolat" },
      workType: "experience",
    },
  ],
  education: [
    {
      school: { en: "DIIAGE", fr: "DIIAGE" },
      degree: { en: "MSc Expert in Software Architecture and Development", fr: "Mastère Expert en Architecture et Développement Logiciel" },
      href: "https://diiage.cucdb.fr/",
      period: "2026 - 2028",
    },
    {
      school: { en: "DIIAGE", fr: "DIIAGE" },
      degree: { en: "Bachelor IT Project Coordinator", fr: "Bachelor Coordinateur de Projets Informatiques" },
      href: "https://diiage.cucdb.fr/",
      specialty: { en: "Coordinate the application lifecycle", fr: "Coordonner le cycle de vie des applications" },
      period: "2025 - 2026",
    },
    {
      school: { en: "Saint Bénigne High School", fr: "Lycée Saint-Bénigne" },
      degree: { en: "BTS IT Services for Organizations", fr: "BTS Services Informatiques aux Organisations" },
      href: "https://www.groupesaintbenigne.fr/lycee/",
      specialty: { en: "SLAM Option", fr: "Option SLAM" },
      period: "2023 - 2025",
    },
    {
      school: { en: "Clos Maire High School", fr: "Lycée Clos Maire" },
      degree: { en: "STI2D Baccalaureate", fr: "Bac STI2D" },
      specialty: { en: "With honors", fr: "Mention Bien" },
      period: "2020 - 2023",
    },
  ],
  projects: [
    {
      id: "flakeHypr",
      title: { en: "flakeHypr — Personal Nix Flake Setup", fr: "flakeHypr — Configuration personnelle Nix Flake" },
      description: {
        en: "A personal Nix flake for managing dotfiles and system configuration with modular Hyprland integration.",
        fr: "Un flake Nix personnel pour gérer les dotfiles et la configuration système avec intégration modulaire de Hyprland.",
      },
      techs: [{ name: "Nix" }, { name: "Bash" }, { name: "Linux" }],
      github: "https://github.com/ClementBobin/flakeHypr",
    },
    {
      id: "obsidian",
      title: { en: "Obsidian", fr: "Obsidian" },
      description: {
        en: "An Obsidian vault for organizing notes, workflows, and personal projects using Markdown.",
        fr: "Un vault Obsidian pour organiser les notes, les workflows et les projets personnels.",
      },
      techs: [{ name: "React" }, { name: "Node.js" }, { name: "TypeScript" }, { name: "Markdown" }],
      url: "https://clementbobin.github.io/obsidian",
      github: "https://github.com/ClementBobin/obsidian",
    },
    {
      id: "tock-ui",
      title: { en: "Tock UI — Cross-Platform Time Tracker", fr: "Tock UI — Suivi du temps multiplateforme" },
      description: {
        en: "A lightweight, cross-platform desktop GUI for the Tock CLI, built with Rust, Tauri, and React.",
        fr: "Une interface graphique multiplateforme et légère pour Tock CLI, construite avec Rust, Tauri et React.",
      },
      techs: [{ name: "Rust" }, { name: "Tauri" }, { name: "React" }],
      github: "https://github.com/DiiageCUCDB/tockApplicationCRA",
    },
  ],
  hobbies: [
    {
      title: { en: "Volunteering & Community Engagement", fr: "Engagement et bénévolat" },
      icon: "Heart",
      details: [
        { en: "Local volunteering", fr: "Bénévolat local" },
        { en: "Community projects", fr: "Projets communautaires" },
        { en: "Open Source", fr: "Open Source" },
      ],
    },
    {
      title: { en: "Reading & Learning", fr: "Lecture et apprentissage" },
      icon: "BookOpen",
      details: [
        { en: "Technical books", fr: "Livres techniques" },
        { en: "Continuous learning", fr: "Apprentissage continu" },
      ],
    },
    {
      title: { en: "Technology & Infrastructure", fr: "Technologie & Infrastructure" },
      icon: "Server",
      details: [
        { en: "Linux ecosystem", fr: "Écosystème Linux" },
        { en: "Self-hosting infrastructure", fr: "Infrastructure Auto-hébergement" },
        { en: "Homelab & automation", fr: "Homelab & automatisation" },
      ],
    },
    {
      title: { en: "Practical skills", fr: "Compétences pratiques" },
      icon: "Settings",
      details: [
        { en: "Problem Solving", fr: "Résolution de problèmes" },
        { en: "Teamwork & Collaboration", fr: "Travail en équipe" },
      ],
    },
  ],
};