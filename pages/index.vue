<template>
  <div class="mt-4 mb-12 flex items-center justify-between">
    <a-typography is="h1" v-if="data" large class="dark:text-white">
      Hello {{ data.name || data.username }}!
    </a-typography>

    <a-theme-switch />
  </div>

  <c-categories />
</template>

<script setup lang="ts">
const { data } = useAuth();
</script>
