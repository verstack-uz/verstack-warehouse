// third-party libraries
import bcrypt from "bcryptjs";

// local / internal stuff
import { AppTheme, AppThemes, User } from "@/utilities/types";

// Local Storage Utilities
export namespace LSUtil {
  // Local Storage Keys
  export enum Key {
    THEME = "theme",
    USERS = "user",
  }

  // App theme management

  /**
   * @desc Get the stored theme from local storage. If not found, set to default "claude".
   * @return {AppTheme} The stored theme.
   */
  export function getStoredTheme(): AppTheme {
    let storedTheme = localStorage.getItem(Key.THEME) as AppTheme;
    if (!storedTheme || !AppThemes.includes(storedTheme)) {
      storedTheme = "claude";
      localStorage.setItem(Key.THEME, storedTheme);
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
      localStorage.setItem(Key.THEME, theme);
    } else {
      throw new Error(
        `Invalid theme: ${theme}, must be one of ${AppThemes.join(", ")}`,
      );
    }
  }

  // User login status management

  /**
   * @desc Get all users from local storage (private).
   * @return {User[]} Array of users.
   */
  function getAllUsers(): User[] {
    const usersJson = localStorage.getItem(Key.USERS);
    if (!usersJson) return [];
    return JSON.parse(usersJson) as User[];
  }

  /**
   * @desc Hash a password using bcrypt.
   * @param password {string} The password to hash.
   * @return {Promise<string>} The hashed password as a promise.
   */
  export async function passwordHash(password: string): Promise<string> {
    const saltRounds = 5; // Adjust salt rounds as needed (higher is more secure but slower)
    const salt = await bcrypt.genSalt(saltRounds);
    return await bcrypt.hash(password, salt);
  }

  /**
   * @desc Check if username and password hash (expected to be pre-hashed with
   * passwordHash function using bcrypt) match a user in local storage.
   * @return {User} The user object without password hash if found (passwordHash
   * is set to empty string). Throws error if not found or password incorrect.
   * @param username {string} The username to check.
   * @param passwordHash {string} The pre-hashed password to check.
   * @throws {Error} If user not found or password incorrect.
   */
  export function getUser(username: string, passwordHash: string): User {
    // Get all users from local storage
    const allUsers = getAllUsers();
    const user = allUsers.find(
      (u) => u.username === username && u.passwordHash === passwordHash,
    );
    if (!user) throw new Error("User not found or incorrect password");

    // Return user without password hash
    return { ...user, passwordHash: "" };
  }

  /**
   * @desc Checks if a given username exists in local storage (among all users).
   * @return {boolean} True if user exists, false otherwise.
   * @param username {string} The username to check.
   */
  export function hasUser(username: string): boolean {
    const allUsers = getAllUsers();
    return allUsers.some((u) => u.username === username);
  }

  /**
   * @desc Add a new user to local storage.
   * @param user {User} The user object to add (passwordHash must be pre-hashed
   * using passwordHash function with bcrypt).
   * @throws {Error} If username already exists.
   */
  export function addUser(user: User): void {
    if (hasUser(user.username)) {
      throw new Error(`Username ${user.username} already exists`);
    }
    const allUsers = getAllUsers();
    allUsers.push(user);
    localStorage.setItem(Key.USERS, JSON.stringify(allUsers));
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
    if (str.length === 0) return str;
    return str.charAt(0).toUpperCase() + str.slice(1);
  }
}
