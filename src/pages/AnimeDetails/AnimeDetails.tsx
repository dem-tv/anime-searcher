import { PageLoader } from '../../components/ui/PageLoader/PageLoader.tsx';
import { useFetchAnimeItem } from '../../api/hooks/useFetchAnimeList.ts';
import { useParams } from 'react-router';
import { useEffect } from 'react';
import { AnimeDetailsInfo } from '../../components/widgets/AnimeDetails/AnimeDetailsInfo.tsx';
import { CoverLayout } from '../../components/layouts/CoverLayout/CoverLayout.tsx';

export function AnimeDetails() {
  const { fetchAnimeItem, anime, loading, errorMessage } = useFetchAnimeItem();
  const params = useParams();

  useEffect(() => {
    if (params.animeId) {
      fetchAnimeItem(params.animeId);
    }
  }, [params.animeId]);

  if (loading) {
    return <PageLoader />;
  }

  if (errorMessage || !anime) {
    return errorMessage || 'Error getting anime';
  }

  return (
    <CoverLayout bgUrl={anime.coverImage.extraLarge}>
      <AnimeDetailsInfo anime={anime} />
    </CoverLayout>
  );
}
