// standard libraries
import assert from "node:assert";

// third-party libraries
import {
  vi,
  describe,
  it,
  beforeAll,
  afterAll,
  beforeEach,
  afterEach,
  expect,
  expectTypeOf,
} from "vitest";

// local / internal stuff
import { setStoredTheme, getStoredTheme, LS_KEY_THEME } from "./utilities";
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

    expectTypeOf(AppThemes).toEqualTypeOf<AppTheme[]>();
    for (const theme of AppThemes) {
      expectTypeOf(theme).toEqualTypeOf<AppTheme>();
    }
  });

  it("should set theme in localStorage when calling setStoredTheme with valid theme", () => {
    // Pick a valid theme from AppThemes
    const testTheme: AppTheme = AppThemes.at(0);

    // Set a spy on localStorage.setItem
    const setItemSpy = vi.spyOn(localStorage, localStorage.setItem.name);

    // Call the setStoredTheme with valid theme and expect no error
    expect(() => setStoredTheme(testTheme)).not.toThrowError();

    // Check if localStorage.setItem was called with correct parameters
    expect(setItemSpy).toHaveBeenCalledWith(LS_KEY_THEME, testTheme);

    // Check if the theme was actually set in localStorage
    const storedTheme = localStorage.getItem(LS_KEY_THEME);
    expect(storedTheme).toBe(testTheme);
  });

  it("should work fine when providing valid app theme", () => {
    for (const theme of AppThemes)
      expect(() => setStoredTheme(theme)).not.toThrowError();
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
        () => setStoredTheme(theme as AppTheme),
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
    const theme = getStoredTheme();

    // Check if localStorage.getItem was called with correct parameters
    expect(getItemSpy).toHaveBeenCalledWith(LS_KEY_THEME);

    // Check if the returned theme is valid (even if not set before)
    expect(theme).not.toBeNull();

    // Set theme and get again
    setStoredTheme(AppThemes.at(0));
    const theme2 = getStoredTheme();
    expect(theme2).not.toBeNull();
    expect(theme2).toBe(AppThemes.at(0));
  });

  it("should return a valid (non-null) theme even if localStorage is empty", () => {
    const theme = getStoredTheme();
    expect(theme).not.toBeNull();
    expect(AppThemes.indexOf(theme)).not.toBe(-1);
  });
});
