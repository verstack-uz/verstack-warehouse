/**
 * Home Page Component
 * This component serves as the landing page for the Warehouse application.
 * It shows different UI for different user types (складчик, прораб, закупщик,
 * инженер ПТО, бухгалтер, администратор).
 */

// third-party libraries
import React from "react";
import { useNavigate } from "react-router";

// local / internal stuff
import Header from "@/components/Header";
import { LSUtil, StrUtil } from "@/utilities/utilities";
import { AppRoute } from "@/routes";
import { User } from "@/utilities/types";

const HomePage: React.FC = () => {
  // Set page title & navigate hook
  // Also check if user is logged in & redirect to login page if not logged in
  let navigate = useNavigate();
  let user: User;
  try {
    user = LSUtil.getUser();
    React.useEffect(() => {
      document.title = "Warehouse by Verstack";
    });
  } catch {
    React.useEffect(() => {
      navigate(AppRoute.LOGIN);
    });
    return <></>;
  }

  return (
    <div
      data-theme={LSUtil.getTheme()}
      className={"w-screen h-screen motion-preset-fade"}
    >
      <Header title={"Home"} />
      <div className={"bg-base-100 h-full px-4 pt-4 flex flex-col space-y-4"}>
        <h1 className={"text-2xl font-bold"}>
          Welcome, {user.firstName} {user.lastName} ({user.phoneNumber})
        </h1>
        <p className={"text-lg"}>
          You are logged in as a {StrUtil.capitalizeFirstLetter(user.role)}.
        </p>
      </div>
    </div>
  );
};
export default HomePage;
