<template>
  <input
    class="mt-1 w-full rounded-md border border-gray-300 bg-gray-50 px-3 py-3 text-sm focus:outline-2 focus:outline-offset-3 focus:outline-gray-500"
    v-model="model"
  />
</template>

<script setup lang="ts">
const model = defineModel();
</script>
