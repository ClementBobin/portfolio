import { getTranslations } from "@/hooks/useTranslation";
import type { ContributionItem } from "@/types/contribution";
import { ContributionsSectionClient } from "./ContributionsSectionClient";

async function fetchContributions(): Promise<ContributionItem[]> {
  const apiUrl = process.env.NEXT_PUBLIC_RESSOURCE_API_URL;
  if (!apiUrl) return [];

  try {
    const res = await fetch(`${apiUrl}/contributions`, {
      next: { revalidate: 3600 },
    });
    if (res.ok) return await res.json();
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

export async function ContributionsSection({
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