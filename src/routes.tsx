/**
 * Main entry point for the React application.
 * Sets up routing and renders the app as a single-page application (SPA).
 */

// third party libraries
import React from "react";
import { createBrowserRouter } from "react-router";

// local / internal stuff
import HomePage from "@/pages/HomePage";
import LoginPage from "@/pages/LoginPage";
import SettingsPage from "@/pages/SettingsPage";
import RegisterPage from "@/pages/RegisterPage";

// Application Routes Enumeration
// For easy (and standardized) reference to routes across the application
export enum AppRoute {
  HOME = "/",
  REGISTER = "/register",
  LOGIN = "/login",
  SETTINGS = "/settings",
}

/**
 * Get the application routes.
 * This function creates and returns a browser router with defined routes.
 * @returns The configured browser router.
 */
function getRoutes() {
  return createBrowserRouter([
    {
      path: AppRoute.HOME,
      element: <HomePage />,
    },
    {
      path: AppRoute.REGISTER,
      element: <RegisterPage />,
    },
    {
      path: AppRoute.LOGIN,
      element: <LoginPage />,
    },
    {
      path: AppRoute.SETTINGS,
      element: <SettingsPage />,
    },
  ]);
}
export default getRoutes;
