<script setup lang="ts">
useHead({
  htmlAttrs: {
    lang: 'ko',
  },
  title: '당직 시간표',
  link: [
    {
      rel: 'preconnect',
      href: 'https://cdn.jsdelivr.net',
    },
    {
      rel: 'stylesheet',
      href: 'https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.8/dist/web/static/pretendard.css',
      crossorigin: '',
    },
  ],
});
</script>

<template>
  <ClientOnly>
    <AppMain />
  </ClientOnly>
</template>

<style>
body {
  font-family: Pretendard, -apple-system, BlinkMacSystemFont, system-ui, Roboto,
    'Helvetica Neue', 'Segoe UI', 'Apple SD Gothic Neo', 'Noto Sans KR',
    'Malgun Gothic', 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol',
    sans-serif;
}
</style>
