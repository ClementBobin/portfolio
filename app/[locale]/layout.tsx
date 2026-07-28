import type { Metadata } from "next";
import { ThemeProvider } from "@/components/ThemeProvider";
import { LazyMotion, domAnimation } from "framer-motion";
import Navbar from "./Navbar";
import "./globals.css";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: {
      default: "Clément BOBIN — Portfolio",
      template: "%s | Clément BOBIN",
    },
    description: "Fullstack developer portfolio",
  };
}

/**
 * Runs before React hydration to set the correct theme class on <html>,
 * preventing a flash of the wrong theme. Reads localStorage first, then
 * falls back to the OS preference. Must be a blocking script (no defer/async).
 */
const themeInitScript = `(function(){try{var s=localStorage.getItem('theme');if(s==='dark'||s==='light'){if(s==='dark')document.documentElement.classList.add('dark');return;}if(window.matchMedia('(prefers-color-scheme: dark)').matches)document.documentElement.classList.add('dark');}catch(e){}})();`;

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
        <head>
          {/* Blocking theme script: must run before body renders to avoid FOUC */}
          <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
        </head>
        <body>
          <ThemeProvider>
            <LazyMotion features={domAnimation}>
              <Navbar params={params} />
              <section id="top" className="h-0 w-0" />
              {children}
            </LazyMotion>
          </ThemeProvider>
        </body>
      </html>
    </>
  );
}