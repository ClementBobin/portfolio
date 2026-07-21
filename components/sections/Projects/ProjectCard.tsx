"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import type { Project } from "@/types/portfolio-api";
import { DynamicIcon } from "@/components/icons";
import { useTranslations } from "@/hooks/useTranslation";

interface ProjectCardProps {
  project: Project;
  locale: string;
  index?: number;
}

/**
 * Project card with image/media, title, description, tech badges, and links.
 * Animates in with a scroll-reveal effect.
 *
 * @param project - Project data
 * @param locale - Current locale
 * @param index - Card index for staggered animation delay
 */
export default function ProjectCard({ project, locale, index = 0 }: ProjectCardProps) {
  const t = useTranslations(locale, ["portfolio"]);
  const title = t(project.title);
  const badges = project.badge?.map((b) => t(b)) ?? [];

  return (
    <motion.article
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.6, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
      className="group flex flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-sm transition-shadow hover:shadow-lg"
    >
      {/* Media */}
      {project.media && (
        <div className="relative h-48 w-full overflow-hidden bg-secondary">
          <Image
            src={project.media}
            alt={title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
        </div>
      )}

      {/* Content */}
      <div className="flex flex-1 flex-col gap-4 p-5">
        <div>
          {/* Badges */}
          {badges.length > 0 && (
            <div className="mb-2 flex flex-wrap gap-1.5">
              {badges.map((badge) => (
                <span
                  key={badge}
                  className="rounded-full bg-accent/15 px-2.5 py-0.5 text-xs font-medium text-accent"
                >
                  {badge}
                </span>
              ))}
            </div>
          )}

          <h3 className="text-lg font-semibold text-foreground">
            {title}
          </h3>
          <p className="mt-2 text-sm leading-relaxed text-foreground/75">{t(project.description)}</p>
        </div>

        {/* Tech badges */}
        {project.techs.length > 0 && (
          <div className="flex flex-wrap gap-1.5">
            {project.techs.map((tech) => (
              <DynamicIcon key={tech.name} iconClass={tech.name} />
            ))}
          </div>
        )}

        {/* Links */}
        <div className="mt-auto flex gap-3">
          {project.href && (
            <Link
              href={project.href}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 rounded-full bg-primary px-4 py-2 text-xs font-semibold text-primary-foreground transition-all hover:brightness-110"
            >
              <span>🔗</span>
              {t("projects.viewProject")}
            </Link>
          )}
          {project.githubHref && (
            <Link
              href={project.githubHref}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 rounded-full border border-border px-4 py-2 text-xs font-semibold text-foreground transition-all hover:border-accent hover:text-accent"
            >
              <span>🐙</span>
              GitHub
            </Link>
          )}
        </div>
      </div>
    </motion.article>
  );
}