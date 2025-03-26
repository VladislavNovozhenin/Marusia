import { createApi } from '@reduxjs/toolkit/query/react';
import { Movie } from '../types';
import { baseQueryWithErrorHandling } from './baseQuery';

export const favoriteApi = createApi({
  reducerPath: 'favoriteApi',
  baseQuery: baseQueryWithErrorHandling,
  tagTypes: ['Favorites'],
  endpoints: (builder) => ({
    addFavorite: builder.mutation<void, number>({
      query: (data) => ({
        url: 'favorites',
        method: 'POST',
        headers: {
          'Content-type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams({ id: data.toString() }).toString(),
      }),
      invalidatesTags: ['Favorites'],
    }),
    getFavorite: builder.query<Movie[], void>({
      query: () => 'favorites',
      providesTags: ['Favorites'],
    }),
    deleteFavorite: builder.mutation<void, number>({
      query: (id) => ({
        url: `favorites/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Favorites'],
    }),
  }),
});

export const { useAddFavoriteMutation, useGetFavoriteQuery, useDeleteFavoriteMutation } =
  favoriteApi;
