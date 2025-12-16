import { apiSlice } from "@/services/apiSlice";

export const authApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    signupUser: builder.mutation({
      query: ({ fullName, email, password }) => ({
        url: "/auth/signup",
        method: "POST",
        body: {
          username: fullName?.trim(),
          email: email?.trim(),
          password,
        },
      }),
    }),

    loginUser: builder.mutation({
      query: ({ identifier, password }) => ({
        url: "/auth/login",
        method: "POST",
        body: {
          identifier: identifier?.trim(),
          password,
        },
      }),
    }),
  }),
});

export const {
  useSignupUserMutation,
  useLoginUserMutation,
} = authApiSlice;
