<template>
  <form
    class="space-y-2"
    @submit.prevent="credentialSignIn(username, password)"
  >
    <a-input
      id="email"
      placeholder="name@example.com"
      type="email"
      name="email"
      v-model="username"
    />
    <a-input
      id="password"
      placeholder="*****"
      type="password"
      name="password"
      v-model="password"
    />
    <a-button type="submit" class="mt-4">Sign in</a-button>
  </form>
</template>

<script setup lang="ts">
const { credentialSignIn } = useAuth();

const username = ref("");
const password = ref("");
</script>
