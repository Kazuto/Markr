import tailwindcss from "@tailwindcss/vite";

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  app: {
    head: {
      title: "Markr",
    },
  },

  compatibilityDate: "2025-05-09",

  components: {
    dirs: ["~/components", "~/container"],
  },

  css: ["~/assets/app.css"],

  devServer: { port: Number(process.env.PORT) || 3000 },
  devtools: { enabled: true },

  modules: ["@nuxt/eslint", "nuxt-feather-icons"],

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

