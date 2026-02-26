import { ProjectCard } from "./ProjectCard";
import { groupProjectsByYearAndMonth } from "@/lib/utils";

interface ProjectsSectionProps {
  projects: any[];
}

export async function ProjectsSection({ projects }: ProjectsSectionProps) {
  return (
    <section className="space-y-12">
      <div className="flex items-center gap-2">
        <h2 className="text-2xl font-semibold">All Projects</h2>
      </div>

      {Object.entries(groupProjectsByYearAndMonth(projects))
        .sort(([yearA], [yearB]) => Number(yearB) - Number(yearA))
        .map(([year, months]) => (
          <div key={year} className="space-y-8">
            <div className="flex items-center gap-4">
              <div className="bg-primary/10 px-4 py-2 rounded-lg">
                <h3 className="text-xl font-bold">{year}</h3>
              </div>
              <div className="flex-1 h-px bg-gradient-to-r from-border to-transparent" />
            </div>

            {Object.entries(months)
              .sort(
                ([monthA], [monthB]) =>
                  new Date(`${monthB} 1, ${year}`).getTime() -
                  new Date(`${monthA} 1, ${year}`).getTime()
              )
              .map(([month, monthProjects]) => (
                <div key={month} className="ml-6 space-y-4">
                  <h4 className="text-lg font-semibold text-muted-foreground flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-primary/50" />
                    {month}
                  </h4>
                  <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    {monthProjects.map((project, index) => (
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
  );
}