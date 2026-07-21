import type { ReactNode, SVGProps } from 'react'
import { z } from "zod";

/**
 * Type for URL object with flexible properties.
 * Used in proxy and middleware for Next.js routing.
 */
export interface NextUrlLike {
  pathname: string;
  search?: string;
  searchParams?: URLSearchParams;
  href?: string;
  origin?: string;
  protocol?: string;
  username?: string;
  password?: string;
  host?: string;
  hostname?: string;
  port?: string;
  hash?: string;
  toString(): string;
}

export type IconProps = SVGProps<SVGSVGElement>
export interface PageParams {
  params: Promise<{ locale: string }>;
}

export interface ContactDialogProps {
  trigger: ReactNode;
  email?: string;
  linkedinUrl?: string;
  linkedinLabel?: string;
  locale: "fr" | "en";
}

// ─── Schema ───────────────────────────────────────────────────────────────────
export const contactSchema = z.object({
  name: z.string().min(1, "Le nom est requis"),
  email: z.string().email("Adresse email invalide"),
  phone: z.string().optional(),
  message: z.string().min(10, "Le message doit contenir au moins 10 caractères"),
});

export type ContactFormValues = z.infer<typeof contactSchema>;