// local / internal stuff
import { AppTheme, AppThemes, User, UserRoles } from "@/utilities/types";

// Local Storage Utilities
export namespace LSUtil {
  // Local storage keys
  export enum Key {
    THEME = "theme",
    USER = "user",
  }

  // Theme data in local storage

  /**
   * @desc Get the stored theme from local storage. If not found, set to default "claude".
   * @return {AppTheme} The stored theme.
   */
  export function getTheme(): AppTheme {
    let storedTheme = localStorage.getItem(Key.THEME) as AppTheme;
    if (!storedTheme || !AppThemes.includes(storedTheme)) {
      storedTheme = "corporate";
      localStorage.setItem(Key.THEME, storedTheme);
    }
    return storedTheme;
  }

  /**
   * @desc Set the stored theme in local storage.
   * @param theme {AppTheme} The theme to set.
   * @return {void}
   */
  export function setTheme(theme: AppTheme): void {
    if (AppThemes.includes(theme)) {
      localStorage.setItem(Key.THEME, theme);
    } else {
      throw new Error(
        `Invalid theme: ${theme}, must be one of ${AppThemes.join(", ")}`,
      );
    }
  }

  // User data in local storage

  /**
   * @desc Retrieve the currently logged-in user from local storage.
   * @return {User} The currently logged-in user.
   * @throws {Error} If no user is currently logged in.
   */
  export function getUser(): User {
    const userJson = localStorage.getItem(Key.USER);
    if (!userJson) {
      throw new Error("No user is currently logged in");
    }
    return JSON.parse(userJson) as User;
  }

  /**
   * @desc Set the currently logged-in user in local storage.
   * @param firstName {string} The user's first name.
   * @param lastName {string} The user's last name.
   * @param phoneNumber {string} The user's phone number.
   * @param role {UserRole} The user's role.
   * @throws {Error} If any parameter is invalid.
   */
  export function setUser({
    firstName,
    lastName,
    phoneNumber,
    role,
  }: User): void {
    // Validate parameters
    if (!firstName || !lastName || !phoneNumber || !role)
      throw new Error("Invalid parameters to set user");
    if (!UserRoles.includes(role))
      throw new Error(
        `Invalid user role: ${role}, must be one of ${UserRoles}`,
      );

    // Create user object
    const user: User = { firstName, lastName, phoneNumber, role };

    // Store user object as JSON string in local storage
    localStorage.setItem(Key.USER, JSON.stringify(user));
  }

  /**
   * @desc Clear the currently logged-in user from local storage (log out).
   */
  export function clearUser(): void {
    if (localStorage.getItem(Key.USER)) {
      localStorage.removeItem(Key.USER);
    }
  }
}

// String utilities
export namespace StrUtil {
  /**
   * @desc Capitalize the first letter of a string.
   * @param str {string} The string to capitalize.
   * @return {string} The capitalized string.
   */
  export function capitalizeFirstLetter(str: string): string {
    // Validate parameter
    if (typeof str !== "string")
      throw new Error(`Invalid parameter to capitalizeFirstLetter: ${str}`);
    if (str.length === 0) return str;

    // Capitalize first letter and return
    return str.charAt(0).toUpperCase() + str.slice(1);
  }
}
