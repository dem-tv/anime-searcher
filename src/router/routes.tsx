import type { ReactNode } from 'react';
import Main from '../pages/Main/Main.tsx';
import { AnimeInfo } from '../pages/AnimeInfo/AnimeInfo.tsx';

export type RouteType = {
  path: string;
  element: () => ReactNode;

  children?: RouteType[];
};

export const routes: RouteType[] = [
  {
    path: '/',
    element: () => <Main />,
    children: [
      {
        path: ':animeId',
        element: () => <AnimeInfo />,
      },
    ],
  },
] as const;
