import { defineStore } from 'pinia';

export const useAppStore = defineStore('app', () => {
  const isLoading = ref(false);

  function setIsLoading(value: boolean) {
    isLoading.value = value;
  }

  return {
    isLoading,
    setIsLoading,
  };
});
