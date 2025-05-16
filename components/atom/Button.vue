<template>
  <button
    class="flex w-full cursor-pointer items-center justify-center gap-2 rounded-lg bg-gray-300 px-2 py-3 text-gray-700 outline-transparent transition hover:bg-gray-400 focus:outline-2 focus:outline-offset-3 focus:outline-gray-500 active:bg-gray-500"
    v-bind="$attrs"
    @click="$emit('click')"
  >
    <slot />
  </button>
</template>

<script setup lang="ts">
defineEmits<{
  (e: "click"): void;
}>();
</script>
