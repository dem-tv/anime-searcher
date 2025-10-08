import type { Theme } from '../components/ui/Theme/types.ts';

type LocalStorageKeys = 'search' | 'theme';

type LocalStorageData = {
  search: string;
  theme: Theme;
};

export const LS = {
  set<Key extends LocalStorageKeys>(key: Key, data: LocalStorageData[Key]) {
    localStorage.setItem(key, JSON.stringify(data));
  },

  get<Key extends LocalStorageKeys>(key: Key): LocalStorageData[Key] | null {
    const data = localStorage.getItem(key);

    return data ? (JSON.parse(data) as LocalStorageData[Key]) : null;
  },
};
