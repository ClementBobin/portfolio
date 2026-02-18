import type { ReactNode } from "react";
import { Navbar } from "@/components/ui/navbar";
import { getTranslations } from "@/lib/i18n";

/**
 * Props for locale layout.
 *
 * @property children - Child components to render
 * @property params - Route parameters containing locale
 */
interface LocaleLayoutProps {
  children: ReactNode;
  params: Promise<{ locale: string }>;
}

/**
 * Layout component for locale-specific pages.
 * Provides navigation and consistent structure across all pages.
 */
export default async function LocaleLayout({
  children,
  params,
}: LocaleLayoutProps) {
  const { locale } = await params;
  const t = await getTranslations(locale, ["common"]);

  const navLinks = [
    { href: `/${locale}`, label: t("nav.home") },
    { href: `/${locale}/projects`, label: t("nav.projects") },
    { href: `/${locale}/rss`, label: t("nav.rss") },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar logo={t("nav.title")} links={navLinks} />
      <main className="flex-1">{children}</main>
      <footer className="border-t py-6 md:py-0">
        <div className="container flex flex-col items-center justify-between gap-4 md:h-16 md:flex-row px-4">
          <p className="text-sm text-muted-foreground">
            {t("footer.copyright")}
          </p>
        </div>
      </footer>
    </div>
  );
}
