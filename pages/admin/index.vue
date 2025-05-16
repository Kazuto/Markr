<template>
  <div class="grid grid-cols-[minmax(auto,300px)_1fr] justify-center gap-4">
    <m-tab-list v-model="activeTab" :tabs="tabs" />
  </div>
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
