import type { ReactNode } from 'react';
import Main from '../pages/Main/Main.tsx';
import { AnimeDetails } from '../pages/AnimeDetails/AnimeDetails.tsx';
import { NotFound } from '../pages/NotFound/NotFound.tsx';
import { About } from '../pages/About/About.tsx';

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
        element: () => <AnimeDetails />,
      },
    ],
  },
  {
    path: '/about',
    element: () => <About />,
  },
  {
    path: '*',
    element: () => <NotFound />,
  },
] as const;
