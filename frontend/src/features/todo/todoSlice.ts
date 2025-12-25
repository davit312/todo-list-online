import { createSlice } from "@reduxjs/toolkit";
import { useSelector } from "react-redux";
import type { RootState } from "../../store";

const initialState = {
  todos: [],
  loading: false,
  error: false,
  errorMessage: "",
};

const todoSlice = createSlice({
  name: "todo",
  initialState,
  reducers: {
    setLoading(state, action) {
      state.loading = action.payload;
    },
    setError: {
      prepare: function (value: boolean, message: string) {
        return {
          error: null,
          meta: "",
          payload: {
            value,
            message,
          },
        };
      },
      reducer: function (state, action) {
        state.error = action.payload.value;
        state.errorMessage = action.payload.message;
      },
    },
    setTodos(state, action) {
      state.todos = action.payload;
    },
  },
});

export const { setLoading, setError, setTodos } = todoSlice.actions;

export const useTodos = function () {
  const todos = useSelector((store: RootState) => store.todo);
  if (!todos) {
    throw new Error("Error to load todo store");
  }
  return todos;
};

export default todoSlice.reducer;
