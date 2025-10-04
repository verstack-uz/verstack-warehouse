/**
 * Header Component
 * Displays page title in a styled header format.
 */

// third-party libraries
import React from "react";

interface HeaderProps {
  title: string;
}

const Header: React.FC<HeaderProps> = ({ title }) => {
  return (
    <div className={"pb-4"}>
      <h1 className="text-3xl">{title}</h1>
    </div>
  );
};
export default Header;
