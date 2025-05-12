<template>
  <div v-if="data">Hello {{ data.user?.name }}!</div>
</template>

<script setup lang="ts">
const { data } = useAuth();
</script>
