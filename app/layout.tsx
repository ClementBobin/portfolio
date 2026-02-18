import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";

/**
 * Metadata for the application.
 */
export const metadata: Metadata = {
  title: "Portfolio",
  description: "Personal portfolio and project showcase",
};

/**
 * Props for Root Layout component.
 *
 * @property children - Child components to render
 */
interface RootLayoutProps {
  children: React.ReactNode;
}

/**
 * Root layout component for the application.
 * Provides theme support and global styles.
 */
export default function RootLayout({ children }: Readonly<RootLayoutProps>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="font-sans antialiased">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
