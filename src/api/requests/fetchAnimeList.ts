import { API_HOST, DEFAULT_FETCH_OPTIONS } from '../constants.ts';
import type { Anime, PageResponse } from '../types/anime.types.ts';
import type { APIError } from '../types/error.types.ts';

export const listQuery = `query Media(
    $search: String
    $type: MediaType
    $isAdult: Boolean
    $perPage: Int
    $sort: [MediaSort]
  ) {
    Page(perPage: $perPage) {
      pageInfo {
        currentPage
        hasNextPage
        lastPage
        perPage
        total
      }
      media(search: $search, type: $type, isAdult: $isAdult, sort: $sort) {
        bannerImage
        chapters
        description
        episodes
        duration
        title {
          english
          native
        }
        genres
        startDate {
          day
          month
          year
        }
        endDate {
          day
          month
          year
        }
      }
    }
  }
`;

export async function fetchAnimeList(search: string) {
  const variables = {
    search,
    type: 'ANIME',
    perPage: 10,
    sort: 'SCORE_DESC',
  };

  const response = await fetch(API_HOST, {
    ...DEFAULT_FETCH_OPTIONS,
    body: JSON.stringify({ query: listQuery, variables }),
  });

  const data: PageResponse<Anime> | APIError = await response.json();

  if ('errors' in data) {
    return data;
  }

  return { data: data.data.Page, errors: null };
}
