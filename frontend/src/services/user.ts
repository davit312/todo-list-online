import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { User } from "../types/user";
import type { Credentials } from "../types/user";

export const userApi = createApi({
  reducerPath: "userApi",
  baseQuery: fetchBaseQuery({ baseUrl: "/api" }),
  endpoints: (builder) => ({
    getUsers: builder.query<User[], string>({
      query: () => `/users`,
    }),

    createUser: builder.mutation<User, User>({
      query: (newUser) => ({
        url: "/users",
        method: "POST",
        body: newUser,
      }),
    }),

    login: builder.mutation<User, Credentials>({
      query: (credentials) => ({
        url: "/users/login",
        method: "POST",
        body: credentials,
      }),
    }),
  }),
});

export const { useGetUsersQuery, useCreateUserMutation, useLoginMutation } =
  userApi;
