type LocalStorageKeys = 'search';

type LocalStorageData = {
  search: string;
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
