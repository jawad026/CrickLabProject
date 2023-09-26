import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// Define a service using a base URL and expected endpoints
export const matchApi = createApi({
  reducerPath: "matchApi",
  baseQuery: fetchBaseQuery({ baseUrl: import.meta.env.VITE_REACT_APP_BASE_URL  }),
  endpoints: (builder) => ({
    getMatchAll: builder.query({
      query: () => `match`,
      pollingInterval: 5000,
    }),

    getMatchById: builder.query({
      query: (id) => `match/${id}`,
      pollingInterval: 5000,
    }),

    getMatchSeries: builder.query({
      query: (id) => `match/series/${id}`,
      pollingInterval: 5000,
    }),

    addMatch: builder.mutation({
      query: (newMatch) => ({
        url: "match/addmatch",
        method: "POST",
        body: newMatch,
      }),
    }),

    updateMatchStatus: builder.mutation({
      query: (updatedMatch) => ({
        url: `match`,
        method: "PATCH",
        body: updatedMatch,
      }),
    }),
  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const {
  useGetMatchAllQuery,
  useAddMatchMutation,
  useGetMatchByIdQuery,
  useUpdateMatchStatusMutation,
  useGetMatchSeriesQuery,
} = matchApi;
