<template>
  <m-card :title class="h-full">
    <m-tab-list v-model="activeTab" :tabs />
  </m-card>
</template>

<script setup lang="ts">
import Categories from "~/components/admin/CategoryPane.vue";
import Bookmarks from "~/components/admin/BookmarkPane.vue";
import Teams from "~/components/admin/TeamPane.vue";
import Users from "~/components/admin/UserPane.vue";
import type { Tabs } from "~/components/molecule/TabList.vue";
import { capitalize } from "~/shared/utils";

const tabs = {
  categories: Categories,
  bookmarks: Bookmarks,
  teams: Teams,
  users: Users,
};

const activeTab: Ref<keyof typeof tabs> = ref("categories");

const title = computed(() => {
  if (!activeTab.value) return;

  return capitalize(activeTab.value) as keyof Tabs;
});
</script>
