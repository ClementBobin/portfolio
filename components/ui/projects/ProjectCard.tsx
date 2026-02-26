import { GithubIcon, ExternalLinkIcon, GitForkIcon, StarIcon, TrendingUpIcon } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { getRelativeTime } from "@/lib/utils";
import type { GitHubRepository } from "@/lib/types";

export async function ProjectCard({ project }: { project: GitHubRepository }) {
  return (
    <Card className="group h-full overflow-hidden border bg-card transition-all hover:shadow-lg hover:border-primary/50">
      <a href={project.html_url} target="_blank" rel="noopener noreferrer" className="block h-full">
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
            <CardDescription className="text-sm leading-relaxed line-clamp-2">{project.description}</CardDescription>
          )}
        </CardHeader>

        <CardContent className="space-y-4">
          <div className="flex flex-wrap items-center gap-3">
            {project.language && <Badge variant="secondary" className="font-normal">{project.language}</Badge>}
            <div className="flex items-center gap-1 text-sm text-muted-foreground">
              <StarIcon className="h-3.5 w-3.5" /> <span>{project.stargazers_count}</span>
            </div>
            <div className="flex items-center gap-1 text-sm text-muted-foreground">
              <GitForkIcon className="h-3.5 w-3.5" /> <span>{project.forks_count}</span>
            </div>
          </div>
          <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
            <TrendingUpIcon className="h-3 w-3" />
            <span>Updated {getRelativeTime(project.updated_at)}</span>
          </div>
        </CardContent>
      </a>
    </Card>
  );
}