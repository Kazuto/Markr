<template>
  <component :is :class="variants({ ...props, class: $attrs.class as string })">
    <slot />
  </component>
</template>

<script setup lang="ts">
import { tv } from "tailwind-variants";
import type { Sizes } from "~/lib/ui";

const props = defineProps<
  {
    is?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "p" | "span";
  } & Sizes
>();

const variants = tv({
  base: "text-gray-700 dark:text-gray-300",
  variants: {
    small: {
      true: "text-md",
    },
    medium: {
      true: "text-xl tracking-tight",
    },
    large: {
      true: "text-4xl font-medium tracking-tighter",
    },
  },
  defaultVariants: {
    medium: true,
  },
});
</script>
