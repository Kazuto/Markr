<template>
  <label class="inline-flex cursor-pointer items-center gap-2">
    <input
      type="checkbox"
      class="sr-only"
      :checked="model"
      :disabled="disabled"
      tabindex="-1"
      :name
    />
    <div
      class="flex h-5 w-8 items-center rounded-full p-1 transition-colors duration-300 focus:outline-2 focus:outline-offset-3 focus:outline-gray-500"
      tabindex="0"
      :class="{
        'bg-blue-600': model,
        'bg-gray-300': !model,
        'cursor-not-allowed opacity-50': disabled,
      }"
      @click="model = !model"
      @keydown.enter="model = !model"
      @keydown.space="model = !model"
    >
      <div
        class="h-3 w-3 transform rounded-full bg-white shadow-md transition-transform duration-300"
        :class="{
          'translate-x-3': model,
          'translate-x-0': !model,
        }"
      />
    </div>

    <a-label
      :for="name"
      class="cursor-pointer select-none"
      @click="model = !model"
    >
      <slot />
    </a-label>
  </label>
</template>

<script setup lang="ts">
const model = defineModel<boolean>();

defineProps<{
  disabled?: boolean;
}>();

const name = computed(() => {
  return `toggle-${useId()}`;
});
</script>
