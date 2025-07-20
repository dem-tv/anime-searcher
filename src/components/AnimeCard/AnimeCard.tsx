import type { Anime } from '../../api/types/anime.types.ts';

type Props = {
  anime: Anime;
};

export function AnimeCard(props: Props) {
  return (
    <div
      className={
        'shadow-md bg-white gap-4 flex flex-col rounded-sm cursor-pointer py-4 hover:shadow-2xl hover:-translate-y-3 transition-all'
      }
    >
      <h3 className={'text-center text-4xl px-8'}>
        {props.anime.title.english} ({props.anime.title.native})
      </h3>
      <img src={props.anime.bannerImage} alt={props.anime.title.native} />
      <p className={'px-8'}>{props.anime.description}</p>
    </div>
  );
}
