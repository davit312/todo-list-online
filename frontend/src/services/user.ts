import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { LoginResponse, User, UserWithToken } from "../types/user";
import type { Credentials } from "../types/user";

const userSubToId = (u: User & { sub: number }) => {
  const { sub, ...user } = u;
  user.id = sub;
  return user;
};

export const userApi = createApi({
  reducerPath: "userApi",
  baseQuery: fetchBaseQuery({ baseUrl: "/api" }),
  endpoints: (builder) => ({
    createUser: builder.mutation<User, User>({
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
      transformResponse: (resp: LoginResponse): UserWithToken => {
        const user = userSubToId(resp.user);

        return {
          user,
          access_token: resp.access_token,
        };
      },
    }),
    getCurrentUser: builder.query<User, string>({
      query: (token) => ({
        url: "/users/currentuser",
        headers: {
          Authorization: token,
        },
      }),
      transformResponse: (resp: User & { sub: number }): User => {
        const user = userSubToId(resp);
        return user;
      },
    }),
  }),
});

export const {
  useCreateUserMutation,
  useLoginMutation,
  useGetCurrentUserQuery,
} = userApi;
