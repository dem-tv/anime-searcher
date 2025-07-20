import './index.css';
import { MainLayout } from './layouts/MainLayout/MainLayout.tsx';
import { SearchForm } from './components/SearchForm/SearchForm.tsx';
import { useFetchAnimeList } from './api/hooks/useFetchAnimeList.ts';
import { PageList } from './components/PageList/PageList.tsx';
import { AnimeCard } from './components/AnimeCard/AnimeCard.tsx';

function App() {
  const { fetchAnimeList, animeList, pagination, loading, errorMessage } =
    useFetchAnimeList();

  async function onSearch(search: string) {
    await fetchAnimeList(search);
  }

  return (
    <MainLayout headerContent={<SearchForm onSubmit={onSearch} />}>
      {errorMessage ? (
        errorMessage
      ) : (
        <PageList
          pagination={pagination}
          list={animeList}
          loading={loading}
          renderItem={(item) => <AnimeCard anime={item} />}
          itemKey="description"
        />
      )}
    </MainLayout>
  );
}

export default App;
