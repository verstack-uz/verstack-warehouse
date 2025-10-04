/**
 * Theme Selector Component.
 * Component for selecting the application theme.
 * Allows users to choose from predefined themes and saves the selection in localStorage.
 * Uses FlyonUI framework themes.
 */

// third-party libraries
import React from "react";

// local / internal stuff
import { AppTheme, AppThemes } from "@/utilities/types";
import { StrUtil } from "@/utilities/utilities";

interface ThemeSelectorProps {
  theme: AppTheme;
  setTheme: React.Dispatch<React.SetStateAction<AppTheme>>;
}

const ThemeSelector: React.FC<ThemeSelectorProps> = ({ theme, setTheme }) => {
  return (
    <div className={"flex flex-col space-y-4"}>
      <p className={"text-2xl"}>Theme</p>
      <div className={"flex flex-row flex-wrap space-x-2 space-y-2"}>
        {AppThemes.map((_theme: AppTheme, idx: number) => (
          <input
            className="btn btn-soft flex-1 min-w-24"
            type="radio"
            key={`theme-selector-${idx}`}
            name="theme-selector-group"
            aria-label={StrUtil.capitalizeFirstLetter(_theme)}
            defaultChecked={_theme === theme}
            onClick={() => {
              setTheme(_theme);
              localStorage.setItem("theme", _theme);
            }}
          />
        ))}
      </div>
    </div>
  );
};
export default ThemeSelector;
