// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: false },
  components: [
    { path: "~/components/NormalTree", prefix: "NT" },
    { path: "~/components/TimelineTree", prefix: "TT" },
    "~/components",
  ],
  modules: ["@nuxt/content", "@nuxtjs/tailwindcss", "@nuxt/image"],
});