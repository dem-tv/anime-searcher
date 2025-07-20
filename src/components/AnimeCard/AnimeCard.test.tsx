import { describe, expect, it } from 'vitest';
import { getByAltText, getByText, render } from '@testing-library/react';
import '@testing-library/jest-dom/vitest';
import { AnimeCard } from './AnimeCard.tsx';

const props = {
  anime: {
    bannerImage:
      'https://s4.anilist.co/file/anilistcdn/media/anime/banner/155348-I6f4TQKslVx2.jpg',
    chapters: null,
    description:
      'A special animation made to commemorate the 20th anniversary of the NARUTO anime.',
    episodes: 1,
    duration: 10,
    title: {
      english: 'Naruto',
      native: 'ROAD OF NARUTO',
    },
    genres: ['Action', 'Adventure', 'Drama', 'Fantasy', 'Supernatural'],
    startDate: {
      day: 3,
      month: 10,
      year: 2022,
    },
    endDate: {
      day: 3,
      month: 10,
      year: 2022,
    },
  },
};

describe('AnimeCard', () => {
  it('Renders Card', () => {
    const container = render(<AnimeCard {...props} />).container;

    expect(container).toBeInTheDocument();
  });

  it('Renders title when it is passed', () => {
    const container = render(<AnimeCard {...props} />).container;

    const expectedText = 'Naruto (ROAD OF NARUTO)';
    const element = getByText(container, expectedText);

    expect(element).toBeInTheDocument();
  });

  it('Renders description when it is passed', () => {
    const container = render(<AnimeCard {...props} />).container;

    const expectedText = props.anime.description;
    const element = getByText(container, expectedText);

    expect(element).toBeInTheDocument();
  });

  it('Renders image when it is passed', () => {
    const container = render(<AnimeCard {...props} />).container;

    const element = getByAltText(container, props.anime.title.native);

    expect(element).toHaveAttribute('src', props.anime.bannerImage);
  });
});
