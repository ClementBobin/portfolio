import type { NextRequest } from "next/server";
import type { PortfolioData } from "@/lib/types/portfolio-api";

export async function GET(_req: NextRequest) {
  const apiUrl = process.env.NEXT_PUBLIC_RESSOURCE_API_URL;

  if (apiUrl) {
    try {
      const res = await fetch(`${apiUrl}/cv`, { next: { revalidate: 3600 } });
      if (res.ok) {
        const raw = await res.json();
        const data: PortfolioData = {
          seo: raw.seo ?? fallbackData.seo,
          personal: raw.personal ?? fallbackData.personal,
          contact: raw.contact ?? fallbackData.contact,
          skills: raw.skills ?? fallbackData.skills,
          strengths: raw.strengths ?? fallbackData.strengths,
          experiences: raw.experiences ?? fallbackData.experiences,
          education: raw.education ?? fallbackData.education,
          projects: raw.projects ?? fallbackData.projects,
          hobbies: raw.hobbies ?? fallbackData.hobbies,
          valueCards: raw.valueCards ?? fallbackData.valueCards,
          highlights: raw.highlights ?? fallbackData.highlights,
          vision: raw.vision ?? fallbackData.vision,
          recommendations: raw.recommendations ?? fallbackData.recommendations,
        };
        return Response.json(data);
      }
    } catch { /* fall through */ }
  }

  return Response.json(fallbackData);
}

