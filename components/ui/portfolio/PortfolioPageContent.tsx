import type { PortfolioData } from "@/lib/types/portfolio-api";
import { HeroSection } from "@/components/ui/portfolio/HeroSection";
import { SkillsSection } from "@/components/ui/portfolio/SkillsSection";
import { ExperienceSection } from "@/components/ui/portfolio/ExperienceSection";
import { EducationSection } from "@/components/ui/portfolio/EducationSection";
import { ProjectsSection } from "@/components/ui/portfolio/ProjectsSection";
// import { HobbiesSection } from "@/components/ui/portfolio/HobbiesSection";
import { Separator } from "@/components/ui/separator";

export interface PortfolioPageProps {
  params: Promise<{ locale: string }>;
}

async function fetchPortfolioData(): Promise<PortfolioData | null> {
  try {
    // Call the internal API route
    const baseUrl = process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000";
    const res = await fetch(`${baseUrl}/api/portfolio`, {
      next: { revalidate: 3600 },
    });
    if (!res.ok) return null;
    return res.json();
  } catch {
    return null;
  }
}

export async function PortfolioPageContent({ params }: PortfolioPageProps) {
  const { locale } = await params;
  const data = await fetchPortfolioData();

  if (!data) {
    return (
      <div className="container mx-auto px-4 max-w-5xl py-20 text-center">
        <p className="text-muted-foreground">
          {locale.startsWith("fr") ? "Impossible de charger les données du portfolio." : "Unable to load portfolio data."}
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <HeroSection personal={data.personal} contact={data.contact} locale={locale} />

      {/* Content sections */}
      <div className="container mx-auto px-4 max-w-5xl pb-24 space-y-20">
        <Separator />

        <SkillsSection skills={data.skills} locale={locale} />

        <Separator />

        <ExperienceSection experiences={data.experiences} locale={locale} />

        <Separator />

        <EducationSection education={data.education} locale={locale} />

        <Separator />

        <ProjectsSection projects={data.projects} locale={locale} />
      </div>
    </div>
  );
}