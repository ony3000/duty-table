<script setup lang="ts">
import DoctorLineup from './DoctorLineup.vue';
import WeeklySchedule from './WeeklySchedule.vue';

const { isLoading, setIsLoading } = useAppService();
const { calculateTimetable } = useTimetableService();

const isModalOpen = ref(false);

async function clickHandler(): Promise<void> {
  setIsLoading(true);
  await nextTick();

  try {
    await calculateTimetable();
  } catch (_) {
    isModalOpen.value = true;
  }
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
    <UModal
      v-model="isModalOpen"
      :ui="{
        container: 'flex min-h-full items-center justify-center text-center',
        padding: 'p-4',
        base: 'relative text-left rtl:text-right overflow-hidden my-8 w-full flex flex-col',
        transition: {
          enter: 'ease-out duration-300',
          enterFrom: 'opacity-0 scale-95',
          enterTo: 'opacity-100 scale-100',
          leave: 'ease-in duration-200',
          leaveFrom: 'opacity-100 scale-100',
          leaveTo: 'opacity-0 scale-95',
        },
      }"
    >
      <div class="p-4 space-x-1 flex items-center">
        <span class="text-[24px] inline-flex">
          <UIcon name="i-heroicons-exclamation-triangle" />
        </span>
        <span>담당자를 배정하지 못한 자리가 존재합니다!</span>
      </div>
    </UModal>
  </div>
</template>
