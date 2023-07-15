import { storeToRefs } from 'pinia';

import { useDayStore } from '~/store/day';
import { useSlotStore } from '~/store/slot';

export function useDayService() {
  const dayStore = useDayStore();
  const slotStore = useSlotStore();

  const { dayList, extendedDayList } = storeToRefs(dayStore);
  const { updateHoliday } = dayStore;
  const { slotList } = storeToRefs(slotStore);
  const { insertSlot, removeSlot } = slotStore;

  return { dayList, extendedDayList, updateHoliday, insertSlot, removeSlot };
}
