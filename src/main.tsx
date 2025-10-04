/**
 * Main entry point for the React application.
 * Sets up routing and renders the app as a single-page application (SPA).
 */

// third party libraries
import React from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router/dom";
import { Observer } from "tailwindcss-intersect";
import "flyonui/flyonui.js";

// local / internal stuff
import "../main.css";
import getRoutes from "@/routes";

// initialize intersection observer for tailwindcss-intersect
Observer.start();

// routes
const router = getRoutes();

// render app as SPA
const container = document.getElementById("root");
const root = createRoot(container);
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
);
