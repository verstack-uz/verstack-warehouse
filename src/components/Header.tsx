import React from "react";

interface HeaderProps {
  title: string;
}

const Header: React.FC<HeaderProps> = ({ title }) => {
  return <h1 className="text-3xl pb-4">{title}</h1>;
};

export default Header;
