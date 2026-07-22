import ProjectCard from "./ProjectCard";
import type { Project } from "@/types/portfolio-api";
import { getTranslations } from "@/hooks/useTranslation";
import { SectionHeader } from "@/components/ui/SectionHeader";
import ScrollReveal from "@/components/ui/ScrollReveal";

interface ProjectsProps {
  projects: Project[];
  locale: string;
}

export default async function Projects({ projects, locale }: ProjectsProps) {
  const t = await getTranslations(locale, ["portfolio"]);

  if (!projects.length) return null;

  return (
    <section
      id="projects"
      className="mx-auto w-full max-w-5xl px-6 py-24"
      aria-label={t("section.projects")}
    >
      <ScrollReveal>
        <SectionHeader
          eyebrow={t("projects.eyebrow")}
          title={t("projects.title")}
        />
      </ScrollReveal>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {projects.map((project, i) => (
          <ProjectCard key={project.id} project={project} locale={locale} index={i} />
        ))}
      </div>
    </section>
  );
}