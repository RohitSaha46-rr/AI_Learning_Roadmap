import { apiSlice } from "@/services/apiSlice";

export const roadmapApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    generateRoadmap: builder.mutation({
      query: ({ topic, level = "beginner" }) => ({
        url: "/roadmaps/ai",
        method: "POST",
        body: {
          topic,
          level,
        },
      }),
      invalidatesTags: ["Roadmap"],
    }),
    getRoadmap: builder.query({
      query: (id) => `/roadmaps/${id}`,
      providesTags: (result, error, id) => [{ type: "Roadmap", id }],
    }),
  }),
});

export const {
  useGenerateRoadmapMutation,
  useGetRoadmapQuery,
} = roadmapApiSlice;

