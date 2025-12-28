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
  tagTypes: ["Todo"],
  endpoints: (builder) => ({
    getUserTodos: builder.query<Todo[], void>({
      query: () => ({
        url: `/todo`,
        method: "GET",
      }),
    }),
    createTodo: builder.mutation<Todo, Todo>({
      query: (todo) => ({
        url: "/todo",
        method: "POST",
        body: todo,
      }),

      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        try {
          const { data: newTodo } = await queryFulfilled;
          dispatch(
            todoApi.util.updateQueryData("getUserTodos", undefined, (draft) => {
              draft.unshift(newTodo);
            })
          );
        } catch (e) {
          console.log(e);
        }
      },
    }),
    updateTodo: builder.mutation<Todo, ToDoRequest>({
      query: (req) => ({
        method: "PATCH",
        url: `/todo/${req.id}`,
        body: req.todo,
      }),
      async onQueryStarted({ id, ...patch }, { dispatch, queryFulfilled }) {
        const patchResult = dispatch(
          todoApi.util.updateQueryData("getUserTodos", undefined, (draft) => {
            const todo = draft.find((t) => t.id === id);
            if (todo) {
              todo.done = patch.todo.done;
            }
          })
        );
        try {
          await queryFulfilled;
        } catch {
          patchResult.undo();
        }
      },
    }),
    deleteTodo: builder.mutation<Todo, number>({
      query: (taskid) => ({
        method: `delete`,
        url: `/todo/${taskid}`,
      }),
      async onQueryStarted(id, { dispatch, queryFulfilled }) {
        const patchResult = dispatch(
          todoApi.util.updateQueryData("getUserTodos", undefined, (draft) => {
            const delIndex = draft.findIndex((t) => t.id === id);
            if (delIndex !== -1) {
              draft.splice(delIndex, 1);
            }
          })
        );
        try {
          await queryFulfilled;
        } catch {
          patchResult.undo();
        }
      },
    }),
  }),
});

export const {
  useGetUserTodosQuery,
  useUpdateTodoMutation,
  useCreateTodoMutation,
  useDeleteTodoMutation,
} = todoApi;
