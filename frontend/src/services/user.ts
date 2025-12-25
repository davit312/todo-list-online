import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { User, UserWithToken } from "../types/user";
import type { Credentials } from "../types/user";

export const userApi = createApi({
  reducerPath: "userApi",
  baseQuery: fetchBaseQuery({ baseUrl: "/api" }),
  endpoints: (builder) => ({
    createUser: builder.mutation<UserWithToken, User>({
      query: (newUser) => ({
        url: "/users",
        method: "POST",
        body: newUser,
      }),
    }),

    login: builder.mutation<UserWithToken, Credentials>({
      query: (credentials) => ({
        url: "/auth/login",
        method: "POST",
        body: credentials,
      }),
    }),
    getCurrentUser: builder.query<User, string>({
      query: (token) => ({
        url: "/users/currentuser",
        headers: {
          Authorization: token,
        },
      }),
    }),
  }),
});

export const {
  useCreateUserMutation,
  useLoginMutation,
  useGetCurrentUserQuery,
} = userApi;
