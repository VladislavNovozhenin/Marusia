import { createApi } from '@reduxjs/toolkit/query/react';

import { Movie } from '../types';

import { baseQueryWithErrorHandling } from './baseQuery';

export const movieApi = createApi({
  reducerPath: 'movieApi',
  baseQuery: baseQueryWithErrorHandling,
  endpoints: (builder) => ({
    fetchRandom: builder.query<Movie, void>({
      query: () => 'movie/random',
    }),
    fetchTopMovies: builder.query<Movie[], void>({
      query: () => 'movie/top10',
    }),
    fetchGetGenres: builder.query<string[], void>({
      query: () => 'movie/genres',
    }),
    fetchAllMovie: builder.query<Movie[], void>({
      query: () => 'movie',
    }),
    fetchGetMovie: builder.query<Movie, string>({
      query: (id: string) => `movie/${id}`,
    }),
  }),
});

export const {
  useFetchRandomQuery,
  useFetchTopMoviesQuery,
  useFetchGetGenresQuery,
  useFetchAllMovieQuery,
  useFetchGetMovieQuery,
} = movieApi;
