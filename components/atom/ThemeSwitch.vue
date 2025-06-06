<template>
  <ClientOnly>
    <a-button
      v-bind="$attrs"
      icon
      small
      :aria-label="`Switch to ${getNextTheme} mode`"
      @click="setTheme()"
      class="bg-transparent hover:bg-gray-300 dark:text-gray-300 dark:hover:bg-gray-900"
    >
      <fa :icon="{ prefix: 'fas', iconName: icon }" />
    </a-button>
  </ClientOnly>
</template>

<script setup lang="ts">
const colorMode = useColorMode();

const icon = computed(() => {
  switch (colorMode.preference) {
    case "system":
      return "desktop";
    case "light":
      return "sun";
    case "dark":
      return "moon";
  }
});

const themeOrder = ["system", "light", "dark"];

const getNextTheme = computed(
  (): string =>
    themeOrder[themeOrder.indexOf(colorMode.preference) + 1] ?? themeOrder[0],
);

const setTheme = () => {
  colorMode.preference = getNextTheme.value;
};
</script>
