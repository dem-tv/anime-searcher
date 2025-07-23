import type { AnimeShort } from '../../api/types/anime.types.ts';
import { NavLink, type NavLinkRenderProps } from 'react-router';
import { getTitle } from '../../utils/getTitle.ts';

type Props = {
  anime: AnimeShort;
  to: string;
};

export function AnimeCard(props: Props) {
  const title = getTitle(props.anime.title.native, props.anime.title.english);

  function getClassName(parameters: NavLinkRenderProps) {
    const defaultClass =
      'shadow-md bg-white gap-4 flex flex-col rounded-sm cursor-pointer py-4 hover:shadow-2xl hover:-translate-y-3 transition-all';

    if (parameters.isActive) {
      return `${defaultClass} shadow-fuchsia-200 hover:shadow-fuchsia-200 shadow-2xl -translate-y-3 `;
    }

    return defaultClass;
  }

  return (
    <NavLink to={props.to} className={getClassName}>
      <h3 className={'text-center text-4xl px-8'}>{title}</h3>
      <img src={props.anime.bannerImage} alt={props.anime.title.native} />
      <p className={'px-8 line-clamp-3'}>{props.anime.description}</p>
    </NavLink>
  );
}
