import React from "react";
import Header from "@/components/Header";
import ThemeSelector from "@/components/ThemeSelector";

const SettingsPage = () => {
  document.title = "Settings";

  return (
    <div className={"w-screen h-screen flex flex-col p-4 space-y-4"}>
      <Header title={"Settings"} />
      <ThemeSelector />
    </div>
  );
};

export default SettingsPage;
