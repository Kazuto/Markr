// @ts-check
import withNuxt from "./.nuxt/eslint.config.mjs";

export default withNuxt(
  {
    ignores: ["pb_migrations/**"],
  },
  {
    files: ["**/*.vue"],
    rules: {
      "vue/multi-word-component-names": "off",
      "vue/no-multiple-template-root": "off",
    },
  },
);
// Your custom configs here
