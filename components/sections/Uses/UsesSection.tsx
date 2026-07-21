import { ExternalLink } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import ScrollReveal from "@/components/ui/ScrollReveal";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";

type LocalizedString = string | { en: string; fr: string };

export interface UsesItem {
  label: LocalizedString;
  description: LocalizedString;
  href: string;
}

export type UsesData = Record<string, UsesItem[]>;

function resolve(value: LocalizedString, locale: string): string {
  if (typeof value === "string") return value;
  return value[locale as keyof typeof value] ?? value.en ?? "";
}

async function fetchUsesData(): Promise<UsesData | null> {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000";
    const res = await fetch(`${baseUrl}/api/uses`, { next: { revalidate: 3600 } });
    if (!res.ok) return null;
    return res.json();
  } catch {
    return null;
  }
}

interface UsesSectionProps {
  locale: string;
  errorLabel: string;
}

export async function UsesSection({ locale, errorLabel }: UsesSectionProps) {
  const data = await fetchUsesData();

  if (!data) {
    return <p className="text-muted-foreground">{errorLabel}</p>;
  }

  return (
    <div className="flex flex-col gap-14">
      {Object.entries(data).map(([category, items], ci) => (
        <ScrollReveal key={category} delay={ci * 0.08}>
          <section>
            <h2 className="mb-5 text-xs font-semibold uppercase tracking-widest text-muted-foreground">
              {category}
            </h2>
            <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {items.map((item, i) => {
                const label = resolve(item.label, locale);
                const description = resolve(item.description, locale);
                return (
                  <li key={i}>
                    <a
                      href={item.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group block h-full"
                    >
                      <Card className="h-full transition-all group-hover:ring-accent/40 group-hover:shadow-md">
                        <CardHeader>
                          <CardTitle className="flex items-center justify-between gap-2">
                            {label}
                            <ExternalLink
                              size={13}
                              className="shrink-0 text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100"
                            />
                          </CardTitle>
                          {description && (
                            <CardDescription>{description}</CardDescription>
                          )}
                        </CardHeader>
                      </Card>
                    </a>
                  </li>
                );
              })}
            </ul>
          </section>
        </ScrollReveal>
      ))}
    </div>
  );
}

export function UsesSkeleton() {
  return (
    <div className="flex flex-col gap-14">
      {[0, 1, 2].map((i) => (
        <div key={i}>
          <Skeleton className="mb-5 h-3 w-20 rounded" />
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {[0, 1, 2, 3].map((j) => (
              <Skeleton key={j} className="h-20 rounded-xl" />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}