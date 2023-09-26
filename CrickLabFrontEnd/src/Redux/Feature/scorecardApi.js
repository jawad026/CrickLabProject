import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// Define a service using a base URL and expected endpoints
export const scorecardApi = createApi({
  reducerPath: "scorecardApi",
  baseQuery: fetchBaseQuery({ baseUrl: import.meta.env.VITE_REACT_APP_BASE_URL  }),
  endpoints: (builder) => ({
    getScoreAll: builder.query({
      query: () => `scorecard`,
      pollingInterval: 5000,
    }),

    getTopPlayer: builder.query({
      query: () => `scorecard/player/topplayer`,
      pollingInterval: 5000,
    }),

    getScoreById: builder.query({
      query: (id) => `scorecard/${id}`,
      pollingInterval: 5000,
    }),

    // Add a new series
    addScore: builder.mutation({
      query: (newMatch) => ({
        url: "scorecard",
        method: "POST",
        body: newMatch,
      }),
    }),
  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const {
  useGetScoreAllQuery,
  useAddScoreMutation,
  useGetScoreByIdQuery,
  useGetTopPlayerQuery
} = scorecardApi;
