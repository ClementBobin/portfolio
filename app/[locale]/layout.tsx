import type { ReactNode } from "react";
import { Navbar } from "@/components/ui/navbar";
import { fetchLangConfig, getTranslations } from "@/lib/i18n";

interface LocaleLayoutProps {
  children: ReactNode;
  params: Promise<{ locale: string }>;
}

export default async function LocaleLayout({
  children,
  params,
}: LocaleLayoutProps) {
  const { locale } = await params;
  const t = await getTranslations(locale, ["common"]);
  const langConfig = await fetchLangConfig();

  const navLinks = [
    { href: `/${locale}`, label: t("nav.home") },
    { href: `https://clementbobin.github.io/cv/view`, label: t("nav.resume") },
    { href: `/${locale}/projects`, label: t("nav.projects") },
    { href: `/${locale}/rss`, label: t("nav.rss") },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar
        links={navLinks}
        locale={locale}
        availableLocales={langConfig.available}
      />
      <main className="flex-1">{children}</main>
      <footer className="border-t-2 border-border/60 py-6 md:py-0">
        <div className="container flex flex-col items-center justify-between gap-4 md:h-16 md:flex-row px-4 mx-auto">
          <p className="text-sm text-muted-foreground">
            {t("footer.copyright")}
          </p>
          <p className="text-xs text-muted-foreground/60">
            {t("footer.build")}
          </p>
        </div>
      </footer>
    </div>
  );
}
