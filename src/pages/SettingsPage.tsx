// third-party libraries
import React from "react";

// local / internal stuff
import Header from "@/components/Header";
import ThemeSelector from "@/components/ThemeSelector";
import { getStoredTheme } from "@/utilities/utilities";
import { AppTheme } from "@/utilities/types";

const SettingsPage = () => {
  document.title = "Settings";

  const [theme, setTheme] = React.useState<AppTheme>(getStoredTheme());

  return (
    <div
      data-theme={getStoredTheme()}
      className={"w-screen h-screen flex flex-col p-4 space-y-4"}
    >
      <Header title={"Settings"} />
      <ThemeSelector theme={theme} setTheme={setTheme} />
      <a href="/" className={"btn"}>
        Back home
      </a>
    </div>
  );
};
export default SettingsPage;
