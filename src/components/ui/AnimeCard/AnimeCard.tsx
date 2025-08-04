import type { AnimeShort } from '../../../api/types/anime.types.ts';
import { NavLink, type NavLinkRenderProps } from 'react-router';
import { getTitle } from '../../../utils/getTitle.ts';
import { Typography } from '../Typography/Typography.tsx';

type Props = {
  anime: AnimeShort;
  to: string;
};

export function AnimeCard(props: Props) {
  const title = getTitle(props.anime.title.native, props.anime.title.english);

  function getClassName(parameters: NavLinkRenderProps) {
    const defaultClass =
      'shadow-md bg-white dark:bg-neutral-800 dark:text-gray-300 gap-4 flex flex-col rounded-sm cursor-pointer py-4 hover:-translate-y-3 transition-all';

    if (parameters.isActive) {
      return `${defaultClass} shadow-pink-800 shadow-2xl -translate-y-3 `;
    }

    return defaultClass;
  }

  return (
    <NavLink to={props.to} className={getClassName}>
      <Typography className={'px-4'} center variant="l">
        {title}
      </Typography>
      {props.anime.bannerImage && (
        <img src={props.anime.bannerImage} alt={props.anime.title.native} />
      )}
      <Typography className={'px-4 line-clamp-3'} center variant="s">
        {props.anime.description}
      </Typography>
    </NavLink>
  );
}
