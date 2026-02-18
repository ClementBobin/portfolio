import {
  ExternalLinkIcon,
  GitForkIcon,
  GithubIcon,
  StarIcon,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { fetchGitHubProjects } from "@/lib/github";
import { getTranslations } from "@/lib/i18n";
import type { GitHubRepository } from "@/lib/types";
import { getRelativeTime, groupProjectsByYearAndMonth } from "@/lib/utils";

/**
 * Props for Projects page component.
 *
 * @property params - Route parameters containing locale
 */
interface ProjectsPageProps {
  params: Promise<{ locale: string }>;
}

/**
 * Component to render a single project card.
 *
 * @property project - GitHub repository data
 */
function ProjectCard({ project }: { project: GitHubRepository }) {
  return (
    <Card className="group relative overflow-hidden border bg-card p-6 transition-all hover:shadow-lg hover:border-primary/50">
      <div className="flex flex-col gap-4">
        {/* Header */}
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1 space-y-1">
            <a
              href={project.html_url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 font-semibold text-lg hover:text-primary transition-colors"
            >
              <GithubIcon className="h-5 w-5" />
              {project.name}
              <ExternalLinkIcon className="h-4 w-4 opacity-0 group-hover:opacity-100 transition-opacity" />
            </a>
            <p className="text-xs text-muted-foreground">
              Updated {getRelativeTime(project.updated_at)}
            </p>
          </div>
        </div>

        {/* Description */}
        {project.description && (
          <p className="text-sm text-muted-foreground line-clamp-2">
            {project.description}
          </p>
        )}

        {/* Metadata */}
        <div className="flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
          {project.language && (
            <Badge variant="secondary" className="font-normal">
              {project.language}
            </Badge>
          )}
          <div className="flex items-center gap-1">
            <StarIcon className="h-4 w-4" />
            <span>{project.stargazers_count}</span>
          </div>
          <div className="flex items-center gap-1">
            <GitForkIcon className="h-4 w-4" />
            <span>{project.forks_count}</span>
          </div>
        </div>
      </div>
    </Card>
  );
}

/**
 * Projects page component displaying GitHub repositories.
 * Groups projects by year and month with improved card layout.
 */
export default async function Page({ params }: ProjectsPageProps) {
  const { locale } = await params;
  const t = await getTranslations(locale, ["projects"]);
  const { personal, org } = await fetchGitHubProjects();

  return (
    <div className="container px-4 py-12 md:py-16 space-y-12">
      {/* Header */}
      <header className="space-y-4 max-w-3xl">
        <h1 className="text-4xl font-bold tracking-tighter md:text-5xl">
          {t("Title")}
        </h1>
        <p className="text-lg text-muted-foreground">
          {t("Description1")}
          <strong className="text-foreground">{t("Description2")}</strong>.
          {t("Description3")}
          <strong className="text-foreground">
            {" "}
            {personal.length + org.length} {t("Description4")}
          </strong>
          {t("Description5")}
        </p>
      </header>

      {/* Latest GitHub projects */}
      <section className="space-y-12">
        <div className="flex items-center gap-2">
          <GithubIcon className="h-6 w-6" />
          <h2 className="text-2xl font-semibold">Latest GitHub Projects</h2>
        </div>

        {Object.entries(groupProjectsByYearAndMonth(personal))
          .sort(([yearA], [yearB]) => Number(yearB) - Number(yearA))
          .map(([year, months]) => (
            <div key={year} className="space-y-8">
              {/* Year */}
              <div className="flex items-center gap-4">
                <h3 className="text-xl font-bold">{year}</h3>
                <div className="flex-1 h-px bg-border" />
              </div>

              {Object.entries(months)
                .sort(
                  // Sort months in descending order (most recent first)
                  ([monthA], [monthB]) =>
                    new Date(`${monthB} 1, ${year}`).getTime() -
                    new Date(`${monthA} 1, ${year}`).getTime(),
                )
                .map(([month, projects]) => (
                  <div key={month} className="ml-6 space-y-4">
                    {/* Month */}
                    <h4 className="text-lg font-semibold text-muted-foreground">
                      {month}
                    </h4>

                    {/* Projects Grid */}
                    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                      {projects.map((project) => (
                        <ProjectCard key={project.id} project={project} />
                      ))}
                    </div>
                  </div>
                ))}
            </div>
          ))}
      </section>
    </div>
  );
}
