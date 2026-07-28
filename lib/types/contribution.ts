import type { LocalizedArray, LocalizedString } from "./global";

export interface ContributionItem {
  slug: string;
  title: string;
  subtitle: LocalizedString;
  description: LocalizedString;
  tags: string[];
  href: string | null;
  private: boolean;
  status: LocalizedString;
  highlights: LocalizedArray;
}