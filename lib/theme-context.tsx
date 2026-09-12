"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { ThemeMode, ThemePalette } from "./types";

interface ThemeContextType {
  theme: ThemeMode;
  palette: ThemePalette;
  toggleTheme: () => void;
  setTheme: (theme: ThemeMode) => void;
  setPalette: (palette: ThemePalette) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setThemeState] = useState<ThemeMode>("dark");
  const [palette, setPaletteState] = useState<ThemePalette>("paytm");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    try {
      const savedTheme = localStorage.getItem("nexora_theme") as ThemeMode | null;
      const savedPalette = localStorage.getItem("nexora_palette") as ThemePalette | null;

      if (savedTheme && (savedTheme === "dark" || savedTheme === "light")) {
        setThemeState(savedTheme);
      }
      if (savedPalette && (savedPalette === "paytm" || savedPalette === "matrix")) {
        setPaletteState(savedPalette);
      }
    } catch {
      // Ignore local storage failures
    }
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    const root = document.documentElement;

    root.setAttribute("data-theme", theme);
    root.setAttribute("data-palette", palette);

    if (theme === "dark") {
      root.classList.add("dark");
      root.classList.remove("light");
    } else {
      root.classList.add("light");
      root.classList.remove("dark");
    }

    try {
      localStorage.setItem("nexora_theme", theme);
      localStorage.setItem("nexora_palette", palette);
    } catch {
      // Ignore local storage failures
    }
  }, [theme, palette, mounted]);

  const toggleTheme = () => {
    setThemeState((prev) => (prev === "dark" ? "light" : "dark"));
  };

  const setTheme = (newTheme: ThemeMode) => {
    setThemeState(newTheme);
  };

  const setPalette = (newPalette: ThemePalette) => {
    setPaletteState(newPalette);
  };

  return (
    <ThemeContext.Provider
      value={{
        theme,
        palette,
        toggleTheme,
        setTheme,
        setPalette,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
}

