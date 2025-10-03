import React from "react";
import { AppTheme, AppThemes } from "@/types";

const ThemeSelector: React.FC = () => {
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
    <div>
      <h1>Selected theme: {theme}</h1>

      <div className="flex flex-row flex-wrap space-x-2 space-y-2">
        {AppThemes.map((_theme: AppTheme, idx: number) => (
          <input
            className="btn btn-soft flex-1"
            type="radio"
            name="radio-15"
            aria-label={_theme}
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
