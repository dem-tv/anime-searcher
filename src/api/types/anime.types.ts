export type Pagination = {
  currentPage: number;
  hasNextPage: boolean;
  lastPage: number;
  perPage: number;
  total: number;
};

export type MediaDate = {
  day: number;
  month: number;
  year: number;
};

export type Anime = {
  bannerImage: string;
  description: string;
  episodes: number;
  duration: number;
  title: {
    english: string;
    native: string;
  };
  genres: string[];
  startDate: MediaDate;
  endDate: MediaDate;
};

export type PageResponse<Media> = {
  data: {
    Page: {
      pageInfo: Pagination;
      media: Media[];
    };
  };
};
