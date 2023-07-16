<script setup lang="ts">
import DoctorLineup from './DoctorLineup.vue';
import WeeklySchedule from './WeeklySchedule.vue';

const { calculateTimetable } = useTimetableService();
</script>

<template>
  <div class="mx-auto px-4 sm:px-6 lg:px-8 w-[1280px]">
    <div class="space-y-8 py-8">
      <div class="text-right">
        <UButton
          icon="i-heroicons-calendar-days"
          label="시간표 계산"
          @click="calculateTimetable"
        />
      </div>
      <div class="flex space-x-4">
        <DoctorLineup />
        <WeeklySchedule />
      </div>
    </div>
  </div>
</template>
