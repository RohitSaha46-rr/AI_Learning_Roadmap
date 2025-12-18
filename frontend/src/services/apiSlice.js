import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:5000/api",  // change if your backend is different
    prepareHeaders: (headers, { getState }) => {
      const state = getState();
      const token = state?.auth?.token;
      
      console.log("🔑 Token from Redux state:", token ? "Found" : "Not found");
      
      // Fallback to localStorage if token not in state
      if (!token) {
        const authData = JSON.parse(localStorage.getItem("authUser") || "{}");
        console.log("🔑 Checking localStorage:", authData?.token ? "Found" : "Not found");
        if (authData?.token) {
          console.log("✅ Using token from localStorage");
          headers.set("Authorization", `Bearer ${authData.token}`);
          return headers;
        }
      } else {
        console.log("✅ Using token from Redux state");
        headers.set("Authorization", `Bearer ${token}`);
      }
      
      if (!token && !JSON.parse(localStorage.getItem("authUser") || "{}")?.token) {
        console.warn("⚠️ No token available for request");
      }
      
      return headers;
    },
  }),
  tagTypes: ["Auth", "Roadmap"], // Added Roadmap tag
  endpoints: () => ({}),
});