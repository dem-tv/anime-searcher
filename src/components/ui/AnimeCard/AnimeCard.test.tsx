import { beforeEach, describe, expect, it } from 'vitest';
import { cleanup, getByAltText, getByText } from '@testing-library/react';
import '@testing-library/jest-dom/vitest';
import { AnimeCard } from './AnimeCard.tsx';
import { renderWithRouter } from '../../../__test-utils__/renderWithRouter.tsx';

const props = {
  anime: {
    bannerImage:
      'https://s4.anilist.co/file/anilistcdn/media/anime/banner/155348-I6f4TQKslVx2.jpg',
    description:
      'A special animation made to commemorate the 20th anniversary of the NARUTO anime.',
    title: {
      english: 'Naruto',
      native: 'ROAD OF NARUTO',
    },
    id: 1234,
  },

  to: '/123',
};

describe('AnimeCard', () => {
  beforeEach(cleanup);

  it('Renders Card', () => {
    const container = renderWithRouter(<AnimeCard {...props} />).container;

    expect(container).toBeInTheDocument();
  });

  it('Renders title when it is passed', () => {
    const container = renderWithRouter(<AnimeCard {...props} />).container;

    const expectedText = 'ROAD OF NARUTO (Naruto)';
    const element = getByText(container, expectedText);

    expect(element).toBeInTheDocument();
  });

  it('Renders description when it is passed', () => {
    const container = renderWithRouter(<AnimeCard {...props} />).container;

    const expectedText = props.anime.description;
    const element = getByText(container, expectedText);

    expect(element).toBeInTheDocument();
  });

  it('Renders image when it is passed', () => {
    const container = renderWithRouter(<AnimeCard {...props} />).container;

    const element = getByAltText(container, props.anime.title.native);

    expect(element).toHaveAttribute('src', props.anime.bannerImage);
  });
});
