import type { Metadata } from "next";
import { ThemeProvider } from "@/components/ThemeProvider";
import { getTranslations } from "@/hooks/useTranslation";
import type { PageParams } from "@/types/global";
import { LazyMotion, domAnimation } from 'framer-motion';
import "./globals.css";

export async function generateMetadata({ params }: PageParams): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations(locale, ["email"]);
  return {
    title: {
      default: "Clément BOBIN — Portfolio",
      template: "%s | Clément BOBIN",
    },
    description: t("seo.description") || "Fullstack developer portfolio",
  };
}

/**
 * Locale-specific layout. Applies editorial font CSS variables, ThemeProvider, and lang attribute.
 * Fonts are loaded via an inline <style> tag at runtime to avoid build-time Google Fonts fetching.
 */
export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  return (
    <>
      {/* Load editorial fonts at runtime — no build-time network dependency */}
      <html lang={locale}>
        <body>
          <ThemeProvider>
            <LazyMotion features={domAnimation}>
              {children}
            </LazyMotion>
          </ThemeProvider>
        </body>
      </html>
    </>
  );
}
