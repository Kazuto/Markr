<template>
  <label class="inline-flex cursor-pointer items-center gap-2">
    <input
      type="checkbox"
      class="sr-only"
      :checked="model"
      :disabled="disabled"
    />
    <div
      class="flex h-5 w-8 items-center rounded-full p-1 transition-colors duration-300"
      :class="{
        'bg-blue-600': model,
        'bg-gray-300': !model,
        'cursor-not-allowed opacity-50': disabled,
      }"
      @click="model = !model"
    >
      <div
        class="h-3 w-3 transform rounded-full bg-white shadow-md transition-transform duration-300"
        :class="{
          'translate-x-3': model,
          'translate-x-0': !model,
        }"
      />
    </div>

    <span class="block text-sm font-medium text-gray-700 capitalize">
      <slot />
    </span>
  </label>
</template>

<script setup lang="ts">
const model = defineModel<boolean>();

defineProps<{
  disabled?: boolean;
}>();
</script>

<style scoped>
/* No additional styles needed */
</style>
