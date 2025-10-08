import { useThemeContext } from './ThemeContext.ts';
import { Icon } from '../Icon/Icon.tsx';
import { Button } from '../Button/Button.tsx';
import type { HTMLAttributes } from 'react';

export function ToggleTheme(props: HTMLAttributes<HTMLButtonElement> = {}) {
  const { theme, toggleTheme } = useThemeContext();

  const label = `Change the theme to ${theme === 'light' ? 'dark' : 'light'}`;

  return (
    <Button {...props} aria-label={label} onClick={toggleTheme}>
      <Icon name={'sun'} />
    </Button>
  );
}
