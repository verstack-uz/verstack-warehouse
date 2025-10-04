/**
 * Home Page Component
 * This component serves as the landing page for the Warehouse application.
 * It shows different UI for different user types (складчик, прораб, закупщик,
 * инженер ПТО, бухгалтер, администратор).
 */

import React from "react";
import Header from "@/components/Header";
import { getStoredTheme } from "@/utilities/utilities";

const HomePage: React.FC = () => {
  document.title = "Warehouse (by Verstack)";

  return (
    <div
      data-theme={getStoredTheme()}
      className={"w-screen h-screen flex flex-col p-4 space-y-4"}
    >
      <Header title={"Home"} />

      <a href="/login" className={"btn"}>
        Login
      </a>

      <a href="/settings" className={"btn"}>
        Settings
      </a>
    </div>
  );
};
export default HomePage;
