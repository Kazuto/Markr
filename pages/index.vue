<template>
  <atoms-typography is="h1" v-if="data" size="large" class="mt-4 mb-12">
    Hello {{ data.username }}!
  </atoms-typography>

  <categories />
</template>

<script setup lang="ts">
const { data } = useAuth();
</script>
