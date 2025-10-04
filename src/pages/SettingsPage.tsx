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
    document.title = "Settings";
  });

  // Theme state
  const [theme, setTheme] = React.useState<AppTheme>(LSUtil.getTheme());

  return (
    <div
      data-theme={LSUtil.getTheme()}
      className={"w-screen min-h-screen pb-64 motion-preset-fade"}
    >
      <Header title={"Settings"} hideSettingsButton={true} />

      <div className={"max-w-128 mx-auto px-4 py-2 flex flex-col space-y-8"}>
        <div className={"card p-4"}>
          <ThemeSelector theme={theme} setTheme={setTheme} />
        </div>

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
