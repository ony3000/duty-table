import { useDayStore } from '~/store/day';

export function useDayService() {
  const { dayList, extendedDayList } = useDayStore();

  return { dayList, extendedDayList };
}
