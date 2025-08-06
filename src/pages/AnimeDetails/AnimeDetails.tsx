import { PageLoader } from '../../components/ui/PageLoader/PageLoader.tsx';
import { useParams } from 'react-router';
import { AnimeDetailsInfo } from '../../components/widgets/AnimeDetails/AnimeDetailsInfo.tsx';
import { CoverLayout } from '../../components/layouts/CoverLayout/CoverLayout.tsx';
import { animeItemApi } from '../../store/api/animeItem.ts';
import { skipToken } from '@reduxjs/toolkit/query';
import { Button } from '../../components/ui/Button/Button.tsx';

export function AnimeDetails() {
  const params = useParams();

  const {
    data: anime,
    isLoading,
    isFetching,
    isError,
    refetch,
  } = animeItemApi.useGetAnimeItemQuery(params.animeId ?? skipToken);

  const isPending = isLoading || isFetching;

  if (isPending) {
    return <PageLoader />;
  }

  if (isError || !anime) {
    return <CoverLayout>Failed getting Anime</CoverLayout>;
  }

  return (
    <CoverLayout bgUrl={anime.coverImage.extraLarge}>
      <AnimeDetailsInfo anime={anime} />
      <Button className={'self-start'} onClick={refetch}>
        Reload item
      </Button>
    </CoverLayout>
  );
}
