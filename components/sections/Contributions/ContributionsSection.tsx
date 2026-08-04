import type { ContributionItem } from "@/lib/types/contribution";
import ContributionsSectionClient from "./ContributionsSectionClient";

async function fetchContributions(): Promise<ContributionItem[]> {
  const apiUrl = process.env.RESSOURCE_API_URL;
  if (!apiUrl) return [];

  try {
    const res = await fetch(`${apiUrl}/contributions/list`, {
      next: { revalidate: 3600 },
    });

    if (res.ok) {
      const raw = (await res.json()) as Partial<ContributionItem>[];

      return raw.map((item) => ({
        slug: item.slug ?? "",
        title: item.title ?? "",
        subtitle: item.subtitle ?? {},
        description: item.description ?? {},
        tags: item.tags ?? [],
        href: item.href ?? null,
        private: item.private ?? false,
        status: item.status ?? {},
        highlights: item.highlights ?? {},
      }));
    }

    return [];
  } catch {
    return [];
  }
}

interface ContributionsSectionProps {
  locale: string;
  githubUsername?: string;
  githubUrl?: string;
}

export default async function ContributionsSection({
  locale,
  githubUsername,
  githubUrl,
}: ContributionsSectionProps) {
  const items = await fetchContributions();

  if (!items.length) return null;

  return (
    <ContributionsSectionClient
      items={items}
      locale={locale}
      githubUsername={githubUsername}
      githubUrl={githubUrl}
    />
  );
}