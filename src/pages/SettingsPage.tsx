import React from "react";
import Header from "@/components/Header";
import ThemeSelector from "@/components/ThemeSelector";
import { AppTheme, AppThemes } from "@/types";

const SettingsPage = () => {
  document.title = "Settings";

  let storedTheme = localStorage.getItem("theme") as AppTheme;
  if (!storedTheme || !AppThemes.includes(storedTheme)) {
    storedTheme = "light";
    localStorage.setItem("theme", storedTheme);
  }
  let [theme, setTheme] = React.useState<AppTheme>(storedTheme);
  React.useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  });

  return (
    <div className={"w-screen h-screen flex flex-col p-4 space-y-4"}>
      <Header title={"Settings"} />
      <ThemeSelector />
      <a href="/" className={"btn"}>
        Back home
      </a>
    </div>
  );
};

export default SettingsPage;
