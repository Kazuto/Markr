<template>
  <label :class="variants({ disabled, class: $attrs.class as string })">
    <slot />
  </label>
</template>

<script setup lang="ts">
import { tv } from "tailwind-variants";

defineProps<{
  disabled?: boolean;
}>();

const variants = tv({
  base: "block cursor-pointer text-sm font-medium text-gray-700 capitalize",
  variants: {
    disabled: {
      true: "pointer-events-none cursor-not-allowed",
    },
  },
});
</script>
