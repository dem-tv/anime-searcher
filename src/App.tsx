import React from 'react';
import './index.css';
import { MainLayout } from './layouts/MainLayout/MainLayout.tsx';
import { SearchForm } from './components/SearchForm/SearchForm.tsx';
import { fetchAnimeList } from './api/fetchAnimeList.ts';
import { PageList } from './components/PageList/PageList.tsx';
import type { Anime, Pagination } from './api/types/anime.types.ts';
import { AnimeCard } from './components/AnimeCard/AnimeCard.tsx';

type State = {
  searchValue: string;
  loading: boolean;
  animeList: Anime[];
  pagination: Pagination | null;
  errorMessage: string | null;
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
    errorMessage: null,
  };

  async onSearch(search: string) {
    this.setState({
      loading: true,
    });

    const { data, errors } = await fetchAnimeList(search);

    if (data) {
      this.setState({
        loading: false,
        animeList: data.media,
        pagination: data.pageInfo,
        errorMessage: null,
      });
    }

    if (errors) {
      this.setState({
        loading: false,
        animeList: [],
        pagination: null,
        errorMessage: errors[0]?.message || '',
      });
    }
  }

  render() {
    return (
      <MainLayout headerContent={<SearchForm onSubmit={this.onSearch} />}>
        {this.state.errorMessage ? (
          this.state.errorMessage
        ) : (
          <PageList
            pagination={this.state.pagination}
            list={this.state.animeList}
            loading={this.state.loading}
            renderItem={(item) => <AnimeCard anime={item} />}
            itemKey="description"
          />
        )}
      </MainLayout>
    );
  }
}

export default App;
