import * as React from "react";
import { Suspense } from "react";
import { fetchPortfolioData } from "@/lib/data";
import NavbarPortfolio from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Hero from "@/components/sections/Hero/Hero";
import About from "@/components/sections/About/About";
import Skills from "@/components/sections/Skills/Skills";
import ExperienceSection from "@/components/sections/Experience/Experience";
import EducationSection from "@/components/sections/Education/Education";
import Projects from "@/components/sections/Projects/Projects";
import Highlights from "@/components/sections/Highlights/Highlights";
import ValueCards from "@/components/sections/ValueCards/ValueCards";
import Vision from "@/components/sections/Vision/Vision";
import Hobbies from "@/components/sections/Hobbies/Hobbies";
import Strength from "@/components/sections/Strength/Strength";
import Contact from "@/components/sections/Contact/Contact";

interface PageParams {
  params: Promise<{ locale: string }>;
}

/**
 * Main portfolio page. Fetches data server-side and renders all sections.
 * Each section is independently wrapped in Suspense for streaming.
 */
export default async function PortfolioPage({ params }: PageParams) {
  const { locale } = await params;
  const data = await fetchPortfolioData();

  const fallbackPersonal = {
    name: "Clément BOBIN",
    title: { fr: "Développeur Fullstack", en: "Fullstack Developer" },
    photo: "",
    subtitle: { libelle: { fr: "Disponible", en: "Available" } },
    summary: {
      fr: "Développeur passionné par la création d'expériences web remarquables.",
      en: "Developer passionate about crafting remarkable web experiences.",
    },
    location: "France",
  };

  const personal = data?.personal ?? fallbackPersonal;
  const contact = data?.contact ?? [];
  const skills = data?.skills ?? [];
  const experiences = data?.experiences ?? [];
  const education = data?.education ?? [];
  const projects = data?.projects ?? [];
  const highlights = data?.highlights ?? [];
  const valueCards = data?.valueCards ?? [];
  const vision = data?.vision ?? null;
  const hobbies = data?.hobbies ?? [];
  const strength = data?.strength ?? null;

  return (
    <>
      <NavbarPortfolio locale={locale} />

      <main className="flex flex-col">
        <Suspense fallback={null}>
          <Hero personal={personal} locale={locale} experiences={experiences} />
        </Suspense>

        <Suspense fallback={<SectionSkeleton />}>
          <About personal={personal} contact={contact} locale={locale} />
        </Suspense>

        {skills.length > 0 && (
          <Suspense fallback={<SectionSkeleton />}>
            <Skills skills={skills} locale={locale} />
          </Suspense>
        )}

        {experiences.length > 0 && (
          <Suspense fallback={<SectionSkeleton />}>
            <ExperienceSection experiences={experiences} locale={locale} />
          </Suspense>
        )}

        {education.length > 0 && (
          <Suspense fallback={<SectionSkeleton />}>
            <EducationSection education={education} locale={locale} />
          </Suspense>
        )}

        {highlights.length > 0 && (
          <Suspense fallback={<SectionSkeleton />}>
            <Highlights highlights={highlights} locale={locale} />
          </Suspense>
        )}

        {projects.length > 0 && (
          <Suspense fallback={<SectionSkeleton />}>
            <Projects projects={projects} locale={locale} />
          </Suspense>
        )}

        {strength && strength.strengths.length > 0 && (
          <Suspense fallback={<SectionSkeleton />}>
            <Strength strength={strength} locale={locale} />
          </Suspense>
        )}

        {valueCards && valueCards.length > 0 && (
          <Suspense fallback={<SectionSkeleton />}>
            <ValueCards valueCards={valueCards} locale={locale} />
          </Suspense>
        )}

        {vision && vision.items.length > 0 && (
          <Suspense fallback={<SectionSkeleton />}>
            <Vision vision={vision} locale={locale} />
          </Suspense>
        )}

        {hobbies.length > 0 && (
          <Suspense fallback={<SectionSkeleton />}>
            <Hobbies hobbies={hobbies} locale={locale} />
          </Suspense>
        )}

        <Suspense fallback={<SectionSkeleton />}>
          <Contact contact={contact} locale={locale} />
        </Suspense>
      </main>

      <Footer locale={locale} />
    </>
  );
}

/**
 * Minimal skeleton placeholder for section loading states.
 */
function SectionSkeleton() {
  return (
    <div className="mx-auto w-full max-w-5xl px-6 py-24">
      <div className="mb-10 h-4 w-32 animate-pulse rounded bg-muted mx-auto" />
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="h-32 animate-pulse rounded-xl bg-muted" />
        <div className="h-32 animate-pulse rounded-xl bg-muted" />
      </div>
    </div>
  );
}
