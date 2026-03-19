import type { ReactNode } from "react";
import { getTranslations } from "@/lib/i18n";

export default async function LocaleLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations(locale, ["common"]);

  return (
    <div className="min-h-screen flex flex-col">
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