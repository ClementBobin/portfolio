import ProjectCard from "./ProjectCard";
import type { Project } from "@/lib/types/portfolio-api";

interface ProjectsProps {
  projects: Project[];
  locale: string;
}

/**
 * Projects section — grid of project cards.
 *
 * @param projects - Array of project items
 * @param locale - Current locale
 */
export default function Projects({ projects, locale }: ProjectsProps) {
  const heading = locale === "fr" ? "Projets" : "Projects";

  if (!projects.length) return null;

  return (
    <section
      id="projects"
      className="mx-auto w-full max-w-5xl px-6 py-24"
      aria-label={heading}
    >
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {projects.map((project, i) => (
          <ProjectCard key={project.id} project={project} locale={locale} index={i} />
        ))}
      </div>
    </section>
  );
}
