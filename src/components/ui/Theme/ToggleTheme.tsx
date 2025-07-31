import { useThemeContext } from './ThemeContext.ts';
import { Icon } from '../Icon/Icon.tsx';

export function ToggleTheme() {
  const { theme, toggleTheme } = useThemeContext();

  const label = `Change the theme to ${theme === 'light' ? 'dark' : 'light'}`;

  return (
    <button aria-label={label} onClick={toggleTheme}>
      <Icon name={'sun'} />
    </button>
  );
}
