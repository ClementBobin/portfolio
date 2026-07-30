"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useSyncExternalStore,
} from "react";

type Theme = "light" | "dark";

interface ThemeContextValue {
  theme: Theme;
  toggleTheme: () => void;
  setTheme: (theme: Theme) => void;
}

const ThemeContext = createContext<ThemeContextValue | null>(null);

function subscribeToSystemTheme(callback: () => void) {
  const media = window.matchMedia("(prefers-color-scheme: dark)");

  media.addEventListener("change", callback);
  return () => media.removeEventListener("change", callback);
}

function getSystemTheme(): Theme {
  return window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
}

function useSystemTheme(): Theme {
  return useSyncExternalStore(
    subscribeToSystemTheme,
    getSystemTheme,
    () => "light"
  );
}

function subscribeToStoredTheme(callback: () => void) {
  const listener = (event: StorageEvent) => {
    if (event.key === "theme" || event.key === null) {
      callback();
    }
  };

  window.addEventListener("storage", listener);

  return () => window.removeEventListener("storage", listener);
}

function getStoredTheme(): Theme | null {
  const value = localStorage.getItem("theme");

  return value === "light" || value === "dark" ? value : null;
}

function useStoredTheme(): Theme | null {
  return useSyncExternalStore(
    subscribeToStoredTheme,
    getStoredTheme,
    () => null
  );
}

interface ThemeProviderProps {
  children: React.ReactNode;
}

export function ThemeProvider({ children }: ThemeProviderProps) {
  const storedTheme = useStoredTheme();
  const systemTheme = useSystemTheme();

  const theme = storedTheme ?? systemTheme;

  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
  }, [theme]);

  const setTheme = useCallback((theme: Theme) => {
    localStorage.setItem("theme", theme);

    // Update subscribers in the current tab.
    window.dispatchEvent(
      new StorageEvent("storage", {
        key: "theme",
        newValue: theme,
      })
    );
  }, []);

  const toggleTheme = useCallback(() => {
    const nextTheme: Theme = theme === "dark" ? "light" : "dark";
    setTheme(nextTheme);
  }, [theme, setTheme]);

  const value = useMemo(
    () => ({
      theme,
      toggleTheme,
      setTheme,
    }),
    [theme, toggleTheme, setTheme]
  );

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme(): ThemeContextValue {
  const context = useContext(ThemeContext);

  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }

  return context;
}