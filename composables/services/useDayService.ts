import { storeToRefs } from 'pinia';

import { useDayStore } from '~/store/day';

export function useDayService() {
  const store = useDayStore();

  const { dayList, extendedDayList } = storeToRefs(store);
  const { updateHoliday } = store;

  return { dayList, extendedDayList, updateHoliday };
}
