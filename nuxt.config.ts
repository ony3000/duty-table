// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  typescript: { shim: false },
  modules: ['@nuxthq/ui', '@pinia/nuxt'],
  plugins: [{ src: '~/plugins/vercel.ts', mode: 'client' }],
});
