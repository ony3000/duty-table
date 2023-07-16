<script setup lang="ts">
import DoctorLineup from './DoctorLineup.vue';
import WeeklySchedule from './WeeklySchedule.vue';

const { isLoading, setIsLoading } = useAppService();
const { calculateTimetable } = useTimetableService();

async function clickHandler(): Promise<void> {
  setIsLoading(true);
  await nextTick();

  await calculateTimetable();
  await nextTick();

  setIsLoading(false);
}
</script>

<template>
  <div class="mx-auto px-4 sm:px-6 lg:px-8 w-[1280px]">
    <div class="space-y-8 py-8">
      <div class="text-right">
        <UButton
          icon="i-heroicons-calendar-days"
          label="시간표 계산"
          :loading="isLoading"
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
