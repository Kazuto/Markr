<template>
  <div v-if="authenticated" class="absolute right-0 bottom-0 z-50 bg-black/10">
    <span
      class="inline-block cursor-pointer p-4 hover:bg-black/20"
      @click="signOut"
    >
      Sign out
    </span>
  </div>
</template>

<script setup>
const { signOut, authenticated } = useAuth();
</script>
