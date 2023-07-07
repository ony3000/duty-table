<script setup lang="ts">
const dayOfTheWeekList = '일월화수목금토'.split('');
</script>

<template>
  <div class="flex-1 space-y-4">
    <div
      v-for="row in 2"
      class="flex justify-between"
    >
      <div v-for="column in 7">
        <!-- daily card -->
        <div class="w-32 border border-gray-500 rounded-xl overflow-hidden">
          <div
            :class="`px-4 py-1 text-center ${[
              column < 5 ? 'bg-gray-300' : '',
              column === 5 ? 'bg-orange-300' : '',
              column > 5 ? 'bg-red-300' : '',
            ].join(' ')}`"
          >
            {{ dayOfTheWeekList[column % 7] }}
          </div>
          <hr />
          <div class="py-1 space-y-2">
            <div class="flex justify-center items-center space-x-4">
              <span>공휴일</span>
              <UToggle />
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
              v-for="item in column % 7 === 1 ? 1 : 2"
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
