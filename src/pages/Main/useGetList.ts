import { createPath, useLocation, useSearchParams } from 'react-router';
import { useState } from 'react';
import type {
  AnimeListRequest,
  AnimeShort,
} from '../../api/types/anime.types.ts';
import { useFetchAnimeList } from '../../api/hooks/useFetchAnimeList.ts';

export function useGetList() {
  const { pathname } = useLocation();
  const [params, setParams] = useSearchParams();

  const currentPage = Number(params.get('page') || 1);
  const [request, setRequest] = useState<AnimeListRequest>({
    search: '',
    page: currentPage,
  });

  const searchPageLink = createPath({
    pathname: '/',
    search: `page=${params.get('page')}`,
  });

  const { fetchAnimeList, animeList, pagination, loading, errorMessage } =
    useFetchAnimeList();

  async function onSearch(search: string, onMount: boolean) {
    const newDto = {
      ...request,
      page: onMount ? currentPage : 1,
      search,
    };

    if (!onMount) {
      setParams({
        page: '1',
      });
    }
    setAnimeList(newDto);
  }

  async function setAnimeList(requestBody: AnimeListRequest) {
    setRequest(requestBody);

    await fetchAnimeList(requestBody);
  }

  function getCardUrl(card: AnimeShort) {
    return createPath({
      pathname: `/${card.id}`,
      search: `page=${currentPage}`,
    });
  }

  function getPagableUrl(page: number) {
    return createPath({
      pathname,
      search: `page=${page}`,
    });
  }

  function onChangePagination(page: number) {
    const newDto = {
      ...request,
      page,
    };

    setAnimeList(newDto);
  }

  return {
    searchPageLink,
    animeList,
    pagination,
    loading,
    errorMessage,
    onSearch,
    getCardUrl,
    getPagableUrl,
    onChangePagination,
    currentPage,
  };
}
