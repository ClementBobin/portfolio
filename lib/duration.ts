/**
 * duration.ts — Date parsing and duration formatting helpers.
 * Used by ExperienceSection and any other component needing period math.
 */

import type { Experience } from "@/lib/types/portfolio-api";

// ─── Parsing ──────────────────────────────────────────────────────────────────

/**
 * Parse a localized date string like "Sep 2025", "Fév 2025", "2023", or "Present/Présent".
 */
export function parseDate(str: string): Date | null {
  if (!str) return null;

  if (/present|présent|actuel|now/i.test(str.trim())) return new Date();

  const MONTHS: Record<string, number> = {
    jan: 0,
    feb: 1,
    fév: 1,
    mar: 2,
    apr: 3,
    avr: 3,
    may: 4,
    mai: 4,
    jun: 5,
    jul: 6,
    aug: 7,
    sep: 8,
    oct: 9,
    nov: 10,
    dec: 11,
    déc: 11,
  };

  const lower = str.toLowerCase().trim();

  // "Sep 2025", "Fév 2025", etc.
  const monthYear = lower.match(/(\w+)\s+(\d{4})/);
  if (monthYear) {
    const m = MONTHS[monthYear[1].slice(0, 3)];
    if (m !== undefined) return new Date(parseInt(monthYear[2], 10), m);
  }

  // "2025" alone
  const yearOnly = lower.match(/^(\d{4})$/);
  if (yearOnly) return new Date(parseInt(yearOnly[1], 10), 0);

  // ISO or any other format Date can handle
  const d = new Date(str);
  return isNaN(d.getTime()) ? null : d;
}

// ─── Math ─────────────────────────────────────────────────────────────────────

/**
 * Number of months between two dates, counting partial months when
 * end day >= start day.
 */
export function monthsBetween(start: Date, end: Date): number {
  let months =
    (end.getFullYear() - start.getFullYear()) * 12 +
    (end.getMonth() - start.getMonth());

  if (end.getDate() >= start.getDate()) months += 1;

  return Math.max(0, months);
}

/**
 * Merge overlapping [start, end] intervals into a minimal non-overlapping list.
 */
export function mergeIntervals(intervals: [Date, Date][]): [Date, Date][] {
  if (intervals.length === 0) return [];

  intervals.sort((a, b) => a[0].getTime() - b[0].getTime());

  const merged: [Date, Date][] = [[intervals[0][0], intervals[0][1]]];

  for (let i = 1; i < intervals.length; i++) {
    const [currentStart, currentEnd] = intervals[i];
    const last = merged[merged.length - 1];

    if (currentStart <= last[1]) {
      last[1] = new Date(Math.max(last[1].getTime(), currentEnd.getTime()));
    } else {
      merged.push([currentStart, currentEnd]);
    }
  }

  return merged;
}

// ─── Formatting ───────────────────────────────────────────────────────────────

/**
 * Format a total month count as a compact label: "3mo", "1y", "1y 3mo".
 */
export function formatMonths(totalMonths: number): string | null {
  if (totalMonths <= 0) return null;
  if (totalMonths < 12) return `${totalMonths}mo`;
  const y = Math.floor(totalMonths / 12);
  const m = totalMonths % 12;
  return m > 0 ? `${y}y ${m}mo` : `${y}y`;
}

/**
 * Format a total month count as a localized label:
 * "2 ans 3 mois" (fr) or "2 years 3 months" (en).
 */
export function formatMonthsLong(totalMonths: number, lang: "fr" | "en"): string {
  const years = Math.floor(totalMonths / 12);
  const months = totalMonths % 12;

  if (lang === "fr") {
    if (years === 0) return `${months} mois`;
    if (months === 0) return `${years} an${years > 1 ? "s" : ""}`;
    return `${years} an${years > 1 ? "s" : ""} ${months} mois`;
  }

  if (years === 0) return `${months} month${months > 1 ? "s" : ""}`;
  if (months === 0) return `${years} year${years > 1 ? "s" : ""}`;
  return `${years} year${years > 1 ? "s" : ""} ${months} month${months > 1 ? "s" : ""}`;
}

// ─── High-level helpers ───────────────────────────────────────────────────────

/**
 * Parse a period string like "Sep 2025 - Present" and return a compact
 * duration label ("3mo", "1y 2mo") or null if unparseable.
 */
export function durationLabel(periodEn: string): string | null {
  const parts = periodEn.split(/[-–—]/).map((s) => s.trim());
  if (parts.length < 2) return null;

  const start = parseDate(parts[0]);
  const end = parseDate(parts[1]);
  if (!start || !end) return null;

  return formatMonths(monthsBetween(start, end));
}

/**
 * Sum total professional work duration across a list of experiences,
 * merging overlapping intervals to avoid double-counting.
 *
 * @example
 * totalWorkDuration(experiences, "fr") // → "2 ans 3 mois"
 * totalWorkDuration(experiences, "en") // → "2 years 3 months"
 */
export function totalWorkDuration(
  experiences: Experience[],
  lang: "fr" | "en" = "fr",
): string {
  const intervals: [Date, Date][] = [];

  for (const exp of experiences) {
    if (exp.workType !== "work") continue;

    const period = exp.period[lang] ?? exp.period.en;
    const parts = period.split(/[-–—]/).map((s) => s.trim());
    if (parts.length < 2) continue;

    const start = parseDate(parts[0]);
    const end = parseDate(parts[1]);
    if (start && end && end > start) intervals.push([start, end]);
  }

  const merged = mergeIntervals(intervals);
  const totalMonths = merged.reduce(
    (sum, [s, e]) => sum + monthsBetween(s, e),
    0,
  );

  return formatMonthsLong(totalMonths, lang);
}