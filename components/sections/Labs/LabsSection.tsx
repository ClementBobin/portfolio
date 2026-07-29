import Link from "next/link";
import { z } from "zod";
import ScrollReveal from "@/components/ui/ScrollReveal";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { getTranslations } from "@/hooks/getTranslations";

interface LabsSectionProps {
  locale: string;
}

const LocalizedStringSchema = z.union([
  z.string(),
  z.object({ en: z.string(), fr: z.string() }),
]);

const LabItemSchema = z.object({
  slug: z.string(),
  title: z.string(),
  description: LocalizedStringSchema,
  tags: z.array(z.string()),
  href: z.string(),
});

const LabItemsSchema = z.array(LabItemSchema);

async function fetchLabs() {
  try {
    const res = await fetch(`${process.env.SITE_URL}/api/labs`);
    if (!res.ok) return [];
    const parsed = LabItemsSchema.safeParse(await res.json());
    return parsed.success ? parsed.data : [];
  } catch {
    return [];
  }
}

/**
 * Renders a list of lab experiment cards fetched from the labs API.
 * Returns null when no labs are available.
 *
 * @param locale - BCP 47 locale used to resolve localised description strings.
 */
export default async function LabsSection({ locale }: LabsSectionProps) {
  const [t, labs] = await Promise.all([
    getTranslations(locale, ["pages"]),
    fetchLabs(),
  ]);
  if (!labs.length) return null;

  return (
    <ul className="flex flex-col gap-3">
      {labs.map((lab, i) => (
        <ScrollReveal key={lab.slug} delay={i * 0.05}>
          <li>
            <Link href={lab.href} className="group block">
              <Card className="transition-shadow group-hover:ring-accent/40 group-hover:shadow-md">
                <CardHeader>
                  <CardTitle className="text-lg font-semibold">
                    {lab.title}
                  </CardTitle>
                  <CardDescription>{t(lab.description)}</CardDescription>
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