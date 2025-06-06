<template>
  <div class="grid grid-cols-[repeat(auto-fill,minmax(450px,1fr))] gap-4">
    <template v-for="category in categories" :key="category.id">
      <div v-if="hasBookmarks(category as ExpandedCategoriesResponse)">
        <a-typography is="h3" class="mb-3">
          <fa v-if="category.icon" :icon="category.icon" class="mr-1" />

          {{ category.name }}
        </a-typography>

        <ol class="space-y-2">
          <li
            v-for="bookmark in bookmarks(
              category as ExpandedCategoriesResponse,
            )"
            :key="bookmark.id"
          >
            <a-link
              :href="bookmark.url"
              target="_blank"
              class="block truncate rounded-sm bg-gray-100 px-4 py-3 shadow-xs transition-colors outline-none hover:bg-gray-50 focus:bg-gray-50 focus:ring-2 focus:ring-gray-50 focus:ring-offset-3 focus:ring-offset-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 dark:focus:bg-gray-600 dark:focus:ring-gray-600 dark:focus:ring-offset-gray-800"
            >
              <fa v-if="bookmark.icon" :icon="bookmark.icon" class="mr-1" />

              {{ bookmark.name }}
            </a-link>
          </li>
        </ol>
      </div>
    </template>
  </div>
</template>

<script setup lang="ts">
import type {
  BookmarksResponse,
  CategoriesResponse,
  TeamsRecord,
} from "~/lib/pocketbase";

const { data: user } = useAuth();

const pb = usePocketBase();

const { data: teams } = pb.teams.list({
  fields: "id, categories",
  filter: user.value.teams
    .map((id: string) => pb.client.filter("id = {:id}", { id }))
    .join("||"),
});

const { data: categoryResponse } = pb.categories.all({
  sort: "order",
  expand: "bookmarks_via_categories",
});

type ExpandedCategoriesResponse = CategoriesResponse<{
  bookmarks_via_categories: BookmarksResponse[];
}>;

const categories = computed(() => {
  const ids = teams.value?.items.flatMap(
    (team: TeamsRecord) => team.categories,
  );

  return categoryResponse.value?.filter((cat: CategoriesResponse) => {
    return ids?.includes(cat.id);
  });
});

const bookmarks = computed(() => {
  return (category: ExpandedCategoriesResponse) => {
    return category.expand?.bookmarks_via_categories.sort(
      (a: BookmarksResponse, b: BookmarksResponse) => {
        return a.order - b.order;
      },
    );
  };
});

function hasBookmarks(category: ExpandedCategoriesResponse) {
  return category.expand?.bookmarks_via_categories.length > 0;
}

onMounted(() => {
  pb.categories.subscribe();
  pb.bookmarks.subscribe();
});

onUnmounted(() => {
  pb.categories.unsubscribe();
  pb.bookmarks.unsubscribe();
});
</script>
