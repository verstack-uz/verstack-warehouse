// third-party libraries
import React from "react";

// local / internal stuff
import Header from "@/components/Header";
import ThemeSelector from "@/components/ThemeSelector";
import { LSUtil } from "@/utilities/utilities";
import { AppTheme } from "@/utilities/types";

const SettingsPage = () => {
  document.title = "App Settings";

  const [theme, setTheme] = React.useState<AppTheme>(LSUtil.getStoredTheme());

  return (
    <div
      data-theme={LSUtil.getStoredTheme()}
      className={"w-screen h-screen flex flex-col p-4 space-y-4"}
    >
      <Header title={"App Settings"} />
      <ThemeSelector theme={theme} setTheme={setTheme} />
      <a href="/" className={"btn"}>
        Back home
      </a>
    </div>
  );
};
export default SettingsPage;
