"use client";

import { ExternalLinkIcon, GithubIcon } from "lucide-react";
import type { Project } from "@/lib/types/portfolio-api";

import {
  Card,
  CardContent,
  CardDescription,
  CardTitle,
} from "../card";
import { Button } from "../button";
import { Badge } from "../badge";
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
    <Card className="group overflow-hidden hover:shadow-lg hover:-translate-y-1 transition-all duration-200">

      <CardContent className="flex flex-col gap-3">

        {/* Header */}
        <div className="flex items-start justify-between gap-2">

          <CardTitle className="text-sm leading-tight group-hover:text-primary transition-colors">
            {project.title[lang]}
          </CardTitle>

          <div className="flex items-center gap-1 shrink-0">

            {project.url && (
              <Button
                asChild
                variant="ghost"
                size="icon-xs"
              >
                <a
                  href={project.url}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <ExternalLinkIcon />
                </a>
              </Button>
            )}

            {project.github && (
              <Button
                asChild
                variant="ghost"
                size="icon-xs"
              >
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <GithubIcon />
                </a>
              </Button>
            )}

          </div>
        </div>

        {/* Description */}
        <CardDescription className="text-sm text-muted-foreground leading-relaxed line-clamp-3 flex-1">
          {project.media && (
            <img
              src={project.media}
              alt={project.title[lang]}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
          )}
          {project.description[lang]}
        </CardDescription>

        {/* Tech stack */}
        {project.techs.length > 0 && (
          <p className="flex flex-wrap gap-1">

            {project.techs.map((tech) => (
              <Badge
                key={tech.id ?? tech.name}
                variant="outline"
                className="text-xs"
              >
                {tech.name}
              </Badge>
            ))}

          </p>
        )}

      </CardContent>
    </Card>
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

      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {projects.map((project) => (
          <ProjectCard
            key={project.id}
            project={project}
            locale={locale}
          />
        ))}
      </div>

    </section>
  );
}