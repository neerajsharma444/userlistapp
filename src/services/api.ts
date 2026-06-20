import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { User } from '../types';

const delayedBaseQuery = async (args: any, api: any, extraOptions: any) => {
  const result = await fetchBaseQuery({ baseUrl: 'https://jsonplaceholder.typicode.com/' })(args, api, extraOptions);
  await new Promise((resolve) => setTimeout(() => resolve(undefined), 1000));
  return result;
};

export const api = createApi({
  reducerPath: 'api',
  baseQuery: delayedBaseQuery,
  endpoints: (builder) => ({
    getUsers: builder.query<User[], { page: number; limit: number }>({
      query: ({ page, limit }) => `users?_page=${page}&_limit=${limit}`,
      serializeQueryArgs: ({ endpointName }) => {
        return endpointName;
      },
      merge: (currentCache, newItems, { arg }) => {
        if (arg.page === 1) {
          return newItems;
        }
        const existingIds = new Set(currentCache.map(item => item.id));
        newItems.forEach(item => {
          if (!existingIds.has(item.id)) {
            currentCache.push(item);
          }
        });
      },
      forceRefetch({ currentArg, previousArg }) {
        return currentArg?.page !== previousArg?.page;
      },
    }),
  }),
});

export const { useGetUsersQuery, useLazyGetUsersQuery } = api;
