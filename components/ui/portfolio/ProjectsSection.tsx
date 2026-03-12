import { ExternalLinkIcon, GithubIcon } from "lucide-react";
import type { Project } from "@/lib/types/portfolio-api";
import { SectionHeading } from "../section-heading";

interface ProjectsSectionProps {
  projects: Project[];
  locale: string;
}

function ProjectCard({
  project,
  locale,
}: {
  project: Project;
  locale: string;
}) {
  const lang = locale?.split("-")[0] === "fr" ? "fr" : "en";
  return (
    <div className="group rounded-2xl border border-border bg-card overflow-hidden hover:shadow-lg hover:-translate-y-1 transition-all duration-200 flex flex-col">
      {project.media && (
        <div className="overflow-hidden aspect-video bg-muted">
          <img
            src={project.media}
            alt={project.title[lang]}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            onError={(e) => {
              (e.target as HTMLImageElement).style.display = "none";
            }}
          />
        </div>
      )}
      <div className="p-5 flex flex-col flex-1 gap-3">
        <div className="flex items-start justify-between gap-2">
          <h3 className="font-bold text-sm text-foreground group-hover:text-primary transition-colors leading-tight">
            {project.title[lang]}
          </h3>
          <div className="flex items-center gap-1 shrink-0">
            {project.url && (
              <a
                href={project.url}
                target="_blank"
                rel="noopener noreferrer"
                className="h-7 w-7 rounded-lg flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-accent transition-colors"
              >
                <ExternalLinkIcon className="h-3.5 w-3.5" />
              </a>
            )}
            {project.github && (
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="h-7 w-7 rounded-lg flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-accent transition-colors"
              >
                <GithubIcon className="h-3.5 w-3.5" />
              </a>
            )}
          </div>
        </div>
        <p className="text-sm text-muted-foreground leading-relaxed line-clamp-3 flex-1">
          {project.description[lang]}
        </p>
        {project.techs.length > 0 && (
          <div className="flex flex-wrap gap-1">
            {project.techs.map((t, i) => (
              <span
                key={i}
                className="text-xs px-2 py-0.5 rounded border border-border text-muted-foreground"
              >
                {t.name}
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export function ProjectsSection({ projects, locale }: ProjectsSectionProps) {
  if (!projects?.length) return null;
  const lang = locale?.split("-")[0] === "fr" ? "fr" : "en";
  return (
    <section className="space-y-8">
      <SectionHeading
        title={lang === "fr" ? "Projets personnels" : "Personal Projects"}
      />
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {projects.map((p) => (
          <ProjectCard key={p.id} project={p} locale={locale} />
        ))}
      </div>
    </section>
  );
}
