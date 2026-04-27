import type { Metadata } from "next";
import { LazyMotion, domAnimation } from 'framer-motion';
import "./globals.css";

export const metadata: Metadata = {
  title: "Clément BOBIN — Portfolio",
  description: "Fullstack developer portfolio",
};

/**
 * Root layout. Fonts are loaded at runtime in [locale]/layout.tsx via @import
 * to avoid build-time Google Fonts network dependency.
 */
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className="h-full antialiased">
      <body className="min-h-full flex flex-col">
        <LazyMotion features={domAnimation}>
          {children}
        </LazyMotion>
      </body>
    </html>
  );
}
