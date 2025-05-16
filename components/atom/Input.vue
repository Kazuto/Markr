<template>
  <input
    v-model="model"
    class="mt-1 w-full rounded-md border border-gray-300 bg-gray-50 px-3 py-3 text-sm text-gray-700 focus:outline-2 focus:outline-offset-3 focus:outline-gray-500"
  />
</template>

<script setup lang="ts">
const model = defineModel<string | number | undefined>();
</script>
