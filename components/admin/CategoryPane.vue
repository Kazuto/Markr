<template>
  <a-tab-pane>
    <div class="flex justify-end">
      <a-button @click="openModal(undefined)">
        <fa icon="fas fa-plus" /> Add Category
      </a-button>
    </div>

    <table class="w-full text-left">
      <thead>
        <tr
          class="[&>th]:bg-gray-200 [&>th]:px-3 [&>th]:py-2 [&>th:first-child]:rounded-l-sm [&>th:last-child]:rounded-r-sm"
        >
          <th>Name</th>
          <th>Order</th>
          <th>Color</th>
          <th>Icon</th>
          <th class="text-right">Actions</th>
        </tr>
      </thead>
      <tbody class="[&>tr:nth-child(even)]:bg-gray-100">
        <tr
          v-for="item in categories?.items"
          :key="item.id"
          class="[&>td]:px-3 [&>td]:py-2 [&>td:first-child]:rounded-l-sm [&>td:last-child]:rounded-r-sm"
        >
          <td>{{ item.name }}</td>
          <td>{{ item.order }}</td>
          <td>{{ item.color }}</td>
          <td>
            <fa
              v-if="item.icon"
              :icon="{ prefix: 'fas', iconName: item.icon }"
            />
          </td>
          <td>
            <div class="flex items-end justify-end space-x-1">
              <a-button icon small @click="openModal(item)">
                <fa icon="fas fa-pencil" />
              </a-button>
              <a-button icon small destructive @click="deleteCategory(item.id)">
                <fa icon="fas fa-trash" />
              </a-button>
            </div>
          </td>
        </tr>
      </tbody>
    </table>

    <a-dialog v-model="open" :title @close="closeModal">
      <admin-category-form
        :category
        @cancel="closeModal"
        @success="closeModal"
      />
    </a-dialog>
  </a-tab-pane>
</template>

<script setup lang="ts">
import type { CategoriesResponse } from "~/lib/pocketbase";

const pb = usePocketBase();

const { data: categories } = pb.categories.list({
  sort: "order",
});

const open = ref(false);

const category = ref<CategoriesResponse | undefined>();

const title = computed(() => {
  return category.value
    ? `Edit category: ${category.value.name}`
    : "Create a category";
});

function openModal(item?: CategoriesResponse) {
  open.value = true;
  category.value = item;
}

function closeModal() {
  open.value = false;
  category.value = undefined;
}

const { mutate: mutateDelete } = pb.categories.destroy();

const deleteCategory = (id: string) => {
  mutateDelete(id);
};

onMounted(() => {
  pb.categories.subscribe();
});

onUnmounted(() => {
  pb.categories.unsubscribe();
});
</script>
