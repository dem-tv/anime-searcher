import { API_HOST, DEFAULT_FETCH_OPTIONS } from '../constants.ts';
import type { Anime, MediaResponse } from '../types/anime.types.ts';
import type { APIError } from '../types/error.types.ts';

const itemQuery = `query Media($mediaId: Int, $stylised: Boolean, $englishStylised2: Boolean, $asHtml: Boolean) {
  Media(id: $mediaId) {
    genres
    trailer {
      id
      site
      thumbnail
    }
    endDate {
      day
      month
      year
    }
    startDate {
      day
      month
      year
    }
    title {
      english(stylised: $englishStylised2)
      native(stylised: $stylised)
    }
    description(asHtml: $asHtml)
    coverImage {
      extraLarge
    }
  }
}
`;

export async function fetchAnimeItem(animeId: string | number) {
  const variables = {
    mediaId: animeId,
    stylised: false,
    englishStylised2: false,
    asHtml: false,
  };

  const response = await fetch(API_HOST, {
    ...DEFAULT_FETCH_OPTIONS,
    body: JSON.stringify({ query: itemQuery, variables }),
  });

  const data: MediaResponse<Anime> | APIError = await response.json();

  if ('errors' in data) {
    return data;
  }

  return { data: data.data.Media, errors: null };
}
