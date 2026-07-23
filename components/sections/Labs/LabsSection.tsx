import Link from "next/link";
import { Skeleton } from "@/components/ui/skeleton";
import ScrollReveal from "@/components/ui/ScrollReveal";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

type LocalizedString = string | { en: string; fr: string };

interface LabItem {
  slug: string;
  title: string;
  description: LocalizedString;
  tags: string[];
  href: string;
}

function resolve(value: LocalizedString, locale: string): string {
  if (typeof value === "string") return value;
  return value[locale as keyof typeof value] ?? value.en ?? "";
}

async function fetchLabs(): Promise<LabItem[]> {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000";
    const res = await fetch(`${baseUrl}/api/labs`, { next: { revalidate: 3600 } });
    if (!res.ok) return [];
    return res.json();
  } catch {
    return [];
  }
}

export async function LabsSection({ locale }: { locale: string }) {
  const labs = await fetchLabs();
  if (!labs.length) return null;

  return (
    <ul className="flex flex-col gap-3">
      {labs.map((lab, i) => (
        <ScrollReveal key={lab.slug} delay={i * 0.05}>
          <li>
            <Link href={lab.href} className="group block">
              <Card className="transition-all group-hover:ring-accent/40 group-hover:shadow-md">
                <CardHeader>
                  <CardTitle className="text-lg font-semibold">
                    {lab.title}
                  </CardTitle>
                  <CardDescription>{resolve(lab.description, locale)}</CardDescription>
                </CardHeader>
                {lab.tags.length > 0 && (
                  <CardContent>
                    <div className="flex flex-wrap gap-1.5">
                      {lab.tags.map((tag) => (
                        <Badge key={tag} variant="outline">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                )}
              </Card>
            </Link>
          </li>
        </ScrollReveal>
      ))}
    </ul>
  );
}

export function LabsSkeleton() {
  return (
    <ul className="flex flex-col gap-3">
      {Array.from({ length: 5 }).map((_, i) => (
        <li key={i}>
          <Card>
            <CardHeader>
              <Skeleton className="h-5 w-48 rounded" />
              <Skeleton className="h-4 w-3/4 rounded" />
            </CardHeader>
            <CardContent>
              <div className="flex gap-1.5">
                <Skeleton className="h-5 w-16 rounded-full" />
                <Skeleton className="h-5 w-12 rounded-full" />
                <Skeleton className="h-5 w-20 rounded-full" />
              </div>
            </CardContent>
          </Card>
        </li>
      ))}
    </ul>
  );
}