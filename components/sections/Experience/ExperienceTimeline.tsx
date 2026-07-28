import ScrollReveal from "@/components/ui/ScrollReveal";
import type { Education, Experience } from "@/lib/types/portfolio-api";
import { getTranslations } from "@/hooks/getTranslations";
import { TimelineCard } from "./TimelineCard";
import {
  Timeline,
  TimelineItem,
  TimelineDot,
  TimelineConnector,
  TimelineContent,
} from "@/components/ui/timeline";

interface ExperienceTimelineProps {
  experiences: Experience[];
  education?: Education[];
  locale: string;
}

type TimelineEntry =
  | { kind: "experience"; data: Experience; sortKey: string }
  | { kind: "education"; data: Education; sortKey: string };

function parseSortKey(period: string): string {
  const years = period.match(/\d{4}/g);
  if (!years) return "0000";
  return years[years.length - 1];
}

export default async function ExperienceTimeline({
  experiences,
  education = [],
  locale,
}: ExperienceTimelineProps) {
  const t = await getTranslations(locale, ["portfolio"]);

  const items: TimelineEntry[] = [
    ...experiences.map((exp) => ({
      kind: "experience" as const,
      data: exp,
      sortKey: parseSortKey(t(exp.period)),
    })),
    ...education.map((edu) => ({
      kind: "education" as const,
      data: edu,
      sortKey: parseSortKey(edu.period),
    })),
  ].sort((a, b) => b.sortKey.localeCompare(a.sortKey));

  return (
    <Timeline orientation="vertical">
      {items.map((item, i) => {
        const isExp = item.kind === "experience";
        const exp = isExp ? (item.data as Experience) : null;

        return (
          <TimelineItem key={isExp ? `exp-${exp!.id}` : `edu-${item.data.period}-${i}`}>
            <TimelineDot
              className={
                isExp && exp!.isHighlighted
                  ? "border-accent bg-accent"
                  : isExp
                  ? "border-primary bg-card"
                  : "rotate-45 rounded-none border-primary bg-background"
              }
            />
            <TimelineConnector />
            <TimelineContent>
              <ScrollReveal delay={i * 0.07}>
                {item.kind === "experience" ? (
                  <TimelineCard
                    kind="experience"
                    data={item.data}
                    locale={locale}
                    isHighlighted={item.data.isHighlighted}
                  />
                ) : (
                  <TimelineCard
                    kind="education"
                    data={item.data}
                    locale={locale}
                  />
                )}
              </ScrollReveal>
            </TimelineContent>
          </TimelineItem>
        );
      })}
    </Timeline>
  );
}