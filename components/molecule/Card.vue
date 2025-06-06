<template>
  <div class="flex w-full flex-col rounded-2xl bg-gray-50 p-8 shadow-xl">
    <a-typography
      is="h2"
      large
      v-if="title"
      class="mb-6 font-semibold dark:text-gray-700"
    >
      {{ title }}
    </a-typography>

    <slot />
  </div>
</template>

<script setup lang="ts">
defineProps<{
  title?: string;
}>();

defineOptions({
  inheritAttrs: false,
});
</script>

<style lang="scss" scoped></style>
