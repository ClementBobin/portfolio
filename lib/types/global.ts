import type { SVGProps } from 'react'
// --- i18n types (hook for global use) -----------------------
export type TranslationNamespace = Record<string, LocalizedString | Record<string, unknown>>;
export type LoadedNamespaces = Record<string, TranslationNamespace>;

export type LocalizedString = Record<string, string>;
export type LocalizedArray = Record<string, string[]>;

export interface TFunction {
  (
    key: string | LocalizedString | null | undefined,
    vars?: Record<string, string | number>
  ): string;

  (key: LocalizedArray | null | undefined): string[];
}

export type IconProps = SVGProps<SVGSVGElement>
export interface PageParams {
  params: Promise<{ locale: string }>;
}