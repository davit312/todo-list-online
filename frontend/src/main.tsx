import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import "./index.css";

import BaseLayout from "./BaseLayout.tsx";
import HomePage from "./pages/HomePage.tsx";
import ErrorPage from "./pages/ErrorPage.tsx";

const router = createBrowserRouter([
  {
    Component: BaseLayout,
    children: [
      {
        index: true,
        Component: HomePage,
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
    <RouterProvider router={router} />
  </StrictMode>
);
