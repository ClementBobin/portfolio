import { fetchGitHubProjects } from "@/lib/github";
import { getTranslations } from "@/lib/i18n";
import { getRelativeTime, groupProjectsByYearAndMonth } from "@/lib/utils";

export default async function Page({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations(locale, ["projects"]);
  const { personal, org } = await fetchGitHubProjects();

  return (
    <section className="max-w-6xl mx-auto px-6 py-16 space-y-16">
      {/* Header */}
      <header className="space-y-4">
        <h1 className="text-4xl font-bold">{t("Title")}</h1>
        <p className="text-muted-foreground max-w-3xl">
          {t("Description1")}
          <strong>{t("Description2")}</strong>.{t("Description3")}
          <strong>
            {personal.length + org.length}
            {t("Description4")}
          </strong>
          {t("Description5")}
        </p>
      </header>

      {/* Latest GitHub projects */}
      <section className="space-y-10">
        <h2 className="text-2xl font-semibold">Latest GitHub Projects</h2>

        {Object.entries(groupProjectsByYearAndMonth(personal))
          .sort(([yearA], [yearB]) => Number(yearB) - Number(yearA))
          .map(([year, months]) => (
            <div key={year} className="space-y-6">
              {/* Year */}
              <h3 className="text-xl font-bold">{year}</h3>

              {Object.entries(months)
                .sort(
                  ([monthA], [monthB]) =>
                    new Date(`${monthA} 1, ${year}`).getTime() -
                    new Date(`${monthB} 1, ${year}`).getTime(),
                )
                .map(([month, projects]) => (
                  <div key={month} className="ml-6 space-y-3">
                    {/* Month */}
                    <h4 className="text-lg font-semibold">{month}</h4>

                    <ul className="ml-6 space-y-2">
                      {projects.map((project) => (
                        <li
                          key={project.id}
                          className="flex flex-col gap-1 border-b pb-2 transition hover:translate-x-1"
                        >
                          <a
                            href={project.html_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="font-medium text-blue-500 hover:underline"
                          >
                            {project.name}
                          </a>

                          {project.description && (
                            <span className="text-sm text-muted-foreground">
                              {project.description}
                            </span>
                          )}

                          <span className="text-xs text-muted-foreground">
                            Updated {getRelativeTime(project.updated_at)}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
            </div>
          ))}
      </section>
    </section>
  );
}
