import { MainLayout } from '../../components/layouts/MainLayout/MainLayout.tsx';
import { SearchForm } from '../../components/widgets/SearchForm/SearchForm.tsx';
import { useFetchAnimeList } from '../../api/hooks/useFetchAnimeList.ts';
import { PageList } from '../../components/ui/PageList/PageList.tsx';
import { AnimeCard } from '../../components/ui/AnimeCard/AnimeCard.tsx';
import { NavLink, useOutlet } from 'react-router';
import type { AnimeShort } from '../../api/types/anime.types.ts';
import { Icon } from '../../components/ui/Icon/Icon.tsx';

function Main() {
  const sidebar = useOutlet();

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
      sideContent={sidebar}
      headerContent={<SearchForm onSubmit={onSearch} />}
      closeElement={
        sidebar && (
          <NavLink aria-label={'Скрыть'} to={'/'}>
            <Icon rotate="180" name="expand-left" />
          </NavLink>
        )
      }
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
          itemKey="id"
        />
      )}
    </MainLayout>
  );
}

export default Main;
