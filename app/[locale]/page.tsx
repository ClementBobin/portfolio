import { Suspense } from "react";
import { fetchPortfolioData } from "@/lib/data";
import Footer from "@/app/Footer";
import Hero from "@/components/sections/Hero/Hero";
import About from "@/components/sections/About/About";
import Skills from "@/components/sections/Skills/Skills";
import Experience from "@/components/sections/Experience/Experience";
import Projects from "@/components/sections/Projects/Projects";
import ValueCards from "@/components/sections/ValueCards/ValueCards";
import Vision from "@/components/sections/Vision/Vision";
import Hobbies from "@/components/sections/Hobbies/Hobbies";
import Strength from "@/components/sections/Strength/Strength";
import type { PageParams } from "@/types/global";

export default async function PortfolioPage({ params }: PageParams) {
  const { locale } = await params;
  const {
    personal, contact, skills, experiences,
    education, projects, valueCards,
    vision, hobbies, strength,
  } = await fetchPortfolioData();

  return (
    <>
      <main className="flex flex-col">
        <Suspense fallback={<div className="h-dvh flex items-center justify-center">Loading...</div>}>
          <Hero personal={personal} locale={locale} experiences={experiences} contact={contact} />
          <About personal={personal} locale={locale} />

          {skills.length > 0 && <Skills skills={skills} locale={locale} />}
          {education.length > 0 && <Experience experiences={experiences} education={education} locale={locale} />}
          {projects.length > 0 && <Projects projects={projects} locale={locale} />}
          {strength && strength.strengths.length > 0 && <Strength strength={strength} locale={locale} />}
          {valueCards && valueCards.length > 0 && <ValueCards valueCards={valueCards} locale={locale} />}
          {vision && vision.items.length > 0 && <Vision vision={vision} locale={locale} />}
          {hobbies.length > 0 && <Hobbies hobbies={hobbies} locale={locale} />}
        </Suspense>
      </main>

      <Footer locale={locale} />
    </>
  );
}