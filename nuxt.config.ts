import tailwindcss from "@tailwindcss/vite";

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  css: ["~/assets/app.css"],

  devServer: { port: 4444 },
  devtools: { enabled: true },

  modules: ["@nuxt/eslint"],

  ssr: false,

  typescript: {
    typeCheck: true,
    strict: true,
    tsConfig: { include: ["../.eslintrc.*"] },
  },

  vite: {
    build: {
      minify: true,
    },
    plugins: [tailwindcss()],
  },

  nitro: {
    compressPublicAssets: true,
  },

  sourcemap: {
    client: true,
    server: true,
  },

  compatibilityDate: "2025-05-09",
});
