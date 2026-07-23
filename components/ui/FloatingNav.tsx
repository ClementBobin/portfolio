"use client";

import * as React from "react";
import { m, AnimatePresence, useMotionValue, useTransform, useSpring } from "framer-motion";
import Link from "next/link";
import { MoonIcon, SunIcon } from "@/components/icons";
import { useTheme } from "@/components/ThemeProvider";

interface NavItem {
  id: string;
  label: string;
  href: string;
  emoji: string;
}

interface FloatingNavProps {
  items: NavItem[];
  locale: string;
  altLocale: string;
  altLocaleLabel: string;
}

const DOCK_SIZE = 44;
const DOCK_SIZE_HOVERED = 64;
const DOCK_RANGE = 80;

function DockItem({
  item,
  isActive,
  mouseX,
  index,
  total,
}: {
  item: NavItem;
  isActive: boolean;
  mouseX: ReturnType<typeof useMotionValue<number>>;
  index: number;
  total: number;
}) {
  const ref = React.useRef<HTMLDivElement>(null);
  const [hovered, setHovered] = React.useState(false);

  const distance = useTransform(mouseX, (val) => {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return DOCK_RANGE + 1;
    const center = rect.left + rect.width / 2;
    return Math.abs(val - center);
  });

  const size = useTransform(distance, [0, DOCK_RANGE], [DOCK_SIZE_HOVERED, DOCK_SIZE]);
  const springSize = useSpring(size, { stiffness: 400, damping: 28 });

  return (
    <div className="relative flex flex-col items-center" ref={ref}>
      {/* Tooltip */}
      <AnimatePresence>
        {hovered && (
          <m.div
            initial={{ opacity: 0, y: 4, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 4, scale: 0.9 }}
            transition={{ duration: 0.15 }}
            className="absolute -top-9 whitespace-nowrap rounded-lg bg-popover px-2.5 py-1 text-xs font-medium text-popover-foreground shadow ring-1 ring-foreground/10"
          >
            {item.label}
          </m.div>
        )}
      </AnimatePresence>

      <Link href={item.href}>
        <m.div
          style={{ width: springSize, height: springSize }}
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
          className={`
            flex items-center justify-center rounded-2xl cursor-pointer select-none
            transition-colors duration-200
            ${isActive
              ? "bg-accent text-accent-foreground shadow-md shadow-accent/30"
              : "bg-card text-foreground/70 hover:text-foreground ring-1 ring-foreground/10 hover:ring-accent/40"
            }
          `}
        >
          <span className="text-lg leading-none">{item.emoji}</span>
        </m.div>
      </Link>

      {/* Active dot */}
      <m.div
        animate={{ opacity: isActive ? 1 : 0, scale: isActive ? 1 : 0 }}
        transition={{ duration: 0.2 }}
        className="mt-1 h-1 w-1 rounded-full bg-accent"
      />
    </div>
  );
}

export default function FloatingNav({ items, locale, altLocale, altLocaleLabel }: FloatingNavProps) {
  const { theme, toggleTheme } = useTheme();
  const [activeId, setActiveId] = React.useState<string>("");
  const [visible, setVisible] = React.useState(true);
  const lastScrollY = React.useRef(0);
  const mouseX = useMotionValue(Infinity);

  // Scroll spy
  React.useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActiveId(entry.target.id);
        }
      },
      { rootMargin: "-40% 0px -55% 0px", threshold: 0 }
    );

    items.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, [items]);

  // Hide on scroll down, show on scroll up
  React.useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setVisible(y < lastScrollY.current || y < 80);
      lastScrollY.current = y;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <m.nav
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
          aria-label="Navigation"
          className="fixed bottom-6 left-1/2 z-50 -translate-x-1/2"
        >
          <div
            className="flex items-end gap-2 rounded-2xl bg-background/80 px-3 py-3 shadow-xl shadow-black/10 backdrop-blur-md ring-1 ring-foreground/10"
            onMouseMove={(e) => mouseX.set(e.clientX)}
            onMouseLeave={() => mouseX.set(Infinity)}
          >
            {/* Nav items */}
            {items.map((item, i) => (
              <DockItem
                key={item.id}
                item={item}
                isActive={activeId === item.id}
                mouseX={mouseX}
                index={i}
                total={items.length}
              />
            ))}

            {/* Divider */}
            <div className="mx-1 h-8 w-px bg-border" />

            {/* Locale switcher */}
            <Link
              href={`/${altLocale}`}
              className="flex h-11 w-11 items-center justify-center rounded-2xl bg-card text-xs font-semibold text-muted-foreground ring-1 ring-foreground/10 transition-colors hover:text-foreground hover:ring-accent/40"
            >
              {altLocaleLabel}
            </Link>

            {/* Theme toggle */}
            <button
              onClick={toggleTheme}
              type="button"
              aria-label={locale === "fr" ? "Changer de thème" : "Toggle theme"}
              className="flex h-11 w-11 items-center justify-center rounded-2xl bg-card text-foreground/70 ring-1 ring-foreground/10 transition-colors hover:text-foreground hover:ring-accent/40"
            >
              {theme === "dark"
                ? <SunIcon width="18" height="18" />
                : <MoonIcon width="18" height="18" />
              }
            </button>
          </div>
        </m.nav>
      )}
    </AnimatePresence>
  );
}