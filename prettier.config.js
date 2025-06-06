/** @type {import('prettier').Config & import('prettier-plugin-tailwindcss').PluginOptions} */
const config = {
  tabWidth: 2,
  plugins: ["prettier-plugin-tailwindcss"],
  tailwindStylesheet: "./assets/app.css",
  tailwindFunctions: ["tv"],
};

export default config;
