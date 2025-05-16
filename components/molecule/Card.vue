<template>
  <div class="flex w-full flex-col rounded-2xl bg-gray-50 p-8 shadow-xl">
    <h2 v-if="title" class="mb-6 text-3xl font-bold text-neutral-800">
      {{ title }}
    </h2>

    <div class="text-neutral-300 dark:text-neutral-950">
      <slot />
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  title?: string;
}>();
</script>

<style lang="scss" scoped></style>
