import { storeToRefs } from 'pinia';

import type { ExtendedSlot } from '~/miscs/types';
import { useDayStore } from '~/store/day';
import { useSlotStore } from '~/store/slot';

export function useDayService() {
  const dayStore = useDayStore();
  const slotStore = useSlotStore();

  const { extendedDayList } = storeToRefs(dayStore);
  const { updateHoliday } = dayStore;
  const { slotList, doctorPerSlot } = storeToRefs(slotStore);
  const { insertSlot, removeSlot, assignDoctor } = slotStore;

  const extendedSlotListPerDay = computed(() =>
    slotList.value.reduce<NodeJS.Dict<ExtendedSlot[]>>(
      (prevResult, currentValue) => {
        if (prevResult[currentValue.dayId] === undefined) {
          prevResult[currentValue.dayId] = [];
        }

        const targetDay = extendedDayList.value.find(
          (day) => day.id === currentValue.dayId,
        );

        if (targetDay) {
          prevResult[currentValue.dayId]!.push({
            id: currentValue.id,
            day: targetDay,
            doctor: doctorPerSlot.value[currentValue.id],
          });
        }

        return prevResult;
      },
      {},
    ),
  );

  return {
    extendedDayList,
    updateHoliday,
    insertSlot,
    removeSlot,
    assignDoctor,
    extendedSlotListPerDay,
  };
}
