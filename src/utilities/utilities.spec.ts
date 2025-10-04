// third-party libraries
import {
  vi,
  describe,
  it,
  beforeAll,
  beforeEach,
  expect,
  expectTypeOf,
} from "vitest";

// local / internal stuff
import { LSUtil } from "@/utilities/utilities";
import { AppTheme, AppThemes } from "@/utilities/types";
import { declareLocalStorageMock } from "@/utilities/mocks";

// Testing the setTheme() method with valid/invalid theme names
describe("setTheme() method test", () => {
  beforeAll(() => {
    declareLocalStorageMock();
  });

  beforeEach(() => {
    localStorage.clear();
  });

  it("should have themes (at least ≥1), each having type `AppTheme` in AppThemes array", () => {
    expect(AppThemes.length).toBeGreaterThanOrEqual(1);
    // note: if all themes are `AppTheme`, then the array itself is of type `AppTheme[]`
    for (const theme of AppThemes)
      expectTypeOf(theme).toEqualTypeOf<AppTheme>();
  });

  it("should set theme in localStorage when calling setStoredTheme with valid theme", () => {
    // Pick a valid theme from AppThemes
    const testTheme: AppTheme = AppThemes.at(0);

    // Set a spy on localStorage.setItem
    const setItemSpy = vi.spyOn(localStorage, localStorage.setItem.name);

    // Call the setStoredTheme with valid theme and expect no error
    expect(() => LSUtil.setStoredTheme(testTheme)).not.toThrowError();

    // Check if localStorage.setItem was called with correct parameters
    expect(setItemSpy).toHaveBeenCalledWith(LSUtil.Key.THEME, testTheme);

    // Check if the theme was actually set in localStorage
    const storedTheme = localStorage.getItem(LSUtil.Key.THEME);
    expect(storedTheme).toBe(testTheme);
  });

  it("should work fine when providing valid app theme", () => {
    for (const theme of AppThemes)
      expect(() => LSUtil.setStoredTheme(theme)).not.toThrowError();
  });

  it("should throw error when providing invalid app theme", () => {
    // Some invalid themes (not in AppThemes)
    const invalidThemes = [
      "invalid",
      "blue",
      "red",
      "",
      "123",
      true,
      null,
      undefined,
    ];

    for (const theme of invalidThemes) {
      // Ensure the theme is indeed invalid
      expect(
        AppThemes.indexOf(theme as AppTheme),
        `Problem in the test: ${theme} is a valid theme!`,
      ).toBe(-1);

      // Expect setStoredTheme to throw an error when called with invalid theme
      expect(
        () => LSUtil.setStoredTheme(theme as AppTheme),
        `Passing an invalid theme (${theme}) should throw an error!`,
      ).toThrowError();
    }
  });
});

// Testing the getStoredTheme() method with valid/invalid theme names
describe("getStoredTheme() method test", () => {
  beforeAll(() => {
    declareLocalStorageMock();
  });

  beforeEach(() => {
    localStorage.clear();
  });

  it("should get theme from localStorage when calling getStoredTheme", () => {
    // Set a spy on localStorage.getItem
    const getItemSpy = vi.spyOn(localStorage, localStorage.getItem.name);

    // Call the getStoredTheme
    const theme = LSUtil.getStoredTheme();

    // Check if localStorage.getItem was called with correct parameters
    expect(getItemSpy).toHaveBeenCalledWith(LSUtil.Key.THEME);

    // Check if the returned theme is valid (even if not set before)
    expect(theme).not.toBeNull();

    // Set theme and get again
    LSUtil.setStoredTheme(AppThemes.at(0));
    const theme2 = LSUtil.getStoredTheme();
    expect(theme2).not.toBeNull();
    expect(theme2).toBe(AppThemes.at(0));
  });

  it("should return a valid (non-null) theme even if localStorage is empty", () => {
    const theme = LSUtil.getStoredTheme();
    expect(theme).not.toBeNull();
    expect(AppThemes.indexOf(theme)).not.toBe(-1);
  });
});
