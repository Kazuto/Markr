<template>
  <div class="flex flex-col gap-4">
    <div class="space-y-2">
      <m-input id="name" v-model="form.name" name="name" class="grow" />
      <m-input id="order" v-model="form.order" name="order" type="number" />
      <m-input id="color" v-model="form.color" name="color" />
      <m-input id="icon" v-model="form.icon" name="icon" />

      <div class="flex justify-end">
        <a-button @click="submit">{{ buttonText }}</a-button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { RecordModel } from "pocketbase";
import type { CategoryData } from "~/composables/Queries";

const props = defineProps<{
  category?: RecordModel;
}>();

const emit = defineEmits<{
  (e: "success" | "cancel"): void;
}>();

const pb = usePocketBase();

const { data: categories } = pb.categories.list({
  sort: "order",
});

const { form, fillForm, resetForm } = useForm<CategoryData>({
  name: "",
  order: 0,
  color: "",
  icon: "",
});

const order = computed(() => {
  if (!categories?.value?.items.length) return 0;

  return (
    Math.max(0, ...categories.value.items.map((c: RecordModel) => c.order)) + 1
  );
});

watch(
  () => props.category,
  (value: RecordModel | undefined) => {
    if (value === undefined) {
      resetForm();

      form.value.order = order.value;

      return;
    }

    fillForm({
      name: value.name,
      order: value.order,
      color: value.color,
      icon: value.icon,
    });
  },
);

const buttonText = computed(() => {
  return props.category ? "Update" : "Create";
});

const { mutate: mutateCreate } = pb.categories.create();

const create = () => {
  mutateCreate(form.value, {
    onSuccess: () => resetForm(() => emit("success")),
  });
};

const { mutate: updateMutate } = pb.categories.update();

const update = () => {
  if (!props.category) return;

  updateMutate(
    {
      id: props.category.id,
      data: form.value,
    },
    {
      onSuccess: () => resetForm(() => emit("success")),
    },
  );
};

function submit() {
  if (props.category) {
    update();
  } else {
    create();
  }
}
</script>
