<template>
  <div
    v-if="authenticated"
    class="absolute right-0 bottom-0 z-50 overflow-hidden rounded-tl-lg bg-black/10"
  >
    <a
      v-for="(item, index) in menuItems"
      :key="index"
      class="inline-flex aspect-square w-16 cursor-pointer items-center justify-center hover:bg-black/20"
      :class="{ '!hidden': item.hidden }"
      @click.prevent="item.onClick"
    >
      <fa :icon="item.icon" />
    </a>
  </div>
</template>

<script setup>
const { signOut, authenticated, isAdmin } = useAuth();

const menuItems = ref([
  {
    icon: "fas fa-home",
    onClick: () => {
      navigateTo("/");
    },
    hidden: false,
  },
  {
    icon: "fas fa-user",
    onClick: () => {
      navigateTo("/profile");
    },
    hidden: isAdmin,
  },
  {
    icon: "fas fa-shield",
    onClick: () => {
      navigateTo("/admin");
    },
    hidden: false,
  },
  {
    icon: "fas fa-sign-out-alt",
    onClick: signOut,
    hidden: false,
  },
]);
</script>
