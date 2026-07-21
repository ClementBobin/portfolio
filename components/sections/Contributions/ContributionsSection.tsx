import { Lock } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import ScrollReveal from "@/components/ui/ScrollReveal";
import { Badge } from "@/components/ui/badge";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { GitHubIcon } from "@/components/icons/gitHub";
import { Status, StatusIndicator, StatusLabel } from "@/components/ui/status";
import { getTranslations } from "@/hooks/useTranslation";
import type { ContributionItem } from "@/types/contribution";

async function fetchContributions(): Promise<ContributionItem[]> {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000";
    const res = await fetch(`${baseUrl}/api/contributions`, { next: { revalidate: 3600 } });
    if (!res.ok) return [];
    return res.json();
  } catch {
    return [];
  }
}

export async function ContributionsSection({ locale }: { locale: string }) {
  const t = await getTranslations(locale, ["portfolio"]);
  const items = await fetchContributions();
  if (!items.length) return null;

  return (
    <ul className="flex flex-col gap-6">
      {items.map((item, i) => {
        const highlights = t(item.highlights);

        return (
          <ScrollReveal key={item.slug} delay={i * 0.08}>
            <li>
              <Card>
                <CardHeader className="border-b">
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex flex-col gap-1">
                      <CardTitle className="text-xl">
                        {item.title}
                      </CardTitle>
                      <CardDescription className="text-xs font-medium uppercase tracking-wide">
                        {t(item.subtitle)}
                      </CardDescription>
                    </div>
                    <div className="flex shrink-0 items-center gap-2 pt-0.5">
                      <Status variant={item.private ? "warning" : "success"}>
                        <StatusIndicator />
                        <StatusLabel>{t(item.status)}</StatusLabel>
                      </Status>
                      {item.private && (
                        <span title="Private" className="text-muted-foreground">
                          <Lock size={14} />
                        </span>
                      )}
                    </div>
                  </div>
                </CardHeader>

                <CardContent className="flex flex-col gap-4 pt-4">
                  <p className="text-sm leading-relaxed text-muted-foreground">
                    {t(item.description)}
                  </p>

                  {highlights.length > 0 && (
                    <ul className="flex flex-col gap-1.5">
                      {highlights.map((h, hi) => (
                        <li key={hi} className="flex items-start gap-2 text-sm">
                          <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-accent" />
                          {h}
                        </li>
                      ))}
                    </ul>
                  )}

                  {item.tags.length > 0 && (
                    <div className="flex flex-wrap gap-1.5">
                      {item.tags.map((tag) => (
                        <Badge key={tag} variant="outline">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  )}
                </CardContent>

                {item.href && (
                  <CardFooter>
                    <a
                      href={item.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-sm font-medium transition-colors hover:text-accent"
                    >
                      <GitHubIcon className="size-4" />
                      {t("contributions.viewGithub")}
                    </a>
                  </CardFooter>
                )}
              </Card>
            </li>
          </ScrollReveal>
        );
      })}
    </ul>
  );
}

export function ContributionsSkeleton() {
  return (
    <ul className="flex flex-col gap-6">
      {[0, 1].map((i) => (
        <li key={i}>
          <Card>
            <CardHeader className="border-b">
              <Skeleton className="h-6 w-32 rounded" />
              <Skeleton className="h-3 w-24 rounded" />
            </CardHeader>
            <CardContent className="flex flex-col gap-4 pt-4">
              <Skeleton className="h-16 w-full rounded" />
              <div className="flex flex-col gap-1.5">
                {[0, 1, 2, 3].map((j) => (
                  <Skeleton key={j} className="h-4 w-5/6 rounded" />
                ))}
              </div>
              <div className="flex gap-1.5">
                {[0, 1, 2].map((j) => (
                  <Skeleton key={j} className="h-5 w-16 rounded-full" />
                ))}
              </div>
            </CardContent>
          </Card>
        </li>
      ))}
    </ul>
  );
}