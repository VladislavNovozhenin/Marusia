// import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
// import { RootState } from './store'; // Путь до вашего store
// import { ApiError } from '../apiErrror';

// const baseQuery = fetchBaseQuery({
//     baseUrl: 'https://cinemaguide.skillbox.cc/',
//     credentials: 'include',
//     prepareHeaders: (headers) => {
//         // Добавление токена авторизации или других заголовков
//         return headers;
//     }
// });

// const api = createApi({
//     reducerPath: 'api',
//     baseQuery: async (args, api, extraOptions) => {
//         try {
//             const result = await baseQuery(args, api, extraOptions);
//             return result;
//         } catch (error) {
//             // Обработка ошибок
//             ApiError(error);
//             return { error };
//         }
//     },
//     endpoints: (builder) => ({
//         fetchRandom: builder.query({
//             query: () => 'movie/random',
//         }),
//         fetchTopMovies: builder.query({
//             query: () => 'movie/top10',
//         }),
//         fetchGetGenres: builder.query({
//             query: () => 'movie/genres',
//         }),
//         fetchAllMovie: builder.query({
//             query: () => 'movie',
//         }),
//         fetchGetMovie: builder.query({
//             query: (id: string) => `movie/${id}`,
//         }),
//         fetchReg: builder.mutation({
//             query: (data) => ({
//                 url: 'user',
//                 method: 'POST',
//                 body: data,
//             }),
//         }),
//         fetchLogin: builder.mutation({
//             query: (data) => ({
//                 url: 'auth/login',
//                 method: 'POST',
//                 body: data,
//             }),
//         }),
//         fetchProfile: builder.query({
//             query: () => 'profile',
//         }),
//         fetchPostFavorites: builder.mutation({
//             query: (id) => ({
//                 url: 'favorites',
//                 method: 'POST',
//                 body: { id },
//                 headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
//             }),
//         }),
//     }),
// });

// export const {
//     useFetchRandomQuery,
//     useFetchTopMoviesQuery,
//     useFetchGetGenresQuery,
//     useFetchAllMovieQuery,
//     useFetchGetMovieQuery,
//     useFetchRegMutation,
//     useFetchLoginMutation,
//     useFetchProfileQuery,
//     useFetchPostFavoritesMutation,
// } = api;
