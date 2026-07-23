import type { Metadata } from "next";
import { ThemeProvider } from "@/components/ThemeProvider";
import { LazyMotion, domAnimation } from 'framer-motion';
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
