/**
 * Login Page Component
 * This component serves as the login page for the Warehouse application.
 * It provides a link to navigate back to the home page.
 */

import React from "react";
import Header from "@/components/Header";
import { LSUtil } from "@/utilities/utilities";

const LoginPage: React.FC = () => {
  document.title = "User Registration";

  return (
    <div
      data-theme={LSUtil.getStoredTheme()}
      className={"w-screen h-screen flex flex-col p-4 space-y-4"}
    >
      <Header title={"Register"} />
      <a href="/" className={"btn"}>
        Back home
      </a>
    </div>
  );
};
export default LoginPage;
