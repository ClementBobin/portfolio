import type { PortfolioData } from "@/lib/types/portfolio-api";
import { ExperienceSection } from "./ExperienceSection";
// Sections
import { HeroSection } from "./HeroSection";
import { HighlightsSection } from "./HighlightsSection";
import { PassionSection } from "./PassionSection";
import { ProjectsSection } from "./ProjectsSection";
import { RecommendationsSection } from "./RecommendationsSection";
import { StrengthSection } from "./StrengthSection";
import { VisionSectionComponent } from "./VisionSection";
import { WhatIBringSection } from "./WhatIBringSection";

// If SkillsSection & EducationSection already exist in your project:
// import { SkillsSection } from "./SkillsSection";
// import { EducationSection } from "./EducationSection";

interface PortfolioPageContentProps {
  data: PortfolioData;
  locale: string;
  cvUrl: string;
}

function SectionWrapper({
  children,
  id,
}: {
  children: React.ReactNode;
  id?: string;
}) {
  return (
    <section
      id={id}
      style={{
        width: "100%",
        maxWidth: "56rem",
        margin: "0 auto",
        padding: "4rem 1.5rem",
      }}
    >
      {children}
    </section>
  );
}

export function PortfolioPageContent({
  data,
  locale,
  cvUrl,
}: PortfolioPageContentProps) {
  const {
    personal,
    contact,
    strength,
    experiences,
    education,
    projects,
    hobbies,
    valueCards,
    highlights,
    vision,
    recommendations,
  } = data;

  return (
    <div
      style={{
        background: "var(--background)",
        color: "var(--foreground)",
        minHeight: "100vh",
      }}
    >
      {/* Hero — full-width, no wrapper */}
      <HeroSection
        personal={personal}
        contact={contact}
        locale={locale}
        cvUrl={cvUrl}
      />

      {/* Strengths horizontal timeline */}
      {strength?.strengths.length ? (
        <>
          <SectionWrapper id="strength">
            <StrengthSection strength={strength} locale={locale} />
          </SectionWrapper>
        </>
      ) : null}


      {/* Experience Timeline */}
      {experiences?.length ? (
        <>
          <SectionWrapper id="experience">
            <ExperienceSection
              experiences={experiences}
              educations={education}
              locale={locale}
              cvUrl={cvUrl}
              />
          </SectionWrapper>
        </>
      ) : null}

      {/* What I Bring */}
      {valueCards?.length ? (
        <>
          <SectionWrapper id="values">
            <WhatIBringSection cards={valueCards} locale={locale} title="Ce que j'apporte" subtitle="Voici ce que j'apporte à chaque projet." />
          </SectionWrapper>
        </>
      ) : null}

      {/* Skills (existing component)
      {data.skills?.length ? (
        <>
          <SectionWrapper id="skills">
            <SkillsSection skills={data.skills} locale={locale} />
          </SectionWrapper>
        </>
      ) : null} */}

      {/* Passions */}
      {/* {hobbies?.length ? (
        <>
          <SectionWrapper id="passions">
            <PassionSection hobbies={hobbies} locale={locale} />
          </SectionWrapper>
        </>
      ) : null} */}

      {/* Personal Projects */}
      {projects?.length ? (
        <>
          <SectionWrapper id="projects">
            <ProjectsSection projects={projects} locale={locale} />
          </SectionWrapper>
        </>
      ) : null}

      {/* Highlights stats strip */}
      {highlights?.length ? (
        <>
          <SectionWrapper>
            <HighlightsSection highlights={highlights} locale={locale} />
          </SectionWrapper>
        </>
      ) : null}

      {/* Vision */}
      {/* {vision?.items?.length ? (
        <>
          <SectionWrapper id="vision">
            <VisionSectionComponent vision={vision} locale={locale} />
          </SectionWrapper>
        </>
      ) : null} */}

      {/* Recommendations */}
      {recommendations?.length ? (
        <SectionWrapper id="recommendations">
          <RecommendationsSection
            recommendations={recommendations}
            locale={locale}
          />
        </SectionWrapper>
      ) : null}

      {/* Footer spacer */}
      <div style={{ height: "6rem" }} />
    </div>
  );
}
