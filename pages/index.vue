<template>
  <div v-if="data">Hello {{ data.username }}!</div>
</template>

<script setup lang="ts">
const { data } = useAuth();
</script>
