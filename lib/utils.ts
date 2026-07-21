import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { Experience } from "../types/portfolio-api";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Computes years of experience from work experience list.
 */
export default function computeYears(experiences: Experience[]): number | undefined {
  if (!experiences.length) return undefined;
  const now = new Date().getFullYear();
  let earliest = now;
  for (const exp of experiences) {
    if (exp.workType === "work") {
      const period = exp.period.en ?? exp.period.fr;
      const match = period.match(/\d{4}/);
      if (match) {
        const year = parseInt(match[0], 10);
        if (year < earliest) earliest = year;
      }
    }
  }
  const years = now - earliest;
  return years > 0 ? years : undefined;
}

export function formatDate(dateString: string, locale: string = "en"): string {
  try {
    const date = new Date(dateString);
    return date.toLocaleDateString(locale, {
      year: "numeric",
      month: "long",
      day: "numeric",
      timeZone: "UTC",
    });
  } catch {
    return dateString;
  }
}