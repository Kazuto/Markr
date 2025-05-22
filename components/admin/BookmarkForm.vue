<template>
  <div class="flex flex-col gap-4">
    <div class="space-y-2">
      <m-input id="name" v-model="form.name" name="name" class="grow" />
      <m-input id="url" v-model="form.url" name="url" />
      <m-input id="order" v-model="form.order" name="order" type="number" />
      <m-input id="icon" v-model="form.icon" name="icon" />

      <a-select
        v-if="categories?.items"
        id="categories"
        v-model="form.categories"
        multiple
        name="categories"
        :options="dropdownOptions"
      />

      <div class="flex justify-end">
        <a-button @click="submit">{{ buttonText }}</a-button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { RecordModel } from "pocketbase";
import type { BookmarkData } from "~/composables/Queries";

const props = defineProps<{
  bookmark?: RecordModel;
}>();

const emit = defineEmits<{
  (e: "success" | "cancel"): void;
}>();

const pb = usePocketBase();

const { data: bookmarks } = pb.bookmarks.list({
  sort: "order",
});

const { data: categories } = pb.categories.list();

const dropdownOptions = computed(() => {
  if (!categories.value?.items.length) return [];

  return categories.value?.items.map((c: RecordModel) => ({
    label: c.name,
    value: c.id,
  }));
});

const { form, fillForm, resetForm } = useForm<BookmarkData>({
  name: "",
  url: "",
  order: 0,
  icon: "",
  categories: [],
});

const order = computed(() => {
  if (!bookmarks?.value?.items.length) return 0;

  return (
    Math.max(0, ...bookmarks.value.items.map((c: RecordModel) => c.order)) + 1
  );
});

watch(
  () => order.value,
  () => {
    form.value.order = order.value;
  },
);

watch(
  () => props.bookmark,
  (value: RecordModel | undefined) => {
    if (value === undefined) {
      resetForm();
      form.value.order = order.value;

      return;
    }

    fillForm({
      name: value.name,
      url: value.url,
      order: value.order,
      icon: value.icon,
      categories: value.categories,
    });
  },
);

const buttonText = computed(() => {
  return props.bookmark ? "Update" : "Create";
});

const { mutate: mutateCreate } = pb.bookmarks.create();

const create = () => {
  mutateCreate(form.value, {
    onSuccess: () => resetForm(() => emit("success")),
  });
};
const { mutate: updateMutate } = pb.bookmarks.update();

const update = () => {
  if (!props.bookmark) return;

  updateMutate(
    {
      id: props.bookmark.id,
      data: form.value,
    },
    {
      onSuccess: () => resetForm(() => emit("success")),
    },
  );
};

function submit() {
  if (props.bookmark) {
    update();
  } else {
    create();
  }
}
</script>
