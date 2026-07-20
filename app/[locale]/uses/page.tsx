import { ExternalLink } from "lucide-react";

type LocalizedString = string | { en: string; fr: string };

interface UsesItem {
  label: LocalizedString;
  description: LocalizedString;
  href: string;
}

type UsesData = Record<string, UsesItem[]>;

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

interface PageParams {
  params: Promise<{ locale: string }>;
}

export default async function UsesPage({ params }: PageParams) {
  const { locale } = await params;
  const data = await fetchUsesData();

  return (
    <main className="max-w-3xl mx-auto py-20">
      <h1 className="text-3xl font-bold tracking-tight mb-3">Uses</h1>
      <p className="text-muted-foreground mb-12 leading-relaxed">
        I often get messages asking about specific pieces of <strong>software or hardware</strong> I use. This is not a static page; it's a <strong>living document</strong> with everything that I'm using nowadays.
      </p>

      {!data ? (
        <p className="text-muted-foreground">Could not load data.</p>
      ) : (
        <div className="flex flex-col gap-12">
          {Object.entries(data).map(([category, items]) => (
            <section key={category}>
              <h1 className="text-xl font-semibold uppercase tracking-widest mb-4">
                {category}
              </h1>
              <ul className="flex flex-col gap-4">
                {items.map((item, i) => {
                  const label = resolve(item.label, locale);
                  const description = resolve(item.description, locale);
                  return (
                    <li key={`${label}-${i}`} className="px-8 flex items-start gap-1">
                      <div className="shrink-0 mt-1 flex flex-row">
                        <a
                          href={item.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="hover:underline transition-colors"
                        >
                          {label}
                        </a>
                        {description && (
                          <p className="text-sm text-muted-foreground mt-0.5">
                        : {description}
                          </p>
                        )}
                      </div>
                    </li>
                  );
                })}
              </ul>
            </section>
          ))}
        </div>
      )}
    </main>
  );
}