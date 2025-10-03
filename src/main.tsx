import React from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter } from "react-router";
import { RouterProvider } from "react-router/dom";
import "../index.css";
import HomePage from "@/pages/HomePage";
import LoginPage from "@/pages/LoginPage";
import SettingsPage from "@/pages/SettingsPage";

// routes
const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/settings",
    element: <SettingsPage />,
  },
]);

// render app as SPA
const container = document.getElementById("root");
const root = createRoot(container);
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
);
