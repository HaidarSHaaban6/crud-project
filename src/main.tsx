import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
// import App from "./App.tsx";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import SignInPage from "./Pages/SignInPage/SignInPage";
import DashBoardPage from "./Pages/DashBoardPage/DashBoardPage";
import SignUpPage from "./Pages/SignUpPage/SignUpPage";
import AddPage from "./Pages/AddPage/AddPage";
import ShowPage from "./Pages/ShowPage/ShowPage";
import EditPage from "./Pages/EditPage/EditPage";
import FavoritesPage from "./Pages/FavoritesPage/FavoritesPage";
import OrderListPage from "./Pages/OrderListPage/OrderListPage";
import ShowItemPage from "./Pages/ShowItemPage/ShowItemPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <DashBoardPage />,
    children: [
      { path: "add", element: <AddPage /> },
      {
        path: "show",
        element: <ShowPage />,
      },
      {
        path: "show/:id",
        element: <ShowItemPage />,
      },
      {
        path: "edit/:id",
        element: <EditPage />,
      },
      { path: "favorites", element: <FavoritesPage /> },
      { path: "orderlist", element: <OrderListPage /> },
    ],
  },
  { path: "/signin", element: <SignInPage /> },
  { path: "/signup", element: <SignUpPage /> },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
