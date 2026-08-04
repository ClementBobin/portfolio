import ProjectCard from "./ProjectCard";
import type { Project } from "@/lib/types/portfolio-api";
import { getTranslations } from "@/hooks/getTranslations";
import SectionHeader from "@/components/ui/SectionHeader";
import ScrollReveal from "@/components/ui/ScrollReveal";

interface ProjectsProps {
  projects: Project[];
  locale: string;
}

/**
 * Renders the projects portfolio section with localized headings and
 * PerspectiveBook project cards.
 *
 * @param projects - List of projects to display.
 * @param locale - Active locale used for translations.
 */
export default async function Projects({ projects, locale }: ProjectsProps) {
  if (!projects.length) return null;

  const t = await getTranslations(locale, ["portfolio"]);

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
          subtitle={t("projects.subtitle")}
        >
          {/* Flex wrap: book cards look great as a shelf */}
          <div className="flex flex-wrap gap-8 justify-center sm:justify-start">
            {projects.map((project, i) => (
              <ProjectCard
                key={project.id}
                project={project}
                locale={locale}
                index={i}
              />
            ))}
          </div>
        </SectionHeader>
      </ScrollReveal>
    </section>
  );
}
