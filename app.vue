<script setup lang="ts">
import { ref } from 'vue';

const usernameList = ref<string[]>([]);

function submitHandler(e: Event, list: string[]): void {
  e.preventDefault();

  if (e instanceof SubmitEvent) {
    const { target } = e;

    if (target instanceof HTMLFormElement) {
      const element = target.username as HTMLInputElement;

      list.push(element.value);
      element.value = '';
    }
  }
}
</script>

<template>
  <UContainer>
    <div class="flex space-x-4">
      <div class="border-2 border-gray-500 p-4 rounded-xl space-y-4">
        <form @submit="(e) => submitHandler(e, usernameList)">
          <UFormGroup label="이름">
            <UInput
              name="username"
              placeholder="홍길동"
              icon="i-heroicons-user"
            />
          </UFormGroup>
        </form>
        <div v-if="usernameList.length">
          <ul class="space-y-1">
            <li
              v-for="(username, index) in usernameList"
              class="relative border-0 rounded-md text-sm px-2.5 py-1.5 shadow-sm bg-white dark:bg-gray-900 text-gray-900 dark:text-white ring-1 ring-inset ring-gray-300 dark:ring-gray-700 flex justify-between items-center"
            >
              <span>{{ username }}</span>
              <UButton
                square
                size="2xs"
                icon="i-heroicons-x-mark"
                @click="usernameList.splice(index, 1)"
              />
            </li>
          </ul>
        </div>
      </div>
    </div>
  </UContainer>
</template>
