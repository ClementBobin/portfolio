"use client";

import { m } from "framer-motion";
import Image from "next/image";
import type { Project } from "@/lib/types/portfolio-api";
import { DynamicLucideIcon } from "@/components/icons";
import { GitHubIcon } from "@/components/icons";
import { useTranslations } from "@/hooks/useTranslations";
import { Badge } from "@/components/ui/badge";
import { PerspectiveBook } from "@/components/ui/perspective-book";

interface ProjectCardProps {
  project: Project;
  locale: string;
  index?: number;
}

/**
 * Displays a project as a 3D PerspectiveBook card.
 *
 * @param project - Project data to render.
 * @param locale - Active locale used for translations.
 * @param index - Optional index for staggered entrance animation delay.
 */
export default function ProjectCard({ project, locale, index = 0 }: ProjectCardProps) {
  const t = useTranslations(locale, ["portfolio"]);
  const title = t(project.title);
  const description = t(project.description);

  return (
    <m.article
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.6, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
    >
      <PerspectiveBook size="lg" textured={!!project.media}>
        {/* Media */}
        {project.media ? (
          <div className="relative h-24 w-full overflow-hidden rounded-md mb-3 bg-secondary flex-shrink-0">
            <Image
              src={project.media}
              alt={title}
              sizes="220px"
              fill
              className="object-cover"
            />
          </div>
        ) : (
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-accent/15 text-accent mb-3 flex-shrink-0">
            <DynamicLucideIcon name="FolderOpen" size={18} />
          </div>
        )}

        {/* Title */}
        <h3 className="text-sm font-semibold leading-snug text-card-foreground mb-1.5">
          {title}
        </h3>

        {/* Description */}
        <p className="text-xs leading-relaxed text-muted-foreground mb-3 flex-1 line-clamp-4">
          {description}
        </p>

        {/* Tech badges */}
        {project.techs.length > 0 && (
          <div className="flex flex-wrap gap-1 mb-3">
            {project.techs.slice(0, 3).map((tech) => (
              <Badge key={tech.name} className="text-[10px] px-1.5 py-0">{tech.name}</Badge>
            ))}
            {project.techs.length > 3 && (
              <Badge className="text-[10px] px-1.5 py-0">+{project.techs.length - 3}</Badge>
            )}
          </div>
        )}

        {/* GitHub link */}
        {project.github && (
          <a
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 text-[11px] font-medium text-muted-foreground hover:text-foreground transition-colors mt-auto"
          >
            <GitHubIcon className="size-3" />
            {t("projects.viewCode")}
          </a>
        )}
      </PerspectiveBook>
    </m.article>
  );
}
