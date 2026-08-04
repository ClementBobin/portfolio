"use client";

import { WordsStagger } from "@/components/ui/words-stagger";

interface AnimatedSectionTitleProps {
  title: string;
}

/**
 * Client-side animated section title using WordsStagger.
 * Used by SectionHeader when animateTitle=true and title is a string.
 */
export default function AnimatedSectionTitle({ title }: AnimatedSectionTitleProps) {
  return (
    <WordsStagger
      stagger={0.05}
      delay={0.1}
      className="text-4xl font-bold tracking-tight"
    >
      {title}
    </WordsStagger>
  );
}
