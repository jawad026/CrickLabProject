// seriesApi.js
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// Define your API endpoints
const API_ENDPOINT = "http://localhost:3000/"; // Remove the trailing slash

export const seriesApi = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: API_ENDPOINT }),
  endpoints: (builder) => ({
    // Fetch all series
    getSeriesAll: builder.query({
      query: () => {
        return "series";
      },
    }),

    // Add a new series
    addSeries: builder.mutation({
      query: (newSeries) => ({
        url: "series/addseries",
        method: "POST",
        body: newSeries,
      }),
    }),

    // Update an existing series
    updateSeries: builder.mutation({
      query: (updatedSeries) => ({
        url: `series/${updatedSeries.id}`,
        method: "PUT",
        body: updatedSeries,
      }),
    }),

    // Delete a series
    deleteSeries: builder.mutation({
      query: (seriesId) => ({
        url: `series/${seriesId}`,
        method: "DELETE",
      }),
    }),
    invalidates: [{ endpoint: "getSeriesAll" }],
  }),
});

export const {
  useGetSeriesAllQuery,
  useAddSeriesMutation,
  useUpdateSeriesMutation,
  useDeleteSeriesMutation,
} = seriesApi;
