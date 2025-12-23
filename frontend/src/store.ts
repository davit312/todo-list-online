import { configureStore } from "@reduxjs/toolkit";

import userReducer from "./features/user/userSlice";

import { todoApi } from "./services/todo";
import { userApi } from "./services/user";

const store = configureStore({
  reducer: {
    [todoApi.reducerPath]: todoApi.reducer,
    [userApi.reducerPath]: userApi.reducer,
    user: userReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(todoApi.middleware)
      .concat(userApi.middleware),
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
