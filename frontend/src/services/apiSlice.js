import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:5000/api",  // change if your backend is different
    prepareHeaders: (headers, { getState }) => {
      const token = getState()?.auth?.token; // Added token to headers
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: ["Auth", "Roadmap"], // Added Roadmap tag
  endpoints: () => ({}),
});