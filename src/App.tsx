import React from 'react';
import './index.css';
import { MainLayout } from './layouts/MainLayout.tsx';
import { SearchForm } from './components/SearchForm.tsx';
import { fetchAnimeList } from './api/fetchAnimeList.ts';
import { PageList } from './components/PageList.tsx';
import type { Anime, Pagination } from './api/types/anime.types.ts';
import { AnimeCard } from './components/AnimeCard.tsx';

type State = {
  searchValue: string;
  loading: boolean;
  animeList: Anime[];
  pagination: Pagination | null;
};

class App extends React.Component<object, State> {
  constructor(props: object) {
    super(props);

    this.onSearch = this.onSearch.bind(this);
  }

  state: State = {
    searchValue: '',
    loading: false,
    animeList: [],
    pagination: null,
  };

  async onSearch(search: string) {
    this.setState({
      loading: true,
    });

    const { pageInfo, media } = await fetchAnimeList(search);

    this.setState({
      loading: false,
      animeList: media,
      pagination: pageInfo,
    });
  }

  render() {
    return (
      <MainLayout headerContent={<SearchForm onSubmit={this.onSearch} />}>
        <PageList
          pagination={this.state.pagination}
          list={this.state.animeList}
          loading={this.state.loading}
          renderItem={(item) => <AnimeCard anime={item} />}
          itemKey="description"
        />
      </MainLayout>
    );
  }
}

export default App;
