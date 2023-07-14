<script setup lang="ts">
import { SUN, MON, TUE, WED, THU, FRI, SAT } from '~/miscs/constants';
import type { DayOfTheWeek } from '~/miscs/types';

const { extendedDayList, updateHoliday } = useDayService();

const dayOfTheWeekList = '일월화수목금토'.split('');
</script>

<template>
  <div class="flex-1 space-y-4">
    <div class="grid grid-cols-7 gap-x-2.5 gap-y-4">
      <div v-for="extendedDay in extendedDayList">
        <!-- daily card -->
        <div class="w-32 border border-gray-500 rounded-xl overflow-hidden">
          <div
            :class="`px-4 py-1 text-center ${[
              extendedDay.isHoliday ||
              ([SAT, SUN] as DayOfTheWeek[]).includes(extendedDay.dayOfTheWeek)
                ? 'bg-red-300'
                : '',
              !extendedDay.isHoliday &&
              ([FRI] as DayOfTheWeek[]).includes(extendedDay.dayOfTheWeek)
                ? 'bg-orange-300'
                : '',
              !extendedDay.isHoliday &&
              ([MON, TUE, WED, THU] as DayOfTheWeek[]).includes(
                extendedDay.dayOfTheWeek,
              )
                ? 'bg-gray-300'
                : '',
            ].join(' ')}`"
          >
            {{ dayOfTheWeekList[extendedDay.dayOfTheWeek] }}
          </div>
          <hr />
          <div class="py-1 space-y-2">
            <div class="flex justify-center items-center space-x-4">
              <span>공휴일</span>
              <UToggle
                :model-value="extendedDay.isHoliday"
                @click="updateHoliday(extendedDay)"
                on-icon="i-heroicons-check"
                off-icon="i-heroicons-x-mark"
              />
            </div>
            <div class="flex justify-center items-center space-x-2">
              <UButton
                square
                size="2xs"
                icon="i-heroicons-minus"
                @click="console.log('remove slot')"
              />
              <span>인원</span>
              <UButton
                square
                size="2xs"
                icon="i-heroicons-plus"
                @click="console.log('add slot')"
              />
            </div>
          </div>
          <hr />
          <ul class="p-2 space-y-1">
            <li
              v-for="item in extendedDay.dayOfTheWeek === MON ? 1 : 2"
              class="rounded-md text-sm px-2 py-1 shadow-sm bg-white dark:bg-gray-900 text-gray-900 dark:text-white ring-1 ring-inset ring-gray-300 dark:ring-gray-700 flex items-center space-x-2"
            >
              <span class="text-[16px] inline-flex items-center">
                <UIcon name="i-heroicons-user" />
              </span>
              <span>홍길동</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>
