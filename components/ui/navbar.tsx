"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

interface NavItem {
  label: string;
  href: string;
  isDropdown?: boolean;
  children?: { label: string; href: string }[];
}

interface NavbarProps {
  navItems?: NavItem[];
  rightItems?: React.ReactNode;
  themeToggle?: React.ReactNode;
  themePresetSelect?: React.ReactNode;
  mindmapPopup?: React.ReactNode;
}

export function Navbar({
  navItems = [],
  rightItems,
  themeToggle,
  themePresetSelect,
  mindmapPopup,
}: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [_mobileOpen, _setMobileOpen] = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 12);
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  const navBase: React.CSSProperties = {
    position: "fixed",
    inset: "0 0 auto 0",
    zIndex: 50,
    height: 52,
    display: "flex",
    alignItems: "center",
    transition:
      "background 0.25s, border-color 0.25s, box-shadow 0.25s, backdrop-filter 0.25s",
    background: scrolled ? "var(--background)" : "transparent",
    borderBottom: `1px solid ${scrolled ? "var(--border)" : "transparent"}`,
    backdropFilter: scrolled ? "blur(14px) saturate(1.5)" : "none",
    WebkitBackdropFilter: scrolled ? "blur(14px) saturate(1.5)" : "none",
    boxShadow: scrolled
      ? "0 1px 20px color-mix(in srgb, var(--foreground) 4%, transparent)"
      : "none",
  };

  const btnStyle = (active = false): React.CSSProperties => ({
    display: "inline-flex",
    alignItems: "center",
    gap: 4,
    padding: "6px 12px",
    borderRadius: 8,
    fontSize: 13,
    fontWeight: 500,
    color: "var(--foreground)",
    background: active ? "var(--accent)" : "transparent",
    border: "none",
    cursor: "pointer",
    textDecoration: "none",
    transition: "background 0.15s",
    whiteSpace: "nowrap" as const,
  });

  return (
    <>
      <nav style={navBase}>
        <div
          style={{
            maxWidth: "72rem",
            margin: "0 auto",
            padding: "0 1.5rem",
            width: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: 8,
          }}
        >
          {/* Left nav links */}
          <div style={{ display: "flex", alignItems: "center", gap: 2 }}>
            {navItems.map((item) =>
              item.isDropdown && item.children?.length ? (
                <div key={item.label} style={{ position: "relative" }}>
                  <button
                    style={btnStyle(openDropdown === item.label)}
                    onClick={() =>
                      setOpenDropdown(
                        openDropdown === item.label ? null : item.label,
                      )
                    }
                    onMouseEnter={(e) => {
                      if (openDropdown !== item.label)
                        (e.currentTarget as HTMLElement).style.background =
                          "var(--accent)";
                    }}
                    onMouseLeave={(e) => {
                      if (openDropdown !== item.label)
                        (e.currentTarget as HTMLElement).style.background =
                          "transparent";
                    }}
                  >
                    {item.label}
                    <svg
                      width="10"
                      height="10"
                      viewBox="0 0 10 10"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      style={{
                        opacity: 0.5,
                        transform:
                          openDropdown === item.label
                            ? "rotate(180deg)"
                            : "none",
                        transition: "transform 0.2s",
                      }}
                    >
                      <path d="M2 3.5l3 3 3-3" />
                    </svg>
                  </button>
                  {openDropdown === item.label && (
                    <div
                      style={{
                        position: "absolute",
                        top: "calc(100% + 6px)",
                        left: 0,
                        background: "var(--card)",
                        border: "1px solid var(--border)",
                        borderRadius: 12,
                        padding: 4,
                        minWidth: 160,
                        boxShadow: "0 8px 32px rgba(0,0,0,0.1)",
                        zIndex: 200,
                      }}
                    >
                      {item.children.map((child) => (
                        <Link
                          key={child.href}
                          href={child.href}
                          onClick={() => setOpenDropdown(null)}
                          style={{
                            display: "block",
                            padding: "8px 12px",
                            borderRadius: 8,
                            fontSize: 13,
                            color: "var(--foreground)",
                            textDecoration: "none",
                          }}
                          onMouseEnter={(e) => {
                            (e.currentTarget as HTMLElement).style.background =
                              "var(--accent)";
                          }}
                          onMouseLeave={(e) => {
                            (e.currentTarget as HTMLElement).style.background =
                              "transparent";
                          }}
                        >
                          {child.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ) : (
                <Link
                  key={item.label}
                  href={item.href}
                  style={btnStyle()}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLElement).style.background =
                      "var(--accent)";
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLElement).style.background =
                      "transparent";
                  }}
                >
                  {item.label}
                </Link>
              ),
            )}
            {mindmapPopup}
          </div>

          {/* Right controls */}
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            {themePresetSelect}
            {themeToggle}
            {rightItems}
          </div>
        </div>
      </nav>

      {/* Backdrop for dropdown close */}
      {openDropdown && (
        <div
          style={{ position: "fixed", inset: 0, zIndex: 49 }}
          onClick={() => setOpenDropdown(null)}
        />
      )}
    </>
  );
}
