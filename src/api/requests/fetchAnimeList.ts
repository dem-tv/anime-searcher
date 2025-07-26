import { API_HOST, DEFAULT_FETCH_OPTIONS } from '../constants.ts';
import type {
  AnimeListRequest,
  AnimeShort,
  PageResponse,
} from '../types/anime.types.ts';
import type { APIError } from '../types/error.types.ts';

const listQuery = `query Media(
    $search: String
    $type: MediaType
    $isAdult: Boolean
    $perPage: Int
    $sort: [MediaSort]
    $stylised: Boolean
    $nativeStylised2: Boolean
    $asHtml: Boolean
    $page: Int
  ) {
    Page(perPage: $perPage, page: $page) {
      pageInfo {
        currentPage
        hasNextPage
        lastPage
        perPage
        total
      }
      media(search: $search, type: $type, isAdult: $isAdult, sort: $sort) {
        bannerImage
        description(asHtml: $asHtml)
        id
        title {
          english(stylised: $stylised)
          native(stylised: $nativeStylised2)
        }
      }
    }
  }
`;

export async function fetchAnimeList(requestBody: AnimeListRequest) {
  const variables = {
    search: requestBody.search,
    page: requestBody.page,
    type: 'ANIME',
    perPage: 10,
    sort: 'SCORE_DESC',
    stylised: false,
    nativeStylised2: false,
    asHtml: false,
  };

  const response = await fetch(API_HOST, {
    ...DEFAULT_FETCH_OPTIONS,
    body: JSON.stringify({ query: listQuery, variables }),
  });

  const data: PageResponse<AnimeShort> | APIError = await response.json();

  if ('errors' in data) {
    return data;
  }

  return { data: data.data.Page, errors: null };
}
