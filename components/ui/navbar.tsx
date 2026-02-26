"use client";

import {
  MenuIcon,
  MoonIcon,
  NetworkIcon,
  PaletteIcon,
  SunIcon,
  XIcon,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTheme } from "next-themes";
import { useEffect, useRef, useState } from "react";
import { Presence } from "@/components/presence";
import { useThemePreset } from "@/hooks/use-theme-preset";
import { cn } from "@/lib/utils";
import { MindmapPopup } from "./mindmap/mindmap-popup";

/**
 * Props for navigation link items.
 *
 * @property href - URL path for the link
 * @property label - Display text for the link
 * @property icon - Optional icon component
 */
interface NavLinkItem {
  href: string;
  label: string;
  icon?: React.ComponentType<{ className?: string }>;
}

/**
 * Props for Navbar component.
 *
 * @property links - Array of navigation links
 * @property logo - Optional logo text or component
 * @property className - Optional CSS classes
 */
interface NavbarProps {
  links?: NavLinkItem[];
  logo?: React.ReactNode;
  className?: string;
}

/**
 * Theme toggle button component.
 * Switches between light and dark themes with smooth animation.
 */
function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="h-10 w-10 rounded-md border bg-muted/50 animate-pulse" />
    );
  }

  const isDark = theme === "dark";

  return (
    <button
      type="button"
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className={cn(
        "relative h-10 w-10 rounded-md border transition-all",
        "bg-muted/50 hover:bg-muted",
        "flex items-center justify-center",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
      )}
      aria-label="Toggle theme"
    >
      <div className="relative h-6 w-6">
        <Presence present={!isDark}>
          <SunIcon className="absolute inset-0 h-6 w-6 transition-transform duration-300 scale-100 rotate-0" />
        </Presence>
        <Presence present={isDark}>
          <MoonIcon className="absolute inset-0 h-6 w-6 transition-transform duration-300 scale-100 rotate-0" />
        </Presence>
      </div>
    </button>
  );
}

/**
 * Theme preset combobox component.
 * Lets the user pick a color-palette preset from a dropdown.
 */
function ThemePresetSelect() {
  const { preset, setPreset, presets } = useThemePreset();
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  if (!mounted) {
    return (
      <div className="h-10 w-10 rounded-md border bg-muted/50 animate-pulse" />
    );
  }

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className={cn(
          "relative h-10 w-10 rounded-md border transition-all",
          "bg-muted/50 hover:bg-muted",
          "flex items-center justify-center",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
        )}
        aria-label="Select color theme"
        aria-expanded={open}
        aria-haspopup="listbox"
      >
        <PaletteIcon className="h-5 w-5" />
      </button>

      {open && (
        <div
          role="listbox"
          aria-label="Color theme presets"
          className={cn(
            "absolute right-0 top-full mt-2 z-50",
            "min-w-32 rounded-md border bg-popover text-popover-foreground shadow-md",
            "py-1",
          )}
        >
          {(Object.keys(presets) as Array<keyof typeof presets>).map((name) => (
            <button
              key={name}
              type="button"
              role="option"
              aria-selected={preset === name}
              onClick={() => {
                setPreset(name);
                setOpen(false);
              }}
              className={cn(
                "w-full text-left px-3 py-1.5 text-sm transition-colors",
                "hover:bg-accent hover:text-accent-foreground",
                preset === name &&
                  "bg-accent text-accent-foreground font-medium",
              )}
            >
              {presets[name].label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

/**
 * Mobile menu component with slide-in animation.
 *
 * @property isOpen - Whether the menu is open
 * @property onClose - Callback to close the menu
 * @property links - Navigation links to display
 */
interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  links: NavLinkItem[];
}

function MobileMenu({ isOpen, onClose, links }: MobileMenuProps) {
  const pathname = usePathname();

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  return (
    <Presence present={isOpen}>
      <div className="fixed inset-0 z-50 md:hidden animate-in fade-in duration-200">
        {/* Backdrop */}
        <div
          className="absolute inset-0 bg-background/80 backdrop-blur-sm"
          onClick={onClose}
          onKeyDown={(e) => e.key === "Escape" && onClose()}
        />

        {/* Menu Panel */}
        <nav className="fixed right-0 top-0 bottom-0 w-64 bg-background border-l shadow-lg animate-in slide-in-from-right duration-300">
          <div className="flex items-center justify-between p-4 border-b">
            <span className="font-semibold">Menu</span>
            <button
              type="button"
              onClick={onClose}
              className="h-8 w-8 rounded-md hover:bg-accent flex items-center justify-center"
              aria-label="Close menu"
            >
              <XIcon className="h-5 w-5" />
            </button>
          </div>

          <div className="flex flex-col p-4 space-y-2">
            {links.map((link) => {
              const isActive = pathname === link.href;
              const Icon = link.icon;

              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={onClose}
                  className={cn(
                    "flex items-center gap-3 px-4 py-3 rounded-md transition-colors",
                    "hover:bg-accent hover:text-accent-foreground",
                    isActive
                      ? "bg-accent text-accent-foreground font-medium"
                      : "text-foreground",
                  )}
                >
                  {Icon && <Icon className="h-5 w-5" />}
                  {link.label}
                </Link>
              );
            })}
          </div>
        </nav>
      </div>
    </Presence>
  );
}

/**
 * Main navigation bar component with responsive design.
 * Features theme toggle, mobile menu, and active link highlighting.
 *
 * @example
 * ```tsx
 * <Navbar
 *   logo="My Portfolio"
 *   links={[
 *     { href: "/", label: "Home" },
 *     { href: "/projects", label: "Projects" },
 *     { href: "/about", label: "About" },
 *   ]}
 * />
 * ```
 */
export function Navbar({
  links = [],
  logo = "Portfolio",
  className,
}: NavbarProps) {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMindmapOpen, setIsMindmapOpen] = useState(false);

  return (
    <>
      <header
        className={cn(
          "sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60",
          className,
        )}
      >
        <div className="w-screen flex h-16 items-center justify-between px-4">
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center space-x-2 font-bold text-xl hover:opacity-80 transition-opacity"
          >
            {typeof logo === "string" ? <span>{logo}</span> : logo}
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-1">
            {links.map((link) => {
              const isActive = pathname === link.href;
              const Icon = link.icon;

              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    "flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-colors",
                    "hover:bg-accent hover:text-accent-foreground",
                    isActive
                      ? "bg-accent text-accent-foreground"
                      : "text-muted-foreground",
                  )}
                >
                  {Icon && <Icon className="h-4 w-4" />}
                  {link.label}
                </Link>
              );
            })}
          </nav>

          {/* Right Section */}
          <div className="flex items-center gap-2">
            {/* Mindmap Button */}
            <button
              type="button"
              onClick={() => setIsMindmapOpen(true)}
              className={cn(
                "h-10 w-10 rounded-md border transition-all",
                "bg-muted/50 hover:bg-muted",
                "flex items-center justify-center",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
              )}
              aria-label="Open navigation mindmap"
            >
              <NetworkIcon className="h-5 w-5" />
            </button>

            <ThemePresetSelect />
            <ThemeToggle />

            {/* Mobile Menu Button */}
            <button
              type="button"
              onClick={() => setIsMobileMenuOpen(true)}
              className="md:hidden h-10 w-10 rounded-md border bg-muted/50 hover:bg-muted flex items-center justify-center"
              aria-label="Open menu"
            >
              <MenuIcon className="h-5 w-5" />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      <MobileMenu
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
        links={links}
      />

      <MindmapPopup
        open={isMindmapOpen}
        onClose={() => setIsMindmapOpen(false)}
      />
    </>
  );
}
