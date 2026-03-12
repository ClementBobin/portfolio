import { GithubIcon, ExternalLinkIcon } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { Project } from "@/lib/types/portfolio-api";
import { SectionHeading } from "./SkillsSection";

interface ProjectsSectionProps {
  projects: Project[];
  locale: string;
}

function ProjectCard({ project, locale }: { project: Project; locale: string }) {
  const lang = locale.split("-")[0] as "en" | "fr";

  return (
    <Card className="group h-full border bg-card hover:shadow-md hover:border-primary/30 transition-all duration-300">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between gap-2">
          <CardTitle className="text-base font-semibold leading-tight group-hover:text-primary transition-colors">
            {project.title[lang]}
          </CardTitle>
          <div className="flex items-center gap-1 shrink-0">
            {project.url && (
              <a
                href={project.url}
                target="_blank"
                rel="noopener noreferrer"
                className="h-7 w-7 rounded-md hover:bg-muted flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors"
                aria-label="Live demo"
              >
                <ExternalLinkIcon className="h-3.5 w-3.5" />
              </a>
            )}
            {project.github && (
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="h-7 w-7 rounded-md hover:bg-muted flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors"
                aria-label="GitHub"
              >
                <GithubIcon className="h-3.5 w-3.5" />
              </a>
            )}
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-3">
        {project.media && (
          <img
            src={project.media}
            alt={project.title[lang]}
            className="w-full h-64 md:h-80 object-cover rounded-xl"
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.style.display = "none";
            }}
          />
        )}
        <p className="text-sm text-muted-foreground leading-relaxed line-clamp-3">
          {project.description[lang]}
        </p>

        {project.techs.length > 0 && (
          <div className="flex flex-wrap gap-1.5">
            {project.techs.map((tech, i) => (
              <Badge key={i} variant="outline" className="text-xs">
                {tech.name}
              </Badge>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}

export function ProjectsSection({ projects, locale }: ProjectsSectionProps) {
  const lang = locale.split("-")[0];
  return (
    <section className="space-y-6">
      <SectionHeading title={lang === "fr" ? "Projets" : "Projects"} />
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {projects.map((project) => (
          <ProjectCard key={project.id} project={project} locale={locale} />
        ))}
      </div>
    </section>
  );
}