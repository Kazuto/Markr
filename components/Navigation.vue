<template>
  <div
    v-if="authenticated"
    class="absolute right-0 bottom-0 z-50 overflow-hidden rounded-tl-lg bg-black/10"
  >
    <a
      v-for="(item, index) in menuItems"
      :key="index"
      class="inline-flex aspect-square w-16 cursor-pointer items-center justify-center hover:bg-black/20"
      @click.prevent="item.onClick"
    >
      <component :is="item.icon" />
    </a>
  </div>
</template>

<script setup>
const { signOut, authenticated } = useAuth();

const menuItems = ref([
  {
    icon: resolveComponent("HomeIcon"),
    onClick: () => {
      navigateTo("/");
    },
  },
  {
    icon: resolveComponent("ShieldIcon"),
    onClick: () => {
      navigateTo("/admin");
    },
  },
  {
    icon: resolveComponent("LogOutIcon"),
    onClick: signOut,
  },
]);
</script>
