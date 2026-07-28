import { Suspense } from "react";
import { fetchPortfolioData } from "@/lib/data";
import Footer from "@/app/[locale]/Footer";
import Hero from "@/components/sections/Hero/Hero";
import About from "@/components/sections/About/About";
import Skills from "@/components/sections/Skills/Skills";
import Experience from "@/components/sections/Experience/Experience";
import Projects from "@/components/sections/Projects/Projects";
import Philosophy from "@/components/sections/Philosophy/Philosophy";
import Vision from "@/components/sections/Vision/Vision";
import Hobbies from "@/components/sections/Hobbies/Hobbies";
import Strength from "@/components/sections/Strength/Strength";
import type { PageParams } from "@/types/global";
import Recommendations from "@/components/sections/Recommendations/Recommendations";

export default async function PortfolioPage({ params }: PageParams) {
  const { locale } = await params;
  const portfolio = await fetchPortfolioData();

  return (
    <>
      <main className="flex flex-col">
        <Suspense fallback={<div className="h-dvh flex items-center justify-center">Loading...</div>}>
          <Hero personal={portfolio.personal} locale={locale} experiences={portfolio.experiences} contact={portfolio.contact} />
          <About personal={portfolio.personal} portfolio={portfolio} locale={locale} />

          {portfolio.skills.length > 0 && <Skills skills={portfolio.skills} locale={locale} />}
          {portfolio.education.length > 0 && <Experience experiences={portfolio.experiences} education={portfolio.education} locale={locale} />}
          {portfolio.projects.length > 0 && <Projects projects={portfolio.projects} locale={locale} />}
          {portfolio.strength && portfolio.strength.strengths.length > 0 && <Strength strength={portfolio.strength} locale={locale} />}
          {portfolio.philosophy && portfolio.philosophy.cards.length > 0 && <Philosophy philosophy={portfolio.philosophy} locale={locale} />}
          {portfolio.vision && portfolio.vision.length > 0 && <Vision vision={portfolio.vision} locale={locale} />}
          {portfolio.hobbies.length > 0 && <Hobbies hobbies={portfolio.hobbies} locale={locale} />}
          {portfolio.recommendations && portfolio.recommendations.length > 0 && <Recommendations recommendations={portfolio.recommendations} locale={locale} />}
        </Suspense>
      </main>

      <Footer locale={locale} />
    </>
  );
}