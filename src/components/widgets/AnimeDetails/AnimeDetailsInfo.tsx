import type { Anime } from '../../../api/types/anime.types.ts';
import { getTitle } from '../../../utils/getTitle.ts';
import { Typography } from '../../ui/Typography/Typography.tsx';
import { Block } from '../../ui/Block/Block.tsx';
import { TagList } from '../../ui/TagList/TagList.tsx';
import { getDate } from './getDate.ts';

type Props = {
  anime: Anime;
};

export function AnimeDetailsInfo(props: Props) {
  const title = getTitle(props.anime.title.native, props.anime.title.english);
  const { startDateFormatted, endDateFormatted } = getDate(
    props.anime.startDate,
    props.anime.endDate
  );

  return (
    <>
      <Block>
        <Typography tagName="h1" center>
          {title}
        </Typography>
      </Block>
      <TagList list={props.anime.genres} />
      {props.anime?.trailer?.id && (
        <Block>
          <Typography center tagName="p" mb="sm">
            Trailer
          </Typography>
          <iframe
            role={'presentation'}
            height="300"
            width="100%"
            allowFullScreen
            src={`https://www.youtube.com/embed/${props.anime.trailer.id}`}
          />
        </Block>
      )}
      <Block>
        <Typography variant="sm">{props.anime.description}</Typography>
        <Typography variant="sm" mt="sm">
          Release date: {startDateFormatted}
        </Typography>
        <Typography variant="sm">End date: {endDateFormatted}</Typography>
      </Block>
    </>
  );
}
