import { fetchGitHubProjects } from "@/lib/github";
import { getTranslations } from "@/lib/i18n";
import { StatsSection } from "./StatsSection";
import { ProjectsSection } from "./ProjectsSection";
import { GithubIcon } from "lucide-react";
import { Separator } from "@/components/ui/separator";

export interface ProjectsPageProps {
  params: Promise<{ locale: string }>;
}

/**
 * Main content of the Projects page (Server Component)
 */
export async function PageContent({ params }: ProjectsPageProps) {
  const { locale } = await params;
  const t = await getTranslations(locale, ["projects"]);
  const { personal, org } = await fetchGitHubProjects();

  const totalProjects = personal.length + org.length;
  const totalStars = personal.reduce((sum, p) => sum + p.stargazers_count, 0);
  const totalForks = personal.reduce((sum, p) => sum + p.forks_count, 0);

  return (
    <div className="w-screen px-4 py-12 md:py-16 space-y-12">
      {/* Header */}
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
          {t("Description1") || "Explore my open source projects and contributions."}{" "}
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
      <StatsSection totalProjects={totalProjects} totalStars={totalStars} totalForks={totalForks} />

      <Separator />

      {/* Projects Section */}
      <ProjectsSection projects={personal} />
    </div>
  );
}