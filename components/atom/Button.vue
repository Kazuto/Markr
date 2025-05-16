<template>
  <button
    class="flex w-full cursor-pointer items-center justify-center gap-2 rounded-lg bg-gray-200 px-3 py-3 text-gray-700 outline-transparent transition hover:bg-gray-300 focus:outline-2 focus:outline-offset-3 focus:outline-gray-500 active:bg-gray-500"
    :class="{
      'aspect-square max-w-10 px-2 py-2 text-sm': icon,
      'bg-red-300 hover:bg-red-400': destructive && !icon,
      'text-red-700': destructive && icon,
    }"
    v-bind="$attrs"
    @click="$emit('click')"
  >
    <slot />
  </button>
</template>

<script setup lang="ts">
defineProps<{
  icon?: boolean;
  destructive?: boolean;
}>();

defineEmits<{
  (e: "click"): void;
}>();
</script>
