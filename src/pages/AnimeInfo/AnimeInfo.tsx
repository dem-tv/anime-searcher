import { PageLoader } from '../../components/PageLoader/PageLoader.tsx';
import { useFetchAnimeItem } from '../../api/hooks/useFetchAnimeList.ts';
import { useParams } from 'react-router';
import { useEffect } from 'react';

export function AnimeInfo() {
  const { fetchAnimeItem, anime, loading, errorMessage } = useFetchAnimeItem();
  const params = useParams();

  useEffect(() => {
    if (params.animeId) {
      fetchAnimeItem(params.animeId);
    }
  }, [params.animeId]);

  if (loading) return <PageLoader />;

  if (errorMessage) {
    return errorMessage;
  }

  return <div>{anime?.title?.english || ''}</div>;
}
