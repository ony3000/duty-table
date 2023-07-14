import { defineStore } from 'pinia';
import { v4 as uuid } from 'uuid';
import { z } from 'zod';

import { daySchema } from '~/miscs/schema';
import type { Day, DayOfTheWeek, ExtendedDay } from '~/miscs/types';

const dayCount = 14;

const dayListSchema = z.array(daySchema);

const storageKey = 'duty-table:day-list';

export const useDayStore = defineStore('day', () => {
  const { getItem, setItem } = useLocalStorage();

  const dayList = ref<Day[]>(
    (getItem(storageKey, dayListSchema) ?? []).slice(0, dayCount),
  );

  while (dayList.value.length < dayCount) {
    dayList.value.push({
      id: uuid(),
      isHoliday: false,
    });
  }

  setItem(storageKey, dayList.value);

  const extendedDayList = computed<ExtendedDay[]>(() =>
    dayList.value.map((day, index) => {
      const dayOfTheWeek = ((1 + index) % 7) as DayOfTheWeek;

      return {
        ...day,
        index,
        indexGroup: Math.floor((index * 2) / 7), // index를 3.5(=목요일 index와 금요일 index의 중간값)로 나눈 몫
        dayOfTheWeek,
      };
    }),
  );

  function updateHoliday<T extends Day>(oneDay: T): void {
    const dayOrNot = dayList.value.find((day) => day.id === oneDay.id);

    if (dayOrNot) {
      dayOrNot.isHoliday = !dayOrNot.isHoliday;
    }

    setItem(storageKey, dayList.value);
  }

  return {
    dayList,
    extendedDayList,
    updateHoliday,
  };
});
