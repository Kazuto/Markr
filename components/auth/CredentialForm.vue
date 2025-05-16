<template>
  <form
    class="space-y-2"
    @submit.prevent="credentialSignIn(username, password)"
  >
    <a-input
      id="email"
      v-model="username"
      placeholder="name@example.com"
      type="email"
      name="email"
    />
    <a-input
      id="password"
      v-model="password"
      placeholder="*****"
      type="password"
      name="password"
    />
    <a-button type="submit" class="mt-4">Sign in</a-button>
  </form>
</template>

<script setup lang="ts">
const { credentialSignIn } = useAuth();

const username = ref("");
const password = ref("");
</script>
