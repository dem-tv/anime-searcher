export type APIError = {
  errors: {
    message: string;
    status: number;
  }[];
  data: null;
};
