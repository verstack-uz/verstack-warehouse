// third-party libraries
import React from "react";
import { useNavigate } from "react-router";

// local / internal stuff
import Header from "@/components/Header";
import ThemeSelector from "@/components/ThemeSelector";
import { LSUtil } from "@/utilities/utilities";
import { AppTheme, User } from "@/utilities/types";
import { AppRoute } from "@/routes";
import Button from "@/components/Button";

const SettingsPage = () => {
  // Set page title & navigate hook
  // Also check if user is logged in & redirect to login page if not logged in
  let navigate = useNavigate();
  let user: User;
  try {
    user = LSUtil.getUser();
  } catch {
    // Not logged in, so logout button must be hidden
  }
  React.useEffect(() => {
    document.title = "App Settings";
  });

  // Theme state
  const [theme, setTheme] = React.useState<AppTheme>(LSUtil.getTheme());

  return (
    <div
      data-theme={LSUtil.getTheme()}
      className={"w-screen h-screen motion-preset-fade"}
    >
      <Header title={"App Settings"} hideSettingsButton={true} />
      <div className={"bg-base-100 h-full px-4 pt-4 flex flex-col space-y-4"}>
        <ThemeSelector theme={theme} setTheme={setTheme} />
        {user && (
          <Button
            text={"Logout"}
            onClick={() => {
              LSUtil.clearUser();
              navigate(AppRoute.LOGIN);
            }}
          />
        )}
        <Button text={"Back to Home"} href={AppRoute.HOME} />
      </div>
    </div>
  );
};
export default SettingsPage;
