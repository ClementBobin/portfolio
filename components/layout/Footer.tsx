import * as React from "react";
import Link from "next/link";

interface FooterProps {
  locale: string;
}

/**
 * Portfolio footer with copyright, social links, and locale switcher.
 *
 * @param locale - Current locale code
 */
export default function Footer({ locale }: FooterProps) {
  const year = new Date().getFullYear();
  const altLocale = locale === "fr" ? "en" : "fr";
  const madeWith = locale === "fr"
    ? "Fait avec ☕ et passion"
    : "Made with ☕ and passion";

  return (
    <footer className="border-t border-border bg-card/50 px-6 py-10">
      <div className="mx-auto flex max-w-5xl flex-col items-center gap-4 text-center">
        {/* Brand */}
        <p className="font-[family-name:var(--font-dancing)] text-2xl font-bold text-foreground">
          Clément BOBIN
        </p>

        {/* Tagline */}
        <p className="text-sm text-muted-foreground">{madeWith}</p>

        {/* Links */}
        <div className="flex flex-wrap items-center justify-center gap-4 text-sm text-muted-foreground">
          <Link
            href={`/${altLocale}`}
            className="hover:text-accent transition-colors"
          >
            {altLocale === "en" ? "English" : "Français"}
          </Link>
          <span aria-hidden="true">·</span>
          <Link href={`/${locale}#hero`} className="hover:text-accent transition-colors">
            {locale === "fr" ? "Haut de page" : "Back to top"}
          </Link>
        </div>

        {/* Copyright */}
        <p className="text-xs text-muted-foreground">
          © {year} Clément BOBIN. {locale === "fr" ? "Tous droits réservés." : "All rights reserved."}
        </p>
      </div>
    </footer>
  );
}
