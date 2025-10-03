import React from "react";
import Header from "@/components/Header";

const LoginPage: React.FC = () => {
  document.title = "Login";

  return (
    <div className={"w-screen h-screen flex flex-col p-4 space-y-4"}>
      <Header title={"Login"} />
      <a href="/" className={"btn"}>
        Back home
      </a>
    </div>
  );
};

export default LoginPage;
