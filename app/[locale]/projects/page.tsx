import {
  BookmarkIcon,
  ExternalLinkIcon,
  GitForkIcon,
  GithubIcon,
  StarIcon,
  TrendingUpIcon,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
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
 * Component to render a single project card with enhanced design.
 *
 * @property project - GitHub repository data
 */
function ProjectCard({ project }: { project: GitHubRepository }) {
  return (
    <Card className="group h-full overflow-hidden border bg-card transition-all hover:shadow-lg hover:border-primary/50">
      <a
        href={project.html_url}
        target="_blank"
        rel="noopener noreferrer"
        className="block h-full"
      >
        <CardHeader className="space-y-3">
          <div className="flex items-start justify-between gap-2">
            <div className="flex items-center gap-2 flex-1 min-w-0">
              <GithubIcon className="h-5 w-5 flex-shrink-0 text-muted-foreground" />
              <CardTitle className="text-lg font-semibold truncate group-hover:text-primary transition-colors">
                {project.name}
              </CardTitle>
            </div>
            <ExternalLinkIcon className="h-4 w-4 flex-shrink-0 opacity-0 group-hover:opacity-100 transition-opacity text-muted-foreground" />
          </div>

          {project.description && (
            <CardDescription className="text-sm leading-relaxed line-clamp-2">
              {project.description}
            </CardDescription>
          )}
        </CardHeader>

        <CardContent className="space-y-4">
          {/* Metadata */}
          <div className="flex flex-wrap items-center gap-3">
            {project.language && (
              <Badge variant="secondary" className="font-normal">
                {project.language}
              </Badge>
            )}
            <div className="flex items-center gap-1 text-sm text-muted-foreground">
              <StarIcon className="h-3.5 w-3.5" />
              <span>{project.stargazers_count}</span>
            </div>
            <div className="flex items-center gap-1 text-sm text-muted-foreground">
              <GitForkIcon className="h-3.5 w-3.5" />
              <span>{project.forks_count}</span>
            </div>
          </div>

          {/* Updated time */}
          <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
            <TrendingUpIcon className="h-3 w-3" />
            <span>Updated {getRelativeTime(project.updated_at)}</span>
          </div>
        </CardContent>
      </a>
    </Card>
  );
}

/**
 * Statistics card component showing project overview.
 */
function StatsCard({
  icon: Icon,
  label,
  value,
}: {
  icon: React.ElementType;
  label: string;
  value: number;
}) {
  return (
    <Card className="overflow-hidden">
      <CardContent className="p-6">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-primary/10 rounded-lg">
            <Icon className="h-6 w-6 text-primary" />
          </div>
          <div>
            <p className="text-sm text-muted-foreground">{label}</p>
            <p className="text-2xl font-bold">{value}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

/**
 * Projects page component displaying GitHub repositories.
 * Features professional layout with statistics and organized project cards.
 */
export default async function Page({ params }: ProjectsPageProps) {
  const { locale } = await params;
  const t = await getTranslations(locale, ["projects"]);
  const { personal, org } = await fetchGitHubProjects();

  const totalProjects = personal.length + org.length;
  const totalStars = personal.reduce((sum, p) => sum + p.stargazers_count, 0);
  const totalForks = personal.reduce((sum, p) => sum + p.forks_count, 0);

  return (
    <div className="w-screen px-4 py-12 md:py-16 space-y-12">
      {/* Header Section */}
      <header className="space-y-6">
        <div className="flex items-center gap-3">
          <div className="relative">
            <div className="absolute inset-0 bg-primary/20 blur-xl rounded-full" />
            <div className="relative bg-primary/10 p-3 rounded-2xl">
              <GithubIcon className="h-8 w-8 text-primary" />
            </div>
          </div>
          <h1 className="text-4xl font-bold tracking-tighter md:text-5xl">
            {t("Title") || "My Projects"}
          </h1>
        </div>

        <p className="text-lg text-muted-foreground max-w-3xl leading-relaxed">
          {t("Description1") ||
            "Explore my open source projects and contributions."}{" "}
          <strong className="text-foreground">{t("Description2")}</strong>
          {t("Description3")}
          <strong className="text-foreground">
            {" "}
            {totalProjects} {t("Description4") || "projects"}
          </strong>
          {t("Description5")}
        </p>
      </header>

      {/* Statistics Section */}
      <section>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <StatsCard
            icon={BookmarkIcon}
            label="Total Projects"
            value={totalProjects}
          />
          <StatsCard icon={StarIcon} label="Total Stars" value={totalStars} />
          <StatsCard
            icon={GitForkIcon}
            label="Total Forks"
            value={totalForks}
          />
        </div>
      </section>

      <Separator />

      {/* Projects Section */}
      <section className="space-y-12">
        <div className="flex items-center gap-2">
          <h2 className="text-2xl font-semibold">All Projects</h2>
        </div>

        {Object.entries(groupProjectsByYearAndMonth(personal))
          .sort(([yearA], [yearB]) => Number(yearB) - Number(yearA))
          .map(([year, months]) => (
            <div key={year} className="space-y-8">
              {/* Year Header */}
              <div className="flex items-center gap-4">
                <div className="bg-primary/10 px-4 py-2 rounded-lg">
                  <h3 className="text-xl font-bold">{year}</h3>
                </div>
                <div className="flex-1 h-px bg-gradient-to-r from-border to-transparent" />
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
                    {/* Month Header */}
                    <h4 className="text-lg font-semibold text-muted-foreground flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-primary/50" />
                      {month}
                    </h4>

                    {/* Projects Grid */}
                    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                      {projects.map((project, index) => (
                        <div
                          key={project.id}
                          className="animate-in fade-in slide-in-from-bottom-2 duration-500"
                          style={{ animationDelay: `${index * 50}ms` }}
                        >
                          <ProjectCard project={project} />
                        </div>
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
