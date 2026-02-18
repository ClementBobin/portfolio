"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

/**
 * Context for managing the ScrollSpy state.
 *
 * @property activeValue - Currently active section ID
 * @property setActiveValue - Function to update the active section
 */
interface ScrollSpyContextValue {
  activeValue: string | null;
  setActiveValue: (value: string) => void;
}

const ScrollSpyContext = React.createContext<ScrollSpyContextValue | undefined>(
  undefined,
);

/**
 * Hook to access ScrollSpy context.
 *
 * @returns ScrollSpy context value
 * @throws Error if used outside ScrollSpyNav
 */
const useScrollSpy = () => {
  const context = React.useContext(ScrollSpyContext);
  if (!context) {
    throw new Error("useScrollSpy must be used within ScrollSpyNav");
  }
  return context;
};

/**
 * Props for ScrollSpyNav component.
 *
 * @property children - Child components (ScrollSpyLink)
 * @property className - Optional CSS classes
 * @property offset - Offset for intersection observer (default: 100)
 * @property threshold - Threshold for intersection observer (default: 0.5)
 */
interface ScrollSpyNavProps {
  children: React.ReactNode;
  className?: string;
  offset?: number;
  threshold?: number;
}

/**
 * Navigation container for ScrollSpy functionality.
 * Tracks which section is currently in view and highlights the corresponding link.
 *
 * @example
 * ```tsx
 * <ScrollSpyNav>
 *   <ScrollSpyLink value="section1">Section 1</ScrollSpyLink>
 *   <ScrollSpyLink value="section2">Section 2</ScrollSpyLink>
 * </ScrollSpyNav>
 * ```
 */
export function ScrollSpyNav({
  children,
  className,
  offset = 100,
  threshold = 0.5,
}: ScrollSpyNavProps) {
  const [activeValue, setActiveValue] = React.useState<string | null>(null);

  React.useEffect(() => {
    const sections = document.querySelectorAll("[data-scroll-spy]");
    if (sections.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const id = entry.target.getAttribute("data-scroll-spy");
            if (id) setActiveValue(id);
          }
        });
      },
      {
        rootMargin: `-${offset}px 0px -${offset}px 0px`,
        threshold,
      },
    );

    sections.forEach((section) => observer.observe(section));

    return () => {
      sections.forEach((section) => {
        observer.unobserve(section);
      });
    };
  }, [offset, threshold]);

  return (
    <ScrollSpyContext.Provider value={{ activeValue, setActiveValue }}>
      <nav className={cn("flex flex-col space-y-2", className)}>{children}</nav>
    </ScrollSpyContext.Provider>
  );
}

/**
 * Props for ScrollSpyLink component.
 *
 * @property value - ID of the target section
 * @property children - Link text content
 * @property className - Optional CSS classes
 */
interface ScrollSpyLinkProps {
  value: string;
  children: React.ReactNode;
  className?: string;
}

/**
 * Link component that highlights when its target section is in view.
 * Smoothly scrolls to the section when clicked.
 *
 * @example
 * ```tsx
 * <ScrollSpyLink value="introduction">Introduction</ScrollSpyLink>
 * ```
 */
export function ScrollSpyLink({
  value,
  children,
  className,
}: ScrollSpyLinkProps) {
  const { activeValue } = useScrollSpy();
  const isActive = activeValue === value;

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const element = document.querySelector(`[data-scroll-spy="${value}"]`);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <a
      href={`#${value}`}
      onClick={handleClick}
      className={cn(
        "px-3 py-2 text-sm transition-colors rounded-md",
        "hover:bg-accent hover:text-accent-foreground",
        isActive
          ? "bg-accent text-accent-foreground font-medium"
          : "text-muted-foreground",
        className,
      )}
    >
      {children}
    </a>
  );
}

/**
 * Props for ScrollSpy section component.
 *
 * @property id - Unique identifier for the section
 * @property children - Section content
 * @property className - Optional CSS classes
 */
interface ScrollSpySectionProps {
  id: string;
  children: React.ReactNode;
  className?: string;
}

/**
 * Wrapper component for sections that should be tracked by ScrollSpy.
 *
 * @example
 * ```tsx
 * <ScrollSpySection id="introduction">
 *   <h2>Introduction</h2>
 *   <p>Content...</p>
 * </ScrollSpySection>
 * ```
 */
export function ScrollSpySection({
  id,
  children,
  className,
}: ScrollSpySectionProps) {
  return (
    <section id={id} data-scroll-spy={id} className={className}>
      {children}
    </section>
  );
}

/**
 * Legacy export alias for ScrollSpyNav.
 * @deprecated Use ScrollSpyNav instead
 */
export const ScrollSpy = ScrollSpyNav;
