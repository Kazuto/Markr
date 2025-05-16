<template>
  <a-typography is="h1" v-if="data" size="large" class="mt-4 mb-12">
    Hello {{ data.name || data.username }}!
  </a-typography>

  <c-categories />
</template>

<script setup lang="ts">
const { data } = useAuth();
</script>
