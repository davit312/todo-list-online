import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { TOKEN_KEY_NAME } from "../utils/values";
import { authHeader } from "../utils/functions";
import type { ToDoRequest, Todo } from "../types/todo";

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
    getUserTodos: builder.mutation({
      query: () => ({
        url: `/todo`,
        method: "GET",
      }),
    }),
    updateTodo: builder.mutation<Todo, ToDoRequest>({
      query: (req) => ({
        method: "PATCH",
        url: `/todo/${req.id}`,
        body: req.todo,
      }),
    }),
  }),
});

export const { useGetUserTodosMutation, useUpdateTodoMutation } = todoApi;
