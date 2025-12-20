import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// type Todo = {
//   id: number;
//   task: string;
//   done: boolean;
// };

export const todoApi = createApi({
  reducerPath: "todoApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:3000" }),
  endpoints: (builder) => ({
    getUserTodos: builder.query({
      query: () => `todos/`,
    }),
  }),
});

export const { useGetUserTodosQuery } = todoApi;
