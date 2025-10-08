import { createApi } from '@reduxjs/toolkit/query/react';
import { API_HOST } from '../../api/constants.ts';
import { graphqlRequestBaseQuery } from '@rtk-query/graphql-request-base-query';

export const baseApi = createApi({
  baseQuery: graphqlRequestBaseQuery({ url: API_HOST }),
  tagTypes: ['Anime'],
  endpoints: () => ({}),
});
