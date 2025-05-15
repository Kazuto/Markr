<template>
  <div class="grid grid-cols-[repeat(auto-fill,minmax(450px,1fr))] gap-4">
    <template v-for="category in categories?.items" :key="category.id">
      <div v-if="hasBookmarks(category)">
        <atoms-typography is="h3" class="mb-3">
          {{ category.name }}
        </atoms-typography>

        <ol class="rounded-md bg-black/5 px-3 py-2 dark:bg-white/5">
          <li v-for="bookmark in category.expand?.bookmarks_via_categories">
            <atoms-link :href="bookmark.url" target="_blank">
              {{ bookmark.name }}
            </atoms-link>
          </li>
        </ol>
      </div>
    </template>
  </div>
</template>

<script setup lang="ts">
const pb = usePocketBase();

const { data: categories } = pb.categories.list({
  sort: "order",
  expand: "bookmarks_via_categories",
});

const hasBookmarks = (category: any) => {
  return category.expand?.bookmarks_via_categories?.length > 0;
};
</script>
