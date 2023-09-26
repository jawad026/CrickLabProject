import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// Define a service using a base URL and expected endpoints
export const newsApi = createApi({
  reducerPath: "newsApi",
  baseQuery: fetchBaseQuery({ baseUrl: import.meta.env.VITE_REACT_APP_BASE_URL  }),
  endpoints: (builder) => ({
    getAllNews: builder.query({
      query: () => `news`,
      pollingInterval: 5000,
    }),

    // Add a new series
    addNews: builder.mutation({
      query: (newMatch) => ({
        url: "news",
        method: "POST",
        body: newMatch,
      }),
    }),
  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const {
useAddNewsMutation,
useGetAllNewsQuery
} = newsApi;
