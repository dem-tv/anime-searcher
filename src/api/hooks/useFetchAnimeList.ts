import type {
  Anime,
  AnimeListRequest,
  AnimeShort,
  Pagination,
} from '../types/anime.types.ts';
import { useState } from 'react';
import { fetchAnimeList } from '../requests/fetchAnimeList.ts';
import { fetchAnimeItem } from '../requests/fetchAnimeItem.ts';

type AnimeListState = {
  loading: boolean;
  animeList: AnimeShort[];
  pagination: Pagination | null;
  errorMessage: string | null;
};

type AnimeItemState = {
  loading: boolean;
  anime: Anime | null;
  errorMessage: string | null;
};

export function useFetchAnimeList() {
  const [state, setState] = useState<AnimeListState>({
    loading: false,
    animeList: [],
    pagination: null,
    errorMessage: null,
  });

  async function fetch(requestBody: AnimeListRequest) {
    setState((prevState) => ({
      ...prevState,
      loading: true,
    }));

    const { data, errors } = await fetchAnimeList(requestBody);

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

export function useFetchAnimeItem() {
  const [state, setState] = useState<AnimeItemState>({
    loading: false,
    anime: null,
    errorMessage: null,
  });

  async function fetch(mediaId: string | number) {
    setState((prevState) => ({
      ...prevState,
      loading: true,
    }));

    const { data, errors } = await fetchAnimeItem(mediaId);

    console.log(data);
    if (data) {
      setState({
        loading: false,
        anime: data,
        errorMessage: null,
      });
    }

    if (errors) {
      setState({
        loading: false,
        anime: null,
        errorMessage: errors[0]?.message || '',
      });
    }

    return { data, errors };
  }

  return {
    ...state,
    fetchAnimeItem: fetch,
  };
}
