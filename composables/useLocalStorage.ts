import type { ZodTypeAny, infer as ZodInfer } from 'zod';

export function useLocalStorage() {
  const { localStorage: storage } = globalThis;

  function getItem<T extends ZodTypeAny>(
    key: string,
    expectedSchema: T,
  ): ZodInfer<T> | null {
    if (!storage) {
      return null;
    }

    const storedItem = storage.getItem(key);

    if (storedItem === null) {
      return null;
    }

    try {
      const data = JSON.parse(storedItem) as unknown;

      expectedSchema.parse(data);

      return data as ZodInfer<typeof expectedSchema>;
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
