import type { Anime, Pagination } from '../types/anime.types.ts';
import { useState } from 'react';
import { fetchAnimeList } from '../requests/fetchAnimeList.ts';

type State = {
  loading: boolean;
  animeList: Anime[];
  pagination: Pagination | null;
  errorMessage: string | null;
};

export function useFetchAnimeList() {
  const [state, setState] = useState<State>({
    loading: false,
    animeList: [],
    pagination: null,
    errorMessage: null,
  });

  async function fetch(search: string) {
    setState((prevState) => ({
      ...prevState,
      loading: true,
    }));

    const { data, errors } = await fetchAnimeList(search);

    if (data) {
      setState({
        loading: false,
        animeList: data.media,
        pagination: data.pageInfo,
        errorMessage: null,
      });
    }

    if (errors) {
      setState({
        loading: false,
        animeList: [],
        pagination: null,
        errorMessage: errors[0]?.message || '',
      });
    }

    return { data, errors };
  }

  return {
    ...state,
    fetchAnimeList: fetch,
  };
}
