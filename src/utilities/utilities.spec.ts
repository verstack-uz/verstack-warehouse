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
import { LSUtil, StrUtil } from "@/utilities/utilities";
import { AppTheme, AppThemes, User } from "@/utilities/types";
import { declareLocalStorageMock } from "@/utilities/mocks";

// Testing string utilities
describe("StrUtil test", () => {
  it("should make string's first letter uppercase", () => {
    const testCases = [
      { input: "a", expected: "A" },
      { input: "hello", expected: "Hello" },
      { input: "hello world", expected: "Hello world" },
      { input: "0", expected: "0" },
      { input: "", expected: "" },
    ];

    for (const { input, expected } of testCases) {
      expect(StrUtil.capitalizeFirstLetter(input)).toBe(expected);
    }
  });

  it("should throw error when input is not a string or not defined", () => {
    const invalidInputs = [null, undefined, 123, true, {}, []];

    for (const [index, input] of invalidInputs.entries()) {
      expect(
        () => StrUtil.capitalizeFirstLetter(input as string),
        `Input: ${input} (at index ${index} of 'invalidInputs') should throw an error, but it didn't!`,
      ).toThrowError();
    }
  });
});

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
    expect(() => LSUtil.setTheme(testTheme)).not.toThrowError();

    // Check if localStorage.setItem was called with correct parameters
    expect(setItemSpy).toHaveBeenCalledWith(LSUtil.Key.THEME, testTheme);

    // Check if the theme was actually set in localStorage
    const storedTheme = localStorage.getItem(LSUtil.Key.THEME);
    expect(storedTheme).toBe(testTheme);
  });

  it("should work fine when providing valid app theme", () => {
    for (const theme of AppThemes)
      expect(() => LSUtil.setTheme(theme)).not.toThrowError();
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
        () => LSUtil.setTheme(theme as AppTheme),
        `Passing an invalid theme (${theme}) should throw an error!`,
      ).toThrowError();
    }
  });
});

// Testing the getTheme() method with valid/invalid theme names
describe("getTheme() method test", () => {
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
    const theme = LSUtil.getTheme();

    // Check if localStorage.getItem was called with correct parameters
    expect(getItemSpy).toHaveBeenCalledWith(LSUtil.Key.THEME);

    // Check if the returned theme is valid (even if not set before)
    expect(theme).not.toBeNull();

    // Set theme and get again
    LSUtil.setTheme(AppThemes.at(0));
    const theme2 = LSUtil.getTheme();
    expect(theme2).not.toBeNull();
    expect(theme2).toBe(AppThemes.at(0));
  });

  it("should return a valid (non-null) theme even if localStorage is empty", () => {
    const theme = LSUtil.getTheme();
    expect(theme).not.toBeNull();
    expect(AppThemes.indexOf(theme)).not.toBe(-1);
  });
});

