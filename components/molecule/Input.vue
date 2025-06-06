<template>
  <div>
    <a-label :for="id" :aria-label="`input-label-${name}`" :disabled>
      {{ name }}
    </a-label>
    <div class="relative">
      <a-input
        v-bind="$attrs"
        :id
        v-model="model"
        :disabled
        class="mt-1"
        :aria-labelledby="`input-label-${name}`"
      />

      <div
        v-if="$slots.append"
        class="absolute top-4 right-4 flex items-center text-gray-500"
      >
        <slot name="append" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const model = defineModel<string | number | undefined>();

defineProps<{
  id: string;
  name: string;
  disabled?: boolean;
}>();

defineOptions({
  inheritAttrs: false,
});
</script>
