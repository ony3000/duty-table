<script setup lang="ts">
import { v4 as uuid } from 'uuid';

import type { Doctor, DayOfTheWeek, Day, Slot } from '~/miscs/types';
import { shuffle } from '~/miscs/utils';

import DoctorLineup from './DoctorLineup.vue';
import WeeklySchedule from './WeeklySchedule.vue';

const doctorList: Doctor[] = 'ABCDEFGH'
  .split('')
  .map((suffix) => ({ id: uuid(), name: `홍길동${suffix}` }));

const dayList: Day[] = [...Array(14)].map((_, index) => {
  const dayOfTheWeek = ((1 + index) % 7) as DayOfTheWeek;

  return {
    id: uuid(),
    index,
    dayOfTheWeek,
    isHoliday: false,
  };
});

const slotList: Slot[] = [];

(() => {
  // 첫 번째 주
  slotList.push({ id: uuid(), day: dayList[0] });
  slotList.push({ id: uuid(), day: dayList[1] });
  slotList.push({ id: uuid(), day: dayList[1] });
  slotList.push({ id: uuid(), day: dayList[2] });
  slotList.push({ id: uuid(), day: dayList[2] });
  slotList.push({ id: uuid(), day: dayList[3] });
  slotList.push({ id: uuid(), day: dayList[3] });
  slotList.push({ id: uuid(), day: dayList[4] });
  slotList.push({ id: uuid(), day: dayList[4] });
  slotList.push({ id: uuid(), day: dayList[5] });
  slotList.push({ id: uuid(), day: dayList[5] });
  slotList.push({ id: uuid(), day: dayList[6] });
  slotList.push({ id: uuid(), day: dayList[6] });

  // 두 번째 주
  slotList.push({ id: uuid(), day: dayList[7] });
  slotList.push({ id: uuid(), day: dayList[8] });
  slotList.push({ id: uuid(), day: dayList[8] });
  slotList.push({ id: uuid(), day: dayList[9] });
  slotList.push({ id: uuid(), day: dayList[9] });
  slotList.push({ id: uuid(), day: dayList[10] });
  slotList.push({ id: uuid(), day: dayList[10] });
  slotList.push({ id: uuid(), day: dayList[11] });
  slotList.push({ id: uuid(), day: dayList[11] });
  slotList.push({ id: uuid(), day: dayList[12] });
  slotList.push({ id: uuid(), day: dayList[12] });
  slotList.push({ id: uuid(), day: dayList[13] });
  slotList.push({ id: uuid(), day: dayList[13] });
})();

/**
 * 데이터 초기화
 */
function initialize(): void {
  console.log('initialize');

  slotList.forEach((slot) => {
    slot.doctor = undefined;
  });
}

/**
 * 첫 번째 라운드
 *
 * 모든 Doctor의 첫 번째 Slot은 임의로 배정한다
 */
function firstRound(): void {
  console.log('firstRound');

  const shuffledDoctorList: Doctor[] = shuffle(doctorList.slice());
  const shuffledSlotList: Slot[] = shuffle(slotList.slice());

  const minLength = Math.min(
    shuffledDoctorList.length,
    shuffledSlotList.length,
  );

  for (let index = 0; index < minLength; index += 1) {
    shuffledSlotList[index].doctor = shuffledDoctorList[index];
  }
}

/**
 * 시간표 모의 계산
 */
function clickHandler(): void {
  console.group('%cmock calculation', 'color: cornflowerblue;');

  console.log(doctorList);
  console.log(dayList);
  console.log(slotList);

  initialize();
  if (slotList.every((slot) => slot.doctor !== undefined)) {
    console.groupEnd();
    return;
  }

  firstRound();
  if (slotList.every((slot) => slot.doctor !== undefined)) {
    console.groupEnd();
    return;
  }

  console.groupEnd();
}
</script>

<template>
  <div class="mx-auto px-4 sm:px-6 lg:px-8 w-[1280px]">
    <div class="space-y-4 py-4">
      <div class="text-right">
        <UButton
          icon="i-heroicons-calendar-days"
          label="시간표 계산"
          @click="clickHandler"
        />
      </div>
      <div class="flex space-x-4">
        <DoctorLineup />
        <WeeklySchedule />
      </div>
    </div>
  </div>
</template>
