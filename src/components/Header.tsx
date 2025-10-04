/**
 * Header Component
 * Displays page title in a styled header format.
 */

// third-party libraries
import React from "react";
import AppIcons from "@/utilities/icons";
import { AppRoute } from "@/routes";
import CircularIconButton from "@/components/CircularIconButton";

interface HeaderProps {
  title: string;
  hideSettingsButton?: boolean;
}

const Header: React.FC<HeaderProps> = ({
  title,
  hideSettingsButton = false,
}) => {
  return (
    <div className={"flex flex-row p-4"}>
      <h1 className="text-3xl flex-1">{title}</h1>
      {!hideSettingsButton && (
        <CircularIconButton
          iconName={AppIcons.SETTINGS}
          href={AppRoute.SETTINGS}
        />
      )}
    </div>
  );
};
export default Header;
