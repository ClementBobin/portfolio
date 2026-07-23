import { getTranslations } from "@/hooks/useTranslation";
import Link from "next/link";

interface FooterProps {
  locale: string;
}

export default async function Footer({ locale }: FooterProps) {
  const t = await getTranslations(locale, ["common"]);
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-border bg-card/50 px-6 py-10">
      <div className="mx-auto flex max-w-5xl flex-col items-center gap-4 text-center">
        <p className="text-2xl font-bold text-foreground">Clément BOBIN</p>

        <p className="text-sm text-muted-foreground">{t("footer.madeWith")}</p>

        <div className="flex flex-wrap items-center justify-center gap-4 text-sm text-muted-foreground">
          <Link
            href={`/${t("altLocale")}`}
            className="hover:text-accent transition-colors"
          >
            {t("switchLanguage")}
          </Link>
          <span aria-hidden="true">·</span>
          <Link href={`#top`} className="hover:text-accent transition-colors">
            {t("footer.backToTop")}
          </Link>
        </div>

        <p className="text-xs text-muted-foreground">
          {t("footer.copyright", { year })}
        </p>
      </div>
    </footer>
  );
}