import tailwindcss from "@tailwindcss/vite";

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2025-05-09",

  css: ["~/assets/app.css"],

  devServer: { port: 4444 },
  devtools: { enabled: true },

  modules: ["@nuxt/eslint"],

  nitro: {
    compressPublicAssets: true,
  },

  runtimeConfig: {
    databaseUrl: process.env.DATABASE_URL ?? "",
  },

  sourcemap: {
    client: true,
    server: true,
  },

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
});
