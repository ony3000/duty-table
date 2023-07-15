import { storeToRefs } from 'pinia';

import { useDayStore } from '~/store/day';
import { useSlotStore } from '~/store/slot';

export function useDayService() {
  const dayStore = useDayStore();
  const slotStore = useSlotStore();

  const { extendedDayList } = storeToRefs(dayStore);
  const { updateHoliday } = dayStore;
  const { slotList } = storeToRefs(slotStore);
  const { insertSlot, removeSlot } = slotStore;

  return { extendedDayList, updateHoliday, insertSlot, removeSlot };
}
