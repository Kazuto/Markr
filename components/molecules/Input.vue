<template>
  <div>
    <atoms-label :for="id">
      {{ name }}
    </atoms-label>
    <atoms-input
      class="mt-1 w-full rounded-md border border-gray-300 bg-gray-50 px-3 py-3 text-sm focus:outline-2 focus:outline-offset-3 focus:outline-gray-500"
      v-bind="$attrs"
      v-model="model"
      :id
    />
  </div>
</template>

<script setup lang="ts">
const model = defineModel();

defineProps<{
  id: string;
  name: string;
}>();

defineOptions({
  inheritAttrs: false,
});
</script>

<style scoped></style>
