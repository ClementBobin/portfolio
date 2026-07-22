"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import type { Project } from "@/types/portfolio-api";
import { DynamicLucideIcon } from "@/components/icons";
import { GitHubIcon } from "@/components/icons";
import { useTranslations } from "@/hooks/useTranslation";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface ProjectCardProps {
  project: Project;
  locale: string;
  index?: number;
}

export default function ProjectCard({ project, locale, index = 0 }: ProjectCardProps) {
  const t = useTranslations(locale, ["portfolio"]);
  const title = t(project.title);
  const description = t(project.description);

  return (
    <motion.article
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.6, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
      className="h-full"
    >
      <Card className="group h-full transition-all hover:shadow-lg hover:ring-accent/20">
        {/* Media */}
        {project.media ? (
          <div className="relative h-44 w-full overflow-hidden rounded-t-xl bg-secondary">
            <Image
              src={project.media}
              alt={title}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />
          </div>
        ) : (
          /* Icon placeholder matching screenshot style */
          <div className="flex h-16 w-16 items-center justify-center rounded-xl bg-accent/15 text-accent mx-5 mt-5">
            <DynamicLucideIcon name="FolderOpen" size={28} />
          </div>
        )}

        <CardHeader className={project.media ? "" : "pt-3"}>
          <CardTitle className="text-lg">
            {title}
          </CardTitle>
          <CardDescription className="text-sm leading-relaxed">
            {description}
          </CardDescription>
        </CardHeader>

        {/* Tech icons */}
        {project.techs.length > 0 && (
          <CardContent>
            <div className="flex flex-wrap gap-1.5">
              {project.techs.map((tech) => (
                <Badge key={tech.name}>{tech.name}</Badge>
              ))}
            </div>
          </CardContent>
        )}

        {/* Links */}
        {(project.github) && (
          <CardFooter className="gap-4">
            {project.github && (
              <Link
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
              >
                {t("projects.viewCode")}
                <GitHubIcon className="size-3.5" />
              </Link>
            )}
          </CardFooter>
        )}
      </Card>
    </motion.article>
  );
}