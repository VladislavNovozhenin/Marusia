import {
  fetchBaseQuery,
  BaseQueryFn,
  FetchArgs,
  FetchBaseQueryError,
} from '@reduxjs/toolkit/query';

import { ApiError } from './apiErrror';

const baseQuery = fetchBaseQuery({
  baseUrl: 'https://cinemaguide.skillbox.cc/',
  credentials: 'include',
});

export const baseQueryWithErrorHandling: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  const result = await baseQuery(args, api, extraOptions);
  if (result.error) {
    ApiError(result.error);
  }
  return result;
};
