import { baseApi } from './base.ts';
import { gql } from 'graphql-request';
import type { Anime, MediaResponse } from '../../api/types/anime.types.ts';

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

export const animeItemApi = baseApi.injectEndpoints({
  endpoints: (create) => ({
    getAnimeItem: create.query<Anime | null, string | number>({
      query: (animeId) => {
        return {
          document: gql`
            ${itemQuery}
          `,
          variables: {
            mediaId: animeId,
            stylised: false,
            englishStylised2: false,
            asHtml: false,
          },
        };
      },
      transformResponse(res: MediaResponse<Anime>) {
        return res.Media;
      },
      transformErrorResponse(error) {
        return error.message;
      },
    }),
  }),
  // overrideExisting: true,
});
