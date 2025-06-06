<template>
  <input
    v-model="model"
    :tabindex="disabled ? -1 : 0"
    :class="variants({ disabled, class: $attrs.class as string })"
    :disabled
  />
</template>

<script setup lang="ts">
import { tv } from "tailwind-variants";

const model = defineModel<string | number | undefined>();

defineProps<{
  disabled?: boolean;
}>();

const variants = tv({
  base: "w-full rounded-md border border-gray-300 bg-gray-50 px-3 py-3 text-sm text-gray-700 focus:outline-2 focus:outline-offset-3 focus:outline-gray-500",
  variants: {
    disabled: {
      true: "cursor-not-allowed bg-gray-100 opacity-50",
    },
  },
});
</script>
