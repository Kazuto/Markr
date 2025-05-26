<template>
  <div
    v-if="authenticated"
    class="absolute right-0 bottom-0 z-50 overflow-hidden rounded-tl-lg bg-black/10"
  >
    <nuxt-link
      v-for="(item, index) in menuItems"
      :key="index"
      class="inline-flex aspect-square w-16 cursor-pointer items-center justify-center hover:bg-black/20"
      :class="{ '!hidden': item.hidden }"
      :to="item.to"
    >
      <fa :icon="item.icon" />
    </nuxt-link>

    <a
      class="inline-flex aspect-square w-16 cursor-pointer items-center justify-center hover:bg-black/20"
      @click.prevent="signOut"
    >
      <fa icon="fas fa-sign-out-alt" />
    </a>
  </div>
</template>

<script setup>
const { signOut, authenticated, isAdmin } = useAuth();

const menuItems = ref([
  {
    icon: "fas fa-home",
    to: "/",
    hidden: false,
  },
  {
    icon: "fas fa-user",
    to: "/profile",
    hidden: false,
  },
  {
    icon: "fas fa-shield",
    to: "/admin",
    hidden: !isAdmin.value,
  },
]);
</script>