// Testing the setUser() method with valid/invalid user objects
describe("setUser() method test", () => {
  beforeAll(() => {
    declareLocalStorageMock();
  });

  beforeEach(() => {
    localStorage.clear();
  });

  it("should include firstName, lastName, phoneNumber, and role in User type", () => {
    // Check if User type has required properties
    expectTypeOf<User>().toHaveProperty("firstName").toBeString();
    expectTypeOf<User>().toHaveProperty("lastName").toBeString();
    expectTypeOf<User>().toHaveProperty("phoneNumber").toBeString();
    expectTypeOf<User>().toHaveProperty("role").toBeString();
  });

  it("should set user in localStorage when calling setUser with valid user object", () => {
    // A valid user object
    const validUser: User = {
      firstName: "John",
      lastName: "Doe",
      phoneNumber: "+998901234567",
      role: "warehouse manager",
    };

    // Set a spy on localStorage.setItem
    const setItemSpy = vi.spyOn(localStorage, localStorage.setItem.name);

    // Call the setUser with valid user object and expect no error
    expect(() => LSUtil.setUser(validUser)).not.toThrowError();

    // Check if localStorage.setItem was called with correct parameters
    expect(setItemSpy).toHaveBeenCalledWith(
      LSUtil.Key.USER,
      JSON.stringify(validUser),
    );

    // Check if the user was actually set in localStorage
    const storedUserJson = localStorage.getItem(LSUtil.Key.USER);
    expect(storedUserJson).not.toBeNull();
    const storedUser = JSON.parse(storedUserJson as string) as User;
    expect(storedUser).toEqual(validUser);
  });

  it("should throw error when calling setUser with invalid user object", () => {
    // Some invalid user objects
    const invalidUsers = [
      {}, // empty object
      { firstName: "John" }, // missing fields: lastName, phoneNumber, role
      { lastName: "Doe" }, // missing fields: firstName, phoneNumber, role
      { phoneNumber: "+998901234567" }, // missing fields: firstName, lastName, role
      { role: "warehouse manager" }, // missing fields: firstName, lastName, phoneNumber
      {
        firstName: null, // invalid firstName
        lastName: "Doe",
        phoneNumber: "+998901234567",
        role: "warehouse manager",
      },
      {
        firstName: "John",
        lastName: "Doe",
        phoneNumber: "+998901234567",
        role: "invalid role", // invalid role
      },
      null,
      undefined,
      123,
      "string",
      true,
    ];

    for (const user of invalidUsers) {
      // Expect setUser to throw an error when called with invalid user object
      expect(
        () => LSUtil.setUser(user as User),
        `Passing an invalid user (${JSON.stringify(
          user,
        )}) should throw an error!`,
      ).toThrowError();
    }
  });
});

// Testing the getUser() method with/without a logged-in user
describe("getUser() method test", () => {
  beforeAll(() => {
    declareLocalStorageMock();
  });

  beforeEach(() => {
    localStorage.clear();
  });

  it("should get user from localStorage when calling getUser", () => {
    // A valid user object to set first
    const validUser: User = {
      firstName: "John",
      lastName: "Doe",
      phoneNumber: "+998901234567",
      role: "warehouse manager",
    };

    // Set the user first
    LSUtil.setUser(validUser);

    // Set a spy on localStorage.getItem
    const getItemSpy = vi.spyOn(localStorage, localStorage.getItem.name);

    // Call the getUser
    const user = LSUtil.getUser();

    // Check if localStorage.getItem was called with correct parameters
    expect(getItemSpy).toHaveBeenCalledWith(LSUtil.Key.USER);

    // Check if the returned user matches the set user
    expect(user).toEqual(validUser);
  });

  it("should throw error when calling getUser if no user is logged in", () => {
    // Ensure localStorage is empty
    expect(localStorage.getItem(LSUtil.Key.USER)).toBeNull();

    // Expect getUser to throw an error since no user is set
    expect(() => LSUtil.getUser()).toThrowError(
      "No user is currently logged in",
    );
  });
});

// Testing the clearUser() method
describe("clearUser() method test", () => {
  beforeAll(() => {
    declareLocalStorageMock();
  });

  beforeEach(() => {
    localStorage.clear();
  });

  it("should clear user from localStorage when calling clearUser", () => {
    // A valid user object to set first
    const validUser: User = {
      firstName: "John",
      lastName: "Doe",
      phoneNumber: "+998901234567",
      role: "warehouse manager",
    };

    // Set the user first
    LSUtil.setUser(validUser);

    // Ensure the user is set
    expect(localStorage.getItem(LSUtil.Key.USER)).not.toBeNull();

    // Set a spy on localStorage.removeItem
    const removeItemSpy = vi.spyOn(localStorage, localStorage.removeItem.name);

    // Call the clearUser
    LSUtil.clearUser();

    // Check if localStorage.removeItem was called with correct parameters
    expect(removeItemSpy).toHaveBeenCalledWith(LSUtil.Key.USER);

    // Check if the user is actually cleared from localStorage
    expect(localStorage.getItem(LSUtil.Key.USER)).toBeNull();
  });
});
