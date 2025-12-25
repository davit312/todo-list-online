import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { TOKEN_KEY_NAME } from "../utils/values";
import { authHeader } from "../utils/functions";

export const todoApi = createApi({
  reducerPath: "todoApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "/api",
    prepareHeaders: (headers) => {
      const token = localStorage.getItem(TOKEN_KEY_NAME);
      if (token) {
        headers.set("authorization", authHeader(token));
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    getUserTodos: builder.query({
      query: () => `/todo`,
    }),
  }),
});

export const { useGetUserTodosQuery } = todoApi;
