<template>
  <form
    class="space-y-2"
    @submit.prevent="credentialSignIn(username, password)"
  >
    <m-input
      id="email"
      v-model="username"
      placeholder="name@example.com"
      type="email"
      name="email"
    />
    <m-input
      id="password"
      v-model="password"
      placeholder="*****"
      type="password"
      name="password"
    />
    <a-button type="submit" class="mt-4" block>Sign in</a-button>
  </form>
</template>

<script setup lang="ts">
const { credentialSignIn } = useAuth();

const username = ref("");
const password = ref("");
</script>
