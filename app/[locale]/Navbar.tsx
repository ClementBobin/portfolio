
import FloatingNav from "@/components/ui/FloatingNav";
import type { PageParams } from "@/lib/types/global";

const NAV_ITEMS = [
  { id: "hero",       label: { "fr": "Accueil", "en": "Home" },         href: "/",       icon: "House"  },
  { id: "contributions", label: { "fr": "Contributions", "en": "Contributions" }, href: "/contributions", icon: "HandPlatter" },
  { id: "lab",       label: { "fr": "Lab", "en": "Lab" },          href: "/lab",    icon: "Sparkles" },
  { id: "veille",     label: { "fr": "Veille", "en": "Veille" },       href: "/veille",  icon: "Search" },
];

/**
 * Renders the locale-aware navigation.
 *
 * Uses the locale resolved from the route params to render the appropriate
 * navigation labels and pass the locale to the floating navigation component.
 */
export default async function Navbar({ params }: PageParams) {
  const { locale } = await params;

  return (
    <FloatingNav
      items={NAV_ITEMS}
      locale={locale}
      topId="top"
      altLocaleIcon="ArrowUp"
    />
  );
}