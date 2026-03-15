import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import type {
  GitHubRepository,
  GroupedProjects,
} from "@/lib/types/projects-api";

/**
 * Merges class names using clsx and tailwind-merge.
 *
 * @param inputs - Class names to merge
 * @returns Merged class names
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Formats a date string to a localized format.
 *
 * @param dateString - ISO 8601 date string
 * @param locale - Locale to use for formatting (default: "en")
 * @returns Formatted date string or original string if parsing fails
 */
export function formatDate(dateString: string, locale = "en"): string {
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

/**
 * Groups an array of GitHub projects by year and month of creation.
 *
 * @param projects - Array of GitHub repositories to group
 * @returns Object with years as keys, containing months as keys, containing arrays of projects
 *
 * @example
 * ```ts
 * const grouped = groupProjectsByYearAndMonth(projects);
 * // { "2024": { "January": [...], "February": [...] } }
 * ```
 */
export const groupProjectsByYearAndMonth = (
  projects: GitHubRepository[],
): GroupedProjects => {
  const grouped: GroupedProjects = {};
  projects.forEach((project) => {
    const date = new Date(project.created_at);
    const year = date.getFullYear().toString();
    const month = date.toLocaleString("default", { month: "long" });

    if (!grouped[year]) grouped[year] = {};
    if (!grouped[year][month]) grouped[year][month] = [];

    grouped[year][month].push(project);
  });
  return grouped;
};

/**
 * Calculates a human-readable relative time from a given date.
 *
 * @param date - Date string or Date object to compare against current time
 * @returns Relative time string (e.g., "2 days ago", "3 months ago")
 */
export const getRelativeTime = (date: string | Date): string => {
  const now = new Date();
  const updated = new Date(date);
  const diffTime = Math.abs(now.getTime() - updated.getTime());
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  const diffMonths = Math.floor(diffDays / 30);
  const diffYears = Math.floor(diffDays / 365);

  if (diffYears > 0) {
    return `${diffYears} year${diffYears > 1 ? "s" : ""} ago`;
  }
  if (diffMonths > 0) {
    return `${diffMonths} month${diffMonths > 1 ? "s" : ""} ago`;
  }
  if (diffDays > 0) {
    return `${diffDays} day${diffDays > 1 ? "s" : ""} ago`;
  }
  return "today";
};
