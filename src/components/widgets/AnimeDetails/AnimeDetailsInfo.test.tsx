import { beforeEach, describe, expect, it } from 'vitest';
import { cleanup, screen, render } from '@testing-library/react';
import '@testing-library/jest-dom/vitest';
import { AnimeDetailsInfo } from './AnimeDetailsInfo.tsx';
const props = {
  anime: {
    genres: ['Action', 'Drama', 'Supernatural'],
    trailer: {
      id: 'O6qVieflwqs',
      site: 'youtube',
      thumbnail: 'https://i.ytimg.com/vi/O6qVieflwqs/hqdefault.jpg',
    },
    endDate: {
      day: 28,
      month: 12,
      year: 2023,
    },
    startDate: {
      day: 6,
      month: 7,
      year: 2023,
    },
    title: {
      english: 'JUJUTSU KAISEN Season 2',
      native: '呪術廻戦 第2期',
    },
    description:
      'The second season of <i>Jujutsu Kaisen</i>.<br>\n<br>\nThe past comes to light when second-year students Satoru Gojou and Suguru Getou are tasked with escorting young Riko Amanai to Master Tengen. But when a non-sorcerer user tries to kill them, their mission to protect the Star Plasma Vessel threatens to turn them into bitter enemies and cement their destinies—one as the world’s strongest sorcerer, and the other its most twisted curse user!<br>\n<br>\n(Source: Crunchyroll)',
    coverImage: {
      extraLarge:
        'https://s4.anilist.co/file/anilistcdn/media/anime/cover/large/bx145064-hSNRJM03pvv1.jpg',
    },
  },
};

describe('AnimeDetailsInfo', () => {
  beforeEach(cleanup);

  it('Renders description', () => {
    render(<AnimeDetailsInfo {...props} />);

    const descriprion = screen.getByText(/The second season of/i);
    expect(descriprion).toBeInTheDocument();
  });

  it('Renders correct title', () => {
    render(<AnimeDetailsInfo {...props} />);

    const title = screen.getByText('呪術廻戦 第2期 (JUJUTSU KAISEN Season 2)');
    expect(title).toBeInTheDocument();
  });

  it('Renders correct title when no english title', () => {
    const currentProps = {
      anime: {
        ...props.anime,
        title: {
          native: 'native',
          english: null,
        },
      },
    };

    render(<AnimeDetailsInfo {...currentProps} />);

    const title = screen.getByText('native');
    expect(title).toBeInTheDocument();
  });

  it('Renders video', () => {
    render(<AnimeDetailsInfo {...props} />);

    const video = screen.getByRole('presentation');
    expect(video).toHaveAttribute(
      'src',
      'https://www.youtube.com/embed/O6qVieflwqs'
    );
  });

  it('Does`nt render video when no prop', () => {
    const currentProps = { anime: { ...props.anime, trailer: null } };

    render(<AnimeDetailsInfo {...currentProps} />);

    const video = screen.queryByRole('presentation');
    expect(video).not.toBeInTheDocument();
  });

  it('Renders list of tags', () => {
    render(<AnimeDetailsInfo {...props} />);

    const listItems = (screen.queryByRole('list')?.children ||
      []) as HTMLElement[];
    expect(listItems.length).toBe(3);
  });
});
