import { defineStore } from 'pinia';
import { v4 as uuid } from 'uuid';
import { z } from 'zod';

import { slotSchema } from '~/miscs/schema';
import type { Doctor, Day, Slot } from '~/miscs/types';

const slotListSchema = z.array(slotSchema);

const storageKey = 'duty-table:slot-list';

export const useSlotStore = defineStore('slot', () => {
  const { getItem, setItem } = useLocalStorage();

  const slotList = ref<Slot[]>(getItem(storageKey, slotListSchema) ?? []);
  const doctorPerSlot = ref<NodeJS.Dict<Doctor>>({});

  function insertSlot<T extends Day>(oneDay: T): void {
    const newSlot: Slot = {
      id: uuid(),
      dayId: oneDay.id,
    };

    slotList.value.push(newSlot);
    setItem(storageKey, slotList.value);
  }

  function removeSlot<T extends Day>(oneDay: T): void {
    const index = slotList.value.findLastIndex(
      (slot) => slot.dayId === oneDay.id,
    );

    if (index !== -1) {
      slotList.value.splice(index, 1);
      setItem(storageKey, slotList.value);
    }
  }

  function assignDoctor(slot: Slot, doctor?: Doctor): void {
    doctorPerSlot.value[slot.id] = doctor;
  }

  return {
    slotList,
    doctorPerSlot,
    insertSlot,
    removeSlot,
    assignDoctor,
  };
});
