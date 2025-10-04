/**
 * @desc A simple mock implementation of `localStorage` for testing purposes.
 * It uses a `Map` data structure to store key-value pairs in memory.
 * This mock provides the same interface as the browser's `localStorage`.
 */
class LocalStorageMock {
  /**
   * @desc A Map to store key-value pairs in memory.
   */
  private data = new Map<string, any>();

  /**
   * @desc Clears all key-value pairs from the mock localStorage.
   */
  clear() {
    this.data.clear();
  }

  /**
   * @desc Retrieves the value associated with the given key from the mock `localStorage`.
   * If the key does not exist, it returns `null`.
   * @template T The expected type of the value associated with the key.
   * @param key {string} The key whose value is to be retrieved.
   * @return {T | null} The value associated with the key, or `null` if the key does not exist.
   */
  getItem<T>(key: string): T | null {
    if (this.data.has(key)) {
      return this.data.get(key) as T;
    } else {
      return null;
    }
  }

  /**
   * @desc Stores a key-value pair in the mock `localStorage`.
   * If the key already exists, its value is updated.
   * @template T The type of the value to be stored.
   * @param key {string} The key under which the value is to be stored.
   * @param value {T} The value to be stored.
   * @return {void}
   */
  setItem<T>(key: string, value: T) {
    this.data.set(key, value);
  }

  /**
   * @desc Removes the key-value pair associated with the given key from the mock `localStorage`.
   * If the key does not exist, this operation has no effect.
   * @param key {string} The key whose key-value pair is to be removed.
   * @return {void}
   */
  removeItem(key: string) {
    this.data.delete(key);
  }
}

/**
 * @desc Declare a mock for localStorage in the global scope, useful for testing
 * since it is usually only available in the browser environment, but testing
 * is often done in a Node.js environment.
 * @return {void}
 */
export function declareLocalStorageMock(): void {
  Object.defineProperty(global, "localStorage", {
    value: new LocalStorageMock(),
    configurable: true,
    writable: true,
  });
}
