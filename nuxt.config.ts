import tailwindcss from "@tailwindcss/vite";

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  app: {
    head: {
      title: "Markr",
    },
  },

  compatibilityDate: "2025-05-09",

  components: [
    "~/components",
    { path: "~/components/atom", prefix: "a" },
    { path: "~/components/molecule", prefix: "m" },
    { path: "~/container", prefix: "c" },
  ],

  css: ["~/assets/app.css", "@fortawesome/fontawesome-svg-core/styles.css"],

  devServer: { port: Number(process.env.PORT) || 3000 },
  devtools: { enabled: true },

  modules: ["@nuxt/eslint"],

  nitro: {
    compressPublicAssets: true,
  },

  runtimeConfig: {
    public: {
      pocketbaseUrl: process.env.POCKETBASE_URL ?? "",
    },
  },

  sourcemap: {
    client: true,
    server: true,
  },

  ssr: false,

  typescript: {
    typeCheck: true,
    strict: true,
    tsConfig: { include: ["../.eslint.config.*"] },
  },

  vite: {
    build: {
      minify: true,
    },
    plugins: [tailwindcss()],
  },
});
