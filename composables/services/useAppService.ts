import { storeToRefs } from 'pinia';

import { useAppStore } from '~/store/app';

export function useAppService() {
  const store = useAppStore();

  const { isLoading } = storeToRefs(store);
  const { setIsLoading } = store;

  return { isLoading, setIsLoading };
}
