import React from "react";
import Header from "@/components/Header";

const HomePage: React.FC = () => {
  document.title = "Warehouse (by Verstack)";

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
