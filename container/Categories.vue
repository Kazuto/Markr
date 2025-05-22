<template>
  <div class="grid grid-cols-[repeat(auto-fill,minmax(450px,1fr))] gap-4">
    <template v-for="category in categories" :key="category.id">
      <div v-if="hasBookmarks(category)">
        <a-typography is="h3" class="mb-3 dark:text-white">
          {{ category.name }}
        </a-typography>

        <ol class="rounded-md bg-gray-100 px-2 py-2 shadow-xs dark:bg-white/5">
          <li
            v-for="bookmark in bookmarks(category)"
            :key="bookmark.id"
            class="rounded-sm px-2 py-1 transition-colors hover:bg-white/25 dark:hover:bg-white/5"
          >
            <a-link :href="bookmark.url" target="_blank" class="block">
              {{ bookmark.name }}
            </a-link>
          </li>
        </ol>
      </div>
    </template>
  </div>
</template>

<script setup lang="ts">
import type { RecordModel } from "pocketbase";

const { data: user } = useAuth();

const pb = usePocketBase();

const { data: teams } = pb.teams.list({
  fields: "id, categories",
  filter: user.value.teams
    .map((id: string) => pb.client.filter("id = {:id}", { id }))
    .join("||"),
});

const { data: categoryList } = pb.categories.all({
  sort: "order",
  expand: "bookmarks_via_categories",
});

const categories = computed(() => {
  const ids = teams.value?.items.flatMap(
    (team: RecordModel) => team.categories,
  );

  return categoryList.value?.filter((cat: RecordModel) => {
    return ids?.includes(cat.id);
  });
});

const bookmarks = computed(() => {
  return (category: RecordModel) => {
    return category.expand?.bookmarks_via_categories.sort(
      (a: RecordModel, b: RecordModel) => {
        return a.order - b.order;
      },
    );
  };
});

const hasBookmarks = computed(() => {
  return (category: RecordModel) => {
    return category.expand?.bookmarks_via_categories.length > 0;
  };
});
</script>
