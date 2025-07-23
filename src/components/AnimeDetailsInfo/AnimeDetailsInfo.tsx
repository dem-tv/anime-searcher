import type { Anime } from '../../api/types/anime.types.ts';
import { getTitle } from '../../utils/getTitle.ts';
import { getFormattedTime } from '../../utils/getFormattedTime.ts';

type Props = {
  anime: Anime;
};

const backdropClass =
  'rounded-md text-white backdrop-blur-sm relative overflow-hidden border after:absolute after:inset-0 after:bg-[#00000080] after:-z-10';

export function AnimeDetailsInfo(props: Props) {
  const title = getTitle(props.anime.title.native, props.anime.title.english);
  const dateStart = props.anime.startDate
    ? new Date(
        props.anime.startDate.year,
        props.anime.startDate.month,
        props.anime.startDate.day
      )
    : null;
  const dateEnd = props.anime.endDate
    ? new Date(
        props.anime.endDate.year,
        props.anime.endDate.month,
        props.anime.endDate.day
      )
    : null;

  const startDateFormatted = dateStart ? getFormattedTime(dateStart) : '-';
  const endDateFormatted = dateEnd ? getFormattedTime(dateEnd) : '-';

  const renderTagList = props.anime.genres.map((genre) => (
    <li key={genre} className={`rounded-md text-sm px-2 ${backdropClass}`}>
      {genre}
    </li>
  ));

  return (
    <div
      style={{ backgroundImage: `url(${props.anime.coverImage.extraLarge})` }}
      className={`flex flex-col gap-2 bg-cover p-8 overflow-auto`}
    >
      <h1 className={`p-2 text-center ${backdropClass}`}>{title}</h1>
      <ul className={'flex flex-wrap gap-2'}>{renderTagList}</ul>
      {props.anime?.trailer?.id && (
        <div className={`p-2 ${backdropClass}`}>
          <p className={'text-center text-sm mb-2'}>Trailer</p>
          <iframe
            height="300"
            width="100%"
            allowFullScreen
            src={`https://www.youtube.com/embed/${props.anime.trailer.id}`}
          />
        </div>
      )}
      <div className={`p-2 text-sm ${backdropClass}`}>
        <p>{props.anime.description}</p>
        <p className={'mt-2'}>Release date: {startDateFormatted}</p>
        <p>End date: {endDateFormatted}</p>
      </div>
    </div>
  );
}
