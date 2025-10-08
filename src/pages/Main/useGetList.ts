import { createPath, useLocation, useSearchParams } from 'react-router';
import { useMemo, useState } from 'react';
import type {
  AnimeListRequest,
  AnimeShort,
} from '../../api/types/anime.types.ts';
import { animeListApi } from '../../store/api/animeList.ts';
import { LS } from '../../utils/localStorage.ts';

export function useGetList() {
  const { pathname } = useLocation();
  const [params] = useSearchParams();

  const currentPage = Number(params.get('page') || 1);
  const [searchValue, setSearchValue] = useState(LS.get('search') || '');

  const requestBody = useMemo<AnimeListRequest>(
    () => ({
      search: searchValue,
      page: currentPage,
    }),
    [searchValue, currentPage]
  );

  const { data, isLoading, isFetching, refetch, isError } =
    animeListApi.useGetAnimeListQuery(requestBody);

  const searchPageLink = createPath({
    pathname: '/',
    search: `page=${params.get('page')}`,
  });

  const errorMessage = isError ? 'Error fetching list' : '';

  async function onSearch(search: string) {
    setSearchValue(search);
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

  return {
    searchPageLink,
    animeList: data?.media || [],
    pagination: data?.pageInfo || null,
    isPending: isFetching || isLoading,
    onSearch,
    getCardUrl,
    getPagableUrl,
    currentPage,
    refetch,
    errorMessage,
  };
}
