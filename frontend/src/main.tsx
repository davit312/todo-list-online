import { StrictMode, lazy } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Provider } from "react-redux";

import store from "./store";

import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";

import BaseLayout from "./BaseLayout.tsx";
import HomePage from "./pages/HomePage.tsx";

const ErrorPage = lazy(() => import("./pages/ErrorPage.tsx"));
const TodoPage = lazy(() => import("./pages/TodoPage.tsx"));
const Login = lazy(() => import("./pages/Login.tsx"));
const Register = lazy(() => import("./pages/Register.tsx"));

const router = createBrowserRouter([
  {
    Component: BaseLayout,
    children: [
      {
        index: true,
        Component: HomePage,
      },
      {
        path: "app",
        Component: TodoPage,
      },
      {
        path: "login",
        Component: Login,
      },
      {
        path: "register",
        Component: Register,
      },
      {
        path: "*",
        Component: ErrorPage,
        loader: async ({ params }) => {
          const { "*": splat } = params;
          return splat;
        },
      },
    ],
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </StrictMode>
);
