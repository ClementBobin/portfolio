
import FloatingNav from "@/components/ui/FloatingNav";
import { getTranslations } from "@/hooks/useTranslation";
import type { PageParams } from "@/types/global";

const NAV_ITEMS_FR = [
  { id: "hero",       label: "Accueil",      href: "/",       emoji: "🏠" },
  { id: "contributions", label: "Contributions", href: "/contributions", emoji: "💻" },
  { id: "lab",       label: "Lab",          href: "/lab",    emoji: "🧪" },
  { id: "veille",     label: "Veille",       href: "/veille",  emoji: "🔍" },
];

const NAV_ITEMS_EN = [
  { id: "hero",       label: "Home",         href: "/",       emoji: "🏠" },
  { id: "contributions", label: "Contributions", href: "/contributions", emoji: "💻" },
  { id: "lab",       label: "Lab",          href: "/lab",    emoji: "🧪" },
  { id: "veille",     label: "Veille",       href: "/veille",  emoji: "🔍" },
];

export default async function Navbar({ params }: PageParams) {
  const { locale } = await params;
  const t = await getTranslations(locale, ["common"]);
  const items = locale === "fr" ? NAV_ITEMS_FR : NAV_ITEMS_EN;

  return (
    <FloatingNav
      items={items}
      locale={locale}
      altLocale={t("footer.backToTop")}
      altLocaleLabel={t("footer.backToTop").toUpperCase()}
    />
  );
}