import { baseApi } from './base.ts';
import { gql } from 'graphql-request';
import type {
  AnimeListRequest,
  AnimeShort,
  PageResponse,
} from '../../api/types/anime.types.ts';

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

export const animeListApi = baseApi.injectEndpoints({
  endpoints: (create) => ({
    getAnimeList: create.query<
      PageResponse<AnimeShort>['Page'],
      AnimeListRequest
    >({
      query: (requestBody) => {
        return {
          document: gql`
            ${listQuery}
          `,
          variables: {
            search: requestBody.search,
            page: requestBody.page,
            type: 'ANIME',
            perPage: 10,
            sort: 'SCORE_DESC',
            stylised: false,
            nativeStylised2: false,
            asHtml: false,
          },
        };
      },
      transformResponse(res: PageResponse<AnimeShort>) {
        return res.Page;
      },
      transformErrorResponse(error) {
        return error.message;
      },
    }),
  }),
});
