<template>
  <div class="flex flex-col gap-4">
    <div class="space-y-2">
      <m-input id="name" v-model="form.name" name="name" class="grow" />
      <m-input id="url" v-model="form.url" name="url" />
      <m-input id="order" v-model="form.order" name="order" type="number" />
      <m-input id="icon" v-model="form.icon" name="icon" />

      <select v-model="form.categories" multiple>
        <option
          v-for="category in categories?.items"
          :key="category.id"
          :value="category.id"
        >
          {{ category.name }}
        </option>
      </select>

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

const initialState = {
  name: "",
  url: "",
  order: 0,
  icon: "",
  categories: [],
};

const form = reactive<BookmarkData>(initialState);

const order = computed(() => {
  if (!bookmarks?.value?.items.length) return 0;

  return (
    Math.max(0, ...bookmarks.value.items.map((c: RecordModel) => c.order)) + 1
  );
});

watchEffect(() => {
  form.order = order.value;
});

watch(
  () => props.bookmark,
  (value: RecordModel | undefined) => {
    if (value === undefined) {
      resetForm();

      return;
    }

    setForm({
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
  mutateCreate(form, {
    onSuccess: () => resetForm(),
  });
};
const { mutate: updateMutate } = pb.bookmarks.update();

const update = () => {
  if (!props.bookmark) return;

  updateMutate(
    {
      id: props.bookmark.id,
      data: form,
    },
    {
      onSuccess: () => resetForm(),
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

function setForm(values: BookmarkData) {
  Object.assign(form, {
    ...values,
  });
}

const resetForm = () => {
  Object.assign(form, initialState);

  emit("success");
};
</script>
