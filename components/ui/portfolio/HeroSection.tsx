"use client";

import { MapPinIcon, ExternalLinkIcon, GithubIcon, LinkedinIcon, GlobeIcon } from "lucide-react";
import Image from "next/image";
import type { PortfolioPersonal, ContactItem } from "@/lib/types/portfolio-api";
import { cn } from "@/lib/utils";

interface HeroSectionProps {
  personal: PortfolioPersonal;
  contact: ContactItem[];
  locale: string;
}

function getContactIcon(type: string) {
  switch (type) {
    case "github": return GithubIcon;
    case "linkedin": return LinkedinIcon;
    case "website": return GlobeIcon;
    case "location": return MapPinIcon;
    default: return GlobeIcon;
  }
}

export function HeroSection({ personal, contact, locale }: HeroSectionProps) {
  const lang = locale.split("-")[0] as "en" | "fr";

  return (
    <section className="relative overflow-hidden py-20 md:py-28">
      {/* Background decoration */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-primary/8 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 max-w-5xl">
        <div className="flex flex-col md:flex-row items-center md:items-start gap-10 md:gap-16">
          {/* Avatar */}
          <div className="relative shrink-0 group">
            <div className="absolute inset-0 rounded-2xl bg-linear-to-br from-primary/30 to-primary/5 blur-xl scale-110 group-hover:scale-125 transition-transform duration-500" />
            <div className="relative w-36 h-36 md:w-44 md:h-44 rounded-2xl overflow-hidden border-2 border-border shadow-2xl">
              {personal.photo ? (
                <img
                src={personal.photo}
                alt={personal.name}
                width={176}
                height={176}
                className="object-cover transition-transform duration-500 group-hover:scale-105"
                onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.style.display = "none";
                    target.nextElementSibling?.classList.remove("hidden");
                }}
                />
              ) : null}
              <div className={cn("w-full h-full bg-muted flex items-center justify-center text-5xl", personal.photo ? "hidden" : "")}>
                {personal.photoBackEmoji ?? "👤"}
              </div>
            </div>
            {/* Floating badge */}
            {personal.status?.[lang]?.trim() ? (
            <div className="absolute -bottom-3 -right-3 bg-background border border-border rounded-xl px-2.5 py-1.5 shadow-lg">
                <span className="text-xs font-semibold text-primary">
                {personal.status[lang]}
                </span>
            </div>
            ) : null}
          </div>

          {/* Info */}
          <div className="flex-1 text-center md:text-left space-y-5">
            {/* Subtitle badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-sm font-medium text-primary">
              <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
              {personal.subtitle[lang]}
            </div>

            {/* Name */}
            <div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-foreground leading-tight">
                {personal.name}
              </h1>
              <p className="mt-2 text-lg md:text-xl text-muted-foreground font-medium">
                {personal.title[lang]}
              </p>
            </div>

            {/* Summary */}
            <p className="text-base md:text-lg text-muted-foreground leading-relaxed max-w-2xl">
              {personal.summary[lang]}
            </p>

            {/* Contact links */}
            <div className="flex flex-wrap gap-3 justify-center md:justify-start">
              {contact.map((item) => {
                const Icon = getContactIcon(item.type);
                if (!item.href) {
                  return (
                    <div
                      key={item.type}
                      className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-muted/60 text-muted-foreground text-sm font-medium"
                    >
                      <Icon className="h-4 w-4" />
                      <span>{item.label}</span>
                    </div>
                  );
                }
                return (
                  <a
                    key={item.type}
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-muted/60 hover:bg-muted text-sm font-medium transition-all hover:scale-105 hover:shadow-sm group/link"
                  >
                    <Icon className="h-4 w-4 text-muted-foreground group-hover/link:text-foreground transition-colors" />
                    <span className="text-muted-foreground group-hover/link:text-foreground transition-colors">{item.label}</span>
                    <ExternalLinkIcon className="h-3 w-3 opacity-0 group-hover/link:opacity-100 transition-opacity text-muted-foreground" />
                  </a>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}