import { AppTheme, AppThemes } from "@/utilities/types";

// Local Storage Keys
export const LS_KEY_THEME = "theme";

/**
 * @desc Get the stored theme from local storage. If not found, set to default "claude".
 * @return {AppTheme} The stored theme.
 */
export function getStoredTheme(): AppTheme {
  let storedTheme = localStorage.getItem(LS_KEY_THEME) as AppTheme;
  if (!storedTheme || !AppThemes.includes(storedTheme)) {
    storedTheme = "claude";
    localStorage.setItem(LS_KEY_THEME, storedTheme);
  }
  return storedTheme;
}

/**
 * @desc Set the stored theme in local storage.
 * @param theme {AppTheme} The theme to set.
 * @return {void}
 */
export function setStoredTheme(theme: AppTheme): void {
  if (AppThemes.includes(theme)) {
    localStorage.setItem(LS_KEY_THEME, theme);
  } else {
    throw new Error(
      `Invalid theme: ${theme}, must be one of ${AppThemes.join(", ")}`,
    );
  }
}

// String utilities

/**
 * @desc Capitalize the first letter of a string.
 * @param str {string} The string to capitalize.
 * @return {string} The capitalized string.
 */
export function capitalizeFirstLetter(str: string): string {
  if (str.length === 0) return str;
  return str.charAt(0).toUpperCase() + str.slice(1);
}
