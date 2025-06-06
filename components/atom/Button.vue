<template>
  <button
    :class="
      variants({
        ...props,
        class: $attrs.class as string,
      })
    "
    @click="$emit('click')"
  >
    <slot />
  </button>
</template>

<script setup lang="ts">
import { tv } from "tailwind-variants";
import type { Sizes } from "~/lib/ui";

const props = defineProps<
  {
    icon?: boolean;
    destructive?: boolean;
    block?: boolean;
  } & Sizes
>();

defineEmits<{
  (e: "click"): void;
}>();

const variants = tv({
  base: "flex cursor-pointer items-center justify-center gap-2 rounded-lg bg-gray-200 px-3 py-2.5 text-gray-700 outline-transparent transition hover:bg-gray-300 focus:outline-2 focus:outline-offset-3 focus:outline-gray-500 active:bg-gray-500",
  variants: {
    icon: {
      true: "aspect-square p-3.5",
    },
    block: {
      true: "w-full",
    },
    destructive: {
      true: "text-red-700",
    },
    small: {
      true: "text-sm",
    },
    medium: {
      true: "text-base",
    },
  },
  defaultVariants: {
    medium: true,
  },
  compoundVariants: [
    {
      icon: true,
      small: true,
      class: "h-9 p-2.5",
    },
    {
      icon: true,
      medium: true,
      class: "h-11",
    },
  ],
});
</script>
