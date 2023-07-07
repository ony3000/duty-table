<script setup lang="ts">
const { doctorList, insertDoctor, removeDoctor } = useDoctorService();

function submitHandler(e: Event): void {
  e.preventDefault();

  if (e instanceof SubmitEvent) {
    const { target } = e;

    if (target instanceof HTMLFormElement) {
      const element = target.username as HTMLInputElement;

      insertDoctor({ name: element.value });
      element.value = '';
    }
  }
}
</script>

<template>
  <div class="border-2 border-gray-500 p-4 rounded-xl space-y-4 w-60">
    <form @submit="submitHandler">
      <UFormGroup label="이름">
        <UInput
          name="username"
          placeholder="홍길동"
          icon="i-heroicons-user"
        />
      </UFormGroup>
    </form>
    <div v-if="doctorList.length">
      <ul class="space-y-1">
        <li
          v-for="doctor in doctorList"
          class="relative border-0 rounded-md text-sm px-2.5 py-1.5 shadow-sm bg-white dark:bg-gray-900 text-gray-900 dark:text-white ring-1 ring-inset ring-gray-300 dark:ring-gray-700 flex justify-between items-center"
        >
          <span>{{ doctor.name }}</span>
          <UButton
            square
            size="2xs"
            icon="i-heroicons-x-mark"
            @click="removeDoctor(doctor)"
          />
        </li>
      </ul>
    </div>
  </div>
</template>
