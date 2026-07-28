import Link from "next/link";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { ExternalLinkIcon } from "@/components/icons/externalLink";
import { CheckCircle2, Calendar, MapPin } from "lucide-react";
import type { Education, Experience, ExperienceTech } from "@/lib/types/portfolio-api";
import { getTranslations } from "@/hooks/getTranslations";

type TimelineCardProps =
  | { kind: "experience"; data: Experience; locale: string; isHighlighted?: boolean }
  | { kind: "education"; data: Education; locale: string; isHighlighted?: boolean };


export async function TimelineCard({ kind, data, locale, isHighlighted }: TimelineCardProps) {
  const t = await getTranslations(locale, ["portfolio"]);
  const isExperience = kind === "experience";
  const exp = isExperience ? (data as Experience) : null;
  const edu = !isExperience ? (data as Education) : null;

  const title = isExperience ? t(exp!.role) : t(edu!.degree);
  const subtitle = isExperience ? t(exp!.company) : t(edu!.school);
  const subtitleHref = isExperience ? exp!.href : edu!.href;
  const period = isExperience ? t(exp!.period) : edu!.period;
  const media = data.media;
  const description = isExperience
    ? t(exp!.description)
    : edu!.description ? t(edu!.description) : undefined;

  const tasks: string[] = (() => {
    const raw = data.tasks;
    if (!raw) return [];
    return raw[locale as "en" | "fr"] ?? raw["en"] ?? [];
  })();

  const techs: string[] = isExperience
    ? exp!.techs.map((tech) => (typeof tech === "string" ? tech : (tech as ExperienceTech).name))
    : [];

  const typeLabel = isExperience
    ? t(exp!.type)
    : locale === "fr" ? "Formation" : "Education";

  const titleHref = isExperience ? undefined : edu!.degreeHref;

  return (
    <div
      className={`overflow-hidden rounded-xl border shadow-sm transition-shadow hover:shadow-md flex flex-col sm:flex-row ${
        isHighlighted
          ? "border-accent/50 bg-accent/5"
          : "border-border bg-card"
      }`}
    >
      {/* ── Media ── */}
      {media && (
        <div className="relative w-full sm:w-48 lg:w-56 shrink-0">
          <div className="relative h-48 sm:h-full min-h-45">
            <Image
              src={media}
              alt={subtitle}
              fill
              className="object-cover"
              sizes="(max-width: 640px) 100vw, 224px"
            />
            <div className="absolute inset-x-0 bottom-0 bg-linear-to-t from-black/60 to-transparent px-3 py-2">
              <span className="text-[11px] font-medium text-white/90">{subtitle}</span>
            </div>
          </div>
        </div>
      )}

      {/* ── Body ── */}
      <div className="flex flex-1 flex-col gap-2.5 p-4 sm:p-5 min-w-0">
        {/* Meta row */}
        <div className="flex flex-wrap items-center justify-between gap-2">
          <span className="inline-flex items-center gap-1.5 text-[11px] font-medium uppercase tracking-wide text-muted-foreground">
            <Calendar className="size-3.5" aria-hidden />
            {period}
          </span>
          <div className="flex items-center gap-2">
            {!media && (
              <span className="inline-flex items-center gap-1 text-[11px] text-muted-foreground">
                <MapPin className="size-3" aria-hidden />
                {subtitle}
              </span>
            )}
            <Badge variant="outline" className="text-[11px]">{typeLabel}</Badge>
          </div>
        </div>

        {/* Title + subtitle */}
        <div className="flex flex-col gap-0.5">
          {titleHref ? (
            <Link
              href={titleHref}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-start gap-1 text-[15px] font-semibold text-foreground hover:text-accent transition-colors"
            >
              {title}
              <ExternalLinkIcon className="mt-1 size-3 shrink-0" />
            </Link>
          ) : (
            <h3 className="text-[15px] font-semibold text-foreground leading-snug">{title}</h3>
          )}

          {subtitleHref && media ? null : subtitleHref ? (
            <Link
              href={subtitleHref}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-xs font-medium text-accent hover:underline underline-offset-4"
            >
              {subtitle}
              <ExternalLinkIcon className="size-3" />
            </Link>
          ) : !media ? null : (
            <span className="text-xs font-medium text-accent">{subtitle}</span>
          )}
        </div>

        {/* Description */}
        {description && (
          <p className="text-xs leading-relaxed text-muted-foreground">{description}</p>
        )}

        {/* Tasks checklist */}
        {tasks.length > 0 && (
          <ul className="flex flex-col gap-1.5">
            {tasks.map((task, i) => (
              <li key={i} className="flex items-start gap-2 text-xs text-foreground/80">
                <CheckCircle2 className="mt-0.5 size-3.5 shrink-0 text-accent" aria-hidden />
                <span>{task}</span>
              </li>
            ))}
          </ul>
        )}

        {/* Tech badges */}
        {techs.length > 0 && (
          <div className="mt-auto flex flex-wrap gap-1.5 pt-1">
            {techs.map((tech) => (
              <Badge key={tech} variant="secondary" className="text-[11px]">
                {tech}
              </Badge>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}