import type { Metadata } from "next";
import { ThemeProvider } from "@/components/ThemeProvider";
import { getTranslations, fetchLangConfig } from "@/lib/hooks/useTranslation";

interface LocaleLayoutParams {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: LocaleLayoutParams): Promise<Metadata> {
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

export async function generateStaticParams() {
  const config = await fetchLangConfig();
  return config.available.map((locale) => ({ locale }));
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
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400..900;1,400..900&family=Lora:ital,wght@0,400..700;1,400..700&family=JetBrains+Mono:wght@100..800&family=Dancing+Script:wght@400..700&display=swap');
        :root {
          --font-playfair: 'Playfair Display', Georgia, serif;
          --font-lora: 'Lora', Georgia, serif;
          --font-jetbrains: 'JetBrains Mono', 'Courier New', monospace;
          --font-dancing: 'Dancing Script', cursive;
        }
      `}</style>
      <div lang={locale}>
        <ThemeProvider>
          {children}
        </ThemeProvider>
      </div>
    </>
  );
}
