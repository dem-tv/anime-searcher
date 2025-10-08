import { createContext, useContext } from 'react';
import type { Theme } from './types.ts';

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
}

export const ThemeContext = createContext<ThemeContextType | null>(null);

export function useThemeContext() {
  const context = useContext(ThemeContext);

  if (!context) {
    throw new Error('context ThemeContext must be provided to Provider');
  }

  return context;
}
