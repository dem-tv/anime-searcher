import type { APIError } from '../api/types/error.types.ts';

export const errorMockResponse: APIError = {
  errors: [
    {
      message: 'Error get response',
      status: 400,
    },
  ],
  data: null,
};
