<template>
  <div class="inline-flex items-center gap-2">
    <input
      :id
      type="checkbox"
      class="sr-only"
      :checked="model"
      :disabled="disabled"
      :tabindex="disabled ? -1 : 0"
      :name
    />

    <div
      :tabindex="disabled ? -1 : 0"
      :aria-labelledby="`toggle-label-${name}`"
      class="flex h-5 w-8 items-center rounded-full p-1 transition-colors duration-300 focus:outline-2 focus:outline-offset-3 focus:outline-gray-500"
      :class="{
        'bg-blue-600': model,
        'bg-gray-300': !model,
        'cursor-not-allowed opacity-50 focus:outline-none': disabled,
      }"
      @click="toggle"
      @keydown.enter="toggle"
      @keydown.space="toggle"
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
      :for="id"
      class="select-none"
      :aria-label="`toggle-label-${name}`"
      :disabled
      @click="toggle"
    >
      <slot />
    </a-label>
  </div>
</template>

<script setup lang="ts">
const model = defineModel<boolean>();

const props = defineProps<{
  id: string;
  name: string;
  disabled?: boolean;
}>();

function toggle() {
  if (props.disabled) return;

  model.value = !model.value;
}
</script>