const fallbackData: PortfolioData = {
  seo: {
    title: "Clément BOBIN — Développeur Fullstack",
    description: "Portfolio interactif de Clément BOBIN, développeur fullstack.",
  },
  personal: {
    name: "Clément BOBIN",
    title: {
      en: "MSc Expert in Software Architecture and Development",
      fr: "Mastère Expert en Architecture et Développement Logiciel",
    },
    role: { en: "Fullstack Developer", fr: "Développeur Fullstack" },
    photo: "https://clementbobin.github.io/public/avatar.png",
    photoBackEmoji: "👨‍💻",
    subtitle: { en: "Open to opportunities", fr: "En recherche d'alternance" },
    summary: {
      en: "Fullstack developer passionate about clean architecture, self-hosting, and open source. I design and build robust solutions from API to UI.",
      fr: "Développeur fullstack passionné par l'architecture propre, l'auto-hébergement et l'open source. Je conçois et construis des solutions robustes, de l'API à l'interface.",
    },
    location: "Beaune, France",
    yearsExperience: 2,
  },
  contact: [
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
  strengths: [
    {
      id: "infrastructure",
      label: { en: "Infrastructure", fr: "Infrastructure" },
      level: 72,
      color: "#8b7355",
      description: { en: "Linux, Docker, self-hosting, Nix, CI/CD pipelines", fr: "Linux, Docker, auto-hébergement, Nix, pipelines CI/CD" },
      example: { label: { en: "View flakeHypr", fr: "Voir flakeHypr" }, href: "https://github.com/ClementBobin/flakeHypr" },
    },
    {
      id: "backend",
      label: { en: "Backend", fr: "Backend" },
      level: 85,
      color: "#7c6b4e",
      description: { en: "Node.js, TypeScript, REST APIs, PostgreSQL, .NET, Python", fr: "Node.js, TypeScript, API REST, PostgreSQL, .NET, Python" },
      example: { label: { en: "IoT API project", fr: "Projet API IoT" }, href: "https://github.com/ClementBobin" },
    },
    {
      id: "frontend",
      label: { en: "Frontend", fr: "Frontend" },
      level: 80,
      color: "#d4a574",
      description: { en: "React, Next.js, TypeScript, Tailwind, Framer Motion", fr: "React, Next.js, TypeScript, Tailwind, Framer Motion" },
      example: { label: { en: "This portfolio", fr: "Ce portfolio" }, href: "https://github.com/ClementBobin" },
    },
    {
      id: "design",
      label: { en: "Design", fr: "Design" },
      level: 58,
      color: "#b89a78",
      description: { en: "UI/UX principles, component design, responsive layouts", fr: "Principes UI/UX, design de composants, layouts responsives" },
    },
    {
      id: "product",
      label: { en: "Product", fr: "Produit" },
      level: 65,
      color: "#a08060",
      description: { en: "Agile/Scrum, project coordination, stakeholder communication", fr: "Agile/Scrum, coordination de projet, communication parties prenantes" },
    },
  ],
  experiences: [
    {
      id: "actemium-2026",
      company: { en: "Actemium Dijon", fr: "Actemium Dijon" },
      role: { en: "IT Services for Organizations (Apprentice)", fr: "BTS SIO (Alternant)" },
      period: { en: "Sep 2025 - Present", fr: "Sep 2025 - Présent" },
      description: { en: "Upgrading and maintaining core application systems and infrastructure.", fr: "Modernisation et maintenance des systèmes centraux d'application et de l'infrastructure." },
      techs: [{ name: "Node.js" }, { name: "TypeScript" }, { name: "PostgreSQL" }, { name: "C#" }, { name: "React" }, { name: ".NET" }, { name: "Linux" }],
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
      role: { en: "IT Services for Organizations (Internship)", fr: "BTS SIO (Stage)" },
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
      role: { en: "IT Services for Organizations (Internship)", fr: "BTS SIO (Stage)" },
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
      title: { en: "flakeHypr — Personal Nix Flake Setup", fr: "flakeHypr — Configuration Nix Flake" },
      description: { en: "A personal Nix flake for managing dotfiles and system configuration with modular Hyprland integration.", fr: "Un flake Nix personnel pour gérer les dotfiles et la configuration système avec intégration modulaire de Hyprland." },
      techs: [{ name: "Nix" }, { name: "Bash" }, { name: "Linux" }],
      github: "https://github.com/ClementBobin/flakeHypr",
    },
    {
      id: "obsidian",
      title: { en: "Obsidian Notes & Blog", fr: "Notes Obsidian & Blog" },
      description: { en: "An Obsidian vault for organizing notes, workflows, and personal projects using Markdown, published as a blog.", fr: "Un vault Obsidian pour organiser les notes, workflows et projets personnels, publié comme blog." },
      techs: [{ name: "React" }, { name: "Node.js" }, { name: "TypeScript" }, { name: "Markdown" }],
      url: "https://clementbobin.github.io/obsidian",
      github: "https://github.com/ClementBobin/obsidian",
    },
    {
      id: "tock-ui",
      title: { en: "Tock UI — Cross-Platform Time Tracker", fr: "Tock UI — Suivi du temps multiplateforme" },
      description: { en: "A lightweight, cross-platform desktop GUI for the Tock CLI, built with Rust, Tauri, and React.", fr: "Une interface graphique multiplateforme pour Tock CLI, construite avec Rust, Tauri et React." },
      techs: [{ name: "Rust" }, { name: "Tauri" }, { name: "React" }],
      github: "https://github.com/DiiageCUCDB/tockApplicationCRA",
    },
  ],
  hobbies: [
    {
      title: { en: "Homelab & Infrastructure", fr: "Homelab & Infrastructure" },
      icon: "Server",
      emoji: "🖥️",
      details: [
        { en: "NixOS & Hyprland", fr: "NixOS & Hyprland" },
        { en: "Self-hosting", fr: "Auto-hébergement" },
        { en: "Docker & automation", fr: "Docker & automatisation" },
      ],
    },
    {
      title: { en: "Reading & Learning", fr: "Lecture & Apprentissage" },
      icon: "BookOpen",
      emoji: "📚",
      details: [
        { en: "Technical books", fr: "Livres techniques" },
        { en: "Obsidian notes", fr: "Notes Obsidian" },
        { en: "Dev blogs", fr: "Blogs dev" },
      ],
    },
    {
      title: { en: "Community & Open Source", fr: "Communauté & Open Source" },
      icon: "Heart",
      emoji: "🤝",
      details: [
        { en: "Computer club volunteering", fr: "Bénévolat club informatique" },
        { en: "Open source contributions", fr: "Contributions open source" },
      ],
    },
    {
      title: { en: "Building Side Projects", fr: "Projets Perso" },
      icon: "Zap",
      emoji: "⚡",
      details: [
        { en: "Rust & Tauri apps", fr: "Apps Rust & Tauri" },
        { en: "CLI tools", fr: "Outils CLI" },
        { en: "Experiments", fr: "Expérimentations" },
      ],
    },
  ],
  valueCards: [
    {
      icon: "Layers",
      title: { en: "Full-Stack Vision", fr: "Vision Full-Stack" },
      description: { en: "From database schema to pixel-perfect UI — I own the entire delivery chain.", fr: "Du schéma de base de données à l'interface pixel-perfect — je maîtrise toute la chaîne." },
      color: "#d4a574",
    },
    {
      icon: "Search",
      title: { en: "Problem Solver", fr: "Résolution de problèmes" },
      description: { en: "I dig into root causes before touching code. Clear diagnosis, clean solutions.", fr: "Je cherche la cause racine avant de coder. Diagnostic clair, solutions propres." },
      color: "#8b7355",
    },
    {
      icon: "Zap",
      title: { en: "Fast Learner", fr: "Apprentissage rapide" },
      description: { en: "New tech stack on Monday, productive PRs by Friday. Curiosity is my superpower.", fr: "Nouvelle stack le lundi, PRs utiles le vendredi. La curiosité est mon super-pouvoir." },
      color: "#b89a78",
    },
    {
      icon: "ShieldCheck",
      title: { en: "Quality-Minded", fr: "Qualité avant tout" },
      description: { en: "Code review, TDD, CI/CD — I treat production like it matters, because it does.", fr: "Code review, TDD, CI/CD — Je traite la production comme si ça comptait." },
      color: "#a08060",
    },
    {
      icon: "Users",
      title: { en: "Team Player", fr: "Esprit d'équipe" },
      description: { en: "Async by nature, collaborative by choice. I communicate blockers early.", fr: "Asynchrone par nature, collaboratif par choix. Je communique les blocages tôt." },
      color: "#7c6b4e",
    },
    {
      icon: "Code",
      title: { en: "Open Source DNA", fr: "ADN Open Source" },
      description: { en: "I contribute, document, and share. Good software is built in the open.", fr: "Je contribue, documente et partage. Les bons logiciels se construisent en plein jour." },
      color: "#c4956a",
    },
  ],
  highlights: [
    { id: "exp", value: "2+", label: { en: "Years experience", fr: "Ans d'expérience" }, description: { en: "Professional work experience", fr: "Expérience professionnelle" }, icon: "Briefcase" },
    { id: "projects", value: "10+", label: { en: "Projects", fr: "Projets" }, description: { en: "Personal & professional projects", fr: "Projets personnels & professionnels" }, icon: "FolderOpen" },
    { id: "stack", value: "15+", label: { en: "Technologies", fr: "Technologies" }, description: { en: "Languages, frameworks & tools", fr: "Langages, frameworks & outils" }, icon: "Layers" },
    { id: "open", value: "∞", label: { en: "Curiosity", fr: "Curiosité" }, description: { en: "Always learning, always building", fr: "Toujours apprendre, toujours créer" }, icon: "Sparkles" },
  ],
  vision: {
    headline: { en: "Where I'm heading", fr: "Ma vision du futur" },
    subtitle: { en: "The problems I want to solve in the next few years", fr: "Les problèmes que je veux résoudre dans les prochaines années" },
    items: [
      {
        id: "arch",
        icon: "Building2",
        title: { en: "Mastering Software Architecture", fr: "Maîtriser l'Architecture Logicielle" },
        description: { en: "Dive deep into distributed systems, event-driven architectures, and resilient API design at scale.", fr: "Plonger dans les systèmes distribués, les architectures event-driven et la conception d'API résilientes à grande échelle." },
        tags: [{ en: "DDD", fr: "DDD" }, { en: "Event Sourcing", fr: "Event Sourcing" }, { en: "Microservices", fr: "Microservices" }],
      },
      {
        id: "oss",
        icon: "Globe",
        title: { en: "Building Open Tools", fr: "Créer des Outils Open Source" },
        description: { en: "Create developer tools and infrastructure utilities that help the community and push my engineering limits.", fr: "Créer des outils développeurs et utilitaires d'infrastructure qui aident la communauté et repoussent mes limites." },
        tags: [{ en: "Open Source", fr: "Open Source" }, { en: "Rust", fr: "Rust" }, { en: "CLI Tools", fr: "Outils CLI" }],
      },
      {
        id: "lead",
        icon: "Users",
        title: { en: "Growing as a Tech Lead", fr: "Évoluer en Tech Lead" },
        description: { en: "Mentor junior developers, drive architectural decisions, and bridge the gap between product needs and technical solutions.", fr: "Mentorer des développeurs juniors, piloter les décisions architecturales, et faire le pont entre besoins produit et solutions techniques." },
        tags: [{ en: "Mentoring", fr: "Mentorat" }, { en: "Architecture", fr: "Architecture" }, { en: "Leadership", fr: "Leadership" }],
      },
    ],
  },
  recommendations: [
    {
      id: "rec1",
      author: {
        name: "Marie Dubois",
        role: { en: "Senior Software Engineer", fr: "Ingénieure Logicielle Senior" },
        company: { en: "Actemium Dijon", fr: "Actemium Dijon" },
        linkedinUrl: "https://www.linkedin.com/",
      },
      date: "2025-03-15",
      excerpt: { en: "Clément is an outstanding developer who consistently delivers high-quality work.", fr: "Clément est un développeur remarquable qui livre constamment un travail de haute qualité." },
      context: { en: "I had the pleasure of working with Clément during his apprenticeship at Actemium Dijon. He quickly became a key member of our team, taking ownership of complex backend migrations and IoT data systems.", fr: "J'ai eu le plaisir de travailler avec Clément lors de son alternance chez Actemium Dijon. Il est rapidement devenu un membre clé de notre équipe, prenant en charge des migrations backend complexes et des systèmes de données IoT." },
      strengths: [
        { label: { en: "Technical Rigor", fr: "Rigueur Technique" }, description: { en: "Clément's attention to code quality, documentation, and testing far exceeded expectations for his experience level.", fr: "L'attention de Clément à la qualité du code, à la documentation et aux tests a largement dépassé les attentes pour son niveau d'expérience." } },
        { label: { en: "Autonomy", fr: "Autonomie" }, description: { en: "He could take a brief and independently architect, build, and ship a solution with minimal supervision.", fr: "Il pouvait prendre un brief et architecturer, construire et livrer une solution de manière indépendante avec une supervision minimale." } },
      ],
      collaboration: { en: "Working with Clément was a genuine pleasure. He communicates clearly, asks the right questions, and never hesitates to challenge assumptions constructively. I would eagerly work with him again.", fr: "Travailler avec Clément était un vrai plaisir. Il communique clairement, pose les bonnes questions et n'hésite pas à remettre en question les hypothèses de manière constructive. Je travaillerais volontiers à nouveau avec lui." },
    },
    {
      id: "rec2",
      author: {
        name: "Thomas Martin",
        role: { en: "IT Project Manager", fr: "Chef de Projet IT" },
        company: { en: "Actemium Dijon", fr: "Actemium Dijon" },
        linkedinUrl: "https://www.linkedin.com/",
      },
      date: "2025-02-01",
      excerpt: { en: "Clément brought a fresh perspective and tremendous drive to every project he touched.", fr: "Clément a apporté une perspective fraîche et une énergie remarquable à chaque projet qu'il a touché." },
      context: { en: "Clément joined our team as an intern and immediately stood out for his proactive approach and ability to ramp up on new technologies.", fr: "Clément a rejoint notre équipe en tant que stagiaire et s'est immédiatement démarqué par son approche proactive et sa capacité à monter en compétence rapidement sur de nouvelles technologies." },
      strengths: [
        { label: { en: "Initiative", fr: "Initiative" }, description: { en: "He spotted bottlenecks in our SVN workflow and proposed a Git migration plan that we adopted.", fr: "Il a repéré les goulots d'étranglement dans notre workflow SVN et proposé un plan de migration Git que nous avons adopté." } },
      ],
      collaboration: { en: "Clément is the kind of developer you want on your team — curious, rigorous, and genuinely invested in the collective success.", fr: "Clément est le genre de développeur que vous voulez dans votre équipe — curieux, rigoureux et vraiment investi dans le succès collectif." },
    },
  ],
};