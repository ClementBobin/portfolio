"use client";

import Link from "next/link";
import { Navbar } from "@/components/ui/navbar";
import { useTheme } from "@/components/ThemeProvider";
import { MoonIcon, SunIcon } from "../icons";

interface NavbarPortfolioProps {
  locale: string;
}

const NAV_ITEMS_FR = [
  { label: "À propos", href: "#about" },
  { label: "Compétences", href: "#skills" },
  { label: "Expériences", href: "#experience" },
  { label: "Formation", href: "#education" },
  { label: "Projets", href: "#projects" },
  { label: "Contact", href: "#contact" },
];

const NAV_ITEMS_EN = [
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Experience", href: "#experience" },
  { label: "Education", href: "#education" },
  { label: "Projects", href: "#projects" },
  { label: "Contact", href: "#contact" },
];

/**
 * Portfolio-specific navbar with nav items, locale switcher, and theme toggle.
 * Wraps the base Navbar from components/ui/navbar.
 *
 * @param locale - Current locale code
 */
export default function NavbarPortfolio({ locale }: NavbarPortfolioProps) {
  const { theme, toggleTheme } = useTheme();
  const navItems = locale === "fr" ? NAV_ITEMS_FR : NAV_ITEMS_EN;
  const altLocale = locale === "fr" ? "en" : "fr";

  const themeToggle = (
    <button
      onClick={toggleTheme}
      aria-label={locale === "fr" ? "Changer de thème" : "Toggle theme"}
      className="rounded-lg p-2 text-foreground transition-colors hover:bg-secondary"
    >
      {theme === "dark" ? (
        <SunIcon width="18px" height="18px" />
      ) : (
        <MoonIcon width="18px" height="18px" />
      )}
    </button>
  );

  const localeSwitcher = (
    <Link
      href={`/${altLocale}`}
      className="rounded-lg px-2.5 py-1.5 text-xs font-semibold text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
    >
      {altLocale.toUpperCase()}
    </Link>
  );

  return (
    <Navbar
      navItems={navItems.map((item) => ({
        ...item,
        href: `/${locale}${item.href}`,
      }))}
      themeToggle={themeToggle}
      rightItems={
        <div className="flex items-center gap-1">
          {localeSwitcher}
        </div>
      }
    />
  );
}
