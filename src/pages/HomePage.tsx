import React from "react";
import Header from "@/components/Header";
import { AppTheme, AppThemes } from "@/types";

const HomePage: React.FC = () => {
  document.title = "Warehouse (by Verstack)";

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
