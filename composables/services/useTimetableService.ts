import { SUN, MON, THU, FRI, SAT, BUFFER_DAYS } from '~/miscs/constants';
import type { Doctor, ExtendedSlot } from '~/miscs/types';
import { shuffle } from '~/miscs/utils';

type WeightAppliedSlot = ExtendedSlot & {
  weight: number;
  availableDoctorSet: Set<Doctor>;
};
type WeightAppliedDoctor = Doctor & {
  weightSum: number;
  assignedSlotCount: number;
  availableSlotList: WeightAppliedSlot[];
};

export function useTimetableService() {
  const { doctorList } = useDoctorService();
  const { extendedDayList, assignDoctor, extendedSlotListPerDay } =
    useDayService();

  function hasUnassignedSlot(givenExtendedSlotList: ExtendedSlot[]): boolean {
    return givenExtendedSlotList.some((slot) => slot.doctor === undefined);
  }

  /**
   * 데이터 초기화
   */
  function initialize(givenExtendedSlotList: ExtendedSlot[]): void {
    givenExtendedSlotList.forEach((slot) => {
      slot.doctor = undefined;
    });
  }

  /**
   * 첫 번째 라운드
   *
   * 모든 Doctor의 첫 번째 Slot은 임의로 배정한다
   */
  function firstRound(
    givenDoctorList: Doctor[],
    givenExtendedSlotList: ExtendedSlot[],
  ): void {
    const shuffledDoctorList: Doctor[] = shuffle(givenDoctorList.slice());
    const shuffledExtendedSlotList: ExtendedSlot[] = shuffle(
      givenExtendedSlotList.slice(),
    );

    const minLength = Math.min(
      shuffledDoctorList.length,
      shuffledExtendedSlotList.length,
    );

    for (let index = 0; index < minLength; index += 1) {
      shuffledExtendedSlotList[index].doctor = shuffledDoctorList[index];
    }
  }

  /**
   * 두 번째 라운드
   *
   * 모든 Doctor의 두 번째 Slot은 첫 번째 Slot과 반대로 임의 배정한다
   *
   * - 첫 번째 Slot이 평일(월-목)이면 두 번째 Slot은 주말(금-일)
   * - 첫 번째 Slot이 주말(금-일)이면 두 번째 Slot은 평일(월-목)
   */
  function secondRound(givenExtendedSlotList: ExtendedSlot[]): void {
    /**
     * 첫 번째 라운드에서 Doctor가 배정된 Slot
     */
    const doctorAssignedSlotList = givenExtendedSlotList.filter(
      (slot) => slot.doctor !== undefined,
    ) as Required<ExtendedSlot>[];

    /**
     * 평일 Slot
     */
    const shuffledWeekdaySlotList: ExtendedSlot[] = shuffle(
      givenExtendedSlotList.filter(
        (slot) => slot.day.dayOfTheWeek >= MON && slot.day.dayOfTheWeek <= THU,
      ),
    );
    /**
     * 주말 Slot
     */
    const shuffledWeekendSlotList: ExtendedSlot[] = shuffle(
      givenExtendedSlotList.filter(
        (slot) =>
          !(slot.day.dayOfTheWeek >= MON && slot.day.dayOfTheWeek <= THU),
      ),
    );

    doctorAssignedSlotList.forEach(({ day, doctor }) => {
      const { dayOfTheWeek } = day;

      const availableWeekdaySlotList = shuffledWeekdaySlotList.filter(
        (slot) =>
          slot.doctor === undefined &&
          (slot.day.index < day.index - BUFFER_DAYS ||
            slot.day.index > day.index + BUFFER_DAYS),
      );
      const availableWeekendSlotList = shuffledWeekendSlotList.filter(
        (slot) =>
          slot.doctor === undefined &&
          (slot.day.index < day.index - BUFFER_DAYS ||
            slot.day.index > day.index + BUFFER_DAYS),
      );

      // 평일 배정자에게 주말 배정 (Slot이 있다면)
      if (dayOfTheWeek >= MON && dayOfTheWeek <= THU) {
        const extendedSlot = availableWeekendSlotList.at(0);

        if (extendedSlot) {
          extendedSlot.doctor = doctor;
        }
      }
      // 주말 배정자에게 평일 배정 (Slot이 있다면)
      else {
        const extendedSlot = availableWeekdaySlotList.at(0);

        if (extendedSlot) {
          extendedSlot.doctor = doctor;
        }
      }
    });
  }

  /**
   * 마지막 라운드
   *
   * Doctor가 배정되지 않은 나머지 Slot에 Doctor를 배정한다
   */
  function finalRound(
    givenDoctorList: Doctor[],
    givenExtendedSlotList: ExtendedSlot[],
  ): void {
    while (hasUnassignedSlot(givenExtendedSlotList)) {
      /**
       * Doctor가 배정되지 않은 Slot
       */
      const doctorUnassignedSlotList: WeightAppliedSlot[] =
        givenExtendedSlotList
          .filter((slot) => slot.doctor === undefined)
          .map((slot) => {
            let weight = 1;
            const { isHoliday, dayOfTheWeek } = slot.day;

            if (isHoliday || [SAT, SUN].includes(dayOfTheWeek)) {
              weight = 2;
            } else if ([FRI].includes(dayOfTheWeek)) {
              weight = 1.5;
            }

            return { ...slot, weight, availableDoctorSet: new Set() };
          });

      /**
       * 배정된 Slot 기반으로 근무시간 가중치(weight)가 반영된 Doctor
       */
      const weightedDoctorList: WeightAppliedDoctor[] = givenDoctorList.map(
        (doctor) => {
          /**
           * 근무시간 가중치 합계
           */
          let weightSum = 0;
          /**
           * 이 Doctor에게 배정 가능한 Slot
           */
          let availableSlotList = doctorUnassignedSlotList.slice();

          /**
           * 이 Doctor가 배정된 Slot
           */
          const thisDoctorAssignedSlotList = givenExtendedSlotList.filter(
            (slot) => slot.doctor === doctor,
          );

          thisDoctorAssignedSlotList.forEach(({ day }) => {
            const { index, indexGroup, dayOfTheWeek } = day;

            if (day.isHoliday || [SAT, SUN].includes(dayOfTheWeek)) {
              weightSum += 2;
            } else if ([FRI].includes(dayOfTheWeek)) {
              weightSum += 1.5;
            } else {
              weightSum += 1;
            }

            availableSlotList = availableSlotList.filter(
              (slot) =>
                slot.day.indexGroup !== indexGroup &&
                (slot.day.index < index - BUFFER_DAYS ||
                  slot.day.index > index + BUFFER_DAYS),
            );
          });

          availableSlotList.forEach((slot) => {
            slot.availableDoctorSet.add(doctor);
          });

          return {
            ...doctor,
            weightSum,
            assignedSlotCount: thisDoctorAssignedSlotList.length,
            availableSlotList,
          };
        },
      );

      weightedDoctorList.sort((former, latter) => {
        if (former.availableSlotList.length === 0) {
          return 1;
        } else if (latter.availableSlotList.length === 0) {
          return -1;
        }

        return (
          former.assignedSlotCount - latter.assignedSlotCount ||
          former.weightSum - latter.weightSum ||
          former.availableSlotList.length - latter.availableSlotList.length
        );
      });

      const weightedDoctorOrNot = weightedDoctorList.at(0);

      if (!weightedDoctorOrNot) {
        throw new Error('There are no doctors available.');
      }

      const orderedAvailableSlotList = weightedDoctorOrNot.availableSlotList
        .slice()
        .sort(
          (former, latter) =>
            latter.weight - former.weight ||
            former.availableDoctorSet.size - latter.availableDoctorSet.size,
        );
      const availableSlotOrNot = orderedAvailableSlotList.at(0);

      if (!availableSlotOrNot) {
        throw new Error('There are no slots available for this doctor.');
      }

      const targetSlot = givenExtendedSlotList.find(
        (slot) => slot.id === availableSlotOrNot.id,
      );
      const targetDoctor = givenDoctorList.find(
        (doctor) => doctor.id === weightedDoctorOrNot.id,
      );

      if (targetSlot && targetDoctor) {
        targetSlot.doctor = targetDoctor;
      }
    }
  }

  async function calculateTimetable(): Promise<void> {
    const nonreactiveDoctorList: Doctor[] = doctorList.value.map((doctor) => ({
      ...doctor,
    }));
    const nonreactiveExtendedSlotList: ExtendedSlot[] =
      extendedDayList.value.reduce<ExtendedSlot[]>(
        (prevResult, currentValue) => {
          return [
            ...prevResult,
            ...(extendedSlotListPerDay.value[currentValue.id] ?? []),
          ];
        },
        [],
      );

    initialize(nonreactiveExtendedSlotList);
    nonreactiveExtendedSlotList.forEach((extendedSlot) => {
      assignDoctor(
        { id: extendedSlot.id, dayId: extendedSlot.day.id },
        undefined,
      );
    });
    await nextTick();

    let retryCount = 0;

    while (hasUnassignedSlot(nonreactiveExtendedSlotList)) {
      try {
        firstRound(nonreactiveDoctorList, nonreactiveExtendedSlotList);
        if (!hasUnassignedSlot(nonreactiveExtendedSlotList)) {
          break;
        }

        secondRound(nonreactiveExtendedSlotList);
        if (!hasUnassignedSlot(nonreactiveExtendedSlotList)) {
          break;
        }

        finalRound(nonreactiveDoctorList, nonreactiveExtendedSlotList);
        break;
      } catch (err) {
        console.error(err);

        retryCount += 1;
        if (retryCount > 10) {
          break;
        }
        console.log(`%cRetry calculation (${retryCount})`, 'color: orange;');
        initialize(nonreactiveExtendedSlotList);
      }
    }

    await new Promise((resolve) => {
      setTimeout(() => {
        resolve(undefined);
      }, 500);
    });

    nonreactiveExtendedSlotList.forEach((extendedSlot) => {
      assignDoctor(
        { id: extendedSlot.id, dayId: extendedSlot.day.id },
        extendedSlot.doctor,
      );
    });

    if (hasUnassignedSlot(nonreactiveExtendedSlotList)) {
      console.log('doctor가 배정되지 못한 slot이 존재함');
    } else {
      console.log('모든 slot에 doctor 배정됨');
    }

    return Promise.resolve();
  }

  return { calculateTimetable };
}
