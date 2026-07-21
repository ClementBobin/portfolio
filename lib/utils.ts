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

export const groupProjectsByYearAndMonth = (projects) => {
  const grouped = {};
  projects.forEach(project => {
    const date = new Date(project.created_at);
    const year = date.getFullYear();
    const month = date.toLocaleString("default", { month: "long" });

    if (!grouped[year]) grouped[year] = {};
    if (!grouped[year][month]) grouped[year][month] = [];

    grouped[year][month].push(project);
  });
  return grouped;
};


export const getRelativeTime = (date) => {
  const now = new Date();
  const updated = new Date(date);
  const diffTime = Math.abs(now - updated);
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  const diffMonths = Math.floor(diffDays / 30);
  const diffYears = Math.floor(diffDays / 365);

  if (diffYears > 0) {
    return `${diffYears} year${diffYears > 1 ? 's' : ''} ago`;
  } else if (diffMonths > 0) {
    return `${diffMonths} month${diffMonths > 1 ? 's' : ''} ago`;
  } else if (diffDays > 0) {
    return `${diffDays} day${diffDays > 1 ? 's' : ''} ago`;
  } else {
    return 'today';
  }
};