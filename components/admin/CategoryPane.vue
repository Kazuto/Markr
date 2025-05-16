<template>
  <a-tab-pane>
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
          v-for="category in categories?.items"
          :key="category.id"
          class="[&>td]:px-3 [&>td]:py-2 [&>td:first-child]:rounded-l-sm [&>td:last-child]:rounded-r-sm"
        >
          <td>{{ category.name }}</td>
          <td>{{ category.order }}</td>
          <td>{{ category.color }}</td>
          <td>{{ category.icon }}</td>
          <td>
            <div class="flex items-end justify-end space-x-1">
              <a-button icon><fa icon="fas fa-pencil" /></a-button>
              <a-button icon destructive @click="deleteCategory(category.id)">
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
        Create a new category
      </a-typography>

      <div class="max-w-sm space-y-2">
        <m-input id="name" v-model="name" name="name" class="grow" />
        <m-input id="order" v-model="order" name="order" type="number" />
        <m-input id="color" v-model="color" name="color" />
        <m-input id="icon" v-model="icon" name="icon" />

        <a-button @click="createCategory"> Create </a-button>
      </div>
    </div>
  </a-tab-pane>
</template>

<script setup lang="ts">
import type { RecordModel } from "pocketbase";

const pb = usePocketBase();

const { data: categories } = pb.categories.list({
  sort: "order",
});

const name = ref("");
const order = ref(0);
const color = ref<string | undefined>();
const icon = ref<string | undefined>();

const { mutate: mutateCreate } = pb.categories.create();

watchEffect(() => {
  if (categories?.value?.items) {
    const orders: number[] = categories.value.items.map(
      (c: RecordModel) => c.order,
    );

    order.value = Math.max(0, ...orders) + 1;
  }
});

const createCategory = () => {
  mutateCreate(
    {
      name: name.value,
      order: order.value,
      color: color.value,
      icon: icon.value,
    },
    {
      onSuccess: () => {
        name.value = "";
        order.value = 0;
        color.value = undefined;
        icon.value = undefined;
      },
    },
  );
};

const { mutate: mutateDelete } = pb.categories.destroy();

const deleteCategory = (id: string) => {
  mutateDelete(id);
};
</script>

<style scoped></style>
