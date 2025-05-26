<template>
  <div class="flex flex-col gap-4">
    <div class="space-y-2">
      <m-input id="name" v-model="form.name" name="name" />

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
import type { TeamsRecord, TeamsResponse } from "~/lib/types";

const props = defineProps<{
  team?: TeamsResponse;
}>();

const emit = defineEmits<{
  (e: "success" | "cancel"): void;
}>();

const pb = usePocketBase();

const { form, fillForm, resetForm } = useForm<TeamsRecord>({
  name: "",
  categories: [],
});

const { data: categories } = pb.categories.list();

const dropdownOptions = computed(() => {
  if (!categories.value?.items.length) return [];

  return categories.value?.items.map((c) => ({
    label: c.name,
    value: c.id,
  }));
});

watch(
  () => props.team,
  (value: TeamsResponse | undefined) => {
    if (value === undefined) {
      resetForm();

      return;
    }

    fillForm({
      name: value.name,
      categories: value.categories,
    });
  },
);

const buttonText = computed(() => {
  return props.team ? "Update" : "Create";
});

const { mutate: mutateCreate } = pb.teams.create();

const create = () => {
  mutateCreate(form.value, {
    onSuccess: () => resetForm(() => emit("success")),
  });
};

const { mutate: updateMutate } = pb.teams.update();

const update = () => {
  if (!props.team) return;

  updateMutate(
    {
      id: props.team.id,
      data: form.value,
    },
    {
      onSuccess: () => resetForm(() => emit("success")),
    },
  );
};

function submit() {
  if (props.team) {
    update();
  } else {
    create();
  }
}
</script>
