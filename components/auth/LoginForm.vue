<template>
  <div class="flex h-full items-center justify-center">
    <button
      v-for="provider in providers"
      :key="provider?.id"
      @click="signIn(provider?.id)"
    >
      Sign in with {{ provider?.name }}
    </button>
  </div>
</template>

<script setup lang="ts">
const { signIn, getProviders } = useAuth();
const providers = await getProviders();
</script>
