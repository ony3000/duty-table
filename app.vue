<script setup lang="ts">
useHead({
  htmlAttrs: {
    lang: 'ko',
  },
  title: '당직 시간표',
});
</script>

<template>
  <ClientOnly>
    <AppMain />
  </ClientOnly>
</template>
