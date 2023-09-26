import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// Define a service using a base URL and expected endpoints
export const playersApi = createApi({
  reducerPath: "playersApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:3000" }),
  endpoints: (builder) => ({
    getTeamPlayers: builder.query({
      query: (id) => `players/${id}`,
    }),
    getAllPlayers: builder.query({
      query: () => `players`,
    }),
  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useGetTeamPlayersQuery,useGetAllPlayersQuery } = playersApi;
