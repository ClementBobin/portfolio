"use client";

import * as React from "react";
import Link from "next/link";
import { Navbar } from "@/components/ui/navbar";
import { useTheme } from "@/components/ThemeProvider";

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
        /* Sun icon */
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <circle cx="12" cy="12" r="4" />
          <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41" />
        </svg>
      ) : (
        /* Moon icon */
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
        </svg>
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

  const brandLink = (
    <Link
      href={`/${locale}`}
      className="font-serif text-xl font-bold text-foreground transition-colors hover:text-accent"
      style={{ fontFamily: "var(--font-dancing, serif)" }}
    >
      Clément B.
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
          {brandLink}
        </div>
      }
    />
  );
}
