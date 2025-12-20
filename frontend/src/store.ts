import { configureStore } from "@reduxjs/toolkit";

import userReducer from "./features/user/userSlice";

import { todoApi } from "./services/todo";

const store = configureStore({
  reducer: {
    [todoApi.reducerPath]: todoApi.reducer,
    user: userReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(todoApi.middleware),
});

export default store;
