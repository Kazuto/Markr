/** @type {import('tailwindcss').Config} */
import defaultTheme from "tailwindcss/defaultTheme";
import config from './theme.config.json';

export default {
  content: ["./app.vue"],
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Quicksand"', ...defaultTheme.fontFamily.sans],
      },
      colors: config.colors,
    },
  },
  plugins: [],
};
