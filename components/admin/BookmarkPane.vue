<template>
  <a-tab-pane>
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
          v-for="bookmark in bookmarks?.items"
          :key="bookmark.id"
          class="[&>td]:px-3 [&>td]:py-2 [&>td:first-child]:rounded-l-sm [&>td:last-child]:rounded-r-sm"
        >
          <td>{{ bookmark.name }}</td>
          <td>{{ bookmark.url }}</td>
          <td>{{ bookmark.order }}</td>
          <td>{{ bookmark.icon }}</td>
          <td>
            <div class="flex items-end justify-end space-x-1">
              <a-button icon><fa icon="fas fa-pencil" /></a-button>
              <a-button icon destructive @click="deleteBookmark(bookmark.id)">
                <fa icon="fas fa-trash" />
              </a-button>
            </div>
          </td>
        </tr>
      </tbody>
    </table>

    <div class="flex flex-col gap-4">
      <a-typography
        is="p"
        size="small"
        class="text-gray-700 dark:text-gray-700"
      >
        Create a new bookmark
      </a-typography>

      <div class="max-w-sm space-y-2">
        <m-input id="name" v-model="name" name="name" class="grow" />
        <m-input id="color" v-model="url" name="color" />
        <m-input id="order" v-model="order" name="order" type="number" />
        <m-input id="icon" v-model="icon" name="icon" />

        <a-button @click="createBookmark"> Create </a-button>
      </div>
    </div>
  </a-tab-pane>
</template>

<script setup lang="ts">
import type { RecordModel } from "pocketbase";

const pb = usePocketBase();

const { data: bookmarks } = pb.bookmarks.list({
  sort: "order",
});

const name = ref("");
const url = ref("");
const order = ref(0);
const icon = ref<string | undefined>();
const categories = ref<string[]>([]);

const { mutate: mutateCreate } = pb.bookmarks.create();

watchEffect(() => {
  if (bookmarks?.value?.items) {
    const orders: number[] = bookmarks.value.items.map(
      (c: RecordModel) => c.order,
    );

    order.value = Math.max(0, ...orders) + 1;
  }
});

const createBookmark = () => {
  mutateCreate(
    {
      name: name.value,
      url: url.value,
      order: order.value,
      icon: icon.value,
      categories: [],
    },
    {
      onSuccess: () => {
        name.value = "";
        url.value = "";
        order.value = 0;
        icon.value = undefined;
        categories.value = [];
      },
    },
  );
};

const { mutate: mutateDelete } = pb.bookmarks.destroy();

const deleteBookmark = (id: string) => {
  mutateDelete(id);
};
</script>

<style scoped></style>
