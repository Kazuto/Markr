import tailwindcss from "@tailwindcss/vite";

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  auth: {
    provider: {
      type: "authjs",
      trustHost: false,
      defaultProvider: "github",
      addDefaultCallbackUrl: true,
    },
    sessionRefresh: {
      enablePeriodically: true,
      enableOnWindowFocus: true,
    },
  },

  compatibilityDate: "2025-05-09",

  css: ["~/assets/app.css"],

  devServer: { port: Number(process.env.PORT) || 3000 },
  devtools: { enabled: true },

  modules: ["@nuxt/eslint", "@sidebase/nuxt-auth"],

  nitro: {
    compressPublicAssets: true,
  },

  runtimeConfig: {
    authSecret: process.env.AUTH_SECRET ?? "",
    githubClientId: process.env.GITHUB_CLIENT_ID ?? "",
    githubClientSecret: process.env.GITHUB_CLIENT_SECRET ?? "",
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