import { ExternalLink } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import ScrollReveal from "@/components/ui/ScrollReveal";

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
            <ul className="flex flex-col gap-5">
              {items.map((item, i) => {
                const label = resolve(item.label, locale);
                const description = resolve(item.description, locale);
                return (
                  <li key={i} className="flex items-start gap-3">
                    <ExternalLink size={14} className="mt-0.5 shrink-0 text-muted-foreground" />
                    <div>
                      <a
                        href={item.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-medium text-foreground transition-colors hover:text-accent hover:underline underline-offset-4"
                      >
                        {label}
                      </a>
                      {description && (
                        <p className="mt-0.5 text-sm leading-relaxed text-muted-foreground">
                          {description}
                        </p>
                      )}
                    </div>
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
          <div className="flex flex-col gap-5">
            {[0, 1, 2].map((j) => (
              <div key={j} className="flex items-start gap-3">
                <Skeleton className="mt-0.5 size-3.5 shrink-0 rounded" />
                <div className="flex-1">
                  <Skeleton className="mb-1.5 h-4 w-32 rounded" />
                  <Skeleton className="h-3 w-3/4 rounded" />
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}