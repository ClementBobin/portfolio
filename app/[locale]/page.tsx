import {
  ArrowRightIcon,
  CodeIcon,
  RocketIcon,
  SparklesIcon,
} from "lucide-react";
import Link from "next/link";
import { Card } from "@/components/ui/card";
import { getTranslations } from "@/lib/i18n";

/**
 * Props for Home page component.
 *
 * @property params - Route parameters containing locale
 */
interface HomeProps {
  params: Promise<{ locale: string }>;
}

/**
 * Home page component with improved UI/UX.
 * Features hero section, feature cards, and call-to-action.
 */
export default async function Home({ params }: HomeProps) {
  const { locale } = await params;

  // Wait for translations to load
  const t = await getTranslations(locale, ["common"]);

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="w-screen px-4 py-16 md:py-24 lg:py-32">
        <div className="flex flex-col items-center text-center space-y-8">
          <div className="space-y-4 max-w-3xl">
            <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl">
              Welcome to My{" "}
              <span className="bg-gradient-to-r from-primary to-primary/50 bg-clip-text text-transparent">
                Portfolio
              </span>
            </h1>
            <p className="text-lg text-muted-foreground md:text-xl max-w-2xl mx-auto">
              Explore my projects, read my blog, and discover what I'm building.{" "}
              {t("home.saveChanges")}
            </p>
          </div>

          <div className="flex flex-wrap gap-4 justify-center">
            <Link
              href={`/${locale}/projects`}
              className="inline-flex items-center justify-center gap-2 rounded-lg bg-primary px-8 py-3 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              <RocketIcon className="h-4 w-4" />
              View Projects
              <ArrowRightIcon className="h-4 w-4" />
            </Link>
            <Link
              href={`/${locale}/rss`}
              className="inline-flex items-center justify-center gap-2 rounded-lg border border-input bg-background px-8 py-3 text-sm font-medium shadow-sm transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              RSS Feed
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="w-screen px-4 py-16 md:py-24">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {/* Feature 1 */}
          <Card className="group relative overflow-hidden border bg-card p-6 transition-all hover:shadow-lg">
            <div className="flex flex-col gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                <CodeIcon className="h-6 w-6 text-primary" />
              </div>
              <div className="space-y-2">
                <h3 className="font-semibold text-xl">Modern Stack</h3>
                <p className="text-sm text-muted-foreground">
                  Built with Next.js, React, TypeScript, and Tailwind CSS for
                  optimal performance and developer experience.
                </p>
              </div>
            </div>
          </Card>

          {/* Feature 2 */}
          <Card className="group relative overflow-hidden border bg-card p-6 transition-all hover:shadow-lg">
            <div className="flex flex-col gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                <SparklesIcon className="h-6 w-6 text-primary" />
              </div>
              <div className="space-y-2">
                <h3 className="font-semibold text-xl">Beautiful UI</h3>
                <p className="text-sm text-muted-foreground">
                  Carefully crafted components with smooth animations and
                  transitions for a delightful user experience.
                </p>
              </div>
            </div>
          </Card>

          {/* Feature 3 */}
          <Card className="group relative overflow-hidden border bg-card p-6 transition-all hover:shadow-lg sm:col-span-2 lg:col-span-1">
            <div className="flex flex-col gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                <RocketIcon className="h-6 w-6 text-primary" />
              </div>
              <div className="space-y-2">
                <h3 className="font-semibold text-xl">Type Safe</h3>
                <p className="text-sm text-muted-foreground">
                  Fully typed with TypeScript and comprehensive documentation
                  for maintainability and reliability.
                </p>
              </div>
            </div>
          </Card>
        </div>
      </section>

      {/* Navigation Mindmap Section */}
      <section className="w-screen px-4 py-16 md:py-24">
        <div className="space-y-8">
          <div className="text-center space-y-4">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
              Navigation Map
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Explore the connections between different sections of the
              portfolio. Click on any node to navigate, or hover to see details.
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <MindmapNavigation />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="w-screen px-4 py-16 md:py-24">
        <Card className="border bg-card p-8 md:p-12">
          <div className="flex flex-col items-center text-center space-y-4">
            <h2 className="text-2xl font-bold tracking-tighter sm:text-3xl md:text-4xl">
              Ready to explore?
            </h2>
            <p className="text-muted-foreground max-w-xl">
              Check out my latest projects and discover what I've been working
              on.
            </p>
            <Link
              href={`/${locale}/projects`}
              className="inline-flex items-center justify-center gap-2 rounded-lg bg-primary px-8 py-3 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              View All Projects
              <ArrowRightIcon className="h-4 w-4" />
            </Link>
          </div>
        </Card>
      </section>
    </div>
  );
}
