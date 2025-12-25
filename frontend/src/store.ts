import { configureStore } from "@reduxjs/toolkit";

import userReducer from "./features/user/userSlice";
import todoReducer from "./features/todo/todoSlice";

import { todoApi } from "./services/todo";
import { userApi } from "./services/user";

const store = configureStore({
  reducer: {
    [todoApi.reducerPath]: todoApi.reducer,
    [userApi.reducerPath]: userApi.reducer,
    user: userReducer,
    todo: todoReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(todoApi.middleware)
      .concat(userApi.middleware),
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
