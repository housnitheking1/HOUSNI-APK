import React, { createContext, useContext, useEffect, useState } from 'react';
import { ACCENT_COLORS, AccentColor, ThemeMode } from '../types.ts';

interface ThemeContextType {
  theme: ThemeMode;
  toggleTheme: () => void;
  setTheme: (mode: ThemeMode) => void;
  accentColor: AccentColor;
  setAccentColor: (color: AccentColor) => void;
}

const THEME_STORAGE_KEY = 'housni_theme_mode';
const ACCENT_STORAGE_KEY = 'housni_accent_color_id';

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [theme, setThemeState] = useState<ThemeMode>(() => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem(THEME_STORAGE_KEY) as ThemeMode | null;
      if (stored === 'light' || stored === 'dark') {
        return stored;
      }
      return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    }
    return 'light';
  });

  const [accentColor, setAccentColorState] = useState<AccentColor>(() => {
    if (typeof window !== 'undefined') {
      const storedId = localStorage.getItem(ACCENT_STORAGE_KEY);
      const match = ACCENT_COLORS.find((c) => c.id === storedId);
      if (match) return match;
    }
    return ACCENT_COLORS[0]; // Default: Royal Blue
  });

  // Apply Theme Mode class
  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    try {
      localStorage.setItem(THEME_STORAGE_KEY, theme);
    } catch {
      // fallback if storage disabled
    }
  }, [theme]);

  // Apply Accent Color CSS Custom Variables
  useEffect(() => {
    const root = document.documentElement;
    root.style.setProperty('--accent-color', accentColor.hex);
    root.style.setProperty('--accent-hover', accentColor.hoverHex);
    root.style.setProperty('--accent-rgb', accentColor.rgb);
    root.style.setProperty('--accent-light', accentColor.lightRgba);
    root.style.setProperty('--accent-ring', accentColor.ringRgba);
    root.style.setProperty('--accent-gradient', accentColor.gradient);

    try {
      localStorage.setItem(ACCENT_STORAGE_KEY, accentColor.id);
    } catch {
      // fallback
    }
  }, [accentColor]);

  const toggleTheme = () => {
    setThemeState((prev) => (prev === 'light' ? 'dark' : 'light'));
  };

  const setTheme = (mode: ThemeMode) => {
    setThemeState(mode);
  };

  const setAccentColor = (color: AccentColor) => {
    setAccentColorState(color);
  };

  return (
    <ThemeContext.Provider
      value={{
        theme,
        toggleTheme,
        setTheme,
        accentColor,
        setAccentColor,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

export function useTheme(): ThemeContextType {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}
