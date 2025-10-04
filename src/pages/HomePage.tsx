/**
 * Home Page Component
 * This component serves as the landing page for the Warehouse application.
 * It shows different UI for different user types (складчик, прораб, закупщик,
 * инженер ПТО, бухгалтер, администратор).
 */

import React from "react";
import Header from "@/components/Header";
import { LSUtil } from "@/utilities/utilities";
import { AppRoute } from "@/routes";

const HomePage: React.FC = () => {
  document.title = "Warehouse (by Verstack)";

  return (
    <div
      data-theme={LSUtil.getStoredTheme()}
      className={"w-screen h-screen flex flex-col p-4 space-y-4"}
    >
      <Header title={"Home"} />

      <a href={AppRoute.REGISTER} className={"btn"}>
        Register
      </a>

      <a href={AppRoute.LOGIN} className={"btn"}>
        Login
      </a>

      <a href={AppRoute.SETTINGS} className={"btn"}>
        Settings
      </a>
    </div>
  );
};
export default HomePage;
