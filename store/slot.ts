import { defineStore } from 'pinia';
import { v4 as uuid } from 'uuid';
import { z } from 'zod';

import { slotSchema } from '~/miscs/schema';
import type { Day, Slot } from '~/miscs/types';

const slotListSchema = z.array(slotSchema);

const storageKey = 'duty-table:slot-list';

export const useSlotStore = defineStore('slot', () => {
  const { getItem, setItem } = useLocalStorage();

  const slotList = ref<Slot[]>(getItem(storageKey, slotListSchema) ?? []);

  function insertSlot<T extends Day>(oneDay: T): void {
    const newSlot: Slot = {
      id: uuid(),
      dayId: oneDay.id,
    };

    slotList.value.push(newSlot);
    setItem(storageKey, slotList.value);
  }

  function removeSlot<T extends Slot>(target: T): void {
    const index = slotList.value.findIndex((slot) => slot.id === target.id);

    if (index !== -1) {
      slotList.value.splice(index, 1);
      setItem(storageKey, slotList.value);
    }
  }

  return {
    slotList,
    insertSlot,
    removeSlot,
  };
});