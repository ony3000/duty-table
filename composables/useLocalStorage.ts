import invariant from 'tiny-invariant';

export function useLocalStorage() {
  const { localStorage: storage } = globalThis;

  function getItem<T = unknown>(
    key: string,
    typeGuard: (arg: unknown) => arg is T,
  ): T | null {
    if (!storage) {
      return null;
    }

    const storedItem = storage.getItem(key);

    if (storedItem === null) {
      return null;
    }

    try {
      const parsedItem = JSON.parse(storedItem) as unknown;

      invariant(typeGuard(parsedItem));

      return parsedItem;
    } catch (_) {
      setItem(key, null);

      return null;
    }
  }

  function setItem(key: string, value: unknown): void {
    if (storage) {
      storage.setItem(key, JSON.stringify(value));
    }
  }

  return {
    getItem,
    setItem,
  };
}
