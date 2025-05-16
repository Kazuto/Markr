<template>
  <div>
    <a-label :for="id">
      {{ name }}
    </a-label>
    <a-input
      v-bind="$attrs"
      :id
      v-model="model"
      class="mt-1 w-full rounded-md border border-gray-300 bg-gray-50 px-3 py-3 text-sm focus:outline-2 focus:outline-offset-3 focus:outline-gray-500"
    />
  </div>
</template>

<script setup lang="ts">
const model = defineModel<string | number | undefined>();

defineProps<{
  id: string;
  name: string;
}>();

defineOptions({
  inheritAttrs: false,
});
</script>
