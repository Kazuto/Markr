<template>
  <div class="flex h-full items-center justify-center">
    <button @click="signIn('github')">Sign in with GitHub</button>
  </div>
</template>

<script setup lang="ts">
const { signIn } = useAuth();
</script>
