import { MainLayout } from '../../layouts/MainLayout/MainLayout.tsx';
import { SearchForm } from '../../components/SearchForm/SearchForm.tsx';
import { useFetchAnimeList } from '../../api/hooks/useFetchAnimeList.ts';
import { PageList } from '../../components/PageList/PageList.tsx';
import { AnimeCard } from '../../components/AnimeCard/AnimeCard.tsx';
import { Outlet } from 'react-router';
import type { AnimeShort } from '../../api/types/anime.types.ts';

function Main() {
  const { fetchAnimeList, animeList, pagination, loading, errorMessage } =
    useFetchAnimeList();

  async function onSearch(search: string) {
    await fetchAnimeList(search);
  }

  function getCardUrl(card: AnimeShort) {
    return `/${card.id}`;
  }

  return (
    <MainLayout
      sideContent={<Outlet />}
      headerContent={<SearchForm onSubmit={onSearch} />}
    >
      {errorMessage ? (
        errorMessage
      ) : (
        <PageList
          pagination={pagination}
          list={animeList}
          loading={loading}
          renderItem={(item) => (
            <AnimeCard to={getCardUrl(item)} anime={item} />
          )}
          itemKey="description"
        />
      )}
    </MainLayout>
  );
}

export default Main;
