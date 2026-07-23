
import FloatingNav from "@/components/ui/FloatingNav";
import type { PageParams } from "@/types/global";

const NAV_ITEMS_FR = [
  { id: "hero",       label: "Accueil",      href: "/",       icon: "House" },
  { id: "contributions", label: "Contributions", href: "/contributions", icon: "HandPlatter" },
  { id: "lab",       label: "Lab",          href: "/lab",    icon: "Sparkles" },
  { id: "veille",     label: "Veille",       href: "/veille",  icon: "Search" },
];

const NAV_ITEMS_EN = [
  { id: "hero",       label: "Home",         href: "/",       icon: "House"  },
  { id: "contributions", label: "Contributions", href: "/contributions", icon: "HandPlatter" },
  { id: "lab",       label: "Lab",          href: "/lab",    icon: "Sparkles" },
  { id: "veille",     label: "Veille",       href: "/veille",  icon: "Search" },
];

export default async function Navbar({ params }: PageParams) {
  const { locale } = await params;
  const items = locale === "fr" ? NAV_ITEMS_FR : NAV_ITEMS_EN;

  return (
    <FloatingNav
      items={items}
      locale={locale}
      topId="top"
      altLocaleIcon="ArrowUp"
    />
  );
}