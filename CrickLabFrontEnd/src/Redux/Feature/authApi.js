// authSlice.js
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// Define your API endpoints // Replace with your API endpoint


export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({ baseUrl: import.meta.env.VITE_REACT_APP_BASE_URL }),
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (userData) => ({
        url: "users/login", // Replace with your login API endpoint
        method: "POST",
        body: userData,
      }),
    }),
  }),
});

export const { useLoginMutation } = authApi;
