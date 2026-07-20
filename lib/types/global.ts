import type { SVGProps } from 'react'

/**
 * Simple localized string
 * Example: { en: "Hello", fr: "Bonjour" }
 */
export type LocalizedString = Record<string, string>;

/**
 * Localized array of strings
 * Example: { en: ["Item 1", "Item 2"], fr: ["Élément 1"] }
 */
export type LocalizedStringArray = Record<string, string[]>;

/**
 * Type for URL object with flexible properties.
 * Used in proxy and middleware for Next.js routing.
 */
export interface NextUrlLike {
  pathname: string;
  search?: string;
  searchParams?: URLSearchParams;
  href?: string;
  origin?: string;
  protocol?: string;
  username?: string;
  password?: string;
  host?: string;
  hostname?: string;
  port?: string;
  hash?: string;
  toString(): string;
}

export type IconProps = SVGProps<SVGSVGElement>