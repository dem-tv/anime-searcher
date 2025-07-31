import React, { useEffect, useState } from 'react';
import type { Theme } from './types.ts';
import { ThemeContext } from './ThemeContext.ts';
import { LS } from '../../../utils/localStorage.ts';

type Props = {
  children: React.ReactNode;
};

function setClassTheme(className: Theme) {
  LS.set('theme', className);
  const classToRemove = className === 'dark' ? 'light' : 'dark';

  document.body.classList.remove(classToRemove);
  document.body.classList.add(className);
}

function getInitialTheme() {
  if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
    return 'dark';
  }

  return LS.get('theme') || 'light';
}

export function ThemeProvider(props: Props) {
  const [theme, setTheme] = useState<Theme>(getInitialTheme());

  useEffect(() => {
    setClassTheme(theme);
  }, []);

  function toggleTheme() {
    setTheme((theme) => {
      const newTheme = theme === 'dark' ? 'light' : 'dark';
      setClassTheme(newTheme);

      return newTheme;
    });
  }

  return (
    <ThemeContext.Provider value={{ toggleTheme, theme }}>
      {props.children}
    </ThemeContext.Provider>
  );
}
