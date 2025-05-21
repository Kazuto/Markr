<template>
  <m-card :title="activeTab" class="h-full">
    <m-tab-list v-model="activeTab" :tabs />
  </m-card>
</template>

<script setup lang="ts">
import Categories from "~/components/admin/CategoryPane.vue";
import Bookmarks from "~/components/admin/BookmarkPane.vue";
import Teams from "~/components/admin/TeamPane.vue";

const tabs = {
  Categories,
  Bookmarks,
  Teams,
};

const activeTab: Ref<keyof typeof tabs> = ref("Categories");
</script>
