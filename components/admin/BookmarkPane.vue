<template>
  <a-tab-pane>
    <div class="flex justify-end">
      <a-button @click="openModal(undefined)">
        <fa icon="fas fa-plus" /> Add Bookmark
      </a-button>
    </div>
    <table class="w-full text-left">
      <thead>
        <tr
          class="[&>th]:bg-gray-200 [&>th]:px-3 [&>th]:py-2 [&>th:first-child]:rounded-l-sm [&>th:last-child]:rounded-r-sm"
        >
          <th>Name</th>
          <th>URL</th>
          <th>Order</th>
          <th>Icon</th>
          <th class="text-right">Actions</th>
        </tr>
      </thead>
      <tbody class="[&>tr:nth-child(even)]:bg-gray-100">
        <tr
          v-for="item in bookmarks?.items"
          :key="item.id"
          class="[&>td]:px-3 [&>td]:py-2 [&>td:first-child]:rounded-l-sm [&>td:last-child]:rounded-r-sm"
        >
          <td>{{ item.name }}</td>
          <td>{{ item.url }}</td>
          <td>{{ item.order }}</td>
          <td>{{ item.icon }}</td>
          <td>
            <div class="flex items-end justify-end space-x-1">
              <a-button icon @click="openModal(item)">
                <fa icon="fas fa-pencil" />
              </a-button>
              <a-button icon destructive @click="deleteBookmark(item.id)">
                <fa icon="fas fa-trash" />
              </a-button>
            </div>
          </td>
        </tr>
      </tbody>
    </table>

    <a-dialog v-model="open" :title @close="closeModal">
      <admin-bookmark-form
        :bookmark
        @cancel="closeModal"
        @success="closeModal"
      />
    </a-dialog>
  </a-tab-pane>
</template>

<script setup lang="ts">
import type { BookmarksResponse } from "~/lib/types";

const pb = usePocketBase();

const { data: bookmarks } = pb.bookmarks.list({
  sort: "order",
});

const { mutate: mutateDelete } = pb.bookmarks.destroy();

const deleteBookmark = (id: string) => {
  mutateDelete(id);
};

const open = ref(false);

const bookmark = ref<BookmarksResponse | undefined>();

const title = computed(() => {
  return bookmark.value
    ? `Edit bookmark: ${bookmark.value.name}`
    : "Create a bookmark";
});

function openModal(item?: BookmarksResponse) {
  open.value = true;
  bookmark.value = item;
}

function closeModal() {
  open.value = false;
  bookmark.value = undefined;
}

onMounted(() => {
  pb.bookmarks.subscribe();
  pb.categories.subscribe();
});

onUnmounted(() => {
  pb.bookmarks.unsubscribe();
  pb.categories.unsubscribe();
});
</script>

<style scoped></style>
