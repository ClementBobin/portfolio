import type { PortfolioData } from "@/lib/types/portfolio-api";

// Sections
import { HeroSection } from "./HeroSection";
import { HighlightsSection } from "./HighlightsSection";
import { StrengthSection } from "./StrengthSection";
import { WhatIBringSection } from "./WhatIBringSection";
import { ExperienceSection } from "./ExperienceSection";
import { PassionSection } from "./PassionSection";
import { ProjectsSection } from "./ProjectsSection";
import { VisionSectionComponent } from "./VisionSection";
import { RecommendationsSection } from "./RecommendationsSection";

// If SkillsSection & EducationSection already exist in your project:
// import { SkillsSection } from "./SkillsSection";
// import { EducationSection } from "./EducationSection";

interface PortfolioPageContentProps {
  data: PortfolioData;
  locale: string;
  cvUrl: string;
}

function SectionWrapper({ children, id }: { children: React.ReactNode; id?: string }) {
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

function Divider() {
  return (
    <div style={{ maxWidth: "56rem", margin: "0 auto", padding: "0 1.5rem" }}>
      <div style={{ height: 1, background: "var(--border)", opacity: 0.5 }} />
    </div>
  );
}

export function PortfolioPageContent({ data, locale, cvUrl }: PortfolioPageContentProps) {
  const {
    personal,
    contact,
    strengths,
    experiences,
    // education,
    projects,
    hobbies,
    valueCards,
    highlights,
    vision,
    recommendations,
  } = data;

  return (
    <div style={{ background: "var(--background)", color: "var(--foreground)", minHeight: "100vh" }}>

      {/* Hero — full-width, no wrapper */}
      <HeroSection personal={personal} contact={contact} locale={locale} cvUrl={cvUrl} />

      {/* Highlights stats strip */}
      {highlights?.length ? (
        <>
          <SectionWrapper>
            <HighlightsSection highlights={highlights} locale={locale} />
          </SectionWrapper>
          <Divider />
        </>
      ) : null}

      {/* Strengths horizontal timeline */}
      {strengths?.length ? (
        <>
          <SectionWrapper id="strengths">
            <StrengthSection strengths={strengths} locale={locale} />
          </SectionWrapper>
          <Divider />
        </>
      ) : null}

      {/* What I Bring */}
      {valueCards?.length ? (
        <>
          <SectionWrapper id="values">
            <WhatIBringSection cards={valueCards} locale={locale} />
          </SectionWrapper>
          <Divider />
        </>
      ) : null}

      {/* Experience Timeline */}
      {experiences?.length ? (
        <>
          <SectionWrapper id="experience">
            <ExperienceSection experiences={experiences} locale={locale} cvUrl={cvUrl} />
          </SectionWrapper>
          <Divider />
        </>
      ) : null}

      {/* Skills (existing component)
      {data.skills?.length ? (
        <>
          <SectionWrapper id="skills">
            <SkillsSection skills={data.skills} locale={locale} />
          </SectionWrapper>
          <Divider />
        </>
      ) : null} */}

      {/* Education (existing component)
      {education?.length ? (
        <>
          <SectionWrapper id="education">
            <EducationSection education={education} locale={locale} />
          </SectionWrapper>
          <Divider />
        </>
      ) : null} */}

      {/* Passions */}
      {hobbies?.length ? (
        <>
          <SectionWrapper id="passions">
            <PassionSection hobbies={hobbies} locale={locale} />
          </SectionWrapper>
          <Divider />
        </>
      ) : null}

      {/* Personal Projects */}
      {projects?.length ? (
        <>
          <SectionWrapper id="projects">
            <ProjectsSection projects={projects} locale={locale} />
          </SectionWrapper>
          <Divider />
        </>
      ) : null}

      {/* Vision */}
      {vision?.items?.length ? (
        <>
          <SectionWrapper id="vision">
            <VisionSectionComponent vision={vision} locale={locale} />
          </SectionWrapper>
          <Divider />
        </>
      ) : null}

      {/* Recommendations */}
      {recommendations?.length ? (
        <>
          <SectionWrapper id="recommendations">
            <RecommendationsSection recommendations={recommendations} locale={locale} />
          </SectionWrapper>
        </>
      ) : null}

      {/* Footer spacer */}
      <div style={{ height: "6rem" }} />
    </div>
  );
}