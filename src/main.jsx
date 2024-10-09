import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ProtectedAuth from "./ProtectedAuth.jsx";
import App from "./App.jsx";
import Login from "./routes/Login.jsx";
import NewAccount from "./routes/NewAccount.jsx";
import EditAccount from "./routes/EditAccount.jsx";
import "./index.css";

const router = createBrowserRouter([
  {
    path: "/",
    element: <ProtectedAuth />,
    children: [
      {
        element: <App />,
        index: true,
      },
      {
        path: "/accounts/new",
        element: <NewAccount />,
      },
      {
        path: "/accounts/edit",
        element: <EditAccount />,
      },
    ],
  },
  {
    path: "/login",
    element: <Login />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
