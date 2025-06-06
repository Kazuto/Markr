<template>
  <label :class="variants({ class: $attrs.class as string })">
    <slot />
  </label>
</template>

<script setup lang="ts">
import { tv } from "tailwind-variants";

const variants = tv({
  base: "block text-sm font-medium text-gray-700 capitalize",
});
</script>
