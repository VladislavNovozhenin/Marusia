import { createApi } from '@reduxjs/toolkit/query/react';

import { LoginData, RegisterData, User } from '../types';

import { baseQueryWithErrorHandling } from './baseQuery';

const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: baseQueryWithErrorHandling,
  endpoints: (builder) => ({
    register: builder.mutation<void, RegisterData>({
      query: (data) => ({
        url: 'user',
        method: 'POST',
        body: data,
      }),
    }),
    login: builder.mutation<void, LoginData>({
      query: (data) => ({
        url: 'auth/login',
        method: 'POST',
        body: data,
      }),
    }),
    logout: builder.query<void, void>({
      query: () => 'auth/logout',
    }),
    profile: builder.query<User, void>({
      query: () => 'profile',
    }),
  }),
});

export const {
  useLoginMutation,
  useProfileQuery,
  useRegisterMutation,
  useLazyProfileQuery,
  useLazyLogoutQuery,
} = authApi;

export default authApi;
