<template>
  <component :is :class="variants({ size, class: $attrs.class as string })">
    <slot />
  </component>
</template>

<script setup lang="ts">
import { tv } from "tailwind-variants";

withDefaults(
  defineProps<{
    is?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "p" | "span";
    size?: "small" | "medium" | "large";
  }>(),
  {
    is: "h1",
    size: "medium",
  },
);

const variants = tv({
  base: "text-gray-700  dark:text-gray-300",
  variants: {
    size: {
      small: "text-md",
      medium: "text-xl tracking-tight",
      large: "text-4xl font-medium tracking-tighter",
    },
  },
});
</script>
